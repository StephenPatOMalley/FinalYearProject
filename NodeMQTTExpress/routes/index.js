const mqtt = require('mqtt')
const host = '192.168.178.26'
const port = '1884'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
const connectUrl = `mqtt://${host}:${port}`

const express = require('express');
const router = express.Router();

const mongoose = require("mongoose");
const Schema = mongoose.Schema

const topic = 'esp32/roomData'
const timeHourlyChange = 0
var waitChange = false

const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: 'Steve',
  password: 'covid',
  reconnectPeriod: 1000,
})

const bmeSchema = new Schema(
  {
    TimeStamp: Date,
    Temperature: Number,
    Humidity: Number,
    CarbonDioxide: Number,
  },
  { collection: 'bme' }
);

const BMEModel = mongoose.model('bmeData', bmeSchema)

const bmeAveragSchema = new Schema(
  {
    TimeStamp: Date,
    Temperature: Number,
    Humidity: Number,
    CarbonDioxide: Number,
  },
  { collection: 'bmeAverage' }
);

const BMEAverageModel = mongoose.model('bmeAverageData', bmeAveragSchema)


async function mongooseConnect() {
  await mongoose.connect('mongodb://localhost:27017/BME')
}

async function mongooseSave(data) {
  await data.save()
}

mongooseConnect()


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
})

router.post("/getCurrentBMEData", function (req, res, next) {
  BMEModel.find().then(function (docs) {
    let theDoc = docs[docs.length-1]
    res.status(200).json(theDoc)
  }) 
})

router.post("/getbmeLastDayData", async (req, res) => {
  let Daily = findTime("Daily")
  let currentHours = getCurrentTime()
  await BMEModel.find({ TimeStamp: { $gte : Daily, $lte : currentHours} }).then(function (docs) {
    res.status(200).json(docs)
  })
})

router.post("/getbmeDayAverageData", async (req, res) => {
  let Daily = findTime("Daily")
  let currentHours = getCurrentTime()
  await BMEAverageModel.find({ TimeStamp: { $gte : Daily, $lte : currentHours} }).then(function (docs) {
    console.log(docs)
    res.status(200).json(docs)
  })
})

router.post("/getWeeklyData", async (req, res) => {
  let Weekly = findTime("Weekly")
  let currentHours = getCurrentTime()
  await BMEAverageModel.find({ TimeStamp: { $gte : Weekly, $lte : currentHours} }).then(function (docs) {
    res.status(200).json(docs)
  })
})

client.on('connect', () => {
  console.log('Connected')
  mongooseConnect().catch(err => console.log(err));
  client.subscribe([topic], () => {console.log(`Subscribe to topic '${topic}'`)})
})


client.on('message', (topic, payload) => {
  let load = null
  let hour = getHourChange()
  let messageLoad = payload.toString() 
  load = JSON.parse(messageLoad)
  if(load != null ){
    console.log(load)
    let currentTime = getCurrentTime()
    const data = new BMEModel({TimeStamp: currentTime, Temperature: load.temperature ,Humidity: load.humidity , CarbonDioxide: load.CO2})
    mongooseSave(data).catch(err => console.log(err));
    load = null
  }
  if(waitChange == false){
    if(hour == timeHourlyChange){
      HourlyAverage()
      waitChange = true
    }
  }
  if(waitChange == true){
    if(hour != timeHourlyChange){
      waitChange = false
    }
  }
})

async function HourlyAverage(){
  
  let numberOfResults = 0

  let CO2 = 0, AverageCO2 = 0
  let Hum = 0, AverageHum = 0
  let Temp = 0, AverageTemp = 0

  let Hourly = findTime("Hourly")
  let currentHours = getCurrentTime()

  await BMEModel.find({ TimeStamp: { $gte : Hourly, $lte : currentHours} }).then(function (docs) {
		numberOfResults = docs.length
		for (var i = 0; i < numberOfResults; i++) {
      CO2 += docs[i].CarbonDioxide
      Hum += docs[i].Humidity
      Temp += docs[i].Temperature
		}
  })
  AverageCO2 = CO2 / numberOfResults
  AverageHum = Hum / numberOfResults
  AverageTemp = Temp / numberOfResults
  const data = new BMEAverageModel({TimeStamp: currentHours, Temperature: AverageTemp ,Humidity: AverageHum , CarbonDioxide: AverageCO2})
  mongooseSave(data).catch(err => console.log(err));
  console.log("Done")
}

function getCurrentTime(){
  let time = new Date()
  let currentDate = time.toISOString()
  return currentDate
}

function getHourChange(){
  let time = new Date()
  let currentMinutes = time.getUTCMinutes()
  return currentMinutes
}

function findTime(period){

  let lastTime = ""
  let date = "", time = ""
  let year = "", month = "", day = ""
  let hours = "", minutes = "", seconds = ""

  let currentDate = getCurrentTime()
  let currentSplitDate = currentDate.split("T")
  if(currentSplitDate.length == 2){
    date = currentSplitDate[0]
    time = currentSplitDate[1]
    if( period == "Hourly"){
      let lasthour = ""
      let timeSplit = time.split(":")
      if(timeSplit.length == 3){
        hours = timeSplit[0]
        minutes = timeSplit[1]
        seconds = timeSplit[2]
      }
      let lasthourInt = parseInt(hours.trim()) - 1
      if( lasthourInt < 10){
        lasthour = "0" + lasthourInt.toString()
      }
      else{
        lasthour = lasthourInt.toString()
      }
      lastTime = date + "T" + lasthour + ":" + minutes + ":" + seconds
      return lastTime
    }
  }
  let dateSplit = date.split("-")
  if(dateSplit.length == 3){
    year = dateSplit[0]
    month = dateSplit[1]
    day = dateSplit[2]
  }
  if( period == "Daily" ){
    let lastDayInt = parseInt(day.trim()) - 1
    let lastDay = lastDayInt.toString()
    lastTime = year + "-" + month + "-" + lastDay + "T" + time
    return lastTime
  }
  if( period == "Weekly" ){
    let lastDay = ""
    let lastDayInt = parseInt(day.trim()) - 7
    if( lastDayInt < 10){
      lastDay = "0" + lastDayInt.toString()
    }
    else{
      lastDay = lastDayInt.toString()
    }
    lastTime = year + "-" + month + "-" + lastDay + "T" + time
    return lastTime
  }
} 

module.exports = router;

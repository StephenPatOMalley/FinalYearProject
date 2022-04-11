const mqtt = require('mqtt')
const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();
const host = '192.168.178.26'
const port = '1884'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
const topic = 'esp32/roomData'
const Schema = mongoose.Schema

const connectUrl = `mqtt://${host}:${port}`
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
    TimeStamp: String,
    Temperature: Number,
    Humidity: Number,
    CarbonDioxide: Number,
  },
  { collection: 'bme' }
);

const BMEModel = mongoose.model('bmeData', bmeSchema)

async function mongooseConnect() {
  await mongoose.connect('mongodb://localhost:27017/BME')
}

mongooseConnect()

async function mongooseSave(data) {
  //console.log("Send: ", data)
  await data.save()
}

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
  console.log("--- Start ---")
  let lastHours = findLast24Hours()
  console.log(lastHours)
  let currentHours = getCurrentTime()
  console.log(currentHours)
  BMEModel.find({ timeStamp: { $gte:lastHours, $lte:currentHours } }).then(function (docs) {
    console.log(docs)
    res.status(200).json(docs)
  })
})

//{ $gte:ISODate(lastHours), $lte:ISODate(currentHours)}

client.on('connect', () => {
  console.log('Connected')
  mongooseConnect().catch(err => console.log(err));
  client.subscribe([topic], () => {console.log(`Subscribe to topic '${topic}'`)})
})

client.on('message', (topic, payload) => {
  let load = null
  let stamp = getCurrentTime()
  let messageLoad = payload.toString() 
  load = JSON.parse(messageLoad)
  if(load != null ){
    const data = new BMEModel({TimeStamp: stamp, Temperature: load.temperature ,Humidity: load.humidity , CarbonDioxide: load.CO2})
    mongooseSave(data).catch(err => console.log(err));
    load = null
    stamp = null
  }
})

function getCurrentTime(){
  let time = new Date()
  let currentDate = time.toISOString()
  return currentDate
}

function findLast24Hours(){
  let lastTime = ""
  let date = "", time = ""
  let year = "", month = "", day = ""
  let currentDate = getCurrentTime()
  let currentSplitDate = currentDate.split("T")
  if(currentSplitDate.length == 2){
    date = currentSplitDate[0]
    time = currentSplitDate[1]
  }
  let dateSplit = date.split("-")
  if(dateSplit.length == 3){
    year = dateSplit[0]
    month = dateSplit[1]
    day = dateSplit[2]
  }
  let lastDayInt = parseInt(day.trim()) - 1
  let lastDay = lastDayInt.toString()
  lastTime = year + "-" + month + "-" + lastDay + "T" + time
  return lastTime
} 

module.exports = router;

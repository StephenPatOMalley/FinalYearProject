var express = require('express');
var router = express.Router();

var RoomDataModel = require('../models/RoomModel')
var RoomDataAverageModel = require('../models/RoomAverageModel')

var Device = require('../aws/ConnectAWS_IOT')

var MonConnect = require('../mongoose/MongooseConnect')

var CurrentTime = require('../time/FindCurrentTIme')
var HourlyAverage = require('../time/FindHourlyAverage')
var FindTime = require('../time/FindTImeSplit')
var HourChange = require('../time/FindTopOfTheHour')

const Topic = 'esp32/pub'
const timeHourlyChange = 0
var waitChange = false

MonConnect()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
})
  
router.post("/getCurrentBMEData", function (req, res, next) {
    RoomDataModel.find().then(function (docs) {
      let theDoc = docs[docs.length-1]
      res.status(200).json(theDoc)
    }) 
})
  
router.post("/getbmeLastDayData", async (req, res) => {
    let Daily = FindTime("Daily")
    let currentHours = CurrentTime()
    console.log(Daily, currentHours, "----")
    await RoomDataModel.find({ TimeStamp: { $gte : Daily, $lte : currentHours} }).then(function (docs) {
      //console.log(docs)
      res.status(200).json(docs)
    })
})
  
router.post("/getbmeDayAverageData", async (req, res) => {
    let Daily = FindTime("Daily")
    let currentHours = CurrentTime()
    await RoomDataAverageModel.find({ TimeStamp: { $gte : Daily, $lte : currentHours} }).then(function (docs) {
      //console.log(docs)
      res.status(200).json(docs)
    })
})
  
router.post("/getWeeklyData", async (req, res) => {
    let Weekly = FindTime("Weekly")
    let currentHours = CurrentTime()
    await RoomDataAverageModel.find({ TimeStamp: { $gte : Weekly, $lte : currentHours} }).then(function (docs) {
      //console.log(docs)
      res.status(200).json(docs)
    })
})


// We connect our client to AWS  IoT core. 
Device.on("connect", function () {
        console.log("STEP - Connecting to AWS  IoT Core");
        Device.subscribe(Topic);
    });

// Set handler for the device, it will get the messages from subscribers topics.
Device.on("message", async (topic, payload) => {
  let load = null
  let hour = HourChange()
  let messageLoad = payload.toString() 
  load = JSON.parse(messageLoad)
  if(load != null ){
    console.log(load)
    let currentTime = CurrentTime()
    const data = new RoomDataModel({TimeStamp: currentTime, Temperature: load.temperature ,Humidity: load.humidity , CarbonDioxide: load.CO2})
    await data.save()
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

Device.on("error", function (topic, payload) {
        console.log('Error:', topic, payload.toString());
})

module.exports = router;

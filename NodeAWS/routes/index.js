var express = require('express');
var router = express.Router();

var RoomDataModel = require('../models/RoomModel')
var RoomDataAverageModel = require('../models/RoomAverageModel')

const device = require('../aws/ConnectAWS_IOT')

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


// We connect our client to AWS  IoT core. 
device.on("connect", function () {
        console.log("STEP - Connecting to AWS  IoT Core");
        device.subscribe("esp32/pub");
    });

// Set handler for the device, it will get the messages from subscribers topics.
device.on("message", function (topic, payload) {
        console.log('message', topic, payload.toString());
    });

device.on("error", function (topic, payload) {
        console.log('Error:', topic, payload.toString());
});

module.exports = router;

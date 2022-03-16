const mqtt = require('mqtt')
const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const host = '192.168.1.112'
const port = '1884'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
const topicTemp = 'esp32/temperature'
const topicHum = 'esp32/humidity'
const Schema = mongoose.Schema

var messageLoadTemp = null
var messageLoadHum = null

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
    temperature: String,
    humidity: String
  },
  { collection: 'bme' }
);
const BMEModel = mongoose.model('bmeData', bmeSchema)

async function mongooseConnect() {
  await mongoose.connect('mongodb://localhost:27017/BME')
}

mongooseConnect()

async function mongooseSave(data) {
  console.log("Send: ", data)
  await data.save()
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
})

router.post("/getbmeData", function (req, res, next) {
  console.log("Router --- ")
  BMEModel.find().then(function (docs) {
    let theDoc = docs[docs.length-1]
    console.log("/getbmeData: " + theDoc)
    res.status(200).json(theDoc)
  })
})


client.on('connect', () => {
  console.log('Connected')
  mongooseConnect().catch(err => console.log(err));
  client.subscribe([topicTemp], () => {console.log(`Subscribe to topic '${topicTemp}'`)})
  client.subscribe([topicHum], () => {console.log(`Subscribe to topic '${topicHum}'`)})
})

client.on('message', (topic, payload) => {
  if(topic == topicTemp){
    messageLoadTemp = payload.toString()
  }
  else if(topic == topicHum){
    messageLoadHum = payload.toString()
  }

  if(messageLoadTemp != null && messageLoadHum != null){
    //console.log('Received Message:', messageLoadTemp, messageLoadHum)
    const data = new BMEModel({temperature: messageLoadTemp ,humidity: messageLoadHum})
    mongooseSave(data).catch(err => console.log(err));
    messageLoadTemp = null
    messageLoadHum = null
  }
})

module.exports = router;

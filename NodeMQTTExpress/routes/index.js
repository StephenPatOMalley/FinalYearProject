const mqtt = require('mqtt')
const express = require('express');
const router = express.Router();
let mongoose = require("mongoose");
const host = '192.168.1.112'
const port = '1884'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
const topicTemp = 'esp32/temperature'
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
    temperature: String
  },
  { collection: 'bme' }
);
const BMEModel = mongoose.model('bmeData', bmeSchema)

async function mongooseConnect() {
  await mongoose.connect('mongodb://localhost:27017/BME')
}

async function mongooseSave(data) {
  console.log("Send: ", data)
  await data.save()
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
})

client.on('connect', () => {
  console.log('Connected')
  mongooseConnect().catch(err => console.log(err));
  client.subscribe([topicTemp], () => {console.log(`Subscribe to topic '${topicTemp}'`)})
})

client.on('message', (topic, payload) => {
  messageLoad = payload.toString()
  const data = new BMEModel({temperature: messageLoad})
  console.log('Received Message:', topic, data.temperature)
  mongooseSave(data).catch(err => console.log(err));
})


router.get("/getTemperature", function (req, res, next) {
  BMEModel.find().then(function (docs) {
    res.render("index", { title: 'Get data', items: docs })
  })
})


module.exports = router;

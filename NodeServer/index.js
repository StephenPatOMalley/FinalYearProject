const mqtt = require('mqtt')

const host = '192.168.178.57'
const port = '1884'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

const connectUrl = `mqtt://${host}:${port}`
const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: 'Steve',
  password: 'covid',
  reconnectPeriod: 1000,
})

const topic = 'esp32/temperature'
client.on('connect', () => {
  console.log('Connected')
  client.subscribe([topic], () => {console.log(`Subscribe to topic '${topic}'`)})
})

client.on('message', (topic, payload) => {
  console.log('Received Message:', topic, payload.toString())
})

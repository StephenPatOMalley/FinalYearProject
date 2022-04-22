// https://medium.com/dev-jam/getting-started-with-aws-iot-core-and-mqtt-protocol-with-a-node-js-example-ed16bd542704
// npm install aws-iot-device-sdk
// https://github.com/aws/aws-iot-device-sdk-js
const awsIot = require('aws-iot-device-sdk');

//https://github.com/aws/aws-iot-device-sdk-js/issues/352
var path = require('path');

const device = awsIot.device({
    clientId: 'NodeServer', 
    host: 'a1o14bye3fgtls-ats.iot.us-east-1.amazonaws.com', 
    keyPath: path.resolve(__dirname, "../certs/8db43ec8075515c25379decf910d5a494ccbb15b6968993775d7b1e379ddc018-private.pem.key"),
    certPath: path.resolve(__dirname,"../certs/8db43ec8075515c25379decf910d5a494ccbb15b6968993775d7b1e379ddc018-certificate.pem.crt"),
    caPath: path.resolve(__dirname,"../certs/AmazonRootCA1.pem"),
});

module.exports = device
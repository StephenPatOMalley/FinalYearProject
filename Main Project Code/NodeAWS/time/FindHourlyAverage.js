var RoomDataModel = require('../models/RoomModel')
var RoomDataAverageModel = require('../models/RoomAverageModel')

var CurrentTime = require('../time/FindCurrentTIme')
var FindTime = require('../time/FindTImeSplit')

async function HourlyAverage(){
    let numberOfResults = 0
  
    let CO2 = 0, AverageCO2 = 0
    let Hum = 0, AverageHum = 0
    let Temp = 0, AverageTemp = 0
  
    let Hourly = FindTime("Hourly")
    let currentHours = CurrentTime()
  
    await RoomDataModel.find({ TimeStamp: { $gte : Hourly, $lte : currentHours} }).then(function (docs) {
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
    const data = new RoomDataAverageModel({TimeStamp: currentHours, Temperature: AverageTemp ,Humidity: AverageHum , CarbonDioxide: AverageCO2})
    await data.save()
    console.log("Done")
}

module.exports = HourlyAverage
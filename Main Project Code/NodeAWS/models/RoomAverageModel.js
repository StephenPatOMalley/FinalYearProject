const mongoose = require("mongoose");
const Schema = mongoose.Schema

const RoomDataAveragSchema = new Schema(
    {
      TimeStamp: Date,
      Temperature: Number,
      Humidity: Number,
      CarbonDioxide: Number,
    },
    { collection: 'RoomDataAverage' }
);
  
const RoomDataAverageModel = mongoose.model('RoomAverageData', RoomDataAveragSchema)

module.exports = RoomDataAverageModel
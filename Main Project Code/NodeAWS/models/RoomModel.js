//https://mongoosejs.com/docs/
const mongoose = require("mongoose");
const Schema = mongoose.Schema

const RoomDataSchema = new Schema(
    {
      TimeStamp: Date,
      Temperature: Number,
      Humidity: Number,
      CarbonDioxide: Number,
    },
    { collection: 'RoomData' }
);

const RoomDataModel = mongoose.model('RoomData', RoomDataSchema)

module.exports = RoomDataModel

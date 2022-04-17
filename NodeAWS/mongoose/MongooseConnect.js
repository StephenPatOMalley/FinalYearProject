const mongoose = require("mongoose");

async function MongooseConnect() {
    await mongoose.connect('mongodb://localhost:27017/Room')
}

module.exports = MongooseConnect
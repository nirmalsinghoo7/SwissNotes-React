const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/swissnotes?directConnection=true&readPreference=primary";

const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("Hello Singh, Connected to Mongo Successfully.");
  });
}

module.exports = connectToMongo;
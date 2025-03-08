// models/OptionData.js - MongoDB schema and model

const mongoose = require('mongoose');

const optionDataSchema = new mongoose.Schema({
  Ticker: {
    type: String,
    required: true
  },
  Date: {
    type: String,
    required: true
  },
  Time: {
    type: String,
    required: true
  },
  Open: {
    type: Number,
    required: true
  },
  High: {
    type: Number,
    required: true
  },
  Low: {
    type: Number,
    required: true
  },
  Close: {
    type: Number,
    required: true
  },
  Volume: {
    type: Number,
    required: true
  },
  OI: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('OptionData', optionDataSchema);
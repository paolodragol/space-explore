const mongoose = require('mongoose');

const launchesSchema = new mongoose.Schema({
  flightNumber: {
    type: Number,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
  rocket: {
    type: String,
    required: true,
  },
  launchDate: {
    type: Date,
    required: true,
  },
  customers: [String],
  upcoming: {
    Boolean,
    required: true,
  },
  success: {
    Boolean,
    required: true,
    default: true,
  },
  target: {
    type: String,
    required: true,
  },
});

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

/**
 * Map the launcheSchema to the "launches" collection
 *   - Mongoose takes the collection name, lowercases it and makes it plural
 */
module.exports = mongoose.model('Launch', launchesSchema);

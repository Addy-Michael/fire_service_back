const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  reportID: {
    type: Number,
    required: [true, "Must have a report ID"],
    unique: true,
  },
  report: String,
  livesAffected: {
    type: Number,
    required: [true, "Must have a report ID"],
  },
  causeOfDiaster: {
    type: String,
    required: [true, "Must have cause of diaster"],
  },
  location: {
    type: String,
    required: [true, "Must have location"],
  },
  day: {
    type: String,
    required: [true, "day must be known"],
  },
  month: {
    type: String,
    required: [true, "month must be known"],
  },
  dayNum: {
    type: Number,
    required: [true, "date must be known"],
  },
  year: {
    type: Number,
    required: [true, "year must be known"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Record = mongoose.model("Record", recordSchema);

module.exports = Record;

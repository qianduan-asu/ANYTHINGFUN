// models/Coordinate.js

const mongoose = require("mongoose");

const CoordinateSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  description: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Coordinate", CoordinateSchema);

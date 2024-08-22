// models/User.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nickname: { type: String, required: true },
  avatar: { type: String, required: true },
  coordinates: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  onlineSince: { type: Date, default: Date.now },
  browserId: { type: String, unique: true, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

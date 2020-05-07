const mongoose = require("mongoose");

const Topics = new mongoose.Schema({
  topic: String,
  from: String,
  likes: Number,
});

const User = new mongoose.Schema({
  userId: String,
  topics: [Topics],
});

module.exports = mongoose.model("User", User);


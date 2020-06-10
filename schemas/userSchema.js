const mongoose = require("mongoose");
const { Topic } = require("../schemas/topicSchema");

const User = new mongoose.Schema({
  userId: String,
  topics: [Topic],
});

module.exports = mongoose.model("User", User);

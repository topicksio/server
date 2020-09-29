const mongoose = require("mongoose");


const User = new mongoose.Schema({
  userId: String,
  topics: [Topic],
});

module.exports = mongoose.model("User", User);

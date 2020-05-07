const mongoose = require("mongoose");

const Topic = new mongoose.Schema({
  topics: [
    {
      topic: String,
      from: String,
      likes: Number,
    },
  ],
});

module.exports = mongoose.model('Topic', Topic)
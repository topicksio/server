const mongoose = require("mongoose");

const userName = "lotso2"

const Topics = new mongoose.Schema({
  topics: [
    {
      topic: String,
      from: String,
      likes: Number,
    },
  ],
});

const User = new mongoose.Schema({
  [userName]: {
    topics: [Topics]
  },
});

module.exports = mongoose.model("User", User);

// date: Date,
// userIds: {
//   name: String,
//   topics: {
//     msg: String,
//     userId: String,
//     likes: Number
//   }
// }

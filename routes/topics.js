const express = require("express");
const router = express.Router();
const {
  getTopics,
  addTopic,
  deleteTopic,
} = require("../controllers/topicsController");

router.route("/").get(getTopics).post(addTopic);

router.route('/:id').delete(deleteTopic)

module.exports = router;

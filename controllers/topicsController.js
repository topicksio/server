// @desc GET all topics
// @route GET /api/v1/topics
// @access Public
exports.getTopics = (req, res, next) => {
  res.send('GET Topics')
}

// @desc Add topic
// @route POST /api/v1/topics
// @access Public
exports.addTopic = (req, res, next) => {
  res.send('POST Topic')
}

// @desc delete all topics
// @route  DELETE /api/v1/topics/:id
// @access Public
exports.deleteTopic = (req, res, next) => {
  res.send('DELETE Topics')
}
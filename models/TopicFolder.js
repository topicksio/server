const mongoose = require('mongoose')
const TopicSchema = require('../models/Topic')



const num = 1
const folder_name = `folder ${Math.floor(Math.random() * 10)}`

const TopicFolderSchema = new mongoose.Schema({
  [folder_name]: [TopicSchema]
})

module.exports = mongoose.model('TopicFolder', TopicFolderSchema)
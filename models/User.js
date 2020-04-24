const mongoose = require('mongoose')
// const TopicFolderSchema = require('../models/TopicFolder')

const username = 'l0tsotest'

const UserSchema = new mongoose.Schema({
  users: {
    type: Array
  }
})

module.exports = mongoose.model('User', UserSchema)

// [TopicFolderSchema]
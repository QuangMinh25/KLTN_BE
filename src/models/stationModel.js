const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StationModel = new Schema({
  title: {
    type: String
  },
  location: {
    type: String
  },
  description: {
    type: String
  },
  code: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    default: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  deleted_at: {
    type: Number,
    default: null
  }
});

module.exports = mongoose.model('Station', StationModel);
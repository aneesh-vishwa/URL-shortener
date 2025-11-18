const mongoose = require('mongoose');

const URLSchema = new mongoose.Schema({
  urlCode: {
    type: String,
    required: true,
    unique: true
  },
  longUrl: {
    type: String,
    required: true
  },
  shortUrl: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Url', URLSchema);

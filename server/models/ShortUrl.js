const mongoose = require('mongoose');

const ShortUrlSchema = new mongoose.Schema({
  shortUrl: {
    type: String,
    required: true,
    unique: true
  },
  originalUrl: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('ShortUrl', ShortUrlSchema);

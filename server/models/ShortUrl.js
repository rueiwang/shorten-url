import { Schema, model } from 'mongoose';

const ShortUrlSchema = new Schema({
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

export default model('ShortUrl', ShortUrlSchema);

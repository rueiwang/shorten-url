import { Router } from 'express';
const router = Router();
import ShortUrl from '../models/ShortUrl.js';

// Create short URL
router.post('/shorten', async (req, res) => {
  try {
    const { shortUrl, originalUrl } = req.body;
    const existingUrl = await ShortUrl.findOne({ shortUrl });
    if (existingUrl) {
      return res.status(400).json({ error: 'Short URL already exists' });
    }
    const newUrl = await ShortUrl.create({ shortUrl, originalUrl });
    res.json(newUrl);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all short URLs
router.get('/', async (req, res) => {
  try {
    const urls = await ShortUrl.find();
    console.log(urls)
    res.json(urls);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get specific short URL
router.get('/:shortUrl', async (req, res) => {
  try {
    const { shortUrl } = req.params;
    const url = await ShortUrl.findOne({ shortUrl });
    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }
    res.json(url);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;

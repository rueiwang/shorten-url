import { Router } from 'express';
const router = Router();
import ShortUrl from '../models/ShortUrl.js';
import generateUniqueShortUrl from '../utils/generateUniqueShortUrl.js';

// redirect to originalUrl
router.get('/:shortUrl', async(req, res) => {
  const {shortUrl} = req.params
  try {
    const targetData = await ShortUrl.findOne({shortUrl})
    if(!targetData) {
      return res.status(404).json({message: 'Short URL not found'})
    }

    res.redirect(targetData.originalUrl, 301)
  } catch (error) {
    res.status(500).json({error: 'Server error'})
  }
}) 


// Get all short URLs
router.get('/api/shortUrls/', async (req, res) => {
  try {
    const urls = await ShortUrl.find();
    res.json(urls);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get specific short URL
router.get('/api/shortUrls/:shortUrl', async (req, res) => {
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

// Create short URL
router.post('/api/shortUrls/shorten', async (req, res) => {
  const { originalUrl } = req.body;
  if(!originalUrl) {
    return res.status(400).json({message: 'Original URL is required'})
  }

  try {
    const shortUrl = await generateUniqueShortUrl();
    const newUrl = await ShortUrl.create({ shortUrl, originalUrl });
    res.json(newUrl);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;

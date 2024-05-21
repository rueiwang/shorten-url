const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const shortUrlRoutes = require('./routes/shortUrls');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/url-shortener';
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Use the short URL routes
app.use('/api/shortUrls', shortUrlRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

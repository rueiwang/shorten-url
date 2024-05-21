import express from 'express'
import { connect } from 'mongoose';
import BodyParser from 'body-parser';
import shortUrlRoutes from './routes/shortUrls.js';

const {json} = BodyParser
const app = express();
app.use(json());

// Connect to MongoDB
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/url-shortener';
connect(mongoUri).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Use the short URL routes
app.use('/', shortUrlRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

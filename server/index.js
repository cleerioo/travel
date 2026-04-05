const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const itineraryRoutes = require('./routes/itinerary');
const statsRoutes = require('./routes/stats');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());

// Rate limiting (simple in-memory)
const rateLimitMap = new Map();
app.use((req, res, next) => {
  const ip = req.ip;
  const now = Date.now();
  const windowMs = 60000; // 1 minute
  const maxRequests = 10;

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, []);
  }

  const requests = rateLimitMap.get(ip).filter(t => now - t < windowMs);
  if (requests.length >= maxRequests) {
    return res.status(429).json({ error: 'Too many requests. Please wait a moment.' });
  }

  requests.push(now);
  rateLimitMap.set(ip, requests);
  next();
});

// Routes
app.use('/api', itineraryRoutes);
app.use('/api', statsRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', mode: process.env.GEMINI_API_KEY ? 'live' : 'demo' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Server error:', err.message);
  res.status(500).json({ error: 'Internal server error. Please try again.' });
});

app.listen(PORT, () => {
  console.log(`🌍 Travel AI server running on port ${PORT}`);
  console.log(`Mode: ${process.env.GEMINI_API_KEY ? '🟢 Live (Gemini API)' : '🟡 Demo Mode'}`);
});

const express = require('express');
const router = express.Router();
const { getStats, addRating } = require('../utils/db');

// Get global stats (total trips, avg rating)
router.get('/stats', (req, res) => {
  try {
    const stats = getStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// Submit a new user rating (1-5)
router.post('/rate', (req, res) => {
  try {
    const { score } = req.body;
    if (!score || score < 1 || score > 5) {
      return res.status(400).json({ error: 'Valid score (1-5) is required' });
    }
    
    const newStats = addRating(score);
    res.json({ success: true, stats: newStats });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit rating' });
  }
});

module.exports = router;

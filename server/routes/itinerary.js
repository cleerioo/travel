const express = require('express');
const router = express.Router();
const { generateItinerary } = require('../services/gemini');
const { getDestinationImage } = require('../services/unsplash');

// Generate itinerary
router.post('/generate-itinerary', async (req, res) => {
  try {
    const { destination, startDate, endDate, budget, interests, travelStyle, travelers } = req.body;

    // Validation
    if (!destination || !startDate || !endDate) {
      return res.status(400).json({
        error: 'Missing required fields: destination, startDate, and endDate are required.'
      });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (end < start) {
      return res.status(400).json({ error: 'End date must be after start date.' });
    }

    const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    if (diffDays > 14) {
      return res.status(400).json({ error: 'Maximum trip duration is 14 days.' });
    }

    console.log(`📍 Generating itinerary for ${destination} (${diffDays} days, ${budget} budget)`);

    // Generate itinerary
    const itinerary = await generateItinerary({
      destination,
      startDate,
      endDate,
      budget: budget || 'mid-range',
      interests: interests || [],
      travelStyle: travelStyle || 'solo',
      travelers: travelers || 1
    });

    // Increment global live DB counter
    const { incrementTrips } = require('../utils/db');
    incrementTrips();

    // Get destination image
    const image = await getDestinationImage(destination);

    res.json({
      success: true,
      itinerary,
      image,
      mode: process.env.GEMINI_API_KEY ? 'live' : 'demo'
    });
  } catch (error) {
    console.error('Error generating itinerary:', error);
    res.status(500).json({
      error: 'Failed to generate itinerary. Please try again.'
    });
  }
});

// Get destination image
router.get('/destination-image/:query', async (req, res) => {
  try {
    const image = await getDestinationImage(req.params.query);
    res.json(image);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch image.' });
  }
});

// Chat functionality
const { chatWithAI } = require('../services/gemini');

router.post('/chat', async (req, res) => {
  try {
    const { history, message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    const response = await chatWithAI(history || [], message);
    res.json(response);
  } catch (error) {
    console.error('Chat route error:', error);
    res.status(500).json({ error: 'Failed to process chat' });
  }
});

module.exports = router;

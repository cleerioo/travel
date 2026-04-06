const express = require('express');
const router = express.Router();
const { chatWithAI } = require('../services/gemini');

router.post('/chat', async (req, res) => {
  try {
    const { history, message } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required.' });
    }

    const result = await chatWithAI(history || [], message);
    res.json(result);
  } catch (error) {
    console.error('Chat route error:', error);
    res.status(500).json({ error: 'Failed to process chat message.' });
  }
});

module.exports = router;

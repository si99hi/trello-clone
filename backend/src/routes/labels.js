const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');

// GET /api/labels - return all labels
router.get('/', async (req, res) => {
  try {
    const labels = await prisma.label.findMany();
    res.json(labels);
  } catch (error) {
    console.error('Error fetching labels:', error);
    res.status(500).json({ error: 'Failed to fetch labels' });
  }
});

module.exports = router;
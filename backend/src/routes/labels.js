const express = require('express');
const prisma = require('../lib/prisma');
const router = express.Router();

// GET /api/labels - all labels
router.get('/', async (req, res) => {
  try {
    const labels = await prisma.label.findMany({
      orderBy: { name: 'asc' }
    });
    res.json(labels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch labels' });
  }
});

module.exports = router;
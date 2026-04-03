const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');

// DELETE /api/checklists/:id - delete checklist
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.checklist.delete({
      where: { id: parseInt(id, 10) },
    });
    res.json({ message: 'Checklist deleted successfully' });
  } catch (error) {
    console.error('Error deleting checklist:', error);
    if (error.code === 'P2025') return res.status(404).json({ error: 'Checklist not found' });
    res.status(500).json({ error: 'Failed to delete checklist' });
  }
});

// POST /api/checklists/:id/items - add item { text }
router.post('/:id/items', async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  if (!text) return res.status(400).json({ error: 'Text is required' });

  try {
    const item = await prisma.checklistItem.create({
      data: {
        text,
        checklistId: parseInt(id, 10),
      },
    });
    res.status(201).json(item);
  } catch (error) {
    console.error('Error adding checklist item:', error);
    res.status(500).json({ error: 'Failed to add item' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');

// PATCH /api/checklist-items/:id - update item { text, isComplete }
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { text, isComplete } = req.body;

  try {
    const updateData = {};
    if (text !== undefined) updateData.text = text;
    if (isComplete !== undefined) updateData.isComplete = isComplete;

    const item = await prisma.checklistItem.update({
      where: { id: parseInt(id, 10) },
      data: updateData,
    });
    res.json(item);
  } catch (error) {
    console.error('Error updating checklist item:', error);
    if (error.code === 'P2025') return res.status(404).json({ error: 'Checklist item not found' });
    res.status(500).json({ error: 'Failed to update item' });
  }
});

// DELETE /api/checklist-items/:id - delete item
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.checklistItem.delete({
      where: { id: parseInt(id, 10) },
    });
    res.json({ message: 'Checklist item deleted successfully' });
  } catch (error) {
    console.error('Error deleting checklist item:', error);
    if (error.code === 'P2025') return res.status(404).json({ error: 'Checklist item not found' });
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

module.exports = router;

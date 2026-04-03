const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');

// POST /api/lists - create list { boardId, title, position }
router.post('/', async (req, res) => {
  const { boardId, title, position } = req.body;
  
  if (!boardId || !title || typeof position !== 'number') {
    return res.status(400).json({ error: 'boardId, title, and position are required' });
  }

  try {
    const list = await prisma.list.create({
      data: {
        title,
        position,
        boardId: parseInt(boardId, 10),
      },
      include: {
        cards: true
      }
    });
    res.status(201).json(list);
  } catch (error) {
    console.error('Error creating list:', error);
    res.status(500).json({ error: 'Failed to create list' });
  }
});

// PATCH /api/lists/:id - update title or position
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, position } = req.body;

  try {
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (position !== undefined) updateData.position = position;

    const list = await prisma.list.update({
      where: { id: parseInt(id, 10) },
      data: updateData,
    });
    res.json(list);
  } catch (error) {
    console.error('Error updating list:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'List not found' });
    }
    res.status(500).json({ error: 'Failed to update list' });
  }
});

// DELETE /api/lists/:id - delete list (cascade)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.list.delete({
      where: { id: parseInt(id, 10) },
    });
    res.json({ message: 'List deleted successfully' });
  } catch (error) {
    console.error('Error deleting list:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'List not found' });
    }
    res.status(500).json({ error: 'Failed to delete list' });
  }
});

module.exports = router;
const express = require('express');
const prisma = require('../lib/prisma');
const router = express.Router();

// POST /api/lists - create a list
router.post('/', async (req, res) => {
  try {
    const { boardId, title, position } = req.body;
    if (!boardId || !title) {
      return res.status(400).json({ error: 'boardId and title are required' });
    }
    const list = await prisma.list.create({
      data: {
        boardId: parseInt(boardId),
        title,
        position: position || 0
      }
    });
    res.status(201).json(list);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create list' });
  }
});

// PATCH /api/lists/:id - update list (title, position)
router.patch('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title, position } = req.body;
    const list = await prisma.list.update({
      where: { id },
      data: { title, position }
    });
    res.json(list);
  } catch (error) {
    console.error(error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'List not found' });
    }
    res.status(500).json({ error: 'Failed to update list' });
  }
});

// DELETE /api/lists/:id - delete list (cascade)
router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.list.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'List not found' });
    }
    res.status(500).json({ error: 'Failed to delete list' });
  }
});

module.exports = router;
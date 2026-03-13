const express = require('express');
const prisma = require('../lib/prisma');
const router = express.Router();

// POST /api/cards/:id/comments - add comment
router.post('/cards/:id/comments', async (req, res) => {
  try {
    const cardId = parseInt(req.params.id);
    const { text, userId } = req.body;
    if (!text || !userId) {
      return res.status(400).json({ error: 'text and userId are required' });
    }
    const comment = await prisma.comment.create({
      data: {
        text,
        cardId,
        userId: parseInt(userId)
      },
      include: { user: true }
    });
    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

// PATCH /api/comments/:id - edit comment
router.patch('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'text is required' });
    }
    const comment = await prisma.comment.update({
      where: { id },
      data: { text }
    });
    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update comment' });
  }
});

// DELETE /api/comments/:id - delete comment
router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.comment.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete comment' });
  }
});

module.exports = router;
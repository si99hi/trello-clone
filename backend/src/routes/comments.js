const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');

// PATCH /api/comments/:id - edit comment { text }
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  if (!text) return res.status(400).json({ error: 'Text is required' });

  try {
    const comment = await prisma.comment.update({
      where: { id: parseInt(id, 10) },
      data: { text },
    });
    res.json(comment);
  } catch (error) {
    console.error('Error updating comment:', error);
    if (error.code === 'P2025') return res.status(404).json({ error: 'Comment not found' });
    res.status(500).json({ error: 'Failed to update comment' });
  }
});

// DELETE /api/comments/:id - delete comment
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.comment.delete({
      where: { id: parseInt(id, 10) },
    });
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    if (error.code === 'P2025') return res.status(404).json({ error: 'Comment not found' });
    res.status(500).json({ error: 'Failed to delete comment' });
  }
});

module.exports = router;
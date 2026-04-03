const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');

// DELETE /api/attachments/:id - delete attachment
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.attachment.delete({
      where: { id: parseInt(id, 10) },
    });
    res.json({ message: 'Attachment deleted successfully' });
  } catch (error) {
    console.error('Error deleting attachment:', error);
    if (error.code === 'P2025') return res.status(404).json({ error: 'Attachment not found' });
    res.status(500).json({ error: 'Failed to delete attachment' });
  }
});

module.exports = router;
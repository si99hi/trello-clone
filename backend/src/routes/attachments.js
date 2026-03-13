const express = require('express');
const prisma = require('../lib/prisma');
const router = express.Router();

// POST /api/cards/:id/attachments - add attachment
router.post('/cards/:id/attachments', async (req, res) => {
  try {
    const cardId = parseInt(req.params.id);
    const { name, url } = req.body;
    if (!name || !url) {
      return res.status(400).json({ error: 'name and url are required' });
    }
    const attachment = await prisma.attachment.create({
      data: {
        name,
        url,
        cardId
      }
    });
    res.status(201).json(attachment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add attachment' });
  }
});

// DELETE /api/attachments/:id - delete attachment
router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.attachment.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete attachment' });
  }
});

module.exports = router;
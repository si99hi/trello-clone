const express = require('express');
const prisma = require('../lib/prisma');
const router = express.Router();

// GET /api/boards - all boards for home page grid
router.get('/', async (req, res) => {
  try {
    const boards = await prisma.board.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(boards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch boards' });
  }
});

// POST /api/boards - create a new board
router.post('/', async (req, res) => {
  try {
    const { title, bgColor, bgImage } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    const board = await prisma.board.create({
      data: {
        title,
        bgColor: bgColor || '#0052CC',
        bgImage
      }
    });
    res.status(201).json(board);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create board' });
  }
});

// GET /api/boards/:id - single board with all nested data
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const board = await prisma.board.findUnique({
      where: { id },
      include: {
        lists: {
          orderBy: { position: 'asc' },
          include: {
            cards: {
              where: { isArchived: false },
              orderBy: { position: 'asc' },
              include: {
                labels: { include: { label: true } },
                members: { include: { user: true } },
                checklists: { include: { items: true } },
                comments: { include: { user: true } },
                attachments: true,
                activities: { orderBy: { createdAt: 'desc' } }
              }
            }
          }
        }
      }
    });
    if (!board) {
      return res.status(404).json({ error: 'Board not found' });
    }
    res.json(board);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch board' });
  }
});

// PATCH /api/boards/:id - update board (title, bgColor, bgImage)
router.patch('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title, bgColor, bgImage } = req.body;
    const board = await prisma.board.update({
      where: { id },
      data: { title, bgColor, bgImage }
    });
    res.json(board);
  } catch (error) {
    console.error(error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Board not found' });
    }
    res.status(500).json({ error: 'Failed to update board' });
  }
});

// DELETE /api/boards/:id - delete board (cascade handled by Prisma)
router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.board.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Board not found' });
    }
    res.status(500).json({ error: 'Failed to delete board' });
  }
});

module.exports = router;
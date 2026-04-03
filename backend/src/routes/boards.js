const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');

// GET /api/boards - return all boards
router.get('/', async (req, res) => {
  try {
    const boards = await prisma.board.findMany();
    res.json(boards);
  } catch (error) {
    console.error('Error fetching boards:', error);
    res.status(500).json({ error: 'Failed to fetch boards' });
  }
});

// POST /api/boards - create board with { title, bgColor, bgImage }
router.post('/', async (req, res) => {
  const { title, bgColor, bgImage } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  
  try {
    const board = await prisma.board.create({
      data: {
        title,
        bgColor: bgColor || '#0052CC',
        bgImage,
      },
    });
    res.status(201).json(board);
  } catch (error) {
    console.error('Error creating board:', error);
    res.status(500).json({ error: 'Failed to create board' });
  }
});

// GET /api/boards/:id - return board with all nested data
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const board = await prisma.board.findUnique({
      where: { id: parseInt(id, 10) },
      include: {
        lists: {
          orderBy: { position: 'asc' },
          include: {
            cards: {
              where: { isArchived: false },
              orderBy: { position: 'asc' },
              include: {
                labels: {
                  include: { label: true }
                },
                members: {
                  include: { user: true }
                },
                checklists: {
                  include: {
                    items: {
                      orderBy: { id: 'asc' }
                    }
                  }
                },
                comments: {
                  orderBy: { createdAt: 'desc' },
                  include: { user: true }
                },
                attachments: {
                  orderBy: { createdAt: 'desc' }
                },
                activities: {
                  orderBy: { createdAt: 'desc' }
                }
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
    console.error('Error fetching board:', error);
    res.status(500).json({ error: 'Failed to fetch board' });
  }
});

// PATCH /api/boards/:id - update board fields
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, bgColor, bgImage } = req.body;
  
  try {
    const board = await prisma.board.update({
      where: { id: parseInt(id, 10) },
      data: { title, bgColor, bgImage },
    });
    res.json(board);
  } catch (error) {
    console.error('Error updating board:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Board not found' });
    }
    res.status(500).json({ error: 'Failed to update board' });
  }
});

// DELETE /api/boards/:id - delete board (cascade)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.board.delete({
      where: { id: parseInt(id, 10) },
    });
    res.json({ message: 'Board deleted successfully' });
  } catch (error) {
    console.error('Error deleting board:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Board not found' });
    }
    res.status(500).json({ error: 'Failed to delete board' });
  }
});

module.exports = router;
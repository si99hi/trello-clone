const express = require('express');
const prisma = require('../lib/prisma');
const router = express.Router();

// Helper to create activity entry
async function createActivity(cardId, userId, action) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  const text = `${user.name} ${action}`;
  return prisma.activity.create({
    data: {
      text,
      cardId,
    }
  });
}

// POST /api/cards - create a card
router.post('/', async (req, res) => {
  try {
    const { listId, title, position } = req.body;
    if (!listId || !title) {
      return res.status(400).json({ error: 'listId and title are required' });
    }
    const card = await prisma.card.create({
      data: {
        listId: parseInt(listId),
        title,
        position: position || 0
      },
      include: {
        labels: { include: { label: true } },
        members: { include: { user: true } },
        checklists: { include: { items: true } },
        comments: { include: { user: true } },
        attachments: true,
        activities: true
      }
    });

    // Create activity
    await createActivity(card.id, 1, 'added this card'); // hardcoded Alice as current user

    res.status(201).json(card);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create card' });
  }
});

// PATCH /api/cards/:id - update card
router.patch('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title, description, listId, position, dueDate, isArchived, coverColor, coverImage } = req.body;

    // Fetch old card to detect changes for activity
    const oldCard = await prisma.card.findUnique({ where: { id } });
    if (!oldCard) {
      return res.status(404).json({ error: 'Card not found' });
    }

    const data = {};
    if (title !== undefined) data.title = title;
    if (description !== undefined) data.description = description;
    if (listId !== undefined) data.listId = parseInt(listId);
    if (position !== undefined) data.position = position;
    if (dueDate !== undefined) data.dueDate = dueDate ? new Date(dueDate) : null;
    if (isArchived !== undefined) data.isArchived = isArchived;
    if (coverColor !== undefined) data.coverColor = coverColor;
    if (coverImage !== undefined) data.coverImage = coverImage;

    const card = await prisma.card.update({
      where: { id },
      data,
      include: {
        labels: { include: { label: true } },
        members: { include: { user: true } },
        checklists: { include: { items: true } },
        comments: { include: { user: true } },
        attachments: true,
        activities: true
      }
    });

    // Create activity for significant changes
    const userId = 1; // Alice
    if (listId !== undefined && listId !== oldCard.listId) {
      const newList = await prisma.list.findUnique({ where: { id: listId } });
      await createActivity(id, userId, `moved this card to ${newList.title}`);
    }
    if (dueDate !== undefined) {
      if (dueDate) {
        await createActivity(id, userId, `set due date to ${new Date(dueDate).toLocaleDateString()}`);
      } else {
        await createActivity(id, userId, `removed due date`);
      }
    }
    if (isArchived !== undefined && isArchived === true) {
      await createActivity(id, userId, `archived this card`);
    }
    if (coverColor !== undefined) {
      await createActivity(id, userId, `changed cover`);
    }

    res.json(card);
  } catch (error) {
    console.error(error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Card not found' });
    }
    res.status(500).json({ error: 'Failed to update card' });
  }
});

// DELETE /api/cards/:id - delete card
router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.card.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Card not found' });
    }
    res.status(500).json({ error: 'Failed to delete card' });
  }
});

// POST /api/cards/:id/labels - add label
router.post('/:id/labels', async (req, res) => {
  try {
    const cardId = parseInt(req.params.id);
    const { labelId } = req.body;
    if (!labelId) {
      return res.status(400).json({ error: 'labelId is required' });
    }
    const cardLabel = await prisma.cardLabel.create({
      data: {
        cardId,
        labelId: parseInt(labelId)
      },
      include: { label: true }
    });
    // Activity
    await createActivity(cardId, 1, `added label "${cardLabel.label.name}"`);
    res.status(201).json(cardLabel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add label' });
  }
});

// DELETE /api/cards/:id/labels/:labelId - remove label
router.delete('/:id/labels/:labelId', async (req, res) => {
  try {
    const cardId = parseInt(req.params.id);
    const labelId = parseInt(req.params.labelId);
    const cardLabel = await prisma.cardLabel.findUnique({
      where: { cardId_labelId: { cardId, labelId } },
      include: { label: true }
    });
    if (!cardLabel) {
      return res.status(404).json({ error: 'Label not found on card' });
    }
    await prisma.cardLabel.delete({
      where: { cardId_labelId: { cardId, labelId } }
    });
    // Activity
    await createActivity(cardId, 1, `removed label "${cardLabel.label.name}"`);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to remove label' });
  }
});

// POST /api/cards/:id/members - assign member
router.post('/:id/members', async (req, res) => {
  try {
    const cardId = parseInt(req.params.id);
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }
    const cardMember = await prisma.cardMember.create({
      data: {
        cardId,
        userId: parseInt(userId)
      },
      include: { user: true }
    });
    // Activity
    await createActivity(cardId, 1, `assigned ${cardMember.user.name}`);
    res.status(201).json(cardMember);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to assign member' });
  }
});

// DELETE /api/cards/:id/members/:userId - unassign member
router.delete('/:id/members/:userId', async (req, res) => {
  try {
    const cardId = parseInt(req.params.id);
    const userId = parseInt(req.params.userId);
    const cardMember = await prisma.cardMember.findUnique({
      where: { cardId_userId: { cardId, userId } },
      include: { user: true }
    });
    if (!cardMember) {
      return res.status(404).json({ error: 'Member not assigned' });
    }
    await prisma.cardMember.delete({
      where: { cardId_userId: { cardId, userId } }
    });
    // Activity
    await createActivity(cardId, 1, `removed ${cardMember.user.name}`);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to unassign member' });
  }
});

// Checklist routes
// POST /api/cards/:id/checklists - create checklist
router.post('/:id/checklists', async (req, res) => {
  try {
    const cardId = parseInt(req.params.id);
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'title is required' });
    }
    const checklist = await prisma.checklist.create({
      data: {
        title,
        cardId
      }
    });
    res.status(201).json(checklist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create checklist' });
  }
});

// DELETE /api/checklists/:id - delete checklist
router.delete('/checklists/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.checklist.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete checklist' });
  }
});

// POST /api/checklists/:id/items - add checklist item
router.post('/checklists/:id/items', async (req, res) => {
  try {
    const checklistId = parseInt(req.params.id);
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'text is required' });
    }
    const item = await prisma.checklistItem.create({
      data: {
        text,
        checklistId
      }
    });
    res.status(201).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add checklist item' });
  }
});

// PATCH /api/checklist-items/:id - update checklist item
router.patch('/checklist-items/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { text, isComplete } = req.body;
    const data = {};
    if (text !== undefined) data.text = text;
    if (isComplete !== undefined) data.isComplete = isComplete;
    const item = await prisma.checklistItem.update({
      where: { id },
      data
    });
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update checklist item' });
  }
});

// DELETE /api/checklist-items/:id - delete checklist item
router.delete('/checklist-items/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.checklistItem.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete checklist item' });
  }
});

module.exports = router;
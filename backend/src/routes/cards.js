const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');

// Default user ID for activities and comments
const DEFAULT_USER_ID = 1;

// Helper function to create an activity
async function createActivity(cardId, text) {
  try {
    await prisma.activity.create({
      data: {
        text,
        cardId: parseInt(cardId, 10)
      }
    });
  } catch (error) {
    console.error('Error creating activity:', error);
  }
}

// POST /api/cards - create card { listId, title, position }
router.post('/', async (req, res) => {
  const { listId, title, position } = req.body;
  
  if (!listId || !title || typeof position !== 'number') {
    return res.status(400).json({ error: 'listId, title, and position are required' });
  }

  try {
    const card = await prisma.card.create({
      data: {
        title,
        position,
        listId: parseInt(listId, 10),
      },
    });

    await createActivity(card.id, `added this card to the list`);
    
    res.status(201).json(card);
  } catch (error) {
    console.error('Error creating card:', error);
    res.status(500).json({ error: 'Failed to create card' });
  }
});

// PATCH /api/cards/:id - update any card field
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const cardId = parseInt(id, 10);
  const updateData = req.body;

  try {
    const originalCard = await prisma.card.findUnique({ where: { id: cardId } });
    if (!originalCard) {
      return res.status(404).json({ error: 'Card not found' });
    }

    const card = await prisma.card.update({
      where: { id: cardId },
      data: updateData,
    });

    // Generate Activity Records based on changes
    if (updateData.listId && updateData.listId !== originalCard.listId) {
      // It's tricky to get list names here without extra queries, so keeping it general
      await createActivity(card.id, `moved this card`);
    }
    if (updateData.dueDate !== undefined && updateData.dueDate !== originalCard.dueDate) {
      if (updateData.dueDate) {
        await createActivity(card.id, `set the due date to ${new Date(updateData.dueDate).toLocaleDateString()}`);
      } else {
        await createActivity(card.id, `removed the due date`);
      }
    }
    if (updateData.isArchived !== undefined && updateData.isArchived !== originalCard.isArchived) {
      await createActivity(card.id, updateData.isArchived ? `archived this card` : `sent this card to the board`);
    }
    if (updateData.coverColor !== undefined || updateData.coverImage !== undefined) {
      // Generate activity if cover changed (and it wasn't just initialized to null)
      if ((updateData.coverColor && updateData.coverColor !== originalCard.coverColor) || 
          (updateData.coverImage && updateData.coverImage !== originalCard.coverImage)) {
        await createActivity(card.id, `updated the cover`);
      } else if (updateData.coverColor === null && updateData.coverImage === null && 
                (originalCard.coverColor || originalCard.coverImage)) {
        await createActivity(card.id, `removed the cover`);
      }
    }

    res.json(card);
  } catch (error) {
    console.error('Error updating card:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Card not found' });
    }
    res.status(500).json({ error: 'Failed to update card' });
  }
});

// DELETE /api/cards/:id - delete card
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.card.delete({
      where: { id: parseInt(id, 10) },
    });
    res.json({ message: 'Card deleted successfully' });
  } catch (error) {
    console.error('Error deleting card:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Card not found' });
    }
    res.status(500).json({ error: 'Failed to delete card' });
  }
});

// LABELS

// POST /api/cards/:id/labels - add label { labelId }
router.post('/:id/labels', async (req, res) => {
  const { id } = req.params;
  const { labelId } = req.body;

  if (!labelId) return res.status(400).json({ error: 'labelId is required' });

  try {
    const cardLabel = await prisma.cardLabel.create({
      data: {
        cardId: parseInt(id, 10),
        labelId: parseInt(labelId, 10),
      },
      include: { label: true }
    });

    await createActivity(id, `added the label to this card`);
    res.status(201).json(cardLabel);
  } catch (error) {
    console.error('Error adding label to card:', error);
    res.status(500).json({ error: 'Failed to add label' });
  }
});

// DELETE /api/cards/:id/labels/:labelId - remove label
router.delete('/:id/labels/:labelId', async (req, res) => {
  const { id, labelId } = req.params;

  try {
    await prisma.cardLabel.delete({
      where: {
        cardId_labelId: {
          cardId: parseInt(id, 10),
          labelId: parseInt(labelId, 10),
        }
      }
    });

    await createActivity(id, `removed a label from this card`);
    res.json({ message: 'Label removed successfully' });
  } catch (error) {
    console.error('Error removing label from card:', error);
    if (error.code === 'P2025') return res.status(404).json({ error: 'Label not found on card' });
    res.status(500).json({ error: 'Failed to remove label' });
  }
});

// MEMBERS

// POST /api/cards/:id/members - assign member { userId }
router.post('/:id/members', async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  if (!userId) return res.status(400).json({ error: 'userId is required' });

  try {
    const cardMember = await prisma.cardMember.create({
      data: {
        cardId: parseInt(id, 10),
        userId: parseInt(userId, 10),
      },
      include: { user: true }
    });

    await createActivity(id, `joined this card`);
    res.status(201).json(cardMember);
  } catch (error) {
    console.error('Error adding member to card:', error);
    res.status(500).json({ error: 'Failed to add member' });
  }
});

// DELETE /api/cards/:id/members/:userId - unassign member
router.delete('/:id/members/:userId', async (req, res) => {
  const { id, userId } = req.params;

  try {
    await prisma.cardMember.delete({
      where: {
        cardId_userId: {
          cardId: parseInt(id, 10),
          userId: parseInt(userId, 10),
        }
      }
    });

    await createActivity(id, `left this card`);
    res.json({ message: 'Member removed successfully' });
  } catch (error) {
    console.error('Error removing member from card:', error);
    if (error.code === 'P2025') return res.status(404).json({ error: 'Member not found on card' });
    res.status(500).json({ error: 'Failed to remove member' });
  }
});

// CHECKLISTS

// POST /api/cards/:id/checklists - create checklist { title }
router.post('/:id/checklists', async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  if (!title) return res.status(400).json({ error: 'Title is required' });

  try {
    const checklist = await prisma.checklist.create({
      data: {
        title,
        cardId: parseInt(id, 10),
      },
    });

    await createActivity(id, `added ${title} to this card`);
    res.status(201).json(checklist);
  } catch (error) {
    console.error('Error creating checklist:', error);
    res.status(500).json({ error: 'Failed to create checklist' });
  }
});

// COMMENTS

// POST /api/cards/:id/comments - add comment { text, userId }
router.post('/:id/comments', async (req, res) => {
  const { id } = req.params;
  const { text, userId } = req.body;

  if (!text) return res.status(400).json({ error: 'Text is required' });

  try {
    const comment = await prisma.comment.create({
      data: {
        text,
        cardId: parseInt(id, 10),
        userId: userId ? parseInt(userId, 10) : DEFAULT_USER_ID,
      },
      include: { user: true }
    });
    res.status(201).json(comment);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

// ATTACHMENTS

// POST /api/cards/:id/attachments - add attachment { name, url }
router.post('/:id/attachments', async (req, res) => {
  const { id } = req.params;
  const { name, url } = req.body;

  if (!name || !url) return res.status(400).json({ error: 'Name and URL are required' });

  try {
    const attachment = await prisma.attachment.create({
      data: {
        name,
        url,
        cardId: parseInt(id, 10),
      },
    });

    await createActivity(id, `attached ${name} to this card`);
    res.status(201).json(attachment);
  } catch (error) {
    console.error('Error adding attachment:', error);
    res.status(500).json({ error: 'Failed to add attachment' });
  }
});

module.exports = router;
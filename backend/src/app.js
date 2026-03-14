const express = require('express');
const cors = require('cors');
const boardsRouter = require('./routes/boards');
const listsRouter = require('./routes/lists');
const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');
const labelsRouter = require('./routes/labels');
const commentsRouter = require('./routes/comments');
const attachmentsRouter = require('./routes/attachments');

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000'
}));
app.use(express.json());

const authRouter = require('./routes/auth');

// Routes
app.use('/api/auth', authRouter);
app.use('/api/boards', boardsRouter);
app.use('/api/lists', listsRouter);
app.use('/api/cards', cardsRouter);
app.use('/api/users', usersRouter);
app.use('/api/labels', labelsRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/attachments', attachmentsRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;
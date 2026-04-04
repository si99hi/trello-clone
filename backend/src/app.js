const express = require('express');
const cors = require('cors');
const boardsRouter = require('./routes/boards');
const listsRouter = require('./routes/lists');
const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');
const labelsRouter = require('./routes/labels');
const commentsRouter = require('./routes/comments');
const attachmentsRouter = require('./routes/attachments');
const checklistsRouter = require('./routes/checklists');
const checklistItemsRouter = require('./routes/checklistItems');

const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3001',
].filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    // Allow non-browser requests (e.g. curl, server-to-server) and whitelisted origins.
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Handle preflight OPTIONS requests for all routes.
app.options('*', cors(corsOptions));
app.use(cors(corsOptions));
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
app.use('/api/checklists', checklistsRouter);
app.use('/api/checklist-items', checklistItemsRouter);

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
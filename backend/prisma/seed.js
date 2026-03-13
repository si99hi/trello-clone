const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Clear existing data (optional, for development)
  await prisma.$executeRaw`TRUNCATE "User", "Board", "Label" RESTART IDENTITY CASCADE;`;

  // Create users
  const alice = await prisma.user.create({
    data: { name: 'Alice', email: 'alice@example.com', avatarColor: '#FF5733' }
  });
  const bob = await prisma.user.create({
    data: { name: 'Bob', email: 'bob@example.com', avatarColor: '#33C4FF' }
  });
  const carol = await prisma.user.create({
    data: { name: 'Carol', email: 'carol@example.com', avatarColor: '#28B463' }
  });
  const david = await prisma.user.create({
    data: { name: 'David', email: 'david@example.com', avatarColor: '#F39C12' }
  });

  // Create labels
  const urgent = await prisma.label.create({
    data: { name: 'Urgent', color: '#EB5A46' }
  });
  const design = await prisma.label.create({
    data: { name: 'Design', color: '#C377E0' }
  });
  const backend = await prisma.label.create({
    data: { name: 'Backend', color: '#61BD4F' }
  });
  const review = await prisma.label.create({
    data: { name: 'Review', color: '#F2D600' }
  });
  const frontend = await prisma.label.create({
    data: { name: 'Frontend', color: '#0079BF' }
  });

  // Board 1: My Project Board
  const board1 = await prisma.board.create({
    data: {
      title: 'My Project Board',
      bgColor: '#0052CC',
      lists: {
        create: [
          { title: 'To Do', position: 1 },
          { title: 'In Progress', position: 2 },
          { title: 'Done', position: 3 },
          { title: 'Backlog', position: 4 }
        ]
      }
    },
    include: { lists: true }
  });

  // Get lists for board1
  const todoList = board1.lists.find(l => l.title === 'To Do');
  const inProgressList = board1.lists.find(l => l.title === 'In Progress');
  const doneList = board1.lists.find(l => l.title === 'Done');
  const backlogList = board1.lists.find(l => l.title === 'Backlog');

  // Create cards in To Do
  const card1 = await prisma.card.create({
    data: {
      title: 'Design homepage',
      description: 'Create wireframes and high-fidelity designs for the new landing page.',
      position: 1,
      listId: todoList.id,
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      coverColor: '#0079BF',
      labels: { create: [{ labelId: design.id }, { labelId: frontend.id }] },
      members: { create: [{ userId: alice.id }, { userId: bob.id }] }
    }
  });

  const card2 = await prisma.card.create({
    data: {
      title: 'Set up backend API',
      description: 'Initialize Express server and connect to PostgreSQL.',
      position: 2,
      listId: todoList.id,
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      labels: { create: [{ labelId: backend.id }] },
      members: { create: [{ userId: carol.id }] }
    }
  });

  const card3 = await prisma.card.create({
    data: {
      title: 'Implement authentication',
      description: 'Add JWT-based auth for users.',
      position: 3,
      listId: todoList.id,
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      labels: { create: [{ labelId: backend.id }, { labelId: urgent.id }] },
      members: { create: [{ userId: david.id }] }
    }
  });

  // Cards in In Progress
  const card4 = await prisma.card.create({
    data: {
      title: 'Create database schema',
      description: 'Design Prisma models for boards, lists, cards.',
      position: 1,
      listId: inProgressList.id,
      dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // overdue
      labels: { create: [{ labelId: backend.id }] },
      members: { create: [{ userId: alice.id }, { userId: carol.id }] }
    }
  });

  const card5 = await prisma.card.create({
    data: {
      title: 'Build drag and drop',
      description: 'Implement dnd-kit for lists and cards.',
      position: 2,
      listId: inProgressList.id,
      dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // due soon
      labels: { create: [{ labelId: frontend.id }] },
      members: { create: [{ userId: bob.id }] },
      checklists: {
        create: [
          {
            title: 'Setup dnd-kit',
            items: {
              create: [
                { text: 'Install packages', isComplete: true },
                { text: 'Wrap board with DndContext', isComplete: true },
                { text: 'Implement sortable for lists', isComplete: false },
                { text: 'Implement sortable for cards', isComplete: false }
              ]
            }
          }
        ]
      },
      comments: {
        create: [
          { text: 'We need to handle horizontal drag for lists.', userId: alice.id },
          { text: 'I\'ll start working on this today.', userId: bob.id }
        ]
      },
      attachments: {
        create: [
          { name: 'dnd-kit docs', url: 'https://docs.dndkit.com' }
        ]
      }
    }
  });

  // Cards in Done
  const card6 = await prisma.card.create({
    data: {
      title: 'Write project requirements',
      description: 'Document all features and user stories.',
      position: 1,
      listId: doneList.id,
      dueDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      labels: { create: [{ labelId: review.id }] },
      members: { create: [{ userId: alice.id }] }
    }
  });

  const card7 = await prisma.card.create({
    data: {
      title: 'Set up Tailwind CSS',
      description: 'Configure Tailwind in Next.js project.',
      position: 2,
      listId: doneList.id,
      dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      labels: { create: [{ labelId: frontend.id }] },
      members: { create: [{ userId: bob.id }] }
    }
  });

  // Cards in Backlog
  const card8 = await prisma.card.create({
    data: {
      title: 'Implement search & filter',
      description: 'Add global search and filter panel.',
      position: 1,
      listId: backlogList.id,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      labels: { create: [{ labelId: frontend.id }] },
      members: { create: [{ userId: david.id }] }
    }
  });

  const card9 = await prisma.card.create({
    data: {
      title: 'Add card covers',
      description: 'Allow users to set cover colors/images.',
      position: 2,
      listId: backlogList.id,
      dueDate: null,
      labels: { create: [{ labelId: design.id }] },
      members: { create: [{ userId: carol.id }] }
    }
  });

  const card10 = await prisma.card.create({
    data: {
      title: 'Write tests',
      description: 'Add unit and integration tests.',
      position: 3,
      listId: backlogList.id,
      dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      labels: { create: [{ labelId: review.id }] },
      members: { create: [{ userId: alice.id }, { userId: bob.id }] }
    }
  });

  // Board 2: Marketing Campaign
  const board2 = await prisma.board.create({
    data: {
      title: 'Marketing Campaign',
      bgColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // gradient
      lists: {
        create: [
          { title: 'Ideas', position: 1 },
          { title: 'In Progress', position: 2 },
          { title: 'Completed', position: 3 }
        ]
      }
    }
  });

  console.log('Database seeded successfully!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
export type TemplateId =
  | 'hr-onboarding'
  | 'hr-performance'
  | 'personal-productivity'
  | 'marketing-launch'
  | 'education-weekly-planning'
  | 'education-lesson-planning'
  | 'education-learn-language';

export interface BoardTemplate {
  id: TemplateId;
  title: string;
  subtitle: string;
  category: 'HR' | 'Personal' | 'Marketing' | 'Education';
  image: string;
  bgColor: string;
  lists: Array<{
    title: string;
    cards: string[];
  }>;
}

export const BOARD_TEMPLATES: BoardTemplate[] = [
  {
    id: 'hr-onboarding',
    title: 'HR Onboarding',
    subtitle: 'Track first-week onboarding tasks',
    category: 'HR',
    image: '/images/templates/hr-onboarding.png',
    bgColor: '#1D7AFC',
    lists: [
      { title: 'Pre-boarding', cards: ['Collect documents', 'Set up account access'] },
      { title: 'Day 1', cards: ['Welcome session', 'Team introductions'] },
      { title: 'Week 1', cards: ['Role training', 'Check-in with manager'] }
    ]
  },
  {
    id: 'hr-performance',
    title: 'Performance Review',
    subtitle: 'Structure quarterly employee reviews',
    category: 'HR',
    image: '/images/templates/hr-performance.png',
    bgColor: '#D03C2C',
    lists: [
      { title: 'Self Review', cards: ['Employee self-assessment', 'Goal reflection'] },
      { title: 'Manager Review', cards: ['Feedback notes', 'Performance rating'] },
      { title: 'Finalized', cards: ['Review summary shared', 'Development plan'] }
    ]
  },
  {
    id: 'personal-productivity',
    title: 'Personal Productivity',
    subtitle: 'Plan your weekly priorities',
    category: 'Personal',
    image: '/images/templates/personal-productivity.png',
    bgColor: '#5F49D8',
    lists: [
      { title: 'This Week', cards: ['Top 3 priorities', 'Errands'] },
      { title: 'In Progress', cards: ['Deep work task', 'Workout routine'] },
      { title: 'Done', cards: ['Completed habits'] }
    ]
  },
  {
    id: 'marketing-launch',
    title: 'Marketing Campaign',
    subtitle: 'Manage multi-channel campaign launch',
    category: 'Marketing',
    image: '/images/templates/marketing-launch.png',
    bgColor: '#157347',
    lists: [
      { title: 'Planning', cards: ['Campaign brief', 'Audience & channel plan'] },
      { title: 'Production', cards: ['Write copy', 'Design assets'] },
      { title: 'Launch & Report', cards: ['Go live checklist', 'Performance report'] }
    ]
  },
  {
    id: 'education-weekly-planning',
    title: 'Teaching: Weekly Planning',
    subtitle: 'Plan classes for the full week',
    category: 'Education',
    image: '/images/templates/education-weekly-planning.png',
    bgColor: '#E67E22',
    lists: [
      { title: 'Monday', cards: ['Lesson objective', 'Homework check'] },
      { title: 'Tuesday-Thursday', cards: ['Topic activities', 'Student participation'] },
      { title: 'Friday', cards: ['Weekly recap', 'Quiz and feedback'] }
    ]
  },
  {
    id: 'education-lesson-planning',
    title: 'Lesson Planning',
    subtitle: 'Build outcomes, activities, and assessments',
    category: 'Education',
    image: '/images/templates/education-books.png',
    bgColor: '#3498DB',
    lists: [
      { title: 'Objectives', cards: ['Define learning outcomes', 'Set success criteria'] },
      { title: 'Activities', cards: ['Warm-up', 'Main task', 'Group discussion'] },
      { title: 'Assessment', cards: ['Exit ticket', 'Homework assignment'] }
    ]
  },
  {
    id: 'education-learn-language',
    title: 'Learn A Language',
    subtitle: 'Track daily study and progress',
    category: 'Education',
    image: '/images/templates/education-language-board.png',
    bgColor: '#8E44AD',
    lists: [
      { title: 'To Do', cards: ['Pick a language to learn', 'Set daily study time'] },
      { title: 'Doing', cards: ['Practice vocabulary', 'Watch language videos'] },
      { title: 'Done', cards: ['Complete weekly review', 'Take mini test'] }
    ]
  }
];

export const TEMPLATE_CATEGORIES = ['Education', 'HR', 'Personal', 'Marketing'] as const;

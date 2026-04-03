// Types
export interface User {
  id: number;
  name: string;
  email: string;
  avatarColor: string;
}

export interface Label {
  id: number;
  name: string;
  color: string;
}

export interface Board {
  id: number;
  title: string;
  bgColor: string;
  bgImage: string | null;
  createdAt: string;
  lists?: List[];
}

export interface List {
  id: number;
  title: string;
  position: number;
  boardId: number;
  cards?: Card[];
}

export interface Card {
  id: number;
  title: string;
  description: string | null;
  position: number;
  dueDate: string | null;
  isArchived: boolean;
  coverColor: string | null;
  coverImage: string | null;
  listId: number;
  labels: Array<{ label: Label }>;
  members: Array<{ user: User }>;
  checklists: Checklist[];
  comments: Comment[];
  attachments: Attachment[];
  activities: Activity[];
}

export interface Checklist {
  id: number;
  title: string;
  cardId: number;
  items: ChecklistItem[];
}

export interface ChecklistItem {
  id: number;
  text: string;
  isComplete: boolean;
  checklistId: number;
}

export interface Comment {
  id: number;
  text: string;
  createdAt: string;
  cardId: number;
  userId: number;
  user: User;
}

export interface Attachment {
  id: number;
  name: string;
  url: string;
  createdAt: string;
  cardId: number;
}

export interface Activity {
  id: number;
  text: string;
  createdAt: string;
  cardId: number;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || 'Request failed');
  }
  if (res.status === 204) {
    return null as T;
  }
  return res.json();
}

export const api = {
  // Boards
  getBoards: () => fetchApi<Board[]>('/boards'),
  createBoard: (data: { title: string; bgColor?: string; bgImage?: string }) =>
    fetchApi<Board>('/boards', { method: 'POST', body: JSON.stringify(data) }),
  getBoard: (id: number) => fetchApi<Board>(`/boards/${id}`),
  updateBoard: (id: number, data: Partial<Board>) =>
    fetchApi<Board>(`/boards/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  deleteBoard: (id: number) => fetchApi(`/boards/${id}`, { method: 'DELETE' }),

  // Lists
  createList: (data: { boardId: number; title: string; position?: number }) =>
    fetchApi<List>('/lists', { method: 'POST', body: JSON.stringify(data) }),
  updateList: (id: number, data: Partial<List>) =>
    fetchApi<List>(`/lists/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  deleteList: (id: number) => fetchApi(`/lists/${id}`, { method: 'DELETE' }),

  // Cards
  createCard: (data: { listId: number; title: string; position?: number }) =>
    fetchApi<Card>('/cards', { method: 'POST', body: JSON.stringify(data) }),
  updateCard: (id: number, data: Partial<Card>) =>
    fetchApi<Card>(`/cards/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  deleteCard: (id: number) => fetchApi(`/cards/${id}`, { method: 'DELETE' }),

  // Card Labels
  addLabelToCard: (cardId: number, labelId: number) =>
    fetchApi(`/cards/${cardId}/labels`, { method: 'POST', body: JSON.stringify({ labelId }) }),
  removeLabelFromCard: (cardId: number, labelId: number) =>
    fetchApi(`/cards/${cardId}/labels/${labelId}`, { method: 'DELETE' }),

  // Card Members
  addMemberToCard: (cardId: number, userId: number) =>
    fetchApi(`/cards/${cardId}/members`, { method: 'POST', body: JSON.stringify({ userId }) }),
  removeMemberFromCard: (cardId: number, userId: number) =>
    fetchApi(`/cards/${cardId}/members/${userId}`, { method: 'DELETE' }),

  // Checklists
  createChecklist: (cardId: number, title: string) =>
    fetchApi<Checklist>(`/cards/${cardId}/checklists`, { method: 'POST', body: JSON.stringify({ title }) }),
  deleteChecklist: (id: number) => fetchApi(`/checklists/${id}`, { method: 'DELETE' }),
  addChecklistItem: (checklistId: number, text: string) =>
    fetchApi<ChecklistItem>(`/checklists/${checklistId}/items`, { method: 'POST', body: JSON.stringify({ text }) }),
  updateChecklistItem: (id: number, data: Partial<ChecklistItem>) =>
    fetchApi<ChecklistItem>(`/checklist-items/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  deleteChecklistItem: (id: number) => fetchApi(`/checklist-items/${id}`, { method: 'DELETE' }),

  // Comments
  addComment: (cardId: number, text: string, userId: number = 1) =>
    fetchApi<Comment>(`/cards/${cardId}/comments`, { method: 'POST', body: JSON.stringify({ text, userId }) }),
  updateComment: (id: number, text: string) =>
    fetchApi<Comment>(`/comments/${id}`, { method: 'PATCH', body: JSON.stringify({ text }) }),
  deleteComment: (id: number) => fetchApi(`/comments/${id}`, { method: 'DELETE' }),

  // Attachments
  addAttachment: (cardId: number, name: string, url: string) =>
    fetchApi<Attachment>(`/cards/${cardId}/attachments`, { method: 'POST', body: JSON.stringify({ name, url }) }),
  deleteAttachment: (id: number) => fetchApi(`/attachments/${id}`, { method: 'DELETE' }),

  // Users & Labels
  getUsers: () => fetchApi<User[]>('/users'),
  getLabels: () => fetchApi<Label[]>('/labels'),

  // Auth
  checkEmail: (email: string) => fetchApi<{ exists: boolean, message?: string }>('/auth/start', { method: 'POST', body: JSON.stringify({ email }) }),
  signup: (data: any) => fetchApi<{ user: User, token: string }>('/auth/verify-setup', { method: 'POST', body: JSON.stringify(data) }),
  login: (data: any) => fetchApi<{ user: User, token: string }>('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  forgotPassword: (email: string) => fetchApi<{ message: string }>('/auth/forgot-password', { method: 'POST', body: JSON.stringify({ email }) }),
  resetPassword: (data: { email: string; otp: string; password: string }) =>
    fetchApi<{ message: string }>('/auth/reset-password', { method: 'POST', body: JSON.stringify(data) }),
};
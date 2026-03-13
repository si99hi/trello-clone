'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import { Plus, X } from 'lucide-react';

interface AddListFormProps {
  boardId: number;
  nextPosition: number;
  onAdd: (list: any) => void;
}

export default function AddListForm({ boardId, nextPosition, onAdd }: AddListFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const newList = await api.createList({ boardId, title: title.trim(), position: nextPosition });
      onAdd({ ...newList, cards: [] });
      setTitle('');
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to create list:', error);
    }
  };

  if (isEditing) {
    return (
      <div className="bg-trello-list w-[272px] rounded-lg p-2 flex-shrink-0 h-fit">
        <form onSubmit={handleSubmit}>
          <input
            autoFocus
            className="w-full p-2 bg-trello-card text-trello-text-primary rounded focus:outline-none focus:ring-2 focus:ring-trello-blue mb-2 shadow-sm"
            placeholder="Enter list title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="flex items-center space-x-2">
            <button
              type="submit"
              className="bg-trello-blue hover:bg-trello-blue-hover text-white px-3 py-1.5 rounded font-medium text-sm transition-colors"
            >
              Add list
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="p-1.5 text-trello-text-secondary hover:text-trello-text-primary hover:bg-trello-card-hover rounded transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <button
      onClick={() => setIsEditing(true)}
      className="bg-white/10 hover:bg-white/20 w-[272px] rounded-lg p-3 flex items-center text-white flex-shrink-0 h-fit font-medium transition-colors"
    >
      <Plus size={20} className="mr-2" />
      Add another list
    </button>
  );
}

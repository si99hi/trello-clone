'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import { Plus, X } from 'lucide-react';

interface AddCardFormProps {
  listId: number;
  nextPosition: number;
  onAdd: (card: any) => void;
}

export default function AddCardForm({ listId, nextPosition, onAdd }: AddCardFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const newCard = await api.createCard({ listId, title: title.trim(), position: nextPosition });
      onAdd(newCard);
      setTitle('');
      // Keep editing mode open for fast entry
    } catch (error) {
      console.error('Failed to create card:', error);
    }
  };

  if (isEditing) {
    return (
      <div className="px-2 pb-2">
        <form onSubmit={handleSubmit}>
          <textarea
            autoFocus
            className="w-full p-2 bg-trello-card text-trello-text-primary rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-trello-blue mb-2 resize-none text-sm"
            placeholder="Enter a title for this card..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            rows={3}
          />
          <div className="flex items-center space-x-2">
            <button
              type="submit"
              className="bg-trello-blue hover:bg-trello-blue-hover text-white px-3 py-1.5 rounded font-medium text-sm transition-colors"
            >
              Add card
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setTitle('');
              }}
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
    <div className="px-2 pb-2 mt-2">
      <button
        onClick={() => setIsEditing(true)}
        className="text-trello-text-secondary hover:text-trello-text-primary hover:bg-trello-card-hover w-full flex items-center p-2 rounded text-sm font-medium transition-colors"
      >
        <Plus size={16} className="mr-2" />
        Add a card
      </button>
    </div>
  );
}

'use client';

import { useState } from 'react';

interface CreateBoardModalProps {
  onClose: () => void;
  onCreate: (title: string, bgColor: string, bgImage?: string) => void;
}

const colors = [
  '#0052CC', // blue
  '#00A3BF', // cyan
  '#36B37E', // green
  '#FF991F', // orange
  '#FF5630', // red
  '#6554C0', // purple
];

const gradients = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
];

export default function CreateBoardModal({ onClose, onCreate }: CreateBoardModalProps) {
  const [title, setTitle] = useState('');
  const [bgColor, setBgColor] = useState(colors[0]);
  const [showGradients, setShowGradients] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onCreate(title.trim(), bgColor);
    }
  };

  const bgOptions = showGradients ? gradients : colors;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-trello-modal rounded-lg w-96 p-6">
        <h2 className="text-xl font-semibold mb-4">Create board</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Background</label>
            <div
              className="h-24 rounded-lg mb-2"
              style={{ background: bgColor }}
            />
            <div className="flex space-x-2 mb-2">
              <button
                type="button"
                onClick={() => setShowGradients(false)}
                className={`px-3 py-1 rounded text-sm ${!showGradients ? 'bg-trello-blue' : 'bg-trello-card'}`}
              >
                Colors
              </button>
              <button
                type="button"
                onClick={() => setShowGradients(true)}
                className={`px-3 py-1 rounded text-sm ${showGradients ? 'bg-trello-blue' : 'bg-trello-card'}`}
              >
                Gradients
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {bgOptions.map((color, i) => (
                <button
                  key={i}
                  type="button"
                  className="h-10 rounded hover:opacity-80"
                  style={{ background: color }}
                  onClick={() => setBgColor(color)}
                />
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Board title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-trello-card border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-trello-blue"
              placeholder="e.g., My Project"
              autoFocus
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm hover:bg-trello-card rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-trello-blue hover:bg-trello-blue-hover rounded text-sm font-medium"
              disabled={!title.trim()}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
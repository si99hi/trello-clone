'use client';

import { useState } from 'react';
import { User, Label } from '@/lib/api';
import Avatar from '../ui/Avatar';
import LabelChip from '../ui/LabelChip';

interface FilterPanelProps {
  users: User[];
  labels: Label[];
  filters: any;
  onFilterChange: (filters: any) => void;
}

export default function FilterPanel({ users, labels, filters, onFilterChange }: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMember = (userId: number) => {
    const newMemberIds = filters.memberIds.includes(userId)
      ? filters.memberIds.filter((id: number) => id !== userId)
      : [...filters.memberIds, userId];
    onFilterChange({ ...filters, memberIds: newMemberIds });
  };

  const toggleLabel = (labelId: number) => {
    const newLabelIds = filters.labelIds.includes(labelId)
      ? filters.labelIds.filter((id: number) => id !== labelId)
      : [...filters.labelIds, labelId];
    onFilterChange({ ...filters, labelIds: newLabelIds });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-trello-card hover:bg-trello-card-hover px-3 py-1.5 rounded text-sm"
      >
        Filter
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-trello-modal rounded shadow-lg z-50 p-4">
          <h3 className="font-semibold mb-3">Filter cards</h3>

          <div className="mb-4">
            <h4 className="text-sm text-trello-text-secondary mb-2">Members</h4>
            <div className="space-y-2">
              {users.map(user => (
                <label key={user.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.memberIds.includes(user.id)}
                    onChange={() => toggleMember(user.id)}
                    className="rounded border-gray-600 bg-trello-card"
                  />
                  <Avatar name={user.name} color={user.avatarColor} size="xs" />
                  <span className="text-sm">{user.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-sm text-trello-text-secondary mb-2">Labels</h4>
            <div className="space-y-2">
              {labels.map(label => (
                <label key={label.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.labelIds.includes(label.id)}
                    onChange={() => toggleLabel(label.id)}
                    className="rounded border-gray-600 bg-trello-card"
                  />
                  <LabelChip label={label} />
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => onFilterChange({ memberIds: [], labelIds: [], dueDateFilter: [] })}
              className="text-sm text-trello-blue hover:underline"
            >
              Clear all
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
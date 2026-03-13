'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Board, List, Card, api } from '@/lib/api';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  
  // We need to pass the query up to the board page usually,
  // but for simplicity in a separated component tree without context,
  // we could emit a custom event on window
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    // Dispatch a custom event that the board page can listen to
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('trello-search', { detail: value }));
    }
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search"
        className="w-full bg-transparent border border-gray-600/60 rounded pl-8 pr-3 py-1 text-sm text-trello-text-primary placeholder:text-trello-text-secondary focus:outline-none focus:ring-2 focus:ring-trello-blue focus:bg-trello-bg transition-all h-8"
      />
      <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-trello-text-secondary" />
      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Avatar from '../ui/Avatar';
import SearchBar from '../filters/SearchBar';
import { Grid, ChevronDown, Bell, HelpCircle } from 'lucide-react';

interface NavbarProps {
  onCreateClick?: () => void;
}

export default function Navbar({ onCreateClick }: NavbarProps) {
  return (
    <nav className="bg-trello-nav h-12 flex items-center px-3 justify-between text-trello-text-primary border-b border-gray-700/50 text-sm font-medium sticky top-0 z-50">
      <div className="flex items-center h-full">
        {/* Main Logo Area */}
        <button className="flex items-center justify-center hover:bg-white/10 p-1.5 rounded h-8 cursor-pointer transition-colors mr-1">
           <Grid className="w-5 h-5 opacity-80" />
        </button>
        
        <Link href="/dashboard" className="flex items-center hover:bg-white/10 px-2 rounded h-8 transition-colors mr-4">
           <div className="flex items-center text-trello-text-primary text-lg font-bold">
             <TrelloIcon className="w-5 h-5 mr-1 text-trello-blue" />
             Taskflow
           </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-1 h-full">
            <NavButton text="Workspaces" hasDropdown />
            <NavButton text="Recent" hasDropdown />
            <NavButton text="Starred" hasDropdown />
            <Link href="/templates" className="flex items-center px-3 h-8 rounded hover:bg-white/10 transition-colors text-trello-text-primary">
              Templates
            </Link>
            
            <div className="ml-2 flex items-center h-full">
              <button
                onClick={onCreateClick}
                className="bg-trello-blue hover:bg-trello-blue-hover text-trello-bg px-3 h-8 rounded text-[14px] font-semibold transition-colors flex items-center"
              >
                Create
              </button>
            </div>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center space-x-2 h-full">
        <div className="hidden md:block w-[200px] lg:w-[250px]">
          <SearchBar />
        </div>
        
        <div className="flex items-center space-x-1">
           <IconButton Icon={Bell} />
           <IconButton Icon={HelpCircle} />
        </div>
        
        <button className="ml-1 cursor-pointer hover:ring-2 ring-transparent ring-offset-1 ring-offset-trello-nav hover:ring-trello-text-primary rounded-full transition-all">
          <Avatar name="User" color="#FF5733" size="sm" />
        </button>
      </div>
    </nav>
  );
}

// Helpers for the Navbar
function NavButton({
  text,
  hasDropdown
}: {
  text: string,
  hasDropdown?: boolean
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative h-full flex items-center">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        className={`flex items-center px-3 h-8 rounded transition-colors text-trello-text-primary ${isOpen ? 'bg-white/10 text-trello-blue' : 'hover:bg-white/10'}`}
      >
         {text}
         {hasDropdown && <ChevronDown className={`w-4 h-4 ml-1 opacity-70 transition-transform ${isOpen ? 'rotate-180' : ''}`} />}
      </button>

      {isOpen && hasDropdown && (
        <div className="absolute top-11 left-0 w-64 bg-trello-modal rounded shadow-xl py-2 z-50 border border-trello-card">
          <div className="px-4 py-2 text-xs font-semibold text-trello-text-secondary uppercase">
             {text}
          </div>
          <div className="px-4 py-2 text-sm text-trello-text-primary hover:bg-white/10 cursor-pointer">
             Fake {text} Item 1
          </div>
          <div className="px-4 py-2 text-sm text-trello-text-primary hover:bg-white/10 cursor-pointer">
             Fake {text} Item 2
          </div>
        </div>
      )}
    </div>
  );
}

function IconButton({ Icon }: { Icon: any }) {
  return (
    <button className="flex items-center justify-center hover:bg-white/10 h-8 w-8 rounded-full transition-colors">
       <Icon className="w-5 h-5 text-trello-text-primary opacity-80" />
    </button>
  );
}

function TrelloIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
       <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3ZM10 16C10 16.5523 9.55228 17 9 17H7C6.44772 17 6 16.5523 6 16V6C6 5.44772 6.44772 5 7 5H9C9.55228 5 10 5.44772 10 6V16ZM18 11C18 11.5523 17.5523 12 17 12H15C14.4477 12 14 11.5523 14 11V6C14 5.44772 14.4477 5 15 5H17C17.5523 5 18 5.44772 18 6V11Z" />
    </svg>
  );
}
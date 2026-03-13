'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Avatar from '../ui/Avatar';
import SearchBar from '../filters/SearchBar';
import { Grid, ChevronDown, Bell, HelpCircle } from 'lucide-react';

export default function Navbar() {
  const router = useRouter();
  const [showCreateMenu, setShowCreateMenu] = useState(false);

  return (
    <nav className="bg-trello-nav h-12 flex items-center px-3 justify-between text-trello-text-primary border-b border-gray-700/50 text-sm font-medium sticky top-0 z-50">
      <div className="flex items-center h-full">
        {/* Main Logo Area */}
        <div className="flex items-center hover:bg-white/10 px-2 rounded h-8 cursor-pointer transition-colors mr-1">
           <Grid className="w-5 h-5 mr-1 opacity-80" />
        </div>
        
        <Link href="/" className="flex items-center hover:bg-white/10 px-2 rounded h-8 transition-colors mr-2">
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
            <NavButton text="Templates" hasDropdown />
            
            <div className="relative ml-2 flex items-center h-full">
              <button
                onClick={() => setShowCreateMenu(!showCreateMenu)}
                className="bg-trello-blue hover:bg-trello-blue-hover text-trello-bg px-3 h-8 rounded text-[14px] font-semibold transition-colors flex items-center"
              >
                Create
              </button>
          {showCreateMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-trello-modal rounded shadow-lg py-1 z-50">
              <button
                onClick={() => {
                  setShowCreateMenu(false);
                  router.push('/?createBoard=true');
                }}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-white/10 text-trello-text-primary"
              >
                Create board
              </button>
            </div>
          )}
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
        
        <div className="ml-1 cursor-pointer hover:ring-2 ring-transparent ring-offset-1 hover:ring-trello-text-primary rounded-full transition-all">
          <Avatar name="Alice" color="#FF5733" size="sm" />
        </div>
      </div>
    </nav>
  );
}

// Helpers for the Navbar
function NavButton({ text, hasDropdown }: { text: string, hasDropdown?: boolean }) {
  return (
    <button className="flex items-center hover:bg-white/10 px-3 h-8 rounded transition-colors text-trello-text-primary">
       {text}
       {hasDropdown && <ChevronDown className="w-4 h-4 ml-1 opacity-70" />}
    </button>
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
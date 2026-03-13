'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api, Board } from '@/lib/api';
import Navbar from '@/components/navbar/Navbar';
import BoardCard from '@/components/board/BoardCard';
import CreateBoardModal from '@/components/board/CreateBoardModal';
import { LayoutDashboard, Activity, Heart, Settings, Users, Plus, Trello } from 'lucide-react';

export default function HomePage() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const data = await api.getBoards();
      setBoards(data);
    } catch (error) {
      console.error('Failed to fetch boards:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBoard = async (title: string, bgColor: string, bgImage?: string) => {
    try {
      const newBoard = await api.createBoard({ title, bgColor, bgImage });
      setBoards(prev => [newBoard, ...prev]);
      setShowCreateModal(false);
      router.push(`/boards/${newBoard.id}`);
    } catch (error) {
      console.error('Failed to create board:', error);
    }
  };

  return (
    <div className="min-h-screen bg-trello-bg flex flex-col">
      <Navbar />
      <div className="flex flex-1 max-w-[1200px] w-full mx-auto mt-10 px-4 gap-8 items-start">
        {/* Left Sidebar Menu */}
        <aside className="w-64 flex-shrink-0 sticky top-20">
            <nav className="space-y-1 mb-6">
                <a href="#" className="flex items-center px-3 py-2 text-sm font-semibold bg-trello-blue/10 text-trello-blue rounded-lg">
                    <Trello className="w-4 h-4 mr-3" /> Boards
                </a>
                <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-trello-text-primary hover:bg-white/5 rounded-lg transition-colors">
                    <LayoutDashboard className="w-4 h-4 mr-3" /> Templates
                </a>
                <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-trello-text-primary hover:bg-white/5 rounded-lg transition-colors">
                    <Activity className="w-4 h-4 mr-3" /> Home
                </a>
            </nav>
            <div className="border-t border-gray-700/50 pt-4">
                <div className="px-3 mb-2 flex items-center justify-between text-xs font-semibold text-trello-text-secondary">
                    <span>Workspaces</span>
                    <Plus className="w-3.5 h-3.5 cursor-pointer hover:text-white" />
                </div>
                <div className="space-y-0.5">
                    <a href="#" className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/5">
                        <div className="flex items-center">
                            <div className="w-6 h-6 rounded bg-gradient-to-br from-green-400 to-green-600 text-white flex items-center justify-center font-bold text-xs mr-2">T</div>
                            <span className="text-sm font-bold text-trello-text-primary">Trello Workspace</span>
                        </div>
                        <Settings className="w-4 h-4 text-trello-text-secondary" />
                    </a>
                </div>
            </div>
        </aside>

        {/* Main Workspace Content */}
        <main className="flex-1 min-w-0">
          
          {/* Recently Viewed */}
          {boards.length > 0 && (
             <section className="mb-10">
                <div className="flex items-center mb-4 text-trello-text-primary text-base font-bold">
                    <Heart className="w-5 h-5 mr-3" /> Recently viewed
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {boards.slice(0, 4).map(board => (
                        <BoardCard key={board.id} board={board} />
                    ))}
                </div>
             </section>
          )}

          {/* Your Workspaces */}
          <section>
              <h2 className="text-sm font-bold text-trello-text-secondary tracking-widest uppercase mb-4">YOUR WORKSPACES</h2>
              
              <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                     <div className="w-10 h-10 rounded bg-gradient-to-br from-green-400 to-green-600 text-white flex items-center justify-center font-bold text-lg mr-3 shadow-sm">T</div>
                     <span className="text-lg font-bold text-trello-text-primary">Trello Workspace</span>
                  </div>
                  <div className="flex space-x-2">
                     <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded flex items-center text-sm font-medium text-trello-text-primary transition-colors">
                        <Trello className="w-4 h-4 mr-2" /> Boards
                     </button>
                     <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded flex items-center text-sm font-medium text-trello-text-primary transition-colors">
                        <Users className="w-4 h-4 mr-2" /> Members
                     </button>
                     <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded flex items-center text-sm font-medium text-trello-text-primary transition-colors">
                        <Settings className="w-4 h-4 mr-2" /> Settings
                     </button>
                  </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {boards.map(board => (
                  <BoardCard key={board.id} board={board} />
                ))}
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="h-24 bg-trello-card hover:bg-white/10 rounded-lg flex items-center justify-center text-trello-text-primary text-sm font-medium transition-colors"
                >
                  Create new board
                </button>
              </div>
          </section>
        </main>
      </div>
      {showCreateModal && (
        <CreateBoardModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateBoard}
        />
      )}
    </div>
  );
}
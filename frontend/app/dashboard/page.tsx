'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { api, Board } from '@/lib/api';
import { BOARD_TEMPLATES, TEMPLATE_CATEGORIES, TemplateId } from '@/lib/templates';
import Navbar from '@/components/navbar/Navbar';
import BoardCard from '@/components/board/BoardCard';
import CreateBoardModal from '@/components/board/CreateBoardModal';
import { LayoutDashboard, Activity, Heart, Settings, Users, Plus, Trello } from 'lucide-react';

export default function HomePage() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [templateCategory, setTemplateCategory] = useState<(typeof TEMPLATE_CATEGORIES)[number]>('Education');
  const router = useRouter();

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      setError(null);
      const data = await api.getBoards();
      setBoards(data);
    } catch (error) {
      console.error('Failed to fetch boards:', error);
      setError('Failed to fetch boards. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBoard = async (title: string, bgColor: string, bgImage?: string) => {
    const tempId = Date.now();
    const optimisticBoard: Board = { id: tempId, title, bgColor, bgImage: bgImage || null, createdAt: new Date().toISOString() };
    
    try {
      setBoards(prev => [optimisticBoard, ...prev]);
      setShowCreateModal(false);
      const newBoard = await api.createBoard({ title, bgColor, bgImage });
      setBoards(prev => prev.map(b => b.id === tempId ? newBoard : b));
      router.push(`/boards/${newBoard.id}`);
    } catch (error) {
      console.error('Failed to create board:', error);
      setBoards(prev => prev.filter(b => b.id !== tempId));
      alert('Failed to create board. Please try again.');
    }
  };

  const handleCreateTemplate = async (templateId: TemplateId) => {
    try {
      const templateConfig = BOARD_TEMPLATES.find((t) => t.id === templateId);
      if (!templateConfig) {
        throw new Error('Template not found');
      }

      const newBoard = await api.createBoard({
        title: templateConfig.title,
        bgColor: templateConfig.bgColor,
        bgImage: templateConfig.image,
      });

      for (let i = 0; i < templateConfig.lists.length; i += 1) {
        const listData = templateConfig.lists[i];
        const createdList = await api.createList({
          boardId: newBoard.id,
          title: listData.title,
          position: i,
        });

        for (let j = 0; j < listData.cards.length; j += 1) {
          await api.createCard({
            listId: createdList.id,
            title: listData.cards[j],
            position: j,
          });
        }
      }

      await fetchBoards();
      router.push(`/boards/${newBoard.id}`);
    } catch (err) {
      console.error('Failed to create template board:', err);
      alert('Failed to create template. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-trello-bg flex flex-col">
      <Navbar onCreateClick={() => setShowCreateModal(true)} />
      
      <div className="flex flex-1 w-full max-w-[1200px] mx-auto mt-10 px-4 gap-8 items-start">
        {/* Left Sidebar Menu */}
        <aside className="w-64 flex-shrink-0 sticky top-20 hidden md:block">
            <nav className="space-y-1 mb-6">
                <button className="w-full flex items-center px-3 py-2 text-sm font-semibold bg-trello-blue/10 text-trello-blue rounded-lg transition-colors">
                    <Trello className="w-4 h-4 mr-3" /> Boards
                </button>
                <button
                    onClick={() => router.push('/templates')}
                    className="w-full flex items-center px-3 py-2 text-sm font-medium text-trello-text-primary hover:bg-white/5 rounded-lg transition-colors"
                >
                    <LayoutDashboard className="w-4 h-4 mr-3" /> Templates
                </button>
                <button className="w-full flex items-center px-3 py-2 text-sm font-medium text-trello-text-primary hover:bg-white/5 rounded-lg transition-colors">
                    <Activity className="w-4 h-4 mr-3" /> Home
                </button>
            </nav>
            <div className="border-t border-gray-700/50 pt-4">
                <div className="px-3 mb-2 flex items-center justify-between text-xs font-semibold text-trello-text-secondary">
                    <span>Workspaces</span>
                    <button className="hover:bg-white/10 p-1 rounded transition-colors text-trello-text-primary">
                      <Plus className="w-3.5 h-3.5 cursor-pointer hover:text-white" />
                    </button>
                </div>
                <div className="space-y-0.5">
                    <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                        <div className="flex items-center">
                            <div className="w-6 h-6 rounded bg-gradient-to-br from-green-400 to-green-600 text-white flex items-center justify-center font-bold text-xs mr-2">T</div>
                            <span className="text-sm font-bold text-trello-text-primary">Trello Workspace</span>
                        </div>
                        <Settings className="w-4 h-4 text-trello-text-secondary" />
                    </button>
                </div>
            </div>
        </aside>

        {/* Main Workspace Content */}
        <main className="flex-1 min-w-0 w-full mb-10">
          {loading ? (
            <div className="flex items-center justify-center h-48">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-trello-blue"></div>
            </div>
          ) : error ? (
            <div className="bg-red-500/10 text-red-500 p-4 rounded-lg text-sm mb-4">
              {error}
            </div>
          ) : (
            <>
              {/* Recently Viewed */}
              {boards.length > 0 && (
                 <section className="mb-10">
                    <div className="flex items-center mb-4 text-trello-text-primary text-base font-bold">
                        <Heart className="w-5 h-5 mr-3" /> Recently viewed
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {boards.slice(0, 4).map(board => (
                            <BoardCard key={board.id} board={board} />
                        ))}
                    </div>
                 </section>
              )}

              <section className="mb-10 border-y border-gray-700/50 py-6">
                <div className="flex items-center justify-between gap-4 mb-3">
                  <h2 className="text-3xl font-bold text-trello-text-primary">Trello Workspace</h2>
                  <span className="text-xs text-trello-text-secondary">Private</span>
                </div>
                <div className="mt-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                    <h3 className="text-2xl font-bold text-trello-text-primary">Suggested {templateCategory.toLowerCase()} templates</h3>
                    <select
                      value={templateCategory}
                      onChange={(e) => setTemplateCategory(e.target.value as (typeof TEMPLATE_CATEGORIES)[number])}
                      className="bg-trello-card border border-gray-600 rounded px-3 py-2 text-sm text-trello-text-primary"
                    >
                      {TEMPLATE_CATEGORIES.map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <p className="text-sm text-trello-text-secondary mb-4">
                    Get going faster with a template from the Trello community.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {BOARD_TEMPLATES.filter((t) => t.category === templateCategory).slice(0, 4).map((template) => (
                      <button
                        key={template.id}
                        onClick={() => handleCreateTemplate(template.id)}
                        className="text-left bg-trello-card rounded-lg border border-gray-700/50 overflow-hidden hover:border-trello-blue transition-colors"
                      >
                        <div className="relative h-20">
                          <Image src={template.image} alt={template.title} fill className="object-cover" unoptimized />
                          <span className="absolute right-2 bottom-2 text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/80 text-[#172B4D]">TEMPLATE</span>
                        </div>
                        <div className="p-2.5 text-sm font-semibold text-trello-text-primary">{template.title}</div>
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => router.push('/templates')}
                    className="mt-4 text-sm text-trello-blue underline underline-offset-2 hover:text-blue-300"
                  >
                    Browse the full template gallery
                  </button>
                </div>
              </section>

              {/* Your Workspaces */}
              <section>
                  <div className="flex items-center mb-4">
                    <h2 className="text-sm font-bold text-trello-text-secondary tracking-widest uppercase">Your Workspaces</h2>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
                      <div className="flex items-center">
                         <div className="w-10 h-10 rounded bg-gradient-to-br from-green-400 to-green-600 text-white flex items-center justify-center font-bold text-lg mr-3 shadow-sm">T</div>
                         <div>
                           <h3 className="text-lg font-bold text-trello-text-primary">Trello Workspace</h3>
                           <p className="text-xs text-trello-text-secondary mt-0.5">{boards.length} {boards.length === 1 ? 'board' : 'boards'}</p>
                         </div>
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

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {boards.map(board => (
                      <BoardCard key={board.id} board={board} />
                    ))}
                    <button
                      onClick={() => setShowCreateModal(true)}
                      className="h-24 bg-trello-card hover:bg-white/10 rounded-lg flex flex-col items-center justify-center text-trello-text-primary text-sm font-medium transition-colors hover:shadow-sm"
                    >
                      <Plus className="w-5 h-5 mb-1 opacity-70" />
                      Create new board
                    </button>
                  </div>
              </section>
            </>
          )}
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
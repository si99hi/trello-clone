'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import Navbar from '@/components/navbar/Navbar';
import { api } from '@/lib/api';
import { BOARD_TEMPLATES, TEMPLATE_CATEGORIES, TemplateId } from '@/lib/templates';

export default function TemplatesPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<(typeof TEMPLATE_CATEGORIES)[number]>('Education');
  const [creating, setCreating] = useState<TemplateId | null>(null);

  const visibleTemplates = useMemo(
    () => BOARD_TEMPLATES.filter((template) => template.category === activeCategory),
    [activeCategory]
  );

  const createFromTemplate = async (templateId: TemplateId) => {
    const template = BOARD_TEMPLATES.find((t) => t.id === templateId);
    if (!template) return;

    try {
      setCreating(templateId);
      const newBoard = await api.createBoard({
        title: template.title,
        bgColor: template.bgColor,
        bgImage: template.image,
      });

      for (let i = 0; i < template.lists.length; i += 1) {
        const listData = template.lists[i];
        const list = await api.createList({
          boardId: newBoard.id,
          title: listData.title,
          position: i,
        });

        for (let j = 0; j < listData.cards.length; j += 1) {
          await api.createCard({
            listId: list.id,
            title: listData.cards[j],
            position: j,
          });
        }
      }

      router.push(`/boards/${newBoard.id}`);
    } catch (error) {
      console.error('Failed to create template board:', error);
      alert('Could not create board from template. Please try again.');
    } finally {
      setCreating(null);
    }
  };

  return (
    <div className="min-h-screen bg-trello-bg text-trello-text-primary">
      <Navbar />

      <div className="max-w-[1280px] mx-auto px-4 py-6 flex gap-6">
        <aside className="w-64 shrink-0 hidden md:block">
          <div className="space-y-2 sticky top-16">
            <h2 className="text-sm font-bold tracking-wide text-trello-text-secondary px-3 mb-2">Templates</h2>
            {TEMPLATE_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  activeCategory === category
                    ? 'bg-trello-blue/20 text-trello-blue'
                    : 'hover:bg-white/10 text-trello-text-primary'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </aside>

        <main className="flex-1 min-w-0">
          <div className="mb-5">
            <h1 className="text-2xl font-bold">{activeCategory} templates</h1>
            <p className="text-sm text-trello-text-secondary mt-1">
              Choose a ready-made layout and create a board in one click.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {visibleTemplates.map((template) => (
              <div key={template.id} className="bg-trello-card rounded-xl overflow-hidden border border-white/10">
                <div className="relative h-40">
                  <Image
                    src={template.image}
                    alt={template.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">{template.title}</h3>
                  <p className="text-sm text-trello-text-secondary mt-1 mb-4">{template.subtitle}</p>
                  <button
                    onClick={() => createFromTemplate(template.id)}
                    disabled={creating === template.id}
                    className="px-3 py-2 rounded-md bg-trello-blue hover:bg-trello-blue-hover text-trello-bg text-sm font-semibold disabled:opacity-70"
                  >
                    {creating === template.id ? 'Creating...' : 'Use template'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

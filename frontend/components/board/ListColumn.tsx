'use client';

import { useSortable, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { List, Card } from '@/lib/api';
import CardItem from './CardItem';
import AddCardForm from './AddCardForm';
import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import { api } from '@/lib/api';

interface ListColumnProps {
  list: List;
  cards: Card[];
  onCardClick: (cardId: number) => void;
  onCardAdded: (card: Card) => void;
  onListDeleted: (listId: number) => void;
  searchQuery: string;
}

export default function ListColumn({ list, cards, onCardClick, onCardAdded, onListDeleted, searchQuery }: ListColumnProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [listTitle, setListTitle] = useState(list.title);
  const [showMenu, setShowMenu] = useState(false);

  // Filter cards to match search if needed (we'll just dim them instead of hidden, or hide if complex)
  // According to requirements "non-matching cards are dimmed (opacity-30)".
  // We'll pass `isDimmed` to CardItem.
  const isMatch = (card: Card) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return card.title.toLowerCase().includes(q) || (card.description?.toLowerCase() || '').includes(q);
  };

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: `list-${list.id}`,
    data: {
      type: 'List',
      list,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleTitleSubmit = async (e?: React.FormEvent | React.FocusEvent) => {
    e?.preventDefault();
    if (!listTitle.trim() || listTitle === list.title) {
       setListTitle(list.title);
       setIsEditingTitle(false);
       return;
    }
    
    try {
       await api.updateList(list.id, { title: listTitle });
       setIsEditingTitle(false);
    } catch(err) {
       console.error("Failed to update title", err);
       setListTitle(list.title);
       setIsEditingTitle(false);
    }
  };

  const handleDeleteList = async () => {
    try {
      if (confirm('Are you sure you want to delete this list and all its cards?')) {
        await api.deleteList(list.id);
        onListDeleted(list.id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (isDragging) {
    return (
      <div 
        ref={setNodeRef}
        style={style}
        className="w-[272px] shrink-0 h-full rounded-xl bg-white/20 border-2 border-dashed border-white/50"
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-trello-list w-[272px] shrink-0 max-h-full rounded-2xl flex flex-col shadow-sm`}
    >
      <div 
        {...attributes} 
        {...listeners}
        className="px-3 pt-3 pb-2 flex items-center justify-between cursor-grab active:cursor-grabbing group min-h-[44px]"
      >
        {isEditingTitle ? (
           <form onSubmit={handleTitleSubmit} className="flex-1 mr-2 relative" onPointerDown={e => e.stopPropagation()}>
             <input
               autoFocus
               className="w-full bg-trello-card text-trello-text-primary px-2 py-1 flex-1 font-semibold text-sm rounded border-2 border-trello-blue outline-none"
               value={listTitle}
               onChange={(e) => setListTitle(e.target.value)}
               onBlur={handleTitleSubmit}
             />
           </form>
        ) : (
          <h2 
            className="font-bold text-sm text-trello-text-primary px-2 py-1 -ml-2 rounded cursor-pointer hover:bg-white/10 flex-1 transition-colors"
            onPointerDown={(e) => { e.stopPropagation(); setIsEditingTitle(true); }}
          >
            {listTitle}
          </h2>
        )}
        
        <div className="relative shrink-0 ml-1" onPointerDown={e => e.stopPropagation()}>
          <button 
             onClick={() => setShowMenu(!showMenu)}
             className="p-1.5 rounded text-trello-text-secondary hover:bg-white/10 hover:text-trello-text-primary cursor-pointer w-8 h-8 flex items-center justify-center transition-colors"
          >
             <MoreHorizontal size={16} />
          </button>
          
          {showMenu && (
             <div className="absolute top-full right-0 mt-1 w-64 bg-trello-modal rounded shadow-xl border border-white/10 z-50 py-2">
                 <div className="flex justify-between items-center px-4 pb-2 border-b border-white/10 mb-2">
                    <span className="text-sm font-semibold text-trello-text-secondary text-center w-full">List actions</span>
                    <button onClick={() => setShowMenu(false)} className="absolute right-2 text-trello-text-secondary hover:text-white">
                      <MoreHorizontal size={16} className="opacity-0" /> {/* Spacer */}
                    </button>
                 </div>
                 <button className="w-full text-left px-4 py-2 text-sm text-trello-text-primary hover:bg-white/10 transition-colors"
                    onClick={() => {
                        setShowMenu(false);
                        setIsEditingTitle(true);
                    }}
                 >
                    Rename list
                 </button>
                 <button className="w-full text-left px-4 py-2 text-sm text-[#EB5A46] hover:bg-white/10 transition-colors"
                    onClick={handleDeleteList}
                 >
                    Delete list
                 </button>
             </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden px-2 pb-2 min-h-[40px] trello-scrollbar">
        <SortableContext items={cards.map(c => c.id)} strategy={verticalListSortingStrategy}>
          {cards.map(card => (
            <CardItem
              key={card.id}
              card={card}
              onClick={() => onCardClick(card.id)}
              isDimmed={!isMatch(card)}
            />
          ))}
        </SortableContext>
      </div>

      <AddCardForm 
         listId={list.id} 
         nextPosition={cards.length > 0 ? cards[cards.length - 1].position + 1 : 1}
         onAdd={onCardAdded}
      />
    </div>
  );
}

'use client';

import { useState, useCallback, useEffect } from 'react';
import { api, Board, List, Card } from '@/lib/api';
import Navbar from '@/components/navbar/Navbar';
import ListColumn from '@/components/board/ListColumn';
import AddListForm from '@/components/board/AddListForm';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  DragOverlay,
  defaultDropAnimationSideEffects,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import CardItem from '@/components/board/CardItem';
import CardModal from '@/components/card-modal/CardModal';

export default function BoardPage({ params }: { params: { id: string } }) {
  const boardId = parseInt(params.id);
  const [board, setBoard] = useState<Board | null>(null);
  const [lists, setLists] = useState<List[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [activeCard, setActiveCard] = useState<Card | null>(null);
  const [activeList, setActiveList] = useState<List | null>(null);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

  // Search logic handler
  useEffect(() => {
    const handleSearch = (e: any) => setSearchQuery(e.detail);
    window.addEventListener('trello-search', handleSearch);
    return () => window.removeEventListener('trello-search', handleSearch);
  }, []);

  const fetchBoard = useCallback(async () => {
    try {
      const data = await api.getBoard(boardId);
      setBoard(data);
      setLists(data.lists || []);
    } catch (error) {
      console.error('Failed to fetch board:', error);
    }
  }, [boardId]);

  useEffect(() => {
    fetchBoard();
  }, [fetchBoard]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    }),
    useSensor(KeyboardSensor)
  );

  if (!board) return <div className="min-h-screen bg-trello-bg text-white p-4">Loading...</div>;

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const type = active.data.current?.type;

    if (type === 'List') {
      setActiveList(active.data.current?.list as List);
      return;
    }

    if (type === 'Card') {
      setActiveCard(active.data.current?.card as Card);
      return;
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveACard = active.data.current?.type === 'Card';
    const isOverACard = over.data.current?.type === 'Card';
    const isOverAList = over.data.current?.type === 'List';

    if (!isActiveACard) return;

    // Moving a card over another card
    if (isActiveACard && isOverACard) {
      setLists((prevLists) => {
         const activeListId = active.data.current?.card.listId;
         const overListId = over.data.current?.card.listId;

         const activeListIndex = prevLists.findIndex((l) => l.id === activeListId);
         const overListIndex = prevLists.findIndex((l) => l.id === overListId);

         if (activeListIndex === -1 || overListIndex === -1) return prevLists;

         if (activeListId === overListId) {
            // Same list
            const activeCardIndex = prevLists[activeListIndex].cards!.findIndex((c) => c.id === activeId);
            const overCardIndex = prevLists[overListIndex].cards!.findIndex((c) => c.id === overId);

            const newLists = [...prevLists];
            newLists[activeListIndex] = {
               ...newLists[activeListIndex],
               cards: arrayMove(newLists[activeListIndex].cards!, activeCardIndex, overCardIndex)
            };
            return newLists;
         }

         // Different list
         const activeCardIndex = prevLists[activeListIndex].cards!.findIndex((c) => c.id === activeId);
         const overCardIndex = prevLists[overListIndex].cards!.findIndex((c) => c.id === overId);
         
         const newLists = [...prevLists];
         const activeCardToMove = newLists[activeListIndex].cards![activeCardIndex];
         activeCardToMove.listId = overListId;
         
         newLists[activeListIndex] = {
            ...newLists[activeListIndex],
            cards: newLists[activeListIndex].cards!.filter((c) => c.id !== activeId)
         };
         
         const newOverCards = [...newLists[overListIndex].cards!];
         newOverCards.splice(overCardIndex, 0, activeCardToMove);
         
         newLists[overListIndex] = {
            ...newLists[overListIndex],
            cards: newOverCards
         };

         return newLists;
      });
    }

    // Moving a card over a list column
    if (isActiveACard && isOverAList) {
        setLists((prevLists) => {
            const activeListId = active.data.current?.card.listId;
            const overListId = over.data.current?.list.id;
            
            if (activeListId === overListId) return prevLists;

            const activeListIndex = prevLists.findIndex((l) => l.id === activeListId);
            const overListIndex = prevLists.findIndex((l) => l.id === overListId);

            if (activeListIndex === -1 || overListIndex === -1) return prevLists;

            const activeCardIndex = prevLists[activeListIndex].cards!.findIndex((c) => c.id === activeId);
            const newLists = [...prevLists];
            const activeCardToMove = newLists[activeListIndex].cards![activeCardIndex];
            activeCardToMove.listId = overListId;

            newLists[activeListIndex] = {
               ...newLists[activeListIndex],
               cards: newLists[activeListIndex].cards!.filter((c) => c.id !== activeId)
            };
            
            newLists[overListIndex] = {
               ...newLists[overListIndex],
               cards: [...newLists[overListIndex].cards!, activeCardToMove]
            };

            return newLists;
        });
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    setActiveCard(null);
    setActiveList(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const type = active.data.current?.type;

    // Handle List Reordering
    if (type === 'List') {
      const activeListIndex = lists.findIndex((l) => l.id === parseInt(activeId.toString().replace('list-', '')));
      const overListIndex = lists.findIndex((l) => l.id === parseInt(overId.toString().replace('list-', '')));
      
      const newLists = arrayMove(lists, activeListIndex, overListIndex);
      
      // Calculate new positions
      newLists.forEach((l, index) => {
         l.position = index + 1; // 1-based index simple calc
      });
      setLists(newLists);

      // Perform API calls
      try {
         await api.updateList(parseInt(activeId.toString().replace('list-', '')), { position: newLists[overListIndex].position });
      } catch (err) {
         console.error(err);
         fetchBoard(); // Revert on error
      }
      return;
    }

    // Handle Card Reordering
    if (type === 'Card') {
       // Calculation of new position...
       // Look at the new lists array state created by dragOver
       const activeCardId = activeId as number;
       // Find which list the card is in now
       let targetList: List | undefined;
       let targetCardIndex = -1;
       
       for (const l of lists) {
           const idx = l.cards?.findIndex(c => c.id === activeCardId);
           if (idx !== undefined && idx !== -1) {
               targetList = l;
               targetCardIndex = idx;
               break;
           }
       }

       if (!targetList) return;

       const cardsInList = targetList.cards || [];
       let newPosition = 0;

       if (cardsInList.length === 1) {
           newPosition = 1;
       } else if (targetCardIndex === 0) {
           newPosition = cardsInList[1].position / 2;
       } else if (targetCardIndex === cardsInList.length - 1) {
           newPosition = cardsInList[targetCardIndex - 1].position + 1;
       } else {
           const prevPos = cardsInList[targetCardIndex - 1].position;
           const nextPos = cardsInList[targetCardIndex + 1].position;
           newPosition = (prevPos + nextPos) / 2;
       }

       // Optimistic state was already updated in onDragOver and arrayMove, just ensure position is set locally if needed
       // Though usually we can just rely on ordering from DB after fetch.
       
       try {
           await api.updateCard(activeCardId, { 
               listId: targetList.id, 
               position: newPosition 
           });
       } catch (err) {
           console.error(err);
           fetchBoard(); // Revert on error
       }
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{
         background: board.bgImage ? `url(${board.bgImage}) center/cover` : board.bgColor
      }}
    >
      <Navbar />
      
      {/* Board Header */}
      <div className="h-auto min-h-[52px] px-4 py-2 flex items-center justify-between bg-black/20 backdrop-blur-sm">
         <h1 className="text-xl font-bold text-white px-2 cursor-pointer hover:bg-white/20 rounded">
            {board.title}
         </h1>
      </div>

      {/* Board Content */}
      <div className="flex-1 overflow-x-auto p-4 pb-8">
         <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
         >
             <div className="flex gap-4 h-full items-start">
                <SortableContext items={lists.map(l => `list-${l.id}`)} strategy={horizontalListSortingStrategy}>
                   {lists.map(list => (
                       <ListColumn 
                          key={list.id} 
                          list={list} 
                          cards={list.cards || []} 
                          searchQuery={searchQuery}
                          onCardClick={(id) => setSelectedCardId(id)}
                          onCardAdded={(card) => {
                              const newLists = [...lists];
                              const listIdx = newLists.findIndex(l => l.id === list.id);
                              newLists[listIdx].cards = [...(newLists[listIdx].cards || []), card];
                              setLists(newLists);
                          }}
                          onListDeleted={(listId) => {
                              setLists(lists.filter(l => l.id !== listId));
                          }}
                       />
                   ))}
                </SortableContext>
                
                <AddListForm 
                   boardId={board.id} 
                   nextPosition={lists.length > 0 ? lists[lists.length - 1].position + 1 : 1}
                   onAdd={(list) => setLists([...lists, list])}
                />
             </div>
             
             <DragOverlay>
                 {activeList && (
                     <div className="opacity-90 ring-2 ring-trello-blue rotate-2">
                         <ListColumn
                            list={activeList}
                            cards={activeList.cards || []}
                            searchQuery={searchQuery}
                            onCardClick={() => {}}
                            onCardAdded={() => {}}
                            onListDeleted={() => {}}
                         />
                     </div>
                 )}
                 {activeCard && (
                     <div className="opacity-90 ring-2 ring-trello-blue rotate-2 w-[256px]">
                         <CardItem
                            card={activeCard}
                            onClick={() => {}}
                            isDimmed={false}
                         />
                     </div>
                 )}
             </DragOverlay>
         </DndContext>
      </div>

      {/* Modals */}
      {selectedCardId && (() => {
          let selectedList = null;
          let selectedCard = null;
          for (const list of lists) {
             const card = list.cards?.find(c => c.id === selectedCardId);
             if (card) {
                selectedList = list;
                selectedCard = card;
                break;
             }
          }
          if (!selectedCard || !selectedList) return null;

          return (
             <CardModal 
                card={selectedCard}
                listName={selectedList.title}
                onClose={() => setSelectedCardId(null)}
                onUpdate={() => fetchBoard()}
             />
          );
      })()}
    </div>
  );
}

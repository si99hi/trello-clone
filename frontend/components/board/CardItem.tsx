'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card } from '@/lib/api';
import { AlignLeft, CheckSquare, MessageSquare, Paperclip, Clock, MoreHorizontal } from 'lucide-react';
import Avatar from '../ui/Avatar';

interface CardItemProps {
  card: Card;
  onClick: () => void;
  isDimmed: boolean;
}

export default function CardItem({ card, onClick, isDimmed }: CardItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card.id,
    data: {
      type: 'Card',
      card,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDimmed ? 0.3 : isDragging ? 0.5 : 1,
  };

  const hasChecklist = card.checklists && card.checklists.length > 0;
  let checklistTotal = 0;
  let checklistDone = 0;
  if (hasChecklist) {
    card.checklists.forEach(cl => {
      checklistTotal += cl.items.length;
      checklistDone += cl.items.filter(i => i.isComplete).length;
    });
  }
  const isChecklistComplete = checklistTotal > 0 && checklistDone === checklistTotal;

  // For due date color
  let dueDateColor = 'text-trello-text-secondary';
  let isDueSoonOrOverdue = false;
  let isOverdue = false;

  if (card.dueDate && !card.isArchived) { // assuming isArchived isn't 'done', maybe need a separated property "isComplete" in trello
    const due = new Date(card.dueDate);
    const now = new Date();
    const diff = due.getTime() - now.getTime();
    if (diff < 0) {
      isOverdue = true;
      dueDateColor = 'bg-[#EB5A46] text-white';
    } else if (diff < 24 * 60 * 60 * 1000) {
      isDueSoonOrOverdue = true;
      dueDateColor = 'bg-[#F2D600] text-trello-bg';
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={onClick}
      className={`bg-trello-card rounded-lg shadow-sm mb-2 cursor-pointer border border-transparent hover:border-white/20 group relative overflow-hidden ${isDragging ? 'rotate-2 scale-105 z-50 ring-2 ring-trello-blue shadow-lg' : ''}`}
    >
      {/* Edit marker that appears on hover */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-trello-bg hover:bg-trello-card-hover p-1 rounded-full text-trello-text-secondary z-10 transition-opacity">
         <MoreHorizontal size={14} className="opacity-0 w-0 h-0" /> {/* This keeps the layout intact but lets us use the space, or we can just leave it for the pen icon later */}
      </div>

      {/* Cover Color Strip / Image */}
      {card.coverImage ? (
        <div className="h-24 w-full bg-cover bg-center" style={{ backgroundImage: `url(${card.coverImage})` }} />
      ) : card.coverColor ? (
        <div className="h-8 w-full" style={{ backgroundColor: card.coverColor }} />
      ) : null}

      <div className="p-2.5">
        {card.labels?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-1 relative z-0">
            {card.labels.map(cl => (
              <div
                key={cl.label.id}
                className="h-2 w-10 rounded-sm"
                style={{ backgroundColor: cl.label.color }}
                title={cl.label.name}
              />
            ))}
          </div>
        )}

        <div className="text-sm font-medium text-trello-text-primary break-words leading-tight mt-1 mb-1 relative z-0">
          {card.title}
        </div>

        {/* Badges and Members */}
        {((card.dueDate) || card.description || card.comments?.length > 0 || card.attachments?.length > 0 || hasChecklist || card.members?.length > 0) && (
          <div className="flex flex-wrap items-center justify-between gap-y-1 mt-1.5 relative z-0">
            <div className="flex flex-wrap items-center gap-2 text-trello-text-secondary text-xs">
              {card.dueDate && (
                <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded transition-colors ${dueDateColor} ${!isOverdue && !isDueSoonOrOverdue ? 'bg-white/10 hover:bg-white/20' : ''}`}>
                  <Clock size={12} />
                  <span>{new Date(card.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                </div>
              )}
              {card.description && (
                <div title="This card has a description" className="flex items-center">
                  <AlignLeft size={13} />
                </div>
              )}
              {card.comments?.length > 0 && (
                <div className="flex items-center gap-1 mr-1">
                  <MessageSquare size={13} />
                  <span>{card.comments.length}</span>
                </div>
              )}
              {card.attachments?.length > 0 && (
                <div className="flex items-center gap-1 mr-1">
                  <Paperclip size={13} />
                  <span>{card.attachments.length}</span>
                </div>
              )}
              {hasChecklist && (
                <div className={`flex items-center gap-1.5 px-1.5 py-0.5 rounded ${isChecklistComplete ? 'bg-[#61BD4F] text-trello-bg' : 'text-trello-text-secondary'}`}>
                  <CheckSquare size={13} className={isChecklistComplete ? 'text-trello-bg' : ''} />
                  <span className={isChecklistComplete ? 'text-trello-bg font-medium text-[11px]' : 'text-[11px]'}>
                    {checklistDone}/{checklistTotal}
                  </span>
                </div>
              )}
            </div>

            {/* Members */}
            {card.members?.length > 0 && (
               <div className="flex -space-x-1 shrink-0 ml-auto pl-2">
                 {card.members?.map(cm => (
                   <div key={cm.user.id} className="ring-[1.5px] ring-trello-card rounded-full z-10 transition-transform hover:z-20 hover:scale-110">
                      <Avatar name={cm.user.name} color={cm.user.avatarColor} size="sm" />
                   </div>
                 ))}
               </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

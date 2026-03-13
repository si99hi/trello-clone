'use client';

import { useState, useEffect } from 'react';
import { api, Card, User, Label as RALabel, Checklist } from '@/lib/api';
import { 
  X, AlignLeft, CheckSquare, Clock, Paperclip, Activity, Tag, Plus,
  UserPlus, Image as ImageIcon, Archive, Copy, ArrowRight, Eye, CreditCard
} from 'lucide-react';
import Avatar from '../ui/Avatar';

interface CardModalProps {
  card: Card;
  listName: string;
  onClose: () => void;
  onUpdate: () => void; // Trigger board refetch
}

export default function CardModal({ card, listName, onClose, onUpdate }: CardModalProps) {
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description || '');
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [commentText, setCommentText] = useState('');
  
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [allLabels, setAllLabels] = useState<RALabel[]>([]);

  const [showLabelsMenu, setShowLabelsMenu] = useState(false);
  const [showMembersMenu, setShowMembersMenu] = useState(false);
  const [showCoverMenu, setShowCoverMenu] = useState(false);
  
  // Checklist State
  const [showChecklistMenu, setShowChecklistMenu] = useState(false);
  const [newChecklistTitle, setNewChecklistTitle] = useState('');
  const [newItemText, setNewItemText] = useState<{[key: number]: string}>({});

  useEffect(() => {
    fetchUsersAndLabels();
  }, []);

  const fetchUsersAndLabels = async () => {
    try {
      const users = await api.getUsers();
      const labels = await api.getLabels();
      setAllUsers(users);
      setAllLabels(labels);
    } catch (error) {
      console.error(error);
    }
  };

  const wrapUpdate = async (updateFn: () => Promise<any>) => {
    try {
      await updateFn();
      onUpdate(); // tells parent to refetch board
    } catch (e) {
      console.error(e);
    }
  };

  const handleTitleSubmit = () => {
    if (title.trim() && title !== card.title) {
      wrapUpdate(() => api.updateCard(card.id, { title: title.trim() }));
    }
  };

  const handleDescSubmit = () => {
    setIsEditingDesc(false);
    if (description !== card.description) {
      wrapUpdate(() => api.updateCard(card.id, { description: description.trim() }));
    }
  };

  const handleToggleMember = (userId: number) => {
    const isMember = card.members?.some(m => m.user.id === userId);
    if (isMember) {
      wrapUpdate(() => api.removeMemberFromCard(card.id, userId));
    } else {
      wrapUpdate(() => api.addMemberToCard(card.id, userId));
    }
  };

  const handleToggleLabel = (labelId: number) => {
    const hasLabel = card.labels?.some(l => l.label.id === labelId);
    if (hasLabel) {
      wrapUpdate(() => api.removeLabelFromCard(card.id, labelId));
    } else {
      wrapUpdate(() => api.addLabelToCard(card.id, labelId));
    }
  };

  const handleArchive = () => {
    wrapUpdate(() => api.updateCard(card.id, { isArchived: true }));
    onClose();
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this card forever?')) {
      await api.deleteCard(card.id);
      onUpdate();
      onClose();
    }
  };

  const handleAddComment = () => {
    if (commentText.trim()) {
      wrapUpdate(() => api.addComment(card.id, commentText.trim(), 1)); // Default Alice
      setCommentText('');
    }
  };
  
  const handleAddChecklist = (e: React.FormEvent) => {
    e.preventDefault();
    if (newChecklistTitle.trim()) {
      wrapUpdate(() => api.createChecklist(card.id, newChecklistTitle.trim()));
      setNewChecklistTitle('');
      setShowChecklistMenu(false);
    }
  };
  
  const handleAddChecklistItem = (checklistId: number, e: React.FormEvent) => {
    e.preventDefault();
    const text = newItemText[checklistId];
    if (text?.trim()) {
      wrapUpdate(() => api.addChecklistItem(checklistId, text.trim()));
      setNewItemText({ ...newItemText, [checklistId]: '' });
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/60 backdrop-blur-sm p-4 cursor-default">
      {/* Background click listener */}
      <div className="absolute inset-0" onClick={onClose} />
      
      <div 
        className="relative bg-trello-modal w-full max-w-[768px] rounded-xl text-trello-text-primary my-12 shadow-2xl flex flex-col z-10"
        onClick={e => e.stopPropagation()}
      >
        {/* Cover Image/Color */}
        {card.coverImage ? (
          <div className="h-40 w-full bg-cover bg-center" style={{ backgroundImage: `url(${card.coverImage})` }} />
        ) : card.coverColor ? (
          <div className="h-24 w-full" style={{ backgroundColor: card.coverColor }} />
        ) : null}

        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors z-20 text-trello-text-secondary hover:text-white"
        >
          <X size={20} />
        </button>

        <div className="p-6 flex flex-col md:flex-row gap-8">
          {/* Left Column (Main Content) */}
          <div className="flex-1 min-w-0">
            {/* Title Section */}
            <div className="flex gap-4 mb-6">
              <CreditCard className="mt-1 shrink-0 text-trello-text-primary" size={24} />
              <div className="flex-1">
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  onBlur={handleTitleSubmit}
                  className="w-full bg-transparent text-xl font-semibold text-trello-text-primary focus:bg-[#22272b] focus:outline-none focus:ring-2 focus:ring-trello-blue rounded px-2 py-1 -ml-2 transition-colors"
                />
                <p className="text-sm text-trello-text-secondary mt-1">
                  in list <span className="underline cursor-pointer">{listName}</span>
                </p>
              </div>
            </div>

            {/* Labels & Members (Small strip above description if present) */}
            {(card.members?.length > 0 || card.labels?.length > 0) && (
              <div className="flex flex-wrap gap-6 mb-8 px-10">
                {card.members?.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold text-trello-text-secondary mb-2 uppercase">Members</h3>
                    <div className="flex flex-wrap gap-1">
                      {card.members.map(m => (
                        <Avatar key={m.user.id} name={m.user.name} color={m.user.avatarColor} size="md" />
                      ))}
                      <button 
                        onClick={() => setShowMembersMenu(!showMembersMenu)}
                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-trello-text-primary transition-colors"
                      >
                        <UserPlus size={14} />
                      </button>
                    </div>
                  </div>
                )}

                {card.labels?.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold text-trello-text-secondary mb-2 uppercase">Labels</h3>
                    <div className="flex flex-wrap gap-1">
                      {card.labels.map(l => (
                        <div 
                          key={l.label.id}
                          className="px-3 py-1.5 rounded text-sm font-medium text-white shadow-sm flex items-center"
                          style={{ backgroundColor: l.label.color }}
                        >
                          {l.label.name}
                        </div>
                      ))}
                      <button 
                         onClick={() => setShowLabelsMenu(!showLabelsMenu)}
                         className="px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-trello-text-primary flex items-center shadow-sm transition-colors"
                      >
                         <Plus size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Description */}
            <div className="flex gap-4 mb-8">
              <AlignLeft className="mt-1.5 shrink-0 text-trello-text-primary" size={24} />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-3">
                   <h3 className="text-base font-semibold text-trello-text-primary">Description</h3>
                   {card.description && !isEditingDesc && (
                      <button 
                        onClick={() => setIsEditingDesc(true)}
                        className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded text-sm font-medium transition-colors"
                      >
                        Edit
                      </button>
                   )}
                </div>
                {isEditingDesc ? (
                  <div className="flex flex-col gap-2">
                    <textarea
                      autoFocus
                      className="w-full min-h-[120px] bg-[#22272b] text-trello-text-primary p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-trello-blue resize-y transition-colors text-sm"
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      placeholder="Add a more detailed description..."
                    />
                    <div className="flex gap-2 mt-2">
                      <button 
                        onClick={handleDescSubmit}
                        className="bg-trello-blue hover:bg-trello-blue-hover text-trello-bg px-4 py-2 rounded font-medium transition-colors text-sm"
                      >
                        Save
                      </button>
                      <button 
                        onClick={() => {
                          setDescription(card.description || '');
                          setIsEditingDesc(false);
                        }}
                        className="px-4 py-2 hover:bg-white/10 rounded transition-colors text-sm font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div 
                    onClick={() => setIsEditingDesc(true)}
                    className={`w-full ${card.description ? '' : 'bg-white/5 hover:bg-white/10 h-14 cursor-pointer'} rounded-lg ${card.description ? '' : 'p-3'} text-sm transition-colors`}
                  >
                    {card.description ? (
                      <p className="whitespace-pre-wrap">{card.description}</p>
                    ) : (
                      <span className="text-trello-text-primary font-medium">Add a more detailed description...</span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Checklists */}
            {card.checklists?.map(checklist => (
              <div key={checklist.id} className="flex gap-4 mb-8">
                <CheckSquare className="mt-1.5 shrink-0 text-trello-text-primary" size={24} />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-base font-semibold text-trello-text-primary">{checklist.title}</h3>
                    <button 
                      onClick={() => wrapUpdate(() => api.deleteChecklist(checklist.id))}
                      className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded font-medium text-sm transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                  
                  {/* Progress Bar */}
                  {(() => {
                    const total = checklist.items.length;
                    const done = checklist.items.filter(i => i.isComplete).length;
                    const percent = total === 0 ? 0 : Math.round((done / total) * 100);
                    return (
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-xs text-trello-text-secondary w-8 text-right">{percent}%</span>
                        <div className="flex-1 h-2 bg-trello-card rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-300 ${percent === 100 ? 'bg-[#61BD4F]' : 'bg-trello-blue'}`} 
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })()}

                  {/* Items */}
                  <div className="flex flex-col gap-2 mb-3">
                    {checklist.items.map(item => (
                      <div key={item.id} className="flex items-start gap-3 hover:bg-white/5 p-1 -ml-1 rounded transition-colors group">
                        <input
                          type="checkbox"
                          checked={item.isComplete}
                          onChange={(e) => wrapUpdate(() => api.updateChecklistItem(item.id, { isComplete: e.target.checked }))}
                          className="mt-1 w-4 h-4 rounded border-gray-400 text-trello-blue focus:ring-trello-blue cursor-pointer"
                        />
                        <span className={`flex-1 text-sm pt-0.5 ${item.isComplete ? 'line-through text-trello-text-secondary' : 'text-trello-text-primary'}`}>
                          {item.text}
                        </span>
                        <button 
                          onClick={() => wrapUpdate(() => api.deleteChecklistItem(item.id))}
                          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 rounded text-trello-text-secondary transition-all"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  {/* Add Item Form */}
                  <form onSubmit={(e) => handleAddChecklistItem(checklist.id, e)}>
                    <div className="flex gap-2">
                       <input
                         className="flex-1 bg-trello-card text-white px-3 py-1.5 rounded focus:outline-none focus:ring-2 focus:ring-trello-blue text-sm transition-colors"
                         placeholder="Add an item"
                         value={newItemText[checklist.id] || ''}
                         onChange={e => setNewItemText({...newItemText, [checklist.id]: e.target.value})}
                       />
                       <button type="submit" className="bg-trello-blue hover:bg-trello-blue-hover text-white px-4 rounded text-sm font-medium transition-colors">
                         Add
                       </button>
                    </div>
                  </form>
                </div>
              </div>
            ))}

            {/* Comments & Activity Log */}
            <div className="flex gap-4">
              <Activity className="mt-1.5 shrink-0 text-trello-text-primary" size={24} />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-base font-semibold text-trello-text-primary">Activity</h3>
                  <button className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded font-medium text-sm transition-colors">
                     Show details
                  </button>
                </div>

                {/* Comment Input */}
                <div className="flex gap-3 mb-6">
                  <Avatar name="Alice" color="#FF5733" size="md" />
                  <div className="flex-1">
                     <textarea
                       className="w-full bg-trello-card text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-trello-blue min-h-[40px] resize-y text-sm transition-colors"
                       placeholder="Write a comment..."
                       value={commentText}
                       onChange={e => setCommentText(e.target.value)}
                     />
                     {commentText.trim() && (
                       <button 
                         onClick={handleAddComment}
                         className="mt-2 bg-trello-blue hover:bg-trello-blue-hover text-white px-4 py-1.5 rounded font-medium text-sm transition-colors"
                       >
                         Save
                       </button>
                     )}
                  </div>
                </div>

                {/* Activity List */}
                <div className="flex flex-col gap-4">
                  {/* We combine activities and comments into one list, sort by date */}
                  {(() => {
                     const comments = (card.comments || []).map(c => ({ ...c, type: 'comment' as const }));
                     const activities = (card.activities || []).map(a => ({ ...a, type: 'activity' as const }));
                     const merged = [...comments, ...activities].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                     
                     return merged.map(item => (
                       <div key={`${item.type}-${item.id}`} className="flex gap-3">
                          {item.type === 'comment' ? (
                             <Avatar name={item.user?.name || 'User'} color={item.user?.avatarColor || '#ccc'} size="md" />
                          ) : (
                             <div className="w-8 h-8 rounded-full bg-trello-card flex items-center justify-center shrink-0">
                               <Activity size={14} className="text-trello-text-secondary" />
                             </div>
                          )}
                          <div className="flex-1">
                             <div className="flex items-baseline gap-2">
                               <span className="font-semibold text-white text-sm">
                                  {item.type === 'comment' ? item.user?.name : item.text.split(' ')[0]}
                               </span>
                               {item.type === 'activity' && (
                                  <span className="text-xs text-trello-text-secondary">
                                      {item.text.substring(item.text.indexOf(' ') + 1)}
                                  </span>
                               )}
                               <span className="text-xs text-trello-text-secondary">
                                  {new Date(item.createdAt).toLocaleString(undefined, {month: 'short', day: 'numeric', hour: 'numeric', minute:'2-digit'})}
                               </span>
                             </div>
                             {item.type === 'comment' && (
                               <div className="mt-1 bg-trello-card text-white px-3 py-2 rounded-lg text-sm inline-block">
                                  {item.text}
                               </div>
                             )}
                          </div>
                       </div>
                     ));
                  })()}
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar (Actions) */}
          <div className="w-full md:w-44 shrink-0 flex flex-col gap-2 relative mt-4 md:mt-10">
            <h4 className="text-xs font-semibold text-trello-text-primary mb-1">Add to card</h4>
            
            <button 
               className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded flex items-center text-sm font-medium transition-colors relative text-trello-text-primary"
               onClick={() => { setShowMembersMenu(!showMembersMenu); setShowLabelsMenu(false); setShowChecklistMenu(false); }}
            >
              <UserPlus size={16} className="mr-2 text-trello-text-primary" /> Members
            </button>
            {showMembersMenu && (
              <div className="absolute top-8 left-full md:left-auto md:right-0 mt-1 w-64 bg-trello-modal rounded shadow-xl border border-white/10 z-50 py-2 ml-2 md:ml-0">
                  <div className="px-4 pb-2 border-b border-white/10 mb-2 font-semibold text-sm text-center">Members</div>
                  <div className="px-4 flex flex-col gap-1 max-h-64 overflow-y-auto">
                     {allUsers.map(u => {
                        const isMember = card.members?.some(m => m.user.id === u.id);
                        return (
                          <div key={u.id} className="flex items-center justify-between hover:bg-white/10 p-1.5 rounded cursor-pointer" onClick={() => handleToggleMember(u.id)}>
                             <div className="flex items-center gap-2">
                               <Avatar name={u.name} color={u.avatarColor} size="sm" />
                               <span className="text-sm">{u.name}</span>
                             </div>
                             {isMember && <CheckSquare size={16} className="text-trello-blue" />}
                          </div>
                        );
                     })}
                  </div>
              </div>
            )}

            <button 
               className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded flex items-center text-sm font-medium transition-colors text-trello-text-primary"
               onClick={() => { setShowLabelsMenu(!showLabelsMenu); setShowMembersMenu(false); setShowChecklistMenu(false); }}
            >
              <Tag size={16} className="mr-2 text-trello-text-primary" /> Labels
            </button>
            {showLabelsMenu && (
              <div className="absolute top-16 left-full md:left-auto md:right-0 mt-1 w-64 bg-trello-modal rounded shadow-xl border border-white/10 z-50 py-2 ml-2 md:ml-0">
                  <div className="px-4 pb-2 border-b border-white/10 mb-2 font-semibold text-sm text-center">Labels</div>
                  <div className="px-4 flex flex-col gap-2 max-h-64 overflow-y-auto">
                     {allLabels.map(l => {
                        const hasLabel = card.labels?.some(cl => cl.label.id === l.id);
                        return (
                          <div key={l.id} className="flex gap-2 items-center">
                             <div 
                               onClick={() => handleToggleLabel(l.id)}
                               className="flex-1 px-3 py-1.5 rounded text-sm text-white cursor-pointer shadow-sm relative overflow-hidden"
                               style={{ backgroundColor: l.color }}
                             >
                               {l.name}
                               {hasLabel && <CheckSquare size={14} className="absolute right-2 top-2 bg-black/20 rounded" />}
                             </div>
                          </div>
                        );
                     })}
                  </div>
              </div>
            )}

            <button 
              className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded flex items-center text-sm font-medium transition-colors text-trello-text-primary"
              onClick={() => { setShowChecklistMenu(!showChecklistMenu); setShowMembersMenu(false); setShowLabelsMenu(false); }}
            >
              <CheckSquare size={16} className="mr-2 text-trello-text-primary" /> Checklist
            </button>
            {showChecklistMenu && (
              <div className="absolute top-24 left-full md:left-auto md:right-0 mt-1 w-64 bg-trello-modal rounded shadow-xl border border-white/10 z-50 py-2 ml-2 md:ml-0 px-4">
                  <div className="pb-2 border-b border-white/10 mb-2 font-semibold text-sm text-center">Add checklist</div>
                  <form onSubmit={handleAddChecklist} className="flex flex-col gap-2">
                     <label className="text-xs text-trello-text-secondary font-semibold">Title</label>
                     <input 
                       autoFocus
                       className="bg-[#22272b] text-trello-text-primary px-2 py-1.5 rounded outline-none border-2 border-transparent focus:border-trello-blue text-sm"
                       value={newChecklistTitle}
                       onChange={e => setNewChecklistTitle(e.target.value)}
                       placeholder="Checklist"
                     />
                     <button type="submit" className="bg-trello-blue hover:bg-trello-blue-hover text-trello-bg py-1.5 rounded text-sm font-medium mt-1">
                       Add
                     </button>
                  </form>
              </div>
            )}

            <button className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded flex items-center text-sm font-medium transition-colors text-trello-text-primary">
              <Clock size={16} className="mr-2 text-trello-text-primary" /> Dates
            </button>
            
            <button className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded flex items-center text-sm font-medium transition-colors text-trello-text-primary">
              <Paperclip size={16} className="mr-2 text-trello-text-primary" /> Attachment
            </button>

            <button className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded flex items-center text-sm font-medium transition-colors text-trello-text-primary">
              <ImageIcon size={16} className="mr-2 text-trello-text-primary" /> Cover
            </button>
            
            <h4 className="text-xs font-semibold text-trello-text-primary mt-6 mb-1">Actions</h4>
            <button className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded flex items-center text-sm font-medium transition-colors text-trello-text-primary">
              <ArrowRight size={16} className="mr-2 text-trello-text-primary" /> Move
            </button>
            <button className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded flex items-center text-sm font-medium transition-colors text-trello-text-primary">
              <Copy size={16} className="mr-2 text-trello-text-primary" /> Copy
            </button>
            {!card.isArchived ? (
              <button onClick={handleArchive} className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded flex items-center text-sm font-medium transition-colors text-trello-text-primary mt-4">
                <Archive size={16} className="mr-2 text-trello-text-primary" /> Archive
              </button>
            ) : (
              <button onClick={handleDelete} className="bg-[#EB5A46] hover:bg-[#CF513D] text-white px-3 py-1.5 mt-4 rounded flex items-center font-medium text-sm transition-colors shadow-sm w-full">
                <X size={16} className="mr-2" /> Delete
              </button>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
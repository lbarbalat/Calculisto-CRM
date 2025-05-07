import React, { useState } from 'react';
import { LeadCard } from './LeadCard';
import { Lead, LeadStatus } from '../../types';
import { statusOptions } from '../../data/mockData';
import { useLeads } from '../../context/LeadsContext';

export const KanbanBoard: React.FC = () => {
  const { getLeadsByStatus, updateLeadStatus } = useLeads();
  const [draggingId, setDraggingId] = useState<string | null>(null);
  
  // Define all statuses for kanban columns
  const statuses: LeadStatus[] = ['new', 'booked', 'no-answer', 'call-later', 'won', 'lost'];
  
  // Handle drag start
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    setDraggingId(id);
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'move';
  };
  
  // Handle drag over
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };
  
  // Handle drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, status: LeadStatus) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    if (id) {
      updateLeadStatus(id, status);
      setDraggingId(null);
    }
  };
  
  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="flex min-w-max space-x-4">
        {statuses.map((status) => {
          const leads = getLeadsByStatus(status);
          const statusInfo = statusOptions[status];
          
          return (
            <div 
              key={status}
              className="w-80 flex-shrink-0"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, status)}
            >
              <div className={`bg-white rounded-t-lg px-3 py-2 ${statusInfo.color} text-white`}>
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg">{statusInfo.label}</h3>
                  <span className="bg-white text-gray-700 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                    {leads.length}
                  </span>
                </div>
              </div>
              <div className="bg-gray-100 rounded-b-lg p-3 min-h-[calc(100vh-220px)]">
                {leads.map((lead) => (
                  <LeadCard
                    key={lead.id}
                    lead={lead}
                    onStatusChange={updateLeadStatus}
                    onDragStart={handleDragStart}
                  />
                ))}
                
                {leads.length === 0 && (
                  <div className="bg-white bg-opacity-60 rounded-lg p-4 text-center text-gray-500 border-2 border-dashed border-gray-300">
                    <p>No leads in this status</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
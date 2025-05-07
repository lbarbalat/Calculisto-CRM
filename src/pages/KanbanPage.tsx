import React from 'react';
import { KanbanBoard } from '../components/leads/KanbanBoard';

export const KanbanPage: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Kanban Board</h1>
      </div>
      
      <KanbanBoard />
    </div>
  );
};
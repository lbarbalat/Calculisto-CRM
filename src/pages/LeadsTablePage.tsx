import React from 'react';
import { LeadsTable } from '../components/leads/LeadsTable';

export const LeadsTablePage: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Leads Table</h1>
      </div>
      
      <LeadsTable />
    </div>
  );
};
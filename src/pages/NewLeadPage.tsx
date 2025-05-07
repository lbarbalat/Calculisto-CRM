import React from 'react';
import { NewLeadForm } from '../components/leads/NewLeadForm';

export const NewLeadPage: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Add New Lead</h1>
      </div>
      
      <NewLeadForm />
    </div>
  );
};
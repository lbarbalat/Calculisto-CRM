import React, { useState } from 'react';
import { Card, CardBody } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { statusOptions } from '../data/mockData';
import { LeadStatus } from '../types';
import { Save, Plus, Trash2 } from 'lucide-react';

export const KanbanSettingsPage: React.FC = () => {
  const [stages, setStages] = useState(Object.entries(statusOptions));
  
  const handleColorChange = (index: number, color: string) => {
    const newStages = [...stages];
    newStages[index][1].color = color;
    setStages(newStages);
  };
  
  const handleLabelChange = (index: number, label: string) => {
    const newStages = [...stages];
    newStages[index][1].label = label;
    setStages(newStages);
  };
  
  const handleSave = () => {
    // In a real app, this would save to your backend
    console.log('Saving kanban settings:', Object.fromEntries(stages));
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Kanban Settings</h1>
        <Button
          onClick={handleSave}
          leftIcon={<Save size={18} />}
        >
          Save Changes
        </Button>
      </div>
      
      <Card>
        <CardBody>
          <h2 className="text-lg font-medium mb-4">Pipeline Stages</h2>
          
          <div className="space-y-4">
            {stages.map(([key, value], index) => (
              <div key={key} className="flex items-center space-x-4">
                <div className="flex-1">
                  <Input
                    label="Stage Name"
                    value={value.label}
                    onChange={(e) => handleLabelChange(index, e.target.value)}
                  />
                  <p className="text-xs text-gray-500 mt-1">Key: <code>{key}</code></p>
                </div>
                
                <div className="w-48">
                  <Input
                    label="Color"
                    type="color"
                    value={value.color.replace('bg-', '#').replace('-500', '')}
                    onChange={(e) => handleColorChange(index, `bg-${e.target.value.replace('#', '')}-500`)}
                  />
                </div>
                
                <div className="flex items-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="mb-4"
                    onClick={() => {
                      const newStages = [...stages];
                      newStages.splice(index, 1);
                      setStages(newStages);
                    }}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <Button
            variant="outline"
            className="mt-4"
            leftIcon={<Plus size={18} />}
            onClick={() => {
              setStages([
                ...stages,
                [`new-stage-${Date.now()}` as LeadStatus, { label: 'New Stage', color: 'bg-gray-500' }]
              ]);
            }}
          >
            Add Stage
          </Button>
        </CardBody>
      </Card>
      
      <Card>
        <CardBody>
          <h2 className="text-lg font-medium mb-4">Preview</h2>
          <div className="flex space-x-4">
            {stages.map(([key, value]) => (
              <div key={key} className="w-64">
                <div className={`${value.color} text-white px-4 py-2 rounded-t-lg flex justify-between items-center`}>
                  <span>{value.label}</span>
                  <span className="text-sm bg-white bg-opacity-20 px-2 py-0.5 rounded">
                    0 cards
                  </span>
                </div>
              <div className="bg-gray-100 h-32 rounded-b-lg"></div>
           </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

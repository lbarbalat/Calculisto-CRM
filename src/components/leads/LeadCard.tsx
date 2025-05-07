import React, { useState } from 'react';
import { Card, CardBody, CardFooter } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Phone, Mail, Clock, Calendar, Edit, Info } from 'lucide-react';
import { statusOptions } from '../../data/mockData';
import { Lead, LeadStatus } from '../../types';
import { formatDate, formatTimeAgo } from '../../utils/dateUtils';
import { LeadDetailModal } from './LeadDetailModal';

interface LeadCardProps {
  lead: Lead;
  onStatusChange: (id: string, status: LeadStatus) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
}

export const LeadCard: React.FC<LeadCardProps> = ({ lead, onStatusChange, onDragStart }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  // Get status styling
  const status = statusOptions[lead.status];
  
  return (
    <>
      <div
        className="mb-3"
        draggable
        onDragStart={(e) => onDragStart(e, lead.id)}
      >
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardBody className="p-4">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-medium text-lg text-gray-900 truncate w-5/6">
                {lead.fullName}
              </h3>
              <div className={`w-3 h-3 rounded-full ${status.color}`}></div>
            </div>
            
            <div className="mb-3">
              <Badge 
                variant={lead.source === 'meta' ? 'primary' : 'default'}
                className="mb-2"
              >
                {lead.campaignName}
              </Badge>
              <p className="text-sm text-gray-600 truncate">
                {lead.university}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                <span className="font-medium">Area:</span> {lead.area}, <span className="font-medium">Semester:</span> {lead.semester}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div className="flex items-center text-sm text-gray-600">
                <Phone size={14} className="mr-1" />
                <span className="truncate">{lead.phoneNumber}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Mail size={14} className="mr-1" />
                <span className="truncate">{lead.email}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center text-xs text-gray-500">
                <Calendar size={12} className="mr-1" />
                <span>{formatDate(lead.createdAt)}</span>
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <Clock size={12} className="mr-1" />
                <span>{formatTimeAgo(lead.createdAt)}</span>
              </div>
            </div>
            
            {lead.lastContactedAt && (
              <div className="mt-2 text-xs text-gray-500">
                <p>Last contacted: {formatDate(lead.lastContactedAt)}</p>
              </div>
            )}
          </CardBody>
          <CardFooter className="bg-gray-50 flex justify-between p-3">
            <Button 
              size="sm"
              variant="outline"
              leftIcon={<Info size={14} />}
              onClick={() => setShowDetails(true)}
            >
              Details
            </Button>
            <Button 
              size="sm"
              variant="outline"
              leftIcon={<Edit size={14} />}
            >
              Edit
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Lead details modal */}
      <LeadDetailModal
        lead={lead} 
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        onStatusChange={onStatusChange}
      />
    </>
  );
};
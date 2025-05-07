import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Lead, LeadStatus } from '../../types';
import { statusOptions, subscriptionTypes } from '../../data/mockData';
import { formatDate } from '../../utils/dateUtils';
import { Textarea } from '../ui/Textarea';
import { Select } from '../ui/Select';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  School, 
  BookOpen, 
  MessageSquare,
  DollarSign
} from 'lucide-react';

interface LeadDetailModalProps {
  lead: Lead;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (id: string, status: LeadStatus) => void;
}

export const LeadDetailModal: React.FC<LeadDetailModalProps> = ({
  lead,
  isOpen,
  onClose,
  onStatusChange,
}) => {
  const [notes, setNotes] = React.useState(lead.notes);
  const [status, setStatus] = React.useState<LeadStatus>(lead.status);
  
  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus as LeadStatus);
    onStatusChange(lead.id, newStatus as LeadStatus);
  };
  
  const handleSaveNotes = () => {
    // In a real app, this would call a function to update the notes in your data store
    console.log('Saving notes for lead', lead.id, notes);
    onClose();
  };
  
  // Format badge variant based on status
  const getBadgeVariant = (status: LeadStatus) => {
    switch(status) {
      case 'new': return 'primary';
      case 'booked': return 'info';
      case 'won': return 'success';
      case 'lost': return 'danger';
      case 'no-answer': return 'warning';
      case 'call-later': return 'warning';
      default: return 'default';
    }
  };
  
  // Footer with action buttons
  const modalFooter = (
    <div className="flex justify-end space-x-3">
      <Button variant="outline" onClick={onClose}>
        Cancel
      </Button>
      <Button onClick={handleSaveNotes}>
        Save Changes
      </Button>
    </div>
  );
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Lead Details: ${lead.fullName}`}
      footer={modalFooter}
      size="lg"
    >
      <div className="space-y-6">
        {/* Top info card */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between mb-3">
            <h3 className="font-medium text-lg">{lead.fullName}</h3>
            <Badge variant={getBadgeVariant(lead.status)}>
              {statusOptions[lead.status].label}
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center mb-2">
                <Mail className="text-gray-500 mr-2" size={16} />
                <span>{lead.email}</span>
              </div>
              <div className="flex items-center mb-2">
                <Phone className="text-gray-500 mr-2" size={16} />
                <span>{lead.phoneNumber}</span>
              </div>
              <div className="flex items-center mb-2">
                <MapPin className="text-gray-500 mr-2" size={16} />
                <span>{lead.country}</span>
              </div>
            </div>
            <div>
              <div className="flex items-center mb-2">
                <Calendar className="text-gray-500 mr-2" size={16} />
                <span>Created: {formatDate(lead.createdAt)}</span>
              </div>
              {lead.lastContactedAt && (
                <div className="flex items-center mb-2">
                  <Calendar className="text-gray-500 mr-2" size={16} />
                  <span>Last Contact: {formatDate(lead.lastContactedAt)}</span>
                </div>
              )}
              <div className="flex items-center">
                <MessageSquare className="text-gray-500 mr-2" size={16} />
                <span>Campaign: {lead.campaignName}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Education Details */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Education Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <School className="text-gray-500 mr-2" size={16} />
              <span><span className="font-medium">University:</span> {lead.university}</span>
            </div>
            <div className="flex items-center">
              <BookOpen className="text-gray-500 mr-2" size={16} />
              <span><span className="font-medium">Area:</span> {lead.area}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="text-gray-500 mr-2" size={16} />
              <span><span className="font-medium">Semester:</span> {lead.semester}</span>
            </div>
            <div className="flex items-center">
              <MessageSquare className="text-gray-500 mr-2" size={16} />
              <span><span className="font-medium">Difficulties:</span> {lead.difficulties}</span>
            </div>
          </div>
        </div>
        
        {/* Subscription Details */}
        {lead.subscription && (
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Subscription</h4>
            <div className="bg-green-50 p-3 rounded-md border border-green-200">
              <div className="flex items-center text-green-800 mb-2">
                <DollarSign className="mr-2" size={18} />
                <span className="font-medium">
                  {subscriptionTypes.find(s => s.value === lead.subscription?.type)?.label} Subscription
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                <div>
                  <span className="text-gray-600">Price:</span> ${lead.subscription.price}
                </div>
                <div>
                  <span className="text-gray-600">Start:</span> {formatDate(lead.subscription.startDate || '')}
                </div>
                <div>
                  <span className="text-gray-600">End:</span> {formatDate(lead.subscription.endDate || '')}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Lead Status */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Status</h4>
          <Select
            options={Object.entries(statusOptions).map(([value, { label }]) => ({
              value,
              label,
            }))}
            value={status}
            onChange={handleStatusChange}
            fullWidth
          />
        </div>
        
        {/* Notes section */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Notes</h4>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            placeholder="Enter notes about this lead..."
            fullWidth
          />
        </div>
        
        {/* Quick Actions */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Quick Actions</h4>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" leftIcon={<Phone size={14} />}>
              Call Lead
            </Button>
            <Button size="sm" variant="outline" leftIcon={<Mail size={14} />}>
              Send Email
            </Button>
            <Button size="sm" variant="outline">
              Send WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
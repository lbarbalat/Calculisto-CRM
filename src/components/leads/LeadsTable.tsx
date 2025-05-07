import React, { useState } from 'react';
import { useLeads } from '../../context/LeadsContext';
import { useAuth } from '../../context/AuthContext';
import { Lead, LeadStatus } from '../../types';
import { statusOptions, campaigns, countries } from '../../data/mockData';
import { formatDate, formatTimeAgo } from '../../utils/dateUtils';
import { Badge } from '../ui/Badge';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { LeadDetailModal } from './LeadDetailModal';
import { Search, Filter, RefreshCw, Clock, User, PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const LeadsTable: React.FC = () => {
  const { filteredLeads, loading, updateLeadStatus, filterLeads, activeFilters } = useLeads();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedCampaign, setSelectedCampaign] = useState<string>('');
  const [showMyLeads, setShowMyLeads] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Filter leads based on assignment
  const displayedLeads = showMyLeads && user
    ? filteredLeads.filter(lead => lead.assignedTo === user.id)
    : filteredLeads;

  const handleSearch = () => {
    filterLeads({
      ...activeFilters,
      search: searchTerm,
      assignedTo: showMyLeads ? user?.id : undefined,
    });
  };

  const handleStatusFilter = (status: string) => {
    setSelectedStatus(status);
    filterLeads({
      ...activeFilters,
      status: status || undefined,
      assignedTo: showMyLeads ? user?.id : undefined,
    });
  };

  const handleCampaignFilter = (campaign: string) => {
    setSelectedCampaign(campaign);
    filterLeads({
      ...activeFilters,
      campaign: campaign || undefined,
      assignedTo: showMyLeads ? user?.id : undefined,
    });
  };

  const toggleMyLeads = () => {
    setShowMyLeads(!showMyLeads);
    filterLeads({
      ...activeFilters,
      assignedTo: !showMyLeads ? user?.id : undefined,
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedStatus('');
    setSelectedCampaign('');
    setShowMyLeads(false);
    filterLeads({});
  };

  const handleViewLead = (lead: Lead) => {
    setSelectedLead(lead);
    setShowDetailModal(true);
  };

  const handleStatusChange = (id: string, status: LeadStatus) => {
    updateLeadStatus(id, status);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Header with Add Lead button */}
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Leads</h2>
        <Button
          onClick={() => navigate('/leads/new')}
          leftIcon={<PlusCircle size={18} />}
        >
          Add New Lead
        </Button>
      </div>

      {/* Filters section */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-4">
          <div className="w-full md:w-1/3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <Input
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
          </div>

          <div className="w-full md:w-1/4">
            <Select
              options={[
                { value: '', label: 'All Statuses' },
                ...Object.entries(statusOptions).map(([value, { label }]) => ({
                  value,
                  label,
                }))
              ]}
              value={selectedStatus}
              onChange={handleStatusFilter}
              placeholder="Filter by status"
            />
          </div>

          <div className="w-full md:w-1/4">
            <Select
              options={[
                { value: '', label: 'All Campaigns' },
                ...campaigns.map((c) => ({ value: c, label: c }))
              ]}
              value={selectedCampaign}
              onChange={handleCampaignFilter}
              placeholder="Filter by campaign"
            />
          </div>

          <div className="flex space-x-2">
            {user?.role === 'sales' && (
              <Button
                variant={showMyLeads ? 'primary' : 'outline'}
                size="md"
                leftIcon={<User size={16} />}
                onClick={toggleMyLeads}
              >
                My Leads
              </Button>
            )}
            <Button
              variant="outline"
              size="md"
              leftIcon={<Filter size={16} />}
              onClick={handleSearch}
            >
              Filter
            </Button>
            <Button
              variant="outline"
              size="md"
              leftIcon={<RefreshCw size={16} />}
              onClick={clearFilters}
            >
              Reset
            </Button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Lead
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Education
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Campaign
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subscription
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Assigned To
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={9} className="px-6 py-4 text-center">
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                    <span className="ml-2">Loading leads...</span>
                  </div>
                </td>
              </tr>
            ) : displayedLeads.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-6 py-12 text-center">
                  <p className="text-gray-500">No leads found matching your filters.</p>
                  <Button 
                    variant="outline"
                    className="mt-4"
                    onClick={clearFilters}
                  >
                    Clear filters
                  </Button>
                </td>
              </tr>
            ) : (
              displayedLeads.map((lead) => (
                <tr 
                  key={lead.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleViewLead(lead)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {lead.fullName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {lead.country}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      statusOptions[lead.status].color.replace('bg-', 'bg-opacity-20 text-').replace('-500', '-800')
                    }`}>
                      {statusOptions[lead.status].label}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{lead.email}</div>
                    <div className="text-sm text-gray-500">{lead.phoneNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{lead.university}</div>
                    <div className="text-sm text-gray-500">
                      {lead.area}, {lead.semester} semester
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={lead.source === 'meta' ? 'primary' : 'default'}>
                      {lead.campaignName}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {lead.subscription ? (
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {lead.subscription.type.charAt(0).toUpperCase() + lead.subscription.type.slice(1)}
                        </div>
                        <div className="text-xs text-gray-500">
                          Renewal: {formatDate(lead.subscription.endDate)}
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">No subscription</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {lead.assignedTo ? (
                      <div className="text-sm text-gray-900">
                        {/* Replace with actual user name lookup */}
                        Sales Rep #{lead.assignedTo}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">Unassigned</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      {formatTimeAgo(lead.createdAt)}
                    </div>
                    <div className="text-xs">{formatDate(lead.createdAt)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewLead(lead);
                      }}
                    >
                      View Details
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Lead detail modal */}
      {selectedLead && (
        <LeadDetailModal
          lead={selectedLead}
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};
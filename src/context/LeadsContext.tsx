import React, { createContext, useContext, useState, useEffect } from 'react';
import { Lead, LeadStatus } from '../types';
import { mockLeads } from '../data/mockData';
import { useAuth } from './AuthContext';

interface LeadsContextType {
  leads: Lead[];
  loading: boolean;
  filteredLeads: Lead[];
  addLead: (lead: Omit<Lead, 'id' | 'createdAt'>) => void;
  updateLead: (id: string, updates: Partial<Lead>) => void;
  updateLeadStatus: (id: string, status: LeadStatus) => void;
  getLeadsByStatus: (status: LeadStatus) => Lead[];
  assignLead: (id: string, userId: string) => void;
  filterLeads: (filters: Record<string, any>) => void;
  activeFilters: Record<string, any>;
}

const LeadsContext = createContext<LeadsContextType | undefined>(undefined);

export const LeadsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});
  const { user } = useAuth();

  useEffect(() => {
    // Mock API call to fetch leads
    const fetchLeads = async () => {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      setLeads(mockLeads);
      setLoading(false);
    };

    fetchLeads();
  }, []);

  useEffect(() => {
    if (user && user.role === 'sales') {
      // Filter leads based on user's assigned regions
      const userLeads = leads.filter(lead => 
        user.assignedRegions.includes('all') || 
        user.assignedRegions.includes(lead.country)
      );
      setFilteredLeads(userLeads);
    } else {
      setFilteredLeads(leads);
    }
  }, [leads, user]);

  const addLead = (leadData: Omit<Lead, 'id' | 'createdAt'>) => {
    const newLead: Lead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString(),
      lastContactedAt: null,
      notes: leadData.notes || '',
      status: leadData.status || 'new',
    };

    setLeads(prevLeads => [...prevLeads, newLead]);
  };

  const updateLead = (id: string, updates: Partial<Lead>) => {
    setLeads(prevLeads => 
      prevLeads.map(lead => 
        lead.id === id ? { ...lead, ...updates } : lead
      )
    );
  };

  const updateLeadStatus = (id: string, status: LeadStatus) => {
    setLeads(prevLeads => 
      prevLeads.map(lead => 
        lead.id === id ? { 
          ...lead, 
          status,
          lastContactedAt: status !== lead.status ? new Date().toISOString() : lead.lastContactedAt
        } : lead
      )
    );
  };

  const getLeadsByStatus = (status: LeadStatus) => {
    return filteredLeads.filter(lead => lead.status === status);
  };

  const assignLead = (id: string, userId: string) => {
    setLeads(prevLeads => 
      prevLeads.map(lead => 
        lead.id === id ? { ...lead, assignedTo: userId } : lead
      )
    );
  };

  const filterLeads = (filters: Record<string, any>) => {
    setActiveFilters(filters);
    
    let filtered = [...leads];
    
    // Apply each filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(lead => 
        lead.fullName.toLowerCase().includes(searchLower) ||
        lead.email.toLowerCase().includes(searchLower) ||
        lead.phoneNumber.includes(filters.search) ||
        lead.university.toLowerCase().includes(searchLower)
      );
    }
    
    if (filters.status) {
      filtered = filtered.filter(lead => lead.status === filters.status);
    }
    
    if (filters.campaign) {
      filtered = filtered.filter(lead => lead.campaignName === filters.campaign);
    }

    if (filters.dateRange) {
      const { start, end } = filters.dateRange;
      filtered = filtered.filter(lead => {
        const createdDate = new Date(lead.createdAt);
        return createdDate >= start && createdDate <= end;
      });
    }
    
    // Apply user region filters if user is a sales agent
    if (user && user.role === 'sales') {
      filtered = filtered.filter(lead => 
        user.assignedRegions.includes('all') || 
        user.assignedRegions.includes(lead.country)
      );
    }
    
    setFilteredLeads(filtered);
  };

  return (
    <LeadsContext.Provider value={{
      leads,
      loading,
      filteredLeads,
      addLead,
      updateLead,
      updateLeadStatus,
      getLeadsByStatus,
      assignLead,
      filterLeads,
      activeFilters
    }}>
      {children}
    </LeadsContext.Provider>
  );
};

export const useLeads = () => {
  const context = useContext(LeadsContext);
  if (context === undefined) {
    throw new Error('useLeads must be used within a LeadsProvider');
  }
  return context;
};
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'sales';
  assignedRegions: string[];
}

export interface Lead {
  id: string;
  campaignName: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  area: string;
  semester: string;
  difficulties: string;
  university: string;
  status: LeadStatus;
  assignedTo: string | null;
  createdAt: string;
  lastContactedAt: string | null;
  responseTime?: number;
  notes: string;
  source: 'meta' | 'manual';
  country: string;
  subscription?: Subscription;
}

export interface Subscription {
  type: 'monthly' | 'semestrial' | 'annual';
  price: number;
  startDate: string;
  endDate: string;
  renewalNotificationSent?: boolean;
  lastRenewalNotificationDate?: string;
}

export type LeadStatus = 'new' | 'booked' | 'no-answer' | 'call-later' | 'won' | 'lost';

export interface DashboardStats {
  totalLeads: number;
  newLeads: number;
  wonLeads: number;
  lostLeads: number;
  avgResponseTime: number;
  conversionRate: number;
}

export interface ReportFilter {
  dateRange?: {
    start: Date;
    end: Date;
  };
  status?: LeadStatus[];
  assignedTo?: string[];
  campaigns?: string[];
  countries?: string[];
  source?: ('meta' | 'manual')[];
  subscriptionType?: ('monthly' | 'semestrial' | 'annual')[];
}

export interface ReportMetric {
  id: string;
  name: string;
  type: 'count' | 'percentage' | 'average' | 'sum';
  field: keyof Lead;
  filter?: Partial<Lead>;
}

export interface Report {
  id: string;
  name: string;
  description: string;
  filters: ReportFilter;
  metrics: ReportMetric[];
  createdAt: string;
  createdBy: string;
  lastModified: string;
  chartType?: 'bar' | 'line' | 'pie';
  savedData?: any;
}
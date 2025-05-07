import { Lead, LeadStatus } from '../types';

// Update statusOptions with more vivid colors
export const statusOptions: Record<LeadStatus, { label: string, color: string }> = {
  'new': { label: 'New Lead', color: 'bg-blue-500' },
  'booked': { label: 'Booked', color: 'bg-indigo-500' },
  'no-answer': { label: 'No Answer', color: 'bg-orange-500' },
  'call-later': { label: 'Call Later', color: 'bg-amber-500' },
  'won': { label: 'Won', color: 'bg-emerald-500' },
  'lost': { label: 'Lost', color: 'bg-rose-500' },
};

// Add subscription types
export const subscriptionTypes = [
  { value: 'monthly', label: 'Monthly Plan', price: 99 },
  { value: 'semestrial', label: 'Semestrial Plan', price: 499 },
  { value: 'annual', label: 'Annual Plan', price: 899 }
];

// Add campaigns data
export const campaigns = [
  'Fall 2024 Intake',
  'Spring 2024 Intake',
  'Summer Special',
  'Early Bird 2024',
  'Meta Campaign Q1',
  'Meta Campaign Q2'
];

// Add countries data
export const countries = [
  'Brazil',
  'Portugal',
  'Spain',
  'Mexico',
  'Colombia',
  'Argentina',
  'Chile'
];

// Add study areas
export const studyAreas = [
  'Computer Science',
  'Engineering',
  'Mathematics',
  'Physics',
  'Business Administration',
  'Economics',
  'Medicine'
];

// Add semesters
export const semesters = [
  '1st Semester',
  '2nd Semester',
  '3rd Semester',
  '4th Semester',
  '5th Semester',
  '6th Semester',
  '7th Semester',
  '8th Semester'
];

// Add universities
export const universities = [
  'University of São Paulo',
  'Federal University of Rio de Janeiro',
  'University of Porto',
  'University of Lisbon',
  'University of Barcelona',
  'Complutense University of Madrid',
  'National Autonomous University of Mexico',
  'Monterrey Institute of Technology'
];

// Add mock leads data
export const mockLeads: Lead[] = [
  {
    id: 'lead-1',
    fullName: 'John Smith',
    email: 'john.smith@example.com',
    phoneNumber: '+1234567890',
    university: 'University of Technology',
    country: 'United States',
    status: 'new',
    campaignName: 'Fall 2024 Intake',
    assignedTo: null,
    createdAt: '2024-01-15T08:00:00.000Z',
    lastContactedAt: null,
    notes: 'Interested in Computer Science program',
    source: 'meta',
    area: 'Computer Science',
    semester: '1st Semester',
    difficulties: 'Programming basics'
  },
  {
    id: 'lead-2',
    fullName: 'Emma Wilson',
    email: 'emma.wilson@example.com',
    phoneNumber: '+1234567891',
    university: 'State University',
    country: 'Canada',
    status: 'won',
    campaignName: 'Spring 2024 Intake',
    assignedTo: 'user-1',
    createdAt: '2024-01-14T09:30:00.000Z',
    lastContactedAt: '2024-01-15T10:00:00.000Z',
    notes: 'Closed deal - Annual subscription',
    source: 'meta',
    area: 'Mathematics',
    semester: '3rd Semester',
    difficulties: 'Advanced calculus',
    subscription: {
      type: 'annual',
      price: 899,
      startDate: '2024-01-15T10:00:00.000Z',
      endDate: '2025-01-15T10:00:00.000Z'
    }
  },
  {
    id: 'lead-3',
    fullName: 'Maria Garcia',
    email: 'maria.garcia@example.com',
    phoneNumber: '+1234567892',
    university: 'International College',
    country: 'Spain',
    status: 'won',
    campaignName: 'Fall 2024 Intake',
    assignedTo: 'user-2',
    createdAt: '2024-01-13T14:20:00.000Z',
    lastContactedAt: '2024-01-14T15:00:00.000Z',
    notes: 'Closed deal - Semestrial subscription',
    source: 'manual',
    area: 'Engineering',
    semester: '4th Semester',
    difficulties: 'Thermodynamics',
    subscription: {
      type: 'semestrial',
      price: 499,
      startDate: '2024-01-14T15:00:00.000Z',
      endDate: '2024-07-14T15:00:00.000Z'
    }
  }
];
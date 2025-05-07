import React, { useState } from 'react';
import { Card, CardHeader, CardBody } from '../ui/Card';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { Lead, LeadStatus } from '../../types';
import { statusOptions, studyAreas, countries, semesters, universities } from '../../data/mockData';
import { useLeads } from '../../context/LeadsContext';
import { useNavigate } from 'react-router-dom';

export const NewLeadForm: React.FC = () => {
  const { addLead } = useLeads();
  const navigate = useNavigate();
  
  const [formValues, setFormValues] = useState({
    campaignName: 'Manual Entry',
    fullName: '',
    email: '',
    phoneNumber: '',
    area: '',
    semester: '',
    difficulties: '',
    university: '',
    country: '',
    status: 'new' as LeadStatus,
    notes: '',
    source: 'manual' as 'meta' | 'manual',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (name: string, value: string) => {
    setFormValues(prev => ({ ...prev, [name]: value }));
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formValues.fullName.trim()) {
      newErrors.fullName = 'Name is required';
    }
    
    if (!formValues.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formValues.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    }
    
    if (!formValues.country.trim()) {
      newErrors.country = 'Country is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // In a real app, you would submit to your backend here
    setTimeout(() => {
      addLead(formValues);
      setIsSubmitting(false);
      navigate('/leads/table');
    }, 800);
  };
  
  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <h2 className="text-xl font-semibold text-gray-800">Add New Lead</h2>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Personal Information */}
            <div>
              <h3 className="font-medium text-gray-700 mb-3">Personal Information</h3>
              
              <Input
                label="Full Name *"
                name="fullName"
                value={formValues.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                error={errors.fullName}
                fullWidth
              />
              
              <Input
                label="Email Address *"
                name="email"
                type="email"
                value={formValues.email}
                onChange={(e) => handleChange('email', e.target.value)}
                error={errors.email}
                fullWidth
              />
              
              <Input
                label="Phone Number *"
                name="phoneNumber"
                value={formValues.phoneNumber}
                onChange={(e) => handleChange('phoneNumber', e.target.value)}
                error={errors.phoneNumber}
                helperText="Include country code, e.g., +55 for Brazil"
                fullWidth
              />
              
              <Select
                label="Country *"
                name="country"
                options={[
                  { value: '', label: 'Select Country' },
                  ...countries.map(country => ({
                    value: country,
                    label: country
                  }))
                ]}
                value={formValues.country}
                onChange={(value) => handleChange('country', value)}
                error={errors.country}
                fullWidth
              />
            </div>
            
            {/* Educational Information */}
            <div>
              <h3 className="font-medium text-gray-700 mb-3">Educational Information</h3>
              
              <Input
                label="University"
                name="university"
                value={formValues.university}
                onChange={(e) => handleChange('university', e.target.value)}
                list="universities"
                fullWidth
              />
              <datalist id="universities">
                {universities.map((university, index) => (
                  <option key={index} value={university} />
                ))}
              </datalist>
              
              <Select
                label="Area of Study"
                name="area"
                options={[
                  { value: '', label: 'Select Area' },
                  ...studyAreas.map(area => ({
                    value: area,
                    label: area
                  }))
                ]}
                value={formValues.area}
                onChange={(value) => handleChange('area', value)}
                fullWidth
              />
              
              <Select
                label="Semester"
                name="semester"
                options={[
                  { value: '', label: 'Select Semester' },
                  ...semesters.map(semester => ({
                    value: semester,
                    label: semester
                  }))
                ]}
                value={formValues.semester}
                onChange={(value) => handleChange('semester', value)}
                fullWidth
              />
              
              <Textarea
                label="Difficulties"
                name="difficulties"
                value={formValues.difficulties}
                onChange={(e) => handleChange('difficulties', e.target.value)}
                placeholder="E.g., Calculus, Programming, Statistics..."
                fullWidth
              />
            </div>
          </div>
          
          {/* Lead Status and Notes */}
          <div className="mt-6">
            <h3 className="font-medium text-gray-700 mb-3">Lead Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Initial Status"
                name="status"
                options={Object.entries(statusOptions).map(([value, { label }]) => ({
                  value,
                  label
                }))}
                value={formValues.status}
                onChange={(value) => handleChange('status', value as LeadStatus)}
                fullWidth
              />
              
              <Input
                label="Campaign"
                name="campaignName"
                value={formValues.campaignName}
                onChange={(e) => handleChange('campaignName', e.target.value)}
                disabled
                helperText="Automatically set for manual entries"
                fullWidth
              />
            </div>
            
            <Textarea
              label="Notes"
              name="notes"
              value={formValues.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder="Any additional information about this lead..."
              rows={4}
              className="mt-4"
              fullWidth
            />
          </div>
          
          {/* Submit Button */}
          <div className="mt-6 flex justify-end">
            <Button
              variant="outline"
              onClick={() => navigate('/leads/table')}
              className="mr-3"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={isSubmitting}
            >
              Add Lead
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};
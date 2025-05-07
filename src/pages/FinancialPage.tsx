import React, { useState } from 'react';
import { Card, CardBody } from '../components/ui/Card';
import { Select } from '../components/ui/Select';
import { useLeads } from '../context/LeadsContext';
import { formatDate } from '../utils/dateUtils';
import { Badge } from '../components/ui/Badge';
import { DollarSign, TrendingUp, Calendar, RefreshCcw } from 'lucide-react';

export const FinancialPage: React.FC = () => {
  const { leads } = useLeads();
  const [timeframe, setTimeframe] = useState('all');
  
  // Get all won leads with subscriptions
  const wonLeads = leads.filter(lead => lead.status === 'won' && lead.subscription);
  
  // Calculate total revenue
  const totalRevenue = wonLeads.reduce((total, lead) => {
    return total + (lead.subscription?.price || 0);
  }, 0);
  
  // Calculate revenue by subscription type
  const revenueByType = wonLeads.reduce((acc, lead) => {
    const type = lead.subscription?.type || 'unknown';
    acc[type] = (acc[type] || 0) + (lead.subscription?.price || 0);
    return acc;
  }, {} as Record<string, number>);
  
  // Get unique customers (by email)
  const uniqueCustomers = new Set(wonLeads.map(lead => lead.email)).size;
  
  // Calculate average deal value
  const avgDealValue = totalRevenue / (wonLeads.length || 1);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Financial Overview</h1>
        <Select
          options={[
            { value: 'all', label: 'All Time' },
            { value: 'year', label: 'This Year' },
            { value: 'month', label: 'This Month' },
            { value: 'week', label: 'This Week' }
          ]}
          value={timeframe}
          onChange={(value) => setTimeframe(value)}
          className="w-48"
        />
      </div>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardBody>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Total Revenue</h3>
              <DollarSign className="h-8 w-8 opacity-75" />
            </div>
            <p className="text-3xl font-bold mt-2">${totalRevenue.toLocaleString()}</p>
            <p className="text-sm mt-2 opacity-75">
              From {wonLeads.length} successful deals
            </p>
          </CardBody>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardBody>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Avg. Deal Value</h3>
              <TrendingUp className="h-8 w-8 opacity-75" />
            </div>
            <p className="text-3xl font-bold mt-2">${avgDealValue.toFixed(2)}</p>
            <p className="text-sm mt-2 opacity-75">
              Per successful deal
            </p>
          </CardBody>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardBody>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Active Customers</h3>
              <Calendar className="h-8 w-8 opacity-75" />
            </div>
            <p className="text-3xl font-bold mt-2">{uniqueCustomers}</p>
            <p className="text-sm mt-2 opacity-75">
              Unique paying customers
            </p>
          </CardBody>
        </Card>
        
        <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
          <CardBody>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Renewals Due</h3>
              <RefreshCcw className="h-8 w-8 opacity-75" />
            </div>
            <p className="text-3xl font-bold mt-2">5</p>
            <p className="text-sm mt-2 opacity-75">
              In the next 30 days
            </p>
          </CardBody>
        </Card>
      </div>
      
      {/* Revenue by Subscription Type */}
      <Card>
        <CardBody>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue by Subscription Type</h3>
          <div className="space-y-4">
            {Object.entries(revenueByType).map(([type, amount]) => (
              <div key={type} className="flex items-center justify-between">
                <div className="flex items-center">
                  <Badge variant="primary" className="mr-2">
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Badge>
                  <span className="text-sm text-gray-600">
                    {wonLeads.filter(l => l.subscription?.type === type).length} subscriptions
                  </span>
                </div>
                <span className="font-medium">${amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
      
      {/* Recent Transactions */}
      <Card>
        <CardBody>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Transactions</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Renewal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {wonLeads.slice(0, 10).map((lead) => (
                  <tr key={lead.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{lead.fullName}</div>
                      <div className="text-sm text-gray-500">{lead.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="primary">
                        {lead.subscription?.type.charAt(0).toUpperCase() + lead.subscription?.type.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      ${lead.subscription?.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(lead.subscription?.startDate || '')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(lead.subscription?.endDate || '')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
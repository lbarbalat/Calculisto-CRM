import React, { useState } from 'react';
import { Card, CardBody } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { useLeads } from '../context/LeadsContext';
import { Report, ReportFilter, ReportMetric } from '../types';
import { statusOptions } from '../data/mockData';
import { PlusCircle, BarChart2, PieChart, LineChart, Table } from 'lucide-react';

export const ReportsPage: React.FC = () => {
  const { leads } = useLeads();
  const [showNewReport, setShowNewReport] = useState(false);
  const [reportName, setReportName] = useState('');
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<ReportFilter>({});

  const metrics: ReportMetric[] = [
    { id: 'total-leads', name: 'Total Leads', type: 'count', field: 'id' },
    { id: 'conversion-rate', name: 'Conversion Rate', type: 'percentage', field: 'status' },
    { id: 'avg-response-time', name: 'Average Response Time', type: 'average', field: 'responseTime' },
    { id: 'leads-by-status', name: 'Leads by Status', type: 'count', field: 'status' },
    { id: 'leads-by-campaign', name: 'Leads by Campaign', type: 'count', field: 'campaignName' },
    { id: 'leads-by-country', name: 'Leads by Country', type: 'count', field: 'country' },
  ];

  const handleCreateReport = () => {
    // Implementation for creating a new report
    console.log('Creating report with:', { reportName, selectedMetrics, selectedFilters });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <Button
          onClick={() => setShowNewReport(true)}
          leftIcon={<PlusCircle size={18} />}
        >
          Create New Report
        </Button>
      </div>

      {showNewReport ? (
        <Card>
          <CardBody>
            <h2 className="text-lg font-medium mb-4">Create New Report</h2>
            
            <div className="space-y-4">
              <Input
                label="Report Name"
                value={reportName}
                onChange={(e) => setReportName(e.target.value)}
                placeholder="Enter report name"
                fullWidth
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Metrics
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {metrics.map((metric) => (
                    <div
                      key={metric.id}
                      className={`
                        p-4 rounded-lg border cursor-pointer
                        ${selectedMetrics.includes(metric.id)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                        }
                      `}
                      onClick={() => {
                        setSelectedMetrics(prev =>
                          prev.includes(metric.id)
                            ? prev.filter(id => id !== metric.id)
                            : [...prev, metric.id]
                        );
                      }}
                    >
                      <div className="flex items-center">
                        {metric.type === 'count' && <BarChart2 size={18} className="mr-2 text-blue-500" />}
                        {metric.type === 'percentage' && <PieChart size={18} className="mr-2 text-green-500" />}
                        {metric.type === 'average' && <LineChart size={18} className="mr-2 text-purple-500" />}
                        <span className="font-medium">{metric.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Filters</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select
                    label="Status"
                    options={[
                      { value: '', label: 'All Statuses' },
                      ...Object.entries(statusOptions).map(([value, { label }]) => ({
                        value,
                        label,
                      }))
                    ]}
                    onChange={(value) => setSelectedFilters(prev => ({
                      ...prev,
                      status: value ? [value as any] : undefined
                    }))}
                    fullWidth
                  />

                  <Input
                    type="date"
                    label="Date Range Start"
                    onChange={(e) => setSelectedFilters(prev => ({
                      ...prev,
                      dateRange: {
                        ...prev.dateRange,
                        start: new Date(e.target.value)
                      }
                    }))}
                    fullWidth
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowNewReport(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateReport}
                  disabled={!reportName || selectedMetrics.length === 0}
                >
                  Create Report
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sample reports */}
          <Card>
            <CardBody>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Conversion Rate by Campaign</h3>
                <PieChart size={20} className="text-blue-500" />
              </div>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                {/* Placeholder for chart */}
                <span className="text-gray-500">Chart visualization</span>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Lead Status Distribution</h3>
                <BarChart2 size={20} className="text-green-500" />
              </div>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                {/* Placeholder for chart */}
                <span className="text-gray-500">Chart visualization</span>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Response Time Trends</h3>
                <LineChart size={20} className="text-purple-500" />
              </div>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                {/* Placeholder for chart */}
                <span className="text-gray-500">Chart visualization</span>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
};
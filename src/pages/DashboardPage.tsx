import React from 'react';
import { useLeads } from '../context/LeadsContext';
import { Card, CardBody } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  Phone, 
  Clock, 
  TrendingUp, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  ArrowRight 
} from 'lucide-react';
import { formatDate } from '../utils/dateUtils';
import { useNavigate } from 'react-router-dom';

export const DashboardPage: React.FC = () => {
  const { leads, filteredLeads, loading } = useLeads();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Calculate metrics
  const newLeads = filteredLeads.filter(lead => lead.status === 'new').length;
  const bookedLeads = filteredLeads.filter(lead => lead.status === 'booked').length;
  const wonLeads = filteredLeads.filter(lead => lead.status === 'won').length;
  const lostLeads = filteredLeads.filter(lead => lead.status === 'lost').length;
  
  // Calculate conversion rate
  const conversionRate = filteredLeads.length > 0 
    ? Math.round((wonLeads / filteredLeads.length) * 100) 
    : 0;
  
  // Get recent leads
  const recentLeads = [...filteredLeads]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div>
          <Button 
            onClick={() => navigate('/leads/new')}
            leftIcon={<Users size={18} />}
          >
            Add New Lead
          </Button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardBody>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">New Leads</h3>
              <Users className="h-8 w-8 opacity-75" />
            </div>
            <p className="text-3xl font-bold mt-2">{newLeads}</p>
            <p className="text-sm mt-2 opacity-75">
              {newLeads === 1 ? 'lead' : 'leads'} waiting for first contact
            </p>
          </CardBody>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardBody>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Booked Calls</h3>
              <Phone className="h-8 w-8 opacity-75" />
            </div>
            <p className="text-3xl font-bold mt-2">{bookedLeads}</p>
            <p className="text-sm mt-2 opacity-75">
              {bookedLeads === 1 ? 'call' : 'calls'} scheduled with leads
            </p>
          </CardBody>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardBody>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Conversion Rate</h3>
              <TrendingUp className="h-8 w-8 opacity-75" />
            </div>
            <p className="text-3xl font-bold mt-2">{conversionRate}%</p>
            <p className="text-sm mt-2 opacity-75">
              {wonLeads} won out of {filteredLeads.length} total leads
            </p>
          </CardBody>
        </Card>
        
        <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
          <CardBody>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Avg. Response Time</h3>
              <Clock className="h-8 w-8 opacity-75" />
            </div>
            <p className="text-3xl font-bold mt-2">1.5h</p>
            <p className="text-sm mt-2 opacity-75">
              Average first response time
            </p>
          </CardBody>
        </Card>
      </div>
      
      {/* Recent Activity and Leads Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Leads */}
        <div className="lg:col-span-2">
          <Card>
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Recent Leads</h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/leads/table')}
              >
                View All
              </Button>
            </div>
            <div className="divide-y divide-gray-200">
              {recentLeads.length > 0 ? (
                recentLeads.map((lead) => (
                  <div key={lead.id} className="px-6 py-4 flex justify-between items-center hover:bg-gray-50">
                    <div>
                      <div className="flex items-center">
                        <span className="font-medium text-gray-900">{lead.fullName}</span>
                        <Badge 
                          variant={lead.source === 'meta' ? 'primary' : 'default'}
                          className="ml-2"
                        >
                          {lead.campaignName}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {lead.email} • {lead.area} • {lead.university}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="text-sm text-gray-500 mr-4 text-right">
                        <div>{formatDate(lead.createdAt)}</div>
                        <Badge
                          variant={
                            lead.status === 'won' 
                              ? 'success' 
                              : lead.status === 'lost' 
                              ? 'danger' 
                              : lead.status === 'new' 
                              ? 'primary' 
                              : 'warning'
                          }
                          className="mt-1"
                        >
                          {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                        </Badge>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/leads/table`)}
                      >
                        <ArrowRight size={16} />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-6 py-8 text-center text-gray-500">
                  No recent leads found.
                </div>
              )}
            </div>
          </Card>
        </div>
        
        {/* Performance Cards */}
        <div className="space-y-4">
          <Card>
            <CardBody>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Your Performance</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm font-medium">
                    <span>Leads Contacted Today</span>
                    <span className="text-blue-600">8/10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm font-medium">
                    <span>Response Time</span>
                    <span className="text-green-600">1h 15m</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm font-medium">
                    <span>Conversions This Week</span>
                    <span className="text-purple-600">3/12</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
          
          <Card>
            <CardBody>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Upcoming Tasks</h3>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">Follow up with Marina Costa</p>
                    <p className="text-sm text-gray-500">
                      <Calendar size={14} className="inline mr-1" />
                      Today, 2:30 PM
                    </p>
                  </div>
                  <Button size="sm" variant="outline" className="ml-3">
                    <CheckCircle size={16} />
                  </Button>
                </div>
                
                <div className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">Call João Pereira</p>
                    <p className="text-sm text-gray-500">
                      <Calendar size={14} className="inline mr-1" />
                      Tomorrow, 10:00 AM
                    </p>
                  </div>
                  <Button size="sm" variant="outline" className="ml-3">
                    <XCircle size={16} />
                  </Button>
                </div>
                
                <div className="text-center mt-4">
                  <Button 
                    variant="outline" 
                    fullWidth
                    size="sm"
                  >
                    View All Tasks
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardBody>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Sales Pipeline</h3>
            
            {/* Simple pipeline visualization */}
            <div className="mt-4">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-100">
                      New Lead
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-blue-600">
                      {newLeads}
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-100">
                  <div style={{ width: `${(newLeads / filteredLeads.length) * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
                </div>
              </div>
              
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple-600 bg-purple-100">
                      Booked
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-purple-600">
                      {bookedLeads}
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-100">
                  <div style={{ width: `${(bookedLeads / filteredLeads.length) * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"></div>
                </div>
              </div>
              
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-100">
                      Won
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-green-600">
                      {wonLeads}
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-100">
                  <div style={{ width: `${(wonLeads / filteredLeads.length) * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
                </div>
              </div>
              
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-red-600 bg-red-100">
                      Lost
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-red-600">
                      {lostLeads}
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-red-100">
                  <div style={{ width: `${(lostLeads / filteredLeads.length) * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"></div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <Button 
                onClick={() => navigate('/leads/kanban')}
                variant="outline"
              >
                View Kanban Board
              </Button>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Campaign Performance</h3>
            
            {/* Campaign performance visualization */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Brazil-Math-Q1</span>
                  <Badge variant="success">15% Conversion</Badge>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Spain-Engineering-Q1</span>
                  <Badge variant="primary">22% Conversion</Badge>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '22%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Portugal-Science-Q1</span>
                  <Badge variant="warning">8% Conversion</Badge>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '8%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Mexico-Business-Q1</span>
                  <Badge variant="info">18% Conversion</Badge>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: '18%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <Button 
                variant="outline"
              >
                View Reports
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
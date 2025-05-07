import React from 'react';
import { Card, CardBody } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';
import { Settings, Bell, Globe, Shield, Database } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <Button>
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardBody>
              <h2 className="text-lg font-medium mb-4">General Settings</h2>
              <div className="space-y-4">
                <Input
                  label="Company Name"
                  defaultValue="Calculisto CRM"
                  fullWidth
                />
                <Input
                  label="Support Email"
                  type="email"
                  defaultValue="support@calculisto.com"
                  fullWidth
                />
                <Select
                  label="Default Language"
                  options={[
                    { value: 'en', label: 'English' },
                    { value: 'es', label: 'Spanish' },
                    { value: 'pt', label: 'Portuguese' }
                  ]}
                  value="en"
                  fullWidth
                />
                <Select
                  label="Timezone"
                  options={[
                    { value: 'UTC', label: 'UTC' },
                    { value: 'America/New_York', label: 'Eastern Time' },
                    { value: 'America/Chicago', label: 'Central Time' },
                    { value: 'America/Denver', label: 'Mountain Time' },
                    { value: 'America/Los_Angeles', label: 'Pacific Time' }
                  ]}
                  value="UTC"
                  fullWidth
                />
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <h2 className="text-lg font-medium mb-4">Notification Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
                    <p className="text-sm text-gray-500">Receive email notifications for new leads</p>
                  </div>
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    defaultChecked
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Lead Assignment</h3>
                    <p className="text-sm text-gray-500">Notify when a lead is assigned to you</p>
                  </div>
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    defaultChecked
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Status Updates</h3>
                    <p className="text-sm text-gray-500">Notify when a lead status changes</p>
                  </div>
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    defaultChecked
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardBody>
              <h2 className="text-lg font-medium mb-4">Quick Settings</h2>
              <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-3 text-left border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Region Settings</p>
                      <p className="text-xs text-gray-500">Configure regional preferences</p>
                    </div>
                  </div>
                </button>
                <button className="w-full flex items-center justify-between p-3 text-left border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center">
                    <Bell className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Notifications</p>
                      <p className="text-xs text-gray-500">Manage notification preferences</p>
                    </div>
                  </div>
                </button>
                <button className="w-full flex items-center justify-between p-3 text-left border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Security</p>
                      <p className="text-xs text-gray-500">Configure security settings</p>
                    </div>
                  </div>
                </button>
                <button className="w-full flex items-center justify-between p-3 text-left border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center">
                    <Database className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Data Management</p>
                      <p className="text-xs text-gray-500">Manage data and backups</p>
                    </div>
                  </div>
                </button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};
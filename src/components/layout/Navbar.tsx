import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Menu, Bell, Search, Menu as MenuIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center md:hidden">
            <Button
              variant="outline"
              size="sm"
              className="border-0"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <MenuIcon size={24} />
            </Button>
          </div>
          
          {/* Search bar */}
          <div className="flex-1 flex items-center justify-start md:ml-8">
            <div className="max-w-lg w-full">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search leads..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
          
          {/* Right side icons and user menu */}
          <div className="flex items-center">
            <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none">
              <Bell size={20} />
            </button>
            
            {/* User dropdown */}
            <div className="ml-3 relative">
              <div className="flex items-center">
                <span className="hidden md:block mr-2 text-sm font-medium text-gray-700">
                  {user?.name}
                </span>
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                  {user?.name.charAt(0)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <button
              onClick={() => {
                navigate('/');
                setIsMobileMenuOpen(false);
              }}
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-800 border-l-4 border-blue-500 bg-blue-50 w-full text-left"
            >
              Dashboard
            </button>
            <button
              onClick={() => {
                navigate('/leads/kanban');
                setIsMobileMenuOpen(false);
              }}
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 border-l-4 border-transparent w-full text-left"
            >
              Kanban Board
            </button>
            <button
              onClick={() => {
                navigate('/leads/table');
                setIsMobileMenuOpen(false);
              }}
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 border-l-4 border-transparent w-full text-left"
            >
              Leads Table
            </button>
            <button
              onClick={() => {
                navigate('/leads/new');
                setIsMobileMenuOpen(false);
              }}
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 border-l-4 border-transparent w-full text-left"
            >
              Add New Lead
            </button>
            <button
              onClick={() => {
                navigate('/reports');
                setIsMobileMenuOpen(false);
              }}
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 border-l-4 border-transparent w-full text-left"
            >
              Reports
            </button>
            {user?.role === 'admin' && (
              <>
                <button
                  onClick={() => {
                    navigate('/users');
                    setIsMobileMenuOpen(false);
                  }}
                  className="block pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 border-l-4 border-transparent w-full text-left"
                >
                  Users
                </button>
                <button
                  onClick={() => {
                    navigate('/settings');
                    setIsMobileMenuOpen(false);
                  }}
                  className="block pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 border-l-4 border-transparent w-full text-left"
                >
                  Settings
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
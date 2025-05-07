import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  FileSpreadsheet, 
  Kanban, 
  PlusCircle, 
  Settings, 
  LogOut, 
  BarChart3 
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  
  // Navigation items with icons
  const navItems = [
    { path: '/', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/leads/kanban', label: 'Kanban Board', icon: <Kanban size={20} /> },
    { path: '/leads/table', label: 'Leads Table', icon: <FileSpreadsheet size={20} /> },
    { path: '/leads/new', label: 'Add New Lead', icon: <PlusCircle size={20} /> },
    { path: '/reports', label: 'Reports', icon: <BarChart3 size={20} /> },
  ];
  
  // Admin only navigation
  const adminNavItems = [
    { path: '/users', label: 'Users', icon: <Users size={20} /> },
    { path: '/settings', label: 'Settings', icon: <Settings size={20} /> },
  ];
  
  return (
    <aside className="bg-blue-800 text-white w-64 flex-shrink-0 hidden md:block">
      <div className="flex flex-col h-full">
        {/* Logo and app name */}
        <div className="px-6 py-4 flex items-center border-b border-blue-700">
          <div className="flex items-center space-x-2">
            <LayoutDashboard size={24} className="text-white" />
            <span className="text-xl font-semibold">Calculisto CRM</span>
          </div>
        </div>
        
        {/* User info */}
        <div className="px-6 py-4 border-b border-blue-700">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-lg font-semibold">
              {user?.name.charAt(0)}
            </div>
            <div>
              <p className="font-medium">{user?.name}</p>
              <p className="text-sm text-blue-200">{user?.role === 'admin' ? 'Administrator' : 'Sales Agent'}</p>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center px-3 py-2 rounded-md font-medium
                    ${isActive 
                      ? 'bg-blue-700 text-white' 
                      : 'text-blue-100 hover:bg-blue-700 hover:text-white'}
                    transition-colors duration-200
                  `}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </NavLink>
              </li>
            ))}
            
            {/* Admin only navigation */}
            {user?.role === 'admin' && (
              <>
                <li className="pt-5 pb-2">
                  <p className="text-xs uppercase text-blue-300 font-semibold tracking-wider">
                    Administration
                  </p>
                </li>
                {adminNavItems.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => `
                        flex items-center px-3 py-2 rounded-md font-medium
                        ${isActive 
                          ? 'bg-blue-700 text-white' 
                          : 'text-blue-100 hover:bg-blue-700 hover:text-white'}
                        transition-colors duration-200
                      `}
                    >
                      <span className="mr-3">{item.icon}</span>
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </>
            )}
          </ul>
        </nav>
        
        {/* Logout button */}
        <div className="px-3 py-4 border-t border-blue-700">
          <button 
            onClick={logout}
            className="flex items-center w-full px-3 py-2 text-blue-100 hover:bg-blue-700 hover:text-white rounded-md font-medium transition-colors duration-200"
          >
            <LogOut size={20} className="mr-3" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};
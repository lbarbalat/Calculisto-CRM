import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Lock } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  // Demo user info hints
  const demoUsers = [
    { email: 'admin@calculisto.com', password: 'demo' },
    { email: 'sales1@calculisto.com', password: 'demo' },
    { email: 'sales2@calculisto.com', password: 'demo' },
  ];
  
  // If already authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    
    setIsLoggingIn(true);
    setError('');
    
    try {
      // For demo purposes, any password works with the demo emails
      if (demoUsers.some(user => user.email === email)) {
        await login(email, 'demo');
        navigate('/');
      } else {
        setError('Invalid credentials. Try one of the demo accounts.');
      }
    } catch (err) {
      setError('Invalid credentials. Try one of the demo accounts.');
    } finally {
      setIsLoggingIn(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="h-16 w-16 bg-blue-600 text-white rounded-xl flex items-center justify-center">
            <LayoutDashboard size={32} />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Calculisto CRM
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to manage your sales pipeline
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
            <Input
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              rightIcon={<Lock size={16} />}
            />

            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div>
              <Button 
                type="submit" 
                fullWidth 
                isLoading={isLoggingIn}
              >
                Sign in
              </Button>
            </div>
          </form>
          
          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-500 text-center">
              Demo Accounts
            </h3>
            <div className="mt-4 space-y-2">
              {demoUsers.map((user, index) => (
                <div 
                  key={index} 
                  className="bg-gray-50 p-2 rounded-md text-sm flex justify-between cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    setEmail(user.email);
                    setPassword('demo');
                  }}
                >
                  <span>{user.email}</span>
                  <span className="text-gray-500">Password: demo</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
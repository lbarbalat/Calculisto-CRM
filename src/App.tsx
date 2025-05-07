import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { DashboardPage } from './pages/DashboardPage';
import { KanbanPage } from './pages/KanbanPage';
import { LeadsTablePage } from './pages/LeadsTablePage';
import { NewLeadPage } from './pages/NewLeadPage';
import { ReportsPage } from './pages/ReportsPage';
import { LoginPage } from './pages/LoginPage';
import { FinancialPage } from './pages/FinancialPage';
import { KanbanSettingsPage } from './pages/KanbanSettingsPage';
import { UsersPage } from './pages/UsersPage';
import { SettingsPage } from './pages/SettingsPage';
import { AuthProvider } from './context/AuthContext';
import { LeadsProvider } from './context/LeadsContext';

function App() {
  return (
    <AuthProvider>
      <LeadsProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <Layout>
                  <DashboardPage />
                </Layout>
              }
            />
            <Route
              path="/leads/kanban"
              element={
                <Layout>
                  <KanbanPage />
                </Layout>
              }
            />
            <Route
              path="/leads/kanban/settings"
              element={
                <Layout>
                  <KanbanSettingsPage />
                </Layout>
              }
            />
            <Route
              path="/leads/table"
              element={
                <Layout>
                  <LeadsTablePage />
                </Layout>
              }
            />
            <Route
              path="/leads/new"
              element={
                <Layout>
                  <NewLeadPage />
                </Layout>
              }
            />
            <Route
              path="/reports"
              element={
                <Layout>
                  <ReportsPage />
                </Layout>
              }
            />
            <Route
              path="/financial"
              element={
                <Layout>
                  <FinancialPage />
                </Layout>
              }
            />
            <Route
              path="/users"
              element={
                <Layout>
                  <UsersPage />
                </Layout>
              }
            />
            <Route
              path="/settings"
              element={
                <Layout>
                  <SettingsPage />
                </Layout>
              }
            />
            <Route
              path="*"
              element={
                <Layout>
                  <DashboardPage />
                </Layout>
              }
            />
          </Routes>
        </Router>
      </LeadsProvider>
    </AuthProvider>
  );
}

export default App;
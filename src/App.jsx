import LicenseTable from './features/license/LicenseTable';
            <Route
              path="/license-table"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <LicenseTable />
                </ProtectedRoute>
              }
            />
import LicenseForm from './features/license/LicenseForm';
            <Route
              path="/license-form"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <LicenseForm />
                </ProtectedRoute>
              }
            />
import LicenseInput from './features/license/input';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context
import { AuthProvider, useAuth } from './context/AuthContext';

// Components
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Login from './pages/Login';
import RegisterAdmin from './pages/RegisterAdmin';
import RegisterSales from './pages/RegisterSales';
import DashboardAdmin from './pages/DashboardAdmin';
import DashboardSales from './pages/DashboardSales';
import ProgressProject from './pages/ProgressProject';
import AddSampleData from './pages/AddSampleData';
import TestFirebase from './pages/TestFirebase';
import ProjectForm from './pages/ProjectForm';
import BusinessDevelopment from './pages/BusinessDevelopment';
import BusinessDevelopmentForm from './pages/BusinessDevelopmentForm';
import IncidentManagement from './features/incident/IncidentManagement';
import IncidentFrom from './features/incident/IncidentFrom';

// Component to handle role-based redirection
function RoleBasedRedirect() {
  const { currentUser, userRole } = useAuth();

  // Show loading while waiting for user data
  if (currentUser && userRole === null) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column'
      }}>
        <div style={{ marginBottom: '10px' }}>Loading...</div>
        <div>Checking user role...</div>
      </div>
    );
  }

  // Redirect based on user role
  if (currentUser && userRole) {
    if (userRole === 'admin') {
      return <Navigate to="/dashboard-admin" replace />;
    } else if (userRole === 'sales') {
      return <Navigate to="/dashboard-sales" replace />;
    }
  }

  // If no user is logged in, redirect to login
  return <Navigate to="/login" replace />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/license-form" element={<ProtectedRoute allowedRoles={["admin"]}><LicenseForm /></ProtectedRoute>} />
            <Route path="/license-input" element={<ProtectedRoute allowedRoles={["admin"]}><LicenseInput /></ProtectedRoute>} />
            <Route path="/test-firebase" element={<TestFirebase />} />
            <Route path="/dashboard-admin" element={<ProtectedRoute allowedRoles={["admin"]}><DashboardAdmin /></ProtectedRoute>} />
            <Route path="/dashboard-sales" element={<ProtectedRoute allowedRoles={["sales"]}><DashboardSales /></ProtectedRoute>} />
            <Route path="/progress-project" element={<ProtectedRoute allowedRoles={["admin", "sales"]}><ProgressProject /></ProtectedRoute>} />
            <Route path="/project-form" element={<ProtectedRoute allowedRoles={["admin"]}><ProjectForm /></ProtectedRoute>} />
            <Route path="/business-development" element={<ProtectedRoute allowedRoles={["admin"]}><BusinessDevelopment /></ProtectedRoute>} />
            <Route path="/business-development/new" element={<ProtectedRoute allowedRoles={["admin"]}><BusinessDevelopmentForm /></ProtectedRoute>} />
            <Route path="/incident" element={<ProtectedRoute allowedRoles={["admin", "sales"]}><IncidentManagement /></ProtectedRoute>} />
            <Route path="/incident/form" element={<ProtectedRoute allowedRoles={["admin", "sales"]}><IncidentFrom /></ProtectedRoute>} />
            <Route path="/" element={<RoleBasedRedirect />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

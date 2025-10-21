import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children, allowedRoles = [] }) {
  const { currentUser, userRole } = useAuth();
  console.log('ProtectedRoute:', { currentUser, userRole, allowedRoles });

  // Tunggu userRole tidak null sebelum render/redirect
  if (!currentUser || userRole === null) {
    return null; // Bisa diganti dengan spinner/loading jika mau
  }

  if (allowedRoles.length === 0) {
    return children;
  }

  if (!allowedRoles.includes(userRole)) {
    if (userRole === 'admin') {
      return <Navigate to="/dashboard-admin" replace />;
    } else if (userRole === 'sales') {
      return <Navigate to="/dashboard-sales" replace />;
    } else {
      return <Navigate to="/login" replace />;
    }
  }

  return children;
}

export default ProtectedRoute;
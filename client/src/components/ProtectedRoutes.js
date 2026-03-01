import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRole }) => {
  const location = useLocation();

  // 1. Get the role directly (since that's what we saved in Login.js)
  const userRole = localStorage.getItem('role');
  const token = localStorage.getItem('token');

  // 2. If no token or no role, they aren't logged in
  if (!token || !userRole) {
    console.warn("No session found. Redirecting to home.");
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // 3. Check for role mismatch
  // We normalize both to lowercase to prevent "Student" vs "student" errors
  const currentUserRole = userRole.toLowerCase();
  const requiredRole = allowedRole.toLowerCase();

  if (currentUserRole !== requiredRole) {
    console.warn(`Access denied. Role: ${currentUserRole}, Required: ${requiredRole}`);
    return <Navigate to="/" replace />;
  }

  // 4. If all checks pass, show the dashboard!
  return children;
};

export default ProtectedRoute;
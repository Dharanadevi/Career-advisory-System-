import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRole }) => {
  const location = useLocation();

  // 1. Retrieve and Clean the data
  const rawRole = localStorage.getItem('role');
  const token = localStorage.getItem('token');

  // Helper to safely parse role in case it was stored with JSON.stringify
  const getCleanRole = (role) => {
    if (!role) return "";
    try {
      // If the role has extra quotes (from JSON.stringify), this removes them
      return JSON.parse(role).toLowerCase();
    } catch (e) {
      // If it's just a normal string, just lowercase it
      return role.toLowerCase();
    }
  };

  const userRole = getCleanRole(rawRole);
  const requiredRole = allowedRole ? allowedRole.toLowerCase() : "";

  // 2. Authentication Check
  if (!token || !userRole) {
    console.warn("No session found. Redirecting to home.");
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // 3. Role Authorization Check
  if (userRole !== requiredRole) {
    console.warn(`Access Denied. Have: [${userRole}], Need: [${requiredRole}]`);
    
    // Redirect to a neutral page if they are logged in but just in the wrong place
    return <Navigate to="/" replace />;
  }

  // 4. Authorized Access
  return children;
};

export default ProtectedRoute;
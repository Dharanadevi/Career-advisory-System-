import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRole }) => {
  // 1. Get user data from localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  // 2. DEBUG: See what is happening in your console (F12)
  console.log("Current User:", user);
  console.log("Required Role:", allowedRole);

  // 3. If no user is logged in
  if (!user || !user.role) {
    console.warn("Access Denied: No user found in localStorage.");
    return <Navigate to="/" replace />;
  }

  // 4. Case-insensitive Role Check
  // This ensures 'Student' matches 'student'
  if (user.role.toLowerCase() !== allowedRole.toLowerCase()) {
    console.error(`Access Denied: Role Mismatch. User is ${user.role}, but needs ${allowedRole}`);
    return <Navigate to="/" replace />;
  }

  // 5. If everything is correct, show the page
  return children;
};

export default ProtectedRoute;
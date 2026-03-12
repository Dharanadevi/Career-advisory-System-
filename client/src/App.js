import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// 1. Import Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoutes';

// 2. Import pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import StaffDashboard from './pages/StaffDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminJobPost from './pages/AdminJobPost';

// --- THE 3-STEP WORKFLOW PAGES --- 
import ViewProfile from './pages/ViewProfile';         
import StudentDashboard from './pages/StudentDashboard'; 
import StudentIdentity from './pages/StudentIdentity';

// 3. Global Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Sample Data for Testing
const sampleUsers = [
  { id: 1, name: "Boss", role: "Staff", email: "boss3059@gmail.com" },
  { id: 2, name: "MD", role: "Admin", email: "md2705Q@gmail.edu" },
  { id: 3, name: "Dharana", role: "Student", email: "dharanadevi2705@gmail.edu" },
];

const sampleAppliedJobs = [
  { id: 1, title: "Software Engineer Intern", company: "Tech Corp", status: "Under Review" },
];

function App() {
  return (
    <Router>
      <div className="App d-flex flex-column min-vh-100 dark-theme-base">
        {/* Global Attractive Background Mesh */}
        <style>{`
          .dark-theme-base {
            background-color: #020617;
            background-image: 
              radial-gradient(at 0% 0%, rgba(14, 165, 233, 0.1) 0, transparent 50%), 
              radial-gradient(at 100% 100%, rgba(99, 102, 241, 0.1) 0, transparent 50%);
            position: relative;
          }
          /* Custom Scrollbar for the whole App to match Glassmorphism */
          ::-webkit-scrollbar { width: 8px; }
          ::-webkit-scrollbar-track { background: #020617; }
          ::-webkit-scrollbar-thumb { 
            background: rgba(14, 165, 233, 0.3); 
            border-radius: 10px; 
          }
          ::-webkit-scrollbar-thumb:hover { background: rgba(14, 165, 233, 0.5); }
        `}</style>

        <Navbar />
        
        <main className="flex-grow-1">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login/:role" element={<Login />} />

            {/* --- STUDENT WORKFLOW ROUTES --- */}
            
            {/* 1. The Form (Identity) */}
            <Route 
              path="/student-identity" 
              element={
                <ProtectedRoute allowedRole="student">
                  <div className="animate-in">
                    <StudentIdentity />
                  </div>
                </ProtectedRoute>
              } 
            />

            {/* 2. The Display (ViewProfile) */}
            <Route 
              path="/view-profile" 
              element={
                <ProtectedRoute allowedRole="student">
                   <div className="animate-in">
                    <ViewProfile />
                  </div>
                </ProtectedRoute>
              } 
            />

            {/* 3. The final dashboard with recommendations */}
            <Route 
              path="/student-dashboard" 
              element={
                <ProtectedRoute allowedRole="student">
                   <div className="animate-in">
                    <StudentDashboard appliedJobs={sampleAppliedJobs} />
                  </div>
                </ProtectedRoute>
              } 
            />

            {/* --- STAFF DASHBOARD --- */}
            <Route path="/staff-dashboard" element={
              <ProtectedRoute allowedRole="staff">
                <StaffDashboard />
              </ProtectedRoute>
            } />
            
            {/* --- ADMIN DASHBOARD & JOB POSTING --- */}
            <Route path="/admin-dashboard" element={
              <ProtectedRoute allowedRole="admin">
                <AdminDashboard users={sampleUsers} />
              </ProtectedRoute>
            } />

            <Route path="/admin/post-job" element={
              <ProtectedRoute allowedRole="admin">
                <AdminJobPost />
              </ProtectedRoute>
            } />

            {/* Redirect unknown URLs to Home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
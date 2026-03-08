import React from 'react';
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

// --- NEW WORKFLOW PAGES ---
import StudentIdentity from './pages/StudentIdentity'; // Stage 1
import ProfileView from './pages/ProfileView';         // Stage 2
import StudentDashboard from './pages/StudentDashboard'; // Stage 3

// 3. Global Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// --- DATA SECTION ---
const sampleUsers = [
  { id: 1, name: "Jane Smith", role: "Staff", email: "jane@company.com" },
  { id: 2, name: "John Doe", role: "Student", email: "john@university.edu" },
  { id: 3, name: "Alice Johnson", role: "Admin", email: "alice@admin.com" },
];

const sampleAppliedJobs = [
  { id: 1, title: "Software Engineer Intern", company: "Tech Corp", status: "Under Review" },
  { id: 2, title: "Data Analyst Intern", company: "Data Inc.", status: "Interview Scheduled" },
];

function App() {
  return (
    <Router>
      <div className="App d-flex flex-column min-vh-100">
        <Navbar />
        
        <main className="flex-grow-1">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login/:role" element={<Login />} />

            {/* --- NEW STUDENT WORKFLOW --- */}
            
            {/* STAGE 1: ENTER DETAILS */}
            <Route 
              path="/student-identity" 
              element={
                <ProtectedRoute allowedRole="student">
                  <StudentIdentity />
                </ProtectedRoute>
              } 
            />

            {/* STAGE 2: DISPLAY DATA (VERIFICATION) */}
            <Route 
              path="/view-profile" 
              element={
                <ProtectedRoute allowedRole="student">
                  <ProfileView />
                </ProtectedRoute>
              } 
            />

            {/* STAGE 3: FINAL DASHBOARD */}
            <Route 
              path="/student-dashboard" 
              element={
                <ProtectedRoute allowedRole="student">
                  <StudentDashboard appliedJobs={sampleAppliedJobs} />
                </ProtectedRoute>
              } 
            />

            {/* --- END STUDENT WORKFLOW --- */}

            {/* Protected Staff Route */}
            <Route 
              path="/staff-dashboard" 
              element={
                <ProtectedRoute allowedRole="staff">
                  <div className="container mt-5">
                    <h2 className='fw-bold mb-4 logo-place'>Staff Dashboard</h2>
                    <StaffDashboard />
                  </div>
                </ProtectedRoute>
              } 
            />

            {/* Protected Admin Route */}
            <Route 
              path="/admin-dashboard" 
              element={
                <ProtectedRoute allowedRole="admin">
                  <AdminDashboard users={sampleUsers} />
                </ProtectedRoute>
              } 
            />

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

//
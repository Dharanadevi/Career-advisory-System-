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
import StudentDashboard from './pages/StudentDashboard';
import StaffDashboard from './pages/StaffDashboard';
import AdminDashboard from './pages/AdminDashboard';

// 3. Global Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './components/Navbar.js';
import './components/Footer.js';
import'./App.css';

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

            {/* Protected Student Route */}
            <Route 
              path="/student-dashboard" 
              element={
                <ProtectedRoute allowedRole="student">
                  <StudentDashboard appliedJobs={sampleAppliedJobs} />
                </ProtectedRoute>
              } 
            />

            {/* Protected Staff Route */}
            <Route 
              path="/staff-dashboard" 
              element={
                <ProtectedRoute allowedRole="staff">

                  <div className = "container mt-5">
                    <h2 className='fw-bold mb-4'>Staff Dashboard</h2>
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
            <Route path="/staff-dashboard" element={<Navigate to="/admin-dashboard" />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
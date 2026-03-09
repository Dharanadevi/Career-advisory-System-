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

// --- THE 3-STEP WORKFLOW PAGES ---
import StudentIdentity from './pages/StudentIdentity'; // Stage 1 (The Form)
import ProfileView from './pages/ProfileView';         // Stage 2 (The Display)
import StudentDashboard from './pages/StudentDashboard'; // Stage 3 (The Dashboard)

// 3. Global Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const sampleUsers = [
  { id: 1, name: "Jane Smith", role: "Staff", email: "jane@company.com" },
  { id: 2, name: "John Doe", role: "Student", email: "john@university.edu" },
];

const sampleAppliedJobs = [
  { id: 1, title: "Software Engineer Intern", company: "Tech Corp", status: "Under Review" },
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

            {/* --- STUDENT WORKFLOW ROUTES --- */}
            
            {/* 1. This is where the student fills the form */}
            <Route 
              path="/student-identity" 
              element={
                <ProtectedRoute allowedRole="student">
                  <StudentIdentity />
                </ProtectedRoute>
              } 
            />

            {/* 2. This is where the student goes after clicking SAVE */}
            <Route 
              path="/view-profile" 
              element={
                <ProtectedRoute allowedRole="student">
                  <ProfileView />
                </ProtectedRoute>
              } 
            />

            {/* 3. The final dashboard */}
            <Route 
              path="/student-dashboard" 
              element={
                <ProtectedRoute allowedRole="student">
                  <StudentDashboard appliedJobs={sampleAppliedJobs} />
                </ProtectedRoute>
              } 
            />

            {/* --- OTHER DASHBOARDS --- */}
            <Route path="/staff-dashboard" element={
              <ProtectedRoute allowedRole="staff"><StaffDashboard /></ProtectedRoute>
            } />
            
            <Route path="/admin-dashboard" element={
              <ProtectedRoute allowedRole="admin"><AdminDashboard users={sampleUsers} /></ProtectedRoute>
            } />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
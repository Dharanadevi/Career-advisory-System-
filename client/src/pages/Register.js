import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// FIX: Removed 'UserInfo' (doesn't exist) and 'Briefcase' (unused)
import { UserPlus, ArrowLeft } from 'lucide-react'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registering:", formData);
    localStorage.setItem('user', JSON.stringify(formData));
    
    // Redirect logic
    if (formData.role === 'staff') {
      navigate('/staff-dashboard');
    } else {
      navigate('/student-dashboard');
    }
  };

  return (
    <div className="container-fluid bg-light min-vh-100 d-flex align-items-center justify-content-center py-5">
      <div className="card shadow-lg border-0 rounded-4" style={{ width: '100%', maxWidth: '450px' }}>
        <div className="card-body p-5">
          
          <button onClick={() => navigate('/')} className="btn btn-link text-decoration-none p-0 mb-4 d-flex align-items-center gap-1">
            <ArrowLeft size={16} /> Back to Home
          </button>

          <div className="text-center mb-4">
            <div className="bg-primary text-white d-inline-block p-3 rounded-circle mb-3">
              <UserPlus size={30} />
            </div>
            <h2 className="fw-bold">Create Account</h2>
            <p className="text-muted">Join the PlaceMe Portal</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Full Name</label>
              <input 
                type="text" 
                name="name"
                className="form-control form-control-lg bg-light border-0 shadow-sm" 
                placeholder="John Doe" 
                required 
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Email Address</label>
              <input 
                type="email" 
                name="email"
                className="form-control form-control-lg bg-light border-0 shadow-sm" 
                placeholder="name@example.com" 
                required 
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Role</label>
              <select 
                name="role"
                className="form-select form-select-lg bg-light border-0 shadow-sm"
                onChange={handleChange}
                value={formData.role}
              >
                <option value="student">Student</option>
                <option value="staff">Staff</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Password</label>
              <input 
                type="password" 
                name="password"
                className="form-control form-control-lg bg-light border-0 shadow-sm" 
                placeholder="••••••••" 
                required 
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-lg w-100 rounded-pill shadow-sm mb-3 py-3 fw-bold">
              Sign Up
            </button>
          </form>

          <div className="text-center mt-3">
            <span className="text-muted">Already have an account? </span>
            <button onClick={() => navigate('/')} className="btn btn-link p-0 fw-bold text-decoration-none">Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
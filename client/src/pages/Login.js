import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiLock, FiMail, FiCheckCircle, FiArrowRight } from 'react-icons/fi';

const Login = () => {
  // Default to student, but we expect 'admin' or 'student' from the URL
  const { role = 'student' } = useParams();
  const navigate = useNavigate();
  
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    // 1. Normalize the role (ensures 'Staff' becomes 'admin' if needed)
    const assignedRole = role.toLowerCase() === 'staff' ? 'admin' : role.toLowerCase();

    // 2. Save credentials to localStorage
    // We save 'user' as an object so the Dashboard can parse it safely
    localStorage.setItem('role', assignedRole);
    localStorage.setItem('user', JSON.stringify({ 
      email: email,
      role: assignedRole,
      loginTime: new Date().getTime()
    }));
    localStorage.setItem('token', 'mock_token_123');

    setIsSuccess(true);
  };

  return (
    <div className="login-container d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <div className="login-glass-card p-5 shadow-lg text-center" style={{ borderRadius: '20px', background: 'white', maxWidth: '400px', width: '100%' }}>
        
        {!isSuccess ? (
          <>
            <div className="text-center mb-4">
              {/* Badge turns Red for Admin, Blue for others */}
              <div className={`badge mb-2 p-2 px-3 rounded-pill ${role.toLowerCase() === 'admin' ? 'bg-danger' : 'bg-primary'}`}>
                {role.toUpperCase()}
              </div>
              <h2 className="fw-bold text-dark">Welcome Back</h2>
              <p className="text-muted small">Enter your {role} credentials</p>
            </div>

            <form onSubmit={handleLogin}>
              <div className="mb-3 input-group">
                <span className="input-group-text bg-light border-0">
                  <FiMail className="text-muted" />
                </span>
                <input 
                  type="email" 
                  className="form-control bg-light border-0 shadow-none" 
                  placeholder="Email Address" 
                  required 
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-4 input-group">
                <span className="input-group-text bg-light border-0">
                  <FiLock className="text-muted" />
                </span>
                <input 
                  type="password" 
                  className="form-control bg-light border-0 shadow-none" 
                  placeholder="Password" 
                  required 
                />
              </div>

              <button type="submit" className="btn btn-primary w-100 rounded-pill py-2 fw-bold shadow">
                Login as {role.charAt(0).toUpperCase() + role.slice(1)}
              </button>
            </form>
          </>
        ) : (
          <div className="animate__animated animate__zoomIn">
            <FiCheckCircle size={60} className="text-success mb-3" />
            <h2 className="fw-bold text-dark">Success!</h2>
            <p className="text-muted mb-4">You are logged in as <strong>{role}</strong>.</p>
            
            <button 
              onClick={() => navigate(`/${role.toLowerCase() === 'staff' ? 'admin' : role.toLowerCase()}-dashboard`)} 
              className="btn btn-success btn-lg w-100 rounded-pill d-flex align-items-center justify-content-center gap-2"
            >
              Go to Dashboard <FiArrowRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
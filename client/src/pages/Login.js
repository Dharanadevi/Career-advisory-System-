import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiArrowLeft, FiUser, FiBriefcase, FiShield } from 'react-icons/fi';

const Login = () => {
  const { role } = useParams(); 
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // UI Configuration based on the role in the URL
  const currentRole = {
    student: { title: 'Student', icon: <FiUser />, color: '#0ea5e9' },
    staff: { title: 'Staff', icon: <FiBriefcase />, color: '#a855f7' },
    admin: { title: 'Admin', icon: <FiShield />, color: '#f43f5e' }
  }[role?.toLowerCase()] || { title: 'User', icon: <FiUser />, color: '#0ea5e9' };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 1. Prepare User Data (Normalized to lowercase for ProtectedRoute)
    const userData = {
      email: email,
      role: role.toLowerCase(), 
      loggedIn: true
    };

    // 2. SAVE TO LOCAL STORAGE (This acts as the "Key" for the Guard)
    localStorage.setItem('user', JSON.stringify(userData));
    console.log("User saved to storage:", userData);

    // 3. NAVIGATE BASED ON ROLE
    // We send students to 'student-identity' first to fill their profile
    if (role.toLowerCase() === 'student') {
      navigate('/student-identity');
    } else if (role.toLowerCase() === 'staff') {
      navigate('/staff-dashboard');
    } else if (role.toLowerCase() === 'admin') {
      navigate('/admin-dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background Glow Effect */}
      <div style={{ 
        position: 'absolute', 
        top: '20%', 
        left: '50%', 
        transform: 'translateX(-50%)', 
        width: '400px', 
        height: '400px', 
        background: `radial-gradient(circle, ${currentRole.color}33 0%, transparent 70%)`,
        zIndex: 1 
      }}></div>
      
      <div className="container" style={{ maxWidth: '450px', zIndex: 2 }}>
        {/* Back Link */}
        <button onClick={() => navigate('/')} className="btn text-white mb-4 d-flex align-items-center gap-2 border-0 p-0 shadow-none opacity-75">
          <FiArrowLeft /> <span style={{ fontWeight: '500' }}>Back to Home</span>
        </button>

        <div className="p-5 shadow-lg text-white" style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(15px)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="text-center mb-5">
            <div className="d-inline-block p-3 rounded-circle mb-3" style={{ backgroundColor: `${currentRole.color}22`, color: currentRole.color }}>
              {React.cloneElement(currentRole.icon, { size: 32 })}
            </div>
            <h2 className="fw-bold">{currentRole.title} Login</h2>
            <p className="small opacity-50">Career Portal Authentication</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4 text-start">
              <label className="small mb-2 fw-bold opacity-75">Email Address</label>
              <div className="position-relative">
                <FiMail className="position-absolute mt-3 ms-3 opacity-50" />
                <input 
                  type="email" 
                  required 
                  className="form-control ps-5 text-white bg-dark border-secondary" 
                  placeholder="name@university.edu" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </div>
            </div>

            <div className="mb-5 text-start">
              <label className="small mb-2 fw-bold opacity-75">Password</label>
              <div className="position-relative">
                <FiLock className="position-absolute mt-3 ms-3 opacity-50" />
                <input 
                  type="password" 
                  required 
                  className="form-control ps-5 text-white bg-dark border-secondary" 
                  placeholder="••••••••" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                />
              </div>
            </div>

            <button type="submit" className="btn w-100 py-3 fw-bold text-white shadow-lg" style={{ backgroundColor: currentRole.color, borderRadius: '12px' }}>
              Sign In to Dashboard
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
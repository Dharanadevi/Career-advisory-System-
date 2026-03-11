import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiArrowRight, FiBriefcase, FiShield } from 'react-icons/fi';

const Register = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('student');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: '100px 20px' }}>
      {/* Background Glow */}
      <div className="bg-glow-spot" style={{ bottom: '10%', right: '10%', opacity: 0.4 }}></div>
      
      <div className="glass-card p-5 shadow-2xl" style={{ maxWidth: '550px', width: '100%', zIndex: 2 }}>
        <div className="text-center mb-5">
          <h2 className="fw-bold text-white mb-2">Create Account</h2>
          <p className="small" style={{ color: '#cbd5e1' }}>Join the Career Portal and start your journey.</p>
        </div>

        {/* Role Selector Tabs */}
        <div className="d-flex p-1 mb-5 rounded-4" style={{ background: 'rgb(195, 201, 203)', border: '1px solid var(--glass-border)' }}>
          {['student', 'staff', 'admin'].map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`flex-grow-1 py-2 rounded-3 border-0 transition-all ${role === r ? 'btn-primary-glow text-white' : 'text-muted bg-transparent'}`}
              style={{ textTransform: 'capitalize', fontSize: '0.9rem', fontWeight: '600' }}
            >
              {r}
            </button>
          ))}
        </div>

        <form>
          <div className="row">
            <div className="col-md-12 mb-4">
              <label className="small mb-2 text-white opacity-75">Full Name</label>
              <div className="position-relative">
                <FiUser className="position-absolute mt-3 ms-3 text-muted" />
                <input type="text" name="name" className="form-control ps-5" placeholder="Dharanadevi" onChange={handleChange} />
              </div>
            </div>

            <div className="col-md-12 mb-4">
              <label className="small mb-2 text-white opacity-75">Email Address</label>
              <div className="position-relative">
                <FiMail className="position-absolute mt-3 ms-3 text-muted" />
                <input type="email" name="email" className="form-control ps-5" placeholder="name@university.edu" onChange={handleChange} />
              </div>
            </div>

            <div className="col-md-6 mb-4">
              <label className="small mb-2 text-white opacity-75">Password</label>
              <div className="position-relative">
                <FiLock className="position-absolute mt-3 ms-3 text-muted" />
                <input type="password" name="password" className="form-control ps-5" placeholder="••••••••" onChange={handleChange} />
              </div>
            </div>

            <div className="col-md-6 mb-5">
              <label className="small mb-2 text-white opacity-75">Confirm Password</label>
              <div className="position-relative">
                <FiLock className="position-absolute mt-3 ms-3 text-muted" />
                <input type="password" name="confirmPassword" className="form-control ps-5" placeholder="••••••••" onChange={handleChange} />
              </div>
            </div>
          </div>

          <button type="submit" className="btn-primary-glow w-100 py-3 border-0 fs-6 fw-bold mb-4">
            Register as {role.charAt(0).toUpperCase() + role.slice(1)} <FiArrowRight className="ms-2" />
          </button>

          <div className="text-center">
            <p className="small" style={{ color: '#cbd5e1' }}>
              Already have an account?{' '}
              <span onClick={() => navigate(`/login/${role}`)} style={{ color: '#ffffff', cursor: 'pointer', fontWeight: '700', textDecoration: 'underline' }}>
                Sign In
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
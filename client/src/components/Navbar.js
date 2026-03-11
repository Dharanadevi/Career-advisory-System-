import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut, FiUser, FiZap } from 'react-icons/fi';

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top" style={{ 
      background: 'rgba(15, 23, 42, 0.8)', 
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '15px 0'
    }}>
      <div className="container">
        {/* Brand Logo */}
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/" style={{ fontSize: '1.5rem' }}>
          <FiZap className="me-2" color="#0ea5e9" />
          <span style={{ color: '#ec2d9c' }}>Place</span>
          <br></br>
          <span style={{ color: '#2eb2e1' }}>ME</span>
        </Link>

        <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon" style={{ filter: 'invert(1)' }}></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-2">
            {!isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white opacity-75-hover px-3" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link btn-primary-glow ms-lg-3 px-4 py-2" to="/register" style={{ borderRadius: '10px', fontSize: '0.9rem' }}>
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <span className="nav-link text-white-50 small me-3">
                    Logged in as <strong className="text-white">{userRole}</strong>
                  </span>
                </li>
                <li className="nav-item">
                  <button onClick={handleLogout} className="btn btn-outline-danger d-flex align-items-center gap-2" style={{ borderRadius: '10px' }}>
                    <FiLogOut size={18} /> Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      <style>{`
        .opacity-75-hover { 
          transition: all 0.3s ease; 
          font-weight: 500;
        }
        .opacity-75-hover:hover { 
          opacity: 1 !important; 
          color: #9e298a !important;
          transform: translateY(-2px);
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
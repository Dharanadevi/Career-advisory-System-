import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiHome, FiUser, FiShield, FiLogOut, FiActivity, FiBell } from 'react-icons/fi';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <div className="navbar-wrapper fixed-top w-100 d-flex justify-content-center p-3">
      <nav className={`navbar navbar-expand-lg transition-all`} 
        style={{ 
          width: scrolled ? '95%' : '90%',
          maxWidth: '1200px',
          borderRadius: '24px',
          background: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: scrolled ? '0 15px 40px rgba(0,0,0,0.5)' : '0 8px 32px rgba(0,0,0,0.3)',
          padding: '0.7rem 1.2rem',
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
        
        <style>{`
          .logo-pill {
            background: linear-gradient(-45deg, #0ea5e9, #a855f7, #6366f1);
            background-size: 200% 200%;
            padding: 8px 18px;
            border-radius: 16px;
            color: white;
            text-decoration: none;
          }

          .nav-action-btn {
            border-radius: 14px;
            padding: 10px 18px;
            margin: 0 4px;
            font-weight: 700;
            font-size: 0.85rem;
            display: flex;
            align-items: center;
            gap: 10px;
            transition: 0.4s ease;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.05);
            color: rgba(255, 255, 255, 0.7) !important;
            text-decoration: none;
          }

          .nav-action-btn:hover {
            background: rgba(255, 255, 255, 0.08);
            color: #fff !important;
            transform: translateY(-3px);
            border-color: rgba(14, 165, 233, 0.4);
          }

          .nav-action-btn.active {
            background: linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(14, 165, 233, 0.2) 100%);
            color: #fff !important;
            border: 1px solid #0ea5e9;
            box-shadow: 0 0 15px rgba(14, 165, 233, 0.3);
          }

          .icon-bg {
            background: rgba(255, 255, 255, 0.05);
            padding: 6px;
            border-radius: 10px;
            display: flex;
          }

          .special-logout {
            background: linear-gradient(45deg, #f43f5e, #fb7185) !important;
            color: white !important;
            border: none !important;
          }

          .admin-login-highlight {
             border: 1px solid rgba(168, 85, 247, 0.3) !important;
             color: #a855f7 !important;
          }
        `}</style>

        <div className="container-fluid px-0">
          <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
            <div className="logo-pill d-flex align-items-center gap-2">
              <FiActivity size={22} />
              <span className="fw-black fs-4 mb-0" style={{ letterSpacing: '-0.5px' }}>PLACE ME</span>
            </div>
          </Link>
          
          <button className="navbar-toggler border-0 shadow-none text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto gap-1 align-items-center mt-3 mt-lg-0">
              
              <li className="nav-item">
                <Link className={`nav-action-btn ${isActive('/') ? 'active' : ''}`} to="/">
                  <div className="icon-bg"><FiHome size={18} /></div> Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className={`nav-action-btn ${isActive('/student/dashboard') ? 'active' : ''}`} to="/student/dashboard">
                  <div className="icon-bg"><FiUser size={18} /></div> Student
                </Link>
              </li>

              {/* Admin Button directly routes to login */}
              <li className="nav-item">
                <Link className={`nav-action-btn admin-login-highlight ${isActive('/admin/login') ? 'active' : ''}`} to="/admin/login">
                  <div className="icon-bg"><FiShield size={18} /></div> Admin
                </Link>
              </li>

              <li className="nav-item d-none d-lg-block mx-2">
                <div className="nav-action-btn" style={{ padding: '10px', borderRadius: '50%' }}>
                  <FiBell size={20} className="text-info" />
                </div>
              </li>

              <li className="nav-item ms-lg-2">
                <button 
                  onClick={() => navigate('/')} 
                  className="nav-action-btn special-logout fw-bold"
                >
                  <FiLogOut size={18} /> Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
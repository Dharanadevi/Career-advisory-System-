import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiLogOut, FiHome, FiUserPlus, FiLogIn, FiArrowLeft } from 'react-icons/fi';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isLoginPage = location.pathname.includes('/login');
  const isDashboard = location.pathname.includes('dashboard');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const styles = {
    nav: {
      // Midnight dark background
      backgroundColor: scrolled ? 'rgba(15, 23, 42, 0.95)' : 'rgba(15, 23, 42, 0.8)', 
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      transition: 'all 0.4s ease',
      padding: scrolled ? '10px 0' : '18px 0',
    },
    brand: {
      fontSize: '1.6rem',
      fontWeight: '900',
      textDecoration: 'none',
      letterSpacing: '1px',
      textTransform: 'uppercase'
    },
    // Your custom colors
    placeText: {
      color: '#0ea5e9', // Sky Blue
    },
    meText: {
      color: '#d946ef', // Vibrant Pink/Purple
      textShadow: scrolled ? 'none' : '0 0 10px rgba(217, 70, 239, 0.5)'
    },
    btnMain: {
      backgroundColor: '#0ea5e9',
      color: '#ffffff',
      border: 'none',
      borderRadius: '12px',
      padding: '8px 22px',
      fontWeight: '700',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(14, 165, 233, 0.3)'
    },
    btnGhost: {
      color: '#f8fafc',
      textDecoration: 'none',
      fontWeight: '600',
      padding: '8px 16px',
      borderRadius: '10px',
      transition: '0.3s'
    }
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top" style={styles.nav}>
      <div className="container">
        <Link className="d-flex align-items-center" to="/" style={styles.brand}>
          <FiHome className="me-2" style={{color: '#0ea5e9'}} />
          <span style={styles.placeText}>PLACE</span>
          <span style={styles.meText}>ME</span>
        </Link>

        <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon" style={{ filter: 'invert(1)' }}></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-3 mt-lg-0 mt-3">
            
            {isDashboard ? (
              <li className="nav-item">
                <button onClick={handleLogout} className="btn d-flex align-items-center gap-2" style={styles.btnMain}>
                  <FiLogOut /> Logout
                </button>
              </li>
            ) : isLoginPage ? (
              <li className="nav-item">
                <Link to="/" className="d-flex align-items-center gap-2" style={styles.btnGhost}>
                  <FiArrowLeft /> Back
                </Link>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/register" style={styles.btnGhost} 
                    onMouseEnter={(e) => e.target.style.color = '#d946ef'}
                    onMouseLeave={(e) => e.target.style.color = '#f8fafc'}>
                    <FiUserPlus className="me-1" /> Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/login/student" className="d-flex align-items-center gap-2" style={styles.btnMain}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#d946ef'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#0ea5e9'}>
                    <FiLogIn size={18} /> Sign In
                  </Link>
                </li>
              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
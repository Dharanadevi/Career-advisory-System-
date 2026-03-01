import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiLogOut, FiUser, FiHome } from 'react-icons/fi';


const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check which page we are currently on
  const isLoginPage = location.pathname === '/login' || location.pathname.includes('/login/');
  const isDashboard = location.pathname.includes('dashboard');

  const handleLogout = () => {
    localStorage.clear(); // Remove role and token
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
          <FiHome className="me-2" />🚀 PLACE ME
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            
            {/* 1. If we are on the Dashboard -> Show Logout */}
            {isDashboard ? (
              <li className="nav-item">
                <button onClick={handleLogout} className="btn btn-light rounded-pill px-4 btn-sm fw-bold text-primary">
                  <FiLogOut className="me-1" /> Logout
                </button>
              </li>
            ) : isLoginPage ? (
              /* 2. If we are on the Login Page -> Show nothing or just a 'Back to Home' */
              <li className="nav-item">
                <Link className="btn btn-outline-dark rounded-pill px-4 btn-sw fw-bold" to="/">Back to Home</Link>
              </li>
            ) : (
              /* 3. Default (Home Page) -> Show Login & Register */
              <>
                
                <li className="nav-item">
                  <Link className="btn btn-outline-light rounded-pill px-4 btn-sm fw-bold" to="/register">
                    Register
                  </Link>
                </li>
                
                <li className = "nav-item">
                  <Link className= "btn btn-outline-dark rounded-pill px-4 btn-sm fw-bold" to = "/login/student"> Login</Link>
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
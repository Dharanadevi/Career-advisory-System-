import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const Home = () => {
  return (
    <div className="container mt-5 text-center">
      <h1 className="display-4 fw-bold"> 🎓Welcome to Career Portal</h1>
      <p className="lead text-muted">Your future starts here. Choose your path to continue.</p>
      
      <div className="d-flex justify-content-center gap-3 mt-4">
        <Link to="/login/student" className="btn btn-primary btn-lg rounded-pill px-4">
          Student Login <FiArrowRight />
        </Link>
        <Link to="/login/staff" className="btn btn-outline-dark btn-lg rounded-pill px-4">
          Staff Login
        </Link>
         <Link to="/login/staff" className="btn btn-outline-dark btn-lg rounded-pill px-4">
          Admin Login
        </Link>
      </div>
    </div>
  );
};

export default Home;
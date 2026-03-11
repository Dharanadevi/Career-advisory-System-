import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiUser, FiShield, FiBriefcase, FiZap, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { Typewriter } from 'react-simple-typewriter';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: 'var(--bg-main)', position: 'relative', overflow: 'hidden', minHeight: '100vh' }}>
      {/* Background Glows */}
      <div className="bg-glow-spot" style={{ top: '10%', left: '50%', transform: 'translateX(-50%)', opacity: 0.6 }}></div>

      {/* 1. HERO SECTION */}
      <section className="py-5" style={{ minHeight: '75vh', display: 'flex', alignItems: 'center' }}>
        <div className="container mt-5 text-center">
          <div className="row justify-content-center">
            <div className="col-lg-10 text-white"> {/* Set hero text to white */}
              <div className="glass-card d-inline-flex align-items-center px-4 py-2 mb-4">
                <FiZap className="me-2" color="var(--accent-sky)" />
                <span style={{ fontSize: '0.8rem', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase' }}>
                  PLACEMENT SEASON 2026
                </span>
              </div>
              
              <h1 className="display-1 fw-bold mb-4" style={{ letterSpacing: '-3px', lineHeight: '1.1' }}>
                🎓 Welcome to  
                <span style={{ background: 'linear-gradient(90deg, #0ea5e9, #a855f7, #f43f5e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {" "}Career Portal
                </span>
              </h1>
              
              <div className="lead mb-5 opacity-75 mx-auto" style={{ maxWidth: '700px' }}>
                <h4 className="text-white">Your journey to professional success starts here. We bridge the gap between 
                top-tier talent and industry leaders</h4>
                <span style={{ color: 'var(--accent-sky)', fontWeight: '600', fontSize: '1.5rem' }}>
                   <Typewriter
                    words={[' Intelligently.', ' Faster.', ' With Purpose.']}
                    loop={0}
                    cursor
                    typeSpeed={70}
                    deleteSpeed={50}
                  />
                </span>
              </div>

              <div className="d-flex justify-content-center">
                <button 
                  onClick={() => navigate('/register')} 
                  className="btn-primary-glow border-0 px-5 py-3 fs-5 text-white fw-bold"
                >
                  Get Started <FiArrowRight className="ms-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PORTAL SELECTION */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-5 text-white">Access Your <span style={{color: 'var(--accent-sky)'}}>Portal</span></h2>
          <div className="row g-4 justify-content-center">
            
            {/* Student Card */}
            <div className="col-md-4">
              <div className="glass-card p-5 h-100 text-center" onClick={() => navigate('/login/student')} style={{ cursor: 'pointer', transition: 'transform 0.3s ease' }}>
                <div className="mb-4 d-inline-block p-3 rounded-4" style={{ background: 'rgba(14, 165, 233, 0.2)', border: '1px solid rgba(14, 165, 233, 0.3)' }}>
                  <FiUser size={40} color="#0ea5e9" />
                </div>
                <h4 className="fw-bold mb-3 text-white">Student</h4>
                <p className="small text-white opacity-75">Manage your identity, upload resumes, and apply for jobs.</p>
              </div>
            </div>

            {/* Staff Card */}
            <div className="col-md-4">
              <div className="glass-card p-5 h-100 text-center" onClick={() => navigate('/login/staff')} style={{ cursor: 'pointer', transition: 'transform 0.3s ease' }}>
                <div className="mb-4 d-inline-block p-3 rounded-4" style={{ background: 'rgba(168, 85, 247, 0.2)', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
                  <FiBriefcase size={40} color="#a855f7" />
                </div>
                <h4 className="fw-bold mb-3 text-white">Staff</h4>
                <p className="small text-white opacity-75">Verify student details and shortlist candidates for drives.</p>
              </div>
            </div>

            {/* Admin Card */}
            <div className="col-md-4">
              <div className="glass-card p-5 h-100 text-center" onClick={() => navigate('/login/admin')} style={{ cursor: 'pointer', transition: 'transform 0.3s ease' }}>
                <div className="mb-4 d-inline-block p-3 rounded-4" style={{ background: 'rgba(244, 63, 94, 0.2)', border: '1px solid rgba(244, 63, 94, 0.3)' }}>
                  <FiShield size={40} color="#f43f5e" />
                </div>
                <h4 className="fw-bold mb-3 text-white">Admin</h4>
                <p className="small text-white opacity-75">Oversee system health, user roles, and platform settings.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. FOOTER */}
      <footer className="mt-5 py-5 border-top border-secondary border-opacity-10" style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)' }}>
        <div className="container text-white">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <h4 className="fw-bold mb-1">Career <span style={{color: 'var(--accent-sky)'}}>Portal</span></h4>
              <p className="opacity-50 small">© 2026 Developed by Dharanadevi. All rights reserved.</p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <div className="d-flex justify-content-center justify-content-md-end gap-4">
                <a href="#" className="text-white opacity-75 opacity-100-hover"><FiLinkedin size={24} /></a>
                <a href="#" className="text-white opacity-75 opacity-100-hover"><FiGithub size={24} /></a>
                <a href="mailto:contact@example.com" className="text-white opacity-75 opacity-100-hover"><FiMail size={24} /></a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        .glass-card:hover { transform: translateY(-10px); }
        .opacity-100-hover:hover { opacity: 1 !important; transform: scale(1.1); transition: 0.3s; }
      `}</style>
    </div>
  );
};

export default Home;
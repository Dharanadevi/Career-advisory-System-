import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiUser, FiShield, FiBriefcase, FiZap, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { Typewriter } from 'react-simple-typewriter';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ 
      backgroundColor: '#0f172a', 
      color: '#ffffff',
      position: 'relative', 
      overflowX: 'hidden', 
      minHeight: '100vh' 
    }}>
      {/* Background Glow */}
      <div style={{ 
        position: 'absolute',
        top: '10%', 
        left: '50%', 
        transform: 'translateX(-50%)', 
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, rgba(15, 23, 42, 0) 70%)',
        filter: 'blur(60px)',
        zIndex: 0
      }}></div>

      {/* 1. HERO SECTION - Reduced minHeight from 80vh to 60vh */}
      <section className="pt-5 pb-4" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', position: 'relative', zIndex: 1 }}>
        <div className="container text-center">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="glass-card d-inline-flex align-items-center px-4 py-2 mb-4" style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '50px'
              }}>
                <FiZap className="me-2" color="#0ea5e9" />
                <span style={{ fontSize: '0.75rem', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase' }}>
                  PLACEMENT SEASON 2026
                </span>
              </div>
              
              <h1 className="display-3 fw-bold mb-3" style={{ letterSpacing: '-2px', lineHeight: '1.1' }}>
                🎓 Welcome to <br/>
                <span style={{ background: 'linear-gradient(90deg, #0ea5e9, #a855f7, #f43f5e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Career Advisory Portal
                </span>
              </h1>
              
              <div className="lead mb-4 opacity-75 mx-auto" style={{ maxWidth: '800px' }}>
                <h4 className="text-white fw-light mb-2">
                  Bridging the gap between talent and industry leaders
                </h4>
                <div style={{ color: '#0ea5e9', fontWeight: '600', fontSize: '1.4rem', height: '35px' }}>
                  <Typewriter
                    words={['Intelligently.', 'Faster.', 'With Purpose.']}
                    loop={0}
                    cursor
                    cursorStyle="_"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1500}
                  />
                </div>
              </div>

              <div className="d-flex justify-content-center">
                <button 
                  onClick={() => navigate('/register')} 
                  className="btn px-5 py-3 fs-5 text-white fw-bold shadow-lg transition-all"
                  style={{ 
                    background: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)',
                    border: 'none',
                    borderRadius: '12px'
                  }}
                >
                  Get Started <FiArrowRight className="ms-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PORTAL SELECTION - Adjusted py-5 to py-2 to bring it closer */}
      <section className="py-2" style={{ position: 'relative', zIndex: 1 }}>
        <div className="container">
          <h2 className="text-center fw-bold mb-4">Access Your <span style={{color: '#0ea5e9'}}>Portal</span></h2>
          <div className="row g-4 justify-content-center">
            
            {[
              { title: 'Student', icon: <FiUser size={32} color="#0ea5e9" />, text: 'Manage identity and apply for jobs.', route: '/login/student', color: 'rgba(14, 165, 233, 0.1)' },
              { title: 'Staff', icon: <FiBriefcase size={32} color="#a855f7" />, text: 'Verify students and shortlist candidates.', route: '/login/staff', color: 'rgba(168, 85, 247, 0.1)' },
              { title: 'Admin', icon: <FiShield size={32} color="#f43f5e" />, text: 'Oversee system and platform settings.', route: '/login/admin', color: 'rgba(244, 63, 94, 0.1)' }
            ].map((portal, idx) => (
              <div className="col-md-4" key={idx}>
                <div 
                  className="glass-card p-4 h-100 text-center transition-all" 
                  onClick={() => navigate(portal.route)} 
                  style={{ 
                    cursor: 'pointer',
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '24px'
                  }}
                >
                  <div className="mb-3 d-inline-block p-3 rounded-4" style={{ background: portal.color }}>
                    {portal.icon}
                  </div>
                  <h5 className="fw-bold mb-2">{portal.title}</h5>
                  <p className="small opacity-75 mb-0">{portal.text}</p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* 3. FOOTER */}
      <footer className="mt-5 py-4 border-top border-secondary border-opacity-10" style={{ backgroundColor: 'rgba(15, 23, 42, 0.8)' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <h5 className="fw-bold mb-1">Career <span style={{color: '#0ea5e9'}}>Portal</span></h5>
              <p className="opacity-50 small mb-0">© 2026 Developed by Dharanadevi.</p>
            </div>
            <div className="col-md-6 text-center text-md-end mt-3 mt-md-0">
              <div className="d-flex justify-content-center justify-content-md-end gap-3">
                <a href="#" className="text-white opacity-50 transition-all hover-opacity-100"><FiLinkedin size={20} /></a>
                <a href="#" className="text-white opacity-50 transition-all hover-opacity-100"><FiGithub size={20} /></a>
                <a href="#" className="text-white opacity-50 transition-all hover-opacity-100"><FiMail size={20} /></a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        .transition-all { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .glass-card:hover { 
          transform: translateY(-8px); 
          background: rgba(255, 255, 255, 0.07) !important;
          border-color: rgba(14, 165, 233, 0.4) !important;
        }
        .hover-opacity-100:hover { opacity: 1 !important; transform: scale(1.1); }
      `}</style>
    </div>
  );
};

export default Home;
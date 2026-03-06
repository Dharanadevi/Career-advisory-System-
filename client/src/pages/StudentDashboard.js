import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiUser, FiAward, FiPlus, FiX, FiGithub, FiLinkedin, 
  FiMail, FiActivity, FiStar, FiPercent, FiAlertCircle 
} from 'react-icons/fi';

const StudentDashboard = () => {
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: '', department: '', university: '', email: '', 
    regNumber: '', cgpa: '', backlogs: '0',
    github: '', linkedin: '', skills: [], certificates: [],
    currentSkill: '', currentCert: ''
  });

  // --- STYLING CONSTANTS ---
  const glassStyle = {
    background: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
  };

  if (!isProfileComplete) {
    return (
      <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center p-4" 
           style={{ 
             background: "linear-gradient(135deg, #667eea 0%, #8920b0 100%)",
             fontFamily: "'Poppins', sans-serif" 
           }}>
        
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="card rounded-5 overflow-hidden border-0"
          style={{ maxWidth: '1000px', width: '100%', ...glassStyle }}
        >
          <div className="row g-0">
            {/* VIBRANT SIDEBAR */}
            <div className="col-lg-4 p-5 text-white d-flex flex-column justify-content-between" 
                 style={{ background: "linear-gradient(180deg, #4facfe 0%, #00f2fe 100%)" }}>
              <div>
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="mb-4 d-inline-block"
                >
                  <FiStar size={40} className="text-warning" />
                </motion.div>
                <h2 className="fw-bold">Level Up Your Future.</h2>
                <p className="opacity-75">Your academic data powers our AI matching engine. Make it count.</p>
              </div>
              <div className="mt-5">
                <div className="d-flex align-items-center mb-3">
                  <FiActivity className="me-2"/> <small>Real-time skill verification</small>
                </div>
                <div className="d-flex align-items-center">
                  <FiAward className="me-2"/> <small>Verified Certificate Vault</small>
                </div>
              </div>
            </div>

            {/* INTERACTIVE FORM */}
            <div className="col-lg-8 p-4 p-md-5">
              <header className="mb-4">
                <h3 className="fw-bold text-dark">Build Your <span className="text-primary">Career Identity</span></h3>
                <div className="progress mt-2" style={{ height: '5px', borderRadius: '10px' }}>
                  <div className="progress-bar bg-primary w-75 progress-bar-striped progress-bar-animated"></div>
                </div>
              </header>
              
              <div className="row g-4">
                {/* Academic Metrics Group */}
                <div className="col-md-7">
                  <div className="form-floating mb-3">
                    <input className="form-control rounded-4 border-0 shadow-sm" style={{backgroundColor: '#f8f9ff'}} placeholder="Full Name" onChange={e => setProfileData({...profileData, fullName: e.target.value})} />
                    <label className="text-muted"><FiUser className="me-2"/>Full Name</label>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="form-floating mb-3">
                    <input className="form-control rounded-4 border-0 shadow-sm" style={{backgroundColor: '#f8f9ff'}} placeholder="Reg No" onChange={e => setProfileData({...profileData, regNumber: e.target.value})} />
                    <label className="text-muted">Register Number</label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="p-3 rounded-4 shadow-sm text-center" style={{ background: '#e0f2fe' }}>
                    <label className="small fw-bold text-primary mb-1"><FiPercent className="me-1"/> CGPA</label>
                    <input type="number" className="form-control bg-transparent border-0 text-center fw-bold h4 mb-0" placeholder="0.0" onChange={e => setProfileData({...profileData, cgpa: e.target.value})} />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3 rounded-4 shadow-sm text-center" style={{ background: '#fef2f2' }}>
                    <label className="small fw-bold text-danger mb-1"><FiAlertCircle className="me-1"/> Backlogs</label>
                    <input type="number" className="form-control bg-transparent border-0 text-center fw-bold h4 mb-0" placeholder="0" onChange={e => setProfileData({...profileData, backlogs: e.target.value})} />
                  </div>
                </div>
                <div className="col-md-4">
                   <div className="p-3 rounded-4 shadow-sm text-center" style={{ background: '#f0fdf4' }}>
                    <label className="small fw-bold text-success mb-1">Status</label>
                    <div className="h4 mb-0 fw-bold text-success pt-2">Active</div>
                  </div>
                </div>

                {/* Certificates (Colorful Tags) */}
                <div className="col-12">
                  <label className="fw-bold text-dark small mb-2">ADD CERTIFICATES</label>
                  <div className="d-flex gap-2">
                    <input className="form-control rounded-pill border-0 shadow-sm px-4" style={{backgroundColor: '#f8f9ff'}} placeholder="Google UX Design, AWS Cloud..." value={profileData.currentCert} onChange={e => setProfileData({...profileData, currentCert: e.target.value})} />
                    <button className="btn btn-primary rounded-circle shadow" onClick={() => profileData.currentCert && setProfileData({...profileData, certificates: [...profileData.certificates, profileData.currentCert], currentCert: ''})}><FiPlus/></button>
                  </div>
                  <div className="mt-3 d-flex flex-wrap gap-2">
                    <AnimatePresence>
                      {profileData.certificates.map((c, i) => (
                        <motion.span 
                          initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                          key={i} className="badge p-2 px-3 rounded-pill d-flex align-items-center"
                          style={{ background: 'linear-gradient(90deg, #667eea 0%, #a58ebb 100%)' }}
                        >
                          <FiAward className="me-2"/>{c} <FiX className="ms-2 cursor-pointer" onClick={() => setProfileData({...profileData, certificates: profileData.certificates.filter((_, idx) => idx !== i)})}/>
                        </motion.span>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Socials */}
                <div className="col-md-6">
                  <div className="input-group">
                    <span className="input-group-text bg-white border-0 shadow-sm rounded-start-4"><FiGithub className="text-dark"/></span>
                    <input className="form-control border-0 shadow-sm rounded-end-4" placeholder="Github URL" onChange={e => setProfileData({...profileData, github: e.target.value})} />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="input-group">
                    <span className="input-group-text bg-white border-0 shadow-sm rounded-start-4"><FiLinkedin className="text-primary"/></span>
                    <input className="form-control border-0 shadow-sm rounded-end-4" placeholder="LinkedIn URL" onChange={e => setProfileData({...profileData, linkedin: e.target.value})} />
                  </div>
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
                whileTap={{ scale: 0.95 }}
                className="btn w-100 rounded-pill mt-5 py-3 fw-bold text-white shadow-lg"
                style={{ background: "linear-gradient(90deg, #279fa1 0%, #fc00ff 100%)" }}
                onClick={() => setIsProfileComplete(true)}
              >
                GENERATE PROFESSIONAL IDENTITY
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return <div className="p-5"><h1>Welcome to the Grid!</h1></div>;
};

export default StudentDashboard;
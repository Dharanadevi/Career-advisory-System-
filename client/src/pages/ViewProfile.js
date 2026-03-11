import React from 'react';
import { FiDownload, FiEdit3, FiMail, FiMapPin, FiAward, FiCode, FiCpu } from 'react-icons/fi';

const ViewProfile = () => {
  // Mock data - in a real app, this comes from your backend/context
  const student = {
    name: "Dharanadevi",
    regNo: "717821CS001",
    email: "dharana@university.edu",
    department: "Computer Science & Engineering",
    cgpa: "8.92",
    skills: ["React.js", "Node.js", "Express", "MongoDB", "Bootstrap", "REST APIs"],
    location: "Coimbatore, TN"
  };

  return (
    <div className="container py-5" style={{ minHeight: '100vh', marginTop: '80px' }}>
      <div className="row justify-content-center">
        <div className="col-lg-10">
          
          {/* 1. Header Card (Profile Summary) */}
          <div className="glass-card p-5 mb-4 position-relative overflow-hidden">
            {/* Background Accent */}
            <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: 'var(--accent-sky)', opacity: 0.1, borderRadius: '50%', filter: 'blur(50px)' }}></div>

            <div className="row align-items-center position-relative">
              <div className="col-md-2 text-center text-md-start mb-4 mb-md-0">
                <div className="rounded-circle d-inline-flex align-items-center justify-content-center shadow-lg" 
                     style={{ width: '120px', height: '120px', background: 'linear-gradient(135deg, #0ea5e9, #a855f7)', fontSize: '3rem', color: '#fff', fontWeight: 'bold' }}>
                  {student.name.charAt(0)}
                </div>
              </div>
              <div className="col-md-7 text-center text-md-start">
                <h1 className="fw-bold text-white mb-2">{student.name}</h1>
                <p className="text-white-50 d-flex align-items-center justify-content-center justify-content-md-start gap-3">
                  <span><FiCpu className="me-1" /> {student.department}</span>
                  <span><FiMapPin className="me-1" /> {student.location}</span>
                </p>
                <div className="d-flex flex-wrap gap-2 justify-content-center justify-content-md-start mt-3">
                   <span className="badge rounded-pill px-3 py-2" style={{ background: 'rgba(14, 165, 233, 0.1)', color: '#0ea5e9', border: '1px solid rgba(14, 165, 233, 0.2)' }}>
                     Reg: {student.regNo}
                   </span>
                </div>
              </div>
              <div className="col-md-3 text-center text-md-end mt-4 mt-md-0">
                <button className="btn-primary-glow border-0 px-4 py-2 w-100 mb-2">
                  <FiDownload className="me-2" /> Download CV
                </button>
                <button className="btn btn-outline-light w-100 opacity-75" style={{ borderRadius: '10px' }}>
                  <FiEdit3 className="me-2" /> Edit Profile
                </button>
              </div>
            </div>
          </div>

          {/* 2. Detailed Stats Grid */}
          <div className="row g-4">
            {/* Academic Performance */}
            <div className="col-md-4">
              <div className="glass-card p-4 h-100 border-0" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)' }}>
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div className="p-2 rounded-3" style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#a855f7' }}>
                    <FiAward size={24} />
                  </div>
                  <h5 className="mb-0 text-white">Academics</h5>
                </div>
                <div className="text-center py-3">
                  <h2 className="display-4 fw-bold text-white mb-0">{student.cgpa}</h2>
                  <p className="small text-muted text-uppercase tracking-widest">Cumulative GPA</p>
                </div>
              </div>
            </div>

            {/* Technical Skills */}
            <div className="col-md-8">
              <div className="glass-card p-4 h-100">
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div className="p-2 rounded-3" style={{ background: 'rgba(14, 165, 233, 0.15)', color: '#0ea5e9' }}>
                    <FiCode size={24} />
                  </div>
                  <h5 className="mb-0 text-white">Technical Expertise</h5>
                </div>
                <div className="d-flex flex-wrap gap-2">
                  {student.skills.map((skill, index) => (
                    <div key={index} className="px-3 py-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: '#cbd5e1', fontSize: '0.9rem' }}>
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="col-md-12">
              <div className="glass-card p-4 d-flex flex-wrap justify-content-between align-items-center gap-3">
                <div className="d-flex align-items-center gap-3">
                  <FiMail color="#94a3b8" />
                  <span style={{ color: '#cbd5e1' }}>{student.email}</span>
                </div>
                <div className="text-muted small">
                  Last updated: March 2026
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
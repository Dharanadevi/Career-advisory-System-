import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  FiArrowLeft, FiCheckCircle, FiGithub, 
  FiCpu, FiUser, FiAward, FiFileText, FiDownloadCloud 
} from 'react-icons/fi';

const ProfileView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extracting the data passed via the "Move" logic
  const { studentData, fileName } = location.state || {};

  // If someone tries to access this page without filling the form first
  if (!studentData) {
    return (
      <div className="text-center py-5" style={{ color: '#fff', marginTop: '100px' }}>
        <h3>No Profile Data Found</h3>
        <button className="btn btn-info mt-3" onClick={() => navigate('/student-identity')}>
          Go to Identity Form
        </button>
      </div>
    );
  }

  const colors = {
    bg: '#0f172a',
    cardBg: '#1e293b',
    sky: '#0ea5e9',
    pink: '#d946ef',
    success: '#22c55e',
    textMuted: '#94a3b8'
  };

  return (
    <div style={{ backgroundColor: colors.bg, minHeight: '100vh', padding: '100px 20px' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        
        {/* Header Navigation */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <button className="btn btn-outline-light btn-sm px-3" onClick={() => navigate(-1)}>
            <FiArrowLeft className="me-2" /> Edit Info
          </button>
          <div className="badge border border-success text-success px-3 py-2 rounded-pill">
            <FiCheckCircle className="me-2" /> Profile Identity Verified
          </div>
        </div>

        {/* Main Profile Card */}
        <div className="card border-0 p-4 shadow-lg" style={{ backgroundColor: colors.cardBg, borderRadius: '24px', color: '#fff' }}>
          
          <div className="text-center mb-4">
            <div className="mb-3 mx-auto" style={{ width: '100px', height: '100px', borderRadius: '50%', border: `3px solid ${colors.sky}`, padding: '5px' }}>
              <img 
                src={`https://ui-avatars.com/api/?name=${studentData.firstName}&background=0ea5e9&color=fff&size=128`} 
                alt="Avatar" className="rounded-circle w-100 h-100" 
              />
            </div>
            <h2 className="fw-bold mb-1">{studentData.firstName} {studentData.lastName || ''}</h2>
            <p style={{ color: colors.textMuted }}>ID: {studentData.regNo}</p>
          </div>

          <hr style={{ borderColor: 'rgba(255,255,255,0.1)' }} />

          <div className="row g-4 mt-2">
            {/* Academic Section */}
            <div className="col-md-6">
              <h6 style={{ color: colors.sky }}><FiAward className="me-2" /> Academic Score</h6>
              <div className="p-3 rounded-4 mt-2" style={{ backgroundColor: 'rgba(14, 165, 233, 0.1)', border: '1px solid rgba(14, 165, 233, 0.2)' }}>
                <h3 className="mb-0 fw-bold">{studentData.cgpa} <small className="fs-6 fw-normal">CGPA</small></h3>
              </div>
            </div>

            {/* Resume Section */}
            <div className="col-md-6">
              <h6 style={{ color: colors.pink }}><FiFileText className="me-2" /> Attached Document</h6>
              <div className="p-3 rounded-4 mt-2 d-flex align-items-center justify-content-between" style={{ backgroundColor: 'rgba(217, 70, 239, 0.1)', border: '1px solid rgba(217, 70, 239, 0.2)' }}>
                <span className="text-truncate me-2" style={{ fontSize: '0.85rem' }}>{fileName}</span>
                <FiDownloadCloud style={{ color: colors.pink }} />
              </div>
            </div>

            {/* Skills Section */}
            <div className="col-12 mt-4">
              <h6 style={{ color: colors.sky }}><FiCpu className="me-2" /> Tech Stack & Skills</h6>
              <div className="d-flex flex-wrap gap-2 mt-2">
                {studentData.skills ? studentData.skills.split(',').map((skill, index) => (
                  <span key={index} className="badge bg-dark border border-secondary px-3 py-2 rounded-pill">
                    {skill.trim()}
                  </span>
                )) : <span className="text-muted">No skills listed</span>}
              </div>
            </div>

            {/* GitHub Section */}
            {studentData.github && (
              <div className="col-12 mt-3 text-center">
                <a href={studentData.github} target="_blank" rel="noreferrer" className="text-decoration-none" style={{ color: colors.textMuted }}>
                  <FiGithub className="me-2" /> View GitHub Repository
                </a>
              </div>
            )}
          </div>

          <button 
            className="btn w-100 mt-5 py-3 fw-bold text-white rounded-4 shadow"
            style={{ background: `linear-gradient(90deg, ${colors.sky}, ${colors.pink})`, border: 'none' }}
            onClick={() => navigate('/student-dashboard')}
          >
            CONFIRM & PROCEED TO DASHBOARD
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
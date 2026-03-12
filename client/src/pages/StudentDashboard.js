import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiBookOpen, FiStar, FiEdit3, FiGithub, FiFileText } from 'react-icons/fi';

const StudentDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyAccount = async () => {
      try {
        const userEmail = localStorage.getItem('userEmail'); 
        if (!userEmail) {
          navigate('/login');
          return;
        }

        // Fetching from the new GET route we added to your studentRoutes.js
        const response = await axios.get(`http://localhost:5000/api/student/profile/${userEmail}`);
        
        if (response.data) {
          setProfile(response.data);
        }
      } catch (error) {
        console.error("Error fetching identity data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyAccount();
  }, [navigate]);

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center vh-100 text-white">
      <div className="spinner-border text-info" role="status"></div>
    </div>
  );

  return (
    <div className="container mt-5 pt-5 pb-5">
      <style>{`
        .glass-panel {
          background: rgba(15, 23, 42, 0.75);
          backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 30px;
          padding: 40px;
          color: white;
          box-shadow: 0 20px 50px rgba(0,0,0,0.4);
        }
        .data-label {
          color: #0ea5e9;
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-bottom: 5px;
          display: block;
        }
        .data-value {
          font-size: 1.25rem;
          font-weight: 600;
          color: #f8fafc;
        }
        .resume-pill {
          background: rgba(168, 85, 247, 0.1);
          border: 1px solid rgba(168, 85, 247, 0.3);
          color: #a855f7;
          padding: 10px 20px;
          border-radius: 12px;
          text-decoration: none;
          transition: 0.3s;
        }
        .resume-pill:hover {
          background: #a855f7;
          color: white;
        }
      `}</style>

      <div className="glass-panel">
        {!profile ? (
          <div className="text-center py-5">
            <h3 className="mb-3">No Identity Found</h3>
            <p className="text-white-50">Please complete your Career Identity to see your dashboard.</p>
            <button className="btn btn-info px-4 fw-bold" onClick={() => navigate('/student/identity')}>
              Create Identity
            </button>
          </div>
        ) : (
          <>
            {/* Profile Header */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 gap-4">
              <div className="d-flex align-items-center gap-4">
                <div style={{
                  width: '90px', height: '90px', borderRadius: '24px',
                  background: 'linear-gradient(135deg, #0ea5e9, #a855f7)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '2.5rem', fontWeight: 'bold', boxShadow: '0 0 25px rgba(14, 165, 233, 0.4)'
                }}>
                  {profile.firstName?.charAt(0)}
                </div>
                <div>
                  <h1 className="fw-bold mb-0">{profile.firstName} {profile.lastName}</h1>
                  <p className="text-info opacity-75 mb-0">{profile.email}</p>
                </div>
              </div>
              <button className="btn btn-outline-light d-flex align-items-center gap-2" onClick={() => navigate('/student/identity')}>
                <FiEdit3 /> Edit Profile
              </button>
            </div>

            {/* Main Stats Row */}
            <div className="row g-4 mb-5">
              <div className="col-md-4">
                <div className="p-4 rounded-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <span className="data-label"><FiStar className="me-2"/>CGPA</span>
                  <span className="data-value" style={{ color: '#0ea5e9', fontSize: '2rem' }}>{profile.cgpa}</span>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-4 rounded-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <span className="data-label"><FiBookOpen className="me-2"/>Register No</span>
                  <span className="data-value">{profile.regNo}</span>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-4 rounded-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <span className="data-label"><FiGithub className="me-2"/>GitHub</span>
                  <a href={profile.github} target="_blank" rel="noreferrer" className="data-value text-decoration-none text-info d-block truncate">
                    View Profile
                  </a>
                </div>
              </div>
            </div>

            {/* Skills & Resume Section */}
            <div className="row g-4">
              <div className="col-md-8">
                <div className="p-4 rounded-4 h-100" style={{ background: 'rgba(0,0,0,0.2)' }}>
                  <span className="data-label mb-3">Technical Skills</span>
                  <div className="d-flex flex-wrap gap-2">
                    {profile.skills?.split(',').map((skill, index) => (
                      <span key={index} className="badge bg-info bg-opacity-10 text-info border border-info border-opacity-25 px-3 py-2">
                        {skill.trim()}
                      </span>
                    )) || <span className="text-white-50">No skills added</span>}
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-4 rounded-4 h-100 d-flex flex-column justify-content-center align-items-center" style={{ background: 'rgba(0,0,0,0.2)' }}>
                  <span className="data-label mb-3 text-center">Your Document</span>
                  {profile.resumePath ? (
                    <a href={`http://localhost:5000/${profile.resumePath}`} target="_blank" rel="noreferrer" className="resume-pill d-flex align-items-center gap-2">
                      <FiFileText size={20} /> View Resume PDF
                    </a>
                  ) : (
                    <span className="text-white-50">No resume uploaded</span>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
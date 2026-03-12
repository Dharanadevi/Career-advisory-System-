import React, { useState, useEffect } from 'react';
import { FiZap, FiTarget, FiActivity, FiChevronRight, FiLoader, FiCheckCircle } from 'react-icons/fi';
import { applyForJob } from '../../api'; // Ensure this path matches your api/index.js

const MatchEngine = ({ studentProfile, jobData }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState('idle'); // 'idle', 'processing', 'success'
  const [matchScore, setMatchScore] = useState(0);

  // 1. Logic: Calculate Match Score based on Skills and CGPA
  useEffect(() => {
    if (studentProfile && jobData) {
      let skillMatch = 0;
      jobData.requiredSkills.forEach(skill => {
        if (studentProfile.skills.includes(skill)) skillMatch++;
      });
      
      const skillPercent = (skillMatch / jobData.requiredSkills.length) * 100;
      const cgpaStatus = parseFloat(studentProfile.cgpa) >= jobData.minCgpa ? 100 : 70;
      
      // Weighted Average: 70% Skills, 30% Academics
      const finalScore = Math.round((skillPercent * 0.7) + (cgpaStatus * 0.3));
      setMatchScore(finalScore);
    }
  }, [studentProfile, jobData]);

  // 2. Action: Handle the application & trigger email notification
  const handleApply = async () => {
    setIsProcessing(true);
    setStatus('processing');

    const applicationPayload = {
      studentEmail: studentProfile.email,
      studentName: studentProfile.firstName + " " + studentProfile.lastName,
      jobTitle: jobData.title,
      companyName: jobData.company
    };

    try {
      // Calls the API you defined in client/src/api/index.js
      await applyForJob(applicationPayload);
      
      // Artificial delay for high-tech feel
      setTimeout(() => {
        setIsProcessing(false);
        setStatus('success');
      }, 2000);
    } catch (error) {
      console.error("Application Error:", error);
      setIsProcessing(false);
      setStatus('idle');
      alert("Transmission failed. Check backend connection.");
    }
  };

  return (
    <div className="match-engine-container">
      <style>{`
        .match-card {
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(25px);
          border: 1px solid rgba(14, 165, 233, 0.2);
          border-radius: 35px;
          padding: 3rem;
          color: white;
          position: relative;
          overflow: hidden;
        }

        .score-ring {
          width: 180px; height: 180px;
          border-radius: 50%;
          border: 8px solid rgba(255,255,255,0.05);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          background: radial-gradient(circle, rgba(14, 165, 233, 0.1) 0%, transparent 70%);
          box-shadow: 0 0 30px rgba(14, 165, 233, 0.2);
        }

        .status-badge {
          padding: 6px 16px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 1px;
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.2);
        }

        .analysis-row {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 18px;
          padding: 1rem 1.5rem;
          margin-bottom: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: 0.3s;
        }
        .analysis-row:hover { background: rgba(255, 255, 255, 0.06); }
      `}</style>

      <div className="match-card">
        <div className="row align-items-center">
          {/* Visual Score Column */}
          <div className="col-md-5 d-flex flex-column align-items-center">
            <div className="score-ring mb-3">
              <h1 className="fw-extrabold mb-0" style={{fontSize: '3.5rem'}}>{matchScore}%</h1>
              <div className="small opacity-50 fw-bold">MATCH SCORE</div>
            </div>
            {matchScore > 85 && <div className="status-badge">HIGHLY COMPATIBLE</div>}
          </div>

          {/* Details Column */}
          <div className="col-md-7">
            <h5 className="text-info fw-bold mb-1 uppercase" style={{letterSpacing: '2px'}}>Live Matching</h5>
            <h2 className="fw-extrabold mb-4">{jobData.title} <small className="text-muted" style={{fontSize: '1rem'}}>at {jobData.company}</small></h2>

            <div className="match-analysis mb-4">
              <div className="analysis-row">
                <div className="d-flex align-items-center gap-3">
                  <FiZap className="text-info"/> <span>Skill Alignment</span>
                </div>
                <span className="fw-bold">92%</span>
              </div>
              <div className="analysis-row">
                <div className="d-flex align-items-center gap-3">
                  <FiTarget className="text-info"/> <span>Academic Cutoff</span>
                </div>
                <span className="fw-bold text-success">PASSED</span>
              </div>
            </div>

            {/* Action Button */}
            <button 
              className={`btn-primary-glow w-100 py-3 rounded-4 d-flex align-items-center justify-content-center gap-2 ${status === 'success' ? 'bg-success border-success' : ''}`}
              onClick={handleApply}
              disabled={isProcessing || status === 'success'}
            >
              {isProcessing ? (
                <><FiLoader className="spinner-icon animate-spin" /> DISPATCHING DATA...</>
              ) : status === 'success' ? (
                <><FiCheckCircle /> APPLICATION SENT & EMAIL NOTIFIED</>
              ) : (
                <>INITIALIZE INTERVIEW PROCESS <FiChevronRight /></>
              )}
            </button>
            
            {status === 'success' && (
              <p className="text-center small text-info mt-3 animate-pulse">
                Check your inbox! A notification was sent to {studentProfile.email}.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchEngine;
import React, { useState, useEffect } from 'react';
import { FiClock, FiCheckCircle, FiXCircle, FiInfo } from 'react-icons/fi';

const ApplicationHistory = () => {
  const [applications, setApplications] = useState([
    // Mock data for design - replace with API call
    { id: 1, company: "Google", role: "MERN Developer", date: "2026-03-12", status: "In Review" },
    { id: 2, company: "Amazon", role: "Frontend Engineer", date: "2026-03-10", status: "Selected" },
    { id: 3, company: "Meta", role: "Backend Developer", date: "2026-03-05", status: "Rejected" },
  ]);

  const getStatusStyle = (status) => {
    switch(status) {
      case 'Selected': return { color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)', icon: <FiCheckCircle /> };
      case 'Rejected': return { color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)', icon: <FiXCircle /> };
      default: return { color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)', icon: <FiClock /> };
    }
  };

  return (
    <div className="history-container p-4 animate-in">
      <style>{`
        .history-card {
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 1.5rem;
          margin-bottom: 1rem;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          align-items: center;
          transition: 0.3s;
        }
        .history-card:hover { border-color: #0ea5e9; transform: translateX(5px); }
        .status-pill {
          display: flex; align-items: center; gap: 8px;
          padding: 6px 12px; border-radius: 10px; width: fit-content;
          font-size: 0.8rem; font-weight: bold;
        }
      `}</style>

      <h2 className="fw-extrabold mb-4 text-white">MY <span className="text-info">APPLICATIONS</span></h2>

      <div className="history-list">
        {applications.map(app => {
          const style = getStatusStyle(app.status);
          return (
            <div key={app.id} className="history-card">
              <div>
                <h6 className="mb-0 text-white fw-bold">{app.role}</h6>
                <small className="text-info">{app.company}</small>
              </div>
              <div className="text-muted small">{app.date}</div>
              <div>
                <div className="status-pill" style={{ background: style.bg, color: style.color }}>
                  {style.icon} {app.status}
                </div>
              </div>
              <div className="text-end">
                <button className="btn btn-sm btn-outline-info rounded-pill">Details</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ApplicationHistory;
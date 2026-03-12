import React, { useState } from 'react';
import { 
  FiSearch, FiFilter, FiDownload, FiEye, 
  FiTrendingUp, FiUsers, FiCheckCircle, FiActivity 
} from 'react-icons/fi';

const StaffDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock student data for the grid
  const students = [
    { id: 1, name: "Dharanadevi", dept: "CSE", cgpa: "8.92", skills: ["React", "Node"], score: 98 },
    { id: 2, name: "Arun Kumar", dept: "ECE", cgpa: "8.45", skills: ["Python", "AWS"], score: 85 },
    { id: 3, name: "Priya S.", dept: "IT", cgpa: "9.10", skills: ["Java", "SQL"], score: 92 },
  ];

  return (
    <div className="dashboard-wrapper animate-in">
      <style>{`
        .dashboard-wrapper { padding: 2rem; color: white; }
        
        /* Stats Header */
        .stat-card-mini {
          background: rgba(15, 23, 42, 0.5);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 25px; padding: 1.5rem;
          display: flex; align-items: center; gap: 1.2rem;
          transition: 0.3s;
        }
        .stat-card-mini:hover { border-color: #0ea5e9; transform: translateY(-5px); }
        .icon-box-blue { background: rgba(14, 165, 233, 0.1); color: #0ea5e9; padding: 12px; border-radius: 15px; }

        /* Control Bar */
        .control-bar {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 25px; padding: 1rem 2rem;
          margin: 2rem 0; display: flex; align-items: center; gap: 1.5rem;
        }

        .search-input-glass {
          background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1);
          border-radius: 15px; padding: 10px 15px 10px 45px; color: white; width: 300px;
        }

        /* The Talent Grid */
        .talent-row {
          background: rgba(15, 23, 42, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px; padding: 1.2rem; margin-bottom: 1rem;
          display: grid; grid-template-columns: 2fr 1fr 1fr 2fr 1fr 1fr;
          align-items: center; transition: 0.3s;
        }
        .talent-row:hover { 
          background: rgba(14, 165, 233, 0.05); 
          border-color: rgba(14, 165, 233, 0.3);
          transform: scale(1.01); 
        }

        .score-pill {
          background: rgba(16, 185, 129, 0.1); color: #10b981;
          padding: 4px 12px; border-radius: 10px; font-weight: 800; font-size: 0.8rem;
        }
      `}</style>

      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h2 className="fw-extrabold mb-1">PLACEMENT <span className="text-info">COMMAND</span></h2>
          <p className="text-muted small">Tracking 1,240 potential candidates for the 2026 drive.</p>
        </div>
        <button className="btn-primary-glow d-flex align-items-center gap-2">
          <FiDownload /> EXPORT MASTER LIST
        </button>
      </div>

      {/* Quick Stats */}
      <div className="row g-4">
        <div className="col-md-3">
          <div className="stat-card-mini">
            <div className="icon-box-blue"><FiUsers size={24}/></div>
            <div><div className="small opacity-50">Students</div><h4 className="fw-bold mb-0">1,240</h4></div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card-mini">
            <div className="icon-box-blue" style={{color: '#10b981', background: 'rgba(16, 185, 129, 0.1)'}}><FiCheckCircle size={24}/></div>
            <div><div className="small opacity-50">Verified</div><h4 className="fw-bold mb-0">890</h4></div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card-mini">
            <div className="icon-box-blue" style={{color: '#f59e0b', background: 'rgba(245, 158, 11, 0.1)'}}><FiActivity size={24}/></div>
            <div><div className="small opacity-50">Pending</div><h4 className="fw-bold mb-0">350</h4></div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card-mini">
            <div className="icon-box-blue" style={{color: '#6366f1', background: 'rgba(99, 102, 241, 0.1)'}}><FiTrendingUp size={24}/></div>
            <div><div className="small opacity-50">Avg Score</div><h4 className="fw-bold mb-0">84%</h4></div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="control-bar">
        <div className="position-relative">
          <FiSearch className="position-absolute mt-3 ms-3 text-muted" />
          <input 
            type="text" 
            className="search-input-glass" 
            placeholder="Search by name or skill..." 
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="btn btn-outline-secondary rounded-pill px-4 small d-flex align-items-center gap-2">
          <FiFilter /> Filters
        </button>
      </div>

      {/* Talent Grid Header */}
      <div className="px-4 mb-3 small fw-bold text-muted d-grid" style={{gridTemplateColumns: '2fr 1fr 1fr 2fr 1fr 1fr'}}>
        <div>CANDIDATE</div>
        <div>DEPT</div>
        <div>CGPA</div>
        <div>TOP SKILLS</div>
        <div>MATCH</div>
        <div>ACTION</div>
      </div>

      {/* Talent Rows */}
      {students.map(student => (
        <div key={student.id} className="talent-row">
          <div className="fw-bold d-flex align-items-center gap-3">
             <div className="rounded-circle bg-info" style={{width:'8px', height:'8px'}}></div>
             {student.name}
          </div>
          <div className="text-muted">{student.dept}</div>
          <div className="fw-bold text-info">{student.cgpa}</div>
          <div className="d-flex gap-1">
            {student.skills.map((s, i) => <span key={i} className="badge bg-dark border border-secondary">{s}</span>)}
          </div>
          <div><span className="score-pill">{student.score}%</span></div>
          <div>
            <button className="btn btn-link text-info p-0"><FiEye size={18}/></button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StaffDashboard;
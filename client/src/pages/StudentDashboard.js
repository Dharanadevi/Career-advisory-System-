import React from 'react';
import { FiBriefcase, FiClock, FiCheckCircle } from 'react-icons/fi';

const StudentDashboard = ({ appliedJobs = [] }) => {
  const styles = {
    wrapper: { minHeight: '100vh', backgroundColor: '#0f172a', padding: '80px 20px', color: '#f8fafc' },
    container: { maxWidth: '900px', margin: '0 auto' },
    table: { backgroundColor: '#1e293b', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden' }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h2 className="mb-4">Student <span style={{color: '#0ea5e9'}}>Dashboard</span></h2>
        <div className="row g-3 mb-4">
          <div className="col-md-4"><div className="p-3 rounded-4" style={{backgroundColor: '#1e293b'}}><h6>Apps</h6><h3>{appliedJobs.length}</h3></div></div>
          <div className="col-md-8"><div className="p-3 rounded-4" style={{backgroundColor: 'rgba(34, 197, 94, 0.1)', border: '1px solid #22c55e'}}><FiCheckCircle /> Profile is Live</div></div>
        </div>
        <div style={styles.table}>
          <div className="p-3 border-bottom border-secondary text-info fw-bold">Recent Applications</div>
          {appliedJobs.map(job => (
            <div key={job.id} className="p-3 d-flex justify-content-between align-items-center border-bottom border-secondary">
              <div><strong>{job.title}</strong><br/><small className="text-muted">{job.company}</small></div>
              <span className="badge bg-dark text-success"><FiClock /> {job.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
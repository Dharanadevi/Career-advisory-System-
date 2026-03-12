import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiBriefcase, FiDollarSign, FiCalendar, FiList, FiCheckCircle } from 'react-icons/fi';

const AdminJobPost = () => {
  const [jobData, setJobData] = useState({
    id: Date.now(),
    company: '',
    role: '',
    package: '',
    deadline: '',
    skillsRequired: '',
    description: ''
  });

  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 1. Get existing jobs from LocalStorage
    const existingJobs = JSON.parse(localStorage.getItem('all_jobs') || '[]');
    
    // 2. Add new job
    const updatedJobs = [jobData, ...existingJobs];
    
    // 3. Save back to LocalStorage
    localStorage.setItem('all_jobs', JSON.stringify(updatedJobs));
    
    setStatus('Job Posted Successfully!');
    
    // Reset form for next entry
    setJobData({
      id: Date.now(),
      company: '',
      role: '',
      package: '',
      deadline: '',
      skillsRequired: '',
      description: ''
    });

    setTimeout(() => setStatus(''), 3000);
  };

  return (
    <div className="container py-5" style={{ maxWidth: '800px' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="card border-0 shadow-lg rounded-4 overflow-hidden"
      >
        <div className="bg-dark p-4 text-white">
          <h3 className="fw-bold mb-0 text-center">Post New Opportunity</h3>
        </div>

        <form onSubmit={handleSubmit} className="p-4 p-md-5 bg-white">
          {status && (
            <div className="alert alert-success d-flex align-items-center mb-4">
              <FiCheckCircle className="me-2" /> {status}
            </div>
          )}

          <div className="row g-4">
            <div className="col-md-6">
              <label className="small fw-bold text-muted text-uppercase mb-2">Company Name</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-0"><FiBriefcase /></span>
                <input 
                  type="text" 
                  className="form-control bg-light border-0" 
                  required 
                  value={jobData.company}
                  onChange={(e) => setJobData({...jobData, company: e.target.value})}
                  placeholder="e.g. Google"
                />
              </div>
            </div>

            <div className="col-md-6">
              <label className="small fw-bold text-muted text-uppercase mb-2">Job Role</label>
              <input 
                type="text" 
                className="form-control bg-light border-0" 
                required 
                value={jobData.role}
                onChange={(e) => setJobData({...jobData, role: e.target.value})}
                placeholder="e.g. Frontend Developer"
              />
            </div>

            <div className="col-md-6">
              <label className="small fw-bold text-muted text-uppercase mb-2">Annual Package (LPA)</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-0"><FiDollarSign /></span>
                <input 
                  type="number" 
                  className="form-control bg-light border-0" 
                  required 
                  value={jobData.package}
                  onChange={(e) => setJobData({...jobData, package: e.target.value})}
                  placeholder="e.g. 12"
                />
              </div>
            </div>

            <div className="col-md-6">
              <label className="small fw-bold text-muted text-uppercase mb-2">Application Deadline</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-0"><FiCalendar /></span>
                <input 
                  type="date" 
                  className="form-control bg-light border-0" 
                  required 
                  value={jobData.deadline}
                  onChange={(e) => setJobData({...jobData, deadline: e.target.value})}
                />
              </div>
            </div>

            <div className="col-12">
              <label className="small fw-bold text-muted text-uppercase mb-2">Required Skills (Comma Separated)</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-0"><FiList /></span>
                <input 
                  type="text" 
                  className="form-control bg-light border-0" 
                  required 
                  value={jobData.skillsRequired}
                  onChange={(e) => setJobData({...jobData, skillsRequired: e.target.value})}
                  placeholder="React, Node.js, MongoDB, CSS"
                />
              </div>
              <small className="text-muted mt-1 d-block">This is what triggers the Match % for students.</small>
            </div>

            <div className="col-12">
              <label className="small fw-bold text-muted text-uppercase mb-2">Job Description</label>
              <textarea 
                className="form-control bg-light border-0" 
                rows="4" 
                value={jobData.description}
                onChange={(e) => setJobData({...jobData, description: e.target.value})}
                placeholder="Briefly describe the responsibilities..."
              ></textarea>
            </div>

            <div className="col-12 mt-4">
              <button type="submit" className="btn btn-dark w-100 py-3 fw-bold rounded-pill shadow-lg">
                <FiPlus className="me-2" /> Post Job to Portal
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminJobPost;
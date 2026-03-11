import React, { useState } from 'react';
import { FiSave, FiUser, FiBookOpen, FiStar, FiFileText, FiTrendingUp } from 'react-icons/fi';

const StudentIdentity = () => {
  const [formData, setFormData] = useState({
    regNo: '',
    cgpa: '',
    skills: '',
    department: 'CSE',
    resume: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="container py-5" style={{ minHeight: '100vh', marginTop: '60px' }}>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          
          {/* 🚀 Header & Progress */}
          <div className="text-center mb-5">
            <h2 className="fw-bold text-white mb-2">Build Your Identity</h2>
            <p style={{ color: '#cbd5e1' }}>Complete your profile to unlock placement opportunities.</p>
            
            <div className="d-flex justify-content-center gap-4 mt-4 opacity-50">
              <span className="small text-white"><FiUser className="me-1" /> Personal</span>
              <span className="small text-white opacity-100 fw-bold" style={{ color: 'var(--accent-sky)' }}>— <FiBookOpen className="me-1" /> Academic —</span>
              <span className="small text-white"><FiStar className="me-1" /> Professional</span>
            </div>
          </div>

          <div className="glass-card p-5">
            <form>
              <div className="row g-4">
                
                {/* Registration Number */}
                <div className="col-md-6">
                  <label className="small mb-2 text-white opacity-75 fw-medium">Register Number</label>
                  <div className="position-relative">
                    <FiTrendingUp className="position-absolute mt-3 ms-3" style={{ color: '#94a3b8' }} />
                    <input type="text" name="regNo" className="form-control ps-5" placeholder="e.g. 717821CS001" onChange={handleChange} />
                  </div>
                </div>

                {/* CGPA */}
                <div className="col-md-6">
                  <label className="small mb-2 text-white opacity-75 fw-medium">Current CGPA</label>
                  <div className="position-relative">
                    <FiStar className="position-absolute mt-3 ms-3" style={{ color: '#94a3b8' }} />
                    <input type="number" step="0.01" name="cgpa" className="form-control ps-5" placeholder="e.g. 8.50" onChange={handleChange} />
                  </div>
                </div>

                {/* Department */}
                <div className="col-md-12">
                  <label className="small mb-2 text-white opacity-75 fw-medium">Department</label>
                  <select name="department" className="form-select ps-3" onChange={handleChange} style={{ height: '50px' }}>
                    <option value="CSE">Computer Science & Engineering</option>
                    <option value="IT">Information Technology</option>
                    <option value="ECE">Electronics & Communication</option>
                    <option value="MECH">Mechanical Engineering</option>
                  </select>
                </div>

                {/* Technical Skills */}
                <div className="col-md-12">
                  <label className="small mb-2 text-white opacity-75 fw-medium">Technical Skills (Comma separated)</label>
                  <textarea name="skills" className="form-control p-3" rows="3" placeholder="React.js, Node.js, MongoDB, Java, Python..." onChange={handleChange}></textarea>
                </div>

                {/* Resume Upload Box */}
                <div className="col-md-12">
                  <label className="small mb-2 text-white opacity-75 fw-medium">Upload Resume (PDF only)</label>
                  <div className="border border-2 border-dashed rounded-4 p-4 text-center" style={{ borderColor: 'rgba(255,255,255,0.1) !important', backgroundColor: 'rgba(15, 23, 42, 0.2)' }}>
                    <FiFileText size={30} color="#0ea5e9" className="mb-2" />
                    <input type="file" className="form-control bg-transparent border-0 text-white mx-auto" style={{ maxWidth: '250px' }} accept=".pdf" />
                    <p className="small text-muted mt-2">Max file size: 2MB</p>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="col-md-12 mt-5">
                  <button type="submit" className="btn-primary-glow w-100 py-3 border-0 fs-6 fw-bold">
                    Save Career Identity <FiSave className="ms-2" />
                  </button>
                </div>

              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentIdentity;
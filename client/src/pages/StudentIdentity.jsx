import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSave, FiUser, FiBook, FiAward, FiGithub, FiLinkedin, FiCpu } from 'react-icons/fi';

const StudentIdentity = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', regNo: '', 
    college: '', year: '2022-2026', cgpa: '', 
    backlogs: '0', skills: '', github: '', 
    linkedin: '', summary: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic: Navigate to Stage 2 and pass the data
    navigate('/view-profile', { state: { studentData: formData } });
  };

  return (
    <div className="container py-5 animate-up">
      <div className="text-center mb-5">
        <h2 className="fw-bold">Build Your <span className="logo-place">Career</span> <span className="logo-me">Identity</span></h2>
      </div>
      <div className="card p-5 shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="row g-4">
            <div className="col-md-6">
              <label className="text-muted small fw-bold">FIRST NAME</label>
              <input type="text" name="firstName" className="form-control custom-input" onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="text-muted small fw-bold">LAST NAME</label>
              <input type="text" name="lastName" className="form-control custom-input" onChange={handleChange} required />
            </div>
            <div className="col-md-8">
              <label className="text-muted small fw-bold">COLLEGE NAME</label>
              <input type="text" name="college" className="form-control custom-input" onChange={handleChange} />
            </div>
            <div className="col-md-4">
              <label className="text-muted small fw-bold">CGPA</label>
              <input type="number" name="cgpa" step="0.01" className="form-control custom-input" onChange={handleChange} />
            </div>
            <div className="col-12">
              <label className="text-muted small fw-bold">TECHNICAL SKILLS (COMMA SEPARATED)</label>
              <input type="text" name="skills" placeholder="React, Java, Python..." className="form-control custom-input" onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label className="text-muted small fw-bold">GITHUB LINK</label>
              <input type="url" name="github" className="form-control custom-input" onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label className="text-muted small fw-bold">LINKEDIN LINK</label>
              <input type="url" name="linkedin" className="form-control custom-input" onChange={handleChange} />
            </div>
            <div className="col-12">
              <label className="text-muted small fw-bold">PROFESSIONAL SUMMARY</label>
              <textarea name="summary" className="form-control custom-input" rows="3" onChange={handleChange}></textarea>
            </div>
          </div>
          <button type="submit" className="btn btn-primary-glow w-100 mt-5 py-3">
            <FiSave className="me-2" /> FINALIZE IDENTITY
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentIdentity;
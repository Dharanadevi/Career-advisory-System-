import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCheckCircle, FiGithub, FiLinkedin, FiCpu } from 'react-icons/fi';

const ProfileView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.studentData;

  if (!data) return <div className="text-center mt-5">No data found. Please fill the form first.</div>;

  return (
    <div className="container py-5 animate-up">
      <div className="card glass-card p-5 border-0">
        <div className="row align-items-center mb-5">
          <div className="col-md-2 text-center">
            <img src={`https://ui-avatars.com/api/?name=${data.firstName}&background=0ea5e9&color=fff&size=100`} className="rounded-circle shadow" alt="Avatar" />
          </div>
          <div className="col-md-10">
            <h2 className="fw-bold mb-0">{data.firstName} {data.lastName}</h2>
            <p className="text-info mb-0">{data.college} | Class of {data.year}</p>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-md-8">
            <h5 className="fw-bold text-glow-sky">Professional Summary</h5>
            <p className="text-muted">{data.summary || "No summary provided."}</p>
            
            <h5 className="fw-bold mt-4 text-glow-sky">Verified Skills</h5>
            <div className="d-flex flex-wrap gap-2">
              {data.skills.split(',').map((s, i) => (
                <span key={i} className="badge bg-dark border border-info px-3 py-2">{s.trim()}</span>
              ))}
            </div>
          </div>
          <div className="col-md-4 border-start border-secondary ps-4">
            <div className="mb-4">
              <small className="text-muted d-block">ACADEMIC SCORE</small>
              <h3 className="fw-bold text-info">{data.cgpa} CGPA</h3>
            </div>
            <div className="mb-4">
              <small className="text-muted d-block">SOCIAL PRESENCE</small>
              <div className="d-flex gap-3 mt-2">
                <a href={data.github} target="_blank" className="text-light fs-4"><FiGithub /></a>
                <a href={data.linkedin} target="_blank" className="text-light fs-4"><FiLinkedin /></a>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex gap-3 mt-5">
          <button className="btn btn-outline-light rounded-pill px-4" onClick={() => navigate(-1)}>
            <FiArrowLeft /> Edit Data
          </button>
          <button className="btn btn-primary-glow px-5 rounded-pill" onClick={() => navigate('/dashboard', { state: { studentData: data } })}>
            Confirm & Enter Dashboard <FiCheckCircle className="ms-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
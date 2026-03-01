import React from 'react';
import { FiBriefcase, FiPlus, FiUsers, FiCheckCircle } from 'react-icons/fi';

const StaffDashboard = () => {
  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary">Placement Officer Console</h2>
        <button className="btn btn-primary rounded-pill px-4 shadow-sm">
          <FiPlus /> Create Recruitment Drive
        </button>
      </div>

      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-3 bg-white">
            <small className="text-muted fw-bold">ACTIVE DRIVES</small>
            <h2 className="fw-bold">08</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-3 bg-white">
            <small className="text-muted fw-bold">TOTAL APPLICANTS</small>
            <h2 className="fw-bold">1,240</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-3 bg-white">
            <small className="text-muted fw-bold">PLACED STUDENTS</small>
            <h2 className="fw-bold text-success">156</h2>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="bg-light p-3 border-bottom">
          <h5 className="mb-0 fw-bold">Job Management</h5>
        </div>
        <table className="table table-hover align-middle mb-0">
          <thead>
            <tr className="small text-muted">
              <th className="ps-4">COMPANY</th>
              <th>ROLE</th>
              <th>APPLICANTS</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="ps-4 fw-bold">Microsoft</td>
              <td>Software Engineer</td>
              <td>342</td>
              <td><span className="badge bg-success-subtle text-success">Open</span></td>
            </tr>
            <tr>
              <td className="ps-4 fw-bold">Accenture</td>
              <td>Data Analyst</td>
              <td>89</td>
              <td><span className="badge bg-secondary-subtle text-secondary">Closed</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffDashboard;
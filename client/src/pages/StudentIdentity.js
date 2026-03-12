import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiSave, FiUser, FiStar, FiCheckCircle, FiPhone, 
  FiGithub, FiLinkedin, FiCamera, FiBookOpen, FiCalendar, 
  FiTarget, FiBriefcase, FiLayers, FiX,
  FiAlertCircle, FiHash, FiGrid, FiUploadCloud, FiFileText, FiShield
} from 'react-icons/fi';

const StudentIdentity = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', phone: '', regNo: '', department: '', 
    cgpa: '', graduationYear: '', currentSemester: '', backlogs: '0',
    areaOfInterest: '', githubUrl: '', linkedinUrl: '', projects: '', internships: ''
  });
  
  const [isSaved, setIsSaved] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [resumeName, setResumeName] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreviewImage(URL.createObjectURL(file));
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) setResumeName(file.name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => navigate('/student-dashboard'), 2000);
  };

  return (
    <div className="super-modal-wrapper">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap');

        .super-modal-wrapper {
          min-height: 100vh;
          background: #020617;
          display: flex; justify-content: center; align-items: center;
          padding: 40px; font-family: 'Outfit', sans-serif;
          position: relative; overflow: hidden;
        }

        /* Moving Background Mesh */
        .super-modal-wrapper::before {
          content: ''; position: absolute; width: 150%; height: 150%;
          background: radial-gradient(circle at 50% 50%, #0ea5e922 0%, #6366f111 25%, transparent 50%);
          animation: meshMove 15s linear infinite; z-index: 0;
        }
        @keyframes meshMove { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

        .glass-modal {
          width: 100%; max-width: 1150px;
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(40px) saturate(200%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 45px;
          display: flex; position: relative; z-index: 10;
          box-shadow: 0 50px 100px -20px rgba(0,0,0,0.7);
          overflow: hidden;
          animation: slideIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slideIn { from { opacity: 0; transform: scale(0.9) translateY(30px); } to { opacity: 1; transform: scale(1) translateY(0); } }

        /* Left Side: Identity Branding */
        .id-sidebar {
          width: 380px; padding: 3.5rem 2.5rem;
          background: linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%);
          border-right: 1px solid rgba(255,255,255,0.08);
          display: flex; flex-direction: column; align-items: center;
        }

        .avatar-container {
          width: 160px; height: 160px; border-radius: 50px;
          background: linear-gradient(135deg, #0ea5e9, #6366f1);
          padding: 4px; position: relative; margin-bottom: 2.5rem;
          box-shadow: 0 20px 40px rgba(14, 165, 233, 0.3);
          transition: 0.4s; cursor: pointer;
        }
        .avatar-container:hover { transform: translateY(-5px) rotate(3deg); }

        .glass-input-group { position: relative; width: 100%; margin-bottom: 1.2rem; }
        
        .glass-input {
          background: rgba(255, 255, 255, 0.03) !important;
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
          color: white !important;
          padding: 16px 20px 16px 50px !important;
          border-radius: 22px !important;
          transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* --- Pure White Placeholder --- */
        .glass-input::placeholder { color: #ffffff !important; opacity: 0.9 !important; font-weight: 300; }

        .glass-input:focus {
          background: rgba(255, 255, 255, 0.08) !important;
          border-color: #0ea5e9 !important;
          box-shadow: 0 0 25px rgba(14, 165, 233, 0.25) !important;
          transform: translateX(5px);
        }

        .form-content { padding: 4rem; flex-grow: 1; height: 85vh; overflow-y: auto; scrollbar-width: none; }
        .form-content::-webkit-scrollbar { display: none; }

        .section-tag {
          font-size: 0.75rem; font-weight: 800; color: #0ea5e9;
          text-transform: uppercase; letter-spacing: 4px;
          display: flex; align-items: center; gap: 10px; margin-bottom: 2rem;
        }
        .section-tag::after { content: ''; height: 1px; flex-grow: 1; background: linear-gradient(90deg, #0ea5e933, transparent); }

        .resume-pill {
          background: rgba(14, 165, 233, 0.05);
          border: 2px dashed rgba(14, 165, 233, 0.3);
          padding: 20px; border-radius: 25px; cursor: pointer;
          transition: 0.3s; width: 100%; text-align: center;
        }
        .resume-pill:hover { background: rgba(14, 165, 233, 0.1); border-color: #0ea5e9; }

        .btn-finalize {
          background: linear-gradient(90deg, #0ea5e9, #6366f1);
          border: none; color: white; padding: 22px; border-radius: 24px;
          width: 100%; font-weight: 800; letter-spacing: 2px;
          margin-top: 2rem; transition: 0.4s;
          box-shadow: 0 15px 30px rgba(99, 102, 241, 0.3);
        }
        .btn-finalize:hover { transform: translateY(-5px); box-shadow: 0 20px 45px rgba(14, 165, 233, 0.5); }
      `}</style>

      <div className="glass-modal">
        <div className="id-sidebar">
          <div className="section-tag w-100">Profile</div>
          
          <label htmlFor="pfp-upload" className="avatar-container">
            <div className="w-100 h-100 bg-dark rounded-5 overflow-hidden d-flex align-items-center justify-content-center">
              {previewImage ? <img src={previewImage} style={{width:'100%', height:'100%', objectFit:'cover'}} /> : <FiCamera size={45} className="text-info"/>}
            </div>
          </label>
          <input type="file" id="pfp-upload" hidden onChange={handleImageChange} accept="image/*" />

          <div className="glass-input-group">
            <FiUser className="position-absolute mt-3 ms-3 text-info" />
            <input type="text" name="firstName" className="form-control glass-input" placeholder="First Name" onChange={handleChange} />
          </div>
          <div className="glass-input-group">
            <FiUser className="position-absolute mt-3 ms-3 text-info" />
            <input type="text" name="lastName" className="form-control glass-input" placeholder="Last Name" onChange={handleChange} />
          </div>
          <div className="glass-input-group mb-5">
            <FiPhone className="position-absolute mt-3 ms-3 text-info" />
            <input type="tel" name="phone" className="form-control glass-input" placeholder="Phone Number" onChange={handleChange} />
          </div>

          <div className="mt-auto w-100">
            <label htmlFor="resume-pdf" className="w-100">
              <div className="resume-pill">
                <FiUploadCloud size={28} className="text-info mb-2" />
                <div className="small fw-bold">{resumeName || "SYNC RESUME"}</div>
              </div>
            </label>
            <input type="file" id="resume-pdf" hidden accept=".pdf" onChange={handleResumeChange} />
          </div>
        </div>

        <div className="form-content">
          {isSaved ? (
            <div className="text-center py-5">
              <FiShield size={100} className="text-info mb-4" />
              <h2 className="fw-extrabold text-white">IDENTITY SECURED</h2>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="section-tag">Academic Records</div>
              <div className="row g-4 mb-5">
                <div className="col-md-6">
                  <div className="glass-input-group">
                    <FiHash className="position-absolute mt-3 ms-3 text-info" />
                    <input type="text" name="regNo" className="form-control glass-input" placeholder="Registration Number" onChange={handleChange} required />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="glass-input-group">
                    <FiGrid className="position-absolute mt-3 ms-3 text-info" />
                    <input type="text" name="department" className="form-control glass-input" placeholder="Department" onChange={handleChange} required />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="glass-input-group">
                    <FiStar className="position-absolute mt-3 ms-3 text-info" />
                    <input type="number" step="0.01" name="cgpa" className="form-control glass-input" placeholder="CGPA" onChange={handleChange} required />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="glass-input-group">
                    <FiBookOpen className="position-absolute mt-3 ms-3 text-info" />
                    <input type="text" name="currentSemester" className="form-control glass-input" placeholder="Semester" onChange={handleChange} required />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="glass-input-group">
                    <FiAlertCircle className="position-absolute mt-3 ms-3 text-danger" />
                    <input type="number" name="backlogs" className="form-control glass-input" placeholder="Backlogs" onChange={handleChange} required />
                  </div>
                </div>
              </div>

              <div className="section-tag">Career Focus</div>
              <div className="glass-input-group mb-4">
                <FiTarget className="position-absolute mt-3 ms-3 text-info" />
                <input type="text" name="areaOfInterest" className="form-control glass-input" placeholder="Core Domain (e.g. MERN Fullstack)" onChange={handleChange} required />
              </div>

              <div className="row g-4 mb-4">
                <div className="col-md-6">
                  <div className="mb-2 small text-info fw-bold"><FiBriefcase className="me-2"/>INTERNSHIPS</div>
                  <textarea name="internships" className="form-control glass-input" style={{height:'120px', paddingLeft:'15px'}} placeholder="Detail your experience..." onChange={handleChange}></textarea>
                </div>
                <div className="col-md-6">
                  <div className="mb-2 small text-info fw-bold"><FiLayers className="me-2"/>PROJECTS</div>
                  <textarea name="projects" className="form-control glass-input" style={{height:'120px', paddingLeft:'15px'}} placeholder="List your key builds..." onChange={handleChange}></textarea>
                </div>
              </div>

              <div className="row g-4">
                <div className="col-md-6"><div className="glass-input-group"><FiGithub className="position-absolute mt-3 ms-3 text-info"/><input type="url" name="githubUrl" className="form-control glass-input" placeholder="GitHub Repository" onChange={handleChange}/></div></div>
                <div className="col-md-6"><div className="glass-input-group"><FiLinkedin className="position-absolute mt-3 ms-3 text-info"/><input type="url" name="linkedinUrl" className="form-control glass-input" placeholder="LinkedIn Profile" onChange={handleChange}/></div></div>
              </div>

              <button type="submit" className="btn-finalize">
                FINALIZE DIGITAL IDENTITY <FiSave className="ms-3"/>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentIdentity;
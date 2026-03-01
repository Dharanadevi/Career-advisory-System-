import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiTrash2, FiAward, FiGithub, FiLinkedin, FiSearch,
  FiUploadCloud, FiFileText, FiCheckCircle, FiTrendingUp, FiDollarSign, 
  FiUser, FiBookOpen, FiBriefcase, FiArrowDown, FiCalendar, FiMapPin 
} from 'react-icons/fi';

const StudentDashboard = () => {
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [sortBy, setSortBy] = useState('match'); 
  const [searchTerm, setSearchTerm] = useState(""); 
  
  const [availableJobs, setAvailableJobs] = useState([]);
  const [appliedJobIds, setAppliedJobIds] = useState([]);
  const [resumeName, setResumeName] = useState("");

  const [profileData, setProfileData] = useState({
    fullName: '', 
    email: '', 
    universityName: '', // Added
    academicYear: '',   // Added
    department: '', 
    bio: '',            // Added
    github: '', 
    linkedin: '', 
    skills: [], 
    currentSkill: ''
  });

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem('all_jobs') || '[]');
    setAvailableJobs(savedJobs);
    const savedApps = JSON.parse(localStorage.getItem('applications') || '[]');
    const myApps = savedApps.filter(app => app.studentEmail === profileData.email);
    setAppliedJobIds(myApps.map(app => app.jobId));
  }, [profileData.email]);

  // --- MATCH LOGIC ---
  const getSkillAnalysis = (job) => {
    const studentSkills = profileData.skills.map(s => s.toLowerCase().trim());
    const requiredSkills = job.skillsRequired ? job.skillsRequired.split(',').map(s => s.trim()) : [];
    const matched = requiredSkills.filter(s => studentSkills.includes(s.toLowerCase()));
    const missing = requiredSkills.filter(s => !studentSkills.includes(s.toLowerCase()) && s !== "");
    return { matched, missing, totalRequired: requiredSkills.length };
  };

  const calculateMatch = (job) => {
    const { matched, totalRequired } = getSkillAnalysis(job);
    let score = 30; 
    if (totalRequired > 0) score += (matched.length / totalRequired) * 40;
    if (profileData.department && job.role.toLowerCase().includes(profileData.department.toLowerCase().split(' ')[0])) score += 30;
    return Math.min(Math.round(score), 99);
  };

  const handleApply = (job) => {
    const newApp = {
      id: Date.now(), jobId: job.id, company: job.company, role: job.role,
      studentName: profileData.fullName, studentEmail: profileData.email,
      matchScore: calculateMatch(job), status: 'Pending', appliedAt: new Date().toLocaleDateString()
    };
    const allApps = JSON.parse(localStorage.getItem('applications') || '[]');
    localStorage.setItem('applications', JSON.stringify([...allApps, newApp]));
    setAppliedJobIds([...appliedJobIds, job.id]);
    alert("Applied successfully!");
  };

  const handleFinalize = (e) => {
    e.preventDefault();
    if (!resumeName) {
        alert("Please upload your resume first!");
        return;
    }
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
      setIsProfileComplete(true);
      document.getElementById('job-section').scrollIntoView({ behavior: 'smooth' });
    }, 1200);
  };

  return (
    <div className="container py-5" style={{ maxWidth: '1000px', backgroundColor: '#f8f9fa' }}>
      
      {/* 1. COMPREHENSIVE PROFILE SECTION */}
      <div className="card border-0 shadow-lg rounded-4 mb-5 overflow-hidden">
        <div className="bg-dark p-4 text-white d-flex justify-content-between align-items-center">
          <div>
            <h4 className="fw-bold mb-0">Student Profile</h4>
            <p className="small text-secondary mb-0">Fill in your details to unlock job matches</p>
          </div>
          {isProfileComplete && <FiCheckCircle size={28} className="text-success" />}
        </div>
        
        <form onSubmit={handleFinalize} className="p-4 p-md-5 bg-white">
          <div className="row g-4 mb-4">
            {/* Identity Group */}
            <div className="col-md-12">
                <label className="small fw-bold text-uppercase text-muted">Full Name</label>
                <div className="input-group">
                    <span className="input-group-text bg-light border-0"><FiUser/></span>
                    <input className="form-control bg-light border-0 py-2" required disabled={isProfileComplete} value={profileData.fullName} onChange={e => setProfileData({...profileData, fullName: e.target.value})} placeholder="Enter your full name" />
                </div>
            </div>

            <div className="col-md-6">
                <label className="small fw-bold text-uppercase text-muted">Email Address</label>
                <input type="email" className="form-control bg-light border-0 py-2" required disabled={isProfileComplete} value={profileData.email} onChange={e => setProfileData({...profileData, email: e.target.value})} />
            </div>

            <div className="col-md-6">
                <label className="small fw-bold text-uppercase text-muted">Academic Year</label>
                <div className="input-group">
                    <span className="input-group-text bg-light border-0"><FiCalendar/></span>
                    <select className="form-select bg-light border-0 py-2" required disabled={isProfileComplete} value={profileData.academicYear} onChange={e => setProfileData({...profileData, academicYear: e.target.value})}>
                        <option value="">Select Year</option>
                        <option value="2000-2004">2022-2026</option>
                        <option value="2004-2008">2026-2030</option>
                        <option value="2008-2012">2028-2032</option>
                        <option value="2012-2016">2032-2036</option>
                        <option value="2016-2020">2036-2040</option>
                       

                    </select>
                </div>
            </div>

            <div className="col-md-6">
                <label className="small fw-bold text-uppercase text-muted">University Name</label>
                <div className="input-group">
                    <span className="input-group-text bg-light border-0"><FiMapPin/></span>
                    <input className="form-control bg-light border-0 py-2" required disabled={isProfileComplete} value={profileData.universityName} onChange={e => setProfileData({...profileData, universityName: e.target.value})} />
                </div>
            </div>

            <div className="col-md-6">
                <label className="small fw-bold text-uppercase text-muted">Department</label>
                <input className="form-control bg-light border-0 py-2" required disabled={isProfileComplete} value={profileData.department} onChange={e => setProfileData({...profileData, department: e.target.value})} placeholder="e.g. Computer Science" />
            </div>

            {/* Links & Bio */}
            <div className="col-md-6"><label className="small fw-bold text-muted"><FiGithub/> GitHub</label><input className="form-control bg-light border-0" disabled={isProfileComplete} value={profileData.github} onChange={e => setProfileData({...profileData, github: e.target.value})} /></div>
            <div className="col-md-6"><label className="small fw-bold text-muted"><FiLinkedin/> LinkedIn</label><input className="form-control bg-light border-0" disabled={isProfileComplete} value={profileData.linkedin} onChange={e => setProfileData({...profileData, linkedin: e.target.value})} /></div>
            
            <div className="col-12">
                <label className="small fw-bold text-uppercase text-muted">Professional Bio</label>
                <textarea className="form-control bg-light border-0" rows="3" disabled={isProfileComplete} value={profileData.bio} onChange={e => setProfileData({...profileData, bio: e.target.value})} placeholder="Tell us about your career goals..."></textarea>
            </div>
          </div>

          {/* Skill Section */}
          <div className="mb-4">
            <label className="small fw-bold text-muted">Technical Skills</label>
            {!isProfileComplete && (
              <div className="input-group mb-3 shadow-sm rounded">
                <input className="form-control border-0 py-2" placeholder="Add skill (e.g. Python)" value={profileData.currentSkill} onChange={e => setProfileData({...profileData, currentSkill: e.target.value})} />
                <button type="button" className="btn btn-primary px-4" onClick={() => {
                  if(profileData.currentSkill) setProfileData({...profileData, skills: [...profileData.skills, profileData.currentSkill.trim()], currentSkill: ''})
                }}>Add</button>
              </div>
            )}
            <div className="d-flex flex-wrap gap-2">
              {profileData.skills.map((s, i) => (
                <span key={i} className="badge bg-primary-subtle text-primary p-2 px-3 rounded-pill border border-primary-subtle">
                  {s} {!isProfileComplete && <FiTrash2 className="ms-2" style={{cursor:'pointer'}} onClick={() => setProfileData({...profileData, skills: profileData.skills.filter((_, idx) => idx !== i)})}/>}
                </span>
              ))}
            </div>
          </div>

          {/* Resume Section */}
          <div className="mb-5">
            <label className="small fw-bold text-uppercase text-muted d-block mb-3">Resume Attachment</label>
            <div className={`p-4 border-2 rounded-4 text-center transition-all ${resumeName ? 'bg-success-subtle border-success' : 'bg-light border-secondary'}`} style={{ borderStyle: 'dashed' }}>
              <input type="file" id="resume-upload" className="d-none" disabled={isProfileComplete} onChange={(e) => setResumeName(e.target.files[0]?.name)} />
              <label htmlFor="resume-upload" style={{cursor: isProfileComplete ? 'default' : 'pointer'}}>
                <FiUploadCloud size={30} className={resumeName ? 'text-success' : 'text-primary'} /><br/>
                <span className="fw-bold d-block mt-2">{resumeName || "Upload Resume (PDF only)"}</span>
              </label>
            </div>
          </div>

          {!isProfileComplete ? (
            <button type="submit" className="btn btn-dark w-100 rounded-pill py-3 fw-bold shadow-lg">
              {isCalculating ? "Matching Skills with Recruiters..." : "Finalize Profile & View Jobs"}
            </button>
          ) : (
            <div className="text-center py-3 text-success fw-bold border rounded-4">
              <FiCheckCircle className="me-2"/> Profile locked. Scroll down for Job Recommendations.
              <div className="mt-2"><FiArrowDown className="animate-bounce" /></div>
            </div>
          )}
        </form>
      </div>

      {/* 2. DYNAMIC JOB RECOMMENDATIONS SECTION */}
      <AnimatePresence>
        {isProfileComplete && (
          <motion.div id="job-section" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 mt-5 gap-3">
              <h3 className="fw-bold mb-0">Tailored Job Matches</h3>
              <div className="d-flex gap-2 bg-white p-2 rounded-pill shadow-sm">
                <button onClick={() => setSortBy('match')} className={`btn btn-sm rounded-pill px-4 ${sortBy === 'match' ? 'btn-primary shadow' : 'btn-light'}`}>Best Match</button>
                <button onClick={() => setSortBy('salary')} className={`btn btn-sm rounded-pill px-4 ${sortBy === 'salary' ? 'btn-primary shadow' : 'btn-light'}`}>High Salary</button>
              </div>
            </div>

            <div className="input-group bg-white rounded-pill px-3 py-2 shadow-sm mb-5 border-0">
              <span className="input-group-text border-0 bg-transparent text-muted"><FiSearch/></span>
              <input className="form-control border-0 bg-transparent shadow-none" placeholder="Filter jobs by keywords..." onChange={e => setSearchTerm(e.target.value)} />
            </div>

            <div className="row g-4">
              {availableJobs
                .map(j => ({ ...j, score: calculateMatch(j) }))
                .filter(j => (j.company + j.role).toLowerCase().includes(searchTerm.toLowerCase()))
                .sort((a, b) => sortBy === 'salary' ? b.package - a.package : b.score - a.score)
                .map(job => {
                  const isApplied = appliedJobIds.includes(job.id);
                  const { matched, missing } = getSkillAnalysis(job);
                  return (
                    <div key={job.id} className="col-12">
                      <div className={`card border-0 shadow-sm p-4 rounded-4 transition-all bg-white position-relative ${isApplied ? 'bg-light' : ''}`}>
                        <div className="d-flex justify-content-between align-items-start mb-4">
                          <div>
                            <div className="d-flex align-items-center gap-2 mb-1">
                              <h5 className="fw-bold mb-0 text-dark">{job.company}</h5>
                              {!isApplied && <span className="badge bg-success rounded-pill px-3">{job.score}% Match</span>}
                            </div>
                            <h6 className="text-primary fw-bold mb-0 d-flex align-items-center"><FiBriefcase className="me-2"/>{job.role}</h6>
                          </div>
                          <button onClick={() => !isApplied && handleApply(job)} className={`btn rounded-pill px-5 py-2 fw-bold shadow-sm transition-all ${isApplied ? 'btn-outline-secondary' : 'btn-dark'}`}>
                            {isApplied ? "Application Submitted ✓" : "Apply Now"}
                          </button>
                        </div>

                        <div className="row g-3 mb-4">
                          <div className="col-md-6">
                            <div className="p-3 bg-light rounded-4 h-100 border-start border-success border-4">
                              <small className="fw-bold text-success text-uppercase d-block mb-2">Matching Skills</small>
                              <div className="d-flex flex-wrap gap-2">
                                {matched.length > 0 ? matched.map((s, i) => <span key={i} className="badge bg-white text-success border border-success-subtle rounded-pill">{s}</span>) : <span className="small text-muted italic">No direct skill matches</span>}
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="p-3 bg-light rounded-4 h-100 border-start border-warning border-4">
                              <small className="fw-bold text-muted text-uppercase d-block mb-2">Missing Skills (Learn these!)</small>
                              <div className="d-flex flex-wrap gap-2">
                                {missing.length > 0 ? missing.map((s, i) => <span key={i} className="badge bg-white text-muted border border-light-subtle rounded-pill">{s}</span>) : <span className="small text-success fw-bold">Fully Qualified</span>}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                          <div className="d-flex gap-4 align-items-center">
                            <span className="fw-bold text-dark"><FiDollarSign className="me-1"/>{job.package} LPA</span>
                            <span className="small text-muted fw-medium"><FiCalendar className="me-1"/>Apply by: {job.deadline}</span>
                          </div>
                          <div className="progress flex-grow-1 mx-4 d-none d-lg-flex" style={{height: '8px', maxWidth: '200px'}}>
                            <div className="progress-bar bg-primary" style={{width: `${job.score}%`, borderRadius: '10px'}}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .transition-all { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .transition-all:hover { transform: translateY(-5px); box-shadow: 0 15px 30px rgba(0,0,0,0.08) !important; }
        .animate-bounce { animation: bounce 1s infinite; }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(8px); } }
        .bg-success-subtle { background-color: #f0fff4 !important; }
      `}</style>
    </div>
  );
};

export default StudentDashboard;
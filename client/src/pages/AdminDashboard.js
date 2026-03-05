import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiGrid, FiUsers, FiBriefcase, FiTrendingUp, FiTrash2, FiActivity, 
  FiClock, FiX, FiPlus, FiDownload, FiSearch, FiMail, FiStar 
} from 'react-icons/fi';

const AdminDashboard = () => {
  // --- 1. STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState('overview');
  const [usersList, setUsersList] = useState([]);
  const [jobsList, setJobsList] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Modal Toggles
  const [showUserModal, setShowUserModal] = useState(false);
  const [showJobModal, setShowJobModal] = useState(false);

  // Form States
  const [newMember, setNewMember] = useState({ name: '', email: '', department: 'CSE', skills: '' });
  const [newJob, setNewJob] = useState({ company: '', role: '', requiredDept: 'CSE', package: '' });

  const mainContentRef = useRef(null);

  // --- 2. DATA INITIALIZATION ---
  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('all_users') || '[]');
    const savedJobs = JSON.parse(localStorage.getItem('all_jobs') || '[]');
    const savedHistory = JSON.parse(localStorage.getItem('search_history') || '[]');
    setUsersList(savedUsers);
    setJobsList(savedJobs);
    setRecentActivity(savedHistory);
  }, []);

  // Safe Scroll
  useEffect(() => {
    mainContentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [activeTab]);

  // --- 3. BUSINESS LOGIC (Matching & Analytics) ---
  const getDeptStats = () => {
    const depts = ['CSE', 'ECE', 'MECH'];
    return depts.map(dept => {
      const students = usersList.filter(u => u.department === dept);
      const placed = students.filter(u => u.placed).length;
      const total = students.length;
      const percentage = total > 0 ? Math.round((placed / total) * 100) : 0;
      return { dept, placed, total, percentage };
    });
  };

  const getMatchesForStudent = (student) => {
    return jobsList.filter(job => {
      const deptMatch = job.requiredDept === student.department;
      const sSkills = (student.skills || "").toLowerCase();
      const jRole = job.role.toLowerCase();
      const skillMatch = sSkills.split(',').some(s => s.trim() !== "" && jRole.includes(s.trim()));
      return deptMatch || skillMatch;
    });
  };

  const getMatchesForJob = (job) => {
    return usersList.filter(student => {
      const deptMatch = student.department === job.requiredDept;
      const sSkills = (student.skills || "").toLowerCase();
      const jRole = job.role.toLowerCase();
      const skillMatch = sSkills.split(',').some(s => s.trim() !== "" && jRole.includes(s.trim()));
      return deptMatch || skillMatch;
    });
  };

  // --- 4. ACTION HANDLERS ---
  const logActivity = (name, action) => {
    const entry = { id: Date.now(), name, action, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    const updated = [entry, ...recentActivity.filter(a => a.name !== name || a.action !== action)].slice(0, 5);
    setRecentActivity(updated);
    localStorage.setItem('search_history', JSON.stringify(updated));
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    const updated = [{ ...newMember, id: Date.now(), placed: false }, ...usersList];
    setUsersList(updated);
    localStorage.setItem('all_users', JSON.stringify(updated));
    logActivity(newMember.name, "Added to TPO");
    setShowUserModal(false);
    setNewMember({ name: '', email: '', department: 'CSE', skills: '' });
  };

  const handleAddJob = (e) => {
    e.preventDefault();
    const updated = [{ ...newJob, id: Date.now() }, ...jobsList];
    setJobsList(updated);
    localStorage.setItem('all_jobs', JSON.stringify(updated));
    logActivity(newJob.company, "Drive Posted");
    setShowJobModal(false);
  };

  const handleTogglePlacement = (u) => {
    const updated = usersList.map(item => item.id === u.id ? { ...item, placed: !item.placed } : item);
    setUsersList(updated);
    localStorage.setItem('all_users', JSON.stringify(updated));
    logActivity(u.name, !u.placed ? "Placed Successfully" : "Pending Status");
  };

  const handleDownloadReport = () => {
    logActivity("Admin", "Generated PDF Report");
    window.print();
  };

  // --- 5. STYLING ---
  const theme = {
    bg: isDarkMode ? '#121212' : '#cfd6dd',
    card: isDarkMode ? '#302929' : '#ffffff',
    text: isDarkMode ? '#f1f5f9' : '#1e293b',
    border: isDarkMode ? '#9bb0cd' : '#e2e8f0'
  };

  return (
    <div className="d-flex" style={{ minHeight: '100vh', background: theme.bg, color: theme.text, transition: '0.3s' }}>
      
      {/* SIDEBAR (Hidden on Print) */}
      <div className="bg-dark text-white p-4 d-none d-md-flex flex-column no-print" style={{ width: '280px', position: 'sticky', top: 0, height: '100vh' }}>
        <div className="flex-grow-1">
          <div className="d-flex align-items-center mb-5 gap-2 text-primary">
            <FiGrid size={24} />
            <h5 className="fw-bold mb-0 text-white">TPO PORTAL</h5>
          </div>
          <nav className="nav flex-column gap-2">
            <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon={<FiActivity />} label="Dashboard" />
            <TabButton active={activeTab === 'jobs'} onClick={() => setActiveTab('jobs')} icon={<FiBriefcase />} label="Job Drives" />
            <TabButton active={activeTab === 'users'} onClick={() => setActiveTab('users')} icon={<FiUsers />} label="Students" />
          </nav>
        </div>

        <div className="mt-auto border-top border-secondary pt-4 mb-3">
          <small className="opacity-50 text-uppercase d-block mb-2">Recent Logs</small>
          {recentActivity.slice(0, 3).map(act => (
            <div key={act.id} className="small mb-1 opacity-75">{act.name} - {act.action}</div>
          ))}
        </div>

        <button onClick={() => setIsDarkMode(!isDarkMode)} className="btn btn-sm btn-outline-light rounded-pill">
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-grow-1 p-4 p-md-5" ref={mainContentRef}>
        <header className="d-flex justify-content-between align-items-center mb-5">
          <div><h2 className="fw-bold mb-0">Admin Overview</h2><p className="opacity-50 m-0">Manage placement records</p></div>
          <div className="d-flex gap-2 no-print">
            <button onClick={handleDownloadReport} className="btn btn-outline-secondary rounded-pill"><FiDownload /></button>
            <button onClick={() => setShowJobModal(true)} className="btn btn-outline-primary rounded-pill px-3">New Drive</button>
            <button onClick={() => setShowUserModal(true)} className="btn btn-primary rounded-pill px-4 shadow-sm">Add Student</button>
          </div>
        </header>

        

        <AnimatePresence mode="wait">
          {/* DASHBOARD OVERVIEW */}
          {activeTab === 'overview' && (
            <motion.div key="ov" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="row g-4 mb-4">
                <div className="col-md-4"><StatCard theme={theme} label="Total Students" val={usersList.length} color="primary" icon={<FiUsers />} /></div>
                <div className="col-md-4"><StatCard theme={theme} label="Live Drives" val={jobsList.length} color="success" icon={<FiBriefcase />} /></div>
                <div className="col-md-4"><StatCard theme={theme} label="Placements" val={usersList.filter(u => u.placed).length} color="info" icon={<FiStar />} /></div>
              </div>

              <div className="card border-0 shadow-sm p-4 rounded-4" style={{ background: theme.card, color: theme.text }}>
                <h6 className="fw-bold mb-4">Department-wise Success Rate</h6>
                {getDeptStats().map(stat => (
                  <div key={stat.dept} className="mb-4">
                    <div className="d-flex justify-content-between mb-2 small fw-bold">
                      <span>{stat.dept}</span>
                      <span>{stat.percentage}% Placed</span>
                    </div>
                    <div className="progress" style={{ height: '10px', background: theme.border, borderRadius: '10px' }}>
                      <motion.div 
                        initial={{ width: 0 }} animate={{ width: `${stat.percentage}%` }}
                        className="progress-bar bg-primary" style={{ borderRadius: '10px' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* JOBS SECTION */}
          {activeTab === 'jobs' && (
            <motion.div key="jb" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="row g-4">
              {jobsList.map(job => (
                <div key={job.id} className="col-md-4">
                  <div className="card border-0 shadow-sm p-4 rounded-4 h-100" style={{background: theme.card, color: theme.text}}>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="badge bg-primary-subtle text-primary">{job.package} LPA</span>
                      <div className="text-info small fw-bold">{getMatchesForJob(job).length} Fits</div>
                    </div>
                    <h5 className="fw-bold">{job.company}</h5>
                    <p className="opacity-75 small">{job.role}</p>
                    <button className="btn btn-sm btn-outline-primary w-100 rounded-pill mt-3" onClick={() => alert(`Best Fits: ${getMatchesForJob(job).map(r=>r.name).join(', ')}`)}>Analyze Candidates</button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* STUDENTS SECTION */}
          {activeTab === 'users' && (
            <motion.div key="us" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="card border-0 shadow-sm rounded-4 overflow-hidden" style={{background: theme.card}}>
                <div className="table-responsive">
                  <table className="table mb-0" style={{color: theme.text}}>
                    <thead className="small opacity-50 bg-light bg-opacity-10">
                      <tr><th className="ps-4 py-3">Student Name</th><th>Status</th><th>Best Fit Jobs</th><th className="text-end pe-4">Action</th></tr>
                    </thead>
                    <tbody>
                      {usersList.map(u => (
                        <tr key={u.id} style={{borderColor: theme.border}}>
                          <td className="ps-4 py-3">
                            <div className="d-flex align-items-center">
                              <div className="bg-primary text-white rounded-circle me-3 d-flex align-items-center justify-content-center" style={{width:'35px', height:'35px'}}>{u.name.charAt(0)}</div>
                              <div><strong>{u.name}</strong><br/><small className="opacity-50">{u.department}</small></div>
                            </div>
                          </td>
                          <td>
                            <span 
                              onClick={() => handleTogglePlacement(u)}
                              className={`badge rounded-pill cursor-pointer ${u.placed ? 'bg-success' : 'bg-warning text-dark'}`}
                              style={{cursor: 'pointer'}}
                            >
                              {u.placed ? 'Placed' : 'Pending'}
                            </span>
                          </td>
                          <td><span className="badge bg-info-subtle text-info">{getMatchesForStudent(u).length} Roles</span></td>
                          <td className="text-end pe-4">
                            <button onClick={() => logActivity(u.name, "Viewed Profile")} className="btn text-primary btn-sm"><FiMail /></button>
                            <button className="btn text-danger btn-sm"><FiTrash2 /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* MODALS */}
      {showUserModal && (
        <Modal title="Add New Student" close={() => setShowUserModal(false)}>
          <form onSubmit={handleAddMember}>
            <input className="form-control mb-3" placeholder="Full Name" required onChange={e => setNewMember({...newMember, name: e.target.value})} />
            <input className="form-control mb-3" type="email" placeholder="Email ID" required onChange={e => setNewMember({...newMember, email: e.target.value})} />
            <select className="form-select mb-3" onChange={e => setNewMember({...newMember, department: e.target.value})}>
              <option value="CSE">CSE</option><option value="ECE">ECE</option><option value="MECH">MECH</option>
            </select>
            <input className="form-control mb-4" placeholder="Skills (React, Java, etc.)" onChange={e => setNewMember({...newMember, skills: e.target.value})} />
            <button className="btn btn-primary w-100 rounded-pill py-2">Save Student</button>
          </form>
        </Modal>
      )}

      {showJobModal && (
        <Modal title="Post New Drive" close={() => setShowJobModal(false)}>
          <form onSubmit={handleAddJob}>
            <input className="form-control mb-3" placeholder="Company Name" required onChange={e => setNewJob({...newJob, company: e.target.value})} />
            <input className="form-control mb-3" placeholder="Job Role" required onChange={e => setNewJob({...newJob, role: e.target.value})} />
            <select className="form-select mb-3" onChange={e => setNewJob({...newJob, requiredDept: e.target.value})}>
              <option value="CSE">CSE</option><option value="ECE">ECE</option><option value="MECH">MECH</option>
            </select>
            <input className="form-control mb-4" placeholder="Package (LPA)" required onChange={e => setNewJob({...newJob, package: e.target.value})} />
            <button className="btn btn-primary w-100 rounded-pill py-2">Create Drive</button>
          </form>
        </Modal>
      )}
    </div>
  );
};

// --- HELPERS ---
const TabButton = ({ active, onClick, icon, label }) => (
  <button onClick={onClick} className={`btn border-0 text-start d-flex align-items-center gap-3 p-3 rounded-3 w-100 mb-1 ${active ? 'bg-primary text-white shadow' : 'text-secondary bg-transparent'}`}>
    {icon} <span>{label}</span>
  </button>
);

const StatCard = ({ label, val, icon, color, theme }) => (
  <div className={`card border-0 shadow-sm p-4 rounded-4 h-100 border-start border-4 border-${color}`} style={{background: theme.card, color: theme.text}}>
    <div className="d-flex align-items-center gap-3">
      <div className={`p-3 rounded-circle bg-${color}-subtle text-${color}`}>{icon}</div>
      <div><h4 className="fw-bold mb-0">{val}</h4><small className="opacity-50 fw-bold">{label}</small></div>
    </div>
  </div>
);

const Modal = ({ title, children, close }) => (
  <div style={{ position: 'fixed', inset: 0, background: 'rgba(23, 21, 21, 0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000, backdropFilter: 'blur(5px)' }} onClick={close}>
    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="card border-0 p-4 rounded-4 shadow-lg" style={{ width: '400px' }} onClick={e => e.stopPropagation()}>
      <div className="d-flex justify-content-between mb-4"><h5 className="fw-bold m-0">{title}</h5><button onClick={close} className="btn btn-light rounded-circle"><FiX /></button></div>
      {children}
    </motion.div>
  </div>
);

export default AdminDashboard;
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiGrid, FiUsers, FiBriefcase, FiTrendingUp, 
  FiSearch, FiTrash2, FiUserPlus, FiActivity, FiClock, FiCheckCircle, FiX, FiPlus 
} from 'react-icons/fi';

const AdminDashboard = () => {
  // --- STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState('overview');
  const [usersList, setUsersList] = useState([]);
  const [jobsList, setJobsList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modals Toggle
  const [showUserModal, setShowUserModal] = useState(false);
  const [showJobModal, setShowJobModal] = useState(false);

  // Form States
  const [newMember, setNewMember] = useState({ name: '', email: '', role: 'Student' });
  const [newJob, setNewJob] = useState({ company: '', role: '', package: '', deadline: '' });

  // --- DATA SYNCING ---
  useEffect(() => {
    const savedUsers = localStorage.getItem('all_users');
    const savedJobs = localStorage.getItem('all_jobs');
    
    if (savedUsers) setUsersList(JSON.parse(savedUsers));
    if (savedJobs) setJobsList(JSON.parse(savedJobs));
  }, []);

  // --- HANDLERS ---
  const handleAddMember = (e) => {
    e.preventDefault();
    const updated = [{ ...newMember, id: Date.now(), placed: false }, ...usersList];
    setUsersList(updated);
    localStorage.setItem('all_users', JSON.stringify(updated));
    setShowUserModal(false);
    setNewMember({ name: '', email: '', role: 'Student' });
  };

  const handleAddJob = (e) => {
    e.preventDefault();
    const updated = [{ ...newJob, id: Date.now() }, ...jobsList];
    setJobsList(updated);
    localStorage.setItem('all_jobs', JSON.stringify(updated));
    setShowJobModal(false);
    setNewJob({ company: '', role: '', package: '', deadline: '' });
  };

  const handleDeleteUser = (id) => {
    if (window.confirm("Remove this member?")) {
      const updated = usersList.filter(u => u.id !== id);
      setUsersList(updated);
      localStorage.setItem('all_users', JSON.stringify(updated));
    }
  };

  // --- CALCULATIONS ---
  const filteredUsers = usersList.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const placementRate = usersList.length > 0 
    ? Math.round((usersList.filter(u => u.placed).length / usersList.length) * 100) 
    : 0;

  return (
    <div className="d-flex" style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      
      {/* --- SIDEBAR --- */}
      <div className="bg-dark text-white p-4 d-none d-md-block" style={{ width: '280px', position: 'sticky', top: 0, height: '100vh' }}>
        <div className="d-flex align-items-center mb-5 gap-2">
          <div className="bg-primary p-2 rounded-3"><FiGrid size={24} /></div>
          <h5 className="fw-bold mb-0">TPO ADMIN</h5>
        </div>
        <nav className="nav flex-column gap-2">
          <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon={<FiActivity />} label="Overview" />
          <TabButton active={activeTab === 'jobs'} onClick={() => setActiveTab('jobs')} icon={<FiBriefcase />} label="Manage Jobs" />
          <TabButton active={activeTab === 'users'} onClick={() => setActiveTab('users')} icon={<FiUsers />} label="Directory" />
        </nav>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-grow-1 p-4 p-md-5">
        <header className="d-flex justify-content-between align-items-center mb-5">
          <div>
            <h2 className="fw-bold mb-1">Admin Panel</h2>
            <p className="text-muted small">Welcome back, Administrator</p>
          </div>
          <div className="d-flex gap-2">
            <button onClick={() => setShowJobModal(true)} className="btn btn-outline-primary rounded-pill px-4"><FiPlus /> New Drive</button>
            <button onClick={() => setShowUserModal(true)} className="btn btn-primary rounded-pill px-4"><FiUserPlus /> Add User</button>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <motion.div key="ov" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="row g-4 mb-5">
                <div className="col-md-4"><StatCard label="Total Users" val={usersList.length} color="primary" icon={<FiUsers />} /></div>
                <div className="col-md-4"><StatCard label="Active Drives" val={jobsList.length} color="success" icon={<FiBriefcase />} /></div>
                <div className="col-md-4"><StatCard label="Placement Rate" val={`${placementRate}%`} color="info" icon={<FiTrendingUp />} /></div>
              </div>
            </motion.div>
          )}

          {/* JOBS TAB */}
          {activeTab === 'jobs' && (
            <motion.div key="jb" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h4 className="fw-bold mb-4">Recruitment Drives</h4>
              <div className="row g-4">
                {jobsList.map(job => (
                  <div key={job.id} className="col-md-6 col-lg-4">
                    <div className="card border-0 shadow-sm p-4 rounded-4 bg-white">
                      <div className="badge bg-primary-subtle text-primary mb-2 w-25">{job.package} LPA</div>
                      <h5 className="fw-bold">{job.company}</h5>
                      <p className="text-muted small">{job.role}</p>
                      <div className="border-top pt-2 mt-2 small text-secondary"><FiClock /> Deadline: {job.deadline}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* USERS TAB */}
          {activeTab === 'users' && (
            <motion.div key="us" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
                <div className="p-3 bg-light"><input type="text" className="form-control border-0 bg-white" placeholder="Search members..." onChange={(e) => setSearchTerm(e.target.value)} /></div>
                <table className="table align-middle mb-0">
                  <thead className="table-light"><tr><th className="ps-4">Member</th><th>Role</th><th className="text-end pe-4">Action</th></tr></thead>
                  <tbody>
                    {filteredUsers.map(u => (
                      <tr key={u.id}>
                        <td className="ps-4"><strong>{u.name}</strong><br/><small>{u.email}</small></td>
                        <td><span className="badge bg-primary-subtle text-primary rounded-pill">{u.role}</span></td>
                        <td className="text-end pe-4"><button onClick={() => handleDeleteUser(u.id)} className="btn text-danger"><FiTrash2 /></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- MODALS --- */}
      {showJobModal && <Modal title="Launch Drive" close={() => setShowJobModal(false)}>
        <form onSubmit={handleAddJob}>
          <input className="form-control mb-3" placeholder="Company Name" required onChange={e => setNewJob({...newJob, company: e.target.value})} />
          <input className="form-control mb-3" placeholder="Role" required onChange={e => setNewJob({...newJob, role: e.target.value})} />
          <div className="row g-2 mb-3">
            <div className="col"><input className="form-control" type="number" placeholder="LPA" required onChange={e => setNewJob({...newJob, package: e.target.value})} /></div>
            <div className="col"><input className="form-control" type="date" required onChange={e => setNewJob({...newJob, deadline: e.target.value})} /></div>
          </div>
          <button className="btn btn-primary w-100 rounded-pill">Launch</button>
        </form>
      </Modal>}

      {showUserModal && <Modal title="Add Member" close={() => setShowUserModal(false)}>
        <form onSubmit={handleAddMember}>
          <input className="form-control mb-3" placeholder="Full Name" required onChange={e => setNewMember({...newMember, name: e.target.value})} />
          <input className="form-control mb-3" type="email" placeholder="Email" required onChange={e => setNewMember({...newMember, email: e.target.value})} />
          <select className="form-select mb-4" onChange={e => setNewMember({...newMember, role: e.target.value})}>
            <option value="Student">Student</option>
            <option value="Staff">Staff</option>
          </select>
          <button className="btn btn-primary w-100 rounded-pill">Save User</button>
        </form>
      </Modal>}
    </div>
  );
};

// Sub-components for cleaner code
const TabButton = ({ active, onClick, icon, label }) => (
  <button onClick={onClick} className={`btn border-0 text-start d-flex align-items-center gap-3 p-3 rounded-3 ${active ? 'bg-primary text-white shadow' : 'text-secondary bg-transparent'}`}>
    {icon} {label}
  </button>
);

const StatCard = ({ label, val, icon, color }) => (
  <div className={`card border-0 shadow-sm p-4 rounded-4 bg-white border-start border-4 border-${color}`}>
    <div className="d-flex align-items-center gap-3">
      <div className={`p-3 rounded-circle bg-${color}-subtle text-${color}`}>{icon}</div>
      <div><h3 className="fw-bold mb-0">{val}</h3><small className="text-muted fw-bold">{label}</small></div>
    </div>
  </div>
);

const Modal = ({ title, children, close }) => (
  <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 3000, backdropFilter: 'blur(4px)' }}>
    <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="card border-0 shadow p-4 rounded-4" style={{ width: '400px' }}>
      <div className="d-flex justify-content-between mb-4"><h5 className="fw-bold mb-0">{title}</h5><button onClick={close} className="btn btn-light rounded-circle"><FiX /></button></div>
      {children}
    </motion.div>
  </div>
);

export default AdminDashboard;
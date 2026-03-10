import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiSave, FiAward, FiFileText, FiUser, 
  FiGithub, FiCpu, FiUploadCloud, FiBriefcase 
} from 'react-icons/fi';
import { FiUploadCloud as FiUploadCloudSolid } from 'react-icons/fi';

const StudentIdentity = () => {
  const navigate = useNavigate();

  // 1. STATE MANAGEMENT
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', regNo: '',
    cgpa: '', github: '', skills: '', summary: ''
  });
  
  const [resumeFile, setResumeFile] = useState(null);

  // 2. TEXT INPUT LOGIC
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. FILE UPLOAD LOGIC (REDUCED LIMIT)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    // REDUCED SIZE: Change '2' to '1' if you want a 1MB limit
    const maxSize = 2 * 1024 * 1024; // 2MB in bytes

    if (file) {
      if (file.type !== "application/pdf") {
        alert("Invalid file type. Please upload a PDF.");
        e.target.value = null;
        setResumeFile(null);
        return;
      }

      if (file.size < maxSize) {
        // Updated alert message to match the new limit
        alert("File is too large! Please upload a resume below 2MB.");
        e.target.value = null;
        setResumeFile(null);
      } else {
        setResumeFile(file);
      }
    }
  };



  // 4. NAVIGATION LOGIC (THE "MOVE")
  const handleSubmit = (e) => {
    e.preventDefault();
    // Pushes data to the next page
    navigate('/view-profile', { 
      state: { 
        studentData: formData,
        fileName: resumeFile ? resumeFile.name : 'No file uploaded'
      } 
    });
  };

  // STYLES
  const colors = {
    bg: '#0f172a',
    cardBg: '#1e293b',
    sky: '#0ea5e9',
    pink: '#d946ef',
    textMain: '#f8fafc',
    textMuted: '#94a3b8',
    inputBg: 'rgba(15, 23, 42, 0.5)'
  };

  const styles = {
    wrapper: { minHeight: '100vh', backgroundColor: colors.bg, padding: '120px 20px 60px 20px', color: colors.textMain, fontFamily: "'Inter', sans-serif" },
    formCard: { backgroundColor: colors.cardBg, borderRadius: '28px', padding: '40px', border: '1px solid rgba(255, 255, 255, 0.05)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', maxWidth: '900px', margin: '0 auto' },
    sectionTitle: { fontSize: '1.2rem', fontWeight: '700', color: colors.sky, marginBottom: '20px', marginTop: '10px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: `1px solid rgba(14, 165, 233, 0.2)`, paddingBottom: '8px' },
    inputGroup: { marginBottom: '20px', position: 'relative' },
    label: { display: 'block', color: colors.textMuted, marginBottom: '8px', fontSize: '0.85rem', fontWeight: '600' },
    input: { width: '100%', backgroundColor: colors.inputBg, border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '12px 15px 12px 45px', color: '#fff', outline: 'none' },
    textarea: { width: '100%', backgroundColor: colors.inputBg, border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '12px 15px', color: '#fff', minHeight: '100px', outline: 'none' },
    icon: { position: 'absolute', left: '15px', top: '38px', color: colors.sky, fontSize: '1.1rem' },
    btnSave: { background: `linear-gradient(90deg, ${colors.sky}, ${colors.pink})`, border: 'none', borderRadius: '14px', padding: '16px 30px', color: '#fff', fontWeight: '800', width: '100%', marginTop: '30px', cursor: 'pointer' }
  };

  return (
    <div style={styles.wrapper}>
      <div className="container shadow-lg" style={styles.formCard}>
        <div className="text-center mb-4">
          <h2 className="fw-bold">Career <span style={{color: colors.sky}}>Identity</span></h2>
        </div>

        <form onSubmit={handleSubmit}>
          {/* PERSONAL INFO */}
          <div style={styles.sectionTitle}><FiUser /> Personal Info</div>
          <div className="row">
            <div className="col-md-6" style={styles.inputGroup}>
              <label style={styles.label}>First Name</label>
              <FiUser style={styles.icon} />
              <input type="text" name="firstName" style={styles.input} onChange={handleChange} required />
            </div>
            <div className="col-md-6" style={styles.inputGroup}>
              <label style={styles.label}>Register Number</label>
              <FiFileText style={styles.icon} />
              <input type="text" name="regNo" style={styles.input} onChange={handleChange} required />
            </div>
            <div className="col-md-12" style={styles.inputGroup}>
              <label style={styles.label}>CGPA</label>
              <FiAward style={styles.icon} />
              <input type="number" step="0.01" name="cgpa" style={styles.input} onChange={handleChange} required />
            </div>
          </div>

          {/* SKILLS */}
          <div style={styles.sectionTitle}><FiBriefcase /> Expertise</div>
          <div className="col-md-12" style={styles.inputGroup}>
            <label style={styles.label}>Technical Skills</label>
            <FiCpu style={styles.icon} />
            <input type="text" name="skills" placeholder="React, Java, SQL..." style={styles.input} onChange={handleChange} />
          </div>

          {/* DYNAMIC RESUME UPLOAD SECTION */}
          <div style={styles.sectionTitle}><FiUploadCloud /> Resume Upload</div>
          <div style={{
            border: resumeFile ? '2px solid #22c55e' : '2px dashed rgba(14, 165, 233, 0.3)',
            borderRadius: '16px',
            padding: '25px',
            textAlign: 'center',
            backgroundColor: resumeFile ? 'rgba(34, 197, 94, 0.05)' : 'rgba(14, 165, 233, 0.02)',
            transition: 'all 0.3s ease'
          }}>
            {resumeFile ? (
              <FiSave size={30} style={{color: '#22c55e', marginBottom: '10px'}} />
            ) : (
              <FiUploadCloud size={30} style={{color: colors.sky, marginBottom: '10px'}} />
            )}

            <p style={{fontSize: '0.85rem', marginBottom: '5px', color: resumeFile ? '#22c55e' : colors.textMain}}>
              {resumeFile ? `Successfully Selected: ${resumeFile.name}` : "Upload PDF Resume (Below 5MB)"}
            </p>

            <input type="file" id="resume" accept=".pdf" hidden onChange={handleFileChange} />
            <label htmlFor="resume" className={`btn btn-sm rounded-pill px-4 mt-1 ${resumeFile ? 'btn-success' : 'btn-outline-info'}`} style={{cursor: 'pointer'}}>
              {resumeFile ? "Change File" : "Browse Files"}
            </label>
          </div>

          <button type="submit" style={styles.btnSave}>
            SAVE CAREER IDENTITY
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentIdentity;
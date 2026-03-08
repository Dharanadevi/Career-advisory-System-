import React, { useState } from 'react';
import { 
  FiSave, FiAward, FiBook, FiAlertCircle, FiFileText, 
  FiUser, FiCalendar, FiMapPin, FiGithub, FiLinkedin, 
  FiCpu, FiUploadCloud, FiBriefcase 
} from 'react-icons/fi';

const StudentIdentity = () => {
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
    wrapper: {
      minHeight: '100vh',
      backgroundColor: colors.bg,
      padding: '120px 20px 60px 20px',
      color: colors.textMain,
      fontFamily: "'Inter', sans-serif"
    },
    formCard: {
      backgroundColor: colors.cardBg,
      borderRadius: '28px',
      padding: '40px',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      maxWidth: '900px',
      margin: '0 auto'
    },
    sectionTitle: {
      fontSize: '1.2rem',
      fontWeight: '700',
      color: colors.sky,
      marginBottom: '20px',
      marginTop: '10px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      borderBottom: `1px solid rgba(14, 165, 233, 0.2)`,
      paddingBottom: '8px'
    },
    inputGroup: {
      marginBottom: '20px',
      position: 'relative'
    },
    label: {
      display: 'block',
      color: colors.textMuted,
      marginBottom: '8px',
      fontSize: '0.85rem',
      fontWeight: '600'
    },
    input: {
      width: '100%',
      backgroundColor: colors.inputBg,
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '12px',
      padding: '12px 15px 12px 45px',
      color: '#fff',
      transition: 'all 0.3s ease',
      outline: 'none'
    },
    textarea: {
      width: '100%',
      backgroundColor: colors.inputBg,
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '12px',
      padding: '12px 15px',
      color: '#fff',
      minHeight: '100px',
      outline: 'none'
    },
    icon: {
      position: 'absolute',
      left: '15px',
      top: '38px',
      color: colors.sky,
      fontSize: '1.1rem'
    },
    btnSave: {
      background: `linear-gradient(90deg, ${colors.sky}, ${colors.pink})`,
      border: 'none',
      borderRadius: '14px',
      padding: '16px 30px',
      color: '#fff',
      fontWeight: '800',
      width: '100%',
      marginTop: '30px',
      boxShadow: '0 10px 20px -5px rgba(217, 70, 239, 0.4)',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    }
  };

  return (
    <div style={styles.wrapper}>
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold display-6">
            Complete Your <span style={{ color: colors.sky }}>Professional</span> <span style={{ color: colors.pink }}>Profile</span>
          </h2>
          <p style={{ color: colors.textMuted }}>This information will be used to generate your AI career roadmap.</p>
        </div>

        <div style={styles.formCard}>
          <form>
            {/* --- SECTION 1: PERSONAL DETAILS --- */}
            <div style={styles.sectionTitle}><FiUser /> Personal Information</div>
            <div className="row">
              <div className="col-md-6" style={styles.inputGroup}>
                <label style={styles.label}>First Name</label>
                <FiUser style={styles.icon} />
                <input type="text" placeholder="John" style={styles.input} className="custom-input" />
              </div>
              <div className="col-md-6" style={styles.inputGroup}>
                <label style={styles.label}>Last Name</label>
                <FiUser style={styles.icon} />
                <input type="text" placeholder="Doe" style={styles.input} className="custom-input" />
              </div>
              <div className="col-md-6" style={styles.inputGroup}>
                <label style={styles.label}>Date of Birth</label>
                <FiCalendar style={styles.icon} />
                <input type="date" style={styles.input} className="custom-input" />
              </div>
              <div className="col-md-6" style={styles.inputGroup}>
                <label style={styles.label}>Register Number</label>
                <FiFileText style={styles.icon} />
                <input type="text" placeholder="22CS01" style={styles.input} className="custom-input" />
              </div>
            </div>

            {/* --- SECTION 2: ACADEMIC DETAILS --- */}
            <div style={styles.sectionTitle}><FiBook /> Academic Background</div>
            <div className="row">
              <div className="col-md-12" style={styles.inputGroup}>
                <label style={styles.label}>College Name</label>
                <FiMapPin style={styles.icon} />
                <input type="text" placeholder="Engineering College of Technology" style={styles.input} className="custom-input" />
              </div>
              <div className="col-md-4" style={styles.inputGroup}>
                <label style={styles.label}>Academic Year (No Limit)</label>
                <FiCalendar style={styles.icon} />
                {/* Changed to text input to allow any year range */}
                <input type="text" placeholder="e.g. 2022 - 2026" style={styles.input} className="custom-input" />
              </div>
              <div className="col-md-4" style={styles.inputGroup}>
                <label style={styles.label}>Current CGPA</label>
                <FiAward style={styles.icon} />
                <input type="number" step="0.01" placeholder="8.5" style={styles.input} className="custom-input" />
              </div>
              <div className="col-md-4" style={styles.inputGroup}>
                <label style={styles.label}>Active Backlogs</label>
                <FiAlertCircle style={styles.icon} />
                <input type="number" placeholder="0" style={styles.input} className="custom-input" />
              </div>
            </div>

            {/* --- SECTION 3: SOCIAL & SKILLS --- */}
            <div style={styles.sectionTitle}><FiBriefcase /> Professional Links & Skills</div>
            <div className="row">
              <div className="col-md-6" style={styles.inputGroup}>
                <label style={styles.label}>GitHub Profile</label>
                <FiGithub style={styles.icon} />
                <input type="url" placeholder="https://github.com/..." style={styles.input} className="custom-input" />
              </div>
              <div className="col-md-6" style={styles.inputGroup}>
                <label style={styles.label}>LinkedIn Profile</label>
                <FiLinkedin style={styles.icon} />
                <input type="url" placeholder="https://linkedin.com/in/..." style={styles.input} className="custom-input" />
              </div>
              <div className="col-md-12" style={styles.inputGroup}>
                <label style={styles.label}>Technical Skills (Comma separated)</label>
                <FiCpu style={styles.icon} />
                <input type="text" placeholder="React, Node.js, Python, AWS..." style={styles.input} className="custom-input" />
              </div>
              <div className="col-md-12" style={styles.inputGroup}>
                <label style={styles.label}>Professional Summary</label>
                <textarea style={styles.textarea} placeholder="Write a short bio about your career goals..." className="custom-input"></textarea>
              </div>
            </div>

            {/* --- SECTION 4: UPLOADS --- */}
            <div style={styles.sectionTitle}><FiUploadCloud /> Documents</div>
            <div className="row mt-2">
              <div className="col-md-12">
                <div style={{
                  border: '2px dashed rgba(14, 165, 233, 0.3)',
                  borderRadius: '16px',
                  padding: '30px',
                  textAlign: 'center',
                  backgroundColor: 'rgba(14, 165, 233, 0.02)'
                }}>
                  <FiUploadCloud size={40} style={{color: colors.sky, marginBottom: '15px'}} />
                  <h5 style={{fontSize: '1rem'}}>Upload Updated Resume</h5>
                  <p style={{color: colors.textMuted, fontSize: '0.8rem'}}>Accepted formats: PDF only (Max 5MB)</p>
                  <input type="file" id="resume" hidden />
                  <label htmlFor="resume" className="btn btn-sm btn-outline-info rounded-pill px-4 mt-2" style={{cursor: 'pointer'}}>
                    Browse Files
                  </label>
                </div>
              </div>
            </div>

            <button 
              type="submit"
              style={styles.btnSave}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              <FiSave className="me-2" /> SAVE CAREER IDENTITY
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .custom-input:focus {
          border-color: #0ea5e9 !important;
          box-shadow: 0 0 15px rgba(14, 165, 233, 0.15) !important;
          background-color: rgba(30, 41, 59, 0.8) !important;
        }
        input::-webkit-calendar-picker-indicator {
          filter: invert(1);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default StudentIdentity;
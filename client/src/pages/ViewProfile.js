import React from 'react';
import { 
  FiGithub, FiLinkedin, FiMail, FiMapPin, 
  FiCpu, FiBookOpen, FiStar, FiAward, FiDownload, FiEdit3,
  FiBriefcase, FiCheckCircle, FiExternalLink
} from 'react-icons/fi';

const ViewProfile = ({ studentData }) => {
  // Mock data for display - normally comes from props or API
  const profile = studentData || {
    name: "Dharanadevi",
    department: "Computer Science Engineering",
    regNo: "2026CS101",
    cgpa: "8.92",
    semester: "6th",
    interest: "MERN Stack Development",
    skills: [
      { name: "React.js", level: 95 },
      { name: "Node.js", level: 90 },
      { name: "MongoDB", level: 85 },
      { name: "Python", level: 80 }
    ],
    email: "dharanadevi@university.edu",
    projects: [
      { title: "CareerPath AI - Placement Hub", tech: "MERN Stack, OpenAI API" },
      { title: "E-Mesh Engine - Realtime Inventory", tech: "React, Socket.io, Redis" }
    ]
  };

  const calculateDashOffset = (level) => {
    const radius = 54; // Matches the circle radius in SVG
    const circumference = 2 * Math.PI * radius;
    return circumference - (level / 100) * circumference;
  };

  return (
    <div className="talent-showcase-container animate-in">
      <style>{`
        .talent-showcase-container { padding: 3rem; max-width: 1300px; margin: 0 auto; color: white; font-family: 'Outfit', sans-serif; }
        
        /* Hyper-Glass Header Card */
        .showcase-header {
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(40px) saturate(200%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 45px; padding: 4rem;
          display: flex; gap: 4rem; margin-bottom: 3rem;
          position: relative; overflow: hidden;
          box-shadow: 0 50px 100px -20px rgba(0, 0, 0, 0.8);
        }

        .showcase-header::before {
          content: 'TOP TALENT';
          position: absolute; top: 25px; right: -35px;
          background: linear-gradient(90deg, #10b981, #0ea5e9);
          color: white; padding: 6px 45px; transform: rotate(45deg);
          font-size: 0.75rem; font-weight: 900; letter-spacing: 2px;
          box-shadow: 0 5px 15px rgba(16, 185, 129, 0.3);
        }

        .image-glow-ring {
          width: 200px; height: 200px; border-radius: 60px;
          background: linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%);
          padding: 6px; box-shadow: 0 0 40px rgba(14, 165, 233, 0.5);
          transition: 0.5s;
        }
        .image-glow-ring:hover { transform: scale(1.05) rotate(-3deg); }

        .image-glow-ring img {
          width: 100%; height: 100%; border-radius: 54px;
          object-fit: cover; background: #020617;
        }

        /* Pulsing Neon Button */
        .btn-neon-glow {
          background: linear-gradient(90deg, #0ea5e9, #6366f1);
          color: white !important; font-weight: 800; text-transform: uppercase;
          letter-spacing: 2px; border-radius: 20px; padding: 16px 35px;
          border: none; transition: 0.4s;
          box-shadow: 0 10px 30px rgba(14, 165, 233, 0.4);
          animation: buttonPulse 2s infinite;
        }
        @keyframes buttonPulse { 0% { box-shadow: 0 0 0 0 rgba(14, 165, 233, 0.6); } 70% { box-shadow: 0 0 0 20px rgba(14, 165, 233, 0); } 100% { box-shadow: 0 0 0 0 rgba(14, 165, 233, 0); } }
        .btn-neon-glow:hover { transform: translateY(-5px); filter: brightness(1.1); }

        /* Animated Skill Rings */
        .skill-ring-box {
          text-align: center; position: relative;
          transition: 0.3s;
        }
        .skill-ring-box:hover { transform: translateY(-5px); }

        .skill-ring-svg { transform: rotate(-90deg); width: 120px; height: 120px; }
        .skill-ring-bg { fill: none; stroke: rgba(255,255,255,0.05); stroke-width: 8; }
        .skill-ring-progress {
          fill: none; stroke: #0ea5e9; stroke-width: 8;
          stroke-linecap: round; stroke-dasharray: 339.29; /* 2 * PI * 54 */
          transition: stroke-dashoffset 1.5s ease-in-out;
        }

        .project-card-3d {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 30px; padding: 2rem;
          transition: 0.4s;
        }
        .project-card-3d:hover {
          background: rgba(14, 165, 233, 0.08);
          border-color: #0ea5e9;
          transform: translateY(-10px) rotateX(5deg);
          box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        }

        .stat-glow-card {
          background: rgba(15, 23, 42, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 30px; padding: 2rem;
          text-align: center; transition: 0.4s;
        }
        .stat-glow-card:hover { border-color: #0ea5e9; box-shadow: 0 0 20px rgba(14, 165, 233, 0.2); }

        .connect-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white; text-decoration: none;
          padding: 15px; border-radius: 18px;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          font-weight: 600; transition: 0.3s;
        }
        .connect-btn:hover { background: rgba(14, 165, 233, 0.1); border-color: #0ea5e9; color: #0ea5e9; }
      `}</style>

      {/* Hero Showcase Header */}
      <div className="showcase-header">
        <div className="image-glow-ring">
          <img src={`https://api.dicebear.com/8.x/notionists-neutral/svg?seed=${profile.name}`} alt="Student Showcase" />
        </div>
        
        <div className="flex-grow-1 d-flex flex-column justify-content-between">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h1 className="fw-extrabold text-white mb-2" style={{ fontSize: '3rem', letterSpacing: '-1.5px' }}>{profile.name}</h1>
              <p className="text-info fw-bold mb-4 uppercase" style={{ letterSpacing: '4px' }}>{profile.interest}</p>
              <div className="d-flex gap-4 opacity-75 small text-white">
                <span><FiMail className="text-info me-2"/> {profile.email}</span>
                <span><FiMapPin className="text-info me-2"/> Coimbatore Node</span>
              </div>
            </div>
            <div className="d-flex gap-2">
              <button className="btn-neon-glow d-flex align-items-center gap-2">
                <FiDownload /> GET CV (PDF)
              </button>
            </div>
          </div>

          <div className="d-flex gap-4 mt-5">
            {profile.skills.map((skill, i) => (
              <div key={i} className="skill-ring-box">
                <svg className="skill-ring-svg" viewBox="0 0 120 120">
                  <circle className="skill-ring-bg" cx="60" cy="60" r="54" />
                  <circle 
                    className="skill-ring-progress" 
                    cx="60" cy="60" r="54" 
                    style={{ strokeDashoffset: calculateDashOffset(skill.level) }}
                  />
                </svg>
                <div className="position-absolute top-50 start-50 translate-middle">
                    <div className="fw-extrabold text-info" style={{fontSize: '1.2rem'}}>{skill.level}%</div>
                    <div className="small opacity-50 fw-bold">{skill.name.split('.')[0]}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Metrics & Content Grid */}
      <div className="row g-4">
        <div className="col-lg-8">
          {/* Key Metrics */}
          <div className="row g-4 mb-4">
            {[
              { icon: <FiAward />, label: "Verified CGPA", value: profile.cgpa },
              { icon: <FiBookOpen />, label: "Academic Term", value: profile.semester },
              { icon: <FiCheckCircle />, label: "Project Builds", value: "08+" }
            ].map((stat, idx) => (
              <div className="col-4" key={idx}>
                <div className="stat-glow-card">
                  <span className="text-info mb-2 d-block" style={{fontSize: '1.8rem'}}>{stat.icon}</span>
                  <div className="small opacity-60 mb-1">{stat.label}</div>
                  <h2 className="fw-extrabold mb-0">{stat.value}</h2>
                </div>
              </div>
            ))}
          </div>

          {/* Projects showcase */}
          <div className="glass-card p-5" style={{ borderRadius: '35px' }}>
            <h3 className="fw-bold text-white mb-4 d-flex align-items-center gap-3">
              <FiBriefcase className="text-info"/> Featured Builds
            </h3>
            <div className="row g-4">
              {profile.projects.map((project, i) => (
                <div className="col-md-6" key={i}>
                  <div className="project-card-3d h-100 d-flex flex-column justify-content-between">
                    <div>
                      <h5 className="fw-bold text-white">{project.title}</h5>
                      <p className="small text-muted">{project.tech}</p>
                    </div>
                    <a href="#" className="small text-info text-decoration-none fw-bold d-flex align-items-center gap-1 mt-3">
                      View Live Build <FiExternalLink />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Sidebar */}
        <div className="col-lg-4">
          <div className="glass-card p-5 h-100 d-flex flex-column" style={{ borderRadius: '35px' }}>
            <h4 className="fw-bold text-white mb-4 d-flex align-items-center gap-2">
              <FiCpu className="text-info"/> Connect Node
            </h4>
            <div className="d-grid gap-3">
              <a href="#" className="connect-btn">
                <FiGithub /> GITHUB REPO
              </a>
              <a href="#" className="connect-btn">
                <FiLinkedin /> LINKEDIN
              </a>
            </div>
            
            <hr className="my-5 opacity-10" />
            
            <h4 className="fw-bold text-white mb-4"><FiStar className="text-info me-2"/> Top Domain</h4>
            <div className="p-4 bg-dark rounded-4 text-center">
              <div className="fw-extrabold text-info" style={{fontSize: '1.4rem'}}>MERN Stack</div>
              <p className="small text-muted mb-0">High-performance fullstack applications</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiUser, FiShield, FiBookOpen } from 'react-icons/fi';

const Home = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const colors = {
    bg: '#0f172a',        // Midnight
    cardBg: '#1e293b',    // Dark Slate
    sky: '#0ea5e9',       // Your Sky Blue
    pink: '#d946ef',      // Your Pink/Purple
    textMain: '#f8fafc',
    textMuted: '#94a3b8'
  };

  const styles = {
    wrapper: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      backgroundColor: colors.bg,
      padding: '100px 0 60px 0',
      fontFamily: "'Inter', sans-serif",
    },
    card: (isHovered, index) => ({
      backgroundColor: colors.cardBg,
      borderRadius: '30px',
      padding: '50px 30px',
      textDecoration: 'none',
      display: 'block',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      // Alternating border colors to match the "PlaceMe" vibe
      border: isHovered 
        ? `2px solid ${index % 2 === 0 ? colors.sky : colors.pink}` 
        : '2px solid transparent',
      transform: isHovered ? 'translateY(-15px)' : 'translateY(0)',
      boxShadow: isHovered 
        ? `0 20px 40px -10px rgba(0, 0, 0, 0.5), 0 0 20px ${index % 2 === 0 ? colors.sky : colors.pink}33` 
        : '0 10px 15px -3px rgba(0, 0, 0, 0.2)',
    }),
    iconBox: (index, isHovered) => {
      const color = index % 2 === 0 ? colors.sky : colors.pink;
      return {
        width: '80px',
        height: '80px',
        borderRadius: '24px',
        backgroundColor: isHovered ? color : `${color}15`,
        color: isHovered ? '#fff' : color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 30px auto',
        fontSize: '2.4rem',
        transition: 'all 0.3s ease',
        boxShadow: isHovered ? `0 0 25px ${color}66` : 'none'
      };
    }
  };

  const portals = [
    { title: "Student", path: "/login/student", icon: <FiBookOpen />, desc: "Explore recommendations and track your CGPA roadmap." },
    { title: "Staff", path: "/login/staff", icon: <FiUser />, desc: "Monitor student metrics and department placement stats." },
    { title: "Admin", path: "/login/admin", icon: <FiShield />, desc: "Full system orchestration and security management." }
  ];

  return (
    <div style={styles.wrapper}>
      <div className="container text-center">
        <div className="mb-5">
          <h1 className="display-3 fw-bold mb-3" style={{ color: colors.textMain }}>
            <span style={{ color: colors.sky }}>🎓  Welcome to the </span>
            <span style={{ color: colors.pink }}>Career Portal</span>
          </h1>
          <p className="fs-5 mx-auto" style={{ maxWidth: '600px', color: colors.textMuted }}>
            The ultimate gateway to your professional career identity. 
            Choose your portal to begin.
          </p>
        </div>

        <div className="row g-4 justify-content-center">
          {portals.map((item, index) => (
            <div className="col-lg-4 col-md-6" key={index}>
              <Link 
                to={item.path}
                style={styles.card(hoveredIndex === index, index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div style={styles.iconBox(index, hoveredIndex === index)}>
                  {item.icon}
                </div>
                <h3 className="fw-bold mb-3" style={{ color: colors.textMain }}>{item.title} Portal</h3>
                <p className="small mb-4" style={{ color: colors.textMuted, lineHeight: '1.6' }}>{item.desc}</p>
                
                <div style={{ 
                  color: index % 2 === 0 ? colors.sky : colors.pink, 
                  fontWeight: '800',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px'
                }}>
                  ENTER <FiArrowRight />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
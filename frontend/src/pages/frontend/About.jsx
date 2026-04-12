import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Layers, Target, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../../styles/About.scss';
import aboutimg from '../../assest/me.jpeg';

const About = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    document.body.style.overflow = 'auto';
    return () => { document.body.style.overflow = 'hidden'; };
  }, []);

  const education = [
    { title: 'BS Computer Science (BSCS)', subtitle: 'Foundation in Software Engineering', desc: 'Focus on algorithms, logic, and core development concepts.' },
    { title: 'Full Stack Web & App Development', icon: '💻', subtitle: 'Professional Certification', desc: 'React, React Native, Node.js, and Modern Web Practices.' },
    { title: 'Intermediate (FSc)', subtitle: 'Pre-Engineering', desc: 'Strong analytical and mathematical background.' },
    { title: 'Matriculation', icon: '🏔️', subtitle: 'Science Foundation', desc: 'Early technical and scientific fundamentals.' }
  ];

  const experience = [
    { title: 'Full Stack Web Dev', duration: '1 Year Overall', desc: 'Focused on clean code, UI consistency, and React-based performance.' },
    { title: 'Modern Web Internship', duration: '3 Months', desc: 'Built mini-projects and improved debugging & project structuring.' },
    { title: 'React.js Internship', duration: '2 Months', desc: 'Reusable components, state management, and component architecture.' },
    { title: 'Backend Internship', duration: '2 Months', desc: 'API development, database management, and server-side logic.' }
  ];

  const departments = [
    { title: 'Web Development', icon: '💻', desc: 'Full-stack web solutions using React, Node.js, and modern tech.' },
    { title: 'App Development', icon: '📱', desc: 'Building high-performance Android & iOS mobile applications.' },
    { title: 'UI/UX Design', icon: '🎨', desc: 'Crafting creative, user-friendly layouts and brand identities.' },
    { title: 'Q/A Department', icon: '🔍', desc: 'Ensuring quality, bug-free delivery, and performance testing.' }
  ];

  const careerGoal = [
    { title: 'Team Expansion', icon: '💛', desc: 'Integrating professional Video Editors and Graphic Designers.' },
    { title: 'New Services', icon: '🚛', desc: 'Launching and managing Truck Dispatching as a parallel offering.' },
    { title: 'Business Objectives', icon: '📂', desc: 'Expanding the firm into a diverse developer group.' },
    { title: 'Future Vision', icon: '🚀', desc: 'Aiming for long-term collaborations on complex, industry-standard solutions.' }
  ];

  return (
    <div className="about-page bg-white text-dark min-vh-100 py-4 position-relative overflow-auto d-flex align-items-center">
      <div className="container py-4 flex-grow-1 text-center">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            className="fw-bold mb-3 display-5"
            style={{ color: '#fe8c00' }}
          >
            About Us
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-secondary opacity-75 small"
          >
            A central look at our collective journey, leadership, and expertise
          </motion.p>
          <motion.div 
            initial={{ width: 0 }} animate={{ width: 80 }}
            className="mx-auto mt-3 mb-5" 
            style={{ height: '3px', backgroundColor: '#fe8c00' }}
          ></motion.div>

        {/* Main Grid */}
        <div className="row g-5 align-items-stretch position-relative">
          
          {/* Background Connecting Lines */}
          <div className="position-absolute w-100 h-100 d-none d-lg-block top-0 start-0" style={{ zIndex: 0 }}>
            <svg width="100%" height="100%" viewBox="0 0 1200 800" style={{ pointerEvents: 'none' }}>
              <motion.line 
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }}
                x1="250" y1="200" x2="950" y2="600" stroke="#fe8c00" strokeWidth="1" strokeDasharray="10 5" className="opacity-20" 
              />
              <motion.line 
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }}
                x1="950" y1="200" x2="250" y2="600" stroke="#fe8c00" strokeWidth="1" strokeDasharray="10 5" className="opacity-20" 
              />
            </svg>
          </div>

        {/* Column 1: Left */}
        <div className="col-lg-4 d-flex flex-column gap-5 z-2">
          <Card title="Education" icon={<GraduationCap size={22} />} items={education} primaryColor="#fe8c00" />
          <Card title="Our Departments" icon={<Layers size={22} />} items={departments} primaryColor="#fe8c00" />
        </div>

          {/* Center: Image */}
          <div className="col-lg-4 d-flex align-items-center justify-content-center py-5">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="center-profile"
            >
              <div className="profile-glow"></div>
              <div className="image-border-fancy">
                <img 
                  src={aboutimg}
                  alt="Muhammad Sohaib" 
                  className="rounded-circle profile-shadow"
                />
              </div>
            </motion.div>
          </div>

        {/* Column 2: Right */}
        <div className="col-lg-4 d-flex flex-column gap-5 z-2">
          <Card title="Experience" icon={<Briefcase size={22} />} items={experience} primaryColor="#fe8c00" />
          <Card title="Career Goal" icon={<Target size={22} />} items={careerGoal} primaryColor="#fe8c00" />
        </div>

        </div>
      </div>

    </div>
  );
};

const Card = ({ title, icon, items, primaryColor }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
    className="about-card p-4 rounded-4"
    style={{ '--card-color': primaryColor }}
  >
    <div className="icon-container" style={{ backgroundColor: primaryColor }}>{icon}</div>
    <h3 className="h5 fw-bold text-dark mb-4 pb-3 border-bottom border-secondary border-opacity-10">{title}</h3>
    <div className="d-flex flex-column gap-4 text-start">
      {items.map((item, i) => (
        <div key={i} className="d-flex gap-3">
          <div className="li-dot"></div>
          <div className="w-100">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <span className="small fw-bold text-dark opacity-90">{item.title} {item.icon}</span>
              {item.duration && <span className="duration-badge">{item.duration}</span>}
            </div>
            {item.subtitle && <div className="x-small fw-medium mb-1" style={{ color: primaryColor }}>{item.subtitle}</div>}
            <div className="x-small text-secondary opacity-75">{item.desc}</div>
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

export default About;

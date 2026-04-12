import React from 'react';
import { motion } from 'framer-motion';
import { Home, User, Lightbulb, Briefcase, FolderRoot, Mail } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const hideNavbar = ['/about', '/portfolio', '/contact', '/services'].includes(location.pathname);

  const navItems = [
    { id: 'entrance', label: 'Entrance', icon: <Home size={20} />, color: '#10b981' },
    { id: 'about', label: 'About', icon: <User size={20} />, color: '#6366f1' },
    { id: 'skills', label: 'Skills', icon: <Lightbulb size={20} />, color: '#f59e0b' },
    { id: 'experience', label: 'Experience', icon: <Briefcase size={20} />, color: '#ec4899' },
    { id: 'projects', label: 'Projects', icon: <FolderRoot size={20} />, color: '#8b5cf6' },
    { id: 'contact', label: 'Contact', icon: <Mail size={20} />, color: '#14b8a6' },
  ];

  if (hideNavbar) return null;

  return (
    <div className="position-absolute bottom-0 start-50 translate-middle-x z-3 d-none d-md-block" style={{ marginBottom: 'clamp(2rem, 8vh, 5rem)' }}>
      <motion.div 
        className="glass-panel d-flex align-items-center gap-2 px-3 py-2"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            className="btn btn-link text-decoration-none d-flex align-items-center gap-2 rounded-pill px-3 py-2 text-dark border-0 hover-effect"
            style={{ transition: 'all 0.3s' }}
            onClick={() => window.dispatchEvent(new CustomEvent('nav-change', { detail: item.id }))}
          >
            <span style={{ color: item.color }}>{item.icon}</span>
            <span className="fw-medium d-none d-md-block">{item.label}</span>
          </button>
        ))}
      </motion.div>
      
      <style>{`
        .hover-effect:hover {
          background: rgba(255, 255, 255, 0.9);
          transform: translateY(-5px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
};

export default Navbar;

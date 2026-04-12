import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const MenuNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 'about', label: 'About Me', path: '/about' },
    { id: 'portfolio', label: 'Portfolio', path: '/portfolio' },
    { id: 'services', label: 'Services', path: '/services' },
    { id: 'contact', label: 'Contact Me', path: '/contact' },
  ];

  const hideNavbar = ['/contact'].includes(location.pathname);

  const handleNav = (item) => {
    if (item.path !== location.pathname) {
      navigate(item.path);
      // If going to home and it has a specific 3D section
      if (item.path === '/' && item.id !== 'entrance') {
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('nav-change', { detail: item.id }));
        }, 100);
      }
    } else {
      // Already on page, just trigger internal navigation if any
      window.dispatchEvent(new CustomEvent('nav-change', { detail: item.id }));
    }
    setIsOpen(false);
  };

  const isHome = location.pathname === '/';
  
  // Auto-open menu if returning from a page
  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (isHome && params.get('menu') === 'open') {
      setIsOpen(true);
      // Clean up URL without refreshing
      window.history.replaceState({}, '', '/');
    }
  }, [location, isHome]);

  const handleToggle = () => {
    if (isHome) {
      setIsOpen(true);
    } else {
      navigate('/?menu=open');
    }
  };

  return (
    <>
      <div className="position-fixed top-0 end-0 m-4 z-3">
        <button 
          className="btn btn-link text-dark p-0 border-0 outline-none hover-rotate-slight"
          onClick={handleToggle}
        >
          {isHome ? (
            <Menu size={32} strokeWidth={1} />
          ) : (
            <X size={32} strokeWidth={1.5} />
          )}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="position-fixed top-0 start-0 w-100 h-100 bg-black z-3 d-flex flex-column justify-content-center align-items-center"
              style={{ zIndex: 9999 }}
            >
              <button 
                className="position-absolute top-0 end-0 m-4 btn btn-link text-white p-0 border-0"
                onClick={() => setIsOpen(false)}
              >
                <X size={40} strokeWidth={1} />
              </button>

              <div className="d-flex flex-column gap-4 text-center">
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                    className="btn btn-link p-0 text-white text-decoration-none border-0 display-6 fw-semibold hover-teal"
                    onClick={() => handleNav(item)}
                  >
                    <span className={item.path === location.pathname ? 'text-teal' : ''}>
                      {item.label}
                    </span>
                  </motion.button>
                ))}
              </div>

            <style>{`
              .text-teal { color: #2dd4bf !important; }
              .hover-teal:hover span { color: #2dd4bf !important; transition: color 0.3s; }
              .display-6 { font-size: clamp(1.5rem, 5vw, 2.5rem); }
              .hover-rotate-slight { transition: transform 0.4s ease; }
              .hover-rotate-slight:hover { transform: rotate(90deg); }
            `}</style>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MenuNavbar;

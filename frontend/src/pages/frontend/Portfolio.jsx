import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Portfolio.scss';

// Import local assets
import plantImg from '../../assest/plant.png';
import todoImg from '../../assest/todo.png';
import healthImg from '../../assest/health.png';

const Portfolio = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    window.addEventListener('resize', handleResize);
    document.body.style.overflow = 'hidden';
    return () => { 
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = 'auto'; 
    };
  }, []);

  const projects = [
    {
      id: 1,
      title: 'PLANT AI - Disease Detection Model',
      category: 'ARTIFICIAL INTELLIGENCE',
      date: 'OCTOBER 2023',
      image: plantImg,
      color: '#005b63'
    },
    {
      id: 2,
      title: 'TASKMASTER - To-Do & Productivity App',
      category: 'PRODUCTIVITY APP',
      date: 'JANUARY 2024',
      image: todoImg,
      color: '#0c121c'
    },
    {
      id: 3,
      title: 'SMARTHEATH - AI Healthcare Assistant',
      category: 'HEALTHCARE / ML',
      date: 'MARCH 2024',
      image: healthImg,
      color: '#0025ae'
    }
  ];

  const handleNext = () => setCurrentIndex((prev) => prev + 1);
  const handlePrev = () => setCurrentIndex((prev) => prev - 1);

  // Helper to get real index from virtual index
  const getRealIndex = (vi) => {
    const n = projects.length;
    return ((vi % n) + n) % n;
  };

  const activeProject = projects[getRealIndex(currentIndex - 1)];

  // Dynamic values for responsiveness
  const cardWidth = isMobile ? window.innerWidth * 0.9 : 950;
  const cardGap = isMobile ? window.innerWidth * 1.0 : 1100;

  return (
    <div className="portfolio-perfect bg-white text-dark min-vh-100 position-relative overflow-hidden d-flex flex-column">
      {/* Removed grain overlay for maximum clarity as requested */}

      {/* Gallery Section - Unified Smooth Slider */}
      <div className="gallery-section flex-grow-1 d-flex align-items-center bg-white px-0 overflow-hidden">
        <motion.div 
          animate={{ x: -(currentIndex - 1) * cardGap }}
          transition={{ type: 'tween', duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="d-flex w-100 align-items-center justify-content-center position-relative" 
          style={{ height: isMobile ? '350px' : '500px' }}
        >
          {/* Render a large buffer of projects to the left and right */}
          {Array.from({ length: 21 }, (_, i) => i - 10).map((offset) => {
            const virtualIdx = currentIndex + offset;
            const project = projects[getRealIndex(virtualIdx - 1)];
            
            return (
              <div 
                key={virtualIdx}
                className="project-card-cinematic rounded-0 overflow-hidden shadow-sm border bg-white"
                style={{ 
                  minWidth: `${cardWidth}px`, 
                  height: isMobile ? '300px' : '500px', 
                  position: 'absolute',
                  left: '50%',
                  transform: `translateX(calc(-50% + ${ (virtualIdx - 1) * cardGap }px))`,
                  opacity: currentIndex === virtualIdx ? 1 : 0.3,
                  scale: currentIndex === virtualIdx ? 1 : 0.8,
                  zIndex: currentIndex === virtualIdx ? 10 : 1,
                  transition: 'opacity 1.2s ease, transform 1.2s ease, scale 1.2s ease'
                }}
              >
                  <img src={project.image} className="w-100 h-100 object-fit-contain p-4" alt={project.title} />
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Showcase Footer (Rigid Split) */}
      <div className="showcase-footer border-top d-flex" style={{ height: '38vh', minHeight: '320px', backgroundColor: '#f9f9f9' }}>
        <div className="sidebar-label-vertical border-end d-none d-lg-flex align-items-center justify-content-center px-4">
            <span className="vertical-text-label small fw-bold tracking-extreme opacity-25 uppercase">PORTFOLIO</span>
        </div>

        <div className="main-info-area bg-white flex-grow-1 p-5 d-flex flex-column justify-content-center">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <span className="text-orange-premium fw-bold small tracking-widest uppercase">{activeProject.category}</span>
                <span className="text-secondary small opacity-50 fw-semibold">{activeProject.date}</span>
            </div>
            
            <h1 className="project-title-refined fw-bold tracking-tighter text-dark mb-5">
                {activeProject.title}
            </h1>

            <div className="d-flex">
                <motion.button 
                    whileHover={{ scale: 1.02, x: 8 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-view-premium rounded-pill d-flex align-items-center gap-4 px-5 py-3 fw-bold"
                    onClick={() => navigate('/')}
                >
                    VIEW PROJECT 
                    <div className="arrow-box-nav bg-black rounded-circle d-flex align-items-center justify-content-center">
                        <ArrowRight size={20} color="white" />
                    </div>
                </motion.button>
            </div>
        </div>

        <div className="controls-footer-box p-5 d-flex align-items-center justify-content-center" style={{ width: '380px', backgroundColor: '#f4f4f4' }}>
            <div className="premium-nav-pill bg-white shadow-sm border rounded-pill px-4 py-3 d-flex align-items-center gap-4">
                <span className="small fw-bold opacity-30 tracking-widest no-wrap">{getRealIndex(currentIndex - 1) + 1} / {projects.length}</span>
                <div className="d-flex gap-2">
                    <button onClick={handlePrev} className="nav-btn-circle"><ArrowLeft size={18} /></button>
                    <button onClick={handleNext} className="nav-btn-circle"><ArrowRight size={18} /></button>
                </div>
            </div>
        </div>
      </div>

    </div>
  );
};

export default Portfolio;

import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Environment, Float, ContactShadows } from '@react-three/drei';
import Scene from './Scene';

const Home = () => {
  const [currentSection, setCurrentSection] = useState('entrance');

  useEffect(() => {
    const handleNav = (e) => setCurrentSection(e.detail);
    window.addEventListener('nav-change', handleNav);
    return () => window.removeEventListener('nav-change', handleNav);
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#e2e8f0', overflow: 'hidden', position: 'relative' }}>
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={50} />
        
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1} 
          castShadow 
          shadow-mapSize={[1024, 1024]} 
        />
        
        <Scene />
        
        <Environment preset="city" />
        <ContactShadows 
          position={[0, -2, 0]} 
          opacity={0.4} 
          scale={20} 
          blur={2} 
          far={4.5} 
        />
      </Canvas>
      
      {/* Absolute 2D Overlay Branding */}
      <div className="position-absolute z-2" style={{ top: 'clamp(0.4rem, 3vh, 2rem)', left: 'clamp(1.5rem, 5vw, 4rem)', maxWidth: '95%' }}>
        <h1 className="fw-bold text-dark m-0" style={{ 
          letterSpacing: '-1px', 
          lineHeight: '1.2',
          fontSize: 'clamp(1.2rem, 5vw, 2.8rem)',
          whiteSpace: 'nowrap'
        }}>
          Muhammad <span style={{ color: '#fe8c00' }}>Sohaib</span>
        </h1>
        <p className="fw-medium mt-1" style={{ 
          color: '#475569', 
          letterSpacing: '0.5px', 
          fontSize: 'clamp(0.65rem, 2.5vw, 0.95rem)',
          maxWidth: '100%',
          opacity: 0.9
        }}>
          Software Engineer & AI Developer
        </p>
      </div>

      {currentSection !== 'projects' && (
        <div className="position-absolute start-50 translate-middle-x text-center text-secondary z-1" style={{ fontSize: '0.75rem', opacity: 0.6, bottom: '100px' }}>
          Drag to look around • Scroll to zoom • Click items to interact
        </div>
      )}
    </div>
  );
};

export default Home;

import React from 'react';
import { Float, Text } from '@react-three/drei';

const BrandingWall = ({ isEnt, isMobile, currentSection, setHovered, setCurrentSection, controlsRef }) => {
  if (!['entrance', 'skills'].includes(currentSection)) return null;

  return (
    <group 
      position={[0, isEnt ? 2.0 : 1.8, -4.95]} 
      onPointerOver={() => setHovered('home')} 
      onPointerOut={() => setHovered(null)} 
      onClick={() => { 
        if (controlsRef.current) { 
          controlsRef.current.reset(); 
          controlsRef.current.update(); 
        } 
        setCurrentSection('entrance'); 
      }}
    >
      <mesh receiveShadow>
        <boxGeometry args={[12, 6, 0.05]} />
        <meshStandardMaterial color="#ffffff" opacity={0.6} transparent />
      </mesh>
      
      <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.1}>
        <Text 
          position={[0, isEnt ? 1.4 : 0.8, 0.1]} 
          fontSize={isEnt ? 0.8 : 0.7} 
          color="#020617" 
          fontStyle="bold" 
          maxWidth={isMobile ? 6 : 10} 
          letterSpacing={-0.01}
        >
          Muhammad Sohaib
        </Text>
        <Text 
          position={[0, isEnt ? 0.4 : 0.1, 0.1]} 
          fontSize={isEnt ? 0.3 : 0.25} 
          color="#fe8c00" 
          letterSpacing={0.15}
        >
          Software Engineer & AI Developer
        </Text>
      </Float>

      <Text 
        position={[0, -0.6, 0.1]} 
        fontSize={isEnt ? 0.14 : 0.14} 
        color="#64748b" 
        maxWidth={isMobile ? 5 : 8} 
        textAlign="center"
      >
        I craft high-performance building blocks for the future.
      </Text>
    </group>
  );
};

export default BrandingWall;

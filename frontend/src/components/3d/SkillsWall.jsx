import React from 'react';
import { Float, Text } from '@react-three/drei';

const SkillsWall = ({ isEnt, isMobile, currentSection, setHovered, setCurrentSection }) => {
  if (!['entrance', 'skills'].includes(currentSection)) return null;

  return (
    <group 
      position={[0, isEnt ? 0.6 : 0.4, -4.9]} 
      onPointerOver={() => setHovered('skills')} 
      onPointerOut={() => setHovered(null)} 
      onClick={() => setCurrentSection('skills')}
    >
      {['React', 'Node.js', 'FastAPI', 'Python', 'Agentic AI'].map((skill, i) => (
        <group key={skill} position={[(i - 2) * (isEnt ? (isMobile ? 1.2 : 1.8) : 1.5), 0, 0.8]}>
          <Float speed={2} rotationIntensity={0.4} floatIntensity={0.5}>
            <Text 
              fontSize={isEnt ? (isMobile ? 0.2 : 0.32) : 0.24} 
              color="#fe8c00" 
              anchorX="center" 
              anchorY="middle" 
              fontStyle="bold"
            >
              {skill}
            </Text>
          </Float>
        </group>
      ))}
    </group>
  );
};

export default SkillsWall;

import React from 'react';
import { Float, Text } from '@react-three/drei';

const ProjectsWall = ({ isEnt, currentSection, setHovered, setCurrentSection }) => {
  if (!['entrance', 'projects'].includes(currentSection)) return null;

  return (
    <group 
      position={[6.9, isEnt ? 1.2 : 0.75, 1]} 
      rotation={[0, -Math.PI / 2, 0]} 
      onPointerOver={() => setHovered('proj')} 
      onPointerOut={() => setHovered(null)} 
      onClick={() => setCurrentSection('projects')}
    >
      <Text position={[0, isEnt ? 1.8 : 0.65, 0]} fontSize={isEnt ? 0.2 : 0.1} color="#fe8c00">Muhammad Sohaib</Text>
      <Text position={[0, isEnt ? 1.3 : 0.42, 0]} fontSize={isEnt ? 0.35 : 0.18} color="#1e293b" fontStyle="bold">Projects</Text>
      {[
        'Agentic AI Platform', 'Next-Gen Portfolio', 'Smart Logistics System'
      ].map((p, i) => (
        <group key={i} position={[0, (isEnt ? 0.3 - i * 0.32 : 0.15 - i * 0.18), 0]}>
          <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
            <Text position={[0, 0, 0.03]} fontSize={isEnt ? 0.12 : 0.06} color="#0f172a" anchorX="center" anchorY="middle" fontStyle="bold">{p}</Text>
          </Float>
        </group>
      ))}
    </group>
  );
};

export default ProjectsWall;

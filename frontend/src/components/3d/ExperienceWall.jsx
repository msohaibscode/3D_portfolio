import React from 'react';
import { Float, Text } from '@react-three/drei';

const ExperienceWall = ({ isEnt, currentSection, setHovered, setCurrentSection }) => {
  if (!['entrance', 'experience'].includes(currentSection)) return null;

  return (
    <group 
      position={[6.9, isEnt ? 1.2 : 0.75, -2]} 
      rotation={[0, -Math.PI / 2, 0]} 
      onPointerOver={() => setHovered('exp')} 
      onPointerOut={() => setHovered(null)} 
      onClick={() => setCurrentSection('experience')}
    >
      <Text position={[0, isEnt ? 1.8 : 0.65, 0]} fontSize={isEnt ? 0.2 : 0.1} color="#fe8c00">Muhammad Sohaib</Text>
      <Text position={[0, isEnt ? 1.3 : 0.42, 0]} fontSize={isEnt ? 0.35 : 0.18} color="#1e293b" fontStyle="bold">Experience</Text>
      {[
        { title: 'Full Stack AI Developer', company: 'Innovation Hub', date: '2022 - PRESENT' },
        { title: 'Modern Web Engineer', company: 'Global Tech', date: '2020 - 2022' }
      ].map((exp, i) => (
        <group key={i} position={[0, (isEnt ? 0.2 - i * 0.5 : 0.1 - i * 0.3), 0]}>
          <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.1}>
            <Text position={[0, isEnt ? 0.18 : 0.02, 0.03]} fontSize={isEnt ? 0.14 : 0.065} color="#1e293b" anchorX="center" anchorY="middle" fontStyle="bold">{exp.title}</Text>
            <Text position={[0, isEnt ? 0 : -0.045, 0.03]} fontSize={isEnt ? 0.09 : 0.042} color="#475569" anchorX="center" anchorY="middle">{exp.company}{isEnt ? '\n' : ' - '}{exp.date}</Text>
          </Float>
        </group>
      ))}
    </group>
  );
};

export default ExperienceWall;

import React from 'react';
import { Float, Text } from '@react-three/drei';

const AboutWall = ({ isEnt, currentSection, setHovered, setCurrentSection }) => {
  if (!['entrance', 'about'].includes(currentSection)) return null;

  return (
    <group 
      position={[-6.9, isEnt ? 1.2 : 1.2, -1]} 
      rotation={[0, Math.PI / 2, 0]} 
      onPointerOver={() => setHovered('about')} 
      onPointerOut={() => setHovered(null)} 
      onClick={() => setCurrentSection('about')}
    >
      <Text position={[0, isEnt ? 0.6 : 0.45, 0]} fontSize={isEnt ? 0.25 : 0.15} color="#0f172a" anchorX="center" anchorY="middle" fontStyle="bold">About Journey</Text>
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
        <Text position={[0, isEnt ? 0.18 : 0, 0]} fontSize={isEnt ? 0.1 : 0.08} color="#475569" maxWidth={isEnt ? 2.5 : 1.8} textAlign="center" anchorX="center" anchorY="middle">
          A software architect driven by complex challenges and clean code, specialized in scalable enterprise-grade solutions.
        </Text>
      </Float>
      
      {/* Wall Clock */}
      <group position={[2.5, 1.4, 0.1]} visible={isEnt}>
        <mesh><cylinderGeometry args={[0.3, 0.3, 0.04]} rotation={[Math.PI/2, 0, 0]} /><meshStandardMaterial color="#ffffff" emissive="#fe8c00" emissiveIntensity={0.2} /></mesh>
        <mesh position={[0, 0, 0.025]} rotation={[Math.PI/2, 0, 0]}><cylinderGeometry args={[0.26, 0.26, 0.01]} /><meshStandardMaterial color="#000000" wireframe /></mesh>
        <mesh position={[0, 0.08, 0.03]} rotation={[0, 0, Math.PI/6]}><boxGeometry args={[0.01, 0.18, 0.01]} /><meshStandardMaterial color="#1e293b" /></mesh>
        <mesh position={[0.08, 0, 0.03]} rotation={[0, 0, Math.PI/2]}><boxGeometry args={[0.01, 0.15, 0.01]} /><meshStandardMaterial color="#fe8c00" /></mesh>
      </group>

      <group position={[-2.5, 0.4, 0]} visible={isEnt}>
        {[{ label: 'ACCELERATE', color: '#fe8c00', icon: '🚀' }, { label: 'OPTIMIZE', color: '#fe8c00', icon: '⚡' }, { label: 'INNOVATE', color: '#fe8c00', icon: '💡' }].map((item, i) => (
          <group key={i} position={[0, 0.6 - i * 0.6, 0]}>
            <mesh><sphereGeometry args={[0.08, 16, 16]} /><meshStandardMaterial color={item.color} emissive={item.color} emissiveIntensity={0.5} /></mesh>
            <Text position={[0.2, 0, 0]} fontSize={0.08} color="#475569" anchorX="left" fontStyle="bold">{item.label}</Text>
            <Text position={[0, 0.15, 0]} fontSize={0.12} color="#1e293b">{item.icon}</Text>
          </group>
        ))}
      </group>
    </group>
  );
};

export default AboutWall;

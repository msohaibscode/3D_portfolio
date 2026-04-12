import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text, Float, RoundedBox, MeshReflectorMaterial, useCursor, OrbitControls, Sparkles, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';

const Scene = () => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);
  const [currentSection, setCurrentSection] = useState('entrance');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const controlsRef = useRef();
  const { size } = useThree();
  useCursor(hovered);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    const handleNav = (e) => setCurrentSection(e.detail);
    window.addEventListener('nav-change', handleNav);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('nav-change', handleNav);
    };
  }, [size]);

  const getTargets = (section) => {
    const aspect = size.width / size.height;
    const isMobile = aspect < 1;
    const entranceDist = isMobile ? 13 / aspect : 14;
    const targets = {
      entrance: { pos: [0, 2, Math.min(26, Math.max(14, entranceDist))], look: [0, 2, 0] },
      about: { pos: [-3.8, 1.4, -1], look: [-6.9, 1.4, -1] },
      skills: { pos: [0, 1.8, isMobile ? 3.5 : 1], look: [0, 1.5, -4.9] },
      experience: { pos: [3.1, 1.4, -3], look: [6.9, 1.4, -3] },
      projects: { pos: [3.1, 1.4, 0], look: [6.9, 1.4, 0] },
      contact: { pos: [3.1, 1.4, 3], look: [6.9, 1.4, 3] },
    };
    return targets[section] || targets.entrance;
  };

  useFrame((state) => {
    const t = getTargets(currentSection);
    const lerpSpeed = 0.08;
    state.camera.position.lerp(new THREE.Vector3(...t.pos), lerpSpeed);
    if (controlsRef.current) {
      controlsRef.current.target.lerp(new THREE.Vector3(...t.look), lerpSpeed);
      controlsRef.current.update();
    }
  });

  const isEnt = currentSection === 'entrance';

  return (
    <>
      <OrbitControls 
        ref={controlsRef}
        enableZoom={isEnt} 
        enablePan={false} 
        enableRotate={true}
        minDistance={5}
        maxDistance={25}
        maxPolarAngle={Math.PI}
        minPolarAngle={0}
        minAzimuthAngle={-Infinity}
        maxAzimuthAngle={Infinity}
        target={[0, 2, 0]}
      />

      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={200} scale={[20, 20, 20]} size={2} speed={0.5} opacity={0.3} color="#fe8c00" />

      {/* Main Room Structure */}
      <group>
        {/* Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
          <planeGeometry args={[100, 100]} />
          <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={1024}
            mixBlur={1}
            mixStrength={40}
            roughness={1}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#f1f5f9"
            metalness={0.5}
          />
        </mesh>

        {/* Walls */}
        <mesh position={[0, 3, -5]} receiveShadow>
          <boxGeometry args={[14, 10, 0.1]} />
          <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.5} />
        </mesh>
        {/* Right Wall */}
        <mesh position={[7, 2.5, 0]} receiveShadow>
          <boxGeometry args={[0.1, 6, 12]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.1} />
        </mesh>
        {/* Left Wall */}
        <mesh position={[-7, 2.5, 0]} receiveShadow>
          <boxGeometry args={[0.1, 6, 12]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.1} />
        </mesh>
        <mesh position={[-7, 3, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
          <boxGeometry args={[10, 10, 0.1]} />
          <meshStandardMaterial color="#f8fafc" />
        </mesh>
        <mesh position={[7, 3, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
          <boxGeometry args={[10, 10, 0.1]} />
          <meshStandardMaterial color="#f8fafc" />
        </mesh>
      </group>

      {/* Back Wall - Branding */}
      <group 
        position={[0, isEnt ? 2.5 : 1.8, -4.95]} 
        visible={currentSection === 'entrance' || currentSection === 'skills'} 
        onPointerOver={() => setHovered('home')} 
        onPointerOut={() => setHovered(null)} 
        onClick={() => { if (controlsRef.current) { controlsRef.current.reset(); controlsRef.current.update(); } setCurrentSection('entrance'); }}
        scale={hovered === 'home' ? 1.02 : 1}
      >
        <mesh receiveShadow><boxGeometry args={[12, 6, 0.05]} /><meshStandardMaterial color="#ffffff" opacity={0.6} transparent /></mesh>
        
        <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.1}>
          <Text position={[0, isEnt ? 1.5 : 0.8, 0.1]} fontSize={isEnt ? 0.72 : 0.7} color="#020617" fontStyle="bold" maxWidth={isMobile ? 6 : 10} letterSpacing={0.02}>Muhammad Sohaib</Text>
          <Text position={[0, isEnt ? 0.6 : 0.1, 0.1]} fontSize={isEnt ? 0.28 : 0.25} color="#fe8c00" letterSpacing={0.18}>Software Engineer & AI Developer</Text>
        </Float>

        <Text position={[0, isEnt ? -0.3 : -0.6, 0.1]} fontSize={isEnt ? 0.2 : 0.14} color="#64748b" maxWidth={isMobile ? 5 : 8} textAlign="center">I craft high-performance building blocks for the future.</Text>
      </group>

      {/* Back Wall - Skills */}
      <group 
        position={[0, isEnt ? 0.6 : 0.4, -4.8]} 
        visible={currentSection === 'entrance' || currentSection === 'skills'} 
        onPointerOver={() => setHovered('skills')} 
        onPointerOut={() => setHovered(null)} 
        onClick={() => setCurrentSection('skills')}
        scale={hovered === 'skills' ? 1.05 : 1}
      >
        {/* Reinforced Hitbox for Priority Clicking */}
        <mesh visible={false} position={[0, 1, 1.2]} onClick={(e) => { e.stopPropagation(); setCurrentSection('skills'); }}>
          <planeGeometry args={[12, 6]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
        
        {['React', 'Node.js', 'FastAPI', 'Python', 'Agentic AI'].map((skill, i) => (
          <group key={skill} position={[(i - 2) * (isEnt ? (isMobile ? 1.2 : 1.8) : 1.5), 0, 0.8]} onClick={(e) => { e.stopPropagation(); setCurrentSection('skills'); }}>
            <Float speed={2} rotationIntensity={0.4} floatIntensity={0.5}>
              <Text fontSize={isEnt ? (isMobile ? 0.22 : 0.42) : 0.24} color="#fe8c00" anchorX="center" anchorY="middle" fontStyle="bold">{skill}</Text>
            </Float>
          </group>
        ))}
      </group>

      {/* Right Wall - Experience */}
      <group 
        position={[6.9, isEnt ? 2.5 : 1.4, -3]} rotation={[0, -Math.PI / 2, 0]} 
        visible={currentSection === 'entrance' || currentSection === 'experience'} 
        onPointerOver={() => setHovered('exp')} 
        onPointerOut={() => setHovered(null)} 
        onClick={() => setCurrentSection('experience')}
        scale={hovered === 'exp' ? 1.03 : 1}
      >
        <Text 
          position={[0, isEnt ? 1.4 : 0.9, 0]} 
          fontSize={isEnt ? 0.18 : 0.32} 
          color={isEnt ? "#475569" : "#fe8c00"} 
          letterSpacing={0.05}
          fontStyle="bold"
        >
          Muhammad Sohaib
        </Text>
        <Text 
          position={[0, isEnt ? 1.0 : 0.4, 0]} 
          fontSize={isEnt ? 0.32 : 0.32} 
          color="#1e293b" 
          fontStyle="bold"
        >
          Experience
        </Text>
        {[
          { title: 'Full Stack AI Developer', company: 'Innovation Hub', date: '2022 - PRESENT' },
          { title: 'Modern Web Engineer', company: 'Global Tech', date: '2020 - 2022' }
        ].map((exp, i) => (
          <group key={i} position={[0, (isEnt ? 0.2 - i * 0.85 : -0.15 - i * 0.75), 0]}>
            <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.1}>
              <Text position={[0, isEnt ? 0.26 : 0, 0.03]} fontSize={isEnt ? 0.16 : 0.22} color="#1e293b" anchorX="center" anchorY="middle" fontStyle="bold">{exp.title}</Text>
              <Text position={[0, isEnt ? -0.02 : -0.22, 0.03]} fontSize={isEnt ? 0.1 : 0.15} color="#475569" anchorX="center" anchorY="middle">{exp.company}{isEnt ? '\n' : ' • '}{exp.date}</Text>
            </Float>
          </group>
        ))}
      </group>

      {/* Right Wall - Projects */}
      <group 
        position={[6.9, isEnt ? 2.5 : 1.4, 0]} rotation={[0, -Math.PI / 2, 0]} 
        visible={currentSection === 'entrance' || currentSection === 'projects'} 
        onPointerOver={() => setHovered('proj')} 
        onPointerOut={() => setHovered(null)} 
        onClick={() => setCurrentSection('projects')}
        scale={hovered === 'proj' ? 1.03 : 1}
      >
        <Text 
          position={[0, isEnt ? 1.4 : 0.9, 0]} 
          fontSize={isEnt ? 0.18 : 0.32} 
          color={isEnt ? "#475569" : "#fe8c00"} 
          letterSpacing={0.05}
          fontStyle="bold"
        >
          Muhammad Sohaib
        </Text>
        <Text 
          position={[0, isEnt ? 1.0 : 0.4, 0]} 
          fontSize={isEnt ? 0.35 : 0.32} 
          color="#1e293b" 
          fontStyle="bold"
        >
          Projects
        </Text>
        {[
          'Agentic AI Platform', 'Next-Gen Portfolio', 'Smart Logistics System'
        ].map((p, i) => (
          <group key={i} position={[0, (isEnt ? 0.25 - i * 0.6 : -0.1 - i * 0.5), 0]}>
            <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
              <Text position={[0, 0, 0.03]} fontSize={isEnt ? 0.15 : 0.22} color="#0f172a" anchorX="center" anchorY="middle" fontStyle="bold">{p}</Text>
            </Float>
          </group>
        ))}
      </group>

      {/* Left Wall - About */}
      <group 
        position={[-6.9, isEnt ? 2.5 : 1.4, -1]} rotation={[0, Math.PI / 2, 0]} 
        visible={currentSection === 'entrance' || currentSection === 'about'} 
        onPointerOver={() => setHovered('about')} 
        onPointerOut={() => setHovered(null)} 
        onClick={() => setCurrentSection('about')}
        scale={hovered === 'about' ? 1.03 : 1}
      >
        <Text 
          position={[0, isEnt ? 1.4 : 0.65, 0]} 
          fontSize={isEnt ? 0.35 : 0.5} 
          color={isEnt ? "#0f172a" : "#fe8c00"} 
          anchorX="center" 
          anchorY="middle" 
          fontStyle="bold"
        >
          About Me
        </Text>
        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
          <Text 
            position={[0, isEnt ? 0.6 : -0.35, 0]} 
            fontSize={isEnt ? 0.16 : 0.22} 
            color="#475569" 
            maxWidth={isEnt ? 2.8 : 4.8} 
            textAlign="center" 
            anchorX="center" 
            anchorY="middle" 
            lineHeight={1.7}
          >
            A software architect driven by complex challenges and clean code, specialized in scalable enterprise-grade solutions.
          </Text>
        </Float>
        
        {/* Wall Clock */}
        <group position={[2.5, 1.4, 0.1]} visible={isEnt}>
          <mesh><cylinderGeometry args={[0.3, 0.3, 0.04]} rotation={[Math.PI/2, 0, 0]} /><meshStandardMaterial color="#ffffff" emissive="#fe8c00" emissiveIntensity={0.2} /></mesh>
          <mesh position={[0, 0, 0.025]} rotation={[Math.PI/2, 0, 0]}><cylinderGeometry args={[0.26, 0.26, 0.01]} /><meshStandardMaterial color="#000000" wireframe /></mesh>
          <mesh position={[0, 0.08, 0.03]} rotation={[0, 0, Math.PI/6]}><boxGeometry args={[0.01, 0.18, 0.01]} /><meshStandardMaterial color="#1e293b" /></mesh>
          <mesh position={[0.8, 0, 0.03]} rotation={[0, 0, Math.PI/2]}><boxGeometry args={[0.01, 0.15, 0.01]} /><meshStandardMaterial color="#fe8c00" /></mesh>
        </group>

        <group position={[-2.5, 1.0, 0]} visible={isEnt}>
          {[{ label: 'ACCELERATE', color: '#fe8c00', icon: '🚀' }, { label: 'OPTIMIZE', color: '#fe8c00', icon: '⚡' }, { label: 'INNOVATE', color: '#fe8c00', icon: '💡' }].map((item, i) => (
            <group key={i} position={[0, 0.6 - i * 0.6, 0]}>
              <mesh><sphereGeometry args={[0.08, 16, 16]} /><meshStandardMaterial color={item.color} emissive={item.color} emissiveIntensity={0.5} /></mesh>
              <Text position={[0.2, 0, 0]} fontSize={0.08} color="#475569" anchorX="left" fontStyle="bold">{item.label}</Text>
              <Text position={[0, 0.15, 0]} fontSize={0.12} color="#1e293b">{item.icon}</Text>
            </group>
          ))}
        </group>
      </group>

      {/* Right Wall - Contact (Side Wall) */}
      <group 
        position={[6.9, isEnt ? 2.5 : 1.4, 3]} rotation={[0, -Math.PI / 2, 0]} 
        visible={currentSection === 'entrance' || currentSection === 'contact'} 
        onPointerOver={() => setHovered('contact')} 
        onPointerOut={() => setHovered(null)} 
        onClick={() => setCurrentSection('contact')}
        scale={hovered === 'contact' ? 1.03 : 1}
      >
        {/* Infinite Backdrop Plane - ONLY visible when focused on Contact */}
        {!isEnt && currentSection === 'contact' && (
          <mesh position={[0, 0, -0.1]}>
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.1} />
          </mesh>
        )}
        <Text 
          position={[0, isEnt ? 1.4 : 1.05, 0]} 
          fontSize={isEnt ? 0.18 : 0.32} 
          color={isEnt ? "#475569" : "#fe8c00"} 
          letterSpacing={0.05}
          fontStyle="bold"
          onClick={() => setCurrentSection('contact')}
        >
          Muhammad Sohaib
        </Text>
        <Text 
          position={[0, isEnt ? 1.0 : 0.6, 0]} 
          fontSize={isEnt ? 0.35 : 0.32} 
          color="#1e293b" 
          fontStyle="bold"
          onClick={() => setCurrentSection('contact')}
        >
          Get In Touch
        </Text>
        {[
          { label: 'GitHub', icon: '🔗' },
          { label: 'LinkedIn', icon: '💼' },
          { label: 'Email', icon: '📧' }
        ].map((item, i) => (
          <group 
            key={i} 
            position={[0, (isEnt ? 0.25 - i * 0.6 : 0.1 - i * 0.5), 0]} 
            onClick={(e) => { 
              e.stopPropagation(); 
              if (isEnt) setCurrentSection('contact');
              else console.log(`Opening Link: ${item.label}`); 
            }}
          >
            <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
              <Text position={[0, 0, 0.03]} fontSize={isEnt ? 0.12 : 0.22} color="#0f172a" anchorX="center" anchorY="middle" fontStyle="bold">
                {item.icon} {item.label}
              </Text>
            </Float>
          </group>
        ))}
      </group>
      <group position={[0, -2, -3.5]}>
        <RoundedBox args={[4, 0.2, 2]} radius={0.05} position={[0, 0.1, 0]}>
          <meshStandardMaterial color="#ffffff" metalness={0.2} roughness={0.1} />
        </RoundedBox>
        <RoundedBox args={[0.1, 1.2, 0.2]} radius={0.02} position={[-1.8, -0.6, 0.5]}>
          <meshStandardMaterial color="#e2e8f0" />
        </RoundedBox>
        <RoundedBox args={[0.1, 1.2, 0.2]} radius={0.02} position={[1.8, -0.6, 0.5]}>
          <meshStandardMaterial color="#e2e8f0" />
        </RoundedBox>

        {/* Monitors */}
        <group position={[0, 1.2, -0.2]}>
          <RoundedBox args={[2.2, 1.2, 0.1]} radius={0.05} rotation={[-0.1, 0, 0]}>
            <meshStandardMaterial color="#0f172a" emissive="#fe8c00" emissiveIntensity={0.1} />
          </RoundedBox>
          <mesh position={[0, 0, 0.051]}>
            <planeGeometry args={[2.1, 1.1]} />
            <meshStandardMaterial color="#111" />
          </mesh>
        </group>

        {/* Laptop (Simplified) */}
        <group position={[1.4, 0.2, -0.2]} rotation={[0, -0.4, 0]}>
          <mesh position={[0, 0, 0]}><boxGeometry args={[0.5, 0.02, 0.3]} /><meshStandardMaterial color="#1e293b" /></mesh>
          <mesh position={[0, 0.15, -0.15]} rotation={[-0.2, 0, 0]}><boxGeometry args={[0.5, 0.3, 0.02]} /><meshStandardMaterial color="#1e293b" /></mesh>
          <mesh position={[0, 0.15, -0.14]} rotation={[-0.2, 0, 0]}><planeGeometry args={[0.45, 0.25]} /><meshStandardMaterial color="#000" emissive="#fe8c00" emissiveIntensity={0.2} /></mesh>
        </group>

        {/* Speakers */}
        <group position={[-1.3, 0.4, -0.2]}>
          <mesh><boxGeometry args={[0.2, 0.4, 0.2]} /><meshStandardMaterial color="#0f172a" /></mesh>
          <mesh position={[0, 0.05, 0.11]}><circleGeometry args={[0.07, 32]} /><meshStandardMaterial color="#fe8c00" /></mesh>
        </group>
        <group position={[1.3, 0.4, -0.2]}>
          <mesh><boxGeometry args={[0.2, 0.4, 0.2]} /><meshStandardMaterial color="#0f172a" /></mesh>
          <mesh position={[0, 0.05, 0.11]}><circleGeometry args={[0.07, 32]} /><meshStandardMaterial color="#fe8c00" /></mesh>
        </group>

        <mesh position={[-0.2, 0.12, 0.3]}><boxGeometry args={[0.6, 0.02, 0.2]} /><meshStandardMaterial color="#1e293b" /></mesh>
        <mesh position={[0.6, 0.12, 0.3]}><boxGeometry args={[0.08, 0.02, 0.12]} /><meshStandardMaterial color="#1e293b" /></mesh>

        {/* Coffee Cup */}
        <group position={[-0.8, 0.35, 0.2]}>
          <mesh castShadow><cylinderGeometry args={[0.08, 0.06, 0.2]} /><meshStandardMaterial color="#ffffff" /></mesh>
          <mesh position={[0, 0.1, 0]}><cylinderGeometry args={[0.07, 0.07, 0.01]} /><meshStandardMaterial color="#4b3621" /></mesh>
        </group>

        {/* Potted Plant */}
        <group position={[-1.6, 0.5, 0.5]}>
          <mesh position={[0, -0.2, 0]}><cylinderGeometry args={[0.12, 0.1, 0.25]} /><meshStandardMaterial color="#f1f5f9" /></mesh>
          {[0, 1, 2].map((i) => (
            <mesh key={i} position={[0, 0.1 + i * 0.1, 0]} rotation={[0, (i * Math.PI) / 1.5, 0.5]}>
              <sphereGeometry args={[0.15, 8, 8]} scale={[1, 0.1, 1.5]} />
              <meshStandardMaterial color="#1e293b" />
            </mesh>
          ))}
        </group>
      </group>

      {/* Premium Rug */}
      <mesh position={[0, -1.99, -1.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[8, 5]} />
        <meshStandardMaterial color="#f8fafc" opacity={0.5} transparent />
      </mesh>

      {/* Office Chair */}
      <group position={[0, -2, -1.8]} rotation={[0, Math.PI, 0]} visible={isEnt}>
        <mesh position={[0, 0.1, 0]}><cylinderGeometry args={[0.3, 0.3, 0.05]} /><meshStandardMaterial color="#334155" /></mesh>
        <mesh position={[0, 0.4, 0]}><cylinderGeometry args={[0.05, 0.05, 0.6]} /><meshStandardMaterial color="#64748b" /></mesh>
        <RoundedBox args={[0.8, 0.1, 0.7]} radius={0.05} position={[0, 0.8, 0]}><meshStandardMaterial color="#1e293b" /></RoundedBox>
        <RoundedBox args={[0.7, 0.9, 0.1]} radius={0.05} position={[0, 1.3, -0.3]} rotation={[0.1, 0, 0]}><meshStandardMaterial color="#1e293b" /></RoundedBox>
      </group>

      <pointLight position={[0, 5, 0]} intensity={0.5} color="#fe8c00" />
      <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={1} castShadow />
    </>
  );
};

export default Scene;

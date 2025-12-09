'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { SKILLS_DATA } from '@/shared/constants/about.constants';
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiThreedotjs,
  SiGreensock,
  SiGit,
  SiDocker,
  SiFigma,
  SiPython,
  SiFastapi
} from 'react-icons/si';

interface SkillParticle {
  position: [number, number, number];
  icon: React.ComponentType<{ size?: number }>;
  color: string;
  name: string;
  speed: number;
  orbitRadius: number;
  orbitSpeed: number;
}

// Mapeo de skills a sus íconos de react-icons
const SKILL_ICONS: Record<string, React.ComponentType<{ size?: number }>> = {
  react: SiReact,
  nextjs: SiNextdotjs,
  typescript: SiTypescript,
  tailwind: SiTailwindcss,
  nodejs: SiNodedotjs,
  express: SiExpress,
  mongodb: SiMongodb,
  postgresql: SiPostgresql,
  python: SiPython,
  fastapi: SiFastapi,
  threejs: SiThreedotjs,
  gsap: SiGreensock,
  git: SiGit,
  docker: SiDocker,
  figma: SiFigma,
};

export const SkillParticles = () => {
  const groupRef = useRef<THREE.Group>(null);

  // Generar partículas con posiciones y propiedades aleatorias
  const particles = useMemo<SkillParticle[]>(() => {
    const result: SkillParticle[] = [];
    
    // Multiplicador: cuántas veces repetir cada skill
    const multiplier = 3; // Cambia este número para más o menos partículas
    
    for (let repeat = 0; repeat < multiplier; repeat++) {
      SKILLS_DATA.forEach((skill, i) => {
        const Icon = SKILL_ICONS[skill.id];
        
        // Distribuir más hacia los lados y atrás (Z negativo)
        const totalSkills = SKILLS_DATA.length * multiplier;
        const index = repeat * SKILLS_DATA.length + i;
        const angle = (index / totalSkills) * Math.PI * 2;
        const radius = 8 + Math.random() * 6;
        
        const skillColor = String(skill.color);
        
        result.push({
          position: [
            Math.cos(angle) * radius + (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 10,
            Math.sin(angle) * radius - Math.random() * 8 - 5,
          ] as [number, number, number],
          icon: Icon || SiReact,
          color: skillColor === '#ffffffff' ? '#ffffff' : skillColor,
          name: `${skill.name}-${repeat}`,
          speed: 0.5 + Math.random() * 0.5,
          orbitRadius: 0.2 + Math.random() * 0.3,
          orbitSpeed: 0.3 + Math.random() * 0.7,
        });
      });
    }
    
    return result;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Rotación suave del grupo completo
      groupRef.current.rotation.y = time * 0.03;
    }

    // Animar cada partícula individualmente
    groupRef.current?.children.forEach((child, i) => {
      if (child instanceof THREE.Group) {
        const particle = particles[i];
        
        // Movimiento ondulante en Y
        child.position.y = particle.position[1] + Math.sin(time * particle.speed + i) * 0.3;
        
        // Órbita circular en X-Z
        const orbitAngle = time * particle.orbitSpeed + i * 2;
        child.position.x = particle.position[0] + Math.cos(orbitAngle) * particle.orbitRadius;
        child.position.z = particle.position[2] + Math.sin(orbitAngle) * particle.orbitRadius;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {particles.map((particle, index) => {
        const Icon = particle.icon;
        return (
          <group key={particle.name} position={particle.position}>
            {/* Borde brillante (Ring) */}
            <mesh>
              <ringGeometry args={[0.32, 0.35, 32]} />
              <meshBasicMaterial 
                color={particle.color} 
                transparent 
                opacity={0.4}
                side={THREE.DoubleSide}
              />
            </mesh>

            {/* Ícono de React-Icons usando Html */}
            <Html
              position={[0, 0, 0]}
              center
              distanceFactor={10}
              style={{
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: particle.color,
                  filter: `drop-shadow(0 0 8px ${particle.color})`,
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: '50%',
                  padding: '8px',
                }}
              >
                {Icon && <Icon size={24} />}
              </div>
            </Html>

            {/* Partículas de brillo alrededor */}
            {[0, 1, 2, 3].map((i) => (
              <mesh
                key={i}
                position={[
                  Math.cos((i * Math.PI) / 2) * 0.45,
                  Math.sin((i * Math.PI) / 2) * 0.45,
                  0,
                ]}
              >
                <sphereGeometry args={[0.02, 8, 8]} />
                <meshBasicMaterial 
                  color={particle.color} 
                  transparent 
                  opacity={0.6} 
                />
              </mesh>
            ))}

            {/* Efecto de glow */}
            <pointLight 
              position={[0, 0, 0.3]} 
              color={particle.color} 
              intensity={0.2} 
              distance={1.5} 
            />
          </group>
        );
      })}
    </group>
  );
};

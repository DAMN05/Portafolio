'use client';

import THREE from '@/lib/three-init';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  ContactShadows,
  Float,
  Loader,
  Stars
} from '@react-three/drei';
import { ReadyPlayerMeAvatar } from './models/ReadyPlayerMeAvatar';
import { SkillParticles } from './SkillParticles';
import { Suspense, useRef, useEffect, useMemo, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { 
  HERO_3D_CONFIG,
  AVATAR_LIGHTS_CONFIG,
  AVATAR_FLOAT_CONFIG,
  AVATAR_STARS_CONFIG,
  AVATAR_SHADOWS_CONFIG,
  AVATAR_LOADER_CONFIG
} from '@/shared/constants/hero.constants';

interface AvatarSceneProps {
  scrollProgress: number;
  avatarUrl: string;
}

// Registrar el plugin
gsap.registerPlugin(useGSAP);

export const AvatarScene = ({ scrollProgress, avatarUrl }: AvatarSceneProps) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });
  const [avatarPosition, setAvatarPosition] = useState<[number, number, number]>([0, 0, 0]);

  // Calcular posición basada en el ancho de pantalla
  const getAvatarPosition = (width: number): [number, number, number] => {
    if (width < 768) {
      return [0, 0, 0]; // Mobile: centrado
    } else if (width < 1024) {
      return [1, 0, 0]; // Tablet: ligeramente a la derecha
    } else {
      return [2.5, 0, 0]; // Desktop: más a la derecha
    }
  };

  // Configurar posición inicial correcta
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAvatarPosition(getAvatarPosition(window.innerWidth));
    }
  }, []);

  // Manejar cambios de tamaño de ventana
  useEffect(() => {
    const handleResize = () => {
      setAvatarPosition(getAvatarPosition(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mouse tracking - seguir movimiento del mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current) return;
      
      const rect = canvasRef.current.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calcular posición relativa al centro del canvas
      const x = ((e.clientX - rect.left) - centerX) / centerX;
      const y = ((e.clientY - rect.top) - centerY) / centerY;
      
      // Limitar valores entre -1 y 1
      mousePosition.current.x = Math.max(-1, Math.min(1, x));
      mousePosition.current.y = Math.max(-1, Math.min(1, y));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <div ref={canvasRef} className="w-full h-full relative">
        {/* Overlay de efecto holográfico */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none animate-pulse" />
        
        <Canvas
          className="w-full h-full"
          gl={{ antialias: true, alpha: true }}
          shadows
          dpr={[1, 2]}
        >
          {/* Cámara centrada */}
          <PerspectiveCamera makeDefault position={HERO_3D_CONFIG.cameraPosition} />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            enableRotate={false}
          />

          {/* Estrellas de fondo */}
          <Stars 
            radius={AVATAR_STARS_CONFIG.radius} 
            depth={AVATAR_STARS_CONFIG.depth} 
            count={AVATAR_STARS_CONFIG.count} 
            factor={AVATAR_STARS_CONFIG.factor} 
            saturation={AVATAR_STARS_CONFIG.saturation} 
            fade 
            speed={AVATAR_STARS_CONFIG.speed}
          />

          {/* Luces dinámicas */}
          <ambientLight intensity={AVATAR_LIGHTS_CONFIG.ambient.intensity} />
          <directionalLight 
            position={AVATAR_LIGHTS_CONFIG.directional.position} 
            intensity={AVATAR_LIGHTS_CONFIG.directional.intensity} 
            castShadow 
          />
          <spotLight 
            position={AVATAR_LIGHTS_CONFIG.spotlight.position} 
            intensity={AVATAR_LIGHTS_CONFIG.spotlight.intensity} 
            angle={AVATAR_LIGHTS_CONFIG.spotlight.angle} 
            penumbra={AVATAR_LIGHTS_CONFIG.spotlight.penumbra}
            color={AVATAR_LIGHTS_CONFIG.spotlight.color}
          />
          <pointLight 
            position={AVATAR_LIGHTS_CONFIG.pointLight.position} 
            intensity={AVATAR_LIGHTS_CONFIG.pointLight.intensity} 
            color={AVATAR_LIGHTS_CONFIG.pointLight.color} 
          />
          <Environment preset="city" />

          {/* Partículas de Skills con íconos reales */}
          <SkillParticles />

          {/* Modelo 3D con Float para movimiento orgánico - Posición responsive */}
          <group position={avatarPosition}>
            <Suspense fallback={null}>
              <Float 
                speed={AVATAR_FLOAT_CONFIG.speed} 
                rotationIntensity={AVATAR_FLOAT_CONFIG.rotationIntensity}
                floatIntensity={AVATAR_FLOAT_CONFIG.floatIntensity}
              >
                <ReadyPlayerMeAvatar
                  scrollProgress={scrollProgress}
                  modelUrl={avatarUrl}
                  mousePosition={mousePosition.current}
                  targetRotation={targetRotation.current}
                />
              </Float>
            </Suspense>

            {/* Sombra dinámica */}
            <ContactShadows 
              position={AVATAR_SHADOWS_CONFIG.position} 
              opacity={AVATAR_SHADOWS_CONFIG.opacity}
              blur={AVATAR_SHADOWS_CONFIG.blur}
              far={AVATAR_SHADOWS_CONFIG.far}
              color={AVATAR_SHADOWS_CONFIG.color}
            />
          </group>
        </Canvas>
      </div>

      {/* Loader personalizado */}
      <Loader 
        containerStyles={AVATAR_LOADER_CONFIG.containerStyles}
        innerStyles={AVATAR_LOADER_CONFIG.innerStyles}
        barStyles={AVATAR_LOADER_CONFIG.barStyles}
      />
    </>
  );
};

export default AvatarScene;

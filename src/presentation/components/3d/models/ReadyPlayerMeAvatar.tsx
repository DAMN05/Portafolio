'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import { Group } from 'three';
import * as THREE from 'three';

interface ReadyPlayerMeAvatarProps {
  scrollProgress: number;
  modelUrl: string;
  mousePosition?: { x: number; y: number };
  targetRotation?: { x: number; y: number };
}

export const ReadyPlayerMeAvatar = ({ 
  scrollProgress, 
  modelUrl,
  mousePosition = { x: 0, y: 0 },
  targetRotation = { x: 0, y: 0 }
}: ReadyPlayerMeAvatarProps) => {
  const groupRef = useRef<Group>(null);
  const { scene, animations } = useGLTF(modelUrl);
  const { actions, mixer } = useAnimations(animations, groupRef);

  useEffect(() => {
    // Reproducir animación si existe
    if (actions && Object.keys(actions).length > 0) {
      const firstAnimation = Object.keys(actions)[0];
      actions[firstAnimation]?.play();
    }
  }, [actions]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Rotación en eje Y siguiendo el mouse solo en X
      // mousePosition.x va de -1 a 1, multiplicamos por un ángulo máximo (ej: 0.3 radianes)
      const targetRotationY = mousePosition.x * 0.5;
      
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotationY,
        0.1
      );
      
      // Sin rotación en X (evita que levante/baje la cabeza)
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotation.x - scrollProgress * 0.2,
        0.1
      );
      
      // Movimiento vertical suave con scroll
      const targetY = -scrollProgress * 1.5;
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        targetY - 1,
        0.08
      );
      
      // Escala con scroll (más sutil)
      const targetScale = 1 - scrollProgress * 0.2;
      groupRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.08
      );
    }

    // Actualizar animaciones
    if (mixer) {
      mixer.update(delta);
    }
  });

  return (
    <group ref={groupRef}>
      <primitive 
        object={scene} 
        scale={2.2}
        position={[0, -1.5, 0]}
      />
    </group>
  );
};

// Precargar el modelo (esto mejora el performance)
// useGLTF.preload('URL_DEL_AVATAR'); // Se carga dinámicamente, no necesitamos esto aquí
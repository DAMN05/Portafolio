'use client';

import { useEffect, useState } from 'react';

interface AvatarSceneWrapperProps {
  scrollProgress: number;
  avatarUrl: string;
}

export const AvatarSceneWrapper = ({ scrollProgress, avatarUrl }: AvatarSceneWrapperProps) => {
  const [Scene, setScene] = useState<any>(null);

  useEffect(() => {
    // Primero inicializar THREE, luego cargar la escena
    import('@/lib/three-init').then(() => {
      import('./AvatarScene').then((mod) => {
        setScene(() => mod.default);
      });
    });
  }, []);

  if (!Scene) {
    return <div className="w-full h-full bg-dark/50 animate-pulse" />;
  }

  return <Scene scrollProgress={scrollProgress} avatarUrl={avatarUrl} />;
};

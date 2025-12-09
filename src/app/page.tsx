'use client';

import { HeroSection } from '@/presentation/components/sections/Hero/HeroSection';
import AboutSection from '@/presentation/components/sections/About/AboutSection';
import ProjectsSection from '@/presentation/components/sections/Projects/ProjectsSection';
import ContactSection from '@/presentation/components/sections/Contact/ContactSection';
import { useScrollAnimations } from '@/presentation/hooks/useScrollAnimations';

export default function Home() {
  // Activar animaciones de scroll
  useScrollAnimations();

  return (
    <main className="min-h-screen">
      {/* Hero con Avatar 3D */}
      <HeroSection />
      
      {/* Sección About */}
      <AboutSection />
      
      {/* Sección Projects */}
      <ProjectsSection />
      
      {/* Sección Contact */}
      <ContactSection />
    </main>
  );
}
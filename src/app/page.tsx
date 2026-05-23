'use client';

import { HeroSection } from '@/presentation/components/sections/Hero/HeroSection';
import AboutSection from '@/presentation/components/sections/About/AboutSection';
import ProjectsSection from '@/presentation/components/sections/Projects/ProjectsSection';
import ContactSection from '@/presentation/components/sections/Contact/ContactSection';
import { useScrollAnimations } from '@/presentation/hooks/useScrollAnimations';

export default function Home() {
  useScrollAnimations();

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(125,211,252,0.12),transparent_28%),radial-gradient(circle_at_80%_0%,rgba(245,158,11,0.10),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_18%)]" />
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
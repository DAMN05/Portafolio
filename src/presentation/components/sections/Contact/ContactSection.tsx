// src/presentation/components/sections/Contact/ContactSection.tsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ContactForm from './ContactForm';
import SocialLinks from './SocialLinks';
import { CONTACT_CONTENT } from '@/shared/constants/contact.constants';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación del título
      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Animación del subtítulo
      gsap.from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        delay: 0.2,
        scrollTrigger: {
          trigger: subtitleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" className="section py-16 sm:py-20 lg:py-24 bg-dark-lighter/30 px-4 sm:px-6 lg:px-8">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
          <h2 
            ref={titleRef}
            className="section-title text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6"
          >
            {CONTACT_CONTENT.title}
          </h2>
          <p 
            ref={subtitleRef}
            className="text-base sm:text-lg text-light-darker"
          >
            {CONTACT_CONTENT.subtitle}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12 max-w-6xl mx-auto">
          {/* Form - Takes 3 columns */}
          <div className="lg:col-span-3">
            <div className="animate-card glass rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">{CONTACT_CONTENT.formTitle}</h3>
              <ContactForm />
            </div>
          </div>

          {/* Social Links - Takes 2 columns */}
          <div className="animate-card lg:col-span-2">
            <SocialLinks />
          </div>
        </div>
      </div>
    </section>
  );
}
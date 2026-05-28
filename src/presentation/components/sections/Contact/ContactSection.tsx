"use client";

import { useEffect, useRef } from "react";
import ContactForm from "./ContactForm";
import SocialLinks from "./SocialLinks";
import { CONTACT_CONTENT } from "@/shared/constants/contact.constants";

export default function ContactSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    (async () => {
      const gsapMod = await import("gsap");
      const gsap = gsapMod.gsap || gsapMod.default || gsapMod;
      const scrollMod = await import("gsap/ScrollTrigger");
      const ScrollTrigger =
        scrollMod.ScrollTrigger || scrollMod.default || scrollMod;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.from(titleRef.current, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });

        gsap.from(subtitleRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          delay: 0.2,
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      });
    })();

    return () => {
      if (ctx && typeof ctx.revert === "function") ctx.revert();
    };
  }, []);

  return (
    <section
      id="contact"
      className="section-shell section-shell--alt px-4 sm:px-6 lg:px-8"
    >
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
          <div className="section-kicker mb-5 justify-center">Contacto</div>
          <h2
            ref={titleRef}
            className="section-title text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6"
          >
            {CONTACT_CONTENT.title}
          </h2>
          <p
            ref={subtitleRef}
            className="section-subtitle text-base sm:text-lg"
          >
            {CONTACT_CONTENT.subtitle}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12 max-w-6xl mx-auto">
          {/* Form - Takes 3 columns */}
          <div className="lg:col-span-3">
            <div className="surface-card card-interactive rounded-[2rem] p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
                {CONTACT_CONTENT.formTitle}
              </h3>
              <ContactForm />
            </div>
          </div>

          {/* Social Links - Takes 2 columns */}
          <div className="lg:col-span-2">
            <SocialLinks />
          </div>
        </div>
      </div>
    </section>
  );
}

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ROUTES } from '@/shared/constants'

const navItems = [
  { name: 'Inicio', href: '#hero' },
  { name: 'Sobre Mí', href: '#about' },
  { name: 'Proyectos', href: '#projects' },
  { name: 'Contacto', href: '#contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  // Detectar scroll para cambiar estilo del navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Cerrar menú mobile al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMobileMenuOpen])

  // Detectar sección activa
  useEffect(() => {
    const sections = navItems.map(item => item.href.replace('#', ''))
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(`#${section}`)
            break
          }
        }
      }

      // Si estamos en el top, marcar Hero como activo
      if (window.scrollY < 100) {
        setActiveSection('#hero')
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false)
    
    if (href.startsWith('#')) {
      const element = document.querySelector(href)
      if (element) {
        const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80
        window.scrollTo({ top: offsetTop, behavior: 'smooth' })
      }
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-dark/95 backdrop-blur-md shadow-lg py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('#hero')}
            className="text-2xl font-bold gradient-text hover:scale-105 transition-transform"
          >
            Daniel Ramirez
          </button>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => handleNavClick(item.href)}
                  className={`text-lg font-medium transition-colors relative group ${
                    activeSection === item.href
                      ? 'text-primary'
                      : 'text-light hover:text-primary'
                  }`}
                >
                  {item.name}
                  {/* Underline animado */}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${
                      activeSection === item.href ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </button>
              </li>
            ))}
          </ul>

          {/* CTA Button Desktop */}
          <a
            href="/Cv_DARM.pdf"
            download
            className="hidden md:flex items-center gap-2.5 px-5 py-2.5 relative overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, rgba(0,212,255,0.15) 0%, rgba(139,92,246,0.15) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(0,212,255,0.3)',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0,212,255,0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
            }}
          >
            {/* Animated gradient overlay */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: 'linear-gradient(135deg, rgba(0,212,255,0.25) 0%, rgba(139,92,246,0.25) 100%)'
              }}
            />
            
            {/* Shine effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div 
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)'
                }}
              />
            </div>

            {/* Icon with animation */}
            <div className="relative z-10 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            
            {/* Text with gradient on hover */}
            <span className="relative z-10 font-bold text-[15px] bg-gradient-to-r from-white to-white group-hover:from-primary group-hover:to-secondary bg-clip-text group-hover:text-transparent transition-all duration-300">
              Descargar CV
            </span>

            {/* Glow effect on hover */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10"
              style={{
                background: 'radial-gradient(circle, rgba(0,212,255,0.4) 0%, transparent 70%)'
              }}
            />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center space-y-1.5 focus:outline-none"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-light transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-light transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-light transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 bg-dark/98 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 ${
            isMobileMenuOpen ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'
          }`}
        >
          <ul className="flex flex-col space-y-4 py-4">
            {navItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => handleNavClick(item.href)}
                  className={`text-lg font-medium w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeSection === item.href
                      ? 'text-primary bg-primary/10'
                      : 'text-light hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  {item.name}
                </button>
              </li>
            ))}
            {/* CTA Button Mobile */}
            <li className="px-4 pt-4">
              <a
                href="/Cv_DARM.pdf"
                download
                className="flex items-center justify-center gap-3 w-full px-6 py-3.5 relative overflow-hidden group"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,212,255,0.15) 0%, rgba(139,92,246,0.15) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(0,212,255,0.3)',
                  borderRadius: '14px',
                  boxShadow: '0 4px 20px rgba(0,212,255,0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
                }}
              >
                {/* Animated gradient overlay */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0,212,255,0.25) 0%, rgba(139,92,246,0.25) 100%)'
                  }}
                />
                
                {/* Shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div 
                    className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)'
                    }}
                  />
                </div>

                {/* Icon with animation */}
                <div className="relative z-10 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                
                {/* Text with gradient on hover */}
                <span className="relative z-10 font-bold text-base bg-gradient-to-r from-white to-white group-hover:from-primary group-hover:to-secondary bg-clip-text group-hover:text-transparent transition-all duration-300">
                  Descargar CV
                </span>

                {/* Glow effect on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10"
                  style={{
                    background: 'radial-gradient(circle, rgba(0,212,255,0.4) 0%, transparent 70%)'
                  }}
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
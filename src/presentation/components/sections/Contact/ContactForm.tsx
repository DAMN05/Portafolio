// src/presentation/components/sections/Contact/ContactForm.tsx
'use client';

import { useContactForm } from '@/presentation/hooks/useContactForm';

export default function ContactForm() {
  const { formData, errors, status, handleChange, handleSubmit } = useContactForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-light mb-2">
          Nombre *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={status === 'loading'}
          className={`w-full px-4 py-3 bg-dark-lighter border rounded-lg text-light placeholder-light-darker focus:outline-none focus:ring-2 transition-all ${
            errors.name 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-transparent focus:ring-primary'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
          placeholder="Tu nombre completo"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-light mb-2">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={status === 'loading'}
          className={`w-full px-4 py-3 bg-dark-lighter border rounded-lg text-light placeholder-light-darker focus:outline-none focus:ring-2 transition-all ${
            errors.email 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-transparent focus:ring-primary'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
          placeholder="tu@email.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
        )}
      </div>

      {/* Subject Field */}
      <div>
        <label htmlFor="subject" className="block text-sm font-semibold text-light mb-2">
          Asunto *
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          disabled={status === 'loading'}
          className={`w-full px-4 py-3 bg-dark-lighter border rounded-lg text-light placeholder-light-darker focus:outline-none focus:ring-2 transition-all ${
            errors.subject 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-transparent focus:ring-primary'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
          placeholder="¿Sobre qué quieres hablar?"
        />
        {errors.subject && (
          <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-light mb-2">
          Mensaje *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          disabled={status === 'loading'}
          rows={6}
          className={`w-full px-4 py-3 bg-dark-lighter border rounded-lg text-light placeholder-light-darker focus:outline-none focus:ring-2 transition-all resize-none ${
            errors.message 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-transparent focus:ring-primary'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
          placeholder="Cuéntame sobre tu proyecto..."
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message}</p>
        )}
      </div>

      {/* Status Messages */}
      {status === 'success' && (
        <div className="p-4 bg-green-500/20 border border-green-500 rounded-lg">
          <p className="text-green-500 font-semibold">
            ✓ ¡Mensaje enviado exitosamente! Te responderé pronto.
          </p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full px-8 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {status === 'loading' ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Enviando...
          </span>
        ) : (
          'Enviar Mensaje'
        )}
      </button>
    </form>
  );
}
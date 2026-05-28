"use client";

import { useContactForm } from "@/presentation/hooks/useContactForm";

export default function ContactForm() {
  const {
    formData,
    errors,
    status,
    feedbackMessage,
    handleChange,
    handleSubmit,
  } = useContactForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="field-label">
          Nombre *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={status === "loading"}
          className={`field-control ${
            errors.name
              ? "border-red-500 focus:border-red-500 focus:shadow-[0_0_0_4px_rgba(239,68,68,0.12)]"
              : ""
          } disabled:opacity-50 disabled:cursor-not-allowed`}
          placeholder="Tu nombre completo"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-400">{errors.name}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="field-label">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={status === "loading"}
          className={`field-control ${
            errors.email
              ? "border-red-500 focus:border-red-500 focus:shadow-[0_0_0_4px_rgba(239,68,68,0.12)]"
              : ""
          } disabled:opacity-50 disabled:cursor-not-allowed`}
          placeholder="tu@email.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-400">{errors.email}</p>
        )}
      </div>

      {/* Subject Field */}
      <div>
        <label htmlFor="subject" className="field-label">
          Asunto *
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          disabled={status === "loading"}
          className={`field-control ${
            errors.subject
              ? "border-red-500 focus:border-red-500 focus:shadow-[0_0_0_4px_rgba(239,68,68,0.12)]"
              : ""
          } disabled:opacity-50 disabled:cursor-not-allowed`}
          placeholder="¿Sobre qué quieres hablar?"
        />
        {errors.subject && (
          <p className="mt-1 text-sm text-red-400">{errors.subject}</p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="field-label">
          Mensaje *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          disabled={status === "loading"}
          rows={6}
          className={`field-control resize-none ${
            errors.message
              ? "border-red-500 focus:border-red-500 focus:shadow-[0_0_0_4px_rgba(239,68,68,0.12)]"
              : ""
          } disabled:opacity-50 disabled:cursor-not-allowed`}
          placeholder="Cuéntame sobre tu proyecto..."
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-400">{errors.message}</p>
        )}
      </div>

      {/* Status Messages */}
      {feedbackMessage && (
        <div
          className={`surface-card rounded-2xl p-4 border ${
            status === "success"
              ? "border-green-500/30 bg-green-500/5"
              : "border-red-500/30 bg-red-500/5"
          }`}
          role="status"
          aria-live="polite"
        >
          <p
            className={`font-semibold ${status === "success" ? "text-green-300" : "text-red-300"}`}
          >
            {feedbackMessage}
          </p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn btn-primary w-full px-8 py-4 font-bold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {status === "loading" ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Enviando...
          </span>
        ) : (
          "Enviar Mensaje"
        )}
      </button>
    </form>
  );
}

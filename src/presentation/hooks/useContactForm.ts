"use client";

import { useEffect, useRef, useState, ChangeEvent, FormEvent } from "react";
import { sendContactMessageUseCase } from "@/infrastructure/di/container";
import {
  ContactFormData,
  ContactFormErrors,
  FormStatus,
} from "@/shared/types/contact.types";
import { validateContactForm, sanitizeInput } from "@/shared/utils/validators";
import { ContactMessageEntity } from "@/core/entities";

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const scheduleReset = () => {
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
    }

    resetTimerRef.current = setTimeout(() => {
      setStatus("idle");
      setFeedbackMessage("");
    }, 5000);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ["name", "subject", "message"].includes(name)
        ? value
        : sanitizeInput(value),
    }));
    if (errors[name as keyof ContactFormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateContactForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("loading");
    setErrors({});
    setFeedbackMessage("");

    try {
      const contactMessage = new ContactMessageEntity(
        "", // Generar un ID único si es necesario
        formData.name,
        formData.email,
        formData.subject,
        formData.message,
        new Date(),
        "pending",
      );

      const result = await sendContactMessageUseCase.execute(contactMessage);

      if (result.success) {
        setStatus("success");
        setFeedbackMessage(
          "✓ ¡Mensaje enviado exitosamente! Te responderé pronto.",
        );
        setFormData(initialFormData);
      } else {
        setStatus("error");
        setFeedbackMessage(
          result.error ||
            "No pudimos enviar tu mensaje. Intenta nuevamente en unos segundos.",
        );
        console.error("Error al enviar el mensaje:", result.error);
      }

      scheduleReset();
    } catch (error) {
      console.error("Error inesperado:", error);
      setStatus("error");
      setFeedbackMessage(
        "Ocurrió un error inesperado. Por favor intenta nuevamente.",
      );

      scheduleReset();
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
    setStatus("idle");
    setFeedbackMessage("");
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }
  };

  return {
    formData,
    errors,
    status,
    feedbackMessage,
    handleChange,
    handleSubmit,
    resetForm,
  };
}

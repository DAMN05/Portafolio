// src/shared/types/contact.types.ts

export interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
  }
  
  export interface ContactFormErrors {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  }
  
  export type FormStatus = 'idle' | 'loading' | 'success' | 'error';
  
  export interface SocialLink {
    id: string;
    name: string;
    url: string;
    icon: string;
    color: string;
  }
  
  export interface ContactContent {
    title: string;
    subtitle: string;
    formTitle: string;
    socialTitle: string;
  }
import { ContactContent, SocialLink } from '@/shared/types/contact.types';

export const CONTACT_CONTENT: ContactContent = {
  title: "¿Trabajemos Juntos?",
  subtitle: "Estoy disponible para proyectos freelance y oportunidades full-time. ¡No dudes en contactarme!",
  formTitle: "Envíame un Mensaje"
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/daniel-rmdev/',
    icon: 'linkedin',
    color: '#0A66C2'
  },
  {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com/DAMN05',
    icon: 'github',
    color: '#ffffff'
  }
];

export const CONTACT_INFO = {
  email: 'danielmaigual00@gmail.com',
  location: 'Sabaneta, Colombia',
  availability: 'Disponible para proyectos',
  cvUrl: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/Cv_DARM.pdf`
};

export const EMAILJS_CONFIG = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''
};
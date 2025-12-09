

export interface HeroContent {
    title: string;
    subtitle: string;
    description: string;
    primaryCTA: CTAButton;
    secondaryCTA: CTAButton;
  }
  
  export interface CTAButton {
    text: string;
    href: string;
    variant: 'primary' | 'secondary';
  }
  
  export interface Hero3DConfig {
    particlesCount: number;
    cameraPosition: [number, number, number];
    animationSpeed: number;
    mouseInfluence: number;
    avatarUrl: string;
    avatarPosition: [number, number, number];
  }
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
  variant: "primary" | "secondary";
}

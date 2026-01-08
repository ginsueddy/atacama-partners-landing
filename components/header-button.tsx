'use client';

import { Button } from '@/components/ui/button';

const scrollToContactForm = () => {
  const element = document.getElementById('contact');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

export default function HeaderButton() {
  return (
    <Button
      onClick={scrollToContactForm}
      className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:scale-105 cursor-pointer"
    >
      Get in touch
    </Button>
  );
}

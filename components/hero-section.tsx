'use client';

import Image from 'next/image';

import { useInView } from '@/hooks/use-in-view';

export default function HeroSection() {
  const heroRef = useInView();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/atacama.jpg"
          alt="Atacama Desert"
          fill
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/80 via-foreground/70 to-background" />
      </div>

      {/* Hero Content */}
      <div
        ref={heroRef.ref}
        className={`relative z-10 container mx-auto px-6 max-w-5xl text-center transition-all duration-1000 ${
          heroRef.isInView
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
        }`}
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-card mb-6 text-balance pt-8 md:pt-0">
          Get your time back with intelligent automation
        </h1>
        <p className="text-xl md:text-2xl text-muted mb-12 max-w-3xl mx-auto text-balance">
          We build workflow and AI automations that eliminate repetitive tasks,
          so you can focus on what matters most
        </p>

        {/* Credibility Bullets */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-card mb-8 md:mb-0">
          <div className="flex items-center gap-2 drop-shadow-lg">
            <svg
              className="w-5 h-5 text-primary"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">10+ hours saved per week</span>
          </div>
          <div className="flex items-center gap-2 drop-shadow-lg">
            <svg
              className="w-5 h-5 text-primary"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">Custom solutions, no templates</span>
          </div>
          <div className="flex items-center gap-2 drop-shadow-lg">
            <svg
              className="w-5 h-5 text-primary"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">ROI within 30 days</span>
          </div>
        </div>
      </div>
    </section>
  );
}

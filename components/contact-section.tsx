'use client';

import * as React from 'react';

import { useInView } from '@/hooks/use-in-view';
import ContactForm from '@/components/contact-form';

export default function ContactSection() {
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const formRef = useInView();

  return (
    <section id="contact" className="py-32 px-6 bg-card">
      <div
        ref={formRef.ref}
        className={`container mx-auto max-w-2xl transition-all duration-1000 delay-200 ${
          formRef.isInView
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4 text-balance">
            Ready to automate your workflows?
          </h2>
          <p className="text-xl text-muted-foreground text-balance">
            Get a free automation audit and discover where you can save the most
            time
          </p>
        </div>

        {!isSubmitted ? (
          <ContactForm setIsSubmitted={setIsSubmitted} />
        ) : (
          <div className="text-center py-16 animate-in fade-in duration-700">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/10 mb-6">
              <svg
                className="w-10 h-10 text-success"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Thank you!
            </h3>
            <p className="text-xl text-muted-foreground mb-2">
              We've received your message and will be in touch soon.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useInView } from "@/hooks/use-in-view"

export default function AtacamaPartnersPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const heroRef = useInView()
  const formRef = useInView()
  const footerRef = useInView()

  const handleScroll = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please tell us what you want to automate"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      // Simulate form submission
      setTimeout(() => {
        setIsSubmitted(true)
      }, 500)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between max-w-7xl">
          <div className="text-2xl font-semibold tracking-tight text-foreground">Atacama Partners</div>
          <Button
            onClick={() => handleScroll("contact")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            Get in touch
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img src="/images/atacama.jpg" alt="Atacama Desert" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/80 via-foreground/70 to-background" />
        </div>

        {/* Hero Content */}
        <div
          ref={heroRef.ref}
          className={`relative z-10 container mx-auto px-6 max-w-5xl text-center transition-all duration-1000 ${
            heroRef.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-card mb-6 text-balance pt-8 md:pt-0">
            Get your time back with intelligent automation
          </h1>
          <p className="text-xl md:text-2xl text-muted mb-12 max-w-3xl mx-auto text-balance">
            We build workflow and AI automations that eliminate repetitive tasks, so you can focus on what matters most
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

      {/* Contact Form Section */}
      <section id="contact" className="py-32 px-6 bg-card">
        <div
          ref={formRef.ref}
          className={`container mx-auto max-w-2xl transition-all duration-1000 delay-200 ${
            formRef.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4 text-balance">
              Ready to automate your workflows?
            </h2>
            <p className="text-xl text-muted-foreground text-balance">
              Get a free automation audit and discover where you can save the most time
            </p>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`h-14 text-lg border-input focus:border-ring focus:ring-ring transition-all duration-300 ${
                    errors.name ? "border-destructive" : ""
                  }`}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="mt-2 text-sm text-destructive">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`h-14 text-lg border-input focus:border-ring focus:ring-ring transition-all duration-300 ${
                    errors.email ? "border-destructive" : ""
                  }`}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-2 text-sm text-destructive">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="company" className="sr-only">
                  Company or Website (optional)
                </label>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Company or website (optional)"
                  value={formData.company}
                  onChange={handleChange}
                  className="h-14 text-lg border-input focus:border-ring focus:ring-ring transition-all duration-300"
                />
              </div>

              <div>
                <label htmlFor="message" className="sr-only">
                  What do you want to automate?
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="What do you want to automate?"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className={`text-lg border-input focus:border-ring focus:ring-ring transition-all duration-300 resize-none ${
                    errors.message ? "border-destructive" : ""
                  }`}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="mt-2 text-sm text-destructive">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="text-sm text-muted-foreground text-center">
                By submitting this form, you agree to receive emails from Atacama Partners. We respect your privacy and
                will never share your information.
              </div>

              <Button
                type="submit"
                className="w-full h-14 text-lg bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                Get your free audit
              </Button>
            </form>
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-4">Thank you!</h3>
              <p className="text-xl text-muted-foreground mb-2">
                We've received your message and will be in touch soon.
              </p>
              <p className="text-lg text-muted-foreground">Expect to hear from us within 24 hours.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="container mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">© 2026 Atacama Partners. All rights reserved.</p>
          <a
            href="mailto:hello@atacamapartners.com"
            className="text-primary hover:underline transition-all duration-300 font-medium"
          >
            ginsu@atacamapartners.com
          </a>
        </div>
      </footer>
    </div>
  )
}

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import * as React from 'react';
import * as z from 'zod';

import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { createInboundLead } from '@/lib/contact-actions';
import { Spinner } from './ui/spinner';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email('Please enter a valid email'),
  company: z.string().optional(),
  message: z.string().min(1, 'Please tell us what you want to automate'),
});

type Props = {
  setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ContactForm(props: Props) {
  const { setIsSubmitted } = props;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      message: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log('Form Data:', data);
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('company', data.company || '');
    formData.append('message', data.message);

    const res = await createInboundLead(formData);

    if (res) {
      setIsSubmitted(true);
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6"
      noValidate // might want to get rid of this
    >
      <Controller
        name="name"
        control={form.control}
        render={({ field, fieldState }) => (
          <div>
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <Input
              {...field}
              id="name"
              placeholder="Your name"
              className={`h-14 text-lg border-input focus:border-ring focus:ring-ring transition-all duration-300 ${
                fieldState.invalid ? 'border-destructive' : ''
              }`}
              aria-invalid={fieldState.invalid}
              aria-describedby={fieldState.invalid ? 'name-error' : undefined}
            />
            {fieldState.invalid && (
              <p id="name-error" className="mt-2 text-sm text-destructive">
                {fieldState.error?.message}
              </p>
            )}
          </div>
        )}
      />

      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <Input
              {...field}
              id="email"
              placeholder="Your email"
              className={`h-14 text-lg border-input focus:border-ring focus:ring-ring transition-all duration-300 ${
                fieldState.invalid ? 'border-destructive' : ''
              }`}
              aria-invalid={fieldState.invalid}
              aria-describedby={fieldState.invalid ? 'email-error' : undefined}
            />
            {fieldState.invalid && (
              <p id="email-error" className="mt-2 text-sm text-destructive">
                {fieldState.error?.message}
              </p>
            )}
          </div>
        )}
      />

      <Controller
        name="company"
        control={form.control}
        render={({ field }) => (
          <div>
            <label htmlFor="company" className="sr-only">
              Company or Website (optional)
            </label>
            <Input
              {...field}
              id="company"
              placeholder="Company or website (optional)"
              className="h-14 text-lg border-input focus:border-ring focus:ring-ring transition-all duration-300"
            />
          </div>
        )}
      />

      <Controller
        name="message"
        control={form.control}
        render={({ field, fieldState }) => (
          <div>
            <label htmlFor="message" className="sr-only">
              What do you want to automate?
            </label>
            <Textarea
              {...field}
              id="message"
              placeholder="What do you want to automate?"
              rows={6}
              className={`text-lg border-input focus:border-ring focus:ring-ring transition-all duration-300 resize-none ${
                fieldState.invalid ? 'border-destructive' : ''
              }`}
              aria-invalid={fieldState.invalid}
              aria-describedby={
                fieldState.invalid ? 'message-error' : undefined
              }
            />
            {fieldState.invalid && (
              <p id="message-error" className="mt-2 text-sm text-destructive">
                {fieldState.error?.message}
              </p>
            )}
          </div>
        )}
      />

      <div className="text-sm text-muted-foreground text-center">
        By submitting this form, you agree to receive emails from Atacama
        Partners. We respect your privacy and will never share your information.
      </div>

      <Button
        type="submit"
        className="w-full h-14 text-lg bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting ? (
          <>
            <Spinner />
            Submtiting information...
          </>
        ) : (
          'Get your free audit'
        )}
      </Button>
    </form>
  );
}

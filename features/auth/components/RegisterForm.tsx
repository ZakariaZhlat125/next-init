'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { useValidation } from '@/lib/validation';
import { useAuth } from '@/lib/hooks/useAuth';
import { StepIndicator } from '@/components/ui/StepIndicator';
import { RHFInput } from '@/components/forms/RHFInput';
import { FormContainer } from '@/components/forms/FormContainer';
import { AuthLayout } from '@/features/Auth/AuthLayout';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
 

export function RegisterForm() {
  const t = useTranslations('auth.register');
  const { nameSchema, emailSchema, passwordSchema, phoneSchema } = useValidation();
  const { register: registerUser } = useAuth();
  const router = useRouter();
  const locale = useLocale();
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);
  const [currentStep, setCurrentStep] = React.useState(1);

  const schema = z.object({
    companyName: z.string().min(2, 'Company name is required'),
    legalName: z.string().min(2, 'Legal name is required'),
    taxNumber: z.string().min(1, 'Tax number is required'),
    name: nameSchema(2),
    email: emailSchema(),
    password: passwordSchema(8),
    confirmPassword: passwordSchema(8),
    phone: phoneSchema(),
    address: z.string().min(5, 'Address is required'),
  }).refine((data) => data.password === data.confirmPassword, {
    message: 'validation.match.password',
    path: ['confirmPassword'],
  });

  type FormValues = z.infer<typeof schema>;
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });
  const { register, handleSubmit, formState: { errors, isSubmitting }, trigger } = form;

  const validateStep = async (step: number) => {
    const fieldsToValidate = [
      ['companyName', 'legalName', 'taxNumber'],
      ['name', 'email', 'phone', 'address'],
      ['password', 'confirmPassword'],
    ];
    
    return await trigger(fieldsToValidate[step - 1] as any);
  };

  const handleNext = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const onSubmit = async (values: FormValues) => {
    setError(null);
    setSuccess(null);

    try {
      const response = await registerUser({
        company_name: values.companyName,
        legal_name: values.legalName,
        tax_number: values.taxNumber,
        name: values.name!,
        email: values.email!,
        password: values.password!,
        phone: values.phone,
        address: values.address,
      });

      setSuccess('Registration successful! Redirecting...');

      // Redirect after short delay to show success message
      setTimeout(() => {
        // Redirect based on user role
        if (response.user?.roles?.includes('admin') || response.user?.roles?.includes('Super Admin')) {
          router.push(`/${locale}/admin/dashboard`);
        } else if (response.user?.roles?.includes('OWNER_ORGANIZATION') || response.user?.roles?.includes('Manager')) {
          router.push(`/${locale}/my-establishment`);
        } else {
          router.push(`/${locale}/me/dashboard`);
        }
        router.refresh();
      }, 500);
    } catch (err: any) {
      console.error('Registration error:', err);
      const errorMessage = err?.response?.data?.message || err?.message || 'Registration failed. Please try again.';
      setError(errorMessage);
    }
  };

  return (
    <AuthLayout>
      <FormContainer
        title="Create Account"
        subtitle="Sign up to get started with your dashboard"
        error={error}
        success={success}
        onSubmit={handleSubmit(onSubmit)}
        footer={(
          <p className="text-center text-sm text-purple-200">
            Already have an account?{' '}
            <a
              href={`/${locale}/login`}
              className="font-medium text-white hover:underline"
              style={{ color: '#ec4899' }}
            >
              Sign in
            </a>
          </p>
        )}
      >
        <StepIndicator 
          totalSteps={3}
          step={currentStep}
          onStepChange={setCurrentStep}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onComplete={handleSubmit(onSubmit)}
        >
          <div className="space-y-4">
            <RHFInput methods={form} name="companyName" type="text" label="Company Name" placeholder="ABC Company" />
            <RHFInput methods={form} name="legalName" type="text" label="Legal Name" placeholder="ABC Company LLC" />
            <RHFInput methods={form} name="taxNumber" type="text" label="Tax Number" placeholder="123456789" />
          </div>

          <div className="space-y-4">
            <RHFInput methods={form} name="name" type="text" label="Contact Person" placeholder="John Doe" />
            <RHFInput methods={form} name="email" type="email" label="Email Address" placeholder="you@example.com" />
            <RHFInput methods={form} name="phone" type="tel" label="Phone" placeholder="+1234567890" />
            <RHFInput methods={form} name="address" type="text" label="Address" placeholder="123 Business Street" />
          </div>

          <div className="space-y-4">
            <RHFInput methods={form} name="password" type="password" label="Password" placeholder="••••••••" />
            <RHFInput methods={form} name="confirmPassword" type="password" label="Confirm Password" placeholder="••••••••" />

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-purple-400/30 bg-purple-900/50 text-pink-500 focus:ring-pink-500/20"
                required
              />
              <label className="text-xs text-purple-200">
                I agree to the terms and conditions
              </label>
            </div>
          </div>
        </StepIndicator>
      </FormContainer>
    </AuthLayout>
  );
}

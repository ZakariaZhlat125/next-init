'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { useValidation } from '@/lib/validation';
import { useAuth } from '@/lib/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { RHFInput } from '@/components/forms/RHFInput';
import { FormContainer } from '@/components/forms/FormContainer';
import { AuthLayout } from '@/features/Auth/AuthLayout';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { ArrowRightOutlined, StarOutlined } from '@ant-design/icons';

export function LoginForm() {
  const t = useTranslations('auth.login');
  const { emailSchema, passwordSchema } = useValidation();
  const { login } = useAuth();
  const locale = useLocale();

  const schema = z.object({
    email: emailSchema(),
    password: passwordSchema(8),
  });

  type FormValues = z.infer<typeof schema>;
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });
  const { register, handleSubmit, formState: { errors, isSubmitting } } = form;

  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const onSubmit = async (values: FormValues) => {
    setError(null);
    setSuccess(null);

    try {
      const result = await login({
        email: values.email as string,
        password: values.password,
      });

      if (result.success) {
        setSuccess(result.message || 'Login successful! Redirecting...');
        console.log('Login successful:', {
          user: result.data.user,
          accessToken: result.data.accessToken,
          expiresIn: result.data.expiresIn
        });

        // Redirect after short delay to show success message
        setTimeout(() => {
          const redirectUrl = searchParams?.get('redirect');
          if (redirectUrl) {
            router.push(redirectUrl);
          } else {
            router.push(`/${locale}`);
          }
          router.refresh();
        }, 500);
      }
    } catch (err: any) {
      console.error('Login error:', err);
      const errorMessage = err?.message || 'Invalid email or password';
      setError(errorMessage);
    }
  };

  return (
    <AuthLayout>
      <FormContainer
        title="Welcome Back"
        subtitle="Sign in to continue to your dashboard"
        error={error}
        success={success}
        onSubmit={handleSubmit(onSubmit)}
        footer={(
          <p className="text-center text-sm text-purple-200">
            Don&apos;t have an account?{' '}
            <a
              href={`/${locale}/register`}
              className="font-medium text-white hover:underline"
              style={{ color: '#ec4899' }}
            >
              Sign up for free
            </a>
          </p>
        )}
      >
        <RHFInput
          methods={form}
          name="email"
          type="email"
          label="Email Address"
          placeholder="you@example.com"
        />

        <RHFInput
          methods={form}
          name="password"
          type="password"
          label="Password"
          placeholder="••••••••"
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-xs text-purple-200 cursor-pointer">
            <input 
              type="checkbox" 
              className="w-4 h-4 rounded border-purple-400/30 bg-purple-900/50 text-pink-500 focus:ring-pink-500/20"
            />
            Remember me
          </label>
          <a
            href={`/${locale}/forget-password`}
            className="text-xs text-purple-300 hover:text-white transition-colors"
          >
            Forgot password?
          </a>
        </div>

        <Button
          variant="gradient"
          htmlType='submit'
          isLoading={isSubmitting}
          className="w-full flex items-center justify-center gap-2"
        >
          Sign In
          <ArrowRightOutlined className="text-base" />
        </Button>
      </FormContainer>
    </AuthLayout>
  );
}

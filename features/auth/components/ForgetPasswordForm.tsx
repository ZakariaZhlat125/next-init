'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { useTheme } from '@/lib/theme/use-theme';
import { KeyOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useValidation } from '@/lib/validation';
import { authApi } from '@/lib/api/auth';
import { mockAuthApi } from '@/lib/api/mockAuth';

const USE_MOCK_AUTH = process.env.NEXT_PUBLIC_USE_MOCK_AUTH === 'true' || !process.env.NEXT_PUBLIC_API_URL;

export function ForgetPasswordForm() {
  const { tokens, toggleTheme, mode } = useTheme();
  const t = useTranslations('auth.forgetPassword');
  const { emailSchema } = useValidation();
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  const schema = z.object({
    email: emailSchema(),
  });

  type FormValues = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = async (values: FormValues) => {
    setError(null);
    setSuccess(null);
    
    try {
      const api = USE_MOCK_AUTH ? mockAuthApi : authApi;
      const response = await api.forgotPassword(values.email);
      setSuccess(response.message || 'Password reset email sent. Please check your inbox.');
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email. Please try again.');
      console.error('Forgot password error:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div 
            className="neumorphic-flat w-20 h-20 rounded-full flex items-center justify-center mx-auto"
            style={{ color: tokens.primary }}
          >
            <KeyOutlined className="text-4xl" />
          </div>
          <h1 className="text-3xl font-bold" style={{ color: tokens.text }}>
            {t('title')}
          </h1>
          <p className="text-sm" style={{ color: tokens.textSecondary }}>
            {t('subtitle')}
          </p>
        </div>

        <Card>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 p-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}
            
            {success && (
              <div className="rounded-lg bg-green-50 border border-green-200 p-3">
                <p className="text-sm text-green-800">{success}</p>
              </div>
            )}
            
            <Input
              {...register('email')}
              type="email"
              label={t('email')}
              placeholder={t('emailPlaceholder')}
              error={!!errors.email}
              errorText={errors.email?.message}
            />

            <Button 
              variant="primary" 
              className="w-full"
              isLoading={isSubmitting}
            >
              {t('submit')}
            </Button>
          </form>
        </Card>

        <div className="text-center space-y-2">
          <Link 
            href="/login"
            className="text-sm font-medium hover:underline flex items-center justify-center gap-1"
            style={{ color: tokens.primary }}
          >
            {t('backToLogin')}
          </Link>
        </div>

        <div className="text-center">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={toggleTheme}
          >
            Toggle {mode === 'light' ? 'Dark' : 'Light'} Mode
          </Button>
        </div>
      </div>
    </div>
  );
}

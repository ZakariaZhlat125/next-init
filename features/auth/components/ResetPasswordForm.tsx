'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { useTheme } from '@/lib/theme/use-theme';
import { CheckCircleOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useValidation } from '@/lib/validation';

export function ResetPasswordForm() {
  const { tokens, toggleTheme, mode } = useTheme();
  const t = useTranslations('auth.resetPassword');
  const { passwordSchema } = useValidation();

  const schema = z.object({
    password: passwordSchema(8),
    confirmPassword: passwordSchema(8),
  }).refine((data) => data.password === data.confirmPassword, {
    message: 'validation.match.password',
    path: ['confirmPassword'],
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
    console.log(values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div 
            className="neumorphic-flat w-20 h-20 rounded-full flex items-center justify-center mx-auto"
            style={{ color: tokens.success }}
          >
            <CheckCircleOutlined className="text-4xl" />
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
            <Input
              {...register('password')}
              type="password"
              label={t('password')}
              placeholder={t('passwordPlaceholder')}
              error={!!errors.password}
              errorText={errors.password?.message}
            />

            <Input
              {...register('confirmPassword')}
              type="password"
              label={t('confirmPassword')}
              placeholder={t('confirmPasswordPlaceholder')}
              error={!!errors.confirmPassword}
              errorText={errors.confirmPassword?.message}
            />

            <Button 
              variant="success" 
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

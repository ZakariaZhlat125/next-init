"use client";

import React from "react";

interface FormContainerProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  error?: string | null;
  success?: string | null;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  footer?: React.ReactNode;
}

export function FormContainer({ children, title, subtitle, error, success, onSubmit, footer }: FormContainerProps) {
  return (
    <div className="space-y-6 p-4"  style={{
          background: 'rgba(30, 27, 75, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}>
      <div className="text-center space-y-3">
        {/* <div className="flex items-center justify-center gap-2 mb-2">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
            }}
          >
            <span className="text-white text-lg">∗</span>
          </div>
          <span className="text-xl font-bold text-white">Protolime ERP</span>
        </div> */}
        {title && <h1 className="text-2xl font-bold text-white">{title}</h1>}
        {subtitle && <p className="text-sm text-purple-200">{subtitle}</p>}
      </div>

      <div
        className=" p-6 backdrop-blur-sm"
       
      >
        <form onSubmit={onSubmit} className="space-y-4">
          {error && (
            <div
              className="rounded-lg p-3 text-sm"
              style={{
                background: 'rgba(239, 68, 68, 0.2)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#fca5a5',
              }}
            >
              {error}
            </div>
          )}

          {success && (
            <div
              className="rounded-lg p-3 text-sm"
              style={{
                background: 'rgba(34, 197, 94, 0.2)',
                border: '1px solid rgba(34, 197, 94, 0.3)',
                color: '#86efac',
              }}
            >
              {success}
            </div>
          )}

          {children}
        </form>
      </div>

      {footer}
    </div>
  );
}

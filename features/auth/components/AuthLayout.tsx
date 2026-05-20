'use client';

import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
  // Optional: allow overriding the container max width
  maxWidthClassName?: string;
}

export function AuthLayout({ children, maxWidthClassName = 'max-w-md' }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center  relative overflow-hidden">
      {/* Purple gradient background matching sidebar colors */}
      <div 
        className="absolute inset-0 z-0 "
        style={{
          background: 'linear-gradient(#1e1b4b 0%, #312e81 25%, #5b21b6 50%, #6d28d9 75%, #1e1b4b 100%)',
        }}
      />


      <div className={`w-full ${maxWidthClassName} relative z-10`}>
        {children}
      </div>
    </div>
  );
}

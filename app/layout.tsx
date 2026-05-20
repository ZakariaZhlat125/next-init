import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/src/components/providers/Providers";
import { getMessages } from "next-intl/server";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale?: string }>;
}) {
  const {locale = 'en'} = await params;
  const messages = await getMessages();

  return (
       <html lang={locale}  dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers messages={messages} locale={locale}>
          {children}
        </Providers>
      </body>
    </html>
  )
}

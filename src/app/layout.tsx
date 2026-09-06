import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';

export const metadata: Metadata = {
  title: 'AYUSH-SETU | Academia-Industry Skill Mapping & Placement Portal (SIH26044)',
  description:
    'Ministry of Ayush unified national portal for verified clinical logbooks, Ayush digital dossiers, automated skill-gap analysis, and corporate placement.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌿</text></svg>" />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-emerald-200 selection:text-emerald-900">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}

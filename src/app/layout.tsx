import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Caveat, Inter } from 'next/font/google';
import MobileBottomNav from '@/components/MobileBottomNav';
import './globals.css';

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
});

const caveat = Caveat({
  variable: '--font-caveat',
  subsets: ['latin'],
});

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  themeColor: '#FBBF24',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Flores Amarillas 🌻 | Dedicatoria Especial & Ramo Mágico',
  description:
    'Dedica un ramo interactivo de flores amarillas inolvidable con música, pétalos cayendo y carta de amor personalizada para compartir en WhatsApp.',
  keywords: [
    'flores amarillas',
    'floricienta',
    '21 de septiembre',
    'dedicatoria de amor',
    'girasoles',
    'ramo virtual',
  ],
  openGraph: {
    title: 'Flores Amarillas 🌻 | Tienes una dedicatoria especial',
    description:
      'Alguien muy especial te ha enviado un ramo de flores amarillas que nunca se marchitan. Toca para ver la sorpresa.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${caveat.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col selection:bg-amber-200 selection:text-amber-900 pb-16 md:pb-0">
        {children}
        <MobileBottomNav />
      </body>
    </html>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import confetti from 'canvas-confetti';
import { musicBox } from '@/lib/audioSynthesis';
import { Sparkles, PlusCircle } from 'lucide-react';

export default function HeaderNav() {
  const pathname = usePathname();

  const handleBurstFlowers = () => {
    musicBox?.playChime();
    confetti({
      particleCount: 45,
      angle: 60,
      spread: 65,
      origin: { x: 0, y: 0.7 },
      colors: ['#FFD700', '#F59E0B', '#FEF08A', '#FBBF24'],
    });
    confetti({
      particleCount: 45,
      angle: 120,
      spread: 65,
      origin: { x: 1, y: 0.7 },
      colors: ['#FFD700', '#F59E0B', '#FEF08A', '#FBBF24'],
    });
  };

  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/significado', label: 'Significado 🌻' },
    { href: '/frases', label: 'Frases 📜' },
  ];

  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-md bg-amber-50/85 border-b border-amber-200/60 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo / Título */}
        <Link
          href="/"
          className="flex items-center gap-2 group cursor-pointer focus:outline-none"
        >
          <span className="text-2xl transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300 select-none">
            🌻
          </span>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-lg sm:text-xl text-amber-950 tracking-tight leading-tight group-hover:text-amber-800 transition-colors">
              Flores Amarillas
            </span>
            <span className="text-[10px] text-amber-700/80 uppercase tracking-widest font-medium">
              Eternas &bull; Primavera
            </span>
          </div>
        </Link>

        {/* Enlaces de navegación centrales (escritorio y tablet) */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-amber-200/80 text-amber-950 font-bold'
                    : 'text-amber-900/80 hover:text-amber-950 hover:bg-amber-100/60'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Acciones de cabecera */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Botón lanzar flores mágicas */}
          <button
            onClick={handleBurstFlowers}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-100/90 hover:bg-amber-200 text-amber-900 border border-amber-300/70 transition-all shadow-sm active:scale-95 cursor-pointer"
            title="Lanzar lluvia mágica de pétalos"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" style={{ animationDuration: '6s' }} />
            <span className="hidden sm:inline">Lanzar Flores</span>
            <span className="sm:hidden">Flores</span>
          </button>

          {/* Enlace a Crear Dedicatoria */}
          <Link
            href="/crear"
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm ${
              pathname === '/crear'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-amber-500 hover:bg-amber-600 text-white'
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Dedicar Flores</span>
          </Link>
        </div>
      </div>

      {/* Subnavegación móvil */}
      <div className="md:hidden flex items-center justify-center gap-3 py-1.5 px-4 bg-amber-100/60 border-t border-amber-200/40 text-[11px] font-semibold text-amber-900 overflow-x-auto">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`whitespace-nowrap px-2 py-0.5 rounded-full ${
              pathname === link.href ? 'bg-amber-300/80 text-amber-950 font-bold' : ''
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </header>
  );
}

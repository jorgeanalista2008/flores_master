'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Quote, Coins } from 'lucide-react';
import CryptoDonateModal from '@/components/CryptoDonateModal';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [isDonateOpen, setIsDonateOpen] = useState(false);

  return (
    <>
      <nav
        aria-label="Navegación inferior móvil"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-amber-50/92 backdrop-blur-xl border-t border-amber-200/80 shadow-[0_-8px_25px_rgba(217,119,6,0.12)] px-2 pt-1.5 pb-[max(0.6rem,env(safe-area-inset-bottom))]"
      >
        <div className="max-w-md mx-auto flex items-center justify-around relative">
          {/* Tab 1: Inicio */}
          <Link
            href="/"
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all active:scale-90 min-w-[56px] ${
              pathname === '/'
                ? 'text-amber-950 font-bold'
                : 'text-amber-800/70 hover:text-amber-950'
            }`}
          >
            <Home className={`w-5 h-5 ${pathname === '/' ? 'stroke-[2.5] text-amber-600' : ''}`} />
            <span className="text-[10px] mt-0.5">Inicio</span>
          </Link>

          {/* Tab 2: Significado */}
          <Link
            href="/significado"
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all active:scale-90 min-w-[56px] ${
              pathname === '/significado'
                ? 'text-amber-950 font-bold'
                : 'text-amber-800/70 hover:text-amber-950'
            }`}
          >
            <BookOpen className={`w-5 h-5 ${pathname === '/significado' ? 'stroke-[2.5] text-amber-600' : ''}`} />
            <span className="text-[10px] mt-0.5">Significado</span>
          </Link>

          {/* Botón Central Elevado: DEDICAR FLORES */}
          <div className="relative -top-5 flex flex-col items-center">
            <Link
              href="/crear"
              className="w-[52px] h-[52px] rounded-full bg-gradient-to-tr from-amber-500 via-amber-600 to-yellow-500 text-white flex items-center justify-center shadow-[0_6px_20px_rgba(217,119,6,0.45)] border-[3px] border-white active:scale-90 transition-transform duration-200"
              aria-label="Crear dedicatoria de flores"
            >
              <span className="text-xl select-none">🌻</span>
            </Link>
            <span className="text-[10px] font-bold text-amber-900 mt-0.5">
              Dedicar
            </span>
          </div>

          {/* Tab 3: Frases */}
          <Link
            href="/frases"
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all active:scale-90 min-w-[56px] ${
              pathname === '/frases'
                ? 'text-amber-950 font-bold'
                : 'text-amber-800/70 hover:text-amber-950'
            }`}
          >
            <Quote className={`w-5 h-5 ${pathname === '/frases' ? 'stroke-[2.5] text-amber-600' : ''}`} />
            <span className="text-[10px] mt-0.5">Frases</span>
          </Link>

          {/* Tab 4: Donar */}
          <button
            type="button"
            onClick={() => setIsDonateOpen(true)}
            className="flex flex-col items-center justify-center py-1 px-2 rounded-xl text-amber-800/70 hover:text-amber-950 transition-all active:scale-90 min-w-[56px] cursor-pointer"
          >
            <Coins className="w-5 h-5 text-amber-600" />
            <span className="text-[10px] mt-0.5">Donar</span>
          </button>
        </div>
      </nav>

      {/* Modal de donación integrado */}
      <CryptoDonateModal
        isOpen={isDonateOpen}
        onClose={() => setIsDonateOpen(false)}
      />
    </>
  );
}

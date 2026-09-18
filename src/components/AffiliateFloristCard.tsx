'use client';

import React from 'react';
import { Truck, ExternalLink, Sparkles } from 'lucide-react';

interface AffiliateFloristCardProps {
  className?: string;
  affiliateUrl?: string;
}

export default function AffiliateFloristCard({
  className = '',
  affiliateUrl = 'https://www.google.com/search?q=floristeria+flores+amarillas+a+domicilio',
}: AffiliateFloristCardProps) {
  return (
    <aside
      className={`w-full max-w-3xl mx-auto my-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 text-white shadow-[0_15px_35px_rgba(217,119,6,0.3)] relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6 ${className}`}
    >
      {/* Fondo con brillo */}
      <div className="absolute -top-12 -right-12 w-44 h-44 bg-yellow-300/30 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-start gap-4 z-10 text-left">
        <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/30 text-2xl shadow-inner">
          🌻
        </div>

        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-bold bg-white/25 text-white mb-2 border border-white/30">
            <Sparkles className="w-3 h-3 text-yellow-200" />
            Entrega a Domicilio Hoy
          </div>
          <h4 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight leading-snug">
            ¿Quieres sorprenderla/o con Flores Amarillas reales? 💐
          </h4>
          <p className="text-xs sm:text-sm text-amber-100/90 mt-1 max-w-md">
            Combina tu dedicatoria virtual con un ramo natural de girasoles o rosas amarillas entregado directamente en su puerta.
          </p>
        </div>
      </div>

      <div className="z-10 shrink-0 w-full sm:w-auto">
        <a
          href={affiliateUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-amber-50 text-amber-900 font-bold text-sm shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <Truck className="w-4 h-4 text-amber-600" />
          <span>Pedir Flores Reales</span>
          <ExternalLink className="w-3.5 h-3.5 text-amber-500" />
        </a>
      </div>
    </aside>
  );
}

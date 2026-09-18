'use client';

import React from 'react';

interface AdBannerProps {
  slot?: string;
  format?: 'auto' | 'horizontal' | 'rectangle';
  className?: string;
}

export default function AdBannerPlaceholder({
  slot = '1234567890',
  format = 'auto',
  className = '',
}: AdBannerProps) {
  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  return (
    <div
      className={`w-full my-6 flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-amber-200/60 bg-amber-50/40 p-4 text-center transition-all ${className}`}
    >
      <span className="text-[10px] tracking-widest text-amber-700/50 uppercase font-medium mb-1">
        Publicidad
      </span>

      {adsenseClientId ? (
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={adsenseClientId}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      ) : (
        /* Espacio reservado mientras se conecta la cuenta de AdSense */
        <div className="w-full max-w-lg py-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-3 bg-gradient-to-r from-amber-100/60 via-yellow-100/40 to-amber-100/60 rounded-xl border border-amber-300/60">
          <div className="flex items-center gap-3 text-left">
            <span className="text-2xl select-none">🌻</span>
            <div>
              <p className="text-xs font-bold text-amber-950">
                Espacio Publicitario Disponible
              </p>
              <p className="text-[11px] text-amber-800/80">
                Monetiza con Google AdSense o anuncia tu floristería aquí.
              </p>
            </div>
          </div>
          <a
            href="https://adsense.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-full bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
          >
            Configurar
          </a>
        </div>
      )}
    </div>
  );
}

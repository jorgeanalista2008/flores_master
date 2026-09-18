'use client';

import React, { useState } from 'react';
import { DedicationData, generateWhatsAppMessage, createShareableUrl } from '@/lib/dedicationUtils';
import { musicBox } from '@/lib/audioSynthesis';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, X, Copy, Check, MessageCircle, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface LoveLetterModalProps {
  dedication: DedicationData;
  isOpen: boolean;
  onClose: () => void;
}

export default function LoveLetterModal({
  dedication,
  isOpen,
  onClose,
}: LoveLetterModalProps) {
  const [copied, setCopied] = useState(false);
  const [isUnsealed, setIsUnsealed] = useState(false);

  if (!isOpen) return null;

  const handleUnseal = () => {
    setIsUnsealed(true);
    musicBox?.playChime();
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#FACC15', '#F59E0B', '#FEF08A'],
    });
  };

  const handleCopy = async () => {
    const url = createShareableUrl(dedication);
    const text = `🌻 "${dedication.message}"\n\n— De: ${dedication.sender} para ${dedication.recipient} 💛\n${url}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {}
  };

  const handleShareWhatsApp = () => {
    const url = createShareableUrl(dedication);
    const msg = generateWhatsAppMessage(dedication, url);
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md animate-fadeIn">
      {/* Botón cerrar flotante */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 sm:top-6 sm:right-6 p-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors z-50 cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
        aria-label="Cerrar dedicatoria"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="relative w-full max-w-lg max-h-[88dvh] overflow-y-auto rounded-3xl p-1 shadow-2xl transition-all duration-500">
        {!isUnsealed ? (
          /* ================= SOBRE CERRADO CON SELLO DE CERA ================= */
          <div className="flex flex-col items-center justify-center p-6 sm:p-10 text-center bg-gradient-to-br from-amber-50 via-amber-100/90 to-yellow-100 rounded-3xl border-2 border-amber-300 shadow-[0_20px_50px_rgba(234,179,8,0.25)]">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-600 mb-3 animate-bounce">
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>

            <p className="text-[11px] sm:text-xs uppercase tracking-widest text-amber-700 font-semibold mb-1">
              Tienes una carta especial
            </p>
            <h3 className="text-xl sm:text-3xl font-serif font-bold text-amber-950 mb-1">
              Para {dedication.recipient || 'ti'}
            </h3>
            <p className="text-xs sm:text-sm text-amber-800/80 mb-6 max-w-xs">
              Enviada con amor por <span className="font-semibold">{dedication.sender || 'Alguien que te quiere'}</span>
            </p>

            {/* Sello de cera interactivo */}
            <button
              onClick={handleUnseal}
              className="group relative cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none"
            >
              <div className="w-22 h-22 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-amber-500 via-amber-600 to-amber-800 shadow-[0_10px_25px_rgba(180,83,9,0.5)] flex flex-col items-center justify-center text-amber-100 border-4 border-amber-400/50 group-hover:border-amber-200">
                <span className="text-3xl sm:text-5xl drop-shadow-md">🌻</span>
                <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-amber-200 mt-0.5">
                  Abrir Carta
                </span>
              </div>
              <div className="absolute -inset-2 rounded-full border border-amber-400/40 animate-ping pointer-events-none opacity-40" />
            </button>

            <p className="text-xs text-amber-700/80 mt-5 animate-pulse font-medium">
              Toca el sello para abrir el mensaje 💛
            </p>
          </div>
        ) : (
          /* ================= CARTA DESPLEGADA ================= */
          <div className="relative bg-[#FFFDF5] p-5 sm:p-9 rounded-3xl border-3 border-amber-300/80 shadow-[0_25px_60px_rgba(217,119,6,0.3)] animate-scaleUp">
            {/* Adornos en esquinas */}
            <span className="absolute top-3 left-3 text-xl sm:text-2xl select-none opacity-80">🌼</span>
            <span className="absolute top-3 right-3 text-xl sm:text-2xl select-none opacity-80">🌼</span>
            <span className="absolute bottom-3 left-3 text-xl sm:text-2xl select-none opacity-80">🌻</span>
            <span className="absolute bottom-3 right-3 text-xl sm:text-2xl select-none opacity-80">🌻</span>

            {/* Cabecera de la carta */}
            <div className="text-center border-b border-amber-200/80 pb-3 mb-4">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300/60 mb-1.5">
                <Sparkles className="w-3 h-3 text-amber-600" />
                Flores Amarillas Inmarcesibles
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-amber-950 font-bold tracking-tight">
                Querida/o {dedication.recipient}
              </h2>
            </div>

            {/* Cuerpo del mensaje */}
            <div className="my-4 px-1 sm:px-3">
              <p className="text-base sm:text-xl leading-relaxed text-amber-900/90 font-serif italic text-center whitespace-pre-line">
                &ldquo;{dedication.message}&rdquo;
              </p>
            </div>

            {/* Firma */}
            <div className="text-right border-t border-amber-200/80 pt-3 mt-4">
              <p className="text-[10px] sm:text-xs uppercase tracking-widest text-amber-600 font-semibold">
                Con todo mi cariño,
              </p>
              <p className="text-xl sm:text-2xl font-serif font-bold text-amber-950 flex items-center justify-end gap-1 mt-0.5">
                {dedication.sender} <Heart className="w-4 h-4 text-amber-500 fill-amber-500 inline" />
              </p>
            </div>

            {/* Botones de acción ergonómicos */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-1">
              <button
                onClick={handleShareWhatsApp}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-semibold text-sm transition-all shadow-md min-h-[44px] cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enviar por WhatsApp</span>
              </button>

              <button
                onClick={handleCopy}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-amber-100 hover:bg-amber-200 active:scale-95 text-amber-900 font-semibold text-sm transition-all border border-amber-300/80 min-h-[44px] cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? '¡Copiado!' : 'Copiar'}</span>
              </button>

              <Link
                href="/crear"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-semibold text-sm transition-all shadow-md min-h-[44px] cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Crear la mía</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

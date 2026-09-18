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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/65 backdrop-blur-md animate-fadeIn">
      {/* Botón cerrar flotante */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50 cursor-pointer"
        aria-label="Cerrar dedicatoria"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl p-1 shadow-2xl transition-all duration-500">
        {!isUnsealed ? (
          /* ================= SOBRE CERRADO CON SELLO DE CERA ================= */
          <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-gradient-to-br from-amber-50 via-amber-100/90 to-yellow-100 rounded-3xl border-2 border-amber-300 shadow-[0_20px_50px_rgba(234,179,8,0.25)]">
            <div className="w-16 h-16 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-600 mb-4 animate-bounce">
              <Sparkles className="w-8 h-8" />
            </div>

            <p className="text-xs uppercase tracking-widest text-amber-700 font-semibold mb-1">
              Tienes una carta especial
            </p>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-amber-950 mb-2">
              Para {dedication.recipient || 'ti'}
            </h3>
            <p className="text-sm text-amber-800/80 mb-8 max-w-xs">
              Enviada con amor por <span className="font-semibold">{dedication.sender || 'Alguien que te quiere'}</span>
            </p>

            {/* Sello de cera interactivo */}
            <button
              onClick={handleUnseal}
              className="group relative cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none"
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-amber-500 via-amber-600 to-amber-800 shadow-[0_10px_25px_rgba(180,83,9,0.5)] flex flex-col items-center justify-center text-amber-100 border-4 border-amber-400/50 group-hover:border-amber-200">
                <span className="text-4xl sm:text-5xl drop-shadow-md">🌻</span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-200 mt-1">
                  Abrir Carta
                </span>
              </div>
              <div className="absolute -inset-2 rounded-full border border-amber-400/40 animate-ping pointer-events-none opacity-40" />
            </button>

            <p className="text-xs text-amber-700/60 mt-6 animate-pulse">
              Toca el sello para abrir el mensaje 💛
            </p>
          </div>
        ) : (
          /* ================= CARTA DESPLEGADA ================= */
          <div className="relative bg-[#FFFDF5] p-6 sm:p-10 rounded-3xl border-4 border-amber-300/80 shadow-[0_25px_60px_rgba(217,119,6,0.3)] animate-scaleUp">
            {/* Adornos en esquinas */}
            <span className="absolute top-4 left-4 text-2xl select-none opacity-80">🌼</span>
            <span className="absolute top-4 right-4 text-2xl select-none opacity-80">🌼</span>
            <span className="absolute bottom-4 left-4 text-2xl select-none opacity-80">🌻</span>
            <span className="absolute bottom-4 right-4 text-2xl select-none opacity-80">🌻</span>

            {/* Cabecera de la carta */}
            <div className="text-center border-b border-amber-200/80 pb-4 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300/60 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Flores Amarillas Inmarcesibles
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-amber-950 font-bold tracking-tight">
                Querida/o {dedication.recipient}
              </h2>
            </div>

            {/* Cuerpo del mensaje */}
            <div className="my-6 px-2 sm:px-4">
              <p className="text-lg sm:text-xl leading-relaxed text-amber-900/90 font-serif italic text-center whitespace-pre-line">
                &ldquo;{dedication.message}&rdquo;
              </p>
            </div>

            {/* Firma */}
            <div className="text-right border-t border-amber-200/80 pt-4 mt-6">
              <p className="text-xs uppercase tracking-widest text-amber-600 font-semibold">
                Con todo mi cariño,
              </p>
              <p className="text-2xl sm:text-3xl font-serif font-bold text-amber-950 flex items-center justify-end gap-1.5 mt-1">
                {dedication.sender} <Heart className="w-5 h-5 text-amber-500 fill-amber-500 inline" />
              </p>
            </div>

            {/* Botones de acción */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={handleShareWhatsApp}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                Compartir por WhatsApp
              </button>

              <button
                onClick={handleCopy}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 font-medium text-sm transition-all border border-amber-300/80 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                {copied ? '¡Copiado!' : 'Copiar Dedicatoria'}
              </button>

              <Link
                href="/crear"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-medium text-sm transition-all shadow-md cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                Crear la mía
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

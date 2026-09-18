'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { USDT_TRON_WALLET } from '@/lib/cryptoWallets';
import { musicBox } from '@/lib/audioSynthesis';
import confetti from 'canvas-confetti';
import { X, Copy, Check, Heart, Sparkles, AlertTriangle } from 'lucide-react';

interface CryptoDonateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CryptoDonateModal({
  isOpen,
  onClose,
}: CryptoDonateModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(USDT_TRON_WALLET.address);
      setCopied(true);
      musicBox?.playChime();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#26A17B', '#FEF08A'],
      });
      setTimeout(() => setCopied(false), 2500);
    } catch {}
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-fadeIn">
      {/* Botón cerrar */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50 cursor-pointer"
        aria-label="Cerrar donación"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="relative w-full max-w-md bg-[#181A20] text-white rounded-3xl border border-amber-400/40 shadow-[0_25px_60px_rgba(0,0,0,0.6)] p-6 sm:p-8 animate-scaleUp">
        {/* Cabecera */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-300 mb-3 border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Apoya con Cripto 💛
          </div>

          <div className="flex items-center justify-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-full bg-[#26A17B] flex items-center justify-center text-white font-bold text-base shadow-sm">
              ₮
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-white">
              USDT <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white/10 text-gray-300 ml-1">TRON</span>
            </h3>
          </div>

          <p className="text-xs text-gray-400 max-w-xs mx-auto">
            Tu apoyo permite mantener los servidores activos y las flores amarillas floreciendo para todos.
          </p>
        </div>

        {/* Tarjeta con Código QR oficial */}
        <div className="bg-[#2B313A]/70 rounded-2xl p-4 border border-gray-700 flex flex-col items-center text-center space-y-4 shadow-inner">
          <div className="relative w-48 h-48 sm:w-52 sm:h-52 bg-white rounded-2xl p-2.5 shadow-md flex items-center justify-center overflow-hidden">
            <Image
              src="/usdt-qr.jpg"
              alt="Código QR USDT TRON"
              width={200}
              height={200}
              className="w-full h-full object-contain rounded-xl"
              priority
            />
          </div>

          {/* Dirección de depósito */}
          <div className="w-full bg-[#181A20] p-3 rounded-xl border border-gray-700 text-left">
            <span className="text-[10px] uppercase tracking-wider text-amber-400 font-bold block mb-1">
              Dirección TRON (TRC-20):
            </span>
            <p className="text-xs font-mono text-gray-200 break-all select-all leading-relaxed">
              {USDT_TRON_WALLET.address}
            </p>
          </div>

          {/* Botón copiar */}
          <button
            type="button"
            onClick={handleCopy}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-98 text-amber-950 font-bold text-sm shadow-md transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-900" />
                <span>¡Dirección Copiada! 💛</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar Dirección</span>
              </>
            )}
          </button>
        </div>

        {/* Advertencia de red */}
        <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5 text-left text-xs text-amber-200/90">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>
            Solo envía activos de la red <strong>TRON (TRC-20)</strong> a esta dirección. Los demás activos se perderán para siempre.
          </span>
        </div>

        {/* Agradecimiento */}
        <p className="text-center text-[11px] text-gray-400 mt-4 flex items-center justify-center gap-1">
          ¡Muchas gracias por tu generosidad y apoyo! <Heart className="w-3 h-3 text-amber-400 fill-amber-400 inline" />
        </p>
      </div>
    </div>
  );
}

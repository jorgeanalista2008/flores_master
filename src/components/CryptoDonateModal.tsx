'use client';

import React, { useState } from 'react';
import { CRYPTO_WALLETS, CryptoWallet } from '@/lib/cryptoWallets';
import { musicBox } from '@/lib/audioSynthesis';
import confetti from 'canvas-confetti';
import { X, Copy, Check, Heart, Sparkles, ShieldCheck, QrCode } from 'lucide-react';

interface CryptoDonateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CryptoDonateModal({
  isOpen,
  onClose,
}: CryptoDonateModalProps) {
  const [selectedWallet, setSelectedWallet] = useState<CryptoWallet>(CRYPTO_WALLETS[0]);
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(selectedWallet.address);
      setCopied(true);
      musicBox?.playChime();
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#F59E0B', '#FEF08A'],
      });
      setTimeout(() => setCopied(false), 2500);
    } catch {}
  };

  const handleSelect = (wallet: CryptoWallet) => {
    setSelectedWallet(wallet);
    setCopied(false);
    musicBox?.playChime();
  };

  // Generador de URL para código QR seguro usando api pública de QR o SVG
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
    selectedWallet.address
  )}&bgcolor=FFFDF7&color=451a03&margin=1`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/65 backdrop-blur-md animate-fadeIn">
      {/* Botón cerrar */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50 cursor-pointer"
        aria-label="Cerrar ventana de donación"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="relative w-full max-w-lg bg-[#FFFDF7] rounded-3xl border-2 border-amber-300 shadow-[0_25px_60px_rgba(217,119,6,0.3)] p-6 sm:p-8 animate-scaleUp text-amber-950">
        {/* Cabecera */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center mx-auto mb-3 text-3xl shadow-sm border border-amber-300">
            💛
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-amber-200/80 text-amber-900 mb-2 border border-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            Apoya al Creador con Cripto
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-amber-950">
            Donaciones & Café Floral ☕
          </h3>
          <p className="text-xs sm:text-sm text-amber-800/80 mt-1 max-w-xs mx-auto">
            Tu apoyo ayuda a cubrir los costos de servidores y mantener vivas las flores amarillas para todos.
          </p>
        </div>

        {/* Selector de Criptomonedas */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
          {CRYPTO_WALLETS.map((w) => {
            const isSelected = selectedWallet.id === w.id;
            return (
              <button
                key={w.id}
                type="button"
                onClick={() => handleSelect(w)}
                className={`p-2.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                  isSelected
                    ? 'bg-amber-100 border-amber-500 shadow-sm scale-105 font-bold text-amber-950'
                    : 'bg-white hover:bg-amber-50/50 border-amber-200 text-amber-800'
                }`}
              >
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-inner"
                  style={{ backgroundColor: w.color }}
                >
                  {w.icon}
                </span>
                <span className="text-xs">{w.symbol}</span>
              </button>
            );
          })}
        </div>

        {/* Tarjeta de la Billetera Seleccionada */}
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/90 border border-amber-200 text-center space-y-3">
          <div className="flex items-center justify-between border-b border-amber-200/60 pb-2 text-xs">
            <span className="font-semibold text-amber-900">
              {selectedWallet.name} ({selectedWallet.symbol})
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-200/80 text-amber-950 border border-amber-300">
              Red: {selectedWallet.network}
            </span>
          </div>

          {/* Alternar QR o Dirección */}
          {showQr ? (
            <div className="flex flex-col items-center justify-center py-2 animate-fadeIn">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={qrUrl}
                alt={`QR ${selectedWallet.name}`}
                className="w-40 h-40 rounded-xl border border-amber-300 shadow-md p-1 bg-white"
                width={160}
                height={160}
              />
              <span className="text-[11px] text-amber-700 font-medium mt-2">
                Escanea desde tu wallet o exchange
              </span>
            </div>
          ) : (
            <div className="text-left bg-white p-3 rounded-xl border border-amber-200/80 shadow-inner">
              <span className="text-[10px] uppercase tracking-wider text-amber-600 font-bold block mb-1">
                Dirección de depósito:
              </span>
              <p className="text-xs sm:text-sm font-mono text-amber-950 break-all select-all leading-relaxed">
                {selectedWallet.address}
              </p>
            </div>
          )}

          {/* Botones de acción */}
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={handleCopy}
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-200" />
                  <span>¡Dirección Copiada! 💛</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar Dirección</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setShowQr(!showQr)}
              className="inline-flex items-center justify-center gap-1.5 py-3 px-3.5 rounded-xl bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold shadow-sm transition-colors cursor-pointer"
              title={showQr ? 'Ver dirección en texto' : 'Ver código QR'}
            >
              <QrCode className="w-4 h-4" />
              <span>{showQr ? 'Texto' : 'QR'}</span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-1 text-[11px] text-amber-700/80 pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Verifica enviar únicamente mediante la red especificada.</span>
          </div>
        </div>

        {/* Mensaje de agradecimiento final */}
        <p className="text-center text-[11px] text-amber-800/70 mt-4 flex items-center justify-center gap-1">
          ¡Infinitas gracias por apoyar este proyecto independiente! <Heart className="w-3 h-3 text-amber-500 fill-amber-500 inline" />
        </p>
      </div>
    </div>
  );
}

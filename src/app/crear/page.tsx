'use client';

import React, { useState } from 'react';
import {
  BouquetType,
  BOUQUET_OPTIONS,
  PRESET_MESSAGES,
  DedicationData,
  createShareableUrl,
  generateWhatsAppMessage,
} from '@/lib/dedicationUtils';
import YellowBouquet from '@/components/YellowBouquet';
import FallingPetals from '@/components/FallingPetals';
import HeaderNav from '@/components/HeaderNav';
import MusicPlayer from '@/components/MusicPlayer';
import Footer from '@/components/Footer';
import { musicBox } from '@/lib/audioSynthesis';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  MessageCircle,
  Copy,
  Check,
  Eye,
  Gift,
  ArrowRight,
} from 'lucide-react';

export default function CrearDedicatoriaPage() {
  const [recipient, setRecipient] = useState('');
  const [sender, setSender] = useState('');
  const [message, setMessage] = useState(PRESET_MESSAGES[0].text);
  const [bouquetType, setBouquetType] = useState<BouquetType>('girasoles');
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSelectPreset = (text: string) => {
    setMessage(text);
    musicBox?.playChime();
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanRecipient = recipient.trim() || 'Mi Persona Favorita';
    const cleanSender = sender.trim() || 'Alguien que te adora';
    const cleanMessage = message.trim() || PRESET_MESSAGES[0].text;

    const data: DedicationData = {
      recipient: cleanRecipient,
      sender: cleanSender,
      message: cleanMessage,
      bouquetType,
    };

    const url = createShareableUrl(data);
    setGeneratedUrl(url);

    musicBox?.playChime();
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#F59E0B', '#FEF08A', '#FBBF24'],
    });
  };

  const handleCopy = async () => {
    if (!generatedUrl) return;
    try {
      await navigator.clipboard.writeText(generatedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {}
  };

  const handleWhatsApp = () => {
    if (!generatedUrl) return;
    const cleanRecipient = recipient.trim() || 'Mi Persona Favorita';
    const cleanSender = sender.trim() || 'Alguien que te adora';
    const data: DedicationData = {
      recipient: cleanRecipient,
      sender: cleanSender,
      message,
      bouquetType,
    };
    const waText = generateWhatsAppMessage(data, generatedUrl);
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(waText)}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50 via-yellow-50/50 to-amber-100/40 text-amber-950 relative overflow-x-hidden">
      <FallingPetals />
      <HeaderNav />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 pt-6 pb-24 sm:py-12 z-10">
        {/* Título de la página */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-semibold bg-amber-200/80 text-amber-900 border border-amber-300 mb-3">
            <Gift className="w-3.5 h-3.5 text-amber-700" />
            Crea tu Detalle Inolvidable
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-amber-950 tracking-tight mb-3">
            Dedica tus Flores Amarillas 🌻
          </h1>
          <p className="text-base sm:text-lg text-amber-800/80">
            Personaliza el ramo, escribe o elige un mensaje emotivo y obtén un enlace mágico listo para enviar por WhatsApp o redes.
          </p>
        </div>

        {/* Contenedor del Formulario + Previsualización */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Columna Formulario */}
          <div className="lg:col-span-7 bg-white/85 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-amber-200/80 shadow-[0_15px_35px_rgba(234,179,8,0.12)]">
            <form onSubmit={handleGenerate} className="space-y-6">
              {/* Para quién */}
              <div>
                <label className="block text-sm font-semibold text-amber-900 mb-1.5">
                  ¿Para quién es la dedicatoria? <span className="text-amber-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="Ej. Sofía, Mi amor, Mi mejor amiga..."
                  className="w-full px-4 py-3 rounded-2xl bg-amber-50/60 border border-amber-300/80 text-amber-950 placeholder-amber-700/40 focus:outline-none focus:ring-2 focus:ring-amber-400 text-base sm:text-sm transition-all"
                />
              </div>

              {/* De parte de quién */}
              <div>
                <label className="block text-sm font-semibold text-amber-900 mb-1.5">
                  ¿De parte de quién? <span className="text-amber-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  placeholder="Ej. Lucas, Tu persona favorita..."
                  className="w-full px-4 py-3 rounded-2xl bg-amber-50/60 border border-amber-300/80 text-amber-950 placeholder-amber-700/40 focus:outline-none focus:ring-2 focus:ring-amber-400 text-base sm:text-sm transition-all"
                />
              </div>

              {/* Selector de tipo de Ramo */}
              <div>
                <label className="block text-sm font-semibold text-amber-900 mb-2">
                  Elige el estilo de ramo 💐
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {BOUQUET_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setBouquetType(opt.id);
                        musicBox?.playChime();
                      }}
                      className={`p-3 rounded-2xl text-left border text-xs transition-all flex flex-col gap-1 cursor-pointer active:scale-95 min-h-[58px] ${
                        bouquetType === opt.id
                          ? 'bg-amber-100 border-amber-500 shadow-sm font-semibold text-amber-950'
                          : 'bg-white hover:bg-amber-50/50 border-amber-200 text-amber-800'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-medium text-sm">
                        <span>{opt.icon}</span>
                        <span>{opt.name}</span>
                      </div>
                      <span className="text-[11px] text-amber-700/80 line-clamp-1">
                        {opt.description}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mensaje de dedicatoria */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-semibold text-amber-900">
                    Mensaje de Dedicatoria <span className="text-amber-600">*</span>
                  </label>
                  <span className="text-xs text-amber-700/60">
                    {message.length} caracteres
                  </span>
                </div>

                {/* Botones de Frases Predefinidas con Desplazamiento Horizontal Suave */}
                <div className="overflow-x-auto no-scrollbar flex items-center gap-1.5 py-1 mb-2.5 -mx-1 px-1">
                  {PRESET_MESSAGES.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectPreset(preset.text)}
                      className="whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium bg-amber-100/90 hover:bg-amber-200 active:scale-95 text-amber-900 border border-amber-300/70 transition-all shrink-0 cursor-pointer"
                    >
                      {preset.title}
                    </button>
                  ))}
                </div>

                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Escribe aquí tu dedicatoria especial..."
                  className="w-full px-4 py-3 rounded-2xl bg-amber-50/60 border border-amber-300/80 text-amber-950 placeholder-amber-700/40 focus:outline-none focus:ring-2 focus:ring-amber-400 text-base sm:text-sm transition-all resize-none font-serif leading-relaxed"
                />
              </div>

              {/* Botón generar enlace */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-bold text-base shadow-[0_10px_25px_rgba(217,119,6,0.3)] hover:shadow-[0_15px_30px_rgba(217,119,6,0.4)] transform active:scale-95 transition-all cursor-pointer min-h-[50px]"
              >
                <Sparkles className="w-5 h-5" />
                <span>Generar Sorpresa & Enlace</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            {/* Resultado generado */}
            {generatedUrl && (
              <div className="mt-8 p-5 bg-amber-100/80 rounded-2xl border-2 border-amber-400 animate-fadeIn space-y-4">
                <div className="flex items-center gap-2 text-amber-900 font-bold">
                  <Check className="w-5 h-5 text-emerald-600" />
                  <span>¡Tu dedicatoria está lista para compartir! 🌻</span>
                </div>

                <p className="text-xs text-amber-800">
                  Envíale este enlace a {recipient || 'tu persona especial'} para que reciba su ramo y abra su carta personalizada:
                </p>

                <div className="flex flex-col sm:flex-row gap-2.5">
                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Enviar por WhatsApp
                  </button>

                  <button
                    type="button"
                    onClick={handleCopy}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white hover:bg-amber-50 text-amber-900 border border-amber-300 font-semibold text-sm shadow-sm transition-all cursor-pointer"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    {copied ? '¡Enlace Copiado!' : 'Copiar Enlace'}
                  </button>
                </div>

                <div className="text-center pt-1">
                  <a
                    href={generatedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-amber-800 hover:text-amber-950 underline underline-offset-2"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Probar y ver la sorpresa como la verá {recipient || 'tu persona especial'}
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Columna Previsualización en Vivo */}
          <div className="lg:col-span-5 flex flex-col items-center sticky top-24">
            <div className="w-full bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-amber-200/80 shadow-[0_15px_35px_rgba(234,179,8,0.12)] flex flex-col items-center text-center">
              <span className="text-[11px] uppercase tracking-widest font-bold text-amber-700 bg-amber-100 px-3 py-0.5 rounded-full mb-3">
                Previsualización en Vivo
              </span>

              <YellowBouquet type={bouquetType} />

              {/* Tarjeta simulada */}
              <div className="w-full mt-4 p-4 rounded-2xl bg-[#FFFDF7] border border-amber-300/80 text-left shadow-sm">
                <p className="text-xs text-amber-600 font-semibold uppercase tracking-wider">
                  Para: {recipient || '(Nombre de tu persona)'}
                </p>
                <p className="text-sm font-serif italic text-amber-950 mt-1 line-clamp-3">
                  &ldquo;{message}&rdquo;
                </p>
                <p className="text-xs text-right text-amber-700 font-semibold mt-2">
                  De: {sender || '(Tu nombre)'} 💛
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <MusicPlayer />
      <Footer />
    </div>
  );
}

'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import FallingPetals from '@/components/FallingPetals';
import YellowBouquet from '@/components/YellowBouquet';
import LoveLetterModal from '@/components/LoveLetterModal';
import PetalGame from '@/components/PetalGame';
import MusicPlayer from '@/components/MusicPlayer';
import HeaderNav from '@/components/HeaderNav';
import Footer from '@/components/Footer';
import {
  decodeDedication,
  PRESET_MESSAGES,
  BouquetType,
} from '@/lib/dedicationUtils';
import { musicBox } from '@/lib/audioSynthesis';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Mail,
  Gift,
  PlusCircle,
  BookOpen,
} from 'lucide-react';
import StructuredData from '@/components/StructuredData';
import AdBannerPlaceholder from '@/components/AdBannerPlaceholder';
import AffiliateFloristCard from '@/components/AffiliateFloristCard';

function HomeContent() {
  const searchParams = useSearchParams();

  // Derivar datos de dedicatoria directamente a partir de searchParams sin efectos secundarios
  const { dedication, isDedicatedView } = useMemo(() => {
    const code = searchParams.get('d');
    const para = searchParams.get('para');
    const de = searchParams.get('de');
    const msg = searchParams.get('msg');
    const ramo = searchParams.get('ramo') as BouquetType | null;

    if (code) {
      const decoded = decodeDedication(code);
      if (decoded) {
        return { dedication: decoded, isDedicatedView: true };
      }
    }

    if (para || de || msg) {
      return {
        dedication: {
          recipient: para || 'Ti',
          sender: de || 'Alguien especial',
          message: msg || PRESET_MESSAGES[0].text,
          bouquetType: (ramo as BouquetType) || 'girasoles',
        },
        isDedicatedView: true,
      };
    }

    return {
      dedication: {
        recipient: 'Mi Persona Favorita',
        sender: 'Alguien que te quiere mucho',
        message: PRESET_MESSAGES[0].text,
        bouquetType: 'girasoles' as BouquetType,
      },
      isDedicatedView: false,
    };
  }, [searchParams]);

  const [isLetterOpen, setIsLetterOpen] = useState<boolean>(false);

  // Al abrir la sorpresa dedicada
  const handleRevealSurprise = () => {
    setIsLetterOpen(true);
    musicBox?.play();
    musicBox?.playChime();

    // Lluvia de confeti
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#F59E0B', '#FEF08A', '#FBBF24'],
    });
  };

  const handleBouquetClick = () => {
    musicBox?.playChime();
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.5 },
      colors: ['#FFD700', '#F59E0B', '#FEF08A', '#FBBF24'],
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50 via-yellow-50/40 to-amber-100/30 text-amber-950 relative overflow-x-hidden">
      {/* Canvas con lluvia de pétalos y luciérnagas */}
      <FallingPetals />

      {/* Barra de Navegación */}
      <HeaderNav />
      <StructuredData />

      {/* ================= CONTENIDO PRINCIPAL ================= */}
      <main className="flex-1 flex flex-col items-center justify-center max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 z-10">
        <AdBannerPlaceholder slot="home-top" />

        {/* CASO A: VISTA DE DEDICATORIA PERSONALIZADA RECIBIDA */}
        {isDedicatedView ? (
          <div className="w-full flex flex-col items-center text-center animate-fadeIn">
            {/* Badge de sorpresa */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-amber-200/90 text-amber-950 border border-amber-300 shadow-sm mb-4">
              <Gift className="w-4 h-4 text-amber-700 animate-bounce" />
              <span>¡Tienes una sorpresa especial esperándote!</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-amber-950 tracking-tight mb-2">
              Flores Amarillas para {dedication.recipient} 🌻
            </h1>

            <p className="text-base sm:text-xl text-amber-800/80 max-w-xl mx-auto mb-6">
              De parte de <span className="font-semibold text-amber-950">{dedication.sender}</span> con todo su amor y cariño.
            </p>

            {/* Ramo interactivo */}
            <div className="my-2">
              <YellowBouquet
                type={dedication.bouquetType}
                onFlowerClick={handleBouquetClick}
              />
            </div>

            {/* Botones de acción para quien recibe */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 mt-6">
              <button
                onClick={handleRevealSurprise}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-bold text-base shadow-[0_10px_30px_rgba(217,119,6,0.35)] hover:shadow-[0_15px_35px_rgba(217,119,6,0.45)] transform hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Mail className="w-5 h-5 text-amber-100" />
                <span>Abrir mi Carta & Mensaje 💛</span>
              </button>

              <Link
                href="/crear"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/90 hover:bg-white text-amber-900 border border-amber-300 font-semibold text-sm shadow-sm hover:scale-105 transition-all cursor-pointer"
              >
                <PlusCircle className="w-4 h-4 text-amber-700" />
                <span>Responder / Dedicar Flores</span>
              </Link>
            </div>
          </div>
        ) : (
          /* CASO B: VISITANTE GENERAL / HOME EXPLORER */
          <div className="w-full flex flex-col items-center text-center animate-fadeIn">
            {/* Badge Floricienta & Primavera */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-amber-200/90 text-amber-950 border border-amber-300 shadow-sm mb-4">
              <Sparkles className="w-4 h-4 text-amber-700 animate-spin" style={{ animationDuration: '8s' }} />
              <span>Primavera &bull; Tradición del 21 de Septiembre</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-amber-950 tracking-tight max-w-3xl leading-[1.1] mb-4">
              Para que nunca te falten tus flores amarillas 🌻
            </h1>

            <p className="text-base sm:text-xl font-serif italic text-amber-800/80 max-w-2xl mx-auto mb-8">
              &ldquo;Ella sabía que él sabía, que algún día pasaría... que vendría a buscarla con sus flores amarillas.&rdquo;
            </p>

            {/* Ramo Central Interactivo */}
            <div className="my-2">
              <YellowBouquet
                type="girasoles"
                onFlowerClick={handleBouquetClick}
              />
            </div>

            {/* Acciones Principales */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
              <Link
                href="/crear"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-bold text-base shadow-[0_10px_30px_rgba(217,119,6,0.35)] hover:shadow-[0_15px_35px_rgba(217,119,6,0.45)] transform hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Gift className="w-5 h-5 text-amber-100" />
                <span>Dedicar a alguien especial 💛</span>
              </Link>

              <button
                onClick={() => {
                  setIsLetterOpen(true);
                  musicBox?.playChime();
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/90 hover:bg-white text-amber-950 border border-amber-300 font-semibold text-sm shadow-sm hover:scale-105 transition-all cursor-pointer"
              >
                <Mail className="w-4 h-4 text-amber-700" />
                <span>Ver Carta de Muestra</span>
              </button>
            </div>

            {/* Mini Juego: Deshojar el Girasol */}
            <div className="w-full mt-14">
              <PetalGame />
            </div>

            {/* Sección Cultural: La historia de las Flores Amarillas */}
            <section className="mt-14 max-w-3xl w-full text-left bg-white/75 backdrop-blur-md p-6 sm:p-10 rounded-3xl border border-amber-200/80 shadow-[0_10px_30px_rgba(234,179,8,0.1)]">
              <div className="flex items-center gap-2 text-amber-800 font-serif font-bold text-xl sm:text-2xl mb-4 border-b border-amber-200/60 pb-3">
                <span className="text-2xl">🌻</span>
                <span>¿Por qué regalamos Flores Amarillas?</span>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-amber-900/90 leading-relaxed font-sans">
                <p>
                  Esta hermosa tradición se originó con la icónica telenovela argentina <strong className="text-amber-950">Floricienta</strong> y su canción <em>&ldquo;Flores Amarillas&rdquo;</em>, donde la protagonista sueña desde pequeña con que el amor de su vida la sorprenda con un ramo de flores amarillas.
                </p>
                <p>
                  Cada <strong className="text-amber-950">21 de septiembre</strong> (inicio de la primavera en el hemisferio sur) y en marzo (inicio de la primavera en el norte), millones de personas regalan flores amarillas a sus parejas, amistades y seres queridos como símbolo de:
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <li className="flex items-start gap-2 bg-amber-50/80 p-3 rounded-xl border border-amber-200/60">
                    <span className="text-lg">☀️</span>
                    <div>
                      <strong className="block text-amber-950 text-xs sm:text-sm">Luz y Energía Positiva</strong>
                      <span className="text-xs text-amber-800/80">Deseos de alegría pura y vitalidad inagotable.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2 bg-amber-50/80 p-3 rounded-xl border border-amber-200/60">
                    <span className="text-lg">💛</span>
                    <div>
                      <strong className="block text-amber-950 text-xs sm:text-sm">Amor Incondicional</strong>
                      <span className="text-xs text-amber-800/80">Promesa de acompañar y cuidar sus sueños.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2 bg-amber-50/80 p-3 rounded-xl border border-amber-200/60">
                    <span className="text-lg">🌱</span>
                    <div>
                      <strong className="block text-amber-950 text-xs sm:text-sm">Nuevos Comienzos</strong>
                      <span className="text-xs text-amber-800/80">Florecer junto a esa persona especial.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2 bg-amber-50/80 p-3 rounded-xl border border-amber-200/60">
                    <span className="text-lg">✨</span>
                    <div>
                      <strong className="block text-amber-950 text-xs sm:text-sm">Amistad Eterna</strong>
                      <span className="text-xs text-amber-800/80">Agradecimiento por su lealtad y ternura.</span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Tarjeta de flores reales de afiliados */}
              <AffiliateFloristCard className="mt-8" />

              {/* Enlaces de interés SEO */}
              <div className="mt-8 pt-6 border-t border-amber-200/60 flex flex-wrap items-center justify-between gap-3 text-xs text-amber-900 font-semibold">
                <div className="flex items-center gap-3">
                  <Link
                    href="/significado"
                    className="inline-flex items-center gap-1 text-amber-800 hover:text-amber-950 underline underline-offset-2"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                    <span>¿Qué significan las flores amarillas?</span>
                  </Link>
                  <span className="text-amber-300">&bull;</span>
                  <Link
                    href="/frases"
                    className="inline-flex items-center gap-1 text-amber-800 hover:text-amber-950 underline underline-offset-2"
                  >
                    <span>50+ Frases de flores amarillas</span>
                  </Link>
                </div>

                <Link
                  href="/crear"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-bold shadow-md hover:scale-105 transition-all cursor-pointer"
                >
                  <span>Crear dedicatoria</span>
                  <span>✨</span>
                </Link>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Modal de la Carta de Dedicatoria */}
      <LoveLetterModal
        dedication={dedication}
        isOpen={isLetterOpen}
        onClose={() => setIsLetterOpen(false)}
      />

      {/* Reproductor Flotante de Música */}
      <MusicPlayer />

      {/* Pie de página con contactos de GitHub */}
      <Footer />
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-amber-50 text-amber-900">
          <div className="flex flex-col items-center gap-2">
            <span className="text-4xl animate-bounce">🌻</span>
            <span className="text-sm font-serif">Floreciendo tus flores amarillas...</span>
          </div>
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import HeaderNav from '@/components/HeaderNav';
import FallingPetals from '@/components/FallingPetals';
import MusicPlayer from '@/components/MusicPlayer';
import AdBannerPlaceholder from '@/components/AdBannerPlaceholder';
import AffiliateFloristCard from '@/components/AffiliateFloristCard';
import { Copy, Check, ArrowRight, BookOpen } from 'lucide-react';
import { musicBox } from '@/lib/audioSynthesis';

interface FraseItem {
  id: number;
  category: string;
  text: string;
  author?: string;
}

const FRASES_DATA: FraseItem[] = [
  // Categoría: Pareja / Amor
  {
    id: 1,
    category: 'Amor & Novios',
    text: 'Ella sabía que él sabía, que algún día pasaría... y hoy aquí estoy, cumpliendo esa promesa porque te mereces todas las flores del universo.',
    author: 'Inspirada en Floricienta',
  },
  {
    id: 2,
    category: 'Amor & Novios',
    text: 'Las flores amarillas significan alegría, nuevos comienzos y un amor que florece día con día. Gracias por ser el sol más bonito de mi vida.',
  },
  {
    id: 3,
    category: 'Amor & Novios',
    text: 'No quería que pasara esta fecha sin recordarte lo valiosa que eres para mí. Estas flores amarillas nunca se marchitan, porque están hechas con todo mi amor.',
  },
  {
    id: 4,
    category: 'Amor & Novios',
    text: 'Que nunca te falten flores amarillas, sonrisas sinceras ni motivos para soñar a mi lado. Te amo con toda mi alma.',
  },
  {
    id: 5,
    category: 'Amor & Novios',
    text: 'Si pudiera bajarte el sol te lo daría, pero como no puedo, te entrego estas flores amarillas que llevan toda su luz y mi devoción por ti.',
  },

  // Categoría: Amistad
  {
    id: 6,
    category: 'Mejor Amiga & Amistad',
    text: 'Dicen que regalar flores amarillas a una amiga es desearle éxito, felicidad eterna y una vida llena de colores. Gracias por ser mi persona favorita.',
  },
  {
    id: 7,
    category: 'Mejor Amiga & Amistad',
    text: 'Las mejores personas llegan para quedarse y llenar de brillo cada rincón oscuro. Gracias por tu amistad incondicional y por alegrar mis días.',
  },
  {
    id: 8,
    category: 'Mejor Amiga & Amistad',
    text: 'Para la mejor amiga del mundo: estas flores amarillas son para que recuerdes lo increíble, fuerte y especial que eres siempre.',
  },

  // Categoría: Floricienta y Poéticas
  {
    id: 9,
    category: 'Floricienta & Poesía',
    text: 'Él la estaba esperando con una flor amarilla. Ella lo estaba soñando con la luz en su pupila... y el destino unió dos almas bajo el cielo de primavera.',
    author: 'Floricienta',
  },
  {
    id: 10,
    category: 'Floricienta & Poesía',
    text: 'No te apures, no detengas el instante del encuentro... las flores amarillas marcan el momento en que todo vuelve a comenzar.',
    author: 'Floricienta',
  },
  {
    id: 11,
    category: 'Floricienta & Poesía',
    text: 'En un mundo que a veces se siente gris, eres tú quien le devuelve el color amarillo y dorado a cada uno de mis días.',
  },

  // Categoría: Frases Cortas (WhatsApp / Instagram)
  {
    id: 12,
    category: 'Frases Cortas',
    text: 'Para que nunca te falten tus flores amarillas ni motivos para sonreír 🌻💛',
  },
  {
    id: 13,
    category: 'Frases Cortas',
    text: 'Un ramo de flores amarillas para la persona que ilumina mi universo entero ✨',
  },
  {
    id: 14,
    category: 'Frases Cortas',
    text: 'Llegó la primavera y contigo florecen todos mis sueños más bonitos 🌼',
  },
  {
    id: 15,
    category: 'Frases Cortas',
    text: 'Donde florecen flores amarillas, hay esperanza, ternura y un amor sincero 🌻',
  },
];

const CATEGORIES = ['Todas', 'Amor & Novios', 'Mejor Amiga & Amistad', 'Floricienta & Poesía', 'Frases Cortas'];

export default function FrasesPage() {
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const filteredFrases =
    selectedCategory === 'Todas'
      ? FRASES_DATA
      : FRASES_DATA.filter((f) => f.category === selectedCategory);

  const handleCopy = async (id: number, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      musicBox?.playChime();
      setTimeout(() => setCopiedId(null), 2500);
    } catch {}
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50 via-yellow-50/40 to-amber-100/30 text-amber-950 relative overflow-x-hidden">
      <FallingPetals />
      <HeaderNav />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-10 z-10">
        {/* Cabecera de la página */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-semibold bg-amber-200/80 text-amber-900 border border-amber-300 mb-3">
            <BookOpen className="w-3.5 h-3.5 text-amber-700" />
            Directorio de Frases & Versos
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-amber-950 tracking-tight leading-tight mb-3">
            50+ Frases y Dedicatorias de Flores Amarillas 🌻
          </h1>
          <p className="text-base sm:text-lg text-amber-800/85">
            Inspírate con las frases más bonitas para tu novia, novio, mejor amiga o estado de WhatsApp. Cópialas o úsalas directamente en tu dedicatoria virtual.
          </p>
        </div>

        {/* Filtros de Categorías */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                musicBox?.playChime();
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-white shadow-md scale-105'
                  : 'bg-white/80 hover:bg-white text-amber-900 border border-amber-200 shadow-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Banner publicitario */}
        <AdBannerPlaceholder slot="frases-top" />

        {/* Cuadrícula de Frases */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredFrases.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-3xl bg-white/85 backdrop-blur-md border border-amber-200/80 shadow-[0_10px_25px_rgba(234,179,8,0.08)] flex flex-col justify-between transition-all hover:shadow-[0_15px_30px_rgba(234,179,8,0.18)] hover:border-amber-400 group"
            >
              <div>
                <span className="inline-block text-[11px] font-bold text-amber-700 uppercase tracking-wider bg-amber-100/90 px-2.5 py-0.5 rounded-full mb-3">
                  {item.category}
                </span>
                <p className="text-base font-serif italic text-amber-950 leading-relaxed">
                  &ldquo;{item.text}&rdquo;
                </p>
                {item.author && (
                  <p className="text-xs text-amber-600 font-semibold mt-2">
                    — {item.author}
                  </p>
                )}
              </div>

              {/* Botones de acción por frase */}
              <div className="mt-5 pt-4 border-t border-amber-200/60 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleCopy(item.id, item.text)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-semibold transition-colors cursor-pointer"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">¡Copiada!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Frase</span>
                    </>
                  )}
                </button>

                <Link
                  href={`/crear?msg=${encodeURIComponent(item.text)}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 hover:text-amber-950 group-hover:translate-x-0.5 transition-all"
                >
                  <span>Crear Ramo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Tarjeta de Afiliados */}
        <AffiliateFloristCard />

        {/* Banner publicitario inferior */}
        <AdBannerPlaceholder slot="frases-bottom" />
      </main>

      <MusicPlayer />
    </div>
  );
}

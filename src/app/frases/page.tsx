'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import HeaderNav from '@/components/HeaderNav';
import FallingPetals from '@/components/FallingPetals';
import MusicPlayer from '@/components/MusicPlayer';
import Footer from '@/components/Footer';
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
  // ================= CATEGORÍA: AMOR & NOVIOS =================
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
  {
    id: 6,
    category: 'Amor & Novios',
    text: 'Como un girasol que persigue la luz en cada amanecer, mi corazón te busca y sonríe cada vez que estás cerca.',
  },
  {
    id: 7,
    category: 'Amor & Novios',
    text: 'Tú haces que cualquier día común se sienta como el primer día de primavera. Gracias por existir y por amarme.',
  },
  {
    id: 8,
    category: 'Amor & Novios',
    text: 'Prometo que año tras año, en cada primavera y en cada invierno, jamás te faltarán motivos para sentirte la persona más amada del mundo.',
  },
  {
    id: 9,
    category: 'Amor & Novios',
    text: 'Amarte es tan natural y hermoso como ver un campo de girasoles abriéndose al sol de la mañana.',
  },

  // ================= CATEGORÍA: MEJOR AMIGA & AMISTAD =================
  {
    id: 10,
    category: 'Mejor Amiga & Amistad',
    text: 'Dicen que regalar flores amarillas a una amiga es desearle éxito, felicidad eterna y una vida llena de colores. Gracias por ser mi persona favorita.',
  },
  {
    id: 11,
    category: 'Mejor Amiga & Amistad',
    text: 'Las mejores personas llegan para quedarse y llenar de brillo cada rincón oscuro. Gracias por tu amistad incondicional y por alegrar mis días.',
  },
  {
    id: 12,
    category: 'Mejor Amiga & Amistad',
    text: 'Para la mejor amiga del mundo: estas flores amarillas son para que recuerdes lo increíble, fuerte y especial que eres siempre.',
  },
  {
    id: 13,
    category: 'Mejor Amiga & Amistad',
    text: 'Nuestra amistad vale más que mil ramos de flores. Gracias por escucharme, cuidarme y compartir tantas risas inolvidables.',
  },
  {
    id: 14,
    category: 'Mejor Amiga & Amistad',
    text: 'Las amigas verdaderas son como las flores amarillas: transmiten paz, energía positiva y alegría incondicional.',
  },
  {
    id: 15,
    category: 'Mejor Amiga & Amistad',
    text: 'Que este día te llene de bendiciones y te recuerde que pase lo que pase, siempre tendrás en mí un refugio y un abrazo sincero.',
  },
  {
    id: 16,
    category: 'Mejor Amiga & Amistad',
    text: 'Gracias por ser mi cómplice en todas las locuras y mi calma en los momentos difíciles. ¡Feliz día de las flores amarillas!',
  },

  // ================= CATEGORÍA: FLORICIENTA & POESÍA =================
  {
    id: 17,
    category: 'Floricienta & Poesía',
    text: 'Él la estaba esperando con una flor amarilla. Ella lo estaba soñando con la luz en su pupila... y el destino unió dos almas bajo el cielo de primavera.',
    author: 'Floricienta',
  },
  {
    id: 18,
    category: 'Floricienta & Poesía',
    text: 'No te apures, no detengas el instante del encuentro... las flores amarillas marcan el momento en que todo vuelve a comenzar.',
    author: 'Floricienta',
  },
  {
    id: 19,
    category: 'Floricienta & Poesía',
    text: 'En un mundo que a veces se siente gris, eres tú quien le devuelve el color amarillo y dorado a cada uno de mis días.',
  },
  {
    id: 20,
    category: 'Floricienta & Poesía',
    text: 'Las promesas más puras son las que nacen del corazón de un niño y florecen cuando encontramos al amor verdadero.',
  },
  {
    id: 21,
    category: 'Floricienta & Poesía',
    text: 'Cierro los ojos y vuelvo a soñar con ese instante donde las flores amarillas cubren el suelo y tu mano sostiene la mía.',
  },
  {
    id: 22,
    category: 'Floricienta & Poesía',
    text: 'Hay primaveras que duran un suspiro, pero el recuerdo de tus flores amarillas durará para toda la eternidad.',
  },
  {
    id: 23,
    category: 'Floricienta & Poesía',
    text: 'Que el viento de septiembre sople suave y te susurre al oído lo profundamente amada que eres.',
  },

  // ================= CATEGORÍA: FAMILIA & AGRADECIMIENTO =================
  {
    id: 24,
    category: 'Familia & Agradecimiento',
    text: 'Para la persona que me enseñó con el ejemplo lo que significa cuidar, proteger y amar sin condiciones. ¡Te mereces todas las flores del mundo!',
  },
  {
    id: 25,
    category: 'Familia & Agradecimiento',
    text: 'Mamá/Papá: gracias por ser el pilar de mi vida y por llenar mi hogar con la calidez y alegría que hoy representan estas flores amarillas.',
  },
  {
    id: 26,
    category: 'Familia & Agradecimiento',
    text: 'A mi hermana/o querida/o: gracias por compartir mi historia, mis raíces y por estar siempre a mi lado en cada etapa.',
  },
  {
    id: 27,
    category: 'Familia & Agradecimiento',
    text: 'Estas flores amarillas representan mi gratitud eterna por tu generosidad, tus sabios consejos y tu amor sin límites.',
  },
  {
    id: 28,
    category: 'Familia & Agradecimiento',
    text: 'La familia es el jardín donde aprendimos a florecer. Gracias por regar mi vida con cariño constante y bendiciones.',
  },

  // ================= CATEGORÍA: FRASES CORTAS & ESTADOS =================
  {
    id: 29,
    category: 'Frases Cortas',
    text: 'Para que nunca te falten tus flores amarillas ni motivos para sonreír 🌻💛',
  },
  {
    id: 30,
    category: 'Frases Cortas',
    text: 'Un ramo de flores amarillas para la persona que ilumina mi universo entero ✨',
  },
  {
    id: 31,
    category: 'Frases Cortas',
    text: 'Llegó la primavera y contigo florecen todos mis sueños más bonitos 🌼',
  },
  {
    id: 32,
    category: 'Frases Cortas',
    text: 'Donde florecen flores amarillas, hay esperanza, ternura y un amor sincero 🌻',
  },
  {
    id: 33,
    category: 'Frases Cortas',
    text: 'Que tu vida brille tan fuerte y cálida como un campo de girasoles en septiembre ☀️',
  },
  {
    id: 34,
    category: 'Frases Cortas',
    text: 'Promesa cumplida: aquí están tus flores amarillas que nunca se marchitan 💛',
  },
  {
    id: 35,
    category: 'Frases Cortas',
    text: 'Flores amarillas para el amor de mi vida, hoy y siempre 🌻✨',
  },
  {
    id: 36,
    category: 'Frases Cortas',
    text: 'El amarillo es el color de tu risa cuando estamos juntos 🍯🌼',
  },
  {
    id: 37,
    category: 'Frases Cortas',
    text: 'Ningún 21 de septiembre pasará sin que te recuerde cuánto te quiero 💛',
  },
  {
    id: 38,
    category: 'Frases Cortas',
    text: 'Flores virtuales, pero con amor 100% real e infinito 🌻🥰',
  },
  {
    id: 39,
    category: 'Frases Cortas',
    text: 'Eres mi primavera favorita en cualquier estación del año 🌷💛',
  },
  {
    id: 40,
    category: 'Frases Cortas',
    text: 'Un girasol nunca olvida mirar al sol, y yo nunca olvido cuidarte a ti 🌻',
  },
];

const CATEGORIES = [
  'Todas',
  'Amor & Novios',
  'Mejor Amiga & Amistad',
  'Floricienta & Poesía',
  'Familia & Agradecimiento',
  'Frases Cortas',
];

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
    <div className="min-h-[100dvh] flex flex-col bg-gradient-to-b from-amber-50 via-yellow-50/40 to-amber-100/30 text-amber-950 relative overflow-x-hidden pb-20 md:pb-0">
      <FallingPetals />
      <HeaderNav />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 z-10">
        {/* Cabecera de la página */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-amber-200/80 text-amber-900 border border-amber-300 mb-2 sm:mb-3">
            <BookOpen className="w-3.5 h-3.5 text-amber-700" />
            Directorio Completo de Frases
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-amber-950 tracking-tight leading-tight mb-2 sm:mb-3">
            50+ Frases y Dedicatorias de Flores Amarillas 🌻
          </h1>
          <p className="text-sm sm:text-base text-amber-800/85">
            Copia cualquier frase con un toque o envíala directamente en tu dedicatoria virtual para WhatsApp.
          </p>
        </div>

        {/* Filtros de Categorías con Desplazamiento Horizontal en Móviles */}
        <div className="w-full overflow-x-auto no-scrollbar py-2 -mx-4 px-4 sm:mx-0 sm:px-0 mb-6 flex items-center gap-2 sm:justify-center">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                musicBox?.playChime();
              }}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer shrink-0 active:scale-95 ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-white shadow-md font-bold'
                  : 'bg-white/90 hover:bg-white text-amber-900 border border-amber-200 shadow-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Banner publicitario superior */}
        <AdBannerPlaceholder slot="frases-top" />

        {/* Cuadrícula de Frases Responsiva */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {filteredFrases.map((item) => (
            <div
              key={item.id}
              className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/90 backdrop-blur-md border border-amber-200/80 shadow-[0_4px_20px_rgba(234,179,8,0.08)] flex flex-col justify-between transition-all hover:shadow-[0_10px_25px_rgba(234,179,8,0.16)] hover:border-amber-400 group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="inline-block text-[10px] sm:text-[11px] font-bold text-amber-700 uppercase tracking-wider bg-amber-100/90 px-2.5 py-0.5 rounded-full">
                    {item.category}
                  </span>
                  <span className="text-amber-400 text-xs">🌻</span>
                </div>
                <p className="text-sm sm:text-base font-serif italic text-amber-950 leading-relaxed">
                  &ldquo;{item.text}&rdquo;
                </p>
                {item.author && (
                  <p className="text-xs text-amber-600 font-semibold mt-2">
                    — {item.author}
                  </p>
                )}
              </div>

              {/* Botones de acción táctiles y ergonómicos */}
              <div className="mt-4 pt-3 border-t border-amber-200/60 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => handleCopy(item.id, item.text)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 hover:bg-amber-200 active:scale-95 text-amber-900 text-xs font-semibold transition-colors cursor-pointer min-h-[36px]"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">¡Copiada!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-amber-700" />
                      <span>Copiar Frase</span>
                    </>
                  )}
                </button>

                <Link
                  href={`/crear?msg=${encodeURIComponent(item.text)}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 hover:text-amber-950 group-hover:translate-x-0.5 transition-all py-1.5 px-2"
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
      <Footer />
    </div>
  );
}

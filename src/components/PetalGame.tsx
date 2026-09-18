'use client';

import React, { useState } from 'react';
import { musicBox } from '@/lib/audioSynthesis';
import confetti from 'canvas-confetti';
import { Sparkles, RotateCcw, Heart } from 'lucide-react';

const PHRASES = [
  'Me quiere...',
  'Mucho...',
  'Poquito...',
  '¡Con toda su alma!',
  '¡Más que a las estrellas!',
  '¡Y para siempre jamás!',
];

export default function PetalGame() {
  const totalPetals = 8;
  const [pluckedIndices, setPluckedIndices] = useState<number[]>([]);
  const [currentPhrase, setCurrentPhrase] = useState<string>('Toca un pétalo para deshojar el girasol');
  const [isFinished, setIsFinished] = useState(false);

  const handlePluck = (index: number) => {
    if (pluckedIndices.includes(index) || isFinished) return;

    musicBox?.playChime();
    const newPlucked = [...pluckedIndices, index];
    setPluckedIndices(newPlucked);

    const phraseIndex = (newPlucked.length - 1) % PHRASES.length;
    setCurrentPhrase(PHRASES[phraseIndex]);

    if (newPlucked.length === totalPetals) {
      setIsFinished(true);
      setCurrentPhrase('¡CONFIRMADO! Te ama con todo su corazón y serás su flor amarilla eterna 💛🌻');
      confetti({
        particleCount: 75,
        spread: 80,
        origin: { y: 0.7 },
        colors: ['#FFD700', '#F59E0B', '#FEF08A', '#FBBF24'],
      });
    }
  };

  const handleReset = () => {
    setPluckedIndices([]);
    setIsFinished(false);
    setCurrentPhrase('Toca un pétalo para deshojar el girasol');
    musicBox?.playChime();
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 sm:p-8 bg-amber-50/80 backdrop-blur-md rounded-3xl border border-amber-300/80 shadow-[0_15px_35px_rgba(245,158,11,0.15)] flex flex-col items-center text-center my-8">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-200/70 text-amber-900 mb-3 border border-amber-300">
        <Sparkles className="w-3.5 h-3.5 text-amber-700" />
        Mini Juego Romántico
      </div>

      <h3 className="text-xl sm:text-2xl font-serif font-bold text-amber-950 mb-1">
        ¿Cuánto te quiere?
      </h3>

      <p className="text-sm font-medium text-amber-800 min-h-[2.5rem] flex items-center justify-center transition-all duration-300 px-4">
        {currentPhrase}
      </p>

      {/* SVG del Girasol Deshojable */}
      <div className="relative my-4 w-52 h-52 flex items-center justify-center select-none">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Pétalos exteriores clicables */}
          {Array.from({ length: totalPetals }).map((_, i) => {
            const isPlucked = pluckedIndices.includes(i);
            const angle = (i * 360) / totalPetals;

            return (
              <g
                key={i}
                transform={`rotate(${angle} 100 100)`}
                onClick={() => handlePluck(i)}
                className={`cursor-pointer transition-all duration-500 ease-out ${
                  isPlucked
                    ? 'opacity-0 scale-50 pointer-events-none'
                    : 'hover:scale-105 active:scale-95'
                }`}
              >
                {/* Pétalo */}
                <path
                  d="M100 100 C92 70 85 30 100 15 C115 30 108 70 100 100 Z"
                  fill="#FBBF24"
                  stroke="#D97706"
                  strokeWidth="1.5"
                  className="filter drop-shadow-sm hover:fill-amber-300 transition-colors"
                />
                <line
                  x1="100"
                  y1="30"
                  x2="100"
                  y2="80"
                  stroke="#B45309"
                  strokeWidth="1"
                  strokeOpacity="0.4"
                />
              </g>
            );
          })}

          {/* Centro del girasol */}
          <circle
            cx="100"
            cy="100"
            r="32"
            fill="#5B2904"
            stroke="#78350F"
            strokeWidth="3"
            className="drop-shadow-md"
          />
          {/* Textura interior de semillas */}
          {Array.from({ length: 12 }).map((_, idx) => {
            const a = (idx * 360) / 12;
            const cx = 100 + Math.cos((a * Math.PI) / 180) * 18;
            const cy = 100 + Math.sin((a * Math.PI) / 180) * 18;
            return <circle key={idx} cx={cx} cy={cy} r="2" fill="#F59E0B" />;
          })}
          <circle cx="100" cy="100" r="10" fill="#3E1C00" />
        </svg>

        {isFinished && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Heart className="w-16 h-16 text-amber-500 fill-amber-400 animate-bounce drop-shadow-lg" />
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 mt-2">
        <p className="text-xs text-amber-700/80">
          Pétalos restantes: {totalPetals - pluckedIndices.length} de {totalPetals}
        </p>

        {pluckedIndices.length > 0 && (
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-200 hover:bg-amber-300 text-amber-900 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reiniciar
          </button>
        )}
      </div>
    </div>
  );
}

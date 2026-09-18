'use client';

import React, { useState, useEffect } from 'react';
import { musicBox } from '@/lib/audioSynthesis';
import { Volume2, VolumeX, Music } from 'lucide-react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Si el usuario hace clic en cualquier lugar por primera vez, sugerimos o iniciamos la música
    const handleFirstTouch = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
      }
    };
    window.addEventListener('click', handleFirstTouch, { once: true });
    return () => window.removeEventListener('click', handleFirstTouch);
  }, [hasInteracted]);

  const toggleMusic = () => {
    if (!musicBox) return;
    const playing = musicBox.toggle();
    setIsPlaying(playing);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
      <button
        onClick={toggleMusic}
        className={`group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full backdrop-blur-md shadow-lg border transition-all duration-300 cursor-pointer ${
          isPlaying
            ? 'bg-amber-400 text-amber-950 border-amber-300 shadow-[0_4px_20px_rgba(251,191,36,0.5)] scale-105'
            : 'bg-white/80 hover:bg-white text-amber-900 border-amber-200/80 shadow-md hover:scale-105'
        }`}
        title={isPlaying ? 'Pausar música romántica' : 'Reproducir música de Flores Amarillas'}
        aria-label="Control de música"
      >
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-700 ${
            isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''
          }`}
        >
          {isPlaying ? (
            <span className="text-base select-none">🌻</span>
          ) : (
            <Music className="w-4 h-4 text-amber-700" />
          )}
        </div>

        <span className="text-xs font-semibold tracking-tight hidden sm:inline">
          {isPlaying ? 'Sonando Flores Amarillas 🎶' : 'Activar Música 🎵'}
        </span>

        {isPlaying ? (
          <Volume2 className="w-4 h-4 text-amber-900 animate-pulse" />
        ) : (
          <VolumeX className="w-4 h-4 text-amber-600/70" />
        )}

        {/* Halo de pulso cuando está sonando */}
        {isPlaying && (
          <span className="absolute -inset-1 rounded-full border-2 border-amber-400/50 animate-ping pointer-events-none opacity-40" />
        )}
      </button>
    </div>
  );
}

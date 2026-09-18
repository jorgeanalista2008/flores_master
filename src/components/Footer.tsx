import React from 'react';
import Link from 'next/link';
import { Heart, Sparkles } from 'lucide-react';

function GithubIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-amber-200/60 bg-amber-50/60 backdrop-blur-md z-10 py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        {/* Marca y mensaje */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="flex items-center gap-2">
            <span className="text-2xl select-none">🌻</span>
            <span className="font-serif font-bold text-lg text-amber-950">
              Flores Amarillas
            </span>
          </div>
          <p className="text-xs text-amber-800/80 max-w-sm">
            Una experiencia web interactiva para dedicar flores inmarcesibles con música, cartas de amor y pétalos cayendo.
          </p>
        </div>

        {/* Contacto de GitHub del Creador */}
        <div className="flex flex-col items-center md:items-end gap-2">
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/jorgeanalista2008"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950 hover:bg-black text-amber-100 text-xs font-semibold shadow-sm transition-all hover:scale-105"
            >
              <GithubIcon className="w-4 h-4" />
              <span>@jorgeanalista2008</span>
            </a>

            <a
              href="https://github.com/jorgeanalista2008/flores_master"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-200/80 hover:bg-amber-300 text-amber-950 text-xs font-semibold border border-amber-300 transition-all hover:scale-105"
              title="Repositorio en GitHub"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Código en GitHub</span>
            </a>
          </div>

          <p className="text-[11px] text-amber-800/70 flex items-center gap-1">
            Desarrollado con <Heart className="w-3.5 h-3.5 text-amber-500 fill-amber-500 inline" /> por{' '}
            <a
              href="https://github.com/jorgeanalista2008"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-amber-950 underline underline-offset-2 hover:text-amber-700"
            >
              Jorge (@jorG_Rafa)
            </a>
          </p>
        </div>
      </div>

      {/* Enlaces y copyright */}
      <div className="max-w-5xl mx-auto mt-8 pt-6 border-t border-amber-200/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-amber-700/70">
        <div className="flex items-center gap-4">
          <Link href="/" className="hover:text-amber-950 transition-colors">
            Inicio
          </Link>
          <span>&bull;</span>
          <Link href="/crear" className="hover:text-amber-950 transition-colors">
            Crear Dedicatoria
          </Link>
          <span>&bull;</span>
          <Link href="/significado" className="hover:text-amber-950 transition-colors">
            Significado
          </Link>
          <span>&bull;</span>
          <Link href="/frases" className="hover:text-amber-950 transition-colors">
            Frases
          </Link>
        </div>

        <p>
          &copy; {currentYear} Flores Amarillas &bull; Que nunca te falten tus flores amarillas.
        </p>
      </div>
    </footer>
  );
}

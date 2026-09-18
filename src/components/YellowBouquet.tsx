'use client';

import React, { useState, useEffect, useId } from 'react';
import { BouquetType } from '@/lib/dedicationUtils';
import { Sparkles, Heart } from 'lucide-react';

interface YellowBouquetProps {
  type?: BouquetType;
  isBloomed?: boolean;
  className?: string;
  onFlowerClick?: () => void;
}

export default function YellowBouquet({
  type = 'girasoles',
  isBloomed = true,
  className = '',
  onFlowerClick,
}: YellowBouquetProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [internalBloomed, setInternalBloomed] = useState(false);
  const idPrefix = useId().replace(/:/g, '');

  useEffect(() => {
    // Delay de florecimiento para entrada suave
    const timer = setTimeout(() => {
      setInternalBloomed(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const bloomed = isBloomed && internalBloomed;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setTilt({ x: y, y: x });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      className={`relative flex flex-col items-center justify-center select-none transition-transform duration-300 ease-out cursor-pointer ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onFlowerClick}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
      title="Toca las flores para llenarlas de magia"
    >
      {/* Halo de luz cálida detrás del ramo */}
      <div
        className={`absolute w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-tr from-amber-400/25 via-yellow-300/30 to-amber-200/10 blur-3xl transition-opacity duration-1000 pointer-events-none ${
          bloomed ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        }`}
      />

      {/* Partículas flotantes alrededor del ramo */}
      <div className="absolute inset-0 pointer-events-none">
        <Sparkles
          className={`absolute top-6 left-8 text-amber-300 w-5 h-5 animate-pulse transition-opacity duration-700 ${
            bloomed ? 'opacity-80' : 'opacity-0'
          }`}
        />
        <Sparkles
          className={`absolute top-12 right-6 text-yellow-400 w-6 h-6 animate-bounce transition-opacity duration-700 ${
            bloomed ? 'opacity-90' : 'opacity-0'
          }`}
          style={{ animationDuration: '3s' }}
        />
        <Heart
          className={`absolute -top-2 right-1/4 text-amber-400/60 w-4 h-4 animate-pulse transition-opacity duration-700 ${
            bloomed ? 'opacity-70' : 'opacity-0'
          }`}
        />
      </div>

      {/* Ilustración SVG del Ramo */}
      <svg
        viewBox="0 0 500 560"
        className="w-full max-w-[340px] sm:max-w-[420px] md:max-w-[460px] h-auto drop-shadow-[0_15px_30px_rgba(234,179,8,0.35)] transition-all duration-1000 ease-out"
        style={{
          transform: bloomed ? 'scale(1)' : 'scale(0.85) translateY(20px)',
          opacity: bloomed ? 1 : 0.6,
        }}
      >
        <defs>
          {/* Degradados para pétalos de girasol */}
          <linearGradient id={`${idPrefix}-sunflower-petal`} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#EA580C" />
            <stop offset="30%" stopColor="#F59E0B" />
            <stop offset="70%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#FEF08A" />
          </linearGradient>

          <linearGradient id={`${idPrefix}-petal-highlight`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>

          {/* Centro del girasol con textura de semillas */}
          <radialGradient id={`${idPrefix}-sunflower-center`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3E1C00" />
            <stop offset="50%" stopColor="#5B2904" />
            <stop offset="85%" stopColor="#78350F" />
            <stop offset="100%" stopColor="#B45309" />
          </radialGradient>

          {/* Degradado para hojas y tallos */}
          <linearGradient id={`${idPrefix}-stem-grad`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#15803D" />
            <stop offset="50%" stopColor="#22C55E" />
            <stop offset="100%" stopColor="#166534" />
          </linearGradient>

          <linearGradient id={`${idPrefix}-leaf-grad`} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#166534" />
            <stop offset="60%" stopColor="#4ADE80" />
            <stop offset="100%" stopColor="#86EFAC" />
          </linearGradient>

          {/* Papel envoltorio craft y lazo dorado */}
          <linearGradient id={`${idPrefix}-wrap-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="50%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>

          <linearGradient id={`${idPrefix}-ribbon-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="50%" stopColor="#EAB308" />
            <stop offset="100%" stopColor="#CA8A04" />
          </linearGradient>
        </defs>

        {/* ================= TALLOS ================= */}
        <g stroke={`url(#${idPrefix}-stem-grad)`} strokeWidth="6" strokeLinecap="round">
          <path d="M250 260 Q240 370 235 480" />
          <path d="M190 270 Q220 370 225 480" />
          <path d="M310 270 Q270 370 250 480" />
          <path d="M140 290 Q200 380 220 480" />
          <path d="M360 290 Q290 380 255 480" />
        </g>

        {/* ================= HOJAS GRANDES ================= */}
        <g fill={`url(#${idPrefix}-leaf-grad)`} opacity="0.95">
          {/* Hoja izquierda */}
          <path d="M180 320 C120 310 90 350 70 390 C110 395 150 375 190 340 Z" />
          {/* Hoja derecha */}
          <path d="M320 320 C380 310 410 350 430 390 C390 395 350 375 310 340 Z" />
          {/* Hoja central baja */}
          <path d="M220 350 C180 400 190 440 210 460 C235 440 245 400 235 365 Z" opacity="0.8" />
          <path d="M270 350 C310 400 300 440 280 460 C255 440 245 400 255 365 Z" opacity="0.8" />
        </g>

        {/* ================= RAMO TRASERO (FLORES DE FONDO) ================= */}
        {/* Flor izquierda superior (pequeño girasol / margarita) */}
        <g transform="translate(130, 180) scale(0.68)">
          <SunflowerHead idPrefix={idPrefix} petalCount={16} />
        </g>

        {/* Flor derecha superior */}
        <g transform="translate(370, 180) scale(0.68)">
          <SunflowerHead idPrefix={idPrefix} petalCount={16} />
        </g>

        {/* Flor trasera superior centro */}
        <g transform="translate(250, 100) scale(0.75)">
          <SunflowerHead idPrefix={idPrefix} petalCount={18} />
        </g>

        {/* ================= FLORES LATERALES MEDIAS ================= */}
        <g transform="translate(160, 240) scale(0.85)">
          <SunflowerHead idPrefix={idPrefix} petalCount={20} />
        </g>

        <g transform="translate(340, 240) scale(0.85)">
          <SunflowerHead idPrefix={idPrefix} petalCount={20} />
        </g>

        {/* ================= GIRASOL PRINCIPAL RADIANTE (CENTRAL) ================= */}
        <g
          transform="translate(250, 220)"
          className="transition-transform duration-700 ease-out"
          style={{
            transform: bloomed ? 'translate(250px, 220px) scale(1)' : 'translate(250px, 220px) scale(0.8)',
          }}
        >
          <SunflowerHead idPrefix={idPrefix} petalCount={24} isMain />
        </g>

        {/* ================= PAPEL DE ENVOLTORIO & LAZO ================= */}
        <g id="bouquet-wrap">
          {/* Envoltorio elegante estilo bouquet con pliegues */}
          <path
            d="M170 370 L250 510 L330 370 Q250 400 170 370 Z"
            fill={`url(#${idPrefix}-wrap-grad)`}
            stroke="#B45309"
            strokeWidth="1.5"
            opacity="0.95"
          />
          {/* Sombra de pliegue */}
          <path
            d="M210 380 L250 510 L290 380 Q250 395 210 380 Z"
            fill="#D97706"
            opacity="0.3"
          />

          {/* Lazo y cinta dorada brillante */}
          <g transform="translate(250, 420)">
            {/* Cintas colgantes */}
            <path
              d="M-5 5 Q-20 40 -35 70 Q-15 55 -5 20 Z"
              fill={`url(#${idPrefix}-ribbon-grad)`}
            />
            <path
              d="M5 5 Q20 40 35 70 Q15 55 5 20 Z"
              fill={`url(#${idPrefix}-ribbon-grad)`}
            />
            {/* Orejas del lazo */}
            <ellipse
              cx="-22"
              cy="-6"
              rx="20"
              ry="12"
              transform="rotate(-20, -22, -6)"
              fill={`url(#${idPrefix}-ribbon-grad)`}
              stroke="#A16207"
              strokeWidth="1"
            />
            <ellipse
              cx="22"
              cy="-6"
              rx="20"
              ry="12"
              transform="rotate(20, 22, -6)"
              fill={`url(#${idPrefix}-ribbon-grad)`}
              stroke="#A16207"
              strokeWidth="1"
            />
            {/* Nudo central */}
            <circle cx="0" cy="-4" r="9" fill="#FACC15" stroke="#854D0E" strokeWidth="1.5" />
            <circle cx="-2" cy="-6" r="3" fill="#FEF08A" opacity="0.8" />
          </g>
        </g>
      </svg>

      {/* Indicador sutil de interacción */}
      <span className="mt-3 text-xs tracking-widest text-amber-700/80 font-medium uppercase bg-amber-500/10 px-3 py-1 rounded-full border border-amber-400/20 backdrop-blur-sm">
        🌻 {type === 'rosas' ? 'Rosas Amarillas' : type === 'tulipanes' ? 'Tulipanes del Sol' : type === 'jardin' ? 'Jardín Silvestre Dorado' : 'Girasoles Radiantes'} &bull; Toca para florecer magia 🌻
      </span>
    </div>
  );
}

// Componente para la cabeza de cada Girasol
function SunflowerHead({
  idPrefix,
  petalCount = 20,
  isMain = false,
}: {
  idPrefix: string;
  petalCount?: number;
  isMain?: boolean;
}) {
  const angleStep = 360 / petalCount;
  const radius = isMain ? 42 : 30;

  return (
    <g>
      {/* Capa trasera de pétalos (ligeramente más oscuros) */}
      <g>
        {Array.from({ length: petalCount }).map((_, i) => {
          const angle = i * angleStep + angleStep / 2;
          return (
            <path
              key={`back-${i}`}
              d={`M0 0 C${-12} ${-radius - 20}, ${-18} ${-radius - 50}, 0 ${-radius - 65} C${18} ${-radius - 50}, ${12} ${-radius - 20}, 0 0`}
              fill="#D97706"
              transform={`rotate(${angle})`}
              opacity="0.9"
            />
          );
        })}
      </g>

      {/* Capa frontal de pétalos radiantes dorados */}
      <g>
        {Array.from({ length: petalCount }).map((_, i) => {
          const angle = i * angleStep;
          return (
            <path
              key={`front-${i}`}
              d={`M0 0 C${-10} ${-radius - 15}, ${-16} ${-radius - 40}, 0 ${-radius - 55} C${16} ${-radius - 40}, ${10} ${-radius - 15}, 0 0`}
              fill={`url(#${idPrefix}-sunflower-petal)`}
              transform={`rotate(${angle})`}
            />
          );
        })}
      </g>

      {/* Halo de destello central */}
      <circle cx="0" cy="0" r={radius + 4} fill="#F59E0B" opacity="0.35" />

      {/* Centro oscuro del girasol */}
      <circle
        cx="0"
        cy="0"
        r={radius}
        fill={`url(#${idPrefix}-sunflower-center)`}
        stroke="#78350F"
        strokeWidth="2.5"
      />

      {/* Corona concéntrica de semillitas */}
      {isMain && (
        <g fill="#B45309" opacity="0.75">
          {Array.from({ length: 16 }).map((_, i) => {
            const a = (i * 360) / 16;
            const r = radius * 0.65;
            const cx = Math.cos((a * Math.PI) / 180) * r;
            const cy = Math.sin((a * Math.PI) / 180) * r;
            return <circle key={i} cx={cx} cy={cy} r="2.2" fill="#FBBF24" />;
          })}
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i * 360) / 8;
            const r = radius * 0.35;
            const cx = Math.cos((a * Math.PI) / 180) * r;
            const cy = Math.sin((a * Math.PI) / 180) * r;
            return <circle key={`inner-${i}`} cx={cx} cy={cy} r="1.8" fill="#F59E0B" />;
          })}
        </g>
      )}

      {/* Reflejo de luz */}
      <ellipse
        cx={-radius * 0.3}
        cy={-radius * 0.3}
        rx={radius * 0.35}
        ry={radius * 0.2}
        transform={`rotate(-30, ${-radius * 0.3}, ${-radius * 0.3})`}
        fill="#FFFFFF"
        opacity="0.12"
      />
    </g>
  );
}

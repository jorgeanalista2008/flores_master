import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import HeaderNav from '@/components/HeaderNav';
import FallingPetals from '@/components/FallingPetals';
import MusicPlayer from '@/components/MusicPlayer';
import Footer from '@/components/Footer';
import StructuredData from '@/components/StructuredData';
import AdBannerPlaceholder from '@/components/AdBannerPlaceholder';
import AffiliateFloristCard from '@/components/AffiliateFloristCard';
import { PlusCircle, HelpCircle, Calendar, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: '¿Qué significan las Flores Amarillas? Significado, Fechas y Tradición 🌻',
  description:
    'Descubre el significado de regalar flores amarillas en el amor y la amistad, por qué se regalan el 21 de septiembre y el 21 de marzo, y su origen en Floricienta.',
  keywords: [
    'que significan las flores amarillas',
    'flores amarillas 21 de septiembre significado',
    'cuando se regalan flores amarillas',
    'flores amarillas floricienta origen',
    'significado de rosas amarillas y girasoles',
  ],
};

const FAQ_DATA = [
  {
    question: '¿Qué significan las flores amarillas cuando te las regalan?',
    answer:
      'Regalar flores amarillas simboliza alegría, luz, vitalidad, optimismo y un amor cálido y duradero. También representan la promesa de acompañar a la persona en sus metas y desearle una vida colmada de felicidad y nuevos comienzos.',
  },
  {
    question: '¿Por qué se regalan flores amarillas el 21 de septiembre?',
    answer:
      'El 21 de septiembre marca la llegada de la primavera en el hemisferio sur (países como Argentina, Chile, Perú, Colombia y Bolivia). La fecha se popularizó mundialmente por la serie argentina Floricienta y su canción "Flores Amarillas", donde la protagonista sueña con recibir un ramo de su gran amor al comenzar la estación del florecimiento.',
  },
  {
    question: '¿Por qué también se regalan el 21 de marzo?',
    answer:
      'El 21 de marzo coincide con el equinoccio de primavera en el hemisferio norte (México, Estados Unidos, España, Centroamérica). La tendencia viral de TikTok y redes sociales extendió la tradición para que nadie en ningún rincón del mundo se quede sin sus flores amarillas primaverales.',
  },
  {
    question: '¿Qué tipos de flores amarillas son las mejores para regalar?',
    answer:
      'Los girasoles (símbolo de admiración y energía solar), las rosas amarillas (símbolo de ternura, amistad sincera y cariño puro), los tulipanes amarillos (elegancia y pensamientos alegres) y las margaritas silvestres (simpatía y sinceridad).',
  },
];

export default function SignificadoPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50 via-yellow-50/40 to-amber-100/30 text-amber-950 relative overflow-x-hidden">
      <FallingPetals />
      <HeaderNav />
      <StructuredData faqItems={FAQ_DATA} />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 pt-6 pb-24 sm:py-10 z-10">
        {/* Cabecera del Artículo */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-semibold bg-amber-200/80 text-amber-900 border border-amber-300 mb-3">
            <BookOpen className="w-3.5 h-3.5 text-amber-700" />
            Guía Completa & Tradición Floral
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-amber-950 tracking-tight leading-tight mb-4">
            ¿Qué Significan las Flores Amarillas? 🌻
          </h1>
          <p className="text-base sm:text-lg text-amber-800/85 leading-relaxed">
            Historia, simbolismo psicológico, fechas clave del 21 de septiembre y marzo, y por qué se han convertido en el detalle de amor más viral del mundo.
          </p>
        </div>

        {/* Banner publicitario superior */}
        <AdBannerPlaceholder slot="significado-top" />

        {/* Cuerpo del Contenido */}
        <article className="bg-white/85 backdrop-blur-md p-6 sm:p-10 rounded-3xl border border-amber-200/80 shadow-[0_15px_35px_rgba(234,179,8,0.1)] space-y-8 font-sans text-amber-900/90 leading-relaxed">
          {/* Sección 1 */}
          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-amber-950 flex items-center gap-2 border-b border-amber-200/60 pb-2">
              <span className="text-2xl">✨</span> El Significado Oculto del Color Amarillo
            </h2>
            <p>
              En la psicología del color y el lenguaje victoriano de las flores (<em>floriografía</em>), el color amarillo representa la <strong className="text-amber-950">luz del sol, el optimismo inquebrantable, la inteligencia y la calidez humana</strong>.
            </p>
            <p>
              A diferencia de las rosas rojas (que denotan pasión intensa), las flores amarillas expresan un amor entrañable: aquel que busca cuidar la felicidad cotidiana del otro, celebrar sus logros y desearle una vida brillante llena de vitalidad.
            </p>
          </section>

          {/* Sección 2: Las Fechas Clave */}
          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-amber-950 flex items-center gap-2 border-b border-amber-200/60 pb-2">
              <Calendar className="w-6 h-6 text-amber-600" /> ¿En qué Fechas se Regalan?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-300/80">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
                  Hemisferio Sur
                </span>
                <h3 className="text-lg font-serif font-bold text-amber-950 mt-1 mb-2">
                  21 de Septiembre 🌸
                </h3>
                <p className="text-sm text-amber-800/85">
                  Celebra el inicio de la primavera en Argentina, Chile, Perú, Uruguay, Bolivia y Paraguay. Es la fecha original vinculada al estreno de <em>Floricienta</em>.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-300/80">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
                  Hemisferio Norte
                </span>
                <h3 className="text-lg font-serif font-bold text-amber-950 mt-1 mb-2">
                  21 de Marzo ☀️
                </h3>
                <p className="text-sm text-amber-800/85">
                  Celebra el equinoccio de primavera en México, España, Estados Unidos y Centroamérica. Millones de personas regalan flores como símbolo de renovación y cariño.
                </p>
              </div>
            </div>
          </section>

          {/* Sección 3: El Fenómeno Floricienta */}
          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-amber-950 flex items-center gap-2 border-b border-amber-200/60 pb-2">
              <span>🎶</span> El Origen: Floricienta y la Canción Viral
            </h2>
            <p>
              En el año 2004, la productora Cris Morena lanzó la telenovela juvenil <strong className="text-amber-950">Floricienta</strong>, protagonizada por Florencia Bertotti. La canción principal relataba la tierna historia de una niña huérfana que soñaba con que el chico que amaba vendría a buscarla con un ramo de flores amarillas.
            </p>
            <blockquote className="my-4 p-4 rounded-2xl bg-amber-100/70 border-l-4 border-amber-500 font-serif italic text-amber-950 text-base">
              &ldquo;Ella sabía que él sabía, que algún día pasaría, que vendría a buscarla con sus flores amarillas... No te apures, no detengas el instante del encuentro...&rdquo;
            </blockquote>
            <p>
              Con la llegada de TikTok y las redes sociales, las nuevas generaciones adoptaron esta bella fantasía como un pacto de complicidad: <em>&ldquo;Si de verdad me quieres, no permitirás que pase la primavera sin mis flores amarillas&rdquo;</em>.
            </p>
          </section>

          {/* Banner de Afiliados */}
          <AffiliateFloristCard />

          {/* Sección 4: Preguntas Frecuentes (FAQ) para SEO */}
          <section className="space-y-4 pt-4">
            <h2 className="text-2xl font-serif font-bold text-amber-950 flex items-center gap-2 border-b border-amber-200/60 pb-2">
              <HelpCircle className="w-6 h-6 text-amber-600" /> Preguntas Frecuentes (FAQ)
            </h2>
            <div className="space-y-3">
              {FAQ_DATA.map((faq, idx) => (
                <details
                  key={idx}
                  className="group rounded-2xl bg-amber-50/70 border border-amber-200 p-4 transition-all duration-200"
                >
                  <summary className="font-semibold text-amber-950 cursor-pointer list-none flex items-center justify-between">
                    <span>{faq.question}</span>
                    <span className="text-amber-600 transition-transform group-open:rotate-180">
                      ▼
                    </span>
                  </summary>
                  <p className="mt-3 text-sm text-amber-800/90 leading-relaxed border-t border-amber-200/50 pt-2">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* CTA Final para crear ramo */}
          <div className="mt-10 p-8 rounded-3xl bg-gradient-to-br from-amber-100 via-yellow-100 to-amber-200 text-center border-2 border-amber-300 space-y-4">
            <span className="text-4xl">🌻</span>
            <h3 className="text-2xl font-serif font-bold text-amber-950">
              ¿Aún no has enviado tus Flores Amarillas?
            </h3>
            <p className="text-sm text-amber-800 max-w-md mx-auto">
              No dejes pasar el día sin sorprender a tu persona especial. Personaliza un ramo virtual con música y carta de amor ahora mismo.
            </p>
            <Link
              href="/crear"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-base shadow-md hover:shadow-lg transform hover:scale-105 transition-all cursor-pointer"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Crear Dedicatoria Gratis</span>
            </Link>
          </div>
        </article>

        {/* Banner publicitario inferior */}
        <AdBannerPlaceholder slot="significado-bottom" />
      </main>

      <MusicPlayer />
      <Footer />
    </div>
  );
}

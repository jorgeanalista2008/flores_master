import React from 'react';

interface StructuredDataProps {
  faqItems?: { question: string; answer: string }[];
}

export default function StructuredData({ faqItems }: StructuredDataProps) {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Flores Amarillas',
    url: 'https://floresamarillas.me',
    description:
      'Página web interactiva para dedicar flores amarillas con música, cartas personalizadas y ramos virtuales.',
    inLanguage: 'es',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://floresamarillas.me/frases?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Generador de Dedicatorias de Flores Amarillas',
    applicationCategory: 'EntertainmentApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  const faqSchema = faqItems && faqItems.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  );
}

export type BouquetType = 'girasoles' | 'rosas' | 'tulipanes' | 'jardin';

export interface DedicationData {
  recipient: string;
  sender: string;
  message: string;
  bouquetType: BouquetType;
  date?: string;
}

export const BOUQUET_OPTIONS: { id: BouquetType; name: string; icon: string; description: string }[] = [
  {
    id: 'girasoles',
    name: 'Girasoles Radiantes',
    icon: '🌻',
    description: 'Símbolo de admiración, luz y sol eterno en tu vida.'
  },
  {
    id: 'rosas',
    name: 'Rosas Amarillas',
    icon: '🌹',
    description: 'Representan cariño profundo, gratitud y alegría pura.'
  },
  {
    id: 'tulipanes',
    name: 'Tulipanes del Sol',
    icon: '🌷',
    description: 'Elegancia, ternura y la frescura de la primavera.'
  },
  {
    id: 'jardin',
    name: 'Jardín Silvestre Dorado',
    icon: '🌼',
    description: 'Una mezcla mágica de margaritas, girasoles y flores silvestres.'
  }
];

export const PRESET_MESSAGES = [
  {
    title: 'Promesa de Floricienta 🌻',
    text: 'Ella sabía que él sabía, que algún día pasaría... que vendría a buscarla con sus flores amarillas. Hoy cumplo esa promesa contigo, porque te mereces todas las flores del universo y una vida llena de sonrisas.'
  },
  {
    title: 'Mi persona favorita 💛',
    text: 'Dicen que regalar flores amarillas significa desearle felicidad, prosperidad y una vida luminosa a quien más amas. Gracias por ser esa luz incondicional en mis días.'
  },
  {
    title: 'Primavera en tu corazón ✨',
    text: 'Que nunca te falten flores amarillas, motivos para soñar, ni abrazos cálidos cuando los necesites. Eres una persona verdaderamente única y especial para mí.'
  },
  {
    title: 'Amor y complicidad 🌟',
    text: 'No quería que pasara esta fecha sin recordarte lo importante que eres para mí. Estas flores amarillas no se marchitan, porque están hechas con todo mi cariño.'
  },
  {
    title: 'Amistad que ilumina 🌼',
    text: 'Las mejores personas llegan para quedarse y llenar el mundo de color. Gracias por tu amistad incondicional, tus risas y tu calidez. ¡Feliz día de las flores amarillas!'
  },
  {
    title: 'Mi sol en días nublados ☀️',
    text: 'Como un girasol que siempre busca la luz del sol, mi corazón siempre encuentra calma y felicidad cuando está a tu lado. Gracias por iluminar mi mundo.'
  },
  {
    title: 'Un amor inmarcesible 🌹',
    text: 'Las flores frescas duran días, pero este ramo digital y lo que siento por ti jamás se marchitarán. Te elijo hoy, mañana y en cada primavera de mi vida.'
  },
  {
    title: 'Para mi mejor amiga 💫',
    text: 'Para la persona que conoce todos mis secretos, calma mis tristezas y celebra cada una de mis alegrías: ¡te mereces el campo de girasoles más grande del mundo!'
  },
  {
    title: 'Sincero agradecimiento 🌷',
    text: 'Te entrego estas flores amarillas como símbolo de gratitud por tu bondad, tu paciencia y por hacer de este mundo un lugar infinitamente más dulce y humano.'
  },
  {
    title: 'Cómplice de mis sueños 💖',
    text: 'Que este día de las flores amarillas te recuerde que tus sueños valen oro y que siempre estaré a tu lado para aplaudirte, cuidarte y verte florecer.'
  },
  {
    title: 'Detalle sorpresa 🎁',
    text: 'Una pequeña sorpresa amarilla para sacarte una sonrisa enorme hoy. No hay mayor alegría que verte feliz.'
  },
  {
    title: 'Promesa eterna 🌈',
    text: 'Ni la distancia ni el tiempo apagan lo que se cuida con el alma. Estas flores amarillas son mi promesa de lealtad, ternura y cariño eterno hacia ti.'
  }
];

/**
 * Codifica los datos de la dedicatoria en una cadena compacta segura para URL
 */
export function encodeDedication(data: DedicationData): string {
  try {
    const jsonStr = JSON.stringify(data);
    // Codificación Base64 compatible con caracteres UTF-8 en navegadores
    const utf8Bytes = encodeURIComponent(jsonStr).replace(/%([0-9A-F]{2})/g, (_, p1) =>
      String.fromCharCode(parseInt(p1, 16))
    );
    return btoa(utf8Bytes);
  } catch (err) {
    console.error('Error al codificar dedicatoria:', err);
    return '';
  }
}

/**
 * Decodifica la dedicatoria desde Base64 seguro para UTF-8
 */
export function decodeDedication(encoded: string): DedicationData | null {
  try {
    const binary = atob(encoded);
    const jsonStr = decodeURIComponent(
      Array.prototype.map
        .call(binary, (char: string) => '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonStr) as DedicationData;
  } catch (err) {
    console.warn('No se pudo decodificar mediante payload base64:', err);
    return null;
  }
}

/**
 * Genera el enlace público para compartir
 */
export function createShareableUrl(data: DedicationData, baseUrl: string = ''): string {
  const code = encodeDedication(data);
  const origin = baseUrl || (typeof window !== 'undefined' ? window.location.origin : '');
  const url = new URL(origin);
  url.searchParams.set('d', code);
  url.searchParams.set('para', data.recipient);
  url.searchParams.set('de', data.sender);
  url.searchParams.set('ramo', data.bouquetType);
  return url.toString();
}

/**
 * Mensaje listo para enviar por WhatsApp
 */
export function generateWhatsAppMessage(data: DedicationData, url: string): string {
  return `✨ ¡Hola ${data.recipient}! 💛\n\nTe he preparado una sorpresa muy especial con flores amarillas que nunca se marchitan 🌻\n\nToca el enlace para abrir tu ramo y dedicatoria:\n👉 ${url}\n\nCon mucho cariño, ${data.sender} ✨`;
}

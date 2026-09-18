# 🌻 Flores Amarillas — Experiencia Web Interactiva & Dedicatorias

> **"Ella sabía que él sabía, que algún día pasaría... que vendría a buscarla con sus flores amarillas."** 🌼✨

Una aplicación web moderna, interactiva y emotiva construida con **Next.js 16**, **React 19**, **Tailwind CSS v4**, **HTML5 Canvas** y **Web Audio API**. Diseñada especialmente para celebrar la popular tradición de regalar flores amarillas cada **21 de septiembre** (primavera en el hemisferio sur) y **21 de marzo** (primavera en el hemisferio norte), inspirada en la mítica telenovela *Floricienta*.

Completamente preparada para **viralización en redes sociales (WhatsApp, Instagram, TikTok)**, optimización masiva de motores de búsqueda (**SEO con Schema.org**) y **monetización pasiva (Google AdSense y Marketing de Afiliados)**.

---

## 📸 Demostración de Características

### 1. 🌻 Ramo de Flores Amarillas 3D Interactivo
- Ilustración vectorial SVG de alta definición de un bouquet de girasoles radiantes con lazo dorado y destellos.
- **Efecto de perspectiva 3D reactiva:** el ramo se inclina suavemente siguiendo el movimiento del cursor en ordenadores o el tacto en dispositivos móviles.
- Animación de florecimiento progresivo y destello al cargar la página.
- Al tocar el ramo, brota confeti floral dorado y un tintineo mágico.

### 2. ✨ Lluvia de Pétalos Dorados y Luciérnagas (Canvas)
- Renderizado de alto rendimiento a 60 FPS mediante Canvas API nativo.
- Pétalos en tonos dorados, ámbar y amarillo brillante que caen con balanceo orgánico y rotación en una brisa virtual.
- Partículas de luciérnagas y polvo de hadas luminiscente en el fondo.
- **Interacción al tacto:** cada clic o toque en la pantalla genera una explosión de nuevos pétalos en ese punto exacto.

### 3. 💌 Generador de Dedicatorias Personalizadas para WhatsApp
- Permite a cualquier persona crear un detalle único:
  - **Para:** Nombre de la persona amada, amiga especial o familiar.
  - **De:** Nombre o apodo cariñoso de quien lo envía.
  - **Estilo de ramo:** Girasoles Radiantes, Rosas Amarillas, Tulipanes del Sol o Jardín Silvestre.
  - **Mensaje:** Selección de frases poéticas predefinidas o redacción de un mensaje personalizado sin límite de cariño.
- **Previsualización en tiempo real** de la dedicatoria.
- **Generación de enlace compartible único** con codificación segura en Base64 compatible con emojis y caracteres UTF-8.
- **Botón de compartir en WhatsApp con 1 clic:** redacta automáticamente un mensaje cariñoso con el enlace listo para enviar.

### 4. 📜 Sobre Interactivo con Sello de Cera de Girasol
- Cuando el destinatario abre el enlace recibido, es recibido por una experiencia de "unboxing" sorpresa.
- Un sobre artesanal cerrado con sello de cera floral (`🌻`).
- Al tocar el sello, se reproduce una campana mágica, se dispara una lluvia de confeti y se despliega la carta en papel pergamino con tipografía elegante.

### 5. 🎶 Melodía Romántica (Web Audio API)
- Sintetizador de audio en tiempo real estilo cajita de música / celesta que reproduce la melodía dulce de *Flores Amarillas*.
- No depende de archivos MP3 externos, evitando enlaces rotos o restricciones de derechos de autor.
- Reproductor flotante con control de play/pausa y animación de girasol giratorio.

### 6. 🌼 Mini-Juego "¿Cuánto te quiere?"
- Girasol interactivo donde el usuario puede arrancar los pétalos uno a uno:
  - *Me quiere...* &rarr; *Mucho...* &rarr; *Poquito...* &rarr; *¡Con toda su alma!* &rarr; *¡Y para siempre!*
  - Al retirar el último pétalo: explosión de confeti y mensaje romántico.

---

## 📈 SEO y Tráfico Orgánico en Google

La aplicación incluye una arquitectura de SEO diseñada para captar las millones de búsquedas que se generan en torno a las flores amarillas:

1. **Sitemap Dinámico (`/sitemap.xml`)**:
   - Generado automáticamente por Next.js en `src/app/sitemap.ts`.
2. **Robots.txt Nativo (`/robots.txt`)**:
   - Reglas de rastreo optimizadas para Googlebot y Bingbot en `src/app/robots.ts`.
3. **Datos Estructurados JSON-LD (`Schema.org`)**:
   - Esquemas `WebSite`, `WebApplication` y **`FAQPage`** integrados en [`src/components/StructuredData.tsx`](src/components/StructuredData.tsx) para competir por la **Posición Cero (Rich Snippets)** en Google.
4. **Página Editorial: "¿Qué significan las Flores Amarillas?" (`/significado`)**:
   - Responde a las búsquedas más frecuentes: significado en el amor y la amistad, diferencias entre el 21 de septiembre y el 21 de marzo, y la historia de Floricienta.
5. **Directorio de Frases y Versos (`/frases`)**:
   - Más de 40 dedicatorias organizadas por categorías con botón para copiar al portapapeles y enlace directo para crear el ramo.

---

## 💰 Monetización Integrada

El proyecto está preparado para generar ingresos pasivos de dos formas:

1. **Google AdSense:**
   - Archivo de autorización [`public/ads.txt`](public/ads.txt) incluido.
   - Componente [`src/components/AdBannerPlaceholder.tsx`](src/components/AdBannerPlaceholder.tsx) ubicado estratégicamente sin afectar la velocidad de carga (Core Web Vitals).
   - Para activarlo, solo debes definir tu variable de entorno:
     ```env
     NEXT_PUBLIC_ADSENSE_CLIENT_ID="ca-pub-XXXXXXXXXXXXXXXX"
     ```
2. **Marketing de Afiliados de Floristerías Reales:**
   - Componente [`src/components/AffiliateFloristCard.tsx`](src/components/AffiliateFloristCard.tsx): *"¿Quieres sorprenderla/o con Flores Amarillas reales hoy a domicilio?"*.
   - Permite enlazar a programas de afiliados de floristerías locales, Amazon o redes internacionales de entrega de flores.

---

## 🛠️ Stack Tecnológico

| Tecnología | Propósito |
| :--- | :--- |
| **Next.js 16** | Framework React con Turbopack, App Router y generación estática ultra-rápida. |
| **React 19** | Biblioteca base con los últimos hooks (`useMemo`, transiciones y concurrencia). |
| **Tailwind CSS v4** | Motor de estilos de última generación para diseño responsivo y estética dorada. |
| **TypeScript 5** | Tipado estático robusto en todos los componentes y utilidades. |
| **Web Audio API** | Sintetizador de audio nativo para melodía y efectos sonoros de campanas. |
| **HTML5 Canvas** | Motor gráfico para simulación física de pétalos y luciérnagas. |
| **Canvas Confetti** | Efectos de celebración para la apertura de cartas y juegos. |
| **Lucide React** | Iconografía minimalista y moderna. |

---

## 📂 Estructura del Código

```text
flores_master/
├── public/
│   └── ads.txt                     # Autorización para Google AdSense
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Layout raíz con Google Fonts (Playfair Display, Caveat, Inter)
│   │   ├── page.tsx                # Página principal (Visualizador de Dedicatorias y Modo Explorador)
│   │   ├── globals.css             # Estilos de Tailwind v4 y animaciones personalizadas
│   │   ├── sitemap.ts              # Generador de sitemap.xml
│   │   ├── robots.ts               # Generador de robots.txt
│   │   ├── crear/
│   │   │   └── page.tsx            # Formulario y Creador de dedicatorias para WhatsApp
│   │   ├── significado/
│   │   │   └── page.tsx            # Artículo SEO sobre historia y significado
│   │   └── frases/
│   │       └── page.tsx            # Directorio de frases categorizadas
│   ├── components/
│   │   ├── FallingPetals.tsx       # Lluvia interactiva de pétalos dorados en Canvas
│   │   ├── YellowBouquet.tsx       # Ramo vectorial SVG con perspectiva 3D
│   │   ├── LoveLetterModal.tsx     # Sobre interactivo con sello de cera y carta
│   │   ├── PetalGame.tsx           # Mini-juego de deshojar el girasol
│   │   ├── MusicPlayer.tsx         # Reproductor musical flotante
│   │   ├── HeaderNav.tsx           # Barra de navegación con accesos y enlaces a GitHub
│   │   ├── Footer.tsx              # Pie de página con créditos y contactos de GitHub
│   │   ├── StructuredData.tsx      # Schemas JSON-LD (WebSite, FAQPage)
│   │   ├── AdBannerPlaceholder.tsx # Contenedor responsivo de Google AdSense
│   │   └── AffiliateFloristCard.tsx# Banner de afiliados para envío de flores físicas
│   └── lib/
│       ├── audioSynthesis.ts       # Motor de síntesis de audio Web Audio API
│       └── dedicationUtils.ts      # Codificación, decodificación y presets de dedicatorias
└── README.md
```

---

## 🚀 Instalación y Despliegue

### Requisitos previos
- Node.js 18+ (recomendado Node.js 20 o superior).
- npm, pnpm o yarn.

### 1. Clonar el proyecto
```bash
git clone https://github.com/jorgeanalista2008/flores_master.git
cd flores_master
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Iniciar servidor de desarrollo
```bash
npm run dev
```
Abre tu navegador en [http://localhost:3000](http://localhost:3000).

### 4. Compilar para producción
```bash
npm run build
npm run start
```

### 5. Despliegue en Vercel (Recomendado)
Este proyecto está 100% optimizado para desplegarse con un solo clic en **Vercel**, **Netlify** o **Cloudflare Pages**:
1. Conecta tu cuenta de GitHub con Vercel.
2. Selecciona el repositorio `flores_master`.
3. Haz clic en **Deploy**. ¡Listo para recibir visitas de todo el mundo! 🌍

---

## 🪙 Donaciones con Criptomonedas

Si este proyecto te ha gustado o te ha servido para dedicar flores a tu persona favorita, ¡puedes apoyar al creador con una donación en criptomonedas!

| Criptomoneda | Red | Dirección de Depósito |
| :--- | :--- | :--- |
| **USDT (Tether)** | Tron (TRC-20) | Configurada en la app / Variable de entorno |
| **Solana (SOL)** | Red Solana | Configurada en la app / Variable de entorno |
| **Ethereum (ETH)** | ERC-20 / Polygon | Configurada en la app / Variable de entorno |
| **Bitcoin (BTC)** | Bitcoin Native | Configurada en la app / Variable de entorno |

*Puedes actualizar tus propias direcciones de billetera fácilmente en `src/lib/cryptoWallets.ts` o mediante variables de entorno.*

---

## 👨‍💻 Autor y Contactos

Desarrollado con 💛 por **Jorge**:

- 🐙 **GitHub:** [@jorgeanalista2008](https://github.com/jorgeanalista2008)
- 📦 **Repositorio:** [flores_master](https://github.com/jorgeanalista2008/flores_master)
- 📧 **Correo de Contacto:** [jorge.analista2008@gmail.com](mailto:jorge.analista2008@gmail.com)

---

## 📜 Licencia

Este proyecto se distribuye bajo la licencia **MIT**. Eres libre de usarlo, adaptarlo, compartirlo y alegrar el día de alguien especial. ¡Que nunca te falten tus flores amarillas! 🌻✨

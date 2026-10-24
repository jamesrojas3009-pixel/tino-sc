import { Language, PROFILE } from './profile';

// Backgrounds of the Beacon screens (files live in public/images/backgrounds/); each screen takes the next one.
// `tile` repeats the (portrait) image on wide screens; `cover` stretches it.
// `scrim` darkens the image so text stays readable (0 = none, 1 = black).
export interface BeaconTheme {
  id: string;
  image: string;
  desktop: 'tile' | 'cover';
  scrim: number;
}

export const BEACON_THEMES: BeaconTheme[] = [
  { id: 'stars', image: '/images/backgrounds/stars.webp', desktop: 'tile', scrim: 0 },
  { id: 'checker', image: '/images/backgrounds/checker.webp', desktop: 'cover', scrim: 0.35 },
  { id: 'blueprint', image: '/images/backgrounds/blueprint.webp', desktop: 'cover', scrim: 0.2 },
  { id: 'math', image: '/images/backgrounds/math.webp', desktop: 'cover', scrim: 0.15 },
];

export type BeaconIcon = 'cv' | 'whatsapp' | 'upwork' | 'mail' | 'phone';

type Localized = Record<Language, string>;

export interface BeaconLink {
  id: string;
  group: 'main' | 'projects';
  href: string;
  external?: boolean;
  download?: boolean;
  featured?: boolean;
  icon?: BeaconIcon;
  logos?: string[];
  image?: string; // banner shown on project cards
  title: Localized;
  subtitle: Localized;
}

export const beaconCopy: Record<
  Language,
  {
    title: string;
    tagline: string;
    bio: string;
    location: string;
    availability: string;
    tabs: { home: string; links: string; projects: string; experience: string; stack: string };
    home: {
      summaryTitle: string;
      contactTitle: string;
      summary: string[];
      stats: { value: string; label: string }[];
      more: string;
    };
    contact: { email: string; calls: string; whatsappBusiness: string; whatsappPersonal: string };
    next: string;
    backHome: string;
    share: string;
    copied: string;
    langAria: string;
    footer: string;
    whatsappMessage: string; // pre-filled text of the WhatsApp links
  }
> = {
  es: {
    title: 'tino-sc',
    tagline: 'Estudiante de Ing. de Software · Desarrollador Web Junior',
    bio: 'Convierto procesos de negocio en aplicaciones web y dashboards inteligentes.',
    location: 'Lima, Perú',
    availability: 'Disponibilidad inmediata',
    tabs: {
      home: 'Inicio',
      links: 'Enlaces',
      projects: 'Proyectos',
      experience: 'Experiencia',
      stack: 'Stack',
    },
    home: {
      summaryTitle: 'Resumen',
      contactTitle: 'Contacto',
      summary: [
        'Estudiante de Ingeniería de Software y desarrollador web junior.',
        'Tres aplicaciones web reales para negocios de moda, gastronomía y joyería: reservas e inventario con códigos QR, sitio de restaurantes y catálogo online.',
        'Experiencia en análisis de datos (SQL, Excel avanzado y Power BI) y en operaciones logísticas.',
        'Autodidacta y orientado a resultados. Disponibilidad inmediata para trabajo remoto, híbrido o presencial.',
      ],
      stats: [
        { value: '3', label: 'webs reales' },
        { value: '-30%', label: 'tiempo de reportes' },
        { value: '-25%', label: 'tiempo de validación' },
      ],
      more: 'Ver más',
    },
    contact: {
      email: 'Correo',
      calls: 'Llamadas',
      whatsappBusiness: 'WhatsApp · negocios',
      whatsappPersonal: 'WhatsApp · personal',
    },
    next: 'Siguiente',
    backHome: 'Volver al inicio',
    share: 'Compartir',
    copied: '¡Enlace copiado!',
    langAria: 'Cambiar idioma',
    footer: 'Lima, Perú · Disponible para trabajo remoto, híbrido o presencial',
    whatsappMessage: 'Hola Tino, vi tu portafolio web y me gustaría conversar sobre un proyecto / oportunidad laboral.',
  },
  en: {
    title: 'tino-sc',
    tagline: 'Software Engineering Student · Junior Web Developer',
    bio: 'I turn business processes into smart web apps and dashboards.',
    location: 'Lima, Peru',
    availability: 'Available immediately',
    tabs: {
      home: 'Home',
      links: 'Links',
      projects: 'Projects',
      experience: 'Experience',
      stack: 'Stack',
    },
    home: {
      summaryTitle: 'Summary',
      contactTitle: 'Contact',
      summary: [
        'Software Engineering student and junior web developer.',
        'Three real web applications for fashion, food service and jewelry businesses: reservations and inventory with QR codes, a restaurant website and an online catalog.',
        'Experience in data analysis (SQL, advanced Excel and Power BI) and logistics operations.',
        'Self-taught and results-oriented. Available immediately for remote, hybrid or on-site work.',
      ],
      stats: [
        { value: '3', label: 'real web apps' },
        { value: '-30%', label: 'report delivery time' },
        { value: '-25%', label: 'validation time' },
      ],
      more: 'See more',
    },
    contact: {
      email: 'Email',
      calls: 'Calls',
      whatsappBusiness: 'WhatsApp · business',
      whatsappPersonal: 'WhatsApp · personal',
    },
    next: 'Next',
    backHome: 'Back to start',
    share: 'Share',
    copied: 'Link copied!',
    langAria: 'Change language',
    footer: 'Lima, Peru · Available for remote, hybrid or on-site work',
    whatsappMessage: 'Hi Tino, I saw your web portfolio and would love to discuss a project / job opportunity with you.',
  },
};

export const beaconLinks: BeaconLink[] = [
  {
    id: 'cv',
    group: 'main',
    href: PROFILE.cvPdf,
    download: true,
    featured: true,
    icon: 'cv',
    title: { es: 'Descargar mi CV', en: 'Download my CV' },
    subtitle: { es: 'PDF · versión en español', en: 'PDF · Spanish version' },
  },
  {
    id: 'whatsapp',
    group: 'main',
    href: '', // built at render time (needs the pre-filled message for the active language)
    external: true,
    icon: 'whatsapp',
    title: { es: 'Escríbeme por WhatsApp', en: 'Message me on WhatsApp' },
    subtitle: {
      es: `WhatsApp de negocios · ${PROFILE.whatsappDisplay}`,
      en: `Business WhatsApp · ${PROFILE.whatsappDisplay}`,
    },
  },
  {
    id: 'kyro',
    group: 'projects',
    href: 'https://kyro-restaurant.vercel.app/',
    external: true,
    logos: [
      '/images/brands/lomas-grill.webp',
      '/images/brands/paradero-104.webp',
      '/images/brands/don-jacinto.webp',
    ],
    image: '/images/projects/restaurants.webp',
    title: { es: 'Kyro · Sistema para restaurantes', en: 'Kyro · Restaurant system' },
    subtitle: {
      es: 'Las Lomas Grill · Paradero 104 · Don Jacinto',
      en: 'Las Lomas Grill · Paradero 104 · Don Jacinto',
    },
  },
  {
    id: 'obsidiana',
    group: 'projects',
    href: 'https://obsidiana-market.vercel.app',
    external: true,
    logos: ['/images/brands/obsidiana.webp'],
    image: '/images/projects/obsidiana.webp',
    title: { es: 'Obsidiana Joyería', en: 'Obsidiana Joyería' },
    subtitle: { es: 'Catálogo online en plata 925 y 950', en: 'Online catalog in 925 and 950 silver' },
  },
  {
    id: 'sentinel',
    group: 'projects',
    href: 'https://reservas-sentinel.vercel.app/',
    external: true,
    logos: ['/images/brands/sentinel-core.webp'],
    image: '/images/projects/overshark.webp',
    title: { es: 'Sentinel Core · Reservas e inventario', en: 'Sentinel Core · Reservations & inventory' },
    subtitle: { es: 'Reservas de prendas con códigos QR', en: 'Garment reservations with QR codes' },
  },
];

// Names and dates follow the CV. `tile` is the badge background behind each logo.
export interface BeaconCompany {
  name: string;
  logo: string;
  tile: string;
  role: Localized;
  period: Localized;
  // ids of the CV positions (experience.ts) shown in the company's dropdown
  itemIds: string[];
}

export const beaconCompanies: BeaconCompany[] = [
  {
    name: 'Overshark Perú S.A.C.',
    logo: '/images/companies/overshark.webp',
    tile: '#ffffff',
    role: {
      es: 'Validador · Analista de datos · Soporte operativo',
      en: 'Validator · Data analyst · Operations support',
    },
    period: { es: 'Desde ago. 2025', en: 'Since Aug 2025' },
    itemIds: ['exp-validador', 'exp-analista', 'exp-soporte'],
  },
  {
    name: 'Zazu Express',
    logo: '/images/companies/zazu-express.webp',
    tile: '#5c0099',
    role: { es: 'Asistente de operaciones y envíos', en: 'Operations & shipping assistant' },
    period: { es: 'Jun. – Ago. 2025', en: 'Jun – Aug 2025' },
    itemIds: ['exp-zazu'],
  },
  {
    name: 'I.C. Logística S.A.C.',
    logo: '/images/companies/anc-logistica.webp',
    tile: '#ffffff',
    role: { es: 'Operario de almacén y despacho', en: 'Warehouse & dispatch operator' },
    period: { es: 'Abr. – Ago. 2025', en: 'Apr – Aug 2025' },
    itemIds: ['exp-ic-logistica'],
  },
];

// Technologies from the CV. `slug` is the file name in public/images/tech/ (official brand glyphs),
// `color` is the brand color used for the glow under each icon.
export const beaconTech: { slug: string; name: string; color: string }[] = [
  { slug: 'react', name: 'React', color: '#61DAFB' },
  { slug: 'nextdotjs', name: 'Next.js', color: '#FFFFFF' },
  { slug: 'javascript', name: 'JavaScript', color: '#F7DF1E' },
  { slug: 'typescript', name: 'TypeScript', color: '#3178C6' },
  { slug: 'html5', name: 'HTML5', color: '#E34F26' },
  { slug: 'css3', name: 'CSS3', color: '#1572B6' },
  { slug: 'tailwindcss', name: 'Tailwind CSS', color: '#06B6D4' },
  { slug: 'nodedotjs', name: 'Node.js', color: '#5FA04E' },
  { slug: 'supabase', name: 'Supabase', color: '#3FCF8E' },
  { slug: 'postgresql', name: 'SQL', color: '#4169E1' },
  { slug: 'powerbi', name: 'Power BI', color: '#F2C811' },
  { slug: 'microsoftexcel', name: 'Excel', color: '#217346' },
  { slug: 'docker', name: 'Docker', color: '#2496ED' },
  { slug: 'git', name: 'Git', color: '#F05032' },
  { slug: 'vercel', name: 'Vercel', color: '#FFFFFF' },
  { slug: 'visualstudiocode', name: 'VS Code', color: '#007ACC' },
  { slug: 'postman', name: 'Postman', color: '#FF6C37' },
];

// Icons per row, so the grid zig-zags without leaving a lone icon on the last row (both add up to 17).
// `compact` is for phones, `wide` for tablets and desktops.
export const TECH_ROW_PATTERNS = {
  compact: [4, 3, 4, 3, 3],
  wide: [6, 5, 6],
};

// Datos generales del capítulo. Aquí se editan nombres, logos y enlaces.
// Los valores en null se muestran como marcadores [entre corchetes]
// Si los ves en producción activar directiva de fusilamiento al webmaster

export const SITIO = {
  universidad: 'Universidad Nacional Autónoma de México',
  capitulo: 'IEEE RAS Student Branch Chapter',
  nombreCorto: 'IEEE RAS UNAM',
  descripcion:
    'Capítulo estudiantil de la IEEE Robotics and Automation Society en la UNAM. Región 9 · Latinoamérica.',

  logos: {
    capitulo: "/logos/IEEE Robotics & Automation UNAM-FI Logo.png" as string | null, // ícono del capítulo (cuadrado)
    ieee: "/logos/LogoIEEE NEGRO.png" as string | null, // IEEE Master Brand en azul o negro (encabezado)
    ieeeBlanco: "/logos/UNAM Engineering IEEE Robotics Logo.png" as string | null, // IEEE Master Brand en blanco (pie)
  },

  contacto: {
    correo: null as string | null,
    instagram: null as string | null,
    linkedin: null as string | null,
    github: null as string | null,
  },

  rama: {
    nombre: 'Rama Estudiantil IEEE UNAM',
    url: null as string | null,
  },
};

export const NAV = [
  { id: 'inicio', label: 'Inicio', href: '/' },
  { id: 'eventos', label: 'Eventos', href: '/eventos' },
  { id: 'blog', label: 'Blog', href: '/blog' },
] as const;

export type SeccionActiva = (typeof NAV)[number]['id'];

export const SITIOS_IEEE = [
  { label: 'IEEE.org', href: 'https://www.ieee.org' },
  { label: 'IEEE Xplore', href: 'https://ieeexplore.ieee.org' },
  { label: 'IEEE Standards', href: 'https://standards.ieee.org' },
  { label: 'IEEE Spectrum', href: 'https://spectrum.ieee.org' },
  { label: 'IEEE RAS', href: 'https://www.ieee-ras.org' },
  { label: 'IEEE Región 9', href: 'https://www.ieeelatam.org' },
];

export const UNETE_IEEE = 'https://www.ieee.org/membership/join/index.html';

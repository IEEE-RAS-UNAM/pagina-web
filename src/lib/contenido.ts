import { getCollection, type CollectionEntry } from 'astro:content';
import { parseFecha, claveMes, mesLargo } from './fechas';

// `color` es una variable CSS del tema (src/styles/global.css). Por ejemplo los componentes la
// reciben en style="--c: …" y la usan con clases como bg-(--c) o text-(--c) TODO: Matarme.
export const TIPOS = {
  taller: { label: 'Taller', plural: 'Talleres', color: 'var(--color-rojo)' },
  charla: { label: 'Charla', plural: 'Charlas', color: 'var(--color-morado)' },
  competencia: { label: 'Competencia', plural: 'Competencias', color: 'var(--color-negro)' },
  visita: { label: 'Visita', plural: 'Visitas', color: 'var(--color-gris)' },
} as const;

export const CATEGORIAS = {
  cronica: { label: 'Crónica', plural: 'Crónicas', color: 'var(--color-rojo)' },
  proyecto: { label: 'Proyecto', plural: 'Proyectos', color: 'var(--color-morado)' },
  tutorial: { label: 'Tutorial', plural: 'Tutoriales', color: 'var(--color-gris)' },
  comunidad: { label: 'Comunidad', plural: 'Comunidad', color: 'var(--color-negro)' },
} as const;

export const MODALIDADES = {
  presencial: 'Presencial',
  'en-linea': 'En línea',
  hibrido: 'Híbrido',
} as const;

export type Evento = CollectionEntry<'eventos'>['data'] & {
  id: string;
  inicioDate: Date;
  finDate: Date;
};

/** Todos los eventos con fechas reales, ordenados del más próximo al más lejano. */
export async function getEventos(): Promise<Evento[]> {
  const entradas = await getCollection('eventos');
  return entradas
    .map((e) => {
      const inicioDate = parseFecha(e.data.inicio);
      const horas = e.data.duracionHoras ?? 2;
      const finDate = new Date(inicioDate.getTime() + horas * 3600_000);
      return { ...e.data, id: e.id, inicioDate, finDate };
    })
    .sort((a, b) => a.inicioDate.getTime() - b.inicioDate.getTime());
}

/**
 * Un evento es "próximo" hasta que termina. Ojo: en un sitio estático esto se
 * calcula al construir (npm run build); programa un build diario para que se actualice.
 */
export function separarEventos(eventos: Evento[], ahora = new Date()) {
  const proximos = eventos.filter((e) => e.finDate >= ahora);
  const pasados = eventos.filter((e) => e.finDate < ahora).reverse();
  return { proximos, pasados };
}

export function agruparPorMes(eventos: Evento[]) {
  const grupos: { clave: string; titulo: string; eventos: Evento[] }[] = [];
  for (const ev of eventos) {
    const clave = claveMes(ev.inicioDate);
    let g = grupos.find((x) => x.clave === clave);
    if (!g) {
      g = { clave, titulo: mesLargo(ev.inicioDate), eventos: [] };
      grupos.push(g);
    }
    g.eventos.push(ev);
  }
  return grupos;
}

export const utcCompacto = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

/** Enlace para agregar el evento a Google Calendar. Esto salió a puro Stack Overflow y cafeina intravenosa
 * TODO: Probar flujo de vtools
 */
export function enlaceCalendario(ev: Evento) {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: ev.titulo,
    dates: `${utcCompacto(ev.inicioDate)}/${utcCompacto(ev.finDate)}`,
    location: ev.lugar,
    details: [ev.resumen, ev.vtools ? `Registro: ${ev.vtools}` : null].filter(Boolean).join('\n\n'),
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export async function getPosts() {
  const posts = await getCollection('posts');
  return posts.sort((a, b) => b.data.fecha.getTime() - a.data.fecha.getTime());
}

export function minutosLectura(texto: string | undefined) {
  const palabras = (texto ?? '').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(palabras / 200));
}

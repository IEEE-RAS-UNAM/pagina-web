import type { APIRoute } from 'astro';
import { getEventos, TIPOS, utcCompacto } from '../lib/contenido';
import { SITIO } from '../lib/sitio';

// Calendario suscribible: /eventos.ics (Google Calendar, Outlook, Apple Calendar).
// Me lo robé de otro repositorio, lo siento ya no recuerdo quien eras

const escapar = (s: string) => s.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/[,;]/g, (m) => `\\${m}`);

// Las líneas de iCal no deben pasar de 75 octetos. Odio Apple
const plegar = (linea: string) => {
  const partes: string[] = [];
  let resto = linea;
  while (resto.length > 74) {
    partes.push(resto.slice(0, 74));
    resto = ' ' + resto.slice(74);
  }
  partes.push(resto);
  return partes.join('\r\n');
};

export const GET: APIRoute = async ({ site }) => {
  const eventos = await getEventos();
  const ahora = utcCompacto(new Date());
  const base = site?.toString().replace(/\/$/, '') ?? ''; // Pa no pelearnos con un dominio hard-coded.

  const vevents = eventos.flatMap((ev) => {
    const desc = [ev.resumen, ev.vtools ? `Registro: ${ev.vtools}` : null].filter(Boolean).join('\n\n');
    return [
      'BEGIN:VEVENT',
      `UID:${ev.id}@${new URL(base || 'https://example.org').hostname}`,
      `DTSTAMP:${ahora}`,
      `DTSTART:${utcCompacto(ev.inicioDate)}`,
      `DTEND:${utcCompacto(ev.finDate)}`,
      `SUMMARY:${escapar(`${TIPOS[ev.tipo].label}: ${ev.titulo}`)}`,
      `LOCATION:${escapar(ev.lugar)}`,
      desc ? `DESCRIPTION:${escapar(desc)}` : null,
      `URL:${base}/eventos#${ev.id}`,
      'END:VEVENT',
    ].filter((x): x is string => Boolean(x));
  });

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    `PRODID:-//${SITIO.nombreCorto}//Eventos//ES`,
    'CALSCALE:GREGORIAN',
    `X-WR-CALNAME:${escapar(`Eventos ${SITIO.nombreCorto}`)}`,
    'X-WR-TIMEZONE:America/Mexico_City',
    ...vevents,
    'END:VCALENDAR',
  ]
    .map(plegar)
    .join('\r\n');

  return new Response(ics, {
    headers: { 'Content-Type': 'text/calendar; charset=utf-8' },
  });
};

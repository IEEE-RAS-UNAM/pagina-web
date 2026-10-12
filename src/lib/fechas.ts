// Todas las fechas en hora de la CDMX, aqui puro centralista.
export const ZONA = 'America/Mexico_City';
// Mexico siempre UTC-6.
const OFFSET = '-06:00';

/** Convierte lo que guarda Keystatic ("2026-10-24T10:00") en un Date real. */
export function parseFecha(valor: string | Date): Date {
  if (valor instanceof Date) return valor;
  const limpio = valor.trim();
  if (/[zZ]|[+-]\d\d:\d\d$/.test(limpio)) return new Date(limpio);
  const conSegundos = /T\d\d:\d\d$/.test(limpio) ? `${limpio}:00` : limpio;
  const conHora = conSegundos.includes('T') ? conSegundos : `${conSegundos}T00:00:00`;
  return new Date(`${conHora}${OFFSET}`);
}

const fmt = (opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat('es-MX', { timeZone: ZONA, ...opts });

const fDia = fmt({ day: '2-digit' });
const fMes = fmt({ month: 'short' });
const fMesLargo = fmt({ month: 'long', year: 'numeric' });
const fHora = fmt({ hour: '2-digit', minute: '2-digit', hour12: false });
const fLarga = fmt({ day: 'numeric', month: 'long', year: 'numeric' });
const fClaveMes = fmt({ year: 'numeric', month: '2-digit' });

export const dia = (d: Date) => fDia.format(d);
export const mesCorto = (d: Date) => fMes.format(d).replace('.', '').toUpperCase();
export const hora = (d: Date) => fHora.format(d);
export const fechaLarga = (d: Date) => fLarga.format(d);
export const claveMes = (d: Date) => fClaveMes.format(d);
export const mesLargo = (d: Date) => {
  const s = fMesLargo.format(d).replace(' de ', ' ');
  return s.charAt(0).toUpperCase() + s.slice(1);
};

/** Fecha de un post (fields.date guarda solo el día, sin hora). */
export const fechaPost = (d: Date) =>
  new Intl.DateTimeFormat('es-MX', { timeZone: 'UTC', day: 'numeric', month: 'long', year: 'numeric' }).format(d);

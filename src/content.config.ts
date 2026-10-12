import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Estos esquemas validan los archivos que escribe Keystatic.
// Deben coincidir con los campos de keystatic.config.ts.

const eventos = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/eventos' }),
  schema: z.object({
    titulo: z.string(),
    tipo: z.enum(['taller', 'charla', 'competencia', 'visita']),
    // Keystatic guarda "AAAA-MM-DDTHH:mm" (hora de CDMX); se convierte en src/lib/fechas.ts
    inicio: z.union([z.string(), z.date()]),
    duracionHoras: z.number().nullish(),
    modalidad: z.enum(['presencial', 'en-linea', 'hibrido']).default('presencial'),
    lugar: z.string(),
    resumen: z.string().nullish(),
    vtools: z.string().nullish(),
    cronica: z.string().nullish(),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/posts' }),
  schema: z.object({
    titulo: z.string(),
    categoria: z.enum(['cronica', 'proyecto', 'tutorial', 'comunidad']),
    fecha: z.coerce.date(),
    autor: z.string(),
    cargo: z.string().nullish(),
    extracto: z.string(),
    portada: z.string().nullish(),
    portadaAlt: z.string().nullish(),
    portadaCredito: z.string().nullish(),
    portadaCompleta: z.boolean().default(false),
    evento: z.string().nullish(),
    destacado: z.boolean().default(false),
    etiquetas: z.array(z.string()).default([]),
  }),
});

export const collections = { eventos, posts };

// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import tailwindcss from '@tailwindcss/vite';

// Keystatic (el panel para editar contenido en /keystatic) solo se carga con
// `npm run dev`. Así `npm run build` genera un sitio 100 % estático que se puede
// subir a cualquier hosting (GitHub Pages, Netlify, Cloudflare Pages…).
const enDesarrollo = process.argv.includes('dev');

export default defineConfig({
  // Cambia esto por el dominio real cuando lo tengan (lo usa el calendario .ics).
  site: 'https://ras.ieee-unam.example',
  integrations: [react(), markdoc(), ...(enDesarrollo ? [keystatic()] : [])],
  vite: {
    plugins: [tailwindcss()],
  },
});

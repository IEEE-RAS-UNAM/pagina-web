// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

// En `npm run dev` el sitio corre en Node (así Keystatic puede guardar archivos en tu
// computadora). Para producción (`npm run build`) se usa el adaptador de Cloudflare Workers,
// que además ejecuta las rutas del panel /keystatic.
const enDesarrollo = process.argv.includes('dev');

export default defineConfig({
  // Cambia esto por la URL real (primero la de workers.dev, luego el dominio).
  site: 'https://ieee-ras-unam.example.workers.dev',
  // imageService 'passthrough' y session: false evitan que Cloudflare pida recursos que el
  // sitio no usa (Cloudflare Images y un KV para sesiones).
  adapter: enDesarrollo ? undefined : cloudflare({ imageService: 'passthrough' }),
  session: false,
  integrations: [react(), markdoc(), keystatic()],
  vite: {
    plugins: [tailwindcss()],
  },
});

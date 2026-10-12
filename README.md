# Sitio IEEE RAS UNAM Student Branch Chapter

Sitio del capítulo hecho con **Astro** (páginas estáticas), **Tailwind CSS 4** (estilos) y **Keystatic** (panel para publicar eventos y entradas del blog sin tocar código).

## Requisitos

- Node.js 22 o más reciente (`node -v` para revisar)

## Correrlo en tu computadora

```bash
npm install
npm run dev
```

- Sitio: http://127.0.0.1:4321
- Panel de contenido: http://127.0.0.1:4321/keystatic

Lo que guardes en el panel se escribe como archivos en `src/content/` y el sitio se actualiza al momento.

## Publicar

```bash
npm run build     # genera el sitio en dist/
npm run preview   # para revisarlo antes de subirlo
```

`dist/` es HTML estático: se puede subir a GitHub Pages, Netlify, Cloudflare Pages o cualquier hosting. El panel `/keystatic` **no** se incluye en el build; solo existe con `npm run dev`.

> **Eventos próximos y pasados:** el sitio decide si un evento ya pasó en el momento del build. Programa un build diario (por ejemplo, con un cron de GitHub Actions o un deploy hook de Netlify) para que los eventos pasen solos a "Pasados".

## Estructura

```
keystatic.config.ts      Formularios del panel (campos de eventos y posts)
src/content.config.ts    Validación de esos mismos campos en Astro (deben coincidir)
src/content/eventos/     Un .yaml por evento
src/content/posts/       Un .mdoc por entrada del blog (Markdoc ≈ Markdown)
src/lib/sitio.ts         Nombre del capítulo, logos y enlaces de contacto  ← edita esto primero
src/lib/contenido.ts     Colores por tipo/categoría, próximos vs. pasados, enlace a Google Calendar
src/lib/fechas.ts        Fechas en hora de la Ciudad de México
src/styles/global.css    Tema de Tailwind: colores del capítulo, fuente y utilidades de la cuña
src/components/          Header, Footer, Logo, EventCard, TimelineItem, PostCard
src/components/ui/       Piezas pequeñas reutilizables: Boton, Ceja, Etiqueta, Filtro
src/pages/               index, eventos, eventos.ics (calendario), blog, blog/[slug]
public/logos/            Aquí van los logos oficiales (ver LEEME.txt)
public/images/blog/      Aquí guarda Keystatic las fotos de portada
```

## Estilos (Tailwind)

Todo el estilo está en las clases de cada componente; no hay CSS escondido en otros archivos.

- **Colores del capítulo:** se definen una sola vez en `@theme` dentro de `src/styles/global.css` y se usan como `bg-rojo`, `text-morado`, `border-linea`, etc.
- **Colores por tipo de evento o categoría:** el componente recibe `style="--c: var(--color-rojo)"` y usa `bg-(--c)`, `text-(--c)` o `border-(--c)`. El mapa tipo → color está en `src/lib/contenido.ts`.
- **Cuña IEEE a 45°:** las utilidades `cuna-der`, `cuna-izq` y `marco-cuna`; el tamaño del corte se da con `[--h:56px]` (o `[--c:64px]` en `marco-cuna`).
- **Botones:** todas las variantes viven en `src/components/ui/Boton.astro`.
- **Texto del blog:** lo estiliza el plugin `@tailwindcss/typography` (clases `prose` en `src/pages/blog/[slug].astro`).
- **Estados de los filtros:** `aria-pressed:bg-(--c)`; el script solo cambia `aria-pressed` y el atributo `hidden`.

Recomendado en VS Code: la extensión *Tailwind CSS IntelliSense* (autocompleta clases y muestra el CSS al pasar el cursor).

## Primeros pasos

1. **Logos:** pon los archivos oficiales en `public/logos/` y sus rutas en `src/lib/sitio.ts`.
2. **Enlaces:** correo, redes y la página de la Rama Estudiantil en `src/lib/sitio.ts`.
3. **Dominio:** cambia `site` en `astro.config.mjs` (lo usa el calendario .ics).
4. **Contenido de ejemplo:** todo lo que dice `[Ejemplo]` se puede borrar desde el panel.
5. **Enlaces legales de IEEE en el pie** (`src/components/Footer.astro`): verifica que sigan vigentes.

## Agregar un campo nuevo

1. Agrégalo en `keystatic.config.ts` (para que aparezca en el panel).
2. Agrégalo en `src/content.config.ts` (para que Astro lo valide y lo tipe).
3. Úsalo en el componente o página que corresponda.

## Que otras personas publiquen

Con `storage: { kind: 'local' }` solo se puede editar en la computadora donde corre `npm run dev`.
Para que la mesa directiva publique desde el navegador, cambia a modo GitHub
(https://keystatic.com/docs/github-mode): cada publicación se vuelve un commit y el hosting reconstruye el sitio.
Ese modo necesita que el panel corra en un servidor (por ejemplo, con el adaptador de Netlify, Vercel o Node).

## Pendiente

- Importar eventos desde IEEE vTools al construir el sitio, para no capturarlos dos veces.
- Paginación del blog cuando haya muchas entradas.
- Páginas de Proyectos y Nosotros.

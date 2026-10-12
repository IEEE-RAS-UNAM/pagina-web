import { config, fields, collection } from '@keystatic/core';

// Este archivo define los formularios del panel /keystatic.
// Si agregas o cambias un campo aquí, actualiza también src/content.config.ts.

// Repositorio del sitio en GitHub: cambiar por 'organizacion/repositorio'.
const REPO = 'IEEE-RAS-UNAM/pagina-web';

// En producción (Cloudflare) el panel guarda en GitHub: cada "Guardar" es un commit.
// En `npm run dev` guarda archivos en tu computadora, para que tus pruebas no toquen el repo.
// Para usar GitHub también en local (p. ej. la primera vez, para crear la GitHub App),
// arranca con la variable PUBLIC_KEYSTATIC_GITHUB=true.
const usarGitHub = import.meta.env.PROD || import.meta.env.PUBLIC_KEYSTATIC_GITHUB === 'true';

export default config({
  storage: usarGitHub ? { kind: 'github', repo: REPO } : { kind: 'local' },
  ui: {
    brand: { name: 'IEEE RAS UNAM' },
  },
  collections: {
    eventos: collection({
      label: 'Eventos',
      slugField: 'titulo',
      path: 'src/content/eventos/*',
      format: { data: 'yaml' },
      columns: ['tipo', 'inicio'],
      schema: {
        titulo: fields.slug({
          name: { label: 'Título', validation: { isRequired: true } },
        }),
        tipo: fields.select({
          label: 'Tipo de evento',
          options: [
            { label: 'Taller', value: 'taller' },
            { label: 'Charla', value: 'charla' },
            { label: 'Competencia', value: 'competencia' },
            { label: 'Visita', value: 'visita' },
          ],
          defaultValue: 'taller',
        }),
        inicio: fields.datetime({
          label: 'Fecha y hora de inicio',
          description: 'Hora de la Ciudad de México.',
          validation: { isRequired: true },
        }),
        duracionHoras: fields.number({
          label: 'Duración (horas)',
          defaultValue: 2,
          validation: { min: 0.5, max: 72 },
        }),
        modalidad: fields.select({
          label: 'Modalidad',
          options: [
            { label: 'Presencial', value: 'presencial' },
            { label: 'En línea', value: 'en-linea' },
            { label: 'Híbrido', value: 'hibrido' },
          ],
          defaultValue: 'presencial',
        }),
        lugar: fields.text({
          label: 'Lugar',
          validation: { isRequired: true },
        }),
        resumen: fields.text({
          label: 'Resumen',
          description: 'Una o dos líneas: qué se hará, requisitos y cupo.',
          multiline: true,
        }),
        vtools: fields.url({
          label: 'Enlace de registro en IEEE vTools',
        }),
        cronica: fields.relationship({
          label: 'Crónica en el blog',
          description: 'Cuando el evento ya pasó, vincula aquí su entrada del blog.',
          collection: 'posts',
        }),
      },
    }),

    posts: collection({
      label: 'Blog',
      slugField: 'titulo',
      path: 'src/content/posts/*',
      format: { contentField: 'contenido' },
      entryLayout: 'content',
      columns: ['categoria', 'fecha'],
      schema: {
        titulo: fields.slug({
          name: { label: 'Título', validation: { isRequired: true } },
        }),
        categoria: fields.select({
          label: 'Categoría',
          options: [
            { label: 'Crónica', value: 'cronica' },
            { label: 'Proyecto', value: 'proyecto' },
            { label: 'Tutorial', value: 'tutorial' },
            { label: 'Comunidad', value: 'comunidad' },
          ],
          defaultValue: 'cronica',
        }),
        fecha: fields.date({
          label: 'Fecha de publicación',
          defaultValue: { kind: 'today' },
          validation: { isRequired: true },
        }),
        autor: fields.text({ label: 'Autor/a', validation: { isRequired: true } }),
        cargo: fields.text({ label: 'Cargo en la mesa directiva (opcional)' }),
        extracto: fields.text({
          label: 'Extracto',
          description: 'Una o dos líneas que aparecen en las tarjetas del blog.',
          multiline: true,
          validation: { isRequired: true },
        }),
        portada: fields.image({
          label: 'Foto de portada',
          description: 'Usa fotos propias o con licencia. IEEE no permite imágenes generadas con IA.',
          directory: 'public/images/blog',
          publicPath: '/images/blog/',
        }),
        portadaAlt: fields.text({ label: 'Descripción de la foto (texto alternativo)' }),
        portadaCredito: fields.text({ label: 'Crédito de la foto' }),
        portadaCompleta: fields.checkbox({
          label: 'Mostrar la portada completa (flyers)',
          description:
            'Márcalo si la portada es un flyer o tiene texto: se muestra entera en vez de recortarse. Para fotos déjalo sin marcar.',
          defaultValue: false,
        }),
        evento: fields.relationship({
          label: 'Evento relacionado',
          collection: 'eventos',
        }),
        destacado: fields.checkbox({
          label: 'Destacar en el blog',
          defaultValue: false,
        }),
        etiquetas: fields.array(fields.text({ label: 'Etiqueta' }), {
          label: 'Etiquetas',
          itemLabel: (props) => props.value,
        }),
        contenido: fields.markdoc({ label: 'Contenido' }),
      },
    }),
  },
});

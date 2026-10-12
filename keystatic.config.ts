import { config, fields, collection } from '@keystatic/core';

// Este archivo define los formularios del panel /keystatic.
// Si agregas o cambias un campo aquí, actualiza también src/content.config.ts.

export default config({
  // 'local' guarda los cambios como archivos en tu computadora.
  // Para que otras personas publiquen desde el navegador, cambia a GitHub:
  // https://keystatic.com/docs/github-mode
  storage: { kind: 'local' },
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

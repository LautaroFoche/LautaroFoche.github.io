# Portfolio — Lautaro Fochesatto

Portfolio estático de una página para presentar el perfil, experiencia y stack de Lautaro como Data Engineer Junior y Analista de Datos.

## Ejecutar localmente

No requiere instalación ni dependencias:

```bash
python3 -m http.server 4173 --bind 127.0.0.1
```

Abrir `http://127.0.0.1:4173`.

## Diseño e interacción

- Hero con flujo ELT ilustrativo y Apache Airflow como capa de orquestación.
- Stack desplegable inspirado en un esquema estrella: seis categorías, trece tecnologías e íconos SVG locales.
- Selección de categoría con explicación, conexión resaltada y estado accesible.
- El enlace «Stack» y `#tecnologias` abren el explorador directamente.
- Estrella en escritorio, dos columnas en tablet y árbol vertical en móvil.
- Apertura y cierre por teclado, Escape con retorno de foco y movimiento reducido según la preferencia del sistema.
- Todo el stack permanece legible si JavaScript no está disponible.
- Experiencia y método conectados visualmente como etapas de un pipeline.

## Archivos

- `index.html`: contenido y estructura semántica; fuente única de las herramientas.
- `styles.css`: identidad visual, esquemas, responsive y estados accesibles.
- `main.js`: explorador, conexiones adaptativas, navegación, menú móvil y año dinámico.
- `assets/icons/`: íconos locales y atribución/licencia. SQL y Azure Data Factory usan pictogramas propios; los demás provienen de Simple Icons.
- `preview/`: capturas de hero y stack para escritorio y móvil.
- `CONTENT.md`: contenido profesional aprobado.
- `PLAN_DISENO_IMPLEMENTACION.md`: plan que dio origen al rediseño.
- `STATE.md`: validaciones realizadas y sus límites.

## Publicación

Copiar `index.html`, `styles.css`, `main.js` y la carpeta `assets/` al hosting estático elegido. No se requiere compilación. Esta implementación no publica el sitio.

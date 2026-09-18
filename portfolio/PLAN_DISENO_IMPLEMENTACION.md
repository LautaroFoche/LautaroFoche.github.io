# Portfolio — Pipeline de identidad y stack en estrella

## Encargo para GPT-6 Astra

Implementar este plan sobre el portfolio existente. El objetivo es que el diseño comunique Data Engineering desde su estructura visual y que el stack tecnológico se despliegue al hacer clic en un nodo central, agrupado en una composición inspirada en un star schema.

Este documento es una propuesta de implementación; no describe funcionalidades ya realizadas. Conservar el contenido profesional aprobado en `CONTENT.md`, el sitio estático y su identidad cálida. Resolver los detalles menores de composición con criterio propio siguiendo los comportamientos y criterios de aceptación de este documento.

## 1. Concepto: «De la fuente al dato confiable»

El portfolio se presenta como un recorrido por un sistema de datos diseñado por Lautaro. Tres motivos unen la página: nodos, conexiones ortogonales y pequeñas etiquetas de etapa. La pieza distintiva es el stack desplegable, con apariencia de diagrama de arquitectura y tablas de dimensiones.

Mantener una lectura inmediata para recruiters: nombre, rol, experiencia y contacto siguen siendo contenido principal. Los diagramas deben aportar significado y poder leerse sin conocer ingeniería de datos.

### Dirección visual

- Conservar marfil `#FFFAF7`, grafito `#20272B`, terracota `#8E402B` y durazno `#F78E69`. Reservar este último para superficies y acentos con texto oscuro.
- Incorporar una retícula de puntos tenue, limitada al hero y al lienzo del stack; no colocarla detrás de párrafos largos.
- Usar conectores de 1–2 px, codos de 90 grados y pequeños puertos en los bordes de las tarjetas. Las líneas nunca atraviesan textos.
- Mantener la sans serif para lectura y la cursiva del titular. Usar la monoespaciada únicamente en etiquetas y nombres de capas.
- Reemplazar la inclinación de la tarjeta actual del hero por una composición alineada y precisa.
- Usar bloques grafito de forma puntual, especialmente el núcleo del stack; conservar el predominio de superficies claras.
- Evitar decoraciones de terminal, lluvia de código, neón y animaciones continuas. La originalidad surge de cómo se conectan el contenido y las interacciones.

## 2. Hero: un pipeline con roles claros

Conservar el titular actual y los CTA de experiencia y LinkedIn. Rediseñar `.pipeline-card` como un pequeño diagrama de arquitectura, con el rótulo visible «Flujo ilustrativo».

Flujo de datos, en orden:

1. **Fuentes:** Oracle · SQL Server.
2. **Plataforma de datos:** Snowflake.
3. **Transformación:** dbt · SQL, con detalle `staging → intermediate → marts`.
4. **Consumo:** Power BI.

Situar **Apache Airflow · Orquestación** en una banda separada, con conexiones discontinuas que indiquen coordinación de tareas. Snowflake aloja los datos y los modelos: el diagrama es una simplificación de un flujo ELT, no una afirmación de que dbt sea un almacén independiente.

Python se presenta en el stack y en la experiencia como herramienta de automatización y validación; no es necesario meter todas las herramientas en el hero.

Eliminar `READY`, `VALIDATED` y la barra al 86 % del diseño actual. Sustituirlos por una nota sin métricas: «Calidad, integridad y consistencia en cada entrega». No simular una ejecución real ni un estado de producción.

En escritorio el flujo ocupa la columna derecha, con recorrido vertical legible. En móvil se coloca debajo del texto y conserva ese recorrido. No depender de hover para leer información.

## 3. Un lenguaje de pipeline a lo largo de la página

- Añadir un pequeño puerto circular y un tramo de línea a los encabezados de sección; conservar los títulos actuales en español.
- Usar una guía vertical segmentada dentro de los contenedores, con tramos cortos entre bloques relacionados. Evitar una única línea absoluta de toda la página, frágil frente a cambios de altura.
- En la experiencia de Seidor, incorporar una franja «Fuentes → Modelos → Consumo» con las tecnologías ya acreditadas. Mantener el listado de responsabilidades y las fechas actuales.
- En «Cómo trabajo», conectar los pasos Entender → Construir → Validar, con un retorno visual breve de Validar a Construir para expresar iteración. Ese retorno es decorativo y no agrega un paso de navegación.
- Mantener educación y contacto despejados. No convertir cada sección en un diagrama.

## 4. Interacción protagonista: stack en estrella

### Idea y contenido

Reemplazar las tres tarjetas de `.stack-grid` por un explorador integrado en la sección `#tecnologias`, sin modal. Mostrar un botón central con el título **Mi stack**, subtítulo **Herramientas conectadas por función** y acción **Explorar herramientas**.

Al activarlo, aparecen seis tarjetas alrededor del centro. Cada tarjeta recuerda una tabla de dimensión: encabezado, separador y filas de herramientas. Una conexión une cada categoría directamente con el núcleo; no conectar dimensiones entre sí.

Texto auxiliar visible: «Un mapa de herramientas inspirado en un esquema estrella». Es una metáfora visual: el centro no representa una tabla de hechos y no se inventan claves, cardinalidades ni métricas para aparentar un modelo relacional real.

### Taxonomía acordada

| Grupo | Herramientas | Descripción breve |
| --- | --- | --- |
| Orquestación e integración | Apache Airflow, Azure Data Factory | Coordinación de tareas y flujos de datos. |
| Transformación | dbt | Organización de transformaciones y modelos por capas. |
| Lenguajes | SQL, Python | Consultas, transformación, automatización y validación. |
| Bases de datos y warehouse | Oracle, SQL Server, Snowflake | Fuentes relacionales y plataforma analítica. |
| Analytics y BI | Power BI, Tableau | Exploración y presentación de información. |
| Desarrollo y entorno | Git, GitHub, Docker | Versionado, colaboración y entornos de trabajo. |

Oracle y SQL Server están respaldados por la experiencia de `CONTENT.md`, aunque no aparezcan en su lista resumida de tecnologías. Cada herramienta tiene una ubicación principal; las categorías no pretenden agotar todos sus usos.

Debajo del diagrama, mantener un bloque visible **Fundamentos y prácticas**: ETL/ELT, pipelines, data warehousing, modelado dimensional, star schema y Agile/Scrum. Así se conservan las capacidades existentes sin presentarlas como herramientas.

No agregar tecnologías, niveles de dominio, certificaciones ni usos profesionales específicos que no estén respaldados por `CONTENT.md`.

### Estados y comportamiento

1. **Inicial con JavaScript:** nodo central, instrucción para abrir y fundamentos visibles. No mostrar falsos nodos interactivos alrededor.
2. **Abierto:** las seis categorías y todas sus herramientas quedan visibles; el botón central pasa a «Contraer herramientas». Animar una sola aparición, breve y discreta.
3. **Categoría activa:** cada encabezado de categoría es un botón. Al activarlo, resaltar su tarjeta y su conexión y mostrar su descripción breve en un panel común debajo del diagrama. Sólo una categoría activa a la vez.
4. **Sin categoría activa:** el panel explica «Seleccioná una categoría para conocer su función». No seleccionar arbitrariamente una herramienta.
5. **Cierre:** el botón central repliega el mapa y limpia la categoría activa. Si el foco estaba dentro del contenido que se oculta, devolverlo al botón central.

Los nombres de herramientas son texto, no botones ni enlaces aparentes. El detalle de categoría aporta contexto sin introducir un segundo nivel de ventanas emergentes. No abrir sitios externos al seleccionar una categoría.

El enlace «Stack» del menú debe navegar a `#tecnologias` y abrir el explorador. La apertura por navegación es idempotente: nunca cierra un mapa ya abierto. Si se carga directamente con ese fragmento, abrirlo también. La apertura desde el nodo central no cambia la URL.

### Composición responsive

- **Desde 1100 px:** estrella completa en una cuadrícula de tres columnas y tres filas. Orquestación arriba al centro; Transformación arriba a la derecha; Lenguajes abajo a la derecha; Bases de datos abajo al centro; Analytics abajo a la izquierda; Desarrollo arriba a la izquierda. Núcleo en el centro. No distribuir tarjetas mediante ángulos absolutos.
- **De 700 a 1099 px:** núcleo arriba al centro y seis tarjetas en dos columnas debajo, con ramales desde el núcleo. Preservar la relación centro–categorías sin forzar una estrella demasiado pequeña.
- **Menos de 700 px:** núcleo arriba y seis tarjetas en una columna con un tronco lateral que se ramifica a cada tarjeta. Mantener idéntico contenido y controles. No exigir zoom, arrastre ni scroll horizontal.
- El orden del DOM y del teclado será el de la tabla de taxonomía. No usar `tabindex` positivo para corregir un orden visual.
- Al abrir o cerrar, mantener el botón central visible si el cambio de altura lo saca del viewport; no desplazar automáticamente a la primera herramienta.

## 5. Accesibilidad y movimiento

- Implementar el nodo central con `<button>`, `aria-expanded` y `aria-controls` apuntando al contenedor de categorías.
- Mantener los encabezados como `h3` con un botón dentro. Usar `aria-pressed` para indicar la categoría activa y un identificador común para el panel de explicación.
- Actualizar el panel de explicación con `aria-live="polite"`. No anunciar los conectores ni toda la lista de herramientas tras cada clic.
- Todas las acciones funcionan con Tab, Enter y Espacio; Escape, sólo con foco dentro del explorador abierto, lo cierra y devuelve el foco al centro. No interferir con Escape del menú móvil.
- El contenido cerrado debe quedar realmente fuera de navegación y lectura, mediante `hidden`, no sólo con opacidad cero.
- Foco visible, controles de al menos 44 × 44 px y selección reconocible por borde/texto además del color.
- Duración orientativa de apertura: 200–300 ms mediante opacidad y desplazamiento corto. No animar altura durante largos recorridos ni hacer girar tarjetas alrededor del núcleo.
- Con `prefers-reduced-motion`, mostrar los cambios inmediatamente y omitir el desplazamiento suave. Responder también a cambios de esta preferencia durante la sesión.
- Sin JavaScript, mostrar todas las categorías como contenido estático legible y ocultar los controles que requieren JavaScript. Aplicar el estado cerrado sólo después de inicializar correctamente la interacción.

## 6. Implementación sobre los archivos actuales

### `index.html`

- Rediseñar el hero y reemplazar el bloque actual del stack por marcado semántico con las seis categorías.
- Mantener el contenido de herramientas en HTML como única fuente para la presentación; no duplicarlo en un arreglo de JavaScript.
- Añadir atributos `data-*` para identificar el explorador, el núcleo, los botones de categoría y el panel de detalle.
- Incorporar las descripciones como contenido HTML reutilizable por el panel, preservando su disponibilidad en la alternativa sin JavaScript.
- Mantener los IDs existentes de secciones, enlaces confirmados, metadatos, jerarquía de títulos y skip link.

### `styles.css`

- Agregar variables para retícula, conexiones, selección y tiempos de transición, reutilizando la paleta actual.
- Implementar la geometría con CSS Grid y áreas explícitas. Separar tamaño de tarjetas de la capa de conexiones.
- Dibujar las conexiones del stack en un SVG decorativo, `aria-hidden="true"`, situado detrás del contenido y con `pointer-events: none`.
- En móvil, simplificar los conectores al tronco y ramas mediante CSS si resulta más robusto.
- Eliminar estilos obsoletos de las antiguas tarjetas, el medidor y la inclinación del hero. No esconder errores de ancho mediante `overflow-x: hidden` como solución.

### `main.js`

- Encapsular la interacción en una función `initStackExplorer()` con salida segura si falta el componente.
- Mantener un estado mínimo: `isOpen` y `activeCategory`. Centralizar cambios visuales, `hidden` y atributos ARIA en una función de actualización.
- Integrar la apertura del stack con el manejador actual de enlaces internos, conservando el cierre del menú móvil y el respeto por movimiento reducido.
- Manejar el fragmento inicial y cambios de hash que apunten a `#tecnologias`.
- Calcular las conexiones a partir de las posiciones reales de núcleo y tarjetas dentro del contenedor; anclar cada línea al borde de la tarjeta. Usar `ResizeObserver` y agrupar redibujados con `requestAnimationFrame`.
- Recalcular al abrir, cambiar el ancho o cambiar la altura de contenido. No medir categorías ocultas ni añadir bucles de animación o listeners de scroll para el diagrama.
- Los errores de conectores no deben impedir la lectura ni la operación de los botones.

### Documentación

Al finalizar, actualizar `README.md`, `DECISIONS.md`, `TASKS.md` y `STATE.md` con las funcionalidades realizadas y la validación efectivamente ejecutada. Mantener `CONTENT.md` como fuente de hechos profesionales. Ajustar `SPEC.md` para recoger la nueva interacción sin borrar sus requisitos existentes.

## 7. Orden de trabajo

1. **Base visual y contenido:** comprobar el estado del repositorio, preservar cambios previos y reorganizar el hero y la taxonomía. Confirmar que todo se puede leer sin JavaScript.
2. **Explorador estático:** resolver primero la estrella de escritorio y sus variantes de dos y una columna. Verificar conexiones, textos largos y ausencia de solapamientos.
3. **Interacción:** implementar apertura/cierre, selección, panel, navegación al fragmento y manejo del foco.
4. **Identidad transversal:** incorporar puertos de sección, franja de experiencia y conectores del método. Añadir las transiciones al final.
5. **Validación y entrega:** corregir problemas encontrados, actualizar documentación y entregar capturas del hero y del stack abierto en escritorio y móvil.

## 8. Criterios de aceptación

- [ ] La identidad de Data Engineering se reconoce en el hero, el stack y el método, sin dificultar la lectura de experiencia y contacto.
- [ ] Airflow aparece como orquestador; Snowflake como plataforma de datos; dbt como transformación.
- [ ] El clic en «Mi stack» revela seis grupos completos y el segundo clic los contrae.
- [ ] En escritorio se reconoce la composición en estrella y todas las categorías se conectan al núcleo.
- [ ] Seleccionar una categoría actualiza su estado y la explicación; alternar entre ellas no duplica contenido ni listeners.
- [ ] «Stack» en el menú y una carga directa con `#tecnologias` abren el mapa correctamente.
- [ ] Se conservan todas las tecnologías y capacidades existentes, sin afirmaciones profesionales inventadas.
- [ ] Tab, Enter, Espacio y Escape operan correctamente; cerrar nunca deja el foco dentro de contenido oculto.
- [ ] Sin JavaScript se puede consultar todo el stack.
- [ ] Con movimiento reducido no hay animaciones de despliegue ni scroll suave.
- [ ] A 360, 390, 768, 1024 y 1440 px no hay textos cortados, tarjetas superpuestas ni scroll horizontal.
- [ ] Con zoom al 200 % el contenido sigue legible y la disposición se adapta.
- [ ] Abrir, cerrar, cambiar categoría y redimensionar con el mapa abierto conserva conexiones alineadas.
- [ ] Menú móvil, skip link, navegación interna y LinkedIn siguen funcionando; no hay errores de consola.
- [ ] No se agregan dependencias de producción, peticiones externas para iconos ni métricas ficticias.

Realizar pruebas funcionales en navegador y revisión visual de ambos estados del stack. Si hay infraestructura de pruebas disponible, automatizar apertura/cierre, navegación por fragmento y foco; no introducir un framework de pruebas sólo para comprobar estilos. Registrar cualquier verificación que no pueda ejecutarse.

## 9. Alcance y entrega esperada

El alcance incluye rediseño del hero, motivos visuales de pipeline, explorador del stack y adaptación accesible/responsive. No incluye backend, nuevas páginas, un simulador de pipelines, proyectos ficticios, formularios ni publicación.

La entrega debe incluir los archivos modificados, un resumen breve de lo implementado, capturas representativas y los resultados de validación. El portfolio debe seguir funcionando con su servidor estático actual, sin instalación de dependencias.

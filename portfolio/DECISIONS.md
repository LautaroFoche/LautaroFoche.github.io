# DECISIONS.md - Decisiones Técnicas y Visuales

## Decisiones Visuales

### Paleta de Colores
- **Color principal**: #F78E69 (botones, íconos, detalles)
- **Fondos**: #FFFAF7, #F7F4F2, blanco
- **Texto principal**: #1F2937 (oscuro)
- **Texto secundario**: #5F6368
- **Bordes suaves**: #E8DED9

### Restricciones
- No usar #F78E69 para párrafos sobre fondo blanco (falta contraste)
- Usar en botones, íconos, detalles, indicadores, bordes y fondos decorativos
- Si botón usa #F78E69, usar texto muy oscuro
- Evitar neón, fondos negros, exceso de gradientes
- No usar glassmorphism fuerte
- Animaciones mínimas y breves

### Tipografía
- Sans-serif limpia y moderna
- Espaciado generoso
- Bordes redondeados moderados
- Sombras discretas

## Decisiones Técnicas

### Estructura
- HTML semántico
- CSS organizado con variables
- JavaScript mínimo
- Sin frameworks (React/Vite por ahora)
- Sin librerías de animación
- Sin dependencias innecesarias

### Accesibilidad
- Responsive desde 360 px
- Navegable con teclado
- Foco visible
- HTML semántico
- Contraste legible
- Respeto por prefers-reduced-motion
- Sin scroll horizontal
- Sin botones falsos ni enlaces vacíos

## Estructura del Sitio (Arbol)
```
Header
  ├── Logo/Nombre
  └── Navegación (Inicio, Sobre mí, Experiencia, Tecnologías, Contacto)

Hero
  ├── Nombre
  ├── Título principal
  ├── Título complementario
  ├── Presentación breve
  └── Botones (Ver experiencia, Contactarme)

Secciones
  ├── Sobre mí
  ├── Experiencia destacada
  ├── Stack tecnológico
  ├── Cómo trabajo
  ├── Educación e idiomas
  └── Contacto

Footer
  ├── Copyright
  └── Enlaces (LinkedIn)
```

## Notas Adicionales
- Mantener cada componente y archivo pequeño
- No usar texto de relleno ni Lorem Ipsum
- No inventar empleos, métricas, certificaciones ni proyectos
- Si falta información, usar marcador "Pendiente"

## Rediseño de pipeline y stack — septiembre de 2026

- Se conserva la paleta cálida, con retícula de puntos, puertos y conexiones ortogonales.
- El hero muestra fuentes, Snowflake, transformación con dbt/SQL y consumo en Power BI. Airflow coordina desde una banda separada. Es un flujo ilustrativo; se retiraron estados de producción y el medidor ficticio.
- El stack usa seis categorías semánticas con tecnologías en HTML e íconos locales. El centro es una metáfora de conexión, no una tabla de hechos con métricas inventadas.
- El explorador usa botones nativos y atributos ARIA. Cada categoría tiene una ubicación principal. Las capacidades y metodologías se conservan en un bloque separado.
- CSS Grid resuelve estrella, dos columnas y una columna. Un SVG decorativo recalcula conexiones con ResizeObserver y requestAnimationFrame, sin librerías ni procesamiento continuo.
- La selección se indica mediante borde, marca de verificación y explicación en una región de anuncio cortés.
- Sin JavaScript las categorías y descripciones están visibles; los controles del explorador se habilitan sólo al inicializar.
- La preferencia de movimiento reducido se consulta al ejecutar cada desplazamiento; CSS también responde a cambios de preferencia durante la sesión.
- Se reserva el espacio de la barra de desplazamiento para mantener estable la geometría del diagrama.
- Logotipos de Simple Icons 11.15.0 con licencia CC0 local. SQL y Azure Data Factory tienen pictogramas propios, documentados en assets/icons/README.md.

### Despliegue radial del stack

A pedido del propietario, la aparición breve se reemplaza por una salida desde el centro: traslación y escala por tarjeta, 780 ms de duración y 55 ms de desfase entre categorías, con sobrepaso limitado a 9 px. El símbolo central pulsa y las conexiones aparecen progresivamente. Se usa Web Animations API sin dependencias. Los conectores se calculan con posiciones de layout para no seguir los transforms transitorios. La animación se cancela al cerrar, redimensionar, enfocar una categoría o activar movimiento reducido; seleccionar categorías no reinicia el despliegue.

### Apertura pausada y cierre al centro

La apertura pasa a 1100 ms por tarjeta con desfase de 75 ms (1475 ms total). El cierre usa 850 ms por tarjeta y desfase inverso de 55 ms: las tarjetas se reúnen en el centro antes de ocultar el contenedor. Se mantiene el espacio del mapa durante el recorrido. Reabrir durante el cierre recupera la posición visual actual; tokens de transición impiden que un cierre anterior oculte un mapa reabierto. Se preservan teclado y movimiento reducido.

### Altura animada del contenedor

El contenedor del stack interpola su altura real al abrir (1100 ms) y al finalizar el regreso de las tarjetas (800 ms). El recorte sólo se activa durante la transición y se elimina al terminar; la altura final vuelve a ser automática. Reabrir durante la contracción parte de la altura visible actual. Redimensionar o activar movimiento reducido cancela la interpolación y recupera el layout natural.

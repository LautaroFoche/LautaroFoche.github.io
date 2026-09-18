# Estado actual

## Fase

Rediseño e implementación completados sobre el plan de pipeline y esquema estrella. No publicado.

## Entregables

- Hero con flujo ilustrativo, capas diferenciadas y banda de orquestación.
- Stack interactivo de seis categorías y trece tecnologías con íconos locales.
- Conexiones adaptativas, selección con explicación y apertura/cierre accesibles.
- Referencias a pipelines en encabezados, experiencia y método.
- Capturas en `preview/` y atribución de íconos en `assets/icons/`.

## Validación realizada

- JavaScript validado sintácticamente con Node.
- Navegador Chromium integrado: apertura/cierre, selección de categoría y conexión resaltada.
- Enter y Espacio para abrir/cerrar; Escape devuelve el foco al control y limpia la selección.
- Navegación con Tab entre categorías y activación por Enter.
- Menú móvil abre/cierra; «Stack» cierra el menú y abre el mapa.
- Carga directa y recarga con `#tecnologias`: mapa abierto.
- Anchos 360, 390, 768, 1024 y 1440 px: sin desborde horizontal, tarjetas superpuestas ni contenido de tarjeta recortado. Seis conexiones y trece íconos cargados.
- Inspección visual de hero y mapa en escritorio y móvil, y mapa en tablet.
- Copia temporal de la página sin script: seis categorías y descripciones visibles, sin controles falsos del explorador. Copia eliminada después de verificar.
- Sin errores ni advertencias de consola en las interacciones ejecutadas.
- Un único h1, IDs sin duplicados, referencias ARIA válidas, archivos de imagen existentes y ningún enlace vacío.
- Trece SVG analizados correctamente; sin scripts embebidos ni peticiones remotas para recursos del sitio.

## Límites de la validación

- Movimiento reducido revisado en CSS y en la consulta dinámica de la preferencia; no se pudo emular el ajuste del sistema desde la herramienta de navegador.
- El atajo de zoom no modificó el zoom en el navegador integrado: queda pendiente una comprobación manual al 200 % en un navegador externo.
- No se ejecutaron lectores de pantalla ni una matriz de navegadores externos.

## Pendiente del propietario

Publicar en el hosting elegido. Email, CV y proyectos nuevos requieren contenido confirmado.

## Ajuste de animación del stack

Implementada salida radial desde el núcleo, escalonada y con asentamiento suave. Verificado en navegador: transformaciones distintas durante el despliegue, regreso a `transform: none`, seis conexiones finales, cierre rápido sin tarjetas residuales y despliegue móvil sin desborde. Sin errores de consola de la página. La preferencia de movimiento reducido omite la animación y cancela una animación en curso al cambiar.

## Apertura más lenta y cierre animado

Comprobados en navegador: cierre con tarjetas todavía visibles durante el movimiento, ocultación al finalizar, reapertura durante el cierre sin ocultación tardía y cierre móvil interrumpiendo la apertura. Sin desbordes ni errores de consola en estas pruebas.

## Expansión y contracción de la caja

Verificada interpolación de altura en navegador: 458 px cerrado, alturas intermedias al abrir y aproximadamente 912 px expandido en escritorio. Comprobadas contracción tras el regreso de tarjetas, reapertura durante la contracción y contracción móvil sin desborde. Al terminar se elimina el recorte temporal y no queda altura inline fija.

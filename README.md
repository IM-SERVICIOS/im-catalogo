# IM Catálogo Inteligente

Plataforma digital interactiva de IM Servicios Contables. No es una landing page: es una
aplicación de catálogo donde el usuario explora, filtra, compara y (en fases próximas)
solicita servicios contables y fiscales.

Construida sin frameworks ni backend: HTML5, CSS3 y JavaScript moderno, con los datos en
archivos JSON. 100% compatible con GitHub Pages.

## Estado actual: Fase 1 — Base del catálogo interactivo

- Catálogo de 18 servicios reales distribuidos en 6 categorías.
- Buscador en vivo (nombre, descripción, cliente ideal, categoría).
- Filtro por categoría con conteo de servicios.
- Tarjetas dinámicas generadas 100% desde datos (nada de HTML hardcodeado).
- Modal de detalle por servicio (beneficios, cliente ideal, descripción completa).
- Identidad visual propia ("libro mayor digital" + sello fiscal), no una plantilla genérica.

## Estructura del proyecto

```
/
├── index.html              → Estructura semántica de la interfaz (sin datos embebidos)
├── css/
│   └── styles.css          → Tokens de diseño (color, tipografía, layout) y componentes
├── js/
│   └── app.js              → Carga de datos, render del catálogo, buscador, filtros, modal
├── assets/
│   └── icons/
│       └── sprite.svg      → Set propio de iconos (sin librerías externas)
├── data/
│   └── services.json       → Fuente única de verdad de los servicios
├── config/
│   └── config.json         → Marca, navegación y mapa de módulos futuros
└── README.md
```

## Arquitectura

- **Datos ≠ presentación.** `index.html` no contiene ni un solo servicio escrito a mano;
  todo vive en `data/services.json` y se pinta en tiempo de ejecución desde `js/app.js`.
- **`app.js` está dividido en capas** dentro de un único archivo (para mantenerlo simple en
  Fase 1, pero ya separado por responsabilidad):
  - `dataLayer` (`cargarJSON`, `iniciar`): trae `config.json` y `services.json`.
  - `render` (`renderNav`, `renderStats`, `renderCategoryTabs`, `renderCards`, `cardHTML`):
    construye el DOM a partir del estado.
  - `interactions` (`registrarEventos`, `abrirDetalle`, `cerrarDetalle`): buscador, tabs y modal.
- **Estado en memoria** (`state`): categoría activa y término de búsqueda. Cualquier cambio
  vuelve a renderizar solo la grilla de tarjetas, no toda la página.
- **Iconos propios**: `assets/icons/sprite.svg` define símbolos SVG reutilizables (uno por
  categoría, más utilitarios de búsqueda, cierre, check y candado para fases futuras).

## Cómo agregar o editar un servicio

Abre `data/services.json` y agrega un objeto dentro del arreglo `servicios`:

```json
{
  "id": "IM-019",
  "nombre": "Nombre del servicio",
  "categoria": "fiscal",
  "descripcionCorta": "Una línea que resume el servicio.",
  "descripcionCompleta": "Explicación completa de qué resuelve y cómo.",
  "beneficios": ["Beneficio 1", "Beneficio 2", "Beneficio 3"],
  "clienteIdeal": "A quién le sirve este servicio.",
  "icono": "fiscal",
  "disponible": true,
  "accionPrincipal": { "texto": "Solicitar información", "tipo": "detalle" }
}
```

- `categoria` debe coincidir con un `id` existente en `categorias` (dentro del mismo archivo).
- `icono` debe coincidir con un símbolo existente en `assets/icons/sprite.svg`
  (`fiscal`, `contable`, `organizacion`, `dashboards`, `automatizacion`, `asesorias`).
- `disponible: false` muestra el servicio como "Próximamente" con un punto de estado en ámbar.

No se requiere tocar `index.html` ni `app.js` para agregar servicios nuevos.

## Cómo modificar la marca o el menú

Edita `config/config.json`:

- `marca`: nombre, siglas y lema que aparecen en el encabezado y el hero.
- `navegacion`: enlaces del menú principal. Los que tengan `"activo": false` se muestran
  deshabilitados con la etiqueta `estado` (por ejemplo, "Próximamente").
- `modulosFuturos`: mapa de referencia para las carpetas que se crearán en Fase 3
  (`/portal-clientes`, `/academia-im`, `/plantillas`, `/dashboard`).

## Cómo probarlo

Este proyecto usa `fetch()` para leer los archivos JSON, por lo que **no se puede abrir
`index.html` directamente con doble clic** (los navegadores bloquean `fetch` sobre `file://`).
Sírvelo con cualquier servidor local:

```bash
cd im-catalogo
python3 -m http.server 8000
# abre http://localhost:8000 en el navegador
```

O, si tienes Node instalado:

```bash
npx serve .
```

En GitHub Pages funcionará sin configuración adicional, ya que se sirve por HTTPS.

## Roadmap

- **Fase 2 — Experiencia interactiva y comercial**: detalle enriquecido con preguntas
  frecuentes y proceso de trabajo, filtros por tipo de cliente/necesidad/nivel de servicio,
  selección de servicios ("Mis servicios seleccionados"), resumen personalizado y botones
  de contacto (WhatsApp, formulario, correo).
- **Fase 3 — Catálogo inteligente y ecosistema IM**: cotizador inteligente, panel de
  administración básico (sin backend todavía) y estructura preparada para
  `/portal-clientes`, `/academia-im`, `/plantillas` y `/dashboard`.

## Reglas de desarrollo seguidas en esta fase

- Sin datos de servicios escritos en HTML.
- Sin funciones simuladas sin explicar (el único placeholder es el botón de "Solicitar
  información" dentro del modal, que hoy muestra una alerta indicando que se conectará en
  Fase 2 — está documentado en el propio código).
- Componentes reutilizables (`cardHTML`, tabs, modal) en vez de HTML repetido.
- Compatible con GitHub Pages sin build step.

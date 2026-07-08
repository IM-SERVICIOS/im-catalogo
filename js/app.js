/**
 * IM Catálogo Inteligente — Fase 1
 * Arquitectura: sin framework, sin backend. Los datos viven en /data y /config
 * y esta capa (app.js) es la única responsable de leerlos y pintarlos.
 *
 * Módulos internos:
 *  - state:      estado de la aplicación en memoria
 *  - dataLayer:  carga de JSON (config + servicios)
 *  - render:     construcción de DOM a partir del estado
 *  - interactions: buscador, filtros, modal
 */

(function () {
  'use strict';

  const ICONS_PATH = 'assets/icons/sprite.svg';

  const state = {
    config: null,
    categorias: [],
    servicios: [],
    beneficioExclusivo: null,
    categoriaActiva: 'todos',
    termino: ''
  };

  const els = {
    mainNav: document.getElementById('main-nav'),
    statTotal: document.getElementById('stat-total'),
    statCategorias: document.getElementById('stat-categorias'),
    heroExclusive: document.getElementById('hero-exclusive'),
    heroExclusiveTag: document.getElementById('hero-exclusive-tag'),
    heroExclusiveTexto: document.getElementById('hero-exclusive-texto'),
    searchInput: document.getElementById('search-input'),
    searchCount: document.getElementById('search-count'),
    categoryTabs: document.getElementById('category-tabs'),
    cardGrid: document.getElementById('card-grid'),
    modalOverlay: document.getElementById('modal-overlay'),
    modalTitle: document.getElementById('modal-title'),
    modalFolio: document.getElementById('modal-folio'),
    modalIcon: document.getElementById('modal-icon'),
    modalDescripcion: document.getElementById('modal-descripcion'),
    modalSecProblema: document.getElementById('modal-sec-problema'),
    modalProblema: document.getElementById('modal-problema'),
    modalSecIncluye: document.getElementById('modal-sec-incluye'),
    modalIncluye: document.getElementById('modal-incluye'),
    modalBeneficios: document.getElementById('modal-beneficios'),
    modalSecProceso: document.getElementById('modal-sec-proceso'),
    modalProceso: document.getElementById('modal-proceso'),
    modalSecResultado: document.getElementById('modal-sec-resultado'),
    modalResultado: document.getElementById('modal-resultado'),
    modalSecFaq: document.getElementById('modal-sec-faq'),
    modalFaq: document.getElementById('modal-faq'),
    modalCliente: document.getElementById('modal-cliente'),
    modalAccionesSecundarias: document.getElementById('modal-acciones-secundarias'),
    modalClose: document.getElementById('modal-close'),
    modalCerrarBtn: document.getElementById('modal-cerrar-btn'),
    modalCtaBtn: document.getElementById('modal-cta-btn')
  };

  // ------------------------------------------------------------------------
  // Data layer
  // ------------------------------------------------------------------------

  async function cargarJSON(ruta) {
    const respuesta = await fetch(ruta, { cache: 'no-cache' });
    if (!respuesta.ok) {
      throw new Error('No se pudo cargar ' + ruta + ' (' + respuesta.status + ')');
    }
    return respuesta.json();
  }

  async function iniciar() {
    try {
      const [config, catalogo] = await Promise.all([
        cargarJSON('config/config.json'),
        cargarJSON('data/services.json')
      ]);

      state.config = config;
      state.categorias = catalogo.categorias;
      state.servicios = catalogo.servicios;
      state.beneficioExclusivo = catalogo.beneficioExclusivo || null;

      renderNav();
      renderStats();
      renderHeroExclusivo();
      renderCategoryTabs();
      renderCards();
      registrarEventos();
    } catch (error) {
      mostrarErrorCarga(error);
    }
  }

  function mostrarErrorCarga(error) {
    console.error(error);
    els.cardGrid.innerHTML =
      '<div class="empty-state">' +
      '<h3>No se pudo cargar el catálogo</h3>' +
      '<p>Este proyecto usa <code>fetch</code> para leer data/services.json, lo cual requiere' +
      ' servirse por HTTP y no abrirse directamente como archivo local.<br>' +
      'Prueba con: <code>python -m http.server</code> dentro de la carpeta del proyecto' +
      ' y abre <code>http://localhost:8000</code>.</p>' +
      '</div>';
  }

  // ------------------------------------------------------------------------
  // Render
  // ------------------------------------------------------------------------

  function renderNav() {
    els.mainNav.innerHTML = state.config.navegacion.map(function (item) {
      if (item.activo) {
        return '<a class="nav-link is-active" href="' + item.enlace + '">' +
          '<span class="nav-text">' + item.texto + '</span></a>';
      }
      return '<span class="nav-link is-disabled" tabindex="0" aria-disabled="true">' +
        '<span class="nav-text">' + item.texto + '</span>' +
        '<span class="nav-tag">' + (item.estado || 'Próximamente') + '</span>' +
        '</span>';
    }).join('');
  }

  function renderStats() {
    els.statTotal.textContent = state.servicios.filter(function (s) { return s.disponible; }).length;
    els.statCategorias.textContent = state.categorias.length;
  }

  function renderHeroExclusivo() {
    const b = state.beneficioExclusivo;
    if (!b || (!b.titulo && !b.descripcion && !b.texto)) {
      els.heroExclusive.hidden = true;
      return;
    }
    els.heroExclusiveTag.textContent = b.titulo || 'Beneficio exclusivo';
    els.heroExclusiveTexto.textContent = b.descripcion || b.texto || '';
    els.heroExclusive.hidden = false;
  }

  function renderCategoryTabs() {
    const total = state.servicios.length;

    const tabTodos =
      '<button class="tab is-active" data-cat="todos" role="tab" aria-selected="true">' +
      'Todos <span class="tab-count">' + total + '</span></button>';

    const tabsCategorias = state.categorias.map(function (cat) {
      const count = state.servicios.filter(function (s) { return s.categoria === cat.id; }).length;
      return (
        '<button class="tab" data-cat="' + cat.id + '" role="tab" aria-selected="false">' +
        '<svg class="icon" aria-hidden="true"><use href="' + ICONS_PATH + '#icon-' + cat.icono + '"></use></svg>' +
        cat.nombre +
        '<span class="tab-count">' + count + '</span>' +
        '</button>'
      );
    }).join('');

    els.categoryTabs.innerHTML = tabTodos + tabsCategorias;
  }

  function nombreCategoria(id) {
    const cat = state.categorias.find(function (c) { return c.id === id; });
    return cat ? cat.nombre : id;
  }

  function serviciosFiltrados() {
    const termino = state.termino.trim().toLowerCase();

    return state.servicios.filter(function (s) {
      const coincideCategoria = state.categoriaActiva === 'todos' || s.categoria === state.categoriaActiva;
      if (!coincideCategoria) return false;

      if (!termino) return true;

      const bolsa = [
        s.nombre,
        s.descripcionCorta,
        s.descripcionCompleta,
        s.clienteIdeal,
        nombreCategoria(s.categoria)
      ].join(' ').toLowerCase();

      return bolsa.includes(termino);
    });
  }

  function renderCards() {
    const lista = serviciosFiltrados();

    els.searchCount.textContent = lista.length + ' de ' + state.servicios.length;

    if (lista.length === 0) {
      els.cardGrid.innerHTML =
        '<div class="empty-state">' +
        '<svg class="icon" aria-hidden="true"><use href="' + ICONS_PATH + '#icon-search"></use></svg>' +
        '<h3>Sin resultados en este libro</h3>' +
        '<p>Ajusta tu búsqueda o elige otra categoría del catálogo.</p>' +
        '</div>';
      return;
    }

    els.cardGrid.innerHTML = lista.map(cardHTML).join('');
  }

  function cardHTML(servicio) {
    const statusClase = servicio.disponible ? '' : 'is-soon';
    const statusTexto = servicio.disponible ? 'Disponible' : 'Próximamente';

    return (
      '<button class="service-card" type="button" data-id="' + servicio.id + '">' +
        '<div class="card-top">' +
          '<div class="card-icon">' +
            '<svg class="icon" aria-hidden="true"><use href="' + ICONS_PATH + '#icon-' + servicio.icono + '"></use></svg>' +
          '</div>' +
          '<span class="folio-tag">' + servicio.id + '</span>' +
        '</div>' +
        '<div class="card-body">' +
          '<div class="card-category">' + nombreCategoria(servicio.categoria) + '</div>' +
          '<h3>' + servicio.nombre + '</h3>' +
          '<p>' + servicio.descripcionCorta + '</p>' +
        '</div>' +
        '<div class="card-footer">' +
          '<span class="card-status"><span class="status-dot ' + statusClase + '"></span>' + statusTexto + '</span>' +
          '<span class="card-cta">Ver detalle</span>' +
        '</div>' +
      '</button>'
    );
  }

  // ------------------------------------------------------------------------
  // Modal de detalle
  // ------------------------------------------------------------------------

  function abrirDetalle(id) {
    const servicio = state.servicios.find(function (s) { return s.id === id; });
    if (!servicio) return;

    els.modalTitle.textContent = servicio.nombre;
    els.modalFolio.textContent = servicio.id + ' · ' + nombreCategoria(servicio.categoria);
    els.modalIcon.innerHTML =
      '<svg class="icon" aria-hidden="true"><use href="' + ICONS_PATH + '#icon-' + servicio.icono + '"></use></svg>';
    els.modalDescripcion.textContent = servicio.descripcionCompleta;
    els.modalCliente.textContent = servicio.clienteIdeal;

    // Problema que resolvemos
    mostrarSeccion(els.modalSecProblema, servicio.problema);
    els.modalProblema.textContent = servicio.problema || '';

    // Qué incluye
    mostrarSeccion(els.modalSecIncluye, servicio.queIncluye && servicio.queIncluye.length);
    renderListaSimple(els.modalIncluye, servicio.queIncluye, 'icon-check');

    // Beneficios (se mantiene, siempre visible)
    els.modalBeneficios.innerHTML = (servicio.beneficios || []).map(function (b) {
      return '<li><svg class="icon" aria-hidden="true"><use href="' + ICONS_PATH + '#icon-check"></use></svg>' + b + '</li>';
    }).join('');

    // Cómo trabajamos
    mostrarSeccion(els.modalSecProceso, servicio.comoTrabajamos && servicio.comoTrabajamos.length);
    els.modalProceso.innerHTML = (servicio.comoTrabajamos || []).map(function (paso) {
      return '<li>' + paso + '</li>';
    }).join('');

    // Resultado esperado
    mostrarSeccion(els.modalSecResultado, servicio.resultadoEsperado);
    els.modalResultado.textContent = servicio.resultadoEsperado || '';

    // Preguntas frecuentes
    mostrarSeccion(els.modalSecFaq, servicio.faq && servicio.faq.length);
    renderFAQ(els.modalFaq, servicio.faq);

    // Acciones secundarias (preparadas, inactivas hasta la siguiente etapa)
    renderAccionesSecundarias(els.modalAccionesSecundarias, servicio.accionesSecundarias);

    els.modalCtaBtn.textContent = servicio.accionPrincipal.texto;
    els.modalCtaBtn.disabled = false;
    els.modalCtaBtn.onclick = function () {
      // Fase 2 conectará este botón a WhatsApp / formulario / selección de servicios.
      alert('En la Fase 2 este botón enviará "' + servicio.nombre + '" a tu solicitud de propuesta.');
    };

    els.modalOverlay.hidden = false;
    document.body.style.overflow = 'hidden';
    els.modalClose.focus();
  }

  // Muestra/oculta una sección del modal según si hay contenido real.
  function mostrarSeccion(wrapper, contenido) {
    if (!wrapper) return;
    wrapper.hidden = !contenido;
  }

  // Convierte un array de strings en una lista <li>, con ícono opcional.
  function renderListaSimple(contenedor, items, iconoId) {
    if (!contenedor) return;
    contenedor.innerHTML = (items || []).map(function (item) {
      const icono = iconoId
        ? '<svg class="icon" aria-hidden="true"><use href="' + ICONS_PATH + '#' + iconoId + '"></use></svg>'
        : '';
      return '<li>' + icono + item + '</li>';
    }).join('');
  }

  // Arma el acordeón de preguntas frecuentes a partir de [{pregunta, respuesta}].
  function renderFAQ(contenedor, preguntas) {
    if (!contenedor) return;
    contenedor.innerHTML = (preguntas || []).map(function (p) {
      return (
        '<details class="faq-item">' +
          '<summary>' + p.pregunta + '</summary>' +
          '<p>' + p.respuesta + '</p>' +
        '</details>'
      );
    }).join('');
  }

  // Botones secundarios (Agregar al cotizador / WhatsApp) preparados pero
  // deshabilitados hasta que esas fases se implementen.
  function renderAccionesSecundarias(contenedor, acciones) {
    if (!contenedor) return;
    if (!acciones || !acciones.length) {
      contenedor.hidden = true;
      contenedor.innerHTML = '';
      return;
    }
    contenedor.hidden = false;
    contenedor.innerHTML = acciones.map(function (accion) {
      return '<button class="btn btn-secondary" type="button" disabled title="Disponible en una próxima etapa">' + accion.texto + '</button>';
    }).join('');
  }

  function cerrarDetalle() {
    els.modalOverlay.hidden = true;
    document.body.style.overflow = '';
  }

  // ------------------------------------------------------------------------
  // Eventos
  // ------------------------------------------------------------------------

  function registrarEventos() {
    els.searchInput.addEventListener('input', function (e) {
      state.termino = e.target.value;
      renderCards();
    });

    els.categoryTabs.addEventListener('click', function (e) {
      const boton = e.target.closest('.tab');
      if (!boton) return;

      state.categoriaActiva = boton.dataset.cat;

      els.categoryTabs.querySelectorAll('.tab').forEach(function (t) {
        t.classList.toggle('is-active', t === boton);
        t.setAttribute('aria-selected', t === boton ? 'true' : 'false');
      });

      renderCards();
    });

    els.cardGrid.addEventListener('click', function (e) {
      const tarjeta = e.target.closest('.service-card');
      if (!tarjeta) return;
      abrirDetalle(tarjeta.dataset.id);
    });

    els.modalClose.addEventListener('click', cerrarDetalle);
    els.modalCerrarBtn.addEventListener('click', cerrarDetalle);

    els.modalOverlay.addEventListener('click', function (e) {
      if (e.target === els.modalOverlay) cerrarDetalle();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !els.modalOverlay.hidden) cerrarDetalle();
    });
  }

  document.addEventListener('DOMContentLoaded', iniciar);
})();

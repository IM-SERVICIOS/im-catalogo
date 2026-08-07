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
  const SELECTION_KEY = 'im-catalogo:seleccion';

  const TIPOS_CLIENTE = [
    { id: 'fisica', etiqueta: 'Persona física' },
    { id: 'emprendedor', etiqueta: 'Emprendedor' },
    { id: 'empresa', etiqueta: 'Empresa' }
  ];

  const state = {
    config: null,
    categorias: [],
    servicios: [],
    beneficioExclusivo: null,
    categoriaActiva: 'todos',
    termino: '',
    tipoClienteActivo: null,
    seleccion: cargarSeleccion()
  };

  const els = {
    mainNav: document.getElementById('main-nav'),
    statTotal: document.getElementById('stat-total'),
    statCategorias: document.getElementById('stat-categorias'),
    heroExclusive: document.getElementById('hero-exclusive'),
    heroExclusiveTag: document.getElementById('hero-exclusive-tag'),
    heroExclusiveTexto: document.getElementById('hero-exclusive-texto'),
    heroExclusiveLink: document.getElementById('hero-exclusive-link'),
    searchInput: document.getElementById('search-input'),
    searchCount: document.getElementById('search-count'),
    categoryTabs: document.getElementById('category-tabs'),
    clientFilterChips: document.getElementById('client-filter-chips'),
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
    modalSeleccionBtn: document.getElementById('modal-seleccion-btn'),
    modalCtaBtn: document.getElementById('modal-cta-btn'),
    whatsappFloat: document.getElementById('whatsapp-float'),
    selectionFloat: document.getElementById('selection-float'),
    selectionFloatCount: document.getElementById('selection-float-count'),
    selectionPanelOverlay: document.getElementById('selection-panel-overlay'),
    selectionPanelBody: document.getElementById('selection-panel-body'),
    selectionPanelClose: document.getElementById('selection-panel-close'),
    selectionVaciarBtn: document.getElementById('selection-vaciar-btn'),
    selectionCotizarBtn: document.getElementById('selection-cotizar-btn')
  };

  // ------------------------------------------------------------------------
  // Selección ("carrito"): persiste en sessionStorage mientras se navega el
  // catálogo, sin backend. Se limpia al cerrar la pestaña, igual que el resto
  // del estado de la sesión de exploración.
  // ------------------------------------------------------------------------

  function cargarSeleccion() {
    try {
      const crudo = sessionStorage.getItem(SELECTION_KEY);
      const lista = crudo ? JSON.parse(crudo) : [];
      return Array.isArray(lista) ? lista : [];
    } catch (error) {
      return [];
    }
  }

  function guardarSeleccion() {
    try {
      sessionStorage.setItem(SELECTION_KEY, JSON.stringify(state.seleccion));
    } catch (error) {
      // sessionStorage puede no estar disponible (modo privado, cuota, etc.);
      // la selección sigue funcionando solo en memoria para esta sesión.
    }
  }

  function estaSeleccionado(id) {
    return state.seleccion.indexOf(id) !== -1;
  }

  function alternarSeleccion(id) {
    const indice = state.seleccion.indexOf(id);
    if (indice === -1) {
      state.seleccion.push(id);
    } else {
      state.seleccion.splice(indice, 1);
    }
    guardarSeleccion();
    sincronizarUISeleccion();
  }

  function quitarDeSeleccion(id) {
    const indice = state.seleccion.indexOf(id);
    if (indice === -1) return;
    state.seleccion.splice(indice, 1);
    guardarSeleccion();
    sincronizarUISeleccion();
  }

  function vaciarSeleccion() {
    state.seleccion = [];
    guardarSeleccion();
    sincronizarUISeleccion();
  }

  // Refresca todo lo que depende de la selección: contador flotante, botones
  // "+" ya pintados en las tarjetas, botón del modal (si está abierto) y,
  // si el panel lateral está visible, su lista.
  function sincronizarUISeleccion() {
    const total = state.seleccion.length;

    if (els.selectionFloat) els.selectionFloat.hidden = total === 0;
    if (els.selectionFloatCount) els.selectionFloatCount.textContent = String(total);

    els.cardGrid.querySelectorAll('.card-add-btn').forEach(function (boton) {
      boton.classList.toggle('is-selected', estaSeleccionado(boton.dataset.id));
    });

    if (els.modalSeleccionBtn && !els.modalOverlay.hidden) {
      const idActual = els.modalSeleccionBtn.dataset.id;
      actualizarBotonSeleccionModal(idActual);
    }

    if (els.selectionPanelOverlay && els.selectionPanelOverlay.classList.contains('is-open')) {
      renderPanelSeleccion();
    }
  }

  function actualizarBotonSeleccionModal(id) {
    const seleccionado = estaSeleccionado(id);
    els.modalSeleccionBtn.classList.toggle('is-selected', seleccionado);
    els.modalSeleccionBtn.querySelector('span').textContent =
      seleccionado ? 'Ya está en mi selección' : 'Agregar a mi selección';
  }

  function renderPanelSeleccion() {
    if (!els.selectionPanelBody) return;

    const items = state.seleccion
      .map(function (id) { return state.servicios.find(function (s) { return s.id === id; }); })
      .filter(Boolean);

    if (items.length === 0) {
      els.selectionPanelBody.innerHTML =
        '<p class="selection-panel-empty">Aún no has agregado servicios. Usa el botón "+" en cualquier tarjeta o dentro del detalle de un servicio.</p>';
      if (els.selectionCotizarBtn) els.selectionCotizarBtn.disabled = true;
      return;
    }

    const noDisponibles = items.filter(function (s) { return !s.disponible; });
    const aviso = noDisponibles.length
      ? '<div class="selection-panel-notice">' +
          (noDisponibles.length === 1
            ? '"' + noDisponibles[0].nombre + '" todavía está marcado como Próximamente y no se puede cotizar. Se excluirá al continuar.'
            : noDisponibles.length + ' servicios de tu selección están marcados como Próximamente y no se pueden cotizar todavía. Se excluirán al continuar.') +
        '</div>'
      : '';

    const lista = items.map(function (s) {
      const badge = s.disponible ? '' : '<span class="selection-item-badge">Próximamente</span>';
      return (
        '<div class="selection-item' + (s.disponible ? '' : ' is-soon') + '" data-id="' + s.id + '">' +
          '<div class="selection-item-info">' +
            '<h4>' + s.nombre + badge + '</h4>' +
            '<span>' + s.id + ' · ' + nombreCategoria(s.categoria) + '</span>' +
          '</div>' +
          '<button class="selection-item-remove" type="button" data-remove="' + s.id + '" aria-label="Quitar ' + s.nombre + ' de mi selección">' +
            '<svg class="icon" aria-hidden="true"><use href="' + ICONS_PATH + '#icon-trash"></use></svg>' +
          '</button>' +
        '</div>'
      );
    }).join('');

    els.selectionPanelBody.innerHTML = aviso + lista;

    if (els.selectionCotizarBtn) {
      els.selectionCotizarBtn.disabled = noDisponibles.length === items.length;
    }
  }

  function abrirPanelSeleccion() {
    renderPanelSeleccion();
    els.selectionPanelOverlay.hidden = false;
    requestAnimationFrame(function () {
      els.selectionPanelOverlay.classList.add('is-open');
    });
    document.body.style.overflow = 'hidden';
  }

  function cerrarPanelSeleccion() {
    if (els.selectionPanelOverlay.hidden) return;
    els.selectionPanelOverlay.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(function () {
      els.selectionPanelOverlay.hidden = true;
    }, 200);
  }

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
    mostrarSkeleton();
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
      renderWhatsappFloat();
      renderCategoryTabs();
      renderClientFilter();
      renderCards();
      registrarEventos();
      sincronizarUISeleccion();
    } catch (error) {
      mostrarErrorCarga(error);
    }
  }

  function mostrarSkeleton() {
    if (!els.cardGrid) return;
    let placeholders = '';
    for (let i = 0; i < 6; i++) {
      placeholders +=
        '<div class="service-card skeleton-card" style="--i:' + i + '" aria-hidden="true">' +
          '<div class="skeleton-block" style="height:104px;border-radius:0;margin:0;"></div>' +
          '<div class="card-body" style="padding:16px 20px 0;">' +
            '<div class="skeleton-block skeleton-line" style="width:70px;height:10px"></div>' +
            '<div class="skeleton-block skeleton-line" style="width:80%;height:16px;margin-top:8px"></div>' +
            '<div class="skeleton-block skeleton-line" style="width:100%;margin-top:10px"></div>' +
            '<div class="skeleton-block skeleton-line" style="width:65%"></div>' +
          '</div>' +
        '</div>';
    }
    els.cardGrid.innerHTML = placeholders;
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
        const esExterno = /^https?:\/\//.test(item.enlace);
        const targetAttrs = esExterno ? ' target="_blank" rel="noopener noreferrer"' : '';
        return '<a class="nav-link is-active" href="' + item.enlace + '"' + targetAttrs + '>' +
          '<span class="nav-text">' + item.texto + '</span></a>';
      }
      return '<span class="nav-link is-disabled" tabindex="0" aria-disabled="true">' +
        '<span class="nav-text">' + item.texto + '</span>' +
        '<span class="nav-tag">' + (item.estado || 'Próximamente') + '</span>' +
        '</span>';
    }).join('');
  }

  function renderWhatsappFloat() {
    const contacto = state.config.contacto;
    if (!els.whatsappFloat || !contacto || !contacto.whatsappNumero) return;
    const mensaje = encodeURIComponent(contacto.whatsappMensajeDefault || 'Hola, me interesa información sobre IM Servicios Contables');
    els.whatsappFloat.href = 'https://wa.me/' + contacto.whatsappNumero + '?text=' + mensaje;
    els.whatsappFloat.hidden = false;
  }

  function renderStats() {
    const totalDisponible = state.servicios.filter(function (s) { return s.disponible; }).length;
    animarNumero(els.statTotal, totalDisponible);
    animarNumero(els.statCategorias, state.categorias.length);
  }

  // Cuenta ascendente suave para los números del hero (0 -> valor final).
  function animarNumero(el, valorFinal, duracion) {
    if (!el) return;
    duracion = duracion || 900;
    const inicio = performance.now();
    function paso(ahora) {
      const progreso = Math.min(1, (ahora - inicio) / duracion);
      const facil = 1 - Math.pow(1 - progreso, 3); // ease-out-cubic
      el.textContent = Math.round(facil * valorFinal);
      if (progreso < 1) requestAnimationFrame(paso);
    }
    requestAnimationFrame(paso);
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

    if (els.heroExclusiveLink) {
      const portal = (state.config.navegacion || []).find(function (item) {
        return item.activo && /portal/i.test(item.texto);
      });
      if (portal) {
        els.heroExclusiveLink.href = portal.enlace;
        els.heroExclusiveLink.hidden = false;
      } else {
        els.heroExclusiveLink.hidden = true;
      }
    }
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

  // Chips de filtro por tipo de cliente. A diferencia de las categorías,
  // funciona como un interruptor único: se puede activar como máximo un tipo
  // a la vez, y se combina en AND con la categoría y el buscador.
  function renderClientFilter() {
    if (!els.clientFilterChips) return;
    els.clientFilterChips.innerHTML = TIPOS_CLIENTE.map(function (tipo) {
      const activo = state.tipoClienteActivo === tipo.id;
      return (
        '<button class="chip' + (activo ? ' is-active' : '') + '" type="button" data-tipo="' + tipo.id + '" aria-pressed="' + activo + '">' +
        tipo.etiqueta +
        '</button>'
      );
    }).join('');
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

      const coincideTipoCliente = !state.tipoClienteActivo ||
        (s.tipoCliente || []).indexOf(state.tipoClienteActivo) !== -1;
      if (!coincideTipoCliente) return false;

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

    els.cardGrid.innerHTML = lista.map(function (s, i) { return cardHTML(s, i); }).join('');
  }

  // Nota de arquitectura: hasta Fase 1, la tarjeta completa era un <button>.
  // Fase 2 necesita un control "+" (agregar a selección) independiente
  // dentro de la tarjeta, y HTML no permite anidar <button> dentro de
  // <button>. Por eso la tarjeta pasa a ser un <div role="button"
  // tabindex="0"> con su propio manejo de teclado (Enter/Espacio), y el
  // click delegado en el grid distingue si el clic fue sobre el botón "+"
  // o sobre el resto de la tarjeta.
  function cardHTML(servicio, indice) {
    const statusClase = servicio.disponible ? '' : 'is-soon';
    const statusTexto = servicio.disponible ? 'Disponible' : 'Próximamente';
    const retardo = Math.min(indice, 11); // limita el stagger para listas largas
    const seleccionado = estaSeleccionado(servicio.id);

    return (
      '<div class="service-card" role="button" tabindex="0" data-id="' + servicio.id + '" style="--i:' + retardo + '">' +
        '<div class="card-image" data-cat="' + servicio.categoria + '">' +
          '<span class="folio-tag">' + servicio.id + '</span>' +
          '<svg class="icon icon-big" aria-hidden="true"><use href="' + ICONS_PATH + '#icon-' + servicio.icono + '"></use></svg>' +
        '</div>' +
        '<div class="card-content">' +
          '<div class="card-body">' +
            '<div class="card-category">' + nombreCategoria(servicio.categoria) + '</div>' +
            '<h3>' + servicio.nombre + '</h3>' +
            '<p>' + servicio.descripcionCorta + '</p>' +
          '</div>' +
          '<div class="card-footer">' +
            '<span class="card-status"><span class="status-dot ' + statusClase + '"></span>' + statusTexto + '</span>' +
            '<span class="card-footer-right">' +
              '<button class="card-add-btn' + (seleccionado ? ' is-selected' : '') + '" type="button" data-id="' + servicio.id + '" aria-label="' +
                (seleccionado ? 'Quitar de mi selección' : 'Agregar a mi selección') + '" title="' +
                (seleccionado ? 'Quitar de mi selección' : 'Agregar a mi selección') + '">' +
                '<svg class="icon" aria-hidden="true"><use href="' + ICONS_PATH + '#' + (seleccionado ? 'icon-check' : 'icon-plus') + '"></use></svg>' +
              '</button>' +
              '<span class="card-cta">Ver detalle</span>' +
            '</span>' +
          '</div>' +
        '</div>' +
      '</div>'
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
      cerrarDetalle();
      irACotizadorConServicios([servicio.id]);
    };

    if (els.modalSeleccionBtn) {
      els.modalSeleccionBtn.dataset.id = servicio.id;
      actualizarBotonSeleccionModal(servicio.id);
    }

    els.modalOverlay.hidden = false;
    // Se separa en un frame aparte para que la transición CSS realmente se anime.
    requestAnimationFrame(function () {
      els.modalOverlay.classList.add('is-open');
    });
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
    if (els.modalOverlay.hidden) return;
    els.modalOverlay.classList.remove('is-open');
    document.body.style.overflow = '';
    // Espera a que termine la transición de salida antes de ocultar de verdad.
    setTimeout(function () {
      els.modalOverlay.hidden = true;
    }, 200);
  }

  // Cierra el modal (si aplica), hace scroll al cotizador y marca los
  // checkboxes de los servicios indicados en el paso 3. El grid de
  // checkboxes lo llena cotizador.js de forma independiente y asíncrona, así
  // que reintentamos brevemente por si aún no terminó de montarse. La
  // cotización en sí se crea en Supabase hasta que la persona complete el
  // formulario (nombre, correo, teléfono son obligatorios) y presione
  // "Enviar" — ver js/cotizador.js → guardarEnSupabase().
  // Acepta un arreglo de IDs porque tanto el modal de detalle (un servicio)
  // como el carrito (varios servicios a la vez) usan este mismo flujo.
  function irACotizadorConServicios(servicioIds) {
    const cotizadorSection = document.getElementById('cotizador');
    if (cotizadorSection) cotizadorSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

    let intentos = 0;
    (function marcarCheckboxes() {
      const pendientes = servicioIds.filter(function (id) {
        return !document.querySelector('#q-servicios-grid input[name="servicios"][value="' + id + '"]:checked');
      });

      const grid = document.getElementById('q-servicios-grid');
      const gridListo = grid && grid.children.length > 0;

      if (gridListo) {
        servicioIds.forEach(function (id) {
          const checkbox = document.querySelector('#q-servicios-grid input[name="servicios"][value="' + id + '"]');
          if (!checkbox) return;
          checkbox.checked = true;
          checkbox.dispatchEvent(new Event('change', { bubbles: true }));
          const pill = checkbox.closest('.checkbox-pill');
          if (pill) {
            pill.classList.add('is-preseleccionado');
            setTimeout(function () { pill.classList.remove('is-preseleccionado'); }, 2200);
          }
        });
        return;
      }

      intentos += 1;
      if (intentos < 15 && pendientes.length) setTimeout(marcarCheckboxes, 150);
    })();
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

    if (els.clientFilterChips) {
      els.clientFilterChips.addEventListener('click', function (e) {
        const chip = e.target.closest('.chip');
        if (!chip) return;
        const tipo = chip.dataset.tipo;
        // Toggle: clicar el chip ya activo lo apaga (vuelve a "todos").
        state.tipoClienteActivo = state.tipoClienteActivo === tipo ? null : tipo;
        renderClientFilter();
        renderCards();
      });
    }

    els.cardGrid.addEventListener('click', function (e) {
      const botonAgregar = e.target.closest('.card-add-btn');
      if (botonAgregar) {
        alternarSeleccion(botonAgregar.dataset.id);
        return; // no abrir el detalle al usar el botón "+"
      }
      const tarjeta = e.target.closest('.service-card');
      if (!tarjeta) return;
      abrirDetalle(tarjeta.dataset.id);
    });

    // La tarjeta ya no es un <button> (ver nota en cardHTML), así que se
    // encarga ella misma de responder a Enter/Espacio como lo haría un botón.
    els.cardGrid.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const tarjeta = e.target.closest('.service-card');
      if (!tarjeta || e.target.closest('.card-add-btn')) return;
      e.preventDefault();
      abrirDetalle(tarjeta.dataset.id);
    });

    els.modalClose.addEventListener('click', cerrarDetalle);
    els.modalCerrarBtn.addEventListener('click', cerrarDetalle);

    if (els.modalSeleccionBtn) {
      els.modalSeleccionBtn.addEventListener('click', function () {
        alternarSeleccion(els.modalSeleccionBtn.dataset.id);
      });
    }

    els.modalOverlay.addEventListener('click', function (e) {
      if (e.target === els.modalOverlay) cerrarDetalle();
    });

    if (els.selectionFloat) {
      els.selectionFloat.addEventListener('click', abrirPanelSeleccion);
    }
    if (els.selectionPanelClose) {
      els.selectionPanelClose.addEventListener('click', cerrarPanelSeleccion);
    }
    if (els.selectionPanelOverlay) {
      els.selectionPanelOverlay.addEventListener('click', function (e) {
        if (e.target === els.selectionPanelOverlay) cerrarPanelSeleccion();
      });
    }
    if (els.selectionPanelBody) {
      els.selectionPanelBody.addEventListener('click', function (e) {
        const boton = e.target.closest('[data-remove]');
        if (!boton) return;
        quitarDeSeleccion(boton.dataset.remove);
      });
    }
    if (els.selectionVaciarBtn) {
      els.selectionVaciarBtn.addEventListener('click', vaciarSeleccion);
    }
    if (els.selectionCotizarBtn) {
      els.selectionCotizarBtn.addEventListener('click', function () {
        const disponibles = state.seleccion.filter(function (id) {
          const s = state.servicios.find(function (item) { return item.id === id; });
          return s && s.disponible;
        });
        if (!disponibles.length) return;
        cerrarPanelSeleccion();
        irACotizadorConServicios(disponibles);
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      if (els.selectionPanelOverlay && !els.selectionPanelOverlay.hidden) {
        cerrarPanelSeleccion();
        return;
      }
      if (!els.modalOverlay.hidden) cerrarDetalle();
    });
  }

  document.addEventListener('DOMContentLoaded', iniciar);
})();

/**
 * ============================================================
 *  COTIZADOR.JS — Cotizador Inteligente IM (im-catalogo, Etapa C)
 * ============================================================
 *  Adaptado de im-catalogo-inteligente/js/cotizador.js con dos
 *  cambios de fondo, pedidos explícitamente para esta integración:
 *
 *   1. Los "servicios de interés" ya NO son texto libre: se cargan
 *      desde data/services.json y se guardan por su id real
 *      (ej. "IM-001"), para poder cruzarlos después con el catálogo,
 *      el Portal de Clientes y reportes.
 *
 *   2. El folio YA NO se genera en el navegador (localStorage), sino
 *      en Supabase (columna `folio`, calculada con una función de
 *      Postgres sobre una secuencia atómica — ver
 *      supabase/001_cotizaciones.sql). Esto elimina el riesgo de
 *      folios duplicados entre visitantes distintos que el propio
 *      código original ya señalaba como limitación conocida.
 *
 *  Sigue el mismo patrón defensivo que js/app.js: cada función
 *  revisa que su elemento exista antes de usarlo, y el módulo entero
 *  no hace nada si el formulario del cotizador no está en el DOM.
 *
 *  Envío: Supabase es el canal principal (persistencia + folio).
 *  FormSubmit se dispara en paralelo como respaldo por correo; si
 *  falla, no afecta el resultado mostrado al usuario porque el dato
 *  que importa (la cotización) ya quedó guardado en Supabase.
 * ============================================================
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', iniciarCotizador);

  async function iniciarCotizador() {
    const form = document.getElementById('cotizadorForm');
    if (!form) return; // esta página no tiene cotizador en el DOM

    const totalPasos = 4;
    let pasoActual = 1;
    let config = null;
    let servicios = [];

    const els = {
      steps: Array.from(form.querySelectorAll('.cotizador-step')),
      progressBar: document.getElementById('cotizadorProgressBar'),
      progressWrap: document.getElementById('cotizadorProgressWrap'),
      stepDots: Array.from(document.querySelectorAll('.step-dot')),
      serviciosGrid: document.getElementById('q-servicios-grid'),
      resumen: document.getElementById('q-resumen'),
      enviando: document.getElementById('cotizadorEnviando'),
      exito: document.getElementById('cotizadorExito'),
      error: document.getElementById('cotizadorError'),
      folioNumero: document.getElementById('folioNumero'),
      waFolio: document.getElementById('q-whatsappFolio'),
      waError: document.getElementById('q-whatsappError')
    };

    // ---------- Carga de datos (config + catálogo real) ----------
    try {
      const [configResp, serviciosResp] = await Promise.all([
        fetch('config/config.json', { cache: 'no-cache' }),
        fetch('data/services.json', { cache: 'no-cache' })
      ]);
      config = await configResp.json();
      const catalogo = await serviciosResp.json();
      servicios = (catalogo.servicios || []).filter(function (s) { return s.disponible; });
    } catch (error) {
      console.error('[IM] No se pudo cargar la configuración o el catálogo para el cotizador:', error);
      return;
    }

    llenarCheckboxesServicios(servicios);

    // ---------- Navegación entre pasos ----------
    function mostrarPaso(n) {
      els.steps.forEach(function (s) {
        s.hidden = Number(s.dataset.step) !== n;
      });
      els.stepDots.forEach(function (dot, i) {
        dot.classList.toggle('active', i < n);
      });
      if (els.progressBar) els.progressBar.style.width = (n / totalPasos * 100) + '%';
      if (els.progressWrap) els.progressWrap.setAttribute('aria-valuenow', String(n));
      if (n === totalPasos) construirResumen();
      pasoActual = n;
    }

    form.addEventListener('click', function (e) {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;

      if (btn.dataset.action === 'next') {
        if (!validarPaso(pasoActual)) return;
        mostrarPaso(Math.min(pasoActual + 1, totalPasos));
      }
      if (btn.dataset.action === 'prev') {
        mostrarPaso(Math.max(pasoActual - 1, 1));
      }
    });

    function validarPaso(n) {
      const stepEl = els.steps.find(function (s) { return Number(s.dataset.step) === n; });
      if (!stepEl) return true;
      const requeridos = Array.from(stepEl.querySelectorAll('[required]'));
      let ok = true;
      requeridos.forEach(function (campo) {
        if (!campo.value || !campo.value.trim()) {
          campo.reportValidity();
          ok = false;
        }
      });
      return ok;
    }

    function llenarCheckboxesServicios(lista) {
      if (!els.serviciosGrid) return;
      els.serviciosGrid.innerHTML = lista.map(function (s) {
        return (
          '<label class="checkbox-pill">' +
            '<input type="checkbox" name="servicios" value="' + s.id + '" data-nombre="' + escaparHtml(s.nombre) + '">' +
            '<span>' + escaparHtml(s.nombre) + '</span>' +
          '</label>'
        );
      }).join('');
    }

    function serviciosSeleccionados() {
      return Array.from(form.querySelectorAll('input[name="servicios"]:checked'));
    }

    function escaparHtml(str) {
      const d = document.createElement('div');
      d.textContent = str == null ? '' : str;
      return d.innerHTML;
    }

    function construirResumen() {
      if (!els.resumen) return;
      const data = new FormData(form);
      const nombresServicios = serviciosSeleccionados().map(function (input) {
        return input.dataset.nombre || input.value;
      });

      els.resumen.innerHTML =
        '<dl class="resumen-list">' +
          '<div><dt>Nombre</dt><dd>' + escaparHtml(data.get('nombre') || '—') + '</dd></div>' +
          '<div><dt>Empresa</dt><dd>' + escaparHtml(data.get('empresa') || '—') + '</dd></div>' +
          '<div><dt>Correo</dt><dd>' + escaparHtml(data.get('correo') || '—') + '</dd></div>' +
          '<div><dt>Teléfono</dt><dd>' + escaparHtml(data.get('telefono') || '—') + '</dd></div>' +
          '<div><dt>Ciudad / Estado</dt><dd>' + escaparHtml(data.get('ciudad') || '—') + ', ' + escaparHtml(data.get('estado') || '—') + '</dd></div>' +
          '<div><dt>Tipo de contribuyente</dt><dd>' + escaparHtml(data.get('tipoContribuyente') || '—') + '</dd></div>' +
          '<div><dt>Tamaño de operación</dt><dd>' + escaparHtml(data.get('tamanoOperacion') || '—') + '</dd></div>' +
          '<div><dt>Servicios de interés</dt><dd>' + (nombresServicios.length ? nombresServicios.map(escaparHtml).join(', ') : '—') + '</dd></div>' +
          '<div><dt>Presupuesto estimado</dt><dd>' + escaparHtml(data.get('presupuesto') || '—') + '</dd></div>' +
          '<div class="full"><dt>Comentarios</dt><dd>' + escaparHtml(data.get('comentarios') || '—') + '</dd></div>' +
        '</dl>';
    }

    // ---------- Envío ----------
    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const data = new FormData(form);
      const serviciosIds = serviciosSeleccionados().map(function (input) { return input.value; });
      const serviciosNombres = serviciosSeleccionados().map(function (input) { return input.dataset.nombre || input.value; });

      const registro = {
        nombre: data.get('nombre') || '',
        empresa: data.get('empresa') || '',
        rfc: data.get('rfc') || '',
        correo: data.get('correo') || '',
        telefono: data.get('telefono') || '',
        ciudad: data.get('ciudad') || '',
        estado: data.get('estado') || '',
        tipo_contribuyente: data.get('tipoContribuyente') || '',
        tamano_operacion: data.get('tamanoOperacion') || '',
        servicios_ids: serviciosIds,
        presupuesto: data.get('presupuesto') || '',
        comentarios: data.get('comentarios') || ''
      };

      mostrarEstado('enviando');

      try {
        const folio = await guardarEnSupabase(registro);

        // Respaldo por correo: best-effort, no bloquea el resultado ya guardado.
        enviarCorreoRespaldo(config, Object.assign({ folio: folio, servicios: serviciosNombres.join(', ') }, registro))
          .catch(function (err) { console.warn('[IM] Respaldo por correo no se pudo enviar:', err); });

        mostrarFolio(config, folio, Object.assign({ servicios: serviciosNombres.join(', ') }, registro));
        mostrarEstado('exito');
      } catch (err) {
        console.error('[IM] Error al guardar la cotización en Supabase:', err);
        prepararWhatsappError(config, Object.assign({ servicios: serviciosNombres.join(', ') }, registro));
        mostrarEstado('error');
      }
    });

    async function guardarEnSupabase(registro) {
      if (!window.IM_SUPABASE) {
        throw new Error('Supabase no está configurado (revisa config/supabase-config.js).');
      }
      const { data: fila, error } = await window.IM_SUPABASE
        .from('cotizaciones')
        .insert(registro)
        .select('folio')
        .single();

      if (error) throw error;
      return fila.folio;
    }

    async function enviarCorreoRespaldo(cfg, payload) {
      const endpoint = cfg && cfg.envioFormulario && cfg.envioFormulario.formsubmit && cfg.envioFormulario.formsubmit.endpoint;
      if (!endpoint) return; // sin endpoint configurado, se omite en silencio

      const body = Object.assign({}, payload, {
        _subject: 'Nueva solicitud de cotización — Folio ' + (payload.folio || 'pendiente'),
        _cc: payload.correo,
        _template: 'table'
      });

      const resp = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(body)
      });
      if (!resp.ok) throw new Error('FormSubmit respondió ' + resp.status);
    }

    function mostrarEstado(estado) {
      form.hidden = estado !== 'form';
      if (els.enviando) els.enviando.hidden = estado !== 'enviando';
      if (els.exito) els.exito.hidden = estado !== 'exito';
      if (els.error) els.error.hidden = estado !== 'error';
    }

    function mostrarFolio(cfg, folio, payload) {
      if (els.folioNumero) els.folioNumero.textContent = folio;
      if (els.waFolio && cfg && cfg.contacto) {
        const mensaje = 'Hola, soy ' + payload.nombre + '. Acabo de solicitar una cotización en el catálogo. Mi folio es ' + folio + '.';
        els.waFolio.href = buildWhatsappLink(cfg.contacto.whatsappNumero, mensaje);
      }
    }

    function prepararWhatsappError(cfg, payload) {
      if (els.waError && cfg && cfg.contacto) {
        const mensaje = 'Hola, soy ' + payload.nombre + '. Intenté llenar el cotizador del catálogo pero no se pudo enviar. Me interesa: ' + (payload.servicios || 'sus servicios') + '.';
        els.waError.href = buildWhatsappLink(cfg.contacto.whatsappNumero, mensaje);
      }
    }

    function buildWhatsappLink(numero, mensaje) {
      return 'https://wa.me/' + numero + '?text=' + encodeURIComponent(mensaje);
    }

    // Inicializar en paso 1
    mostrarPaso(1);
  }
})();

/**
 * ============================================================
 *  SUPABASE-CLIENT.JS — Cliente Supabase compartido
 * ============================================================
 *  Responsabilidad única: crear UNA instancia del cliente Supabase
 *  y exponerla en window.IM_SUPABASE para que la reutilicen
 *  cotizador.js hoy, y en el futuro el Portal de Clientes o el
 *  panel administrativo, sin duplicar credenciales en cada módulo.
 *
 *  Depende de:
 *   - El SDK de Supabase cargado antes que este archivo (ver index.html)
 *   - config/supabase-config.js cargado antes que este archivo
 * ============================================================
 */

(function () {
  'use strict';

  if (typeof window.supabase === 'undefined' || typeof window.supabase.createClient !== 'function') {
    console.error('[IM] El SDK de Supabase no está disponible. Revisa el <script> de @supabase/supabase-js en index.html.');
    return;
  }

  var url = window.IM_SUPABASE_URL;
  var anonKey = window.IM_SUPABASE_ANON_KEY;

  if (!url || !anonKey || url.indexOf('TU-PROYECTO') !== -1 || anonKey.indexOf('TU-ANON-KEY') !== -1) {
    console.warn('[IM] Supabase no está configurado todavía: edita config/supabase-config.js con tus credenciales reales. El cotizador seguirá funcionando en modo "solo WhatsApp/correo" mientras tanto.');
  }

  window.IM_SUPABASE = window.supabase.createClient(url, anonKey);
})();

/**
 * ============================================================
 *  SUPABASE-CONFIG.JS — Credenciales públicas de Supabase
 * ============================================================
 *  Reemplaza los dos valores de abajo con los de tu proyecto:
 *  Supabase → Project Settings → API.
 *
 *  IMPORTANTE: el "anon key" está diseñado para exponerse en el
 *  cliente (por eso vive en un archivo JS público, igual que en
 *  cualquier app estática). La seguridad real la dan las políticas
 *  RLS de la tabla `cotizaciones` (ver supabase/001_cotizaciones.sql),
 *  que solo permiten INSERT público, nunca SELECT/UPDATE/DELETE.
 *
 *  Nunca pongas aquí el "service_role key" — ese nunca debe llegar
 *  al navegador.
 * ============================================================
 */

window.IM_SUPABASE_URL = 'https://dpuhosakxhxbhjpqahas.supabase.co';
window.IM_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwdWhvc2FreGh4YmhqcHFhaGFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM1Mzg3NzIsImV4cCI6MjA5OTExNDc3Mn0.liasIVX7IoTBkm8tyVRl0TKGQFki17yHIhKX2W6E-RE';

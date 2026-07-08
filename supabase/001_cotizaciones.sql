-- ============================================================
--  001_cotizaciones.sql — IM Catálogo, Cotizador Inteligente
-- ============================================================
--  Ejecutar completo en: Supabase → SQL Editor → New query.
--
--  Diseño clave: el folio se genera DENTRO de Postgres con una
--  secuencia (nextval), que es atómica entre todas las conexiones
--  concurrentes. Esto evita el problema que tenía la versión
--  anterior (folio generado en localStorage del navegador), donde
--  dos visitantes distintos podían terminar con el mismo folio.
-- ============================================================

-- 1. Secuencia que respalda el consecutivo del folio
create sequence if not exists cotizaciones_folio_seq;

-- 2. Función que arma el folio: IM-AAAAMMDD-0001
create or replace function generar_folio_cotizacion()
returns text
language plpgsql
as $$
declare
  consecutivo int;
begin
  consecutivo := nextval('cotizaciones_folio_seq');
  return 'IM-' || to_char(now(), 'YYYYMMDD') || '-' || lpad(consecutivo::text, 4, '0');
end;
$$;

-- 3. Tabla principal
create table if not exists cotizaciones (
  id uuid primary key default gen_random_uuid(),
  folio text unique not null default generar_folio_cotizacion(),
  nombre text not null,
  empresa text,
  rfc text,
  correo text not null,
  telefono text not null,
  ciudad text,
  estado text,
  tipo_contribuyente text,
  tamano_operacion text,
  servicios_ids text[],        -- ids reales del catálogo, ej. ['IM-001','IM-004']
  presupuesto text,
  comentarios text,
  atendido boolean not null default false,   -- para uso futuro del panel administrativo
  created_at timestamptz not null default now()
);

create index if not exists idx_cotizaciones_created_at on cotizaciones (created_at desc);

-- 4. Seguridad (RLS): el sitio es público y estático, así que la
--    tabla debe aceptar INSERT de cualquiera (con la anon key), pero
--    NUNCA debe permitir leer, editar ni borrar cotizaciones ajenas.
--    La lectura quedará reservada al futuro panel administrativo,
--    que usará una autenticación propia (no la anon key pública).
alter table cotizaciones enable row level security;

drop policy if exists "Permitir insertar cotizaciones" on cotizaciones;
create policy "Permitir insertar cotizaciones"
  on cotizaciones
  for insert
  to anon
  with check (true);

-- Nota: no se crea política de SELECT/UPDATE/DELETE para "anon" a
-- propósito. Sin una política que lo permita explícitamente, RLS
-- bloquea esas operaciones por defecto.

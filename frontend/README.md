# Catálogo de Videojuegos - Next.js & Supabase

Landing page moderna desarrollada como actividad evaluada, implementando competencias en la construcción de aplicaciones web con Next.js (App Router) y gestión de datos mediante una base de datos serverless en Supabase.

## Descripción del Proyecto
La aplicación es un catálogo interactivo de videojuegos que consume datos en tiempo real desde Supabase mediante Server Components. Cuenta con un diseño responsive, estados de carga optimizados y rutas dinámicas basadas en slugs (`/juegos/[slug]`), permitiendo visualizar el detalle individual de cada título de manera eficiente utilizando una sola plantilla dinámica.

## Tecnologías Utilizadas
* **Next.js (App Router):** Framework de React para renderizado en servidor y enrutamiento dinámico.
* **Supabase:** Backend como servicio (BaaS) basado en PostgreSQL con políticas de seguridad RLS habilitadas.
* **Tailwind CSS:** Framework de estilos para un diseño moderno y responsive.
* **Vercel:** Plataforma cloud para el despliegue continuo en producción.

## Instrucciones de Instalación Local
1. Clona el repositorio e instala dependencias (`npm install`).
2. Configura tu archivo `.env.local` con las credenciales de Supabase:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase_aqui
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_de_supabase_aqui
3. Ejecuta el servidor de desarrollo local con: npm run dev
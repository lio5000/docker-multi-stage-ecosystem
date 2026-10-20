# Ingeniería de Imágenes Eficientes: Refactorización Multi-Stage y Optimización de Capas en Docker

Este repositorio contiene la solución completa para la contenerización y optimización de un ecosistema de producción compuesto por tres servicios principales: **Frontend en Next.js 16**, **API REST Backend en Laravel (PHP-FPM con Nginx)** y **Base de Datos MySQL 8.0**.

El objetivo principal del proyecto es aplicar buenas prácticas de DevOps para lograr imágenes Docker ultraligeras, seguras, reproducibles y eficientes en la gestión de caché por capas.

---

## Arquitectura del Ecosistema

El ecosistema se encuentra orquestado mediante **Docker Compose** y aislado en dos redes virtuales independientes (`frontend_net` y `backend_net`) para aislar el tráfico de red por capas de seguridad:

```text
[ Cliente / Navegador ]
         │
         ├──► Port 3000: Servicio Frontend (Next.js 16 Standalone)
         │
         └──► Port 8000: Proxy Inverso (Nginx) ──► Servicio Backend (Laravel PHP-FPM 9000)
                                                                 │
                                                                 └──► Base de Datos (MySQL 8.0)
```

### Componentes:

1. **Frontend (`ecosystem_frontend`):** Next.js 16 corriendo en Node 20-Alpine sobre el puerto `3000`.
2. **Proxy Inverso (`ecosystem_nginx`):** Nginx Alpine exponiendo la API en el puerto `8000`.
3. **Backend (`ecosystem_backend`):** API REST Laravel sobre PHP 8.2-FPM Alpine (comunicación interna FastCGI en puerto `9000`).
4. **Base de Datos (`ecosystem_mysql`):** MySQL 8.0 aislado en la red interna sobre puerto `3306` con volumen de persistencia de datos.

---

## Decisiones Técnicas y Optimización Multi-Stage

### 1. Backend — Laravel API (`backend/Dockerfile`)

- **Multi-Stage Build:** Se separó la instalación de paquetes en la etapa `builder` utilizando `composer:2.7`, instalando únicamente dependencias de producción (`composer install --no-dev`).
- **Runtime Liviano:** Se utilizó `php:8.2-fpm-alpine` para la imagen final, copiando únicamente la carpeta compilada de la aplicación y la carpeta `vendor/`.
- **Seguridad y Permisos:** Se configuraron permisos estrictos (`www-data`) exclusivamente en los directorios escribibles (`storage` y `bootstrap/cache`).

### 2. Frontend — Next.js 16 (`frontend/Dockerfile`)

- **Estrategia Standalone:** Se habilitó `output: 'standalone'` en `next.config.ts`, reduciendo drásticamente el peso de la imagen al omitir la carpeta completa de `node_modules` en producción.
- **3-Stage Build (`deps` -> `builder` -> `runner`):**
  1. `deps`: Instala dependencias con `npm ci` sobre Alpine.
  2. `builder`: Ejecuta la compilación de Next.js (`next build`).
  3. `runner`: Copia únicamente los archivos necesarios (`.next/standalone`, `.next/static` y `public`).
- **Principio de Menor Privilegio:** Se creó un usuario sin privilegios de root (`nextjs:nodejs`) para ejecutar la aplicación en el contenedor.

### 3. Redes y Seguridad en Docker Compose

- **Segmentación de Redes:**
  - `frontend_net`: Comunicación entre el Frontend y el Proxy Nginx.
  - `backend_net`: Comunicación aislada entre Nginx, Laravel y MySQL. La base de datos no expone puertos al host público.
- **Healthchecks & Resilience:** MySQL incluye verificación de salud (`mysqladmin ping`) para asegurar que el Backend espere a que la base de datos esté lista antes de arrancar.

---

## Instrucciones de Ejecución

### Prerrequisitos

- Docker Desktop 4.x o superior instalado y ejecutándose.
- Git.

### Pasos para desplegar la aplicación

1. **Clonar el repositorio:**

   ```bash
   git clone [https://github.com/TU_USUARIO/docker-multi-stage-ecosystem.git](https://github.com/TU_USUARIO/docker-multi-stage-ecosystem.git)
   cd docker-multi-stage-ecosystem
   ```

2. **Configurar las variables de entorno:**
   Crea un archivo `.env` en la raíz tomando como base `.env.example`:

   ```bash
   cp .env.example .env
   ```

3. **Construir y levantar todo el ecosistema:**

   ```bash
   docker compose up -d --build
   ```

4. **Verificar el estado de los contenedores:**

   ```bash
   docker compose ps
   ```

5. **Acceso a los servicios:**
   - **Frontend (Next.js):** [http://localhost:3000](http://localhost:3000)
   - **Backend API (Laravel via Nginx):** [http://localhost:8000](http://localhost:8000)

6. **Detener el ecosistema:**
   ```bash
   docker compose down
   ```

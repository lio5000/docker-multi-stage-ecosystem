# =========================================================
# STAGE 1: Builder (Instalación de dependencias con Composer)
# =========================================================
FROM composer:2.7 AS builder

WORKDIR /app

# Copiar archivos de dependencias primero para aprovechar la caché de capas
COPY composer.json composer.lock ./

# Instalar dependencias de producción
RUN composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader --no-scripts

# Copiar el resto del código fuente del backend
COPY . .

# Generar autoloader final
RUN composer dump-autoload --optimize

# =========================================================
# STAGE 2: Production Runtime (PHP-FPM en Alpine)
# =========================================================
FROM php:8.2-fpm-alpine

# Instalar paquetes del sistema y extensiones PHP necesarias
RUN apk add --no-cache \
    libpng-dev \
    libxml2-dev \
    libzip-dev \
    oniguruma-dev \
    openssl-dev \
    zip \
    unzip \
    curl \
    && docker-php-ext-install \
    pdo_mysql \
    mbstring \
    xml \
    ctype \
    bcmath \
    gd \
    zip

WORKDIR /var/www/html

# Copiar el proyecto con las dependencias desde el Stage 1
COPY --from=builder /app /var/www/html

# Configurar permisos para permisos de almacenamiento de Laravel
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

EXPOSE 9000

CMD ["php-fpm"]
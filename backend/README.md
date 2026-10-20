# API RESTful - Restaurante "La Buena Mesa"

Backend centralizado desarrollado con **Laravel 12** y **Eloquent ORM** bajo principios de arquitectura limpia para la gestión en tiempo real del menú gastronómico.

---

## Instrucciones de Instalación

1. Clonar el repositorio:
    ```bash
    git clone [https://github.com/lio5000/apibuenamesa.git](https://github.com/lio5000/apibuenamesa.git)
    cd la-buena-mesa-api
    ```

````

2. Instalar dependencias de PHP vía Composer:

```bash
composer install
````

3. Configurar el archivo de entorno:

```bash
cp .env.example .env
php artisan key:generate
```

4. Configurar las credenciales de base de datos en el archivo `.env` y ejecutar las
   migraciones:

```bash
php artisan migrate
```

5. Iniciar el servidor de desarrollo local:

```bash
php artisan serve
```

---

## Documentación de Endpoints

| Método | Endpoint | Descripción |
| :----- | :------- | :---------- |

| `GET` | `/api/menu-items` | Lista todos los elementos del menú. |
| `GET` | `/api/menu-items/{id}` | Muestra el detalle de un platillo específico. |
| `POST` | `/api/menu-items` | Crea un nuevo elemento en el menú. |
| `PUT / PATCH` | `/api/menu-items/{id}` | Actualiza parcialmente o totalmente un platillo. |
| `DELETE` | `/api/menu-items/{id}` | Elimina un platillo del sistema. |
| `GET` | `/api/menu-items?category=Italiana` | Filtra los elementos del menú por categoría
mediante query params. |

---

## Ejemplos de Uso

### 1. Crear un Platillo (`POST /api/menu-items`)

**Request Body (JSON):**

```json
{
    "name": "Pizza Margarita",
    "description": "Pizza artesanal con albahaca y queso fresco",
    "price": 12.5,
    "category": "Italiana"
}
```

**Response (`201 Created`):**

```json
{
    "data": {
        "id": 1,
        "name": "Pizza Margarita",
        "description": "Pizza artesanal con albahaca y queso fresco",
        "price": 12.5,
        "category": "Italiana",
        "is_available": true,
        "created_at": "2026-08-15T03:43:43+00:00"
    },
    "message": "Platillo creado exitosamente"
}
```

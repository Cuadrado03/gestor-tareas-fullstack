# Gestor de Tareas — Prueba Técnica Full Stack

Aplicación full-stack para crear, visualizar, editar y eliminar tareas, construida con Angular y Node.js + Express.

## Descripción del proyecto

Esta aplicación permite gestionar tareas con distintos estados (pendiente, en progreso, completada). El objetivo de la prueba es demostrar buenas prácticas de arquitectura, validación de datos, manejo robusto de errores y separación de responsabilidades tanto en el backend como en el frontend.

## Tecnologías utilizadas

**Backend:** Node.js, Express 4, uuid (generación de ids), dotenv (variables de entorno), cors
**Frontend:** Angular 19 (standalone components), TypeScript, RxJS, Formularios Reactivos, SCSS

## Estructura del proyecto
task-manager/
├── backend/
│ └── src/
│ ├── controllers/ # Maneja req/res, delega en services
│ ├── services/ # Lógica de negocio + almacenamiento en memoria
│ ├── models/ # Validaciones y forma de los datos
│ ├── middleware/ # Manejo centralizado de errores
│ └── routes/ # Definición de endpoints
└── frontend/
└── src/app/
├── models/ # Interfaces TypeScript
├── services/ # TaskService (HTTP)
└── components/
├── task-list/ # Smart component (orquesta todo)
├── task-form-modal/ # Formulario reactivo crear/editar
└── confirm-dialog/ # Confirmación antes de eliminar

## Instalación

### Backend
```bash
cd backend
npm install
```

### Frontend
```bash
cd frontend
npm install
```

## Ejecución en desarrollo

**Terminal 1 — Backend** (puerto 3000):
```bash
cd backend
node src/server.js
```

**Terminal 2 — Frontend** (puerto 4200):
```bash
cd frontend
ng serve
```

Abrir `http://localhost:4200`

## Arquitectura

### Backend

El backend sigue el patrón **Controller → Service → Model**:

- **Routes** definen qué endpoint dispara qué función del controller, sin lógica propia.
- **Controllers** reciben el request, llaman al service correspondiente, y arman la respuesta HTTP (status code y JSON). No contienen lógica de negocio.
- **Services** contienen la lógica real: validar datos, crear, buscar, actualizar y eliminar tareas. Aquí vive el arreglo en memoria que actúa como base de datos.
- **Models** definen las reglas de validación de una tarea (título obligatorio, longitud máxima, estados permitidos).

El manejo de errores está centralizado: en lugar de que cada controller decida qué código HTTP devolver, los services lanzan errores con una propiedad `statusCode`, y un único middleware (`errorHandler`) los captura y arma la respuesta de error de forma consistente en toda la API.

### Frontend

El frontend sigue el patrón **smart/dumb components**:

- **`TaskListComponent`** es el componente "inteligente" (smart): es el único que inyecta `TaskService` y habla con la API. Mantiene el estado de la pantalla (lista de tareas, loading, qué modal está abierto) y orquesta todas las operaciones CRUD.
- **`TaskFormModalComponent`** y **`ConfirmDialogComponent`** son componentes "tontos" (dumb): reciben datos por `@Input()` (por ejemplo, si están abiertos o qué tarea están editando) y comunican interacciones al padre mediante `@Output()` con `EventEmitter` (por ejemplo, "el usuario confirmó guardar" o "el usuario canceló"). No conocen el `TaskService` ni hacen llamadas HTTP directamente — esto los hace reutilizables y más fáciles de probar de forma aislada.

### Comunicación Backend ↔ Frontend

`TaskService` en Angular usa `HttpClient` para hacer peticiones GET/POST/PUT/DELETE a la API REST (`http://localhost:3000/api/tasks`). El backend tiene habilitado `cors` para aceptar peticiones desde el origen del frontend (`http://localhost:4200`), ya que corren en puertos distintos.

## Decisiones técnicas

- **Base de datos en memoria**: se eligió sobre SQLite para evitar dependencias nativas de compilación y simplificar la ejecución en cualquier entorno. La lógica de acceso a datos vive aislada en la capa de `services`, por lo que migrar a una base de datos real en el futuro solo requeriría modificar ese archivo, sin tocar controllers ni rutas.
- **Standalone components en Angular**: se optó por no usar NgModules, siguiendo el enfoque moderno recomendado por Angular, lo que simplifica las dependencias entre componentes.
- **Separación smart/dumb components**: mantiene un único punto de contacto con el backend (`TaskListComponent`), evitando que la lógica de llamadas HTTP se disperse por varios componentes.
- **Manejo de errores con `statusCode` en el backend**: permite que el service se mantenga "puro" (sin conocer nada de Express/HTTP), delegando la traducción a código de estado HTTP al middleware central.

## Funcionalidades implementadas

- CRUD completo de tareas (crear, listar, editar, eliminar)
- Validaciones en backend (campos obligatorios, longitudes máximas, estado válido) y en frontend (formulario reactivo con validadores)
- Códigos de estado HTTP apropiados (200, 201, 400, 404, 500)
- Manejo de errores robusto (try/catch + middleware centralizado en backend, manejo de errores en las suscripciones HTTP en frontend)
- Confirmación antes de eliminar una tarea
- Cambio de estado de tarea (Pendiente → En progreso → Completada)


## Mejoras futuras

- Migrar la persistencia de memoria a una base de datos real (SQLite o PostgreSQL), manteniendo la misma interfaz en la capa de services.
- Agregar tests unitarios (Jest en backend, Angular Testing en frontend).
- Agregar autenticación básica.
- Agregar filtros y búsqueda en el listado de tareas.
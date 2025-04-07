## IOT Proyecto: Weather App

Este proyecto es una aplicación para monitorear sensores meteorológicos y gestionar parcelas agrícolas. Está compuesto por un frontend desarrollado con React y TypeScript, y un backend construido con Node.js y Express.

## Requisitos previos

Antes de comenzar, asegúrate de tener instalados los siguientes programas:

- [Node.js](https://nodejs.org/) (versión 16 o superior)
- [npm](https://www.npmjs.com/)
- [MySQL](https://www.mysql.com/) (para la base de datos)

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/weatherApp.git

cd weatherApp
```

### 2. Configuración del backend

1. Ve hacia el directorio del backend
```bash
cd backend
```
2. Instalación de las dependencias
```bash
npm install
```
3. Configura las variables de entorno:
   
    Crea un archivo .env en el directorio backend con el siguiente contenido:
```bash
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=weatherApp
JWT_SECRET=tu_secreto
```
4. Ejecuta las migraciones para crear las tablas en la base de datos:
```bash
npm run migrate
```
5. Inicia el servidor:
```bash
npm run dev
```
El backend estará disponible en `http://localhost:5000/api-docs/`

### 3. Configuración del frontend
1. Abre otra terminal y dirigete al directorio del frontend
```bash
cd frontend
```
1. Instalación de las dependencias
```bash
npm install
```
1. Inicia el servidor de desarrollo
```bash
npm run dev
```
El frontend estará disponible en `http://localhost:5173`

### Uso
1. Accede al frontend en tu navegador en `http://localhost:5173`.

2. Asegúrate de que el backend esté corriendo en `http://localhost:5000/api-docs/`.


### Documentación de la API
La documentación de la API está disponible en `http://localhost:5000/api-docs/` utilizando Swagger
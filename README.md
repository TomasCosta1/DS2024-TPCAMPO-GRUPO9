# Sistema de Gestión de Requerimientos e Incidencias
Este proyecto forma parte del desarrollo colaborativo de un sistema donde cada equipo se encarga de distintas funcionalidades. Nuestro grupo está trabajando en la Gestión de Usuarios externos, el Alta de Requerimientos para usuarios externos, la Visualización de Solicitudes y el detalle de los requerimientos para estos usuarios.

## Requisitos previos 
Antes de comenzar, asegurate de tener instalados los siguientes programas en tu computadora: 
- [Node.js](https://nodejs.org/) (versión 14.x o superior) 
- [Git](https://git-scm.com/) 

## Instalación del proyecto 

1. **Clonar el repositorio:** Primero, debes clonar el repositorio en tu máquina local. En tu terminal, ejecuta el siguiente comando: ```git clone https://github.com/TomasCosta1/DS2024-TPCAMPO-GRUPO9 ``` 
2. **Moverte a la carpeta del proyecto:** ```cd DS2024-TPCAMPO-GRUPO9 ``` 
3. **Crear una rama para tu trabajo:** Cada miembro del equipo debe crear una rama para trabajar en su historia de usuario. Usa el siguiente comando para crear y moverte a tu propia rama: ```git checkout -b nombre-de-tu-rama ``` Ejemplo: ```git checkout -b feature/listado-productos ``` 
4. **Instalar dependencias del backend:** Mueve a la carpeta del backend y ejecuta el siguiente comando para instalar todas las dependencias necesarias: ```cd backend npm install ``` 
5. **Instalar dependencias del frontend:** Mueve a la carpeta del frontend y ejecuta el siguiente comando para instalar las dependencias del frontend: ```cd ../frontend npm install ``` 

## Ejecutar la aplicación 

### 1. **Correr el backend:** 
Primero, abre una terminal en la carpeta `backend` y ejecuta el siguiente comando para iniciar el servidor del backend (asegúrate de que el puerto configurado sea el 3000): ```npm start ``` 
### 2. **Correr el frontend:** 
En otra terminal, ve a la carpeta `frontend` y ejecuta el siguiente comando para iniciar la aplicación de React: ```npm start ``` Esto debería abrir la aplicación en tu navegador en `http://localhost:3001`. 
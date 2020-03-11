# API GATEWAY

##  Acerca de y objetivo :scroll:
Proporciona un único punto de entrada para las peticiones del frontend, actúa como un switch que redirecciona las peticiones a los distintos microservicios. 
Esta basado en el frontend ngx-admin.

##  Configuración inicial :wrench:
Prerequisitos: es necesario contar con node y sus dependencias
`npm i`

## Ejecución y despliegue :hammer:
### Ejecución
Para ejecutar el proyecto es necesario configurar las variables de entorno. En caso de no contar con todas las variables, hay que deshabilitar las rutas correspondientes.

El archivo de arranque es `server.js`

### Despliegue
Se despliega con docker
`docker-compose up`

## Referencias :books:
[GULP](https://www.npmjs.com/package/gulp)
[PM2](https://www.npmjs.com/package/pm2)
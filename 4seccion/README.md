# 02 Bases de Node

Correr en Dev `npm run dev`


## Configuracion de TS en Node
Se tiene una configuracion basica para usar TS con Node.

> [!WARNING]  
> Al construir la APP se compilan los archivos TS a la carpeta Dist, si se hace un archivo en otra extension se necesita usar una herramienta de construcción como Gulp o Grunt o un paquete para copiar dichos archivos como cpx


## Package json
```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon",   // Iniciar la app de desarrollo
    // Construir la app de producción
    "build": "rimraf ./dist && tsc",    // (rimraf sirve igual que `rm -f`) borrar dist y volver a compilar el codigo    
    "start": "npm run build && node dist/app.js"    // Iniciar la app de producción
},
```
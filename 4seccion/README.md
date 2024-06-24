# 02 Bases de Node

Correr en Dev `npm run dev`


## Package json
```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon",   // Iniciar la app de desarrollo
    // Construir la app de producción
    "build": "rimraf ./dist && tsc",    // (rimraf sirve igual que `rm -f`) borrar dist y volver a transpilar el codigo    
    "start": "npm run build && node dist/app.js"    // Iniciar la app de producción
},
```
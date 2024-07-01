# 02 Bases de Node

Correr en Dev `npm run dev`


## Configuracion de TS en Node
Se tiene una [configuracion basica](https://gist.github.com/Klerith/47af527da090043f604b972b22dd4c01) para usar TS con Node.
1. Instalar TypeScript y demás dependencias
```
npm i -D typescript @types/node ts-node nodemon rimraf
```

2. Inicializar el archivo de configuración de TypeScript ( Se puede configurar al gusto)
```
npx tsc --init --outDir dist/ --rootDir src
```

3. Crear archivo de configuración Nodemon - nodemon.json
```
{
  "watch": ["src"],
  "ext": ".ts,.js",
  "ignore": [],
  "exec": "npx ts-node ./src/app.ts"
}
```

4. Crear scripts para dev, build y start

```
  "dev": "nodemon",
  "build": "rimraf ./dist && tsc",
  "start": "npm run build && node dist/app.js"
```


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
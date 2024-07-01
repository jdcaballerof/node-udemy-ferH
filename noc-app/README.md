# NOC - APP
Correspondiente a las secciones 8-12 del curso de [NODE](https://www.udemy.com/course/nodejs-de-cero-a-experto/)



## Notas



## Config
Aca cambia [la configuracion](https://gist.github.com/Klerith/3ba17e86dc4fabd8301a59699b9ffc0b) al usar `ts-node` en lugar de `nodemon`

1. Instalar TypeScript y demás dependencias
  ```
  npm i -D typescript @types/node ts-node-dev rimraf
  ```
2. Inicializar el archivo de configuración de TypeScript ( Se puede configurar al gusto)
  ```
  npx tsc --init --outDir dist/ --rootDir src
  ```
  Añadir:
  ```json
  "exclude": [
    "node_modules",
    "dist"
  ],
  "include": [
    "src"
  ],
  ```
3. Crear scripts para dev, build y start ([Más sobre TS-Node-dev aquí](https://www.npmjs.com/package/ts-node-dev))
  ```json
    "dev": "tsnd --respawn --clear src/app.ts",
    "build": "rimraf ./dist && tsc",
    "start": "npm run build && node dist/app.js"
  ```


## Inyeccion de dependencias
No es mas que añadir una dependencia a la clase la cual hay que satisfacer a traves del contructor

```TS
export class CheckService implements CheckServiceUseCase {
    
  constructor(
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback,
  ){}

  // ...
}
```

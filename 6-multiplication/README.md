

## Config TS
[Segun GIST de Fer H](https://gist.github.com/Klerith/47af527da090043f604b972b22dd4c01)


## Notas importantes por video

- **74** 5-10: 
  ```json
  {
    "dev": "ts-node src/app.ts",    // Solo ejecutar la app
    "dev:nodemon": "nodemon",       // Estar escuchando cambios
  }
  ```
- **82** 3-20: Un metodo estatico puedo llamarse sin necesidad de inicializar la clase
- **84** 3-15: El constructor es el primer metodo que se manda a llamar al crear una clase, se usa comunmente para inyectar dependencias (DI: *Dependency Injection*) 


## Clean Architecture - first steps

Se tiene el [siguiente codigo (original)](./src/app.tablas.ts) el cual crea tablas de multiplicar y las puede mostrar por consola o guardarlas en un archivo dentro de `/outputs` mediante banderas que se obtienen usando la libreria `yargs`

### Refactorizar
Separar la logica buscando modularizar y estandarizar el codigo (hacer el codigo modular e "independiente" para su reutilización y/o facilitar el mantenimiento)

Se pretende separar la logica de la app de la funcionalidad de inicialización del aplicativo, teniendo el archivo app.ts que manda a llamar a la "presentation" `server-app.ts` que es donde ira el llamado de las funcionalidades de la logica

### Uses Cases
La capa de los casos de uso (*Uses Cases*) contiene las reglas de negocio especificas de la aplicación, condensa e implementa todos los casos de uso del sistema, estos casos de uso orquestan el flujo dentro y hacia las entidades

Los casos de uso de esta app son:
- Construir la tabla requerida
- Grabar en FileSystem (fs)

Con esta arquitectura se podra facilmente acoplar a guardar en fs, FTP o en memoria

### Estructura de directorios
No se especifica ninguna, solo se busca la separación de responsabilidades, es flexible a lo que uno predisponga. 
Recomendaciones de Fer Herrera de carpetas:
- ***/presentation***: 
  Lo que esta mas expuesto al usuario
  - (endpoints): RESTful API Endpoints
- ***/domain***: 
  Aca van reglas que rigen a otras capas
  - uses-cases: Funcionalidades que hagan una tarea en particular

### Conclusion
Una vez aplicado UsesCases y Refactorizacion [el codigo que se tenia](./src/app.tablas.ts), quedo en una instancia de [ServerApp](./src/presentation/server-app.ts) al cual le pasamos los parametros necesarios que, en esta ocasion, obtenemos con [yargs](./src/config/plugins/args.plugins.ts) e invoca las funciones (*UsesCases*)
- [Crear data](./src/domain/use-cases/create-table.use-case.ts)
- [Guardar en *FS*](./src/domain/use-cases/save-file.use-case.ts) 
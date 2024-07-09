# NOC - APP
Correspondiente a las secciones 8-12 del curso de [NODE](https://www.udemy.com/course/nodejs-de-cero-a-experto/)



## Notas
- 122 1-40: Las clases abstractas no se pueden instanciar. Está diseñada para ser una clase base que otras clases pueden extender. 
  Un método abstracto es un método que se declara sin ninguna implementación (sin codigo/logica) en una clase abstracta. Las clases derivadas deben proporcionar una implementación para estos métodos.
  El uso de `abstract` es, por asi decirlo, para crear una especie de plantilla/interface
- 124 1-30: FS.appendFile sirve para añadir una fila mas al final del archivo
- 150 7-55: para que `docker-compose.yml` lea variables de entorno solo usar la sintaxis `${var}`, no hay que configurar nada

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


## Repository Pattern
Este patrón ayuda a gestionar y encapsular las operaciones de acceso a datos (en algo llamado *repositorio*), proporcionando una interfaz coherente para la lógica de negocio.

### Beneficios del Repository Pattern
- Separación de responsabilidades
- Facilidad de pruebas
- Reutilización de código
- **Flexibilidad**: 
  **Facilita cambiar la fuente de datos** (por ejemplo, de una base de datos SQL a NoSQL) **sin cambiar la lógica de negocio**.

> Puede parecer engorroso y *boilerplate*,pero se logra el objetivo de facilitar cambiar la fuente de datos (FS, LocalStorage, SQL, NOSQL) sin modificar la logica de negocio


### Ejemplo - NOC app

Por ficheros
- app -> server.ts
- **config**:  Van cosas/objetos globales
  - **plugins**:  Para emplear el *Patron Adaptador* con librerias externas
- **domain** (dominio):  Reglas que rigen la aplicación (reglas de negocio)
  - **datasources** (origenes de datos): <!-- //#! --> ¿Para que es, porque es lo mismo que *repository*?
  - **entities**:  Similar a un modelo de una DB
  - **repository**:  Como se va a trabajar con los datasources
  - **use-cases**:  Acciones modularizadas por funcionalidad. Ej:  {checks: ['check-service-by-url.ts'], email: ['send-email-logs.ts', 'send-email-greeting.ts', 'send-email-report-pdf.ts' ], logs: []}
- **infrastructure**:  Se tienen las implementaciones
  - **datasource**:  usar el origen de datos, recuperando info y procesandola
  - **repositories**:  trabajan/hacer uso/implementar el datasource, o bueno con la plantilla en comun ya que será inyectado el datasource
- **presentation**:  Es lo que este mas cerca al usuario. Ej: app de consola, servidor de express, etc


## Empleando diferentes repositorios (MongoDB y PG)
Para integrar el uso de una diferente DB:
Solo será necesario modificar `LogRepository` en [`server.ts`](./src/presentation/server.ts)
  
- Mongo
  Se crea la DB con [docker-compose](./docker-compose.yml).
  Se descarga y usa **MongoDB Compass** como gestor de DB
  Se descarga y usa **mongoose** como ORM

  1. Crear la carpeta `src/data/mongo` con el archivo `init.ts`
  2. Todo empieza con `init.ts` configurando metodo para la conexion a la DB
  3. En `models/` se mapea la info para grabarla en mongoDB
  4. En `app.ts` ejecutar la conexion a la DB
  5. En [`/infrastructure/datasource`](./src/infrastructure/datasources/mongo.datasource.ts) se crea la logica correspondiente implementando [`LogDatasource`](./src/domain/datasource/log.datasource.ts)
  6. Por ultimo se configura el nuevo repositorio, en este caso en [server.ts](./src/presentation/server.ts)

- PG
  Crear la tabla con Prisma. La conexion se inicia de manera "indirecta", solo es necesario crear el cliente donde se ocupe.

  1. Crear el `infrastrucutre/datasource` correspondiente, [pg-log.datasource](./src/infrastructure/datasources/pg-log.datasource.ts),  instanciando un nuevo `PrismaClient` ahi mismo
  2. Configura el nuevo repositorio en [server.ts](./src/presentation/server.ts)

- Usando multiples DB
  Una vez que se tengan los repos, entonces:

  1. Crear otro caso de uso [check-service-multiple-db.ts](./src/domain/use-cases/checks/check-service-multiple-db.ts)
  2. Configurar el nombre y el constructor para que reciba un array de `LogRepository`
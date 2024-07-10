# Node con TS y CLEAN Architecture

## Patrones vistos
- ### adapter (adaptador):    [*]
  Carpeta `src/config/plugins`

  Para usar librerias de terceros, cada archivo debe hacer una funcionalidad en especifico.
  Si llegará a cambiar la libreria solo es necesario realizar los ajustes en este archivo y no por toda la logica
  

- ### repository (repositorio):  [noc-app]
  Carpetas (/src/):
    - domain (reglas de negocio)
      - datasource *¹  (Contienen clases abstractas con los metodos necesarios para la logica)
      - entities (entidades | modelos)
      - repository *¹  (Contienen clases abstractas con los metodos necesarios para la logica)
      - use-cases (casos de uso, logica/reglas de negocio. Reciben el repositorio que va a tener la interfaz/forma dicha en `/domain/repository` ) 
    - infrastructure (conexión a DB)
      - datasource (Debe seguir la  clase abstracta de `/domian/datasource/`, y es quien se va a comunicar con la DB, ya sea con un ORM o Vanilla JS)
      - repository (de implementación. Debe seguir la clase abstracta de `/domian/repository/`, es el que se manda a llamar en `server.ts`, y contiene la ejecucion de los metodos del datasource que reciba por inyeccion de dependencias)
    - presentation (funcionalidades mas cercanas al usuario)
      - server.ts
  
  Modularizar la logica (reglas de negocio) e independizarla de la DB, inyectando diferentes *datasources* en la logica a traves de `/presentation/server.ts` para realizar las consultas requeridas.

  #### Flujo de la info usando el patron repository
  1. El servidor manda a llamar los casos de uso (use-cases)
  2. A los casos de uso (`/src/domain/use-cases`) se les inyecta el repositorio de implementacion con el datasources correspondiente de (`/src/infrastructure/`)
  3. El repositorio de implementacion se crea (antes) inyectando fuentes de información (datasources) `/src/infrastructure/datasources`
  4. Los datasources de `/src/infrastructure/datasources` se hacen implementando la clase abstracta de `src/domain/datasource/`
  5. Los metodos de las clases abstractas en `src/domain/datasource/` hacen uso de las entidades de `src/domain/entities/`
  
  ![patron-repository-diagrama](./doc/images/patron-repository-diagrama.svg)
  
  Con esto se consigue que `/domain` este encapsulado/independiente de la fuente de datos (DB), solo exponiendo las interfaces requeridas (a traves de `domain/datasource/` y `domain/repository/`) que debe respetar `/infrastructure` 

  *¹ Tienen lo mismo (no se porque se crean 2 si tienen lo mismo y solo sirven para dictar a infraestructure como deben lucir sus datasources y repositories, seccion 9 - clase 122 | 126)


-  [another-pattern]
-  
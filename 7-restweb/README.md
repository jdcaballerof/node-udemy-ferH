# Servidores

## Notas importantes

- 192 Http2 - OpenSSL: Como crear un servidor con certificado SSL
  - Habilitar openssl (solo necesario para windows)
    - Añadir a las varibales de entorno del sistema, en PATH, la ubicacion a openssl, que si se tiene git se encuentra en usr/bin (ej: `C:\...\Programs\Git\usr\bin`) (para saber la ubicacion de git se puede ejecutar `where git` en terminal bash)
    - Si sale un error tipo "Can't open /Postgresql/etc/openssl.cnf" entonces hay que crear una config de openssl en 
  - Ejecutar el siguiente comando y completar formulario:
    - `openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.crt`
  - Se obtienen los archivos key y certificado
  > El certificado no se reconoce como seguro por el navegador 
  
- 

## Application basic test

### Framework and libraries used

- Express framework
- Typescript
- Inversify
- Class Validator
- Axios

### Description:
Para probar los endpoints del proyecto debe iniciar docker

### Pasos para iniciar docker y ejecutar el proyecto

- Paso 1: Construir la imagen del docker
```
docker build -t app-container-pt .
```
- Paso 2: Iniciar los contenedores app y mongodb en el docker
```
docker compose up -d
```

### Probar los endpoints de la API

A continuación se muestra los curls para probar mediante postman


#### Create user: 
se crea un usuario para autenticarse y usar los endpoints de la API
 ```
 curl --location 'http://localhost:3500/v1/user' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--data-raw '{
    "email": "api_user100@email.com",
    "password": "P4$.@prueba.tecnica",
    "name": "demo"
}'
 ```

#### User Authentication: 

Se autentica el usuario y se generá un token, dicho token servirá para autorizar el uso de los endpoints de rates
 ```
curl --location 'http://localhost:3500/v1/user' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--data-raw '{
    "email": "api_user100@email.com",
    "password": "P4$.@prueba.tecnica",
    "name": "demo"
}'
  ```
Por ejemplo el response de User Authentication se muestra a continuación y el token esta en el nodo data.token = [[TOKEN]]:
```
{
    "error": false,
    "message": "Ok",
    "status": 201,
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Njk3MmZjMDNkNDZkMmMxMDg2NzBhYiIsImlhdCI6MTcxODE4Njc1OCwiZXhwIjoxNzE4MTg3NjU4fQ.P9i5hc8tnTSSNZyDZkCEGyhG0MRueiuK_df-Hx9wDwI"
    }
}
```

### ENDPOINTS Rates:
Los siguientes endpoints requiere una autenticación para ello se tendrá que reemplazar [[TOKEN]] por el valor del token generado en el enpoint User Authentication

#### Request Rate:
Solicitud de cambio de divisa
 ```
curl --location 'http://localhost:3500/v1/rate/exchange?exchange_type=compra&send_amount=1222.2' \
--header 'Authorization: Bearer [[TOKEN]]' \
--header 'Content-Type: application/json'
  ```


#### Request all rate: 
Obtiene todas las solicitudes de cambio de divisa
 ```
curl --location 'http://localhost:3500/v1/rate' \
--header 'Authorization: Bearer [[TOKEN]]' \
--header 'Content-Type: application/json'
  ```

#### Request get rate by id: 
Se obtiene una solicitud de cambio de divisa por 'id'
 ```
curl --location 'http://localhost:3500/v1/rate/66694c445299e0a6f93067cf' \
--header 'Authorization: Bearer [[TOKEN]]' \
--header 'Content-Type: application/json'
  ```

#### Request delete rate by id:
Se elimina una solicitud de cambio de divisa por 'id', en este caso se hará una eliminación física, también se puede implementar una eliminación lógica.
 ```
curl --location --request DELETE 'http://localhost:3500/v1/rate/66694c445299e0a6f93067cf' \
--header 'Authorization: Bearer [[TOKEN]]' \
--header 'Content-Type: application/json'
  ```

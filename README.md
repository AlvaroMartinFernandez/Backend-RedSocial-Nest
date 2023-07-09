 <p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


## Description

Para realizar dicho proyecto hemos utilizado el framework de Nest en dicha aplicacion tendremos un recurso users que instalamos con el comando:
```bash
$ nest g resource [name]
```
en dicho recurso tendremos un modelo  y dos controladores y dos servicios.  La funcionalidad sera crear un CRUD para los usuarios y la otra sera conectar a una API externa para obtener datos.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test
Se han realizado varios test unitarios y test e2e durante el desarrollo
```bash
# unit tests
$ npm run test:watch

# e2e tests
$ npm run test:e2e:watch

```

## Paquetes de funcionalidades instalados

Realizamos la API de Swagger para documentar nuestra API
```bash

#comando de instalacion
$ npm install @nestjs/swagger

#Ruta de ejecucion
$ "/api"

```
![Swagger](https://github.com/AlvaroMartinFernandez/Backend-RedSocial-Nest/assets/91843474/4205c550-5a71-4135-bce0-5b1a970d7e30)

Utilizacion de Sequalize para conectar con la Base de datos que hemos creado

```bash

#comando de instalacion
$@nestjs/sequelize


```
Utilizamos los paquetes Class Validator para validar la informacion mediante decodadores.

```bash
$ npm install class-validator

```
Utilizamos Cors para permitir conecgtarnos desde el fronted.

```bash
#comando de instalacion
$ npm install cors
```

# Distribuccion del código:

El codigo estara distribuido en la carpeta user donde estara el recurso instalado donde tendremos el modulo, controladores y servicios del recurso, tambien tendremos la carpeta dto donde tenemos los objetos de transferencia de datos para crear y editar usuarios y la carpeta entities donde tendremos el modelo de relacion los modelos usuarios ,amigos y mascotas.

Hemos creado la carpeta models donde estaran los modelos de nuestra base de datos 1 para usuarios, otro para amigos y el ultimo para mascotas. 

Para finalizar tenemos la carpeta DB donde tendremos el archivo de configuracion de nuestra base de datos.





## Table of contents

- [Description](#Description)
- [Explanation](#Explanation)
- [Installation](#Installation)
  - [Configuration](#1-Configuration)
  - [Database](#2-Database)
  - [Nest.js API](#3-Nest.js-API)
  - [OpenAPI Specification](#4-OpenAPI-Specification)
  - [Unit Testing](#5-Unit-Testing)

## Description

A [Nest.js](https://github.com/nestjs/nest) REST API demo project that is linked to a docker MySQL database. The API performs CRUD operations on a table named "products" in the database.

## Explanation

As requested in the challenge's pdf, this section contains an explanation of why the tools used in this project were picked.

- **Nest.js as the Node.js Framework** <br/>
  By taking a look at the requirements, Nest.js was the framework that comes with most of the required features. It is a Node.js framework that uses Express.js under the hood and is highly opinionated framework, which enforces an MVC architecture making it less prone to errors, it uses TypeScript as its primary language, and Nest.js CLI comes with a default testing environment which is configured with Jest. <br/>
  Comparing this with the other popular frameworks, such as Express.js, Nest.js wins in the case since Express is a very unopinionated framework that uses JavaScript and using it with TypeScript would require extra time and effort.

- **MySQL as the Database** <br/>
  Since there was a choice between MySQL and PostgreSQL in the requirements and both of them are relational databases, I picked MySQL. Both of the aforementioned databases would be a good fit for this project. PostgreSQL is more feasible if the project is going to scale with complex queries, a variety of data types, and analytical processing. However for a smaller project that does not need feature-rich database queries, MySQL is faster, and more widely used, that is why I picked it.

- **TypeORM as the ORM Library** <br/>
  TypeORM is built for TypeScript and is recommended when using TypeScript in a project. On the other hand, using Sequelize with TypeScript requires extra packages. In my opinion, this makes TypeORM more suitable for using it with Nest.js.

- **class-validator as the Validation Package** <br/>
  In the [Nest.js documentation](https://docs.nestjs.com/techniques/validation), it is recommended to use the `class-validator` package because Nest.js's `ValidationPipe` already makes use of it. After further reading, I found that this package already has all the validation that I need in this project and decided to use it.

## Installation

To install this project and run it locally, please clone the project first, navigate to the root directory and run `npm i` to install the required packaged, and then follow the following instructions:

### 1) Configuration

Create a .env file in the root diectory, add the following keys, and provide values of your choice to the keys without values:

```
MYSQL_ROOT_PASSWORD
MYSQL_USER
MYSQL_PASSWORD
MYSQL_PORT
API_PORT
MYSQL_HOST=localhost
MYSQL_DATABASE=products_db
```

These keys will be used throughout the project for the database connection. Since the database runs in a docker container in this project, `MYSQL_HOST` value would be equal to `localhost`, and `MYSQL_DATABASE` is the name of the database that the project will use. The key `API_PORT` is the port on which the API will run.

### 2) Database

The database has one table called `products` and has the following structure:

| Column Name | Data Type    |
| ----------- | ------------ |
| product_id  | INT          |
| name        | VARCHAR(255) |
| price       | FLOAT(10,2)  |
| description | TEXT         |
| created_at  | DATETIME     |
| updated_at  | DATETIME     |

The first step is running the database docker container and seeding the database. Open the the terminal and run the following commands:

Create a local volume for the container

```bash
$ docker volume create --name mysql_products_volume -d local
```

Run the database container in the background

```bash
 $ docker-compose up -d
```

After running these commands, the database container will be up and running in docker in the background. The [docker-compose.yml](https://github.com/maryamaljanabi/demo-project/blob/master/docker-compose.yml) file configures Adminer client to interact with the database. To access the seeded database through Adminer GUI, go to:
http://localhost:8080/

And fill the following fields based on the values specified in the .env file for each key name (except the Server field).

| Field    | .ENV Value        |
| -------- | ----------------- |
| Server   | mysql-products-db |
| Username | MYSQL_USER        |
| Password | MYSQL_PASSWORD    |
| Database | MYSQL_DATABASE    |

### 3) Nest.js API

To start the application with the server listening for HTTP requests on the specified port in the `main.ts` file, _which in this application is port 3000_, run the following command in the terminal:

```bash
 $ npm run start
```

Or to automatically watch for changes:

```bash
 $ npm run start:dev
```

The application now should be running on the port specified in the `.env` file with the key `API_PORT`.

The available API endpoints are as follows:

- Get all products

```
 [GET]: http://localhost:API_PORT/products
```

- Get one product by id. If id doesn't exist, throws an error.

```
 [GET]: http://localhost:API_PORT/products/:id
```

- Create a product. Must provide the product in the body as follows:

```
{ name*	string
  price*	number
  description*	string
}
```

```
 [POST]: http://localhost:API_PORT/products
```

- Update a product by id. If id doesn't exist, throws an error. Can provide any field _(name, price, or description)_ to be updated.

```
 [PATCH]: http://localhost:API_PORT/products/:id
```

- Delete a product by id. If id doesn't exist, throws an error.

```
 [DELETE]: http://localhost:API_PORT/products/:id
```

### 4) OpenAPI Specification

This project is configured with Swagger for OpenAPI Specification. To check the Swagger UI of this application, go to:

```
 http://localhost:API_PORT/api/
```

### 5) Unit Testing

As specified in the challenge's pdf file, the unit tests were written using jest for the `products.service.ts`. To run the tests, use the following command:

```bash
$ npm test products.service
```

The output should be as follows:

```bash
Test Suites: 1 passed, 1 total
Tests:       9 passed, 9 total
Snapshots:   0 total
Time:        7.114 s
```

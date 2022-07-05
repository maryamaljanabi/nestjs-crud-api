## Table of contents

- [Description](#Description)
- [Installation](#Installation)
  - [Configuration](#1-Configuration)
  - [Database](#2-Database)
- [Test](#Test)

## Description

A [Nest](https://github.com/nestjs/nest) REST API demo project that is linked to a docker MySQL database. The API performs CRUD operations on a table named "products" in the database.

## Installation

To install this project and run it locally, please clone the project first, navigate to the root directory and run `npm i` to install the required packaged, and then follow the following instructions:

## 1) Configuration

Create a .env file in the root diectory, add the following keys, and provide values of your choice to the keys without values:

```bash
MYSQL_ROOT_PASSWORD
MYSQL_USER
MYSQL_PASSWORD
MYSQL_PORT
MYSQL_HOST=localhost
MYSQL_DATABASE=products_db
```

These keys will be used throughout the project for the database connection. Since the database runs in a docker container in this project, `MYSQL_HOST` value would be equal to `localhost`, and `MYSQL_DATABASE` is the name of the database that the project will use.

## 2) Database

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

## Test

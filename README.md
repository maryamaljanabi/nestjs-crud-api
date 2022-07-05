## Table of contents

- [Description](#Description)
- [Installation](#Installation)
  - [Database](#1-Database)
- [Test](#Test)

## Description

A [Nest](https://github.com/nestjs/nest) REST API demo project that is linked to a docker MySQL database. The API performs CRUD operations on a table named "products" in the database.

## Installation

To install this project and run it locally, please clone the project first and follow the following instructions:

## 1) Database

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

And enter the following credentials that are already configured in the docker-compose file:

|          |                   |
| -------- | ----------------- |
| Server   | mysql-products-db |
| Username | user              |
| Password | 1234              |
| Database | products_db       |

## Test

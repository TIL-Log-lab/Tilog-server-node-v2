<div align="center">

# TIL-Log Server V2

Blog platform for developers, TILog

[프로젝트 컨벤션](https://github.com/TIL-Log-lab/Tilog-server-node-v2/discussions/4) • [마이그레이션 히스토리](https://github.com/TIL-Log-lab/Tilog-server-node-v2/tree/main/prisma/migrations) • [OpenAPI Client](https://www.npmjs.com/package/@til-log.lab/tilog-api)

</div>

# Built With

- NestJS
- TypeScript
- MySQL
- Prisma
- Redis

# Getting Started Local

## 1. Clone This Project

```
$ git clone https://github.com/TIL-Log-lab/Tilog-server-node-v2.git
```

## 2. Install npm module

```
$ yarn install
```

## 3. Using Docker-compose to Run the Storage.

```
$ cd docker
$ docker-compose up
```

> Please Change the environment variable(Database password) in docker-compose.yml

## 4. Create environment file

Read [this](https://github.com/TIL-Log-lab/Tilog-server-node-v2/tree/main/environments) guide and follow it

## 5. Getting started with Prisma Migrate

```
yarn prisma:migrate:local
```

In a local environment, use this command to generate and apply migrations

## 6. Start serverApp

```
$ yarn start:local
$ yarn start:local:watch
$ yarn start:local:debug
```

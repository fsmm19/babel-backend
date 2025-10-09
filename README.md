# Babel | Sistema de Gestión de Biblioteca

## Descripción

Babel es un sistema de gestión para una biblioteca desarrollado con NestJS, Prisma y PostgreSQL. Permite gestionar materiales bibliográficos, usuarios y préstamos de manera eficiente.

## Configuración del proyecto

```bash
$ pnpm install
```

## Compilar y ejecutar el proyecto

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

```

## Base de datos

### Variables de entorno

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:

```
POSTGRES_USER=<username>
POSTGRES_PASSWORD=<password>
POSTGRES_DB=<database>

DATABASE_URL="postgresql://<username>:<password>@localhost:5432/<database>?schema=public"
```

### Levantar contenedor de PostgreSQL

El proyecto utiliza PostgreSQL como base de datos. Se debe tener Docker y Docker Compose instalados para levantar el contenedor de la base de datos.

```bash
$ docker-compose up -d
```

### Migraciones

```bash
$ pnpm prisma migrate dev --name <migration_name>
```

### Generar cliente Prisma

```bash
$ pnpm prisma generate
```
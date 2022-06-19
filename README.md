# The Pantry People

## How to run

### Requirements
- Node.js (v18+ recommended)
- PostgreSQL with PostGIS. You can either:
    - Manually launch a local/remote instance of PostgreSQL and install the PostGIS extension.
      - Then create a `.env` file inside `packages/api` and add your configuration.<br>
      *e.g. `DATABASE_URL=postgres://user:password@host:5432/name`*
    - Install Docker and simply run the following command: `docker run -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d --restart unless-stopped postgis/postgis`.

### Running the app

Without Docker (recommended for development)

1. Install pnpm globally by running  `npm i -g pnpm`
2. `pnpm install` inside the project directory
3. `pnpm dev` to run both api and web and automatically reload on changes.

With Docker

1. `docker-compose up` inside the project directory

## Project structure

- packages/
  - api/ - Express.js app.
  - core/ - Models, interfaces and business logic. Depends only on the `shared` and `emails` package.
  - postgres/ - Database package containing Postgres-specific schemas and repositories.
  - shared/ - Helpers, DTOs, enums and types shared across backend/frontend. Cannot depend on any other package.
  - web/ - Next.js app.

### The _core_ package

Independent of any external dependencies, it cannot be reliant on a specific library or technology. It should only contain core entities, interfaces, use cases, etc. It should logically be a complete app by itself.

Even database implementations should only be injected later on, from within a service (in your Express app for example). The _core_ package will, for example, contain the IUserRepository interface but then your database package (MySql, PostgresDB, MongoDB, etc.) will implement this interface and create a concrete UserRepository. ORMs like Mongoose, Sequelize and TypeORM will also be installed in your database package, not in the _core_ package.

```TypeScript
// ./packages/core/src/repositories/UserRepository.ts

interface UserRepository {
    findByEmail(id: string): Promise<User>;
}

// ./packages/postgres/src/repositories/UserRepository.ts

import { UserRepository as IUserRepository } from '@your-app/core'

class UserRepository implements IUserRepository {
    async findByEmail(email: string): Promise<User> {
        ...
    }
}
```

## Running a database migration

Database schema changes will be automatically applied in staging and development environments. For production changes, a migration can be generated and ran by following the steps below. 

1. Go into the `postgres` directory and set the database config inside an `.env` file (e.g. `DATABASE_URL`).
2. Execute `npm run db:gen --name=your-change` to generate the migration.
3. Run `NODE_ENV=production pnpm db:migrate` to apply the change.

Latest changes can be reverted by running `pnpm db:revert`
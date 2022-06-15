# The Pantry People

## How to run

### Requirements
- Node.js (v18+ recommended)
- PostgreSQL. You can either:
    - Manually launch a local/remote instance of PostgreSQL.
      - Create a `.env` file inside `packages/api` and add your configuration.<br>
      *i.e. `DATABASE_URL=postgres://user:password@host:5432/name`*
    - Install Docker and simply run the following command: `docker run -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d --restart unless-stopped postgres`.

### Running the app

Without Docker (recommended for development)

1. Install pnpm globally by running  `npm i -g pnpm`
2. `pnpm dev` inside the project directory

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
# Feedelity

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

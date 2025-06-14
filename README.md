# Coupon Management System

A NestJS-based API for creating and managing coupons. The service uses Prisma with PostgreSQL for data storage and provides endpoints for coupon requests, approvals and user management.

## Prerequisites

- **Node.js** v18 or later
- **PostgreSQL** database

## Environment Variables

Create a `.env` file based on `.env.example` and configure the following settings:

- `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_PORT`, `POSTGRES_HOST`, `POSTGRES_SCHEMA`
- `DATABASE_URL` – full database connection string
- `API_BASE_URL` and `FRONTEND_URL`
- `JWT_SECRET` and `JWT_EXPIRATION_TIME`
- `APP_NAME`, `APP_PORT`, `APP_HOST`, `NODE_ENV`, `PROTOCOL`
- `UPLOADED_FILES_DESTINATION`

## Basic Commands

- `yarn start` – start the application
- `yarn test` – run unit tests

## Quickstart

1. Install dependencies with `yarn install`.
2. Run database migrations:

   ```bash
   npx prisma migrate dev
   ```

3. Start the server:

   ```bash
   yarn start
   ```

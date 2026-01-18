# LiteTech API

## Important Notes

Since the Bitbucket repositories provided had the main branch locked, the code has been left in the dev branch for both projects. Additionally, the repositories are private, so for deployment purposes, a public repository was created on GitHub with the same commits: [https://github.com/mapszk/litetech-back](https://github.com/mapszk/litetech-back). This project is deployed on Render at: [https://litetech-back.onrender.com](https://litetech-back.onrender.com).

## Description

This is a RESTful API built with NestJS and TypeScript for the LiteTech project. It provides endpoints for managing related posts, with database and file storage handled by Supabase.

## Tech Stack

- **Framework**: [NestJS](https://nestjs.com/) with TypeScript
- **Database**: Supabase (PostgreSQL)
- **File Storage**: Supabase Storage (via AWS S3 integration)
- **ORM**: TypeORM
- **Validation**: class-validator and class-transformer
- **Linting**: ESLint with Prettier

## Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- Supabase account and project

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mapszk/litetech-back.git
   cd litetech-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Environment Setup

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Fill in the required environment variables in `.env`. The necessary variables are:

   ```
   DATABASE_HOST=
   DATABASE_PORT=
   DATABASE_USER=
   DATABASE_PASSWORD=
   DATABASE_NAME=
   PORT=
   FRONTEND_URL=
   NODE_ENV=
   AWS_ACCESS_KEY_ID=
   AWS_SECRET_ACCESS_KEY=
   AWS_REGION=
   PROJECT_ID=
   AWS_S3_ENDPOINT=
   AWS_S3_BUCKET=
   ```

   These correspond to your Supabase database and storage configurations.

## Running the Application

### Development
```bash
npm run start:dev
```

### Production
```bash
npm run start:prod
```

### Debug Mode
```bash
npm run start:debug
```

## Building

To build the application:
```bash
npm run build
```

For Render deployment (includes migrations):
```bash
npm run build:render
```

## Linting

To lint and fix code:
```bash
npm run lint
```

## Database Migrations

### Generate Migration
```bash
npm run migration:generate -- -n MigrationName
```

### Run Migrations
```bash
npm run migration:run
```

### Revert Migration
```bash
npm run migration:revert
```

## Deployment

The application is deployed on Render. The deployment URL is: [https://litetech-back.onrender.com](https://litetech-back.onrender.com).

For deployment, ensure all environment variables are set in your Render service configuration.

## API Endpoints

The API provides endpoints for managing related posts. Base URL: `https://litetech-back.onrender.com`

- `GET /related-posts` - Get all related posts
- `POST /related-posts` - Create a new related post


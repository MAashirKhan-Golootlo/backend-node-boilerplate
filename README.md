# Golootlo Backend Starter

Feature-based Node.js + Express + TypeScript starter with batteries included: logging, validation, Swagger docs, Docker, and linting (ESLint + folderlint).

## Tech Highlights
- Express 4 + TypeScript strict mode
- Feature-first folders (`src/features/<feature>`)
- Joi request validation + centralized error handler
- Swagger UI at `/api-docs`
- Pino structured logger + request tracing
- Dockerfile & docker-compose for local/dev deployments
- Folderlint script baked in for structure enforcement

## Project Tree
```
backend/
├── Dockerfile
├── docker-compose.yml
├── eslint.config.mjs
├── package.json
├── scripts/
│   └── folderlint.js
├── src/
│   ├── config/
│   │   └── index.ts
│   ├── core/
│   │   ├── app.ts
│   │   ├── httpError.ts
│   │   ├── logger.ts
│   │   ├── routes.ts
│   │   └── server.ts
│   ├── db/
│   │   └── index.ts
│   ├── docs/
│   │   └── swagger.ts
│   ├── features/
│   │   └── users/
│   │       ├── users.controller.ts
│   │       ├── users.model.ts
│   │       ├── users.routes.ts
│   │       ├── users.service.ts
│   │       └── users.validator.ts
│   ├── middlewares/
│   │   ├── auth.ts
│   │   ├── errorHandler.ts
│   │   ├── requestLogger.ts
│   │   └── validateRequest.ts
│   ├── types/
│   │   └── index.d.ts
│   └── utils/
│       └── response.ts
├── .env.example
└── tsconfig.json
```

## Getting Started
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Visit:
- API: `http://localhost:4000/api/v1/users`
- Docs: `http://localhost:4000/api-docs`

## Available Scripts
- `npm run dev` – start in watch mode (ts-node-dev)
- `npm run build` – compile TypeScript to `dist`
- `npm run start` – run compiled server
- `npm run lint` – ESLint check
- `npm run folderlint` – ensure folder/file conventions

## Environment Variables
See `.env.example`:
```
PORT=4000
NODE_ENV=development
LOG_LEVEL=info
API_PREFIX=/api/v1
```

## Docker
Build and run once:
```bash
docker compose up --build
```

Production-style image:
```bash
docker build -t golootlo-backend .
docker run -p 4000:4000 --env-file .env golootlo-backend
```

## Adding a New Feature
1. Create `src/features/<feature>/` with `*.controller.ts`, `*.service.ts`, `*.routes.ts`, `*.model.ts`, `*.validator.ts`.
2. Expose the router in `src/core/routes.ts`.
3. Define Swagger docs (extend `src/docs/swagger.ts`).
4. Add tests using your preferred tooling (not included by default).

Each feature gets isolated validation, controller, and service logic for scalability.

## Folderlint
Customize `.folderlintrc.js` to enforce structural rules. Run `npm run folderlint` as needed (CI friendly).


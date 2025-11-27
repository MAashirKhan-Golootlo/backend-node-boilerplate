FROM node:20-alpine AS base

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY tsconfig.json tsconfig.json
COPY src ./src

RUN npm run build

FROM node:20-alpine
WORKDIR /app

ENV NODE_ENV=production

COPY --from=base /app/package*.json ./
RUN npm install --omit=dev

COPY --from=base /app/dist ./dist
COPY .env.example .env.example

EXPOSE 4000

CMD ["node", "dist/core/server.js"]


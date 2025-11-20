FROM node:24-slim AS base

WORKDIR /app

RUN corepack enable pnpm

RUN corepack prepare pnpm@10.20 --activate

# Dependencies
FROM base AS dependencies

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

# Builder
FROM base AS builder

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

RUN pnpm prepare

RUN pnpm build

# Production
FROM base AS production

ARG NODE_ENV
ARG PORT

ENV NODE_ENV=${NODE_ENV}
ENV PORT=${PORT}

RUN apt-get update && apt-get install -y --no-install-recommends netcat-openbsd curl && rm -rf /var/lib/apt/lists/*
RUN addgroup --system appgroup && adduser --system --ingroup appgroup --home /home/appuser appuser

RUN mkdir -p /home/appuser/app
WORKDIR /home/appuser/app

COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/package.json ./package.json

COPY --from=builder /app/build ./build
COPY --from=builder /app/drizzle.config.ts ./drizzle.config.ts
COPY --from=builder /app/drizzle ./drizzle

COPY docker/production/app-entrypoint ./app-entrypoint
RUN chmod +x ./app-entrypoint

RUN chown -R appuser:appgroup /home/appuser/app

USER appuser

EXPOSE ${PORT}

ENTRYPOINT ["./app-entrypoint"]

CMD ["node", "build"]
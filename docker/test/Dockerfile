FROM mcr.microsoft.com/playwright:v1.56.1-noble AS base

WORKDIR /app

RUN corepack enable pnpm

# Dependencies
FROM base AS dependencies

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

# Builder
FROM base AS builder

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

RUN pnpm build

# Test
FROM base AS test

ARG APP_ENV
ARG PORT

ENV NODE_ENV=${APP_ENV}
ENV PORT=${PORT}

RUN apt-get update && apt-get install -y --no-install-recommends netcat-openbsd curl && rm -rf /var/lib/apt/lists/*
RUN addgroup --system appgroup && adduser --system --ingroup appgroup --home /home/appuser appuser

RUN mkdir -p /home/appuser/app
WORKDIR /home/appuser/app

COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/package.json ./package.json

RUN mkdir -p /home/appuser/.cache

COPY --from=builder /app/build ./build
COPY --from=builder /app/drizzle.config.ts ./drizzle.config.ts
COPY --from=builder /app/drizzle ./drizzle
COPY --from=builder /app/e2e ./e2e
COPY --from=builder /app/playwright.config.ts ./playwright.config.ts

RUN mkdir ./test-results

COPY docker/test/app-entrypoint ./app-entrypoint
RUN chmod +x ./app-entrypoint

RUN chown -R appuser:appgroup /home/appuser/app
RUN chown -R appuser:appgroup /home/appuser/.cache

USER appuser

EXPOSE ${PORT}

ENTRYPOINT ["./app-entrypoint"]

CMD ["node", "build"]
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app


# Määritä ARG komennolla muuttujat, jotka haluat asettaa .env.local tiedostosta
ARG OPENAI_API_KEY
ARG NEXT_PUBLIC_MAPS_API_KEY
ARG SUPABASE_PRIVATE_KEY
ARG SUPABASE_URL
ARG SERPAPI_API_KEY
ARG AUTH_SECRET
ARG BASIC_AUTH_USER
ARG BASIC_AUTH_PASSWORD

# Aseta ENV komennolla ympäristömuuttujat, jotka haluat käyttää sovelluksessasi
ENV OPENAI_API_KEY=$OPENAI_API_KEY
ENV NEXT_PUBLIC_MAPS_API_KEY=$NEXT_PUBLIC_MAPS_API_KEY
ENV SUPABASE_PRIVATE_KEY=$SUPABASE_PRIVATE_KEY
ENV SUPABASE_URL=$SUPABASE_URL
ENV SERPAPI_API_KEY=$SERPAPI_API_KEY
ENV AUTH_SECRET=$AUTH_SECRET
ENV BASIC_AUTH_USER=$BASIC_AUTH_USER
ENV BASIC_AUTH_PASSWORD=$BASIC_AUTH_PASSWORD

# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
# RUN mkdir .next
# RUN chown nextjs:nodejs .next
RUN mkdir -p .next/cache/images
RUN chown -R nextjs:nodejs .next/cache/images

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Anna käyttäjälle nextjs oikeudet sovelluksen hakemistoon ja sen sisältöön
RUN chown -R 1001:0 /app && chmod -R g+rwX /app
USER nextjs

EXPOSE 3000

ENV PORT 3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD HOSTNAME="0.0.0.0" node server.js
# Use official Node image
FROM node:20-alpine

WORKDIR /app

# -------------------------
# Build Frontend
# -------------------------
WORKDIR /app/web

COPY web/package*.json ./
RUN npm install

COPY web/ ./

ARG VITE_CLERK_PUBLISHABLE_KEY
ENV VITE_CLERK_PUBLISHABLE_KEY=$VITE_CLERK_PUBLISHABLE_KEY

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build


# -------------------------
# Build API (backend renamed)
# -------------------------
WORKDIR /app/api

COPY api/package*.json ./
RUN npm install

COPY api/ ./

# Compile TypeScript
RUN npm run build


# -------------------------
# Production Config
# -------------------------
EXPOSE 3000

ENV PORT=3000
ENV NODE_ENV=production

CMD ["node", "dist/index.js"]

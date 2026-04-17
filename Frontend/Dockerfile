# Multi-stage build for Frontend
# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# Build frontend
RUN npm run build

# Stage 2: Serve
FROM node:20-alpine

WORKDIR /app

# Install serve to serve static files
RUN npm install -g serve

# Copy built files from builder
COPY --from=builder /app/dist ./dist

EXPOSE 3000

ENV NODE_ENV=production

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:3000 || exit 1

# Serve frontend and proxy API to backend
CMD ["serve", "-s", "dist", "-l", "3000", "-c", "/app/serve.config.json"]

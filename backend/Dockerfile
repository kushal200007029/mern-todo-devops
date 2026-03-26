# Stage 1: Build dependencies
FROM node:18-alpine AS builder

WORKDIR /app

# Set production mode
ENV NODE_ENV=production

COPY package*.json ./

# Install only production deps + clean cache
RUN npm ci --omit=dev && npm cache clean --force

# Copy only required files
COPY server.js .
COPY config ./config
COPY models ./models
COPY routes ./routes

# Stage 2: Distroless runtime
FROM gcr.io/distroless/nodejs18

WORKDIR /app

# Copy only needed runtime files
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/server.js .
COPY --from=builder /app/config ./config
COPY --from=builder /app/models ./models
COPY --from=builder /app/routes ./routes

EXPOSE 5000

CMD ["server.js"]
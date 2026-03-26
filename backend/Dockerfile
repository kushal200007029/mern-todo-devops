# Stage 1: Build dependencies
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

# Stage 2: Distroless runtime
FROM gcr.io/distroless/nodejs18

WORKDIR /app

COPY --from=builder /app .

EXPOSE 5000

CMD ["server.js"]
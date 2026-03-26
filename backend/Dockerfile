# Stage 1: Build dependencies
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY . .

# Stage 2: Final minimal image
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app .

EXPOSE 5000

CMD ["node", "server.js"]
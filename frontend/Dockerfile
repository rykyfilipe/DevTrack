# Etapa 1: build
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: serve static files
FROM node:20-alpine
WORKDIR /app

COPY --from=builder /app /app

EXPOSE 8080
CMD ["npm", "run", "start"]

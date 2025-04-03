FROM node:20-alpine3.18 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Build the application for production
RUN npm run build

FROM node:20-alpine3.18

WORKDIR /app

# Install serve to run the application
RUN npm install -g serve

COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules

RUN mkdir -p /app/uploads

# Add health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000 || exit 1

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]
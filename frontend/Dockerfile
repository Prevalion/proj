FROM node:20-alpine3.18 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Build the application for production
RUN npm run build

FROM node:20-alpine3.18

WORKDIR /app

# Copy only necessary files from the builder stage
COPY --from=builder /app/build ./build
COPY --from=builder /app/server.js ./
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm ci --only=production

RUN mkdir -p /app/uploads

# Add health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000 || exit 1

EXPOSE 3000

# Run the Express server instead of serve
CMD ["node", "server.js"]
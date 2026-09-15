# Multi-stage/lightweight production Dockerfile for Tax Calculator App
FROM node:20-alpine AS production

# Set working directory
WORKDIR /app

# Copy dependency definitions
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production || npm install --production

# Copy application source code
COPY . .

# Expose application port
EXPOSE 8080

# Environment variables
ENV NODE_ENV=production
ENV PORT=8080

# Run container as non-privileged node user for security
USER node

# Start command
CMD ["node", "server.js"]

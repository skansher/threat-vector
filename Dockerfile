FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (needed for build)
RUN npm ci

# Copy source code
COPY . .

# Build React app
RUN npm run build

# Remove dev dependencies
RUN npm prune --production

# Expose port
EXPOSE 8080

# Set environment variable
ENV PORT=8080

# Start server
CMD ["node", "server.js"]

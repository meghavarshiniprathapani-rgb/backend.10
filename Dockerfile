FROM node:20-alpine

# Create app directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Expose backend port
EXPOSE 5000

# Start server
CMD ["node", "server.js"]

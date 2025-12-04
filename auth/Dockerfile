FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install dependencies (use npm install to be safe if no lockfile)
COPY package*.json ./
RUN npm install --production --silent

# Copy app source
COPY . .

# Create non-root user and switch to it
RUN addgroup -S app && adduser -S app -G app
USER app

# Default environment
ENV NODE_ENV=production
ENV PORT=3000

# Expose port (override using --env or env file)
EXPOSE 3000

# Start the app (server.js exists at repo root)
CMD ["node", "server.js"]

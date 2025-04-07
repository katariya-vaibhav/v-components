FROM node:22.11.0-alpine

# Set working directory
WORKDIR /app

# Set NODE_ENV to production
ENV NODE_ENV=production

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy all files and build the app
COPY . .
RUN npm run build

# Expose port used by Next.js
EXPOSE 3000

# Start Next.js app in production mode
CMD ["npm", "start"]

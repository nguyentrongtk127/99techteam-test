# Base image
FROM node:22-alpine AS builder

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Production image
FROM node:22-alpine AS production

# Set the working directory
WORKDIR /usr/src/app

# Copy only production dependencies
COPY package*.json ./
RUN npm install --only=production --legacy-peer-deps

# Copy built files from the builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Expose application port
EXPOSE 3008

# RUN npm run migration:run
# Start the application
CMD ["node", "dist/index"]

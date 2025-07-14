# Base image Node.js versi 18
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json dan package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy semua file ke /app
COPY . .

# Build Vite React project
RUN npm run build

# Install serve untuk static files
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Jalankan production server
CMD ["serve", "-s", "dist", "-p", "3000"]
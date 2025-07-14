# Base image Node.js versi 18 alpine
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json dan package-lock.json untuk layer caching yang optimal
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy semua source code ke /app
COPY . .

# Build Vite project untuk production
RUN npm run build

# Install serve secara global untuk serving static files
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Jalankan serve untuk melayani dist folder
CMD ["serve", "dist"]
# Use Node.js 20 Alpine
FROM node:20-alpine

WORKDIR /app

# Accept build argument for VITE API URL
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy frontend source
COPY . .

# Build the Vite/React app
RUN npm run build

# Install serve to serve static files
RUN npm install -g serve

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]

# Use Node.js 20 Alpine
FROM node:20-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy backend source
COPY . .

EXPOSE 5000

CMD ["node", "server.js"]

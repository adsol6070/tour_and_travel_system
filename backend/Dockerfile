# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory for the container
WORKDIR /app

# Copy shared files and monorepo base configurations          
COPY package*.json ./                 

# Copy the specific service files
COPY backend ./backend

# Install dependencies for the specific service
RUN npm install

# Set the working directory for the container
WORKDIR /app/backend

# Build the service
RUN npm run build

# Expose the service's port
EXPOSE 8000

# Start the development server
CMD ["npm", "run", "dev"]

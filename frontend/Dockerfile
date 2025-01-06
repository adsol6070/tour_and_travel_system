# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy shared files and monorepo base configurations
COPY package*.json ./

# Copy the specific service files
COPY frontend ./frontend

# Install dependencies for the specific service
RUN npm install

# Set the working directory for the container
WORKDIR /app/frontend

# Expose the port that the Next.js application runs on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "run", "dev"]

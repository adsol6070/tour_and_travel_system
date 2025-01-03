FROM node:18-alpine

# Set the working directory for the container
WORKDIR /app

# Copy shared files and monorepo base configurations
COPY tsconfig.base.json ./             
COPY package*.json ./                 
COPY shared ./shared            

# Copy the specific service files
COPY services/tour-service ./services/tour-service

# Navigate to the specific service's directory
WORKDIR /app/services/tour-service

# Install dependencies for the specific service
RUN npm install

# Build the service
RUN npm run build

# Expose the service's port
EXPOSE 3002

# Start the development server
CMD ["npm", "run", "dev"]
# Use an official Nginx image as the base image
FROM nginx:alpine

# Copy the Nginx configuration to the container
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 8080 for the API Gateway
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
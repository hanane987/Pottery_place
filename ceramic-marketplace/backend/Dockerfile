# Use the official Node.js 18 image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend code to the working directory
COPY . .

# Expose the port the backend will run on (default: 5000)
EXPOSE 5000

# Command to start the backend server
CMD ["node", "index.js"]
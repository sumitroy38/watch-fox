# Start from a small, official Node.js image (base for our container)
FROM node:20-slim

# Set the working directory inside the container
WORKDIR /app

# Copy dependency manifest first (Docker caches this layer if it hasn't changed)
COPY package.json .

# Install dependencies inside the container
RUN npm install --omit=dev

# Copy the rest of the app code into the container
COPY . .

# Tell Docker which port the app listens on (informational, doesn't publish it)
EXPOSE 8080

# The command that runs when the container starts
CMD ["node", "app.js"]

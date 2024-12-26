FROM oven/bun:latest

WORKDIR /app

# Copy package files and install dependencies
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["bun", "dev"]
# Synthetic Patients AI - Docker Container
# Based on the research paper implementation requirements

FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install system dependencies for potential audio/video processing
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    cairo-dev \
    pango-dev \
    giflib-dev \
    && rm -rf /var/cache/apk/*

# Copy package files
COPY package*.json ./

# Install Node.js dependencies
RUN npm ci --only=production

# Copy application files
COPY . .

# Create non-root user for security
RUN addgroup -g 1001 -S synthpatients && \
    adduser -S synthpatients -u 1001
RUN chown -R synthpatients:synthpatients /app
USER synthpatients

# Expose the port the app runs on
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node healthcheck.js || exit 1

# Start the application
CMD ["npm", "start"]
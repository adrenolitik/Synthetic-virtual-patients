# 🚀 Synthetic Patients AI - Deployment Guide

A comprehensive deployment guide for the Advanced Synthetic Patients platform based on the research paper "Synthetic Patients: Simulating Difficult Conversations with Multimodal Generative AI for Medical Education."

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Production Deployment](#production-deployment)
- [Docker Deployment](#docker-deployment)
- [Environment Configuration](#environment-configuration)
- [Scaling and Performance](#scaling-and-performance)
- [Security Considerations](#security-considerations)
- [Troubleshooting](#troubleshooting)

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm 7+
- Docker and Docker Compose (for containerized deployment)
- Python 3.8+ (for AI processing services)

### Local Development
```bash
# Clone the repository
git clone https://huggingface.co/spaces/alexgoodell/synthetic-patients
cd synthetic-patients

# Install dependencies
npm install

# Start development server
npm run dev

# Access the application
open http://localhost:3000
```

### Simple Static Deployment
```bash
# For basic static hosting (Netlify, GitHub Pages, etc.)
npm run build
# Deploy the contents to your static hosting provider
```

## 🏭 Production Deployment

### Node.js Production Server
```bash
# Install production dependencies only
npm ci --production

# Set production environment
export NODE_ENV=production
export PORT=3000

# Start the production server
npm start
```

### PM2 Process Management (Recommended)
```bash
# Install PM2 globally
npm install -g pm2

# Start with PM2
pm2 start ecosystem.config.js

# Monitor processes
pm2 monit

# View logs
pm2 logs

# Save PM2 configuration
pm2 save
pm2 startup
```

### Environment Variables
Create a `.env` file in the project root:
```env
# Application Configuration
NODE_ENV=production
PORT=3000
HOST=0.0.0.0

# Database Configuration (Optional)
DATABASE_URL=postgresql://user:password@localhost:5432/synthetic_patients

# Redis Configuration (For session management)
REDIS_URL=redis://localhost:6379

# AI Processing Services
AI_SERVICE_URL=http://localhost:5000
OPENAI_API_KEY=your_openai_api_key_here
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here

# Security
SESSION_SECRET=your_secure_session_secret
JWT_SECRET=your_jwt_secret

# Logging
LOG_LEVEL=info
LOG_FILE=./logs/app.log
```

## 🐳 Docker Deployment

### Single Container Deployment
```bash
# Build the Docker image
docker build -t synthetic-patients-ai .

# Run the container
docker run -d \
  --name synthetic-patients \
  -p 3000:3000 \
  -e NODE_ENV=production \
  synthetic-patients-ai

# Check container status
docker ps
docker logs synthetic-patients
```

### Docker Compose (Recommended)
```bash
# Start all services
docker-compose up -d

# Check service status
docker-compose ps

# View logs
docker-compose logs -f synthetic-patients-app

# Stop all services
docker-compose down

# Update and restart
docker-compose pull
docker-compose up -d --force-recreate
```

### Docker Compose Services
The `docker-compose.yml` includes:
- **synthetic-patients-app**: Main application server
- **redis**: Session storage and caching
- **postgres**: Database for analytics (optional)
- **ai-processor**: Python-based AI processing service
- **nginx**: Reverse proxy and SSL termination

## ⚙️ Environment Configuration

### Development Environment
```bash
# .env.development
NODE_ENV=development
PORT=3000
DEBUG=synthetic-patients:*
ENABLE_HOT_RELOAD=true
```

### Production Environment
```bash
# .env.production
NODE_ENV=production
PORT=3000
ENABLE_COMPRESSION=true
ENABLE_RATE_LIMITING=true
SESSION_TIMEOUT=3600000
```

### AI Service Configuration
```bash
# AI Processing Configuration
AI_PROCESSING_ENABLED=true
VOICE_CLONING_ENABLED=true
VIDEO_GENERATION_ENABLED=true
REAL_TIME_PROCESSING=false

# Model Configuration
DEFAULT_LLM_MODEL=gpt-4
VOICE_MODEL=elevenlabs-v2
VIDEO_MODEL=heygen-avatar
```

## 📈 Scaling and Performance

### Horizontal Scaling
```yaml
# docker-compose.scale.yml
version: '3.8'
services:
  synthetic-patients-app:
    scale: 3
  
  nginx:
    ports:
      - "80:80"
    depends_on:
      - synthetic-patients-app
```

### Load Balancer Configuration
```nginx
# nginx/nginx.conf
upstream synthetic_patients {
    server synthetic-patients-app_1:3000;
    server synthetic-patients-app_2:3000;
    server synthetic-patients-app_3:3000;
}

server {
    listen 80;
    server_name yourdomain.com;
    
    location / {
        proxy_pass http://synthetic_patients;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Performance Optimization
```bash
# Enable caching
export ENABLE_REDIS_CACHE=true

# Configure memory limits
export NODE_OPTIONS="--max-old-space-size=4096"

# Enable compression
export ENABLE_GZIP=true
```

## 🔒 Security Considerations

### SSL/TLS Configuration
```bash
# Generate SSL certificates (Let's Encrypt)
certbot --nginx -d yourdomain.com

# Or use Docker with SSL
docker-compose -f docker-compose.yml -f docker-compose.ssl.yml up -d
```

### Environment Security
```bash
# Secure environment variables
export SESSION_SECRET=$(openssl rand -base64 32)
export JWT_SECRET=$(openssl rand -base64 32)

# Restrict file permissions
chmod 600 .env
chown app:app .env
```

### Network Security
```yaml
# docker-compose.security.yml
networks:
  synthetic-patients-network:
    driver: bridge
    internal: true
  web:
    driver: bridge

services:
  nginx:
    networks:
      - web
      - synthetic-patients-network
```

## 🌐 Cloud Platform Deployment

### Heroku
```bash
# Create Heroku app
heroku create synthetic-patients-ai

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set NPM_CONFIG_PRODUCTION=false

# Deploy
git push heroku main
```

### AWS ECS
```bash
# Build and push to ECR
aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 123456789012.dkr.ecr.us-west-2.amazonaws.com
docker build -t synthetic-patients-ai .
docker tag synthetic-patients-ai:latest 123456789012.dkr.ecr.us-west-2.amazonaws.com/synthetic-patients-ai:latest
docker push 123456789012.dkr.ecr.us-west-2.amazonaws.com/synthetic-patients-ai:latest
```

### Google Cloud Run
```bash
# Deploy to Cloud Run
gcloud run deploy synthetic-patients-ai \
  --image gcr.io/project-id/synthetic-patients-ai \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### Azure Container Instances
```bash
# Deploy to Azure
az container create \
  --resource-group myResourceGroup \
  --name synthetic-patients-ai \
  --image synthetic-patients-ai:latest \
  --ports 3000 \
  --environment-variables NODE_ENV=production
```

## 🔧 Troubleshooting

### Common Issues

#### Application Won't Start
```bash
# Check logs
docker logs synthetic-patients-app
npm run logs

# Verify environment
node -e "console.log(process.env)"

# Check port availability
netstat -tlnp | grep :3000
```

#### Performance Issues
```bash
# Monitor resource usage
docker stats
htop

# Check memory usage
node --trace-warnings --expose-gc index.js

# Optimize Node.js
export NODE_OPTIONS="--optimize-for-size --max-old-space-size=2048"
```

#### AI Services Not Working
```bash
# Verify API keys
curl -H "Authorization: Bearer $OPENAI_API_KEY" https://api.openai.com/v1/models

# Check service connectivity
docker-compose exec synthetic-patients-app curl http://ai-processor:5000/health

# Review AI service logs
docker-compose logs ai-processor
```

### Health Checks
```bash
# Application health
curl http://localhost:3000/health

# Database connectivity
docker-compose exec postgres pg_isready

# Redis connectivity  
docker-compose exec redis redis-cli ping
```

### Monitoring and Logging
```bash
# View application logs
tail -f logs/app.log

# Monitor with PM2
pm2 monit

# Docker container logs
docker-compose logs -f --tail=100
```

## 📊 Production Monitoring

### Health Monitoring
```javascript
// Custom health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    services: {
      database: 'connected',
      redis: 'connected',
      ai_processor: 'running'
    }
  });
});
```

### Metrics Collection
```bash
# Enable application metrics
export ENABLE_METRICS=true
export METRICS_PORT=9090

# Prometheus configuration
docker run -p 9090:9090 -v ./prometheus.yml:/etc/prometheus/prometheus.yml prom/prometheus
```

## 📋 Deployment Checklist

### Pre-deployment
- [ ] Environment variables configured
- [ ] SSL certificates obtained
- [ ] Database migrations completed
- [ ] API keys and secrets secured
- [ ] Health checks implemented
- [ ] Monitoring configured

### Post-deployment
- [ ] Application accessible via URL
- [ ] Health endpoints responding
- [ ] AI services functional
- [ ] Database connections working
- [ ] Logs being generated
- [ ] Performance metrics baseline established

## 🆘 Support and Documentation

### Resources
- [Research Paper Implementation](https://doi.org/10.57967/hf/2338)
- [Development Guide](DEVELOPMENT.md)
- [API Documentation](docs/api.md)
- [Configuration Reference](docs/configuration.md)

### Community
- Submit issues on the repository
- Join the medical AI education community
- Contribute improvements and enhancements

---

*For additional deployment support, please refer to the research paper or contact the development team.*
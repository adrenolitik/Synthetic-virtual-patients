// PM2 Ecosystem Configuration for Synthetic Patients AI
module.exports = {
  apps: [
    {
      name: 'synthetic-patients-ai',
      script: 'server.js',
      instances: process.env.NODE_ENV === 'production' ? 'max' : 1,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development',
        PORT: 3000,
        HOST: '0.0.0.0'
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: process.env.PORT || 3000,
        HOST: '0.0.0.0'
      },
      // Logging
      log_file: './logs/app.log',
      out_file: './logs/out.log',
      error_file: './logs/error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      
      // Memory and CPU
      max_memory_restart: '500M',
      
      // Auto restart
      autorestart: true,
      watch: false,
      max_restarts: 10,
      min_uptime: '10s',
      
      // Health monitoring
      health_check_grace_period: 3000,
      
      // Advanced options
      kill_timeout: 5000,
      wait_ready: true,
      listen_timeout: 3000,
      
      // Environment specific configurations
      env_staging: {
        NODE_ENV: 'staging',
        PORT: 3001
      }
    }
  ],
  
  // Deployment configuration
  deploy: {
    production: {
      user: 'deploy',
      host: ['production-server.com'],
      ref: 'origin/main',
      repo: 'https://huggingface.co/spaces/alexgoodell/synthetic-patients',
      path: '/var/www/synthetic-patients-ai',
      'post-deploy': 'npm ci --production && pm2 reload ecosystem.config.js --env production'
    },
    staging: {
      user: 'deploy',
      host: 'staging-server.com',
      ref: 'origin/develop',
      repo: 'https://huggingface.co/spaces/alexgoodell/synthetic-patients',
      path: '/var/www/synthetic-patients-ai-staging',
      'post-deploy': 'npm ci && pm2 reload ecosystem.config.js --env staging'
    }
  }
};
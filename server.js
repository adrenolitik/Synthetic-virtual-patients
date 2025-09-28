// Synthetic Patients AI - Production Server
// Based on research: "Synthetic Patients: Simulating Difficult Conversations with Multimodal Generative AI"

const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://cdn.socket.io"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "ws:", "wss:"],
      fontSrc: ["'self'", "data:"],
      mediaSrc: ["'self'", "blob:"],
    },
  },
}));

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://yourdomain.com', 'https://www.yourdomain.com']
    : ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));

// Compression middleware
app.use(compression());

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static file serving
app.use(express.static(path.join(__dirname), {
  maxAge: process.env.NODE_ENV === 'production' ? '1d' : 0,
  setHeaders: (res, path) => {
    // Cache static assets more aggressively in production
    if (path.endsWith('.css') || path.endsWith('.js')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 year
    }
  }
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: require('./package.json').version,
    environment: process.env.NODE_ENV || 'development',
    services: {
      webServer: 'running',
      staticFiles: 'serving'
    }
  });
});

// API Routes for future AI integration
app.get('/api/status', (req, res) => {
  res.json({
    application: 'Synthetic Patients AI',
    version: require('./package.json').version,
    description: 'Multimodal AI platform for simulating difficult medical conversations',
    features: {
      patientScenarios: true,
      conversationEngine: true,
      educationalAnalytics: true,
      multimodalAI: false // Will be enabled with external AI services
    }
  });
});

// Patient profiles API endpoint
app.get('/api/patients', (req, res) => {
  // This would integrate with the advanced patient profiles
  res.json({
    message: 'Patient profiles API - Connect with advanced-patients.js for full functionality',
    availableScenarios: [
      'cancer-diagnosis',
      'end-of-life',
      'mental-health',
      'substance-abuse'
    ]
  });
});

// Conversation simulation API
app.post('/api/conversation', (req, res) => {
  const { patientId, message, sessionId } = req.body;
  
  // This would integrate with the conversation engine
  res.json({
    patientResponse: 'This endpoint will be connected to the advanced conversation engine',
    analysis: {
      empathy: 0,
      clarity: 0,
      appropriateness: 0
    },
    suggestions: [
      'Use more empathetic language',
      'Ask open-ended questions',
      'Acknowledge the patient\'s emotions'
    ]
  });
});

// Catch-all route for SPA
app.get('*', (req, res) => {
  // Serve different pages based on route
  if (req.path.startsWith('/simulation')) {
    res.sendFile(path.join(__dirname, 'simulation.html'));
  } else if (req.path.startsWith('/tests')) {
    res.sendFile(path.join(__dirname, 'tests/test_patients.html'));
  } else {
    res.sendFile(path.join(__dirname, 'index.html'));
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`
  });
});

// Graceful shutdown handling
const gracefulShutdown = (signal) => {
  console.log(`Received ${signal}. Starting graceful shutdown...`);
  
  server.close(() => {
    console.log('HTTP server closed.');
    process.exit(0);
  });

  // Force close server after 10secs
  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
};

// Start server
const server = app.listen(PORT, HOST, () => {
  console.log(`
🏥 Synthetic Patients AI Server Started
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📍 Server: http://${HOST}:${PORT}
🎭 Simulation: http://${HOST}:${PORT}/simulation.html
📊 Health Check: http://${HOST}:${PORT}/health
🧪 Tests: http://${HOST}:${PORT}/tests/test_patients.html

Environment: ${process.env.NODE_ENV || 'development'}
Version: ${require('./package.json').version}

Based on research: "Synthetic Patients: Simulating Difficult 
Conversations with Multimodal Generative AI for Medical Education"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `);
});

// Handle process signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

module.exports = app;
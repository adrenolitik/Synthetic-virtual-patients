# 🏥 Synthetic Patients AI - Advanced Medical Education Platform

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)](https://nodejs.org/)
[![Docker](https://img.shields.io/badge/docker-ready-blue.svg)](https://docker.com/)
[![Research-Based](https://img.shields.io/badge/research-based-purple.svg)](https://doi.org/10.57967/hf/2338)

**An advanced multimodal AI platform for simulating difficult medical conversations, based on cutting-edge research in medical education.**

[🚀 Live Demo](https://huggingface.co/spaces/alexgoodell/synthetic-patients) • [📖 Documentation](#documentation) • [🐳 Quick Deploy](#quick-start) • [🔬 Research Paper](https://doi.org/10.57967/hf/2338)

</div>

---

## 🎯 Overview

This platform revolutionizes medical education by providing realistic, interactive AI-powered patient simulations for training healthcare providers in difficult conversations including end-of-life care, cancer diagnosis delivery, mental health assessments, and substance use counseling.

> **🔬 Research Foundation:** Based on *"Synthetic Patients: Simulating Difficult Conversations with Multimodal Generative AI for Medical Education"* by Simon N. Chu, MD, MS and Alex J. Goodell, MD, MS.

## ✨ Key Features

### 🎭 Advanced Patient Simulations
- **4 Realistic AI Patients** with comprehensive medical histories and cultural backgrounds
- **Difficult Conversation Scenarios**: End-of-life, cancer diagnosis, mental health, substance use
- **Cultural Diversity**: Authentic ethnic backgrounds with realistic belief systems
- **Psychological Realism**: Unique personality traits and emotional responses

### 🏥 Medical Education Framework
- **Evidence-Based Learning Objectives** structured for medical curricula
- **Real-Time Feedback** with AI-powered communication analysis
- **Performance Analytics** tracking empathy, clarity, and appropriateness
- **Session Recording** for comprehensive educational assessment

### 🤖 Advanced AI Integration
- **Multimodal Conversation Engine** with contextual patient responses
- **Natural Language Processing** understanding medical terminology
- **Educational Intelligence** designed specifically for medical training outcomes
- **Scalable Architecture** ready for institutional deployment

## 🎭 Patient Scenarios

### Ahmed Al-Farsi - Cancer Diagnosis & End-of-Life Care
- **Profile**: 68-year-old retired school principal from Oman
- **Condition**: Glioblastoma multiforme requiring surgery
- **Learning Focus**: Cultural sensitivity, surgical risk communication, end-of-life planning
- **Cultural Context**: Islamic faith, family-centered decision making

### Maria Santos - Goals of Care Discussion
- **Profile**: 74-year-old Latina seamstress with strong family ties  
- **Condition**: End-stage congestive heart failure
- **Learning Focus**: Family dynamics, spiritual concerns, comfort care options
- **Cultural Context**: Catholic faith, familismo values, multi-generational involvement

### James Wilson - Mental Health Assessment
- **Profile**: 42-year-old African American construction supervisor
- **Condition**: Major depressive disorder, first mental health encounter
- **Learning Focus**: Stigma reduction, supportive counseling, treatment motivation
- **Cultural Context**: Mental health stigma, masculine ideals, self-reliance

### Jennifer Chen - Substance Use Counseling
- **Profile**: 28-year-old Asian American marketing manager
- **Condition**: Moderate alcohol use disorder with professional concerns
- **Learning Focus**: Non-judgmental screening, harm reduction, confidentiality
- **Cultural Context**: Achievement expectations, family honor, professional identity

## 🚀 Quick Start

### 🌐 Try Online
- **Main Platform**: [Hugging Face Space](https://huggingface.co/spaces/alexgoodell/synthetic-patients)
- **Advanced Simulation**: [Direct Access](https://huggingface.co/spaces/alexgoodell/synthetic-patients/simulation.html)

### 💻 Local Development
```bash
# Clone the repository
git clone https://github.com/adrenolitik/Synthetic-virtual-patients.git
cd Synthetic-virtual-patients

# Install dependencies
npm install

# Start development server
npm run dev

# Access the platform
open http://localhost:3000
```

### 🐳 Docker Deployment
```bash
# Quick start
docker build -t synthetic-patients-ai .
docker run -p 3000:3000 synthetic-patients-ai

# Full stack deployment
docker-compose up -d
```

### ☁️ Production Deployment
```bash
# Install PM2 for process management
npm install -g pm2

# Deploy with PM2
pm2 start ecosystem.config.js --env production

# Monitor processes
pm2 monit
```

## 📁 Project Structure

```
synthetic-patients/
├── 🎭 simulation.html              # Advanced simulation interface
├── 🏥 index.html                   # Main platform entry point
├── 🤖 advanced-patients.js         # AI conversation engine
├── 🎨 simulation-styles.css        # Simulation UI styles  
├── 🖥️ server.js                   # Production Express server
├── 🐳 Dockerfile                  # Container configuration
├── 🔧 docker-compose.yml          # Multi-service architecture
├── 📊 ecosystem.config.js         # PM2 process management
├── 🌐 nginx/                      # Reverse proxy configuration
├── 📚 docs/                       # Comprehensive documentation
├── 🧪 tests/                      # Testing suite
└── 📝 logs/                       # Application logging
```

## 🎓 Educational Features

### Learning Objectives
- **Cultural Competency**: Training with diverse patient backgrounds
- **Communication Skills**: Real-time empathy and clarity assessment
- **Clinical Integration**: Medical conditions paired with communication challenges
- **Professional Development**: Scenarios for different career stages

### Assessment & Analytics
- **Real-Time Analysis**: Immediate feedback during conversations
- **Session Summaries**: Comprehensive performance reports
- **Progress Tracking**: Multi-session competency development
- **Curriculum Integration**: Exportable data for LMS systems

### Evidence-Based Design
- **Research-Grounded**: All scenarios based on medical education literature
- **Validated Metrics**: Assessment criteria aligned with communication standards
- **Institutional Ready**: Documentation for program integration

## 🔧 Technical Architecture

### Core Platform
- **Frontend**: Modern responsive web application
- **Backend**: Node.js/Express with production optimization
- **Database**: Optional PostgreSQL for analytics
- **Caching**: Redis for session management
- **Security**: Helmet, CORS, SSL/TLS support

### AI Integration Framework
- **Conversation Engine**: Ready for GPT-4, Claude, or similar LLM integration
- **Voice Processing**: Framework for ElevenLabs or speech services
- **Video Generation**: Architecture for avatar and video synthesis
- **Real-Time Processing**: WebSocket support for live interactions

### Deployment Infrastructure
- **Containerization**: Complete Docker setup
- **Load Balancing**: Nginx reverse proxy configuration
- **Process Management**: PM2 ecosystem for production stability
- **Monitoring**: Health checks and comprehensive logging
- **Security**: Production-hardened configuration

## 📚 Documentation

### Quick References
- **[🚀 Development Guide](DEVELOPMENT.md)**: Comprehensive development documentation
- **[🐳 Deployment Guide](DEPLOYMENT.md)**: Production deployment instructions
- **[🔬 Research Implementation](RESEARCH_IMPLEMENTATION.md)**: Detailed research alignment
- **[🧪 Testing Guide](tests/README.md)**: Testing and validation procedures

### Educational Resources
- **Patient Scenarios**: Detailed backgrounds and learning objectives
- **Communication Guidelines**: Evidence-based best practices
- **Assessment Rubrics**: Evaluation criteria for medical programs
- **Integration Guides**: LMS and curriculum integration documentation

## 🤝 Contributing

We welcome contributions from the medical education and AI communities!

### Development Setup
```bash
# Fork and clone the repository
git clone https://github.com/your-username/Synthetic-virtual-patients.git

# Install development dependencies  
npm install

# Start development server with hot reload
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

### Areas for Contribution
- **🎭 Patient Scenarios**: Additional medical specialties and cultural contexts
- **🤖 AI Integration**: Enhanced multimodal capabilities and voice/video features
- **📊 Analytics**: Advanced learning analytics and assessment tools
- **🌍 Localization**: Multi-language support and cultural adaptations
- **🧪 Research**: Educational effectiveness studies and validation

### Contribution Guidelines
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

### Research Foundation
- **Authors**: Simon N. Chu, MD, MS & Alex J. Goodell, MD, MS
- **Institutions**: UC San Francisco & Stanford University School of Medicine
- **Paper**: *"Synthetic Patients: Simulating Difficult Conversations with Multimodal Generative AI for Medical Education"*

### Technology Stack
- **Node.js & Express**: Server framework
- **Docker**: Containerization platform
- **PM2**: Process management
- **Nginx**: Reverse proxy and load balancing

### Medical Education Community
Special thanks to the medical education community for providing evidence-based frameworks and educational objectives that guide this platform's development.

## 📞 Support

### Community Resources
- **🐛 Bug Reports**: [GitHub Issues](https://github.com/adrenolitik/Synthetic-virtual-patients/issues)
- **💡 Feature Requests**: [GitHub Discussions](https://github.com/adrenolitik/Synthetic-virtual-patients/discussions)
- **📖 Documentation**: [Wiki Pages](https://github.com/adrenolitik/Synthetic-virtual-patients/wiki)

### Professional Support
For institutional deployments and custom integrations, please contact the development team through GitHub issues or discussions.

---

<div align="center">

**🎭 Ready to transform medical education? [Get Started Today!](#quick-start)**

[![GitHub Stars](https://img.shields.io/github/stars/adrenolitik/Synthetic-virtual-patients?style=social)](https://github.com/adrenolitik/Synthetic-virtual-patients/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/adrenolitik/Synthetic-virtual-patients?style=social)](https://github.com/adrenolitik/Synthetic-virtual-patients/network/members)

*Empowering healthcare providers with AI-enhanced communication training*

</div>
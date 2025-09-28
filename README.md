---
title: Synthetic Patients AI - Medical Education Platform
emoji: 🏥
colorFrom: blue
colorTo: purple
sdk: static
pinned: false
license: mit
---

# 🏥 Synthetic Patients AI - Advanced Medical Education Platform

**An advanced multimodal AI platform for simulating difficult medical conversations, based on cutting-edge research in medical education.**

> **Research Foundation:** This implementation is based on the paper *"Synthetic Patients: Simulating Difficult Conversations with Multimodal Generative AI for Medical Education"* by Simon N. Chu, MD, MS and Alex J. Goodell, MD, MS.

## 🎯 Overview

This platform revolutionizes medical education by providing realistic, interactive AI-powered patient simulations for training healthcare providers in difficult conversations including end-of-life care, cancer diagnosis delivery, mental health assessments, and more.

## ✨ Key Features

### 🎭 Advanced Patient Simulations
- **Realistic AI Patients**: Four detailed patient personas with comprehensive medical histories, cultural backgrounds, and psychological profiles
- **Difficult Conversation Scenarios**: End-of-life discussions, cancer diagnosis, mental health assessments, substance use counseling
- **Cultural Diversity**: Patients from diverse ethnic backgrounds with authentic belief systems and communication styles
- **Psychological Realism**: Each patient has unique personality traits, coping mechanisms, and emotional responses

### 🏥 Medical Education Framework
- **Evidence-Based Learning Objectives**: Structured curriculum based on medical education best practices
- **Real-Time Feedback**: AI-powered analysis of communication skills including empathy, clarity, and appropriateness
- **Performance Analytics**: Detailed tracking of learning progress and skill development
- **Educational Assessment**: Comprehensive evaluation system for medical training programs

### 🤖 Advanced AI Integration
- **Multimodal Conversation Engine**: Text-based conversations with planned voice and video integration
- **Natural Language Processing**: Sophisticated understanding of medical terminology and patient concerns
- **Contextual Responses**: Patient responses adapt based on provider communication style and approach
- **Educational Intelligence**: AI system designed specifically for medical education outcomes

### 💻 Modern Platform Features
- **Responsive Web Interface**: Works seamlessly on desktop, tablet, and mobile devices
- **Real-Time Simulation**: Interactive patient conversations with immediate feedback
- **Session Recording**: Complete conversation logs for review and assessment
- **Export Capabilities**: Download session data for curriculum integration
- **Containerized Deployment**: Docker-ready for easy institutional deployment

## 🚀 Quick Start

### 🌐 Online Demo
- **Main Platform**: [Hugging Face Space](https://huggingface.co/spaces/alexgoodell/synthetic-patients)
- **Advanced Simulation**: [Direct Simulation Interface](https://huggingface.co/spaces/alexgoodell/synthetic-patients/simulation.html)

### 💻 Local Development
```bash
# Clone the repository
git clone https://huggingface.co/spaces/alexgoodell/synthetic-patients
cd synthetic-patients

# Install dependencies
npm install

# Start development server (with live reload)
npm run dev

# Or start production server
npm start
```

**Access Points:**
- Main Platform: `http://localhost:3000`
- Advanced Simulation: `http://localhost:3000/simulation.html`
- Test Suite: `http://localhost:3000/tests/test_patients.html`

### 🐳 Docker Deployment
```bash
# Quick start with Docker
docker build -t synthetic-patients-ai .
docker run -p 3000:3000 synthetic-patients-ai

# Full stack with Docker Compose
docker-compose up -d
```

## 📋 Generated Data

Each synthetic patient includes:

- **Personal Information**: Name, age, gender, date of birth
- **Contact Details**: Phone, email, address
- **Medical History**: Conditions, medications, allergies
- **Vital Signs**: Heart rate, blood pressure, temperature, etc.
- **Insurance Information**: Provider and policy details
- **Visit History**: Last visit date and medical timeline

## 🛠️ Development

### Project Structure
```
├── index.html              # Main application
├── style.css              # Styling
├── app.js                 # Core logic
├── package.json           # Dependencies
├── DEVELOPMENT.md         # Development guide
└── tests/                 # Test suite
    └── test_patients.html
```

### Development Scripts
- `npm run serve` - Start development server
- `npm run python-serve` - Alternative Python server
- `npm run build` - Build for production
- `npm run test` - Run tests

### Testing
Open `/tests/test_patients.html` in your browser to run the test suite, which validates:
- Patient ID generation and uniqueness
- Age range filtering accuracy  
- Data structure consistency
- Performance benchmarks

## 📦 Export Formats

### JSON Format
```json
{
  "id": "PT-ABC123DEF",
  "firstName": "John",
  "lastName": "Doe", 
  "age": 45,
  "gender": "Male",
  "medicalHistory": {
    "conditions": ["Hypertension"],
    "medications": ["Lisinopril"]
  },
  "vitalSigns": {
    "heartRate": 72,
    "bloodPressure": "120/80"
  }
}
```

### CSV Format
Includes all patient fields in a spreadsheet-compatible format for analysis in Excel, R, Python pandas, etc.

## 🔧 Customization

The application can be easily customized by modifying the data arrays in `app.js`:

```javascript
// Add new medical conditions
MEDICAL_CONDITIONS.push('New Condition');

// Add new medications  
MEDICATIONS.push('New Medicine');

// Modify age generation logic
function generateAge(ageRange) {
  // Custom age generation logic
}
```

## 🎯 Use Cases

- **Healthcare Research**: Generate test datasets for medical studies
- **Software Testing**: Create realistic test data for healthcare applications
- **Training & Education**: Provide sample patients for medical training
- **Database Seeding**: Populate development databases with realistic data
- **HIPAA Compliance Testing**: Use synthetic data instead of real patient information

## 🔒 Privacy & Compliance

This generator creates **entirely synthetic data** - no real patient information is used or stored. All generated patients are fictional and designed for:

- ✅ HIPAA-compliant testing environments
- ✅ Research and development purposes  
- ✅ Educational and training scenarios
- ✅ Software testing and validation

## 📚 Documentation

- [Development Guide](DEVELOPMENT.md) - Detailed setup and customization instructions
- [Test Suite](tests/test_patients.html) - Automated functionality tests
- [Hugging Face Spaces Docs](https://huggingface.co/docs/hub/spaces) - Platform documentation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run the test suite
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🔗 Links

- [Live Demo](https://huggingface.co/spaces/alexgoodell/synthetic-patients)
- [Source Code](https://huggingface.co/spaces/alexgoodell/synthetic-patients/tree/main)
- [Issue Tracker](https://huggingface.co/spaces/alexgoodell/synthetic-patients/discussions)

---

*Generate synthetic patients responsibly. Always use synthetic data for testing and development instead of real patient information.*

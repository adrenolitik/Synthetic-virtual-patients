---
title: Synthetic Patients Generator
emoji: 🏥
colorFrom: blue
colorTo: purple
sdk: static
pinned: false
license: mit
---

# 🏥 Synthetic Patients Generator

A web application for generating realistic synthetic patient data for healthcare research, testing, and development purposes.

## ✨ Features

- 👥 **Generate Realistic Patients**: Create synthetic patient records with comprehensive medical profiles
- 🎯 **Age Range Filtering**: Generate pediatric (0-17), adult (18-64), elderly (65+), or all age patients
- 📊 **Batch Generation**: Create 1-100 patients at once
- 💾 **Multiple Export Formats**: Download data as JSON or CSV
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices
- 🔄 **Live Development**: Real-time updates during development

## 🚀 Quick Start

### Online Demo
Visit the [Hugging Face Space](https://huggingface.co/spaces/alexgoodell/synthetic-patients) to try it immediately.

### Local Development
```bash
# Clone the repository
git clone https://huggingface.co/spaces/alexgoodell/synthetic-patients
cd synthetic-patients

# Install dependencies
npm install

# Start development server
npm run serve
```

Open your browser to `http://localhost:3000` to see the application.

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

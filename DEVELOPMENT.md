# 🏥 Synthetic Patients Generator - Development Guide

A web application for generating realistic synthetic patient data for healthcare research, testing, and development purposes.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm (v7 or higher)
- Modern web browser
- Python 3.x (optional, for alternative server)

### Getting Started
```bash
# Clone the repository
git clone https://huggingface.co/spaces/alexgoodell/synthetic-patients
cd synthetic-patients

# Install dependencies
npm install

# Start development server
npm run dev
# or
npm run serve

# Alternative: Use Python server
npm run python-serve
```

## 📦 Project Structure

```
synthetic-patients/
├── index.html              # Main application HTML
├── style.css              # Styling and responsive design
├── app.js                 # Core application logic
├── package.json           # Node.js dependencies and scripts
├── .gitignore            # Git ignore rules
├── .editorconfig         # Editor configuration
├── README.md             # Project documentation
├── DEVELOPMENT.md        # This development guide
└── tests/
    └── test_patients.html # Test suite for functionality
```

## 🛠️ Development Scripts

| Script | Command | Description |
|--------|---------|-------------|
| Development Server | `npm run dev` | Start live-reload server on port 3000 |
| Serve | `npm run serve` | Start server without auto-open |
| Python Server | `npm run python-serve` | Alternative Python HTTP server on port 8000 |
| Build | `npm run build` | Build step (currently static files) |
| Test | `npm run test` | Run tests (placeholder) |

## 🔧 Development Environment

### Live Server Configuration
- **Port**: 3000
- **Host**: 0.0.0.0 (accessible externally)
- **Auto-reload**: Enabled for file changes
- **Watch**: All files in project directory

### Development Features
- 🔄 **Live Reload**: Automatic browser refresh on file changes
- 🎨 **CSS Hot Reload**: Instant style updates
- 📱 **Responsive Design**: Mobile-first approach
- 🚀 **Development Indicator**: Visual indicator in top-right
- 🐛 **Debug Mode**: Console logging for development

## 📋 Application Features

### Core Functionality
- **Patient Generation**: Creates synthetic patient records
- **Age Range Filtering**: Pediatric, Adult, Elderly, or All ages
- **Batch Generation**: 1-100 patients at once
- **Export Options**: JSON and CSV formats
- **Realistic Data**: Names, contact info, medical history, vital signs

### Generated Patient Data
```javascript
{
  id: "PT-ABC123DEF",
  firstName: "John",
  lastName: "Doe",
  fullName: "John Doe",
  age: 45,
  gender: "Male",
  dateOfBirth: "1978-06-15",
  contactInfo: {
    phone: "(555) 123-4567",
    email: "john.doe@email.com",
    address: "123 Main St"
  },
  medicalHistory: {
    conditions: ["Hypertension", "Type 2 Diabetes"],
    medications: ["Lisinopril", "Metformin"],
    allergies: ["Penicillin"]
  },
  vitalSigns: {
    heartRate: 72,
    bloodPressure: "120/80",
    temperature: "36.5",
    respiratoryRate: 16,
    oxygenSaturation: 98
  },
  insurance: {
    provider: "Blue Cross",
    policyNumber: "POL-XYZ789ABC"
  },
  lastVisit: "2024-03-15",
  created: "2024-09-28T15:30:00.000Z"
}
```

## 🧪 Testing

### Test Suite
Located at `/tests/test_patients.html` - open in browser to run tests.

**Test Coverage:**
- ✅ Patient ID Generation (format and uniqueness)
- ✅ Age Range Generation (pediatric, adult, elderly)
- ✅ Name Generation (from predefined lists)
- ✅ Random Number Generation (range and variety)
- ✅ Data Consistency (structure validation)
- ✅ Performance (generation speed benchmarks)

### Manual Testing
1. **Generate Patients**: Test different counts and age ranges
2. **Export Functions**: Verify JSON and CSV downloads
3. **Responsive Design**: Test on different screen sizes
4. **Data Validation**: Check generated data for realism

### Browser Console Testing
```javascript
// Test patient generation in console
const testPatient = generateSyntheticPatient('adult');
console.log(testPatient);

// Test batch generation
const patients = [];
for(let i = 0; i < 5; i++) {
  patients.push(generateSyntheticPatient('all'));
}
console.log(patients);
```

## 🎨 Customization

### Adding New Data Sources
```javascript
// In app.js, extend the arrays:
const NEW_CONDITIONS = ['Condition1', 'Condition2'];
MEDICAL_CONDITIONS.push(...NEW_CONDITIONS);

const NEW_MEDICATIONS = ['Medicine1', 'Medicine2'];  
MEDICATIONS.push(...NEW_MEDICATIONS);
```

### Styling Modifications
- Edit `style.css` for visual changes
- CSS variables available for consistent theming
- Responsive breakpoints at 768px

### Adding New Features
1. Add UI elements to `index.html`
2. Implement logic in `app.js`
3. Add corresponding styles in `style.css`
4. Create tests for new functionality

## 🔍 Debugging

### Development Tools
- **Browser DevTools**: F12 to inspect elements and console
- **Network Tab**: Monitor any external requests
- **Console Logging**: Extensive logging in development mode
- **Live Reload**: Automatic refresh on file changes

### Common Issues
1. **Server not starting**: Check if port 3000 is available
2. **No patients generated**: Check console for JavaScript errors
3. **Export not working**: Verify browser allows downloads
4. **Styles not loading**: Check CSS file path and syntax

### Debug Mode
```javascript
// Enable debug mode in console
localStorage.setItem('debug', 'true');
location.reload();

// Disable debug mode
localStorage.removeItem('debug');
location.reload();
```

## 🚀 Deployment

### Static Hosting
The application is a client-side static application that can be deployed to:
- **Hugging Face Spaces** (current hosting)
- **GitHub Pages**
- **Netlify** 
- **Vercel**
- **AWS S3 + CloudFront**

### Build Process
Currently no build step required - deploy files directly:
```bash
# Files to deploy:
├── index.html
├── style.css
├── app.js
└── (optional) tests/
```

### Environment Variables
No server-side environment variables needed for basic functionality.

## 📚 API Reference

### Core Functions

#### `generateSyntheticPatient(ageRange)`
Generates a single synthetic patient.
- **Parameters**: `ageRange` - 'pediatric', 'adult', 'elderly', or 'all'
- **Returns**: Patient object with complete medical profile

#### `generatePatientId()`
Creates unique patient identifier.
- **Returns**: String in format 'PT-XXXXXXXXX'

#### `exportToJSON()` / `exportToCSV()`
Export generated patients in specified format.
- **Side Effect**: Downloads file to user's device

### Data Validation
All generated data includes:
- ✅ Unique patient IDs
- ✅ Age-appropriate vital signs
- ✅ Realistic contact information
- ✅ Medical history consistency
- ✅ Insurance information

## 🤝 Contributing

### Development Workflow
1. **Setup**: Clone repo and install dependencies
2. **Develop**: Make changes with live reload
3. **Test**: Run test suite and manual testing  
4. **Document**: Update this guide if needed
5. **Deploy**: Push changes for automatic deployment

### Code Style
- **JavaScript**: ES6+ syntax, camelCase naming
- **CSS**: BEM-like methodology, mobile-first
- **HTML**: Semantic HTML5 elements
- **Indentation**: 2 spaces for JS/CSS/HTML

### Git Workflow
```bash
# Make changes
git add .
git commit -m "feat: add new patient field"
git push origin main
```

## 📞 Support

### Resources
- [Hugging Face Spaces Documentation](https://huggingface.co/docs/hub/spaces)
- [MDN Web Docs](https://developer.mozilla.org/)
- [JavaScript Reference](https://javascript.info/)

### Contact
- Open issues on the repository
- Check existing documentation
- Review test cases for expected behavior

---

## 📈 Roadmap

### Planned Features
- [ ] **Advanced Medical Conditions**: More detailed condition modeling
- [ ] **Drug Interactions**: Medication compatibility checking  
- [ ] **Family History**: Genetic predisposition modeling
- [ ] **Lab Results**: Synthetic laboratory values
- [ ] **Imaging Data**: Reference to synthetic medical images
- [ ] **API Integration**: REST API for programmatic access
- [ ] **Database Storage**: Persistent patient records
- [ ] **User Authentication**: Multi-user support
- [ ] **Templates**: Predefined patient archetypes
- [ ] **Bulk Operations**: Large-scale data generation

### Technical Improvements
- [ ] **TypeScript**: Type safety and better IDE support
- [ ] **Unit Tests**: Comprehensive automated testing
- [ ] **Build Pipeline**: Optimization and bundling
- [ ] **PWA Features**: Offline functionality
- [ ] **Performance**: Optimizations for large datasets

---

*Last updated: September 28, 2024*
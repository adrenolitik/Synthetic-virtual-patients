// Synthetic Patients Generator - JavaScript
console.log('🏥 Synthetic Patients Generator - Development Mode');

// Development indicator
document.addEventListener('DOMContentLoaded', () => {
  // Add development indicator
  const devIndicator = document.createElement('div');
  devIndicator.className = 'dev-indicator';
  devIndicator.textContent = '🚀 DEV MODE';
  document.body.appendChild(devIndicator);
  
  // Initialize the application
  init();
});

// Sample data for generating synthetic patients
const FIRST_NAMES = [
  'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda',
  'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica',
  'Thomas', 'Sarah', 'Christopher', 'Karen', 'Charles', 'Nancy', 'Daniel', 'Lisa',
  'Matthew', 'Helen', 'Anthony', 'Sandra', 'Mark', 'Donna', 'Donald', 'Carol'
];

const LAST_NAMES = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas',
  'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White',
  'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young'
];

const MEDICAL_CONDITIONS = [
  'Hypertension', 'Type 2 Diabetes', 'Asthma', 'Arthritis', 'Depression',
  'Anxiety', 'Migraine', 'COPD', 'Heart Disease', 'Allergies',
  'Osteoporosis', 'Insomnia', 'GERD', 'Hypothyroidism', 'Anemia'
];

const MEDICATIONS = [
  'Lisinopril', 'Metformin', 'Albuterol', 'Ibuprofen', 'Sertraline',
  'Omeprazole', 'Levothyroxine', 'Amlodipine', 'Metoprolol', 'Aspirin',
  'Atorvastatin', 'Losartan', 'Gabapentin', 'Hydrochlorothiazide', 'Prednisone'
];

// State management
let generatedPatients = [];

// Utility functions
function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDate(startYear, endYear) {
  const start = new Date(startYear, 0, 1);
  const end = new Date(endYear, 11, 31);
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

// Patient generation functions
function generatePatientId() {
  return 'PT-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

function generateAge(ageRange) {
  switch (ageRange) {
    case 'pediatric':
      return getRandomNumber(0, 17);
    case 'adult':
      return getRandomNumber(18, 64);
    case 'elderly':
      return getRandomNumber(65, 95);
    default:
      return getRandomNumber(1, 95);
  }
}

function generateVitalSigns(age) {
  // Age-appropriate vital signs
  const baseHR = age < 18 ? getRandomNumber(80, 120) : getRandomNumber(60, 100);
  const baseBP_sys = age < 18 ? getRandomNumber(95, 115) : getRandomNumber(110, 140);
  const baseBP_dia = age < 18 ? getRandomNumber(55, 75) : getRandomNumber(70, 90);
  
  return {
    heartRate: baseHR + getRandomNumber(-10, 10),
    bloodPressure: `${baseBP_sys + getRandomNumber(-15, 25)}/${baseBP_dia + getRandomNumber(-10, 15)}`,
    temperature: (36.1 + Math.random() * 1.4).toFixed(1), // 36.1-37.5°C
    respiratoryRate: age < 18 ? getRandomNumber(18, 30) : getRandomNumber(12, 20),
    oxygenSaturation: getRandomNumber(95, 100)
  };
}

function generateSyntheticPatient(ageRange = 'all') {
  const firstName = getRandomElement(FIRST_NAMES);
  const lastName = getRandomElement(LAST_NAMES);
  const age = generateAge(ageRange);
  const gender = Math.random() > 0.5 ? 'Male' : 'Female';
  const birthDate = new Date();
  birthDate.setFullYear(birthDate.getFullYear() - age);
  
  // Generate medical history
  const numConditions = getRandomNumber(0, 3);
  const conditions = [];
  const medications = [];
  
  for (let i = 0; i < numConditions; i++) {
    const condition = getRandomElement(MEDICAL_CONDITIONS);
    if (!conditions.includes(condition)) {
      conditions.push(condition);
      // Add related medication
      medications.push(getRandomElement(MEDICATIONS));
    }
  }
  
  const patient = {
    id: generatePatientId(),
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
    age,
    gender,
    dateOfBirth: formatDate(birthDate),
    contactInfo: {
      phone: `(${getRandomNumber(200, 999)}) ${getRandomNumber(200, 999)}-${getRandomNumber(1000, 9999)}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`,
      address: `${getRandomNumber(100, 9999)} ${getRandomElement(['Main', 'Oak', 'First', 'Second', 'Park', 'Elm', 'Pine'])} St`
    },
    medicalHistory: {
      conditions: conditions,
      medications: medications,
      allergies: Math.random() > 0.7 ? [getRandomElement(['Penicillin', 'Peanuts', 'Shellfish', 'Latex'])] : []
    },
    vitalSigns: generateVitalSigns(age),
    insurance: {
      provider: getRandomElement(['Blue Cross', 'Aetna', 'Cigna', 'UnitedHealth', 'Medicare', 'Medicaid']),
      policyNumber: `POL-${Math.random().toString(36).substr(2, 12).toUpperCase()}`
    },
    lastVisit: formatDate(getRandomDate(2023, 2024)),
    created: new Date().toISOString()
  };
  
  return patient;
}

// UI Functions
function displayPatients(patients) {
  const container = document.getElementById('patients-container');
  const resultsCard = document.querySelector('.results-card');
  
  if (patients.length === 0) {
    resultsCard.style.display = 'none';
    return;
  }
  
  container.innerHTML = '';
  
  patients.forEach(patient => {
    const patientDiv = document.createElement('div');
    patientDiv.className = 'patient-card';
    patientDiv.innerHTML = `
      <h3>${patient.fullName} (${patient.id})</h3>
      <div class="patient-info">
        <span><strong>Age:</strong> ${patient.age}</span>
        <span><strong>Gender:</strong> ${patient.gender}</span>
        <span><strong>DOB:</strong> ${patient.dateOfBirth}</span>
        <span><strong>Phone:</strong> ${patient.contactInfo.phone}</span>
        <span><strong>Email:</strong> ${patient.contactInfo.email}</span>
        <span><strong>Address:</strong> ${patient.contactInfo.address}</span>
        <span><strong>Conditions:</strong> ${patient.medicalHistory.conditions.join(', ') || 'None'}</span>
        <span><strong>Medications:</strong> ${patient.medicalHistory.medications.join(', ') || 'None'}</span>
        <span><strong>HR:</strong> ${patient.vitalSigns.heartRate} bpm</span>
        <span><strong>BP:</strong> ${patient.vitalSigns.bloodPressure} mmHg</span>
        <span><strong>Temp:</strong> ${patient.vitalSigns.temperature}°C</span>
        <span><strong>Insurance:</strong> ${patient.insurance.provider}</span>
      </div>
    `;
    container.appendChild(patientDiv);
  });
  
  resultsCard.style.display = 'block';
}

function exportToJSON() {
  if (generatedPatients.length === 0) {
    alert('No patients to export. Please generate some patients first.');
    return;
  }
  
  const dataStr = JSON.stringify(generatedPatients, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
  
  const exportFileDefaultName = `synthetic_patients_${new Date().toISOString().split('T')[0]}.json`;
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
}

function exportToCSV() {
  if (generatedPatients.length === 0) {
    alert('No patients to export. Please generate some patients first.');
    return;
  }
  
  const csvHeaders = [
    'ID', 'First Name', 'Last Name', 'Age', 'Gender', 'Date of Birth',
    'Phone', 'Email', 'Address', 'Conditions', 'Medications', 'Allergies',
    'Heart Rate', 'Blood Pressure', 'Temperature', 'Insurance Provider', 'Last Visit'
  ];
  
  const csvRows = generatedPatients.map(patient => [
    patient.id,
    patient.firstName,
    patient.lastName,
    patient.age,
    patient.gender,
    patient.dateOfBirth,
    patient.contactInfo.phone,
    patient.contactInfo.email,
    patient.contactInfo.address,
    patient.medicalHistory.conditions.join('; '),
    patient.medicalHistory.medications.join('; '),
    patient.medicalHistory.allergies.join('; '),
    patient.vitalSigns.heartRate,
    patient.vitalSigns.bloodPressure,
    patient.vitalSigns.temperature,
    patient.insurance.provider,
    patient.lastVisit
  ]);
  
  const csvContent = [csvHeaders, ...csvRows]
    .map(row => row.map(field => `"${field}"`).join(','))
    .join('\n');
  
  const dataUri = 'data:text/csv;charset=utf-8,\uFEFF' + encodeURIComponent(csvContent);
  const exportFileDefaultName = `synthetic_patients_${new Date().toISOString().split('T')[0]}.csv`;
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
}

// Event handlers
function handleGeneratePatients() {
  const patientCount = parseInt(document.getElementById('patient-count').value);
  const ageRange = document.getElementById('age-range').value;
  
  if (patientCount < 1 || patientCount > 100) {
    alert('Please enter a number between 1 and 100');
    return;
  }
  
  console.log(`Generating ${patientCount} patients with age range: ${ageRange}`);
  
  generatedPatients = [];
  for (let i = 0; i < patientCount; i++) {
    generatedPatients.push(generateSyntheticPatient(ageRange));
  }
  
  displayPatients(generatedPatients);
  console.log('Generated patients:', generatedPatients);
}

// Initialize the application
function init() {
  console.log('Initializing Synthetic Patients Generator...');
  
  // Bind event listeners
  const generateBtn = document.getElementById('generate-btn');
  const exportJsonBtn = document.getElementById('export-json-btn');
  const exportCsvBtn = document.getElementById('export-csv-btn');
  
  if (generateBtn) {
    generateBtn.addEventListener('click', handleGeneratePatients);
  }
  
  if (exportJsonBtn) {
    exportJsonBtn.addEventListener('click', exportToJSON);
  }
  
  if (exportCsvBtn) {
    exportCsvBtn.addEventListener('click', exportToCSV);
  }
  
  // Generate some sample patients on load
  document.getElementById('patient-count').value = 3;
  handleGeneratePatients();
  
  console.log('✅ Application initialized successfully!');
}

// Hot reload detection (for development)
if (typeof module !== 'undefined' && module.hot) {
  module.hot.accept();
  console.log('🔥 Hot reload enabled');
}
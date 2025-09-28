// Advanced Synthetic Patients Simulation Interface
console.log('🎭 Loading Advanced Simulation Interface...');

class SimulationInterface {
  constructor() {
    this.currentPatient = null;
    this.conversationEngine = window.advancedConversationEngine;
    this.currentInputMethod = 'text';
    this.isRecording = false;
    this.simulationStartTime = null;
    this.conversationMetrics = {
      totalMessages: 0,
      empathyScore: 0,
      clarityScore: 0,
      appropriatenessScore: 0
    };
    
    this.init();
  }

  init() {
    this.bindEvents();
    this.setupPatientCards();
    this.showSection('patient-selection');
    
    // Generate patient avatars
    this.generatePatientAvatars();
    
    console.log('✅ Simulation Interface Initialized');
  }

  bindEvents() {
    // Navigation
    document.getElementById('back-to-main')?.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
    
    document.getElementById('simulation-help')?.addEventListener('click', () => {
      this.showHelpModal();
    });
    
    // Patient selection
    document.querySelectorAll('.select-patient-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const patientId = e.target.getAttribute('data-patient');
        this.startSimulation(patientId);
      });
    });
    
    // Input method tabs
    document.querySelectorAll('.input-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        const method = e.target.getAttribute('data-tab');
        this.switchInputMethod(method);
      });
    });
    
    // Text input
    document.getElementById('send-text')?.addEventListener('click', () => {
      this.sendTextMessage();
    });
    
    document.getElementById('provider-input')?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendTextMessage();
      }
    });
    
    // Voice input (simulated)
    document.getElementById('voice-record')?.addEventListener('mousedown', () => {
      this.startVoiceRecording();
    });
    
    document.getElementById('voice-record')?.addEventListener('mouseup', () => {
      this.stopVoiceRecording();
    });
    
    document.getElementById('voice-record')?.addEventListener('mouseleave', () => {
      this.stopVoiceRecording();
    });
    
    // Simulation controls
    document.getElementById('pause-sim')?.addEventListener('click', () => {
      this.pauseSimulation();
    });
    
    document.getElementById('restart-sim')?.addEventListener('click', () => {
      this.restartSimulation();
    });
    
    document.getElementById('end-sim')?.addEventListener('click', () => {
      this.endSimulation();
    });
    
    // Summary actions
    document.getElementById('download-summary')?.addEventListener('click', () => {
      this.downloadSummary();
    });
    
    document.getElementById('new-simulation')?.addEventListener('click', () => {
      this.showSection('patient-selection');
    });
    
    document.getElementById('repeat-scenario')?.addEventListener('click', () => {
      if (this.currentPatient) {
        this.startSimulation(this.currentPatient.id);
      }
    });
    
    // Modal controls
    document.querySelector('.close-modal')?.addEventListener('click', () => {
      this.hideHelpModal();
    });
    
    window.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal')) {
        this.hideHelpModal();
      }
    });
  }

  setupPatientCards() {
    // Enhanced patient card setup with dynamic content
    const scenarios = document.querySelectorAll('.scenario-card');
    scenarios.forEach(card => {
      const scenario = card.getAttribute('data-scenario');
      if (PATIENT_SCENARIOS[scenario]) {
        const scenarioData = PATIENT_SCENARIOS[scenario];
        
        // Add hover effects and additional information
        card.addEventListener('mouseenter', () => {
          this.showScenarioPreview(card, scenarioData);
        });
        
        card.addEventListener('mouseleave', () => {
          this.hideScenarioPreview(card);
        });
      }
    });
  }

  generatePatientAvatars() {
    // Generate placeholder avatars for patients
    const patients = {
      'ahmed-al-farsi': {
        avatar: this.generateAvatar('elderly-male-middle-eastern'),
        background: 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImEiIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM2NjdlZWEiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM3NjRiYTIiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0idXJsKCNhKSIvPjx0ZXh0IHg9IjEwMCIgeT0iMTEwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNjAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5BQTwvdGV4dD48L3N2Zz4=)'
      },
      'maria-santos': {
        avatar: this.generateAvatar('elderly-female-latina'),
        background: 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImEiIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNlZDg5MzYiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNkZDZiMjAiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0idXJsKCNhKSIvPjx0ZXh0IHg9IjEwMCIgeT0iMTEwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNjAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5NUzwvdGV4dD48L3N2Zz4=)'
      },
      'james-wilson': {
        avatar: this.generateAvatar('middle-aged-male-african-american'),
        background: 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImEiIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM0Yjc5YTEiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMyYzU0ODIiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0idXJsKCNhKSIvPjx0ZXh0IHg9IjEwMCIgeT0iMTEwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNjAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5KVzwvdGV4dD48L3N2Zz4=)'
      },
      'jennifer-chen': {
        avatar: this.generateAvatar('young-female-asian'),
        background: 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImEiIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM0OGJiNzgiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMyZjg1NWEiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0idXJsKCNhKSIvPjx0ZXh0IHg9IjEwMCIgeT0iMTEwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNjAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5KQzwvdGV4dD48L3N2Zz4=)'
      }
    };
    
    this.patientAvatars = patients;
  }

  generateAvatar(type) {
    // Generate SVG avatar placeholder based on patient type
    const colors = {
      'elderly-male-middle-eastern': '#8B4513',
      'elderly-female-latina': '#D2B48C',
      'middle-aged-male-african-american': '#8B4513',
      'young-female-asian': '#F5DEB3'
    };
    
    return colors[type] || '#4A5568';
  }

  startSimulation(patientId) {
    console.log(`Starting simulation with patient: ${patientId}`);
    
    // Initialize conversation engine with patient
    const response = this.conversationEngine.initializePatient(patientId);
    this.currentPatient = this.conversationEngine.currentPatient;
    this.simulationStartTime = new Date();
    
    // Update UI
    this.showSection('active-simulation');
    this.updatePatientInfo(response.patientInfo);
    this.updateLearningObjectives(response.learningObjectives);
    this.addMessageToHistory('patient', response.message);
    this.updateSuggestedResponses(response.suggestedResponses);
    
    // Set patient avatar
    this.setPatientAvatar(patientId);
    
    // Reset metrics
    this.resetMetrics();
    
    console.log(`Simulation started with ${this.currentPatient.demographics.firstName}`);
  }

  updatePatientInfo(patientInfo) {
    document.getElementById('patient-name').textContent = patientInfo.name;
    document.getElementById('patient-age').textContent = patientInfo.age;
    document.getElementById('patient-diagnosis').textContent = patientInfo.diagnosis;
    document.getElementById('current-scenario').textContent = patientInfo.scenario;
    document.getElementById('patient-emotion').textContent = patientInfo.emotionalState;
    document.getElementById('cultural-factors').textContent = patientInfo.culturalFactors;
    
    // Update concerns list
    const concernsList = document.getElementById('concerns-list');
    concernsList.innerHTML = '';
    patientInfo.primaryConcerns.forEach(concern => {
      const li = document.createElement('li');
      li.textContent = concern;
      concernsList.appendChild(li);
    });
  }

  updateLearningObjectives(objectives) {
    const list = document.getElementById('learning-objectives');
    list.innerHTML = '';
    objectives.forEach(objective => {
      const li = document.createElement('li');
      li.textContent = objective;
      list.appendChild(li);
    });
  }

  setPatientAvatar(patientId) {
    const avatar = this.patientAvatars[patientId];
    if (avatar) {
      const avatarImage = document.getElementById('patient-photo');
      avatarImage.style.backgroundImage = avatar.background;
      avatarImage.style.backgroundColor = avatar.avatar;
    }
  }

  switchInputMethod(method) {
    this.currentInputMethod = method;
    
    // Update tab appearance
    document.querySelectorAll('.input-tab').forEach(tab => {
      tab.classList.remove('active');
    });
    document.querySelector(`[data-tab="${method}"]`).classList.add('active');
    
    // Show appropriate input panel
    document.querySelectorAll('.input-method').forEach(panel => {
      panel.classList.remove('active');
    });
    document.getElementById(`${method}-input-panel`).classList.add('active');
    
    console.log(`Switched to ${method} input method`);
  }

  sendTextMessage() {
    const textarea = document.getElementById('provider-input');
    const message = textarea.value.trim();
    
    if (!message) return;
    
    // Add provider message to history
    this.addMessageToHistory('provider', message);
    
    // Process with conversation engine
    const response = this.conversationEngine.processProviderInput(message);
    
    // Add patient response
    setTimeout(() => {
      this.addMessageToHistory('patient', response.message, response.conversationAnalysis);
      this.updateSuggestedResponses(response.suggestedResponses);
      this.updateFeedback(response.feedback);
      this.updateMetrics(response.conversationAnalysis);
    }, 1000); // Simulate response delay
    
    // Clear input
    textarea.value = '';
    
    // Update conversation metrics
    this.conversationMetrics.totalMessages++;
  }

  startVoiceRecording() {
    if (this.isRecording) return;
    
    this.isRecording = true;
    const btn = document.getElementById('voice-record');
    btn.style.background = 'linear-gradient(135deg, #e53e3e 0%, #c53030 100%)';
    btn.querySelector('.voice-text').textContent = 'Recording...';
    
    // Animate sound waves
    document.querySelectorAll('.sound-wave').forEach(wave => {
      wave.style.animationPlayState = 'running';
    });
    
    // Simulate voice recording (in a real implementation, this would use Web Speech API)
    console.log('🎤 Voice recording started (simulated)');
  }

  stopVoiceRecording() {
    if (!this.isRecording) return;
    
    this.isRecording = false;
    const btn = document.getElementById('voice-record');
    btn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    btn.querySelector('.voice-text').textContent = 'Hold to Record';
    
    // Stop sound wave animation
    document.querySelectorAll('.sound-wave').forEach(wave => {
      wave.style.animationPlayState = 'paused';
    });
    
    // Simulate voice-to-text conversion
    setTimeout(() => {
      const simulatedTranscription = this.getSimulatedVoiceInput();
      document.getElementById('provider-input').value = simulatedTranscription;
      this.sendTextMessage();
    }, 500);
    
    console.log('🎤 Voice recording stopped (simulated)');
  }

  getSimulatedVoiceInput() {
    const sampleInputs = [
      "Hello, how are you feeling today?",
      "Can you tell me more about your concerns?",
      "I understand this must be very difficult for you.",
      "What questions do you have about your condition?",
      "What's most important to you right now?"
    ];
    
    return sampleInputs[Math.floor(Math.random() * sampleInputs.length)];
  }

  addMessageToHistory(speaker, message, analysis = null) {
    const history = document.getElementById('conversation-history');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${speaker}`;
    
    const messageText = document.createElement('div');
    messageText.textContent = message;
    messageDiv.appendChild(messageText);
    
    const messageMeta = document.createElement('div');
    messageMeta.className = 'message-meta';
    messageMeta.textContent = new Date().toLocaleTimeString();
    
    if (analysis && speaker === 'patient') {
      messageMeta.textContent += ` • Empathy: ${analysis.empathy || 0} • Triggers: ${analysis.triggers?.length || 0}`;
    }
    
    messageDiv.appendChild(messageMeta);
    history.appendChild(messageDiv);
    
    // Scroll to bottom
    history.scrollTop = history.scrollHeight;
  }

  updateSuggestedResponses(suggestions) {
    const container = document.getElementById('suggested-responses');
    container.innerHTML = '';
    
    suggestions.forEach(suggestion => {
      const button = document.createElement('button');
      button.className = 'suggested-response';
      button.textContent = suggestion;
      button.addEventListener('click', () => {
        document.getElementById('provider-input').value = suggestion;
        this.switchInputMethod('text');
      });
      container.appendChild(button);
    });
  }

  updateFeedback(feedback) {
    const suggestions = document.getElementById('feedback-suggestions');
    suggestions.innerHTML = '';
    
    // Add strengths
    feedback.strengths?.forEach(strength => {
      const li = document.createElement('li');
      li.textContent = `✅ ${strength}`;
      li.style.color = '#2f855a';
      suggestions.appendChild(li);
    });
    
    // Add improvements
    feedback.improvements?.forEach(improvement => {
      const li = document.createElement('li');
      li.textContent = `📈 ${improvement}`;
      li.style.color = '#d69e2e';
      suggestions.appendChild(li);
    });
    
    // Add communication tips
    feedback.communicationTips?.forEach(tip => {
      const li = document.createElement('li');
      li.textContent = tip;
      suggestions.appendChild(li);
    });
  }

  updateMetrics(analysis) {
    if (analysis) {
      // Update running averages
      this.conversationMetrics.empathyScore = (this.conversationMetrics.empathyScore + (analysis.empathy || 0)) / 2;
      this.conversationMetrics.clarityScore = (this.conversationMetrics.clarityScore + (analysis.informativeness || 0)) / 2;
      this.conversationMetrics.appropriatenessScore = (this.conversationMetrics.appropriatenessScore + (analysis.appropriateness || 0)) / 2;
    }
    
    // Update UI
    document.getElementById('empathy-score').textContent = this.conversationMetrics.empathyScore.toFixed(1);
    document.getElementById('clarity-score').textContent = this.conversationMetrics.clarityScore.toFixed(1);
    document.getElementById('appropriateness-score').textContent = this.conversationMetrics.appropriatenessScore.toFixed(1);
  }

  resetMetrics() {
    this.conversationMetrics = {
      totalMessages: 0,
      empathyScore: 0,
      clarityScore: 0,
      appropriatenessScore: 0
    };
    this.updateMetrics();
  }

  pauseSimulation() {
    console.log('⏸️ Simulation paused');
    // Implementation for pausing simulation
  }

  restartSimulation() {
    if (this.currentPatient) {
      this.startSimulation(this.currentPatient.id);
      console.log('🔄 Simulation restarted');
    }
  }

  endSimulation() {
    this.generateSimulationSummary();
    this.showSection('simulation-summary');
    console.log('⏹️ Simulation ended');
  }

  generateSimulationSummary() {
    const summary = this.conversationEngine.getConversationSummary();
    const duration = this.simulationStartTime ? 
      Math.round((new Date() - this.simulationStartTime) / 1000 / 60) : 0;
    
    // Performance metrics
    const performanceHtml = `
      <div class="metric-item">
        <span class="metric-label">Duration:</span>
        <span class="metric-value">${duration} minutes</span>
      </div>
      <div class="metric-item">
        <span class="metric-label">Total Exchanges:</span>
        <span class="metric-value">${summary.overallAnalysis.totalExchanges}</span>
      </div>
      <div class="metric-item">
        <span class="metric-label">Average Empathy:</span>
        <span class="metric-value">${summary.overallAnalysis.averageEmpathy?.toFixed(1) || '0.0'}</span>
      </div>
      <div class="metric-item">
        <span class="metric-label">Communication Style:</span>
        <span class="metric-value">Professional</span>
      </div>
    `;
    
    document.getElementById('performance-metrics').innerHTML = performanceHtml;
    
    // Learning objectives assessment
    const objectivesHtml = summary.learningObjectives.map(obj => 
      `<div class="objective-item">✅ ${obj}</div>`
    ).join('');
    document.getElementById('objectives-assessment').innerHTML = objectivesHtml;
    
    // Conversation analysis
    const analysisHtml = `
      <div class="analysis-item">
        <strong>Phases Discussed:</strong> ${summary.overallAnalysis.phasesDiscussed?.join(', ') || 'N/A'}
      </div>
      <div class="analysis-item">
        <strong>Emotional States:</strong> ${summary.overallAnalysis.emotionalStatesEncountered?.join(', ') || 'N/A'}
      </div>
      <div class="analysis-item">
        <strong>Patient Response:</strong> Engaged and responsive
      </div>
    `;
    document.getElementById('conversation-analysis').innerHTML = analysisHtml;
    
    // Key learning points
    const learningHtml = `
      <ul>
        <li>Effective use of empathetic language improved patient engagement</li>
        <li>Cultural sensitivity was appropriately demonstrated</li>
        <li>Clear communication of medical information was maintained</li>
        <li>Patient concerns were adequately addressed</li>
      </ul>
    `;
    document.getElementById('learning-points').innerHTML = learningHtml;
  }

  downloadSummary() {
    const summary = this.conversationEngine.getConversationSummary();
    const reportData = {
      patient: summary.patient,
      metrics: this.conversationMetrics,
      conversationHistory: summary.conversationHistory,
      timestamp: new Date().toISOString(),
      duration: this.simulationStartTime ? 
        Math.round((new Date() - this.simulationStartTime) / 1000 / 60) : 0
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `simulation_report_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    console.log('📥 Simulation report downloaded');
  }

  showScenarioPreview(card, scenarioData) {
    // Add preview tooltip or expand card with additional details
    console.log('Showing scenario preview for:', scenarioData.name);
  }

  hideScenarioPreview(card) {
    // Hide preview
  }

  showHelpModal() {
    document.getElementById('help-modal').style.display = 'flex';
  }

  hideHelpModal() {
    document.getElementById('help-modal').style.display = 'none';
  }

  showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.sim-section').forEach(section => {
      section.style.display = 'none';
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.style.display = 'block';
    }
    
    console.log(`Showing section: ${sectionId}`);
  }
}

// Initialize simulation interface when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Add development indicator for simulation page
  const devIndicator = document.createElement('div');
  devIndicator.className = 'dev-indicator';
  devIndicator.textContent = '🎭 SIMULATION MODE';
  devIndicator.style.background = '#48bb78';
  document.body.appendChild(devIndicator);
  
  // Initialize simulation interface
  window.simulationInterface = new SimulationInterface();
  
  console.log('✅ Advanced Synthetic Patients Simulation Ready!');
});

// Export for external access
window.SimulationInterface = SimulationInterface;
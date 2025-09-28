// Conversation Engine Module
// Handles AI-powered patient conversations and responses

class ConversationEngine {
  constructor() {
    this.currentPatient = null;
    this.conversationHistory = [];
    this.isActive = false;
    this.sessionStartTime = null;
    this.messageCount = 0;
    
    // Mock AI responses for development (replace with real API calls)
    this.mockResponses = {
      'ahmed-al-farsi': {
        greeting: "Hello, Doctor. Thank you for seeing me today. I have been looking forward to discussing the details of my surgery.",
        responses: [
          "Yes, I have many questions about the procedure. What are the main risks I should be aware of?",
          "I want to understand how this will affect my ability to take care of myself afterwards.",
          "My daughter is very worried about me. How can I help her understand what we're facing?",
          "In my faith, we believe everything happens for a reason. But I also believe in fighting for life. Is this the right path?",
          "How long will the recovery take? I don't want to be a burden on my family for too long.",
          "What happens if we don't do the surgery? I need to understand all my options."
        ]
      },
      'sarah-martinez': {
        greeting: "Hi Doctor. I'm still trying to process everything you told me about the leukemia. Can you help me understand what this means?",
        responses: [
          "I need to know exactly what type of leukemia this is and what the treatment protocol involves.",
          "Will I be able to finish my PhD program? I'm supposed to defend my thesis in six months.",
          "I'm getting married in a few months. Will I be able to go through with the wedding?",
          "What about having children? Will the treatment affect my fertility?",
          "How do I tell my parents? They've sacrificed so much for my education.",
          "I want to understand the science behind this. What caused my cells to become cancerous?"
        ]
      },
      'robert-thompson': {
        greeting: "Doc, I appreciate you being straight with me. My kids are all wound up about my condition, but I need the facts.",
        responses: [
          "Just give it to me straight. How much time are we talking about here?",
          "My kids can't agree on anything. One wants me to fight, another says let me go in peace. What do you think?",
          "I've been fixing things my whole life, but I can't fix this heart, can I?",
          "Martha and I, we had a good run. Sometimes I wonder if it's time to join her.",
          "I don't want to be hooked up to a bunch of machines. That's not living, that's existing.",
          "What would you do if this was your father? Don't give me the doctor speech, give me the truth."
        ]
      },
      'maya-patel': {
        greeting: "Hi Dr. Smith. My parents are being super protective again, but I want to hear directly from you about my options.",
        responses: [
          "I want to understand what a lung transplant really means. Will I be normal afterwards?",
          "My parents treat me like I'm going to break. I know I'm sick, but I'm still a person with dreams.",
          "I want to go to art college. Is that even possible with everything I'm dealing with?",
          "Sometimes I wonder what it would feel like to breathe normally, without coughing all the time.",
          "I want to help other kids with CF. Maybe through my art, I can show them they're not alone.",
          "How do I balance living my life now versus planning for treatments that might help later?"
        ]
      }
    };
  }

  // Initialize conversation with a patient
  startConversation(patientId) {
    this.currentPatient = window.PatientProfiles.getPatient(patientId);
    if (!this.currentPatient) {
      throw new Error(`Patient ${patientId} not found`);
    }

    this.conversationHistory = [];
    this.isActive = true;
    this.sessionStartTime = new Date();
    this.messageCount = 0;

    console.log(`🎭 Starting conversation with ${this.currentPatient.name}`);
    
    // Return patient's greeting
    const greeting = this.mockResponses[patientId]?.greeting || 
                    "Hello, Doctor. Thank you for seeing me today.";
    
    this.addMessage('patient', greeting);
    return greeting;
  }

  // End current conversation
  endConversation() {
    if (!this.isActive) return;

    const duration = this.getSessionDuration();
    console.log(`🏁 Ending conversation with ${this.currentPatient.name}. Duration: ${duration}`);
    
    this.isActive = false;
    
    // Return session summary
    return {
      patient: this.currentPatient.name,
      duration: duration,
      messageCount: this.messageCount,
      empathyScore: this.calculateEmpathyScore(),
      conversationHistory: this.conversationHistory
    };
  }

  // Process doctor's message and generate patient response
  async processMessage(doctorMessage) {
    if (!this.isActive || !this.currentPatient) {
      throw new Error('No active conversation');
    }

    // Add doctor's message to history
    this.addMessage('doctor', doctorMessage);

    // Generate patient response (mock implementation)
    const patientResponse = await this.generatePatientResponse(doctorMessage);
    
    // Add patient's response to history
    this.addMessage('patient', patientResponse);

    return patientResponse;
  }

  // Generate AI patient response (mock implementation)
  async generatePatientResponse(doctorMessage) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const responses = this.mockResponses[this.currentPatient.id]?.responses || [];
    
    // Simple response selection based on keywords (replace with real AI)
    let selectedResponse = responses[Math.floor(Math.random() * responses.length)];

    // Basic keyword matching to make responses more contextual
    const lowerMessage = doctorMessage.toLowerCase();
    
    if (lowerMessage.includes('risk') || lowerMessage.includes('danger')) {
      selectedResponse = responses.find(r => r.includes('risk')) || selectedResponse;
    } else if (lowerMessage.includes('family') || lowerMessage.includes('loved ones')) {
      selectedResponse = responses.find(r => r.includes('family') || r.includes('daughter') || r.includes('parents')) || selectedResponse;
    } else if (lowerMessage.includes('time') || lowerMessage.includes('how long')) {
      selectedResponse = responses.find(r => r.includes('time') || r.includes('long')) || selectedResponse;
    } else if (lowerMessage.includes('treatment') || lowerMessage.includes('therapy')) {
      selectedResponse = responses.find(r => r.includes('treatment') || r.includes('therapy')) || selectedResponse;
    }

    return selectedResponse;
  }

  // Add message to conversation history
  addMessage(sender, content) {
    const message = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      sender: sender, // 'doctor' or 'patient'
      content: content,
      timestamp: new Date(),
      duration: null // For audio messages
    };

    this.conversationHistory.push(message);
    this.messageCount++;

    // Trigger UI update
    this.updateConversationUI(message);
  }

  // Update conversation UI with new message
  updateConversationUI(message) {
    const conversationLog = document.getElementById('conversation-log');
    if (!conversationLog) return;

    // Remove placeholder if it exists
    const placeholder = conversationLog.querySelector('.log-placeholder');
    if (placeholder) {
      placeholder.remove();
    }

    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `conversation-message message-${message.sender}`;
    messageElement.innerHTML = `
      <div class="message-timestamp">
        ${message.timestamp.toLocaleTimeString()}
      </div>
      <div class="message-content">
        ${message.content}
      </div>
    `;

    conversationLog.appendChild(messageElement);
    
    // Auto-scroll to bottom
    conversationLog.scrollTop = conversationLog.scrollHeight;

    // Update session metrics
    this.updateSessionMetrics();
  }

  // Update session metrics in UI
  updateSessionMetrics() {
    const durationElement = document.getElementById('session-duration');
    const exchangeElement = document.getElementById('exchange-count');
    const empathyElement = document.getElementById('empathy-score');

    if (durationElement) {
      durationElement.textContent = this.getSessionDuration();
    }

    if (exchangeElement) {
      exchangeElement.textContent = Math.floor(this.messageCount / 2);
    }

    if (empathyElement) {
      empathyElement.textContent = this.calculateEmpathyScore().toFixed(1);
    }
  }

  // Calculate session duration
  getSessionDuration() {
    if (!this.sessionStartTime) return '00:00';
    
    const now = new Date();
    const diffMs = now - this.sessionStartTime;
    const diffMins = Math.floor(diffMs / 60000);
    const diffSecs = Math.floor((diffMs % 60000) / 1000);
    
    return `${diffMins.toString().padStart(2, '0')}:${diffSecs.toString().padStart(2, '0')}`;
  }

  // Calculate empathy score (mock implementation)
  calculateEmpathyScore() {
    if (this.conversationHistory.length === 0) return 0;

    // Simple empathy scoring based on conversation patterns
    let score = 5.0; // Base score

    const doctorMessages = this.conversationHistory.filter(m => m.sender === 'doctor');
    
    doctorMessages.forEach(message => {
      const content = message.content.toLowerCase();
      
      // Positive indicators
      if (content.includes('understand') || content.includes('hear')) score += 0.2;
      if (content.includes('feel') || content.includes('emotion')) score += 0.3;
      if (content.includes('support') || content.includes('help')) score += 0.2;
      if (content.includes('family') || content.includes('loved ones')) score += 0.2;
      
      // Negative indicators
      if (content.length < 20) score -= 0.1; // Very short responses
      if (content.includes('just') || content.includes('simply')) score -= 0.1;
    });

    return Math.max(1, Math.min(10, score));
  }

  // Get conversation summary for analytics
  getConversationSummary() {
    return {
      patientId: this.currentPatient?.id,
      patientName: this.currentPatient?.name,
      scenario: this.currentPatient?.conversationScenario?.type,
      startTime: this.sessionStartTime,
      duration: this.getSessionDuration(),
      messageCount: this.messageCount,
      exchangeCount: Math.floor(this.messageCount / 2),
      empathyScore: this.calculateEmpathyScore(),
      isActive: this.isActive,
      conversationHistory: this.conversationHistory
    };
  }

  // Export conversation for analysis
  exportConversation() {
    const summary = this.getConversationSummary();
    const exportData = {
      ...summary,
      exportDate: new Date().toISOString(),
      patientProfile: this.currentPatient
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `conversation_${this.currentPatient.id}_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }
}

// Create global instance
window.ConversationEngine = new ConversationEngine();

// Event listeners for conversation controls
document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('start-consultation');
  const endButton = document.getElementById('end-consultation');

  if (startButton) {
    startButton.addEventListener('click', () => {
      // This will be triggered when a patient scenario is selected
      console.log('Start consultation clicked');
    });
  }

  if (endButton) {
    endButton.addEventListener('click', () => {
      if (window.ConversationEngine.isActive) {
        const summary = window.ConversationEngine.endConversation();
        console.log('Conversation ended:', summary);
        
        // Show summary modal or redirect to analytics
        alert(`Conversation completed!\nDuration: ${summary.duration}\nExchanges: ${summary.messageCount/2}\nEmpathy Score: ${summary.empathyScore.toFixed(1)}/10`);
      }
    });
  }
});

console.log('💬 Conversation Engine module loaded');
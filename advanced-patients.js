// Advanced Synthetic Patients Generator - Based on Research Paper
// "Synthetic Patients: Simulating Difficult Conversations with Multimodal Generative AI"

console.log('🏥 Advanced Synthetic Patients - Medical Education Platform Loading...');

// Enhanced patient data structures based on research findings
const PATIENT_SCENARIOS = {
  'end-of-life': {
    name: 'End-of-Life Discussions',
    description: 'Conversations about goals of care, resuscitation preferences, and terminal diagnoses',
    difficulty: 'high',
    learningObjectives: [
      'Communicate terminal diagnosis with empathy',
      'Discuss goals of care preferences',
      'Navigate family dynamics in decision making',
      'Address emotional responses to prognosis'
    ]
  },
  'cancer-diagnosis': {
    name: 'New Cancer Diagnosis',
    description: 'Initial cancer diagnosis delivery and treatment planning discussions',
    difficulty: 'high',
    learningObjectives: [
      'Deliver difficult diagnosis clearly and compassionately',
      'Explain treatment options and prognosis',
      'Address patient concerns and questions',
      'Plan next steps and follow-up care'
    ]
  },
  'mental-health': {
    name: 'Mental Health Assessment',
    description: 'Sensitive conversations about depression, anxiety, and suicidal ideation',
    difficulty: 'medium',
    learningObjectives: [
      'Screen for mental health conditions',
      'Assess suicide risk appropriately',
      'Provide supportive counseling',
      'Make appropriate referrals'
    ]
  },
  'substance-abuse': {
    name: 'Substance Use Discussions',
    description: 'Conversations about alcohol, drug use, and addiction treatment',
    difficulty: 'medium',
    learningObjectives: [
      'Conduct non-judgmental substance use screening',
      'Motivate behavior change',
      'Discuss treatment options',
      'Address harm reduction strategies'
    ]
  },
  'sexual-health': {
    name: 'Sexual Health Conversations',
    description: 'Discussions about sexual behaviors, STI testing, and reproductive health',
    difficulty: 'medium',
    learningObjectives: [
      'Take sexual history professionally',
      'Discuss STI prevention and testing',
      'Address sexual dysfunction concerns',
      'Provide contraception counseling'
    ]
  },
  'pediatric-abuse': {
    name: 'Suspected Child Abuse',
    description: 'Sensitive conversations with parents/caregivers about suspected abuse',
    difficulty: 'high',
    learningObjectives: [
      'Recognize signs of potential abuse',
      'Conduct sensitive interviews',
      'Maintain child safety as priority',
      'Navigate reporting requirements'
    ]
  }
};

// Comprehensive patient personas based on research methodology
const ADVANCED_PATIENT_PROFILES = [
  {
    id: 'ahmed-al-farsi',
    scenario: 'cancer-diagnosis',
    demographics: {
      firstName: 'Ahmed',
      lastName: 'Al-Farsi',
      age: 68,
      gender: 'Male',
      ethnicity: 'Middle Eastern (Omani)',
      occupation: 'Retired School Principal',
      education: 'Masters in Education',
      languages: ['Arabic', 'English'],
      residenceHistory: 'Moved from Oman to US 5 years ago'
    },
    medicalHistory: {
      chiefComplaint: 'Worsening morning headaches for 3 months',
      diagnosis: 'Glioblastoma multiforme (left cerebral hemisphere)',
      symptoms: ['Morning headaches', 'Mild cognitive changes'],
      priorTreatments: ['PCP consultation', 'Initial headache treatments', 'Brain MRI'],
      recommendedTreatment: 'Surgical resection followed by radiation and chemotherapy',
      prognosis: 'Median survival 15-18 months with treatment'
    },
    psychosocialProfile: {
      personality: 'Thoughtful, analytical, family-oriented, values education',
      copingStyle: 'Information-seeking, collaborative decision-making',
      culturalFactors: 'Islamic faith, family involvement in decisions, respect for medical authority',
      supportSystem: 'Daughter and grandchildren nearby, extended family in Oman',
      concerns: ['Impact on family', 'Quality vs quantity of life', 'Religious considerations'],
      emotionalState: 'Anxious but composed, seeking understanding'
    },
    beliefSystem: {
      religiousAffiliation: 'Islam (Sunni)',
      healthBeliefs: 'Illness as test from Allah, importance of seeking treatment',
      familyValues: 'Strong family bonds, collective decision-making',
      lifePhilosophy: 'Education and family legacy most important',
      deathAndDying: 'Acceptance of Allah\'s will, importance of good death'
    },
    conversationProfile: {
      communicationStyle: 'Polite, respectful, asks thoughtful questions',
      primaryConcerns: ['Treatment burden', 'Time with family', 'Maintaining dignity'],
      typicalQuestions: [
        'What exactly does this surgery involve?',
        'How will this affect my ability to care for my family?',
        'What are the risks if I choose not to have surgery?',
        'How much time do I have to make this decision?'
      ],
      emotionalTriggers: ['Loss of independence', 'Burdening family', 'Unfinished goals'],
      preferredApproach: 'Clear information, family involvement, respect for cultural values'
    }
  },
  {
    id: 'maria-santos',
    scenario: 'end-of-life',
    demographics: {
      firstName: 'Maria',
      lastName: 'Santos',
      age: 74,
      gender: 'Female',
      ethnicity: 'Latina (Mexican-American)',
      occupation: 'Retired Seamstress',
      education: 'High School',
      languages: ['Spanish', 'English'],
      residenceHistory: 'Lived in same community for 45 years'
    },
    medicalHistory: {
      chiefComplaint: 'Advanced heart failure, frequent hospitalizations',
      diagnosis: 'End-stage congestive heart failure, NYHA Class IV',
      symptoms: ['Severe shortness of breath', 'Fatigue', 'Lower extremity edema'],
      priorTreatments: ['Multiple medications', 'Cardiac catheterizations', 'Frequent ER visits'],
      recommendedTreatment: 'Goals of care discussion, palliative care consultation',
      prognosis: 'Limited life expectancy, months not years'
    },
    psychosocialProfile: {
      personality: 'Warm, family-centered, strong-willed, spiritual',
      copingStyle: 'Faith-based coping, family support reliance',
      culturalFactors: 'Catholic faith, familismo (family loyalty), respect for elders',
      supportSystem: 'Large extended family, active church community',
      concerns: ['Being burden to family', 'Dying at home', 'Family financial strain'],
      emotionalState: 'Tired of fighting, ready for peace but worried about family'
    },
    beliefSystem: {
      religiousAffiliation: 'Catholic',
      healthBeliefs: 'God\'s will, suffering has meaning, miracles possible',
      familyValues: 'Family comes first, collective decision-making',
      lifePhilosophy: 'Live for others, faith sustains through hardship',
      deathAndDying: 'Natural part of life, importance of last rites, dying surrounded by family'
    },
    conversationProfile: {
      communicationStyle: 'Warm but reserved about personal feelings, defers to family',
      primaryConcerns: ['Family burden', 'Dying with dignity', 'Spiritual preparation'],
      typicalQuestions: [
        'Will I be a burden to my children?',
        'Can I still die at home?',
        'How will my family manage without me?',
        'Is it wrong to stop fighting?'
      ],
      emotionalTriggers: ['Family distress', 'Loss of independence', 'Spiritual concerns'],
      preferredApproach: 'Include family, respect spiritual beliefs, emphasize comfort'
    }
  },
  {
    id: 'james-wilson',
    scenario: 'mental-health',
    demographics: {
      firstName: 'James',
      lastName: 'Wilson',
      age: 42,
      gender: 'Male',
      ethnicity: 'African American',
      occupation: 'Construction Supervisor',
      education: 'Some College',
      languages: ['English'],
      residenceHistory: 'Urban area, lived there entire life'
    },
    medicalHistory: {
      chiefComplaint: 'Fatigue, trouble sleeping, low mood for 6 months',
      diagnosis: 'Major depressive disorder, moderate',
      symptoms: ['Depressed mood', 'Anhedonia', 'Sleep disturbance', 'Concentration problems'],
      priorTreatments: ['None - first time seeking mental health care'],
      recommendedTreatment: 'Antidepressant medication, therapy referral',
      prognosis: 'Good with treatment, typically improves in 6-8 weeks'
    },
    psychosocialProfile: {
      personality: 'Reserved, self-reliant, skeptical of mental health treatment',
      copingStyle: 'Avoidance, work as distraction, minimal help-seeking',
      culturalFactors: 'Stigma around mental health, masculine ideals of strength',
      supportSystem: 'Wife and two teenage sons, few close friends',
      concerns: ['Being seen as weak', 'Job performance', 'Family stability'],
      emotionalState: 'Frustrated, embarrassed about needing help, hopeless'
    },
    beliefSystem: {
      religiousAffiliation: 'Baptist (not actively practicing)',
      healthBeliefs: 'Should be able to handle problems independently',
      familyValues: 'Provider role, protect family, show strength',
      lifePhilosophy: 'Hard work overcomes obstacles, self-reliance important',
      mentalHealthViews: 'Stigmatized, "weak people need therapy", medication concerns'
    },
    conversationProfile: {
      communicationStyle: 'Brief responses, defensive, minimizes symptoms',
      primaryConcerns: ['Job security', 'Family perception', 'Medication side effects'],
      typicalQuestions: [
        'Do I really need medication for this?',
        'Will this affect my ability to work?',
        'How long will I need to take pills?',
        'What if people find out I\'m seeing a psychiatrist?'
      ],
      emotionalTriggers: ['Judgment about mental health', 'Loss of control', 'Weakness implications'],
      preferredApproach: 'Normalize experience, emphasize functional improvement, respect autonomy'
    }
  },
  {
    id: 'jennifer-chen',
    scenario: 'substance-abuse',
    demographics: {
      firstName: 'Jennifer',
      lastName: 'Chen',
      age: 28,
      gender: 'Female',
      ethnicity: 'Asian American (Chinese)',
      occupation: 'Marketing Manager',
      education: 'MBA',
      languages: ['English', 'Mandarin'],
      residenceHistory: 'Urban professional, moved for career'
    },
    medicalHistory: {
      chiefComplaint: 'Annual physical exam',
      diagnosis: 'Alcohol use disorder, moderate',
      symptoms: ['Hidden drinking', 'Work performance concerns', 'Relationship problems'],
      priorTreatments: ['None - alcohol use not previously disclosed'],
      recommendedTreatment: 'Outpatient treatment program, therapy, possible medication',
      prognosis: 'Good with treatment and sustained motivation'
    },
    psychosocialProfile: {
      personality: 'High-achieving, perfectionist, socially anxious',
      copingStyle: 'Alcohol for stress relief, isolation when struggling',
      culturalFactors: 'High achievement expectations, family honor concerns',
      supportSystem: 'Few close relationships, distant from family',
      concerns: ['Career impact', 'Family shame', 'Loss of control'],
      emotionalState: 'Anxious, ashamed, ambivalent about change'
    },
    beliefSystem: {
      religiousAffiliation: 'Culturally Buddhist, not practicing',
      healthBeliefs: 'Mind over matter, shame around mental health issues',
      familyValues: 'Success and achievement, not bringing shame to family',
      lifePhilosophy: 'Work hard, achieve success, maintain face',
      addictionViews: 'Moral failing, lack of willpower, very stigmatized'
    },
    conversationProfile: {
      communicationStyle: 'Professional, guarded about personal issues, intellectualizes',
      primaryConcerns: ['Career consequences', 'Family finding out', 'Loss of control'],
      typicalQuestions: [
        'Will this go on my medical record?',
        'Can I continue working during treatment?',
        'Is this really an addiction or just stress relief?',
        'What if my family finds out?'
      ],
      emotionalTriggers: ['Judgment', 'Family disappointment', 'Professional consequences'],
      preferredApproach: 'Confidentiality assurance, harm reduction focus, gradual commitment'
    }
  }
];

// Conversation templates and responses based on research methodology
const CONVERSATION_TEMPLATES = {
  greeting: {
    scenarios: {
      'cancer-diagnosis': [
        "Hello, Doctor. Thank you for seeing me today. I've been anxious about this appointment.",
        "Good morning. Dr. Wang told me you'd be explaining more about my condition?",
        "Hi there. I appreciate you taking the time to meet with me about the surgery."
      ],
      'end-of-life': [
        "Hello, Doctor. My family is here with me today - I hope that's okay.",
        "Good afternoon. I've been thinking a lot about what we discussed last time.",
        "Thank you for coming to see me. I know you're very busy."
      ],
      'mental-health': [
        "Hi. I'm not really sure why I'm here... my wife made this appointment.",
        "Hello. This is my first time talking to someone about... personal things.",
        "Good morning. I guess we should talk about how I've been feeling lately."
      ],
      'substance-abuse': [
        "Hi Doctor. This is just a routine checkup, right?",
        "Hello. I filled out those forms, but some questions seemed... personal.",
        "Good morning. I hope we can keep this conversation confidential."
      ]
    }
  },
  responses: {
    diagnosis_questions: {
      'ahmed-al-farsi': [
        "Doctor, I need to understand exactly what this surgery involves. What are the risks?",
        "How will this treatment affect my daily life and my ability to care for my family?",
        "What happens if I choose not to have the surgery? How much time would I have?",
        "I've read some things online about this condition. Is the prognosis as serious as it seems?"
      ],
      'maria-santos': [
        "Doctor, I'm so tired of being in the hospital. Will this ever get better?",
        "I don't want to be a burden to my children. What are my options?",
        "Can I still die at home like I want? What would that require?",
        "Is it wrong of me to want to stop fighting? What does that mean for my family?"
      ]
    },
    emotional_responses: {
      supportive: [
        "Thank you for being so patient with all my questions.",
        "This is a lot to process, but I appreciate your honesty.",
        "I feel better knowing I can trust you with these concerns."
      ],
      anxious: [
        "I'm sorry, I'm just really worried about all of this.",
        "This is overwhelming. Can we go over that again?",
        "I keep thinking about worst-case scenarios. Is that normal?"
      ],
      resistant: [
        "I'm not sure I'm ready to make any decisions yet.",
        "This all seems very drastic. Are there other options?",
        "I need to talk to my family before I can commit to anything."
      ]
    }
  }
};

// Advanced conversation engine based on research findings
class AdvancedConversationEngine {
  constructor() {
    this.currentPatient = null;
    this.conversationHistory = [];
    this.currentPhase = 'greeting'; // greeting, exploration, information, decision, closure
    this.emotionalState = 'neutral';
    this.learningObjectives = [];
  }

  initializePatient(patientId) {
    this.currentPatient = ADVANCED_PATIENT_PROFILES.find(p => p.id === patientId);
    this.learningObjectives = PATIENT_SCENARIOS[this.currentPatient.scenario].learningObjectives;
    this.conversationHistory = [];
    this.currentPhase = 'greeting';
    this.emotionalState = 'neutral';
    
    console.log(`Initialized conversation with ${this.currentPatient.demographics.firstName} ${this.currentPatient.demographics.lastName}`);
    console.log(`Scenario: ${PATIENT_SCENARIOS[this.currentPatient.scenario].name}`);
    
    return this.generateGreeting();
  }

  generateGreeting() {
    const scenario = this.currentPatient.scenario;
    const greetings = CONVERSATION_TEMPLATES.greeting.scenarios[scenario] || 
                     CONVERSATION_TEMPLATES.greeting.scenarios['cancer-diagnosis'];
    
    const greeting = greetings[Math.floor(Math.random() * greetings.length)];
    
    this.conversationHistory.push({
      speaker: 'patient',
      message: greeting,
      timestamp: new Date().toISOString(),
      phase: this.currentPhase,
      emotionalState: this.emotionalState
    });
    
    return {
      message: greeting,
      patientInfo: this.getCurrentPatientContext(),
      suggestedResponses: this.generateSuggestedResponses(),
      learningObjectives: this.learningObjectives
    };
  }

  processProviderInput(input) {
    // Add provider message to history
    this.conversationHistory.push({
      speaker: 'provider',
      message: input,
      timestamp: new Date().toISOString(),
      phase: this.currentPhase
    });

    // Analyze input and determine response
    const analysis = this.analyzeProviderInput(input);
    const response = this.generatePatientResponse(analysis);
    
    // Update conversation state
    this.updateConversationState(analysis);
    
    // Add patient response to history
    this.conversationHistory.push({
      speaker: 'patient',
      message: response.message,
      timestamp: new Date().toISOString(),
      phase: this.currentPhase,
      emotionalState: this.emotionalState,
      analysis: analysis
    });
    
    return {
      message: response.message,
      patientInfo: this.getCurrentPatientContext(),
      suggestedResponses: this.generateSuggestedResponses(),
      conversationAnalysis: analysis,
      learningObjectives: this.learningObjectives,
      feedback: this.generateFeedback(analysis)
    };
  }

  analyzeProviderInput(input) {
    const lowercaseInput = input.toLowerCase();
    
    const analysis = {
      communicationStyle: 'neutral',
      empathy: 0,
      informativeness: 0,
      appropriateness: 0,
      phase: this.detectPhase(lowercaseInput),
      triggers: [],
      strengths: [],
      improvements: []
    };

    // Analyze empathy
    const empathyWords = ['understand', 'feel', 'difficult', 'sorry', 'imagine', 'support'];
    analysis.empathy = empathyWords.filter(word => lowercaseInput.includes(word)).length;
    
    // Analyze informativeness
    if (lowercaseInput.includes('explain') || lowercaseInput.includes('tell me about') || 
        lowercaseInput.includes('what') || lowercaseInput.includes('how')) {
      analysis.informativeness++;
    }
    
    // Check for patient-centered language
    if (lowercaseInput.includes('you') || lowercaseInput.includes('your')) {
      analysis.appropriateness++;
    }
    
    // Detect potential triggers for this patient
    const triggers = this.currentPatient.conversationProfile.emotionalTriggers;
    triggers.forEach(trigger => {
      if (lowercaseInput.includes(trigger.toLowerCase())) {
        analysis.triggers.push(trigger);
      }
    });
    
    return analysis;
  }

  generatePatientResponse(analysis) {
    const patient = this.currentPatient;
    const scenario = patient.scenario;
    
    // Base response on patient personality and current emotional state
    let responseType = 'neutral';
    
    if (analysis.triggers.length > 0) {
      responseType = 'defensive';
      this.emotionalState = 'anxious';
    } else if (analysis.empathy > 1) {
      responseType = 'grateful';
      this.emotionalState = 'trusting';
    } else if (analysis.informativeness > 0) {
      responseType = 'inquisitive';
      this.emotionalState = 'engaged';
    }
    
    // Generate contextual response based on patient profile and scenario
    let message = this.getContextualResponse(responseType);
    
    return { message, type: responseType };
  }

  getContextualResponse(responseType) {
    const patient = this.currentPatient;
    
    const responses = {
      neutral: [
        "I see. Can you tell me more about what that means for me?",
        "That's helpful to know. What should I be expecting next?",
        "I understand. What are my options at this point?"
      ],
      grateful: [
        "Thank you for taking the time to explain this to me.",
        "I really appreciate your honesty and patience.",
        "It means a lot that you're being so thorough with me."
      ],
      defensive: [
        "I'm not sure I'm ready to hear about that right now.",
        "This is a lot to take in. Can we slow down a bit?",
        "I need some time to think about what you're saying."
      ],
      inquisitive: [
        ...patient.conversationProfile.typicalQuestions,
        "What would you recommend if this were your family member?",
        "How much time do I have to make these decisions?"
      ]
    };
    
    const responseArray = responses[responseType] || responses.neutral;
    return responseArray[Math.floor(Math.random() * responseArray.length)];
  }

  detectPhase(input) {
    if (input.includes('hello') || input.includes('hi') || input.includes('good morning')) {
      return 'greeting';
    } else if (input.includes('tell me') || input.includes('explain') || input.includes('what')) {
      return 'information';
    } else if (input.includes('decide') || input.includes('choice') || input.includes('options')) {
      return 'decision';
    } else if (input.includes('feel') || input.includes('understand') || input.includes('support')) {
      return 'exploration';
    }
    return this.currentPhase;
  }

  updateConversationState(analysis) {
    this.currentPhase = analysis.phase || this.currentPhase;
  }

  getCurrentPatientContext() {
    return {
      name: `${this.currentPatient.demographics.firstName} ${this.currentPatient.demographics.lastName}`,
      age: this.currentPatient.demographics.age,
      scenario: PATIENT_SCENARIOS[this.currentPatient.scenario].name,
      diagnosis: this.currentPatient.medicalHistory.diagnosis,
      emotionalState: this.emotionalState,
      phase: this.currentPhase,
      culturalFactors: this.currentPatient.psychosocialProfile.culturalFactors,
      primaryConcerns: this.currentPatient.conversationProfile.primaryConcerns
    };
  }

  generateSuggestedResponses() {
    const suggestions = {
      greeting: [
        "Hello, how are you feeling today?",
        "Thank you for coming in. What brings you here today?",
        "I'm glad we have this time to talk. How can I help you?"
      ],
      information: [
        "Can you tell me more about your concerns?",
        "What questions do you have about your condition?",
        "What would be most helpful for you to know right now?"
      ],
      exploration: [
        "How are you feeling about all of this?",
        "What's most important to you as we think about next steps?",
        "Who else is involved in helping you with these decisions?"
      ],
      decision: [
        "What are your thoughts about the treatment options?",
        "What factors are most important to you in making this decision?",
        "How much time would you like to make this decision?"
      ]
    };
    
    return suggestions[this.currentPhase] || suggestions.information;
  }

  generateFeedback(analysis) {
    const feedback = {
      strengths: [],
      improvements: [],
      communicationTips: []
    };
    
    if (analysis.empathy > 1) {
      feedback.strengths.push("Good use of empathetic language");
    } else {
      feedback.improvements.push("Consider acknowledging the patient's emotions");
    }
    
    if (analysis.informativeness > 0) {
      feedback.strengths.push("Asking appropriate questions");
    }
    
    if (analysis.triggers.length > 0) {
      feedback.improvements.push("Be mindful of patient's emotional triggers");
      feedback.communicationTips.push("Consider addressing patient concerns before providing information");
    }
    
    // Scenario-specific feedback
    const scenario = this.currentPatient.scenario;
    if (scenario === 'cancer-diagnosis') {
      feedback.communicationTips.push("Use clear, simple language when explaining medical information");
    } else if (scenario === 'end-of-life') {
      feedback.communicationTips.push("Allow for silence and emotional processing");
    }
    
    return feedback;
  }

  getConversationSummary() {
    return {
      patient: this.getCurrentPatientContext(),
      conversationHistory: this.conversationHistory,
      learningObjectives: this.learningObjectives,
      overallAnalysis: this.analyzeOverallConversation()
    };
  }

  analyzeOverallConversation() {
    const providerMessages = this.conversationHistory.filter(msg => msg.speaker === 'provider');
    
    return {
      totalExchanges: Math.floor(this.conversationHistory.length / 2),
      averageEmpathy: providerMessages.reduce((sum, msg) => sum + (msg.analysis?.empathy || 0), 0) / providerMessages.length,
      phasesDiscussed: [...new Set(this.conversationHistory.map(msg => msg.phase))],
      emotionalStatesEncountered: [...new Set(this.conversationHistory.map(msg => msg.emotionalState).filter(Boolean))]
    };
  }
}

// Initialize the advanced conversation engine
window.advancedConversationEngine = new AdvancedConversationEngine();

console.log('✅ Advanced Synthetic Patients Engine Loaded Successfully!');
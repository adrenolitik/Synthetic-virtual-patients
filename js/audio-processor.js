// Audio Processor Module
// Handles voice input, text-to-speech, and audio processing

class AudioProcessor {
  constructor() {
    this.isRecording = false;
    this.mediaRecorder = null;
    this.audioStream = null;
    this.recognition = null;
    this.synthesis = window.speechSynthesis;
    
    // Audio settings
    this.settings = {
      sampleRate: 16000,
      channels: 1,
      bitsPerSample: 16
    };

    // Voice profiles for patients
    this.voiceProfiles = {
      'ahmed-al-farsi': {
        rate: 0.9,
        pitch: 0.8,
        volume: 0.9,
        voice: 'male-middle-eastern'
      },
      'sarah-martinez': {
        rate: 1.1,
        pitch: 1.2,
        volume: 0.8,
        voice: 'female-latina'
      },
      'robert-thompson': {
        rate: 0.8,
        pitch: 0.7,
        volume: 0.9,
        voice: 'male-elderly'
      },
      'maya-patel': {
        rate: 1.0,
        pitch: 1.3,
        volume: 0.8,
        voice: 'female-teen'
      }
    };

    this.currentVoiceProfile = null;
  }

  // Initialize audio system
  async initialize() {
    try {
      // Check browser support
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Media devices not supported');
      }

      // Initialize speech recognition
      this.initializeSpeechRecognition();
      
      // Initialize text-to-speech
      this.initializeTextToSpeech();
      
      console.log('🎤 Audio Processor initialized');
      return true;
      
    } catch (error) {
      console.error('Failed to initialize audio:', error);
      this.showAudioError(error.message);
      return false;
    }
  }

  // Initialize speech recognition
  initializeSpeechRecognition() {
    // Check for speech recognition support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      console.warn('Speech recognition not supported');
      return;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.continuous = false;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    this.recognition.onstart = () => {
      console.log('🎤 Speech recognition started');
      this.onRecordingStart();
    };

    this.recognition.onresult = (event) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      this.onSpeechResult(transcript, event.results[event.resultIndex].isFinal);
    };

    this.recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      this.onRecordingError(event.error);
    };

    this.recognition.onend = () => {
      console.log('🎤 Speech recognition ended');
      this.onRecordingEnd();
    };
  }

  // Initialize text-to-speech
  initializeTextToSpeech() {
    if (!this.synthesis) {
      console.warn('Speech synthesis not supported');
      return;
    }

    // Load available voices
    this.loadVoices();
    
    // Update voices when they change
    if (this.synthesis.onvoiceschanged !== undefined) {
      this.synthesis.onvoiceschanged = () => this.loadVoices();
    }
  }

  // Load available voices
  loadVoices() {
    const voices = this.synthesis.getVoices();
    console.log('🔊 Available voices:', voices.length);
    
    // Map voices to patient profiles
    this.mapVoicesToProfiles(voices);
  }

  // Map available voices to patient profiles
  mapVoicesToProfiles(voices) {
    Object.keys(this.voiceProfiles).forEach(patientId => {
      const profile = this.voiceProfiles[patientId];
      
      // Find best matching voice
      let selectedVoice = null;
      
      // Look for gender-appropriate voices
      const genderVoices = voices.filter(voice => {
        const isDesiredGender = profile.voice.includes('male') ? 
          voice.name.toLowerCase().includes('male') || voice.name.toLowerCase().includes('man') :
          voice.name.toLowerCase().includes('female') || voice.name.toLowerCase().includes('woman');
        return isDesiredGender && voice.lang.startsWith('en');
      });
      
      if (genderVoices.length > 0) {
        selectedVoice = genderVoices[0];
      } else {
        // Fallback to any English voice
        selectedVoice = voices.find(voice => voice.lang.startsWith('en'));
      }
      
      profile.voiceObject = selectedVoice;
    });
  }

  // Start voice recording
  async startRecording() {
    if (this.isRecording) return;

    try {
      // Request microphone access
      this.audioStream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });

      // Start speech recognition
      if (this.recognition) {
        this.recognition.start();
      } else {
        // Fallback to basic audio recording
        await this.startBasicRecording();
      }

    } catch (error) {
      console.error('Failed to start recording:', error);
      this.onRecordingError(error.message);
    }
  }

  // Start basic audio recording (fallback)
  async startBasicRecording() {
    this.mediaRecorder = new MediaRecorder(this.audioStream);
    const audioChunks = [];

    this.mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };

    this.mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
      await this.processAudioBlob(audioBlob);
    };

    this.mediaRecorder.start();
    this.isRecording = true;
    this.onRecordingStart();
  }

  // Stop voice recording
  stopRecording() {
    if (!this.isRecording) return;

    if (this.recognition) {
      this.recognition.stop();
    }

    if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
      this.mediaRecorder.stop();
    }

    if (this.audioStream) {
      this.audioStream.getTracks().forEach(track => track.stop());
      this.audioStream = null;
    }

    this.isRecording = false;
  }

  // Process audio blob (for basic recording fallback)
  async processAudioBlob(blob) {
    console.log('🎵 Processing audio blob:', blob.size, 'bytes');
    
    // This would integrate with speech-to-text API
    // For now, simulate transcription
    const mockTranscript = "Doctor's message from audio recording";
    this.onSpeechResult(mockTranscript, true);
  }

  // Convert text to speech for patient responses
  async textToSpeech(text, patientId) {
    if (!this.synthesis || !text) return;

    try {
      const profile = this.voiceProfiles[patientId];
      if (!profile) {
        console.warn(`No voice profile for patient ${patientId}`);
        return;
      }

      // Create speech utterance
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Apply voice settings
      utterance.voice = profile.voiceObject;
      utterance.rate = profile.rate;
      utterance.pitch = profile.pitch;
      utterance.volume = profile.volume;

      // Set up event handlers
      utterance.onstart = () => {
        console.log('🔊 TTS started');
        this.onTTSStart();
      };

      utterance.onend = () => {
        console.log('🔊 TTS ended');
        this.onTTSEnd();
      };

      utterance.onerror = (event) => {
        console.error('TTS error:', event.error);
        this.onTTSError(event.error);
      };

      // Speak the text
      this.synthesis.speak(utterance);
      
      // Estimate duration for UI feedback
      const estimatedDuration = text.length * 50; // Rough estimate
      return estimatedDuration;

    } catch (error) {
      console.error('Text-to-speech failed:', error);
      this.onTTSError(error.message);
    }
  }

  // Stop current speech
  stopSpeech() {
    if (this.synthesis && this.synthesis.speaking) {
      this.synthesis.cancel();
    }
  }

  // Set voice profile for current patient
  setVoiceProfile(patientId) {
    this.currentVoiceProfile = this.voiceProfiles[patientId];
    console.log(`🎭 Voice profile set for ${patientId}`);
  }

  // Event handlers
  onRecordingStart() {
    this.updateMicButton(true);
    document.dispatchEvent(new CustomEvent('recordingStart'));
  }

  onRecordingEnd() {
    this.updateMicButton(false);
    document.dispatchEvent(new CustomEvent('recordingEnd'));
  }

  onRecordingError(error) {
    console.error('Recording error:', error);
    this.updateMicButton(false);
    this.showAudioError(`Recording failed: ${error}`);
  }

  onSpeechResult(transcript, isFinal) {
    console.log('🗣️ Speech result:', transcript, isFinal ? '(final)' : '(interim)');
    
    // Update UI with transcript
    this.updateTranscriptDisplay(transcript, isFinal);
    
    if (isFinal && transcript.trim()) {
      // Process the final transcript
      this.processSpeechInput(transcript.trim());
    }
  }

  onTTSStart() {
    // Start avatar speaking animation
    if (window.AvatarManager) {
      window.AvatarManager.startSpeaking();
    }
    document.dispatchEvent(new CustomEvent('ttsStart'));
  }

  onTTSEnd() {
    // Stop avatar speaking animation
    if (window.AvatarManager) {
      window.AvatarManager.stopSpeaking();
    }
    document.dispatchEvent(new CustomEvent('ttsEnd'));
  }

  onTTSError(error) {
    console.error('TTS error:', error);
    if (window.AvatarManager) {
      window.AvatarManager.resetToIdle();
    }
  }

  // Update microphone button state
  updateMicButton(isRecording) {
    const micButton = document.getElementById('mic-button');
    if (!micButton) return;

    const micIcon = micButton.querySelector('.mic-icon');
    const label = micButton.querySelector('.control-label');

    if (isRecording) {
      micButton.classList.add('active');
      if (micIcon) micIcon.textContent = '🔴';
      if (label) label.textContent = 'Release to Stop';
    } else {
      micButton.classList.remove('active');
      if (micIcon) micIcon.textContent = '🎤';
      if (label) label.textContent = 'Press & Hold to Speak';
    }
  }

  // Update transcript display
  updateTranscriptDisplay(transcript, isFinal) {
    const messageInput = document.getElementById('message-input');
    if (messageInput) {
      messageInput.value = transcript;
      if (isFinal) {
        messageInput.style.backgroundColor = '#f0f9ff';
        setTimeout(() => {
          messageInput.style.backgroundColor = '';
        }, 500);
      }
    }
  }

  // Process speech input
  async processSpeechInput(transcript) {
    try {
      // Send to conversation engine
      if (window.ConversationEngine && window.ConversationEngine.isActive) {
        const response = await window.ConversationEngine.processMessage(transcript);
        
        // Convert response to speech
        if (window.ConversationEngine.currentPatient) {
          const patientId = window.ConversationEngine.currentPatient.id;
          await this.textToSpeech(response, patientId);
        }
      }
    } catch (error) {
      console.error('Failed to process speech input:', error);
      this.showAudioError('Failed to process your message');
    }
  }

  // Show audio error
  showAudioError(message) {
    const statusIndicator = document.getElementById('connection-status');
    if (statusIndicator) {
      const statusText = statusIndicator.querySelector('.status-text');
      const statusDot = statusIndicator.querySelector('.status-dot');
      
      if (statusText) statusText.textContent = `Audio Error: ${message}`;
      if (statusDot) statusDot.style.background = '#e74c3c';
      
      // Reset after 5 seconds
      setTimeout(() => {
        if (statusText) statusText.textContent = 'Ready';
        if (statusDot) statusDot.style.background = '';
      }, 5000);
    }
  }

  // Get audio status
  getStatus() {
    return {
      isRecording: this.isRecording,
      hasRecognition: !!this.recognition,
      hasSynthesis: !!this.synthesis,
      currentVoiceProfile: this.currentVoiceProfile?.voice,
      isSupported: !!(navigator.mediaDevices && this.synthesis)
    };
  }
}

// Create global instance
window.AudioProcessor = new AudioProcessor();

// Initialize when DOM is ready and set up event listeners
document.addEventListener('DOMContentLoaded', async () => {
  await window.AudioProcessor.initialize();
  
  // Set up microphone button
  const micButton = document.getElementById('mic-button');
  if (micButton) {
    // Press and hold functionality
    let holdTimer = null;
    
    const startRecording = () => {
      window.AudioProcessor.startRecording();
    };
    
    const stopRecording = () => {
      window.AudioProcessor.stopRecording();
    };

    // Mouse events
    micButton.addEventListener('mousedown', (e) => {
      e.preventDefault();
      startRecording();
    });
    
    micButton.addEventListener('mouseup', stopRecording);
    micButton.addEventListener('mouseleave', stopRecording);

    // Touch events for mobile
    micButton.addEventListener('touchstart', (e) => {
      e.preventDefault();
      startRecording();
    });
    
    micButton.addEventListener('touchend', (e) => {
      e.preventDefault();
      stopRecording();
    });
  }
  
  // Set up text input button
  const typeButton = document.getElementById('type-button');
  const textInputArea = document.querySelector('.text-input-area');
  
  if (typeButton && textInputArea) {
    typeButton.addEventListener('click', () => {
      const isVisible = textInputArea.style.display !== 'none';
      textInputArea.style.display = isVisible ? 'none' : 'block';
      typeButton.classList.toggle('active', !isVisible);
    });
  }
  
  // Set up send text button
  const sendTextButton = document.getElementById('send-text');
  const messageInput = document.getElementById('message-input');
  
  if (sendTextButton && messageInput) {
    sendTextButton.addEventListener('click', async () => {
      const message = messageInput.value.trim();
      if (message && window.ConversationEngine?.isActive) {
        try {
          const response = await window.ConversationEngine.processMessage(message);
          messageInput.value = '';
          
          // Convert response to speech
          if (window.ConversationEngine.currentPatient) {
            const patientId = window.ConversationEngine.currentPatient.id;
            await window.AudioProcessor.textToSpeech(response, patientId);
          }
        } catch (error) {
          console.error('Failed to send message:', error);
        }
      }
    });
    
    // Send on Enter key
    messageInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendTextButton.click();
      }
    });
  }
});

console.log('🎤 Audio Processor module loaded');
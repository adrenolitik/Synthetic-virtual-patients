// Avatar Manager Module
// Handles avatar display, video generation, and visual patient representation

class AvatarManager {
  constructor() {
    this.currentAvatar = null;
    this.isVideoPlaying = false;
    this.avatarContainer = null;
    this.videoElement = null;
    this.placeholderElement = null;
    
    // Avatar animation states
    this.animationStates = {
      idle: 'idle-breathing',
      speaking: 'lip-sync-speaking', 
      listening: 'attentive-listening',
      thinking: 'contemplative-pause'
    };

    this.currentState = 'idle';
  }

  // Initialize avatar system
  initialize() {
    this.avatarContainer = document.getElementById('patient-avatar');
    this.videoElement = document.getElementById('patient-video');
    this.placeholderElement = this.avatarContainer?.querySelector('.avatar-placeholder');

    if (!this.avatarContainer) {
      console.error('Avatar container not found');
      return false;
    }

    console.log('🎭 Avatar Manager initialized');
    return true;
  }

  // Load patient avatar
  async loadPatientAvatar(patientId) {
    const patient = window.PatientProfiles.getPatient(patientId);
    if (!patient) {
      throw new Error(`Patient ${patientId} not found`);
    }

    this.currentAvatar = patient;
    
    try {
      // Update patient info display
      this.updatePatientInfo(patient);
      
      // Load avatar image/video
      await this.displayAvatar(patient);
      
      // Set initial state
      this.setState('idle');
      
      console.log(`👤 Loaded avatar for ${patient.name}`);
      return true;
      
    } catch (error) {
      console.error('Failed to load patient avatar:', error);
      this.showError('Failed to load patient avatar');
      return false;
    }
  }

  // Display patient avatar
  async displayAvatar(patient) {
    if (!this.avatarContainer) return;

    // Hide placeholder
    if (this.placeholderElement) {
      this.placeholderElement.style.display = 'none';
    }

    // For now, use static images with CSS animations
    // In production, this would load generated videos
    const avatarImage = document.createElement('img');
    avatarImage.src = patient.avatarUrl;
    avatarImage.alt = `${patient.name} Avatar`;
    avatarImage.className = 'avatar-image';
    
    // Add breathing animation
    avatarImage.style.animation = 'breathe 3s ease-in-out infinite';
    
    // Clear container and add avatar
    this.avatarContainer.innerHTML = '';
    this.avatarContainer.appendChild(avatarImage);
    
    // Add CSS for breathing animation if not already present
    this.addAvatarAnimations();
  }

  // Add CSS animations for avatar
  addAvatarAnimations() {
    const styleId = 'avatar-animations';
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .avatar-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: all 0.3s ease;
      }

      @keyframes breathe {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.02); }
      }

      @keyframes speaking {
        0%, 100% { transform: scale(1) rotateY(0deg); }
        25% { transform: scale(1.01) rotateY(1deg); }
        75% { transform: scale(1.01) rotateY(-1deg); }
      }

      @keyframes listening {
        0%, 100% { transform: scale(1) translateY(0); }
        50% { transform: scale(1.005) translateY(-2px); }
      }

      @keyframes thinking {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(0.998); opacity: 0.95; }
      }

      .avatar-state-idle { animation: breathe 4s ease-in-out infinite; }
      .avatar-state-speaking { animation: speaking 1.5s ease-in-out infinite; }
      .avatar-state-listening { animation: listening 2s ease-in-out infinite; }
      .avatar-state-thinking { animation: thinking 3s ease-in-out infinite; }
    `;
    
    document.head.appendChild(style);
  }

  // Update patient information display
  updatePatientInfo(patient) {
    const nameElement = document.getElementById('patient-name');
    const ageElement = document.getElementById('patient-age');
    const diagnosisElement = document.getElementById('patient-diagnosis');

    if (nameElement) {
      nameElement.textContent = patient.name;
    }

    if (ageElement) {
      ageElement.textContent = `${patient.age} years old`;
    }

    if (diagnosisElement) {
      diagnosisElement.textContent = patient.diagnosis;
    }
  }

  // Set avatar animation state
  setState(state) {
    if (!this.avatarContainer) return;
    
    const avatarImage = this.avatarContainer.querySelector('.avatar-image');
    if (!avatarImage) return;

    // Remove previous state classes
    Object.keys(this.animationStates).forEach(s => {
      avatarImage.classList.remove(`avatar-state-${s}`);
    });

    // Add new state class
    avatarImage.classList.add(`avatar-state-${state}`);
    this.currentState = state;

    console.log(`🎭 Avatar state changed to: ${state}`);
  }

  // Animate avatar speaking (when patient is responding)
  startSpeaking() {
    this.setState('speaking');
    this.isVideoPlaying = true;
  }

  // Stop speaking animation
  stopSpeaking() {
    this.setState('idle');
    this.isVideoPlaying = false;
  }

  // Show avatar listening (when doctor is speaking)
  startListening() {
    this.setState('listening');
  }

  // Show avatar thinking (processing response)
  startThinking() {
    this.setState('thinking');
  }

  // Reset avatar to idle state
  resetToIdle() {
    this.setState('idle');
  }

  // Show error state
  showError(message) {
    if (!this.avatarContainer) return;

    this.avatarContainer.innerHTML = `
      <div class="avatar-error">
        <div class="error-icon">⚠️</div>
        <p>${message}</p>
      </div>
    `;
  }

  // Clear current avatar
  clearAvatar() {
    if (!this.avatarContainer) return;

    this.currentAvatar = null;
    this.isVideoPlaying = false;

    // Show placeholder
    this.avatarContainer.innerHTML = `
      <div class="avatar-placeholder">
        <div class="avatar-icon">👤</div>
        <p>Select a patient to begin consultation</p>
      </div>
    `;

    // Clear patient info
    this.updatePatientInfo({
      name: 'No Patient Selected',
      age: '',
      diagnosis: ''
    });
  }

  // Simulate lip-sync animation (mock implementation)
  async simulateLipSync(audioText, duration = 3000) {
    if (!this.currentAvatar) return;

    console.log(`🗣️ Simulating lip-sync for: "${audioText.substring(0, 50)}..."`);
    
    // Start speaking animation
    this.startSpeaking();

    // Simulate lip-sync with random mouth movements
    const lipSyncInterval = setInterval(() => {
      const avatarImage = this.avatarContainer?.querySelector('.avatar-image');
      if (avatarImage) {
        // Simulate slight scale variations for lip movement
        const scale = 1 + (Math.random() * 0.02 - 0.01);
        avatarImage.style.transform = `scale(${scale})`;
      }
    }, 100);

    // Stop after duration
    setTimeout(() => {
      clearInterval(lipSyncInterval);
      this.stopSpeaking();
      
      // Reset transform
      const avatarImage = this.avatarContainer?.querySelector('.avatar-image');
      if (avatarImage) {
        avatarImage.style.transform = '';
      }
    }, duration);
  }

  // Generate patient avatar video (placeholder for future implementation)
  async generateAvatarVideo(patientId, text) {
    console.log(`🎥 Generating avatar video for ${patientId}: "${text}"`);
    
    // This would integrate with services like:
    // - D-ID for lip-syncing
    // - HeyGen for avatar generation  
    // - Runway for video generation
    // - Custom lip-sync models
    
    // For now, return mock video data
    return {
      videoUrl: null, // Would be actual video URL
      duration: text.length * 50, // Estimate duration
      thumbnail: this.currentAvatar?.avatarUrl
    };
  }

  // Get current avatar status
  getStatus() {
    return {
      hasAvatar: !!this.currentAvatar,
      currentPatient: this.currentAvatar?.name,
      isPlaying: this.isVideoPlaying,
      currentState: this.currentState
    };
  }
}

// Avatar Generation Utilities
class AvatarGenerator {
  constructor() {
    this.supportedStyles = ['realistic', 'illustrated', 'cartoon'];
    this.generationPrompts = {
      'ahmed-al-farsi': 'Professional headshot of a 68-year-old Middle Eastern man with kind eyes and slight gray beard, wearing a collared shirt, video call lighting',
      'sarah-martinez': 'Professional headshot of a 24-year-old Latina woman with intelligent expression, wearing casual sweater, modern apartment background',
      'robert-thompson': 'Professional headshot of an 82-year-old Caucasian man with weathered features, wearing button-down shirt, traditional home setting',
      'maya-patel': 'Professional headshot of a 16-year-old South Asian teenage girl with artistic expression, wearing comfortable hoodie, bedroom with art supplies'
    };
  }

  // Generate avatar image (placeholder for AI image generation)
  async generateAvatarImage(patientId, style = 'realistic') {
    console.log(`🎨 Generating ${style} avatar for ${patientId}`);
    
    const prompt = this.generationPrompts[patientId];
    if (!prompt) {
      throw new Error(`No generation prompt for patient ${patientId}`);
    }

    // This would integrate with:
    // - DALL-E 3 for realistic avatars
    // - Midjourney for high-quality images
    // - Stable Diffusion for customizable generation
    
    // Return mock generated image data
    return {
      imageUrl: `generated-avatar-${patientId}-${style}.jpg`,
      prompt: prompt,
      style: style,
      timestamp: new Date().toISOString()
    };
  }

  // Create avatar variations
  async createAvatarVariations(baseImageUrl, count = 3) {
    console.log(`🔄 Creating ${count} avatar variations`);
    
    // Would use image generation APIs to create variations
    const variations = [];
    for (let i = 0; i < count; i++) {
      variations.push({
        imageUrl: `variation-${i}-${baseImageUrl}`,
        variation: i + 1
      });
    }
    
    return variations;
  }
}

// Create global instances
window.AvatarManager = new AvatarManager();
window.AvatarGenerator = new AvatarGenerator();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.AvatarManager.initialize();
});

console.log('👤 Avatar Manager module loaded');
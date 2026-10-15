/**
 * ==============================================================================
 * SOUND ENGINE & AUDIO MANAGER
 * ==============================================================================
 * Supports real MP3 audio files with automated Web Audio API procedural synthesis
 * fallbacks. Works seamlessly without external files or with custom MP3 drops!
 */

class SoundEngine {
  constructor() {
    this.audioCtx = null;
    this.isMuted = false;
    this.soundEnabled = false;
    this.bgMusic = null;
    this.bgGainNode = null;
    this.isPlayingMusic = false;

    // Optional audio file paths (if user adds mp3s to assets)
    this.audioFiles = {
      pop: "/assets/sounds/balloon-pop.mp3",
      whoosh: "/assets/sounds/arrow-whoosh.mp3",
      heartBoom: "/assets/sounds/heart-explosion.mp3",
      unlock: "/assets/sounds/unlock.mp3",
      keyClick: "/assets/sounds/key-click.mp3",
      envelope: "/assets/sounds/envelope.mp3",
      paperRustle: "/assets/sounds/paper.mp3",
      scratch: "/assets/sounds/scratch.mp3",
      shutter: "/assets/sounds/camera-shutter.mp3",
      blow: "/assets/sounds/candle-blow.mp3",
      celebration: "/assets/sounds/final-celebration.mp3",
      starChime: "/assets/sounds/chime.mp3"
    };

    // Preloaded Audio instances
    this.loadedAudios = {};
    this.initAudioContext();
  }

  initAudioContext() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
  }

  async enableAudio() {
    this.soundEnabled = true;
    this.initAudioContext();
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      await this.audioCtx.resume();
    }
    this.startBackgroundMusic();
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.bgGainNode && this.audioCtx) {
      this.bgGainNode.gain.setValueAtTime(this.isMuted ? 0 : 0.25, this.audioCtx.currentTime);
    }
    if (this.bgMusic) {
      this.bgMusic.muted = this.isMuted;
    }
    return this.isMuted;
  }

  // ----------------------------------------------------------------------------
  // BACKGROUND MUSIC GENERATOR / PLAYER
  // ----------------------------------------------------------------------------
  startBackgroundMusic() {
    if (!this.soundEnabled || this.isMuted) return;

    // Try HTML5 Audio first
    try {
      if (!this.bgMusic) {
        this.bgMusic = new Audio("/assets/music/background.mp3");
        this.bgMusic.loop = true;
        this.bgMusic.volume = 0.35;
      }
      const playPromise = this.bgMusic.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          this.isPlayingMusic = true;
        }).catch(() => {
          // Fallback to ambient synthesized dream chords
          this.playSynthesizedAmbientPad();
        });
      }
    } catch (e) {
      this.playSynthesizedAmbientPad();
    }
  }

  playSynthesizedAmbientPad() {
    if (!this.audioCtx || this.isPlayingMusic) return;
    this.isPlayingMusic = true;

    // Dreamy lofi/ambient pentatonic chord loop (Cmaj9 / Fmaj9 / Am7 / Gsus4)
    const chords = [
      [261.63, 329.63, 392.00, 493.88], // C E G B
      [349.23, 440.00, 523.25, 659.25], // F A C E
      [220.00, 261.63, 329.63, 392.00], // A C E G
      [196.00, 293.66, 392.00, 440.00]  // G D G A
    ];

    let currentChord = 0;
    this.bgGainNode = this.audioCtx.createGain();
    this.bgGainNode.gain.setValueAtTime(this.isMuted ? 0 : 0.08, this.audioCtx.currentTime);
    this.bgGainNode.connect(this.audioCtx.destination);

    const playChordStep = () => {
      if (!this.soundEnabled || this.audioCtx.state === 'closed') return;
      const now = this.audioCtx.currentTime;
      const notes = chords[currentChord % chords.length];

      notes.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const noteGain = this.audioCtx.createGain();
        const filter = this.audioCtx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800 + idx * 200, now);

        noteGain.gain.setValueAtTime(0, now);
        noteGain.gain.linearRampToValueAtTime(0.04, now + 1.5);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 5.5);

        osc.connect(filter);
        filter.connect(noteGain);
        noteGain.connect(this.bgGainNode);

        osc.start(now);
        osc.stop(now + 6.0);
      });

      currentChord++;
      setTimeout(playChordStep, 4500);
    };

    playChordStep();
  }

  // ----------------------------------------------------------------------------
  // PROCEDURAL SOUND FX SYNTHESIS
  // ----------------------------------------------------------------------------

  // 1. Balloon POP
  playPop() {
    if (!this.soundEnabled || this.isMuted || !this.audioCtx) return;
    const now = this.audioCtx.currentTime;
    
    // High-pitch burst + quick noise click
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.08);

    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.09);

    // Noise buffer for snap
    this.createNoiseBurst(0.05, 1200, 0.4);
  }

  // 2. Arrow WHOOSH
  playWhoosh() {
    if (!this.soundEnabled || this.isMuted || !this.audioCtx) return;
    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    const filter = this.audioCtx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.exponentialRampToValueAtTime(900, now + 0.25);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.5);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(400, now);
    filter.frequency.linearRampToValueAtTime(2000, now + 0.25);
    filter.frequency.linearRampToValueAtTime(300, now + 0.5);
    filter.Q.setValueAtTime(3, now);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.3, now + 0.2);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.52);
  }

  // 3. Heart BOOM / EXPLOSION
  playHeartBoom() {
    if (!this.soundEnabled || this.isMuted || !this.audioCtx) return;
    const now = this.audioCtx.currentTime;

    // Low sub bass thump
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(35, now + 0.6);

    gain.gain.setValueAtTime(0.7, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.7);

    // Sparkling explosion chimes
    const sparkles = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    sparkles.forEach((freq, idx) => {
      setTimeout(() => this.playChime(freq, 0.4), idx * 60);
    });
  }

  // 4. Lock Keypad Click
  playKeyClick() {
    if (!this.soundEnabled || this.isMuted || !this.audioCtx) return;
    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800 + Math.random() * 150, now);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.05);
  }

  // 5. Passcode Unlock Chimes
  playUnlock() {
    if (!this.soundEnabled || this.isMuted || !this.audioCtx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C E G C
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playChime(freq, 0.6, 0.25), idx * 90);
    });
  }

  // 6. Wrong Passcode Thud / Buzz
  playWrong() {
    if (!this.soundEnabled || this.isMuted || !this.audioCtx) return;
    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.setValueAtTime(110, now + 0.1);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.26);
  }

  // 7. Envelope Open / Paper Rustle
  playEnvelope() {
    if (!this.soundEnabled || this.isMuted || !this.audioCtx) return;
    this.createNoiseBurst(0.18, 2500, 0.2);
    setTimeout(() => {
      this.playChime(880, 0.5, 0.15);
    }, 120);
  }

  // 8. Scratching Sound
  playScratch() {
    if (!this.soundEnabled || this.isMuted || !this.audioCtx) return;
    this.createNoiseBurst(0.04, 3200, 0.12);
  }

  // 9. Camera Shutter Click
  playShutter() {
    if (!this.soundEnabled || this.isMuted || !this.audioCtx) return;
    const now = this.audioCtx.currentTime;
    this.createNoiseBurst(0.06, 4000, 0.35);
    setTimeout(() => {
      this.createNoiseBurst(0.08, 2800, 0.3);
    }, 90);
  }

  // 10. Candle Blow
  playBlow() {
    if (!this.soundEnabled || this.isMuted || !this.audioCtx) return;
    this.createNoiseBurst(0.6, 600, 0.3);
  }

  // 11. Final Celebration Fanfare
  playCelebration() {
    if (!this.soundEnabled || this.isMuted || !this.audioCtx) return;
    const chordSeq = [
      { notes: [523.25, 659.25, 783.99], delay: 0 },       // C Maj
      { notes: [587.33, 739.99, 880.00], delay: 250 },     // D Maj
      { notes: [659.25, 830.61, 987.77], delay: 500 },     // E Maj
      { notes: [783.99, 987.77, 1174.66, 1567.98], delay: 750 } // G Maj High Arp
    ];

    chordSeq.forEach(step => {
      setTimeout(() => {
        step.notes.forEach(f => this.playChime(f, 1.2, 0.25));
      }, step.delay);
    });
  }

  // 12. Generic Helper: Crystal Chime
  playChime(freq, duration = 0.5, volume = 0.2) {
    if (!this.audioCtx || this.isMuted) return;
    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.05);
  }

  // 13. Generic Helper: Filtered Noise Burst
  createNoiseBurst(duration, filterFreq, volume) {
    if (!this.audioCtx || this.isMuted) return;
    const bufferSize = this.audioCtx.sampleRate * duration;
    const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const output = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.audioCtx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(filterFreq, this.audioCtx.currentTime);

    const gain = this.audioCtx.createGain();
    gain.gain.setValueAtTime(volume, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.audioCtx.destination);

    whiteNoise.start();
  }
}

// Global instance
window.soundEngine = new SoundEngine();

/**
 * Modern Web Audio API Procedural Sound Engine
 */

class SoundService {
  private audioCtx: AudioContext | null = null;
  public isMuted: boolean = false;
  public isEnabled: boolean = false;
  private bgMusic: HTMLAudioElement | null = null;

  constructor() {
    // Lazy AudioContext init on first user touch
  }

  public init() {
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
  }

  public async enableAudio() {
    this.isEnabled = true;
    this.init();
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      await this.audioCtx.resume();
    }
    this.playBackgroundAmbience();
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.bgMusic) {
      this.bgMusic.muted = this.isMuted;
    }
    return this.isMuted;
  }

  public playBackgroundAmbience() {
    if (!this.isEnabled || this.isMuted) return;
    try {
      if (!this.bgMusic) {
        this.bgMusic = new Audio('assets/music/background.mp3');
        this.bgMusic.loop = true;
        this.bgMusic.volume = 0.35;
      }
      this.bgMusic.play().catch(() => {
        this.playSynthesizedPad();
      });
    } catch {
      this.playSynthesizedPad();
    }
  }

  private playSynthesizedPad() {
    if (!this.audioCtx) return;
    const chords = [
      [261.63, 329.63, 392.00, 493.88], // C E G B
      [349.23, 440.00, 523.25, 659.25], // F A C E
      [220.00, 261.63, 329.63, 392.00], // A C E G
      [196.00, 293.66, 392.00, 440.00]  // G D G A
    ];
    let chordIdx = 0;

    const loop = () => {
      if (!this.isEnabled || !this.audioCtx || this.audioCtx.state === 'closed') return;
      const now = this.audioCtx.currentTime;
      const notes = chords[chordIdx % chords.length];

      notes.forEach((freq, idx) => {
        if (!this.audioCtx) return;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        const filter = this.audioCtx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(700 + idx * 200, now);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(this.isMuted ? 0 : 0.025, now + 1.5);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 5.5);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(now);
        osc.stop(now + 5.8);
      });

      chordIdx++;
      setTimeout(loop, 4500);
    };

    loop();
  }

  public playPop() {
    if (!this.isEnabled || this.isMuted || !this.audioCtx) return;
    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(650, now);
    osc.frequency.exponentialRampToValueAtTime(90, now + 0.08);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.09);
  }

  public playWhoosh() {
    if (!this.isEnabled || this.isMuted || !this.audioCtx) return;
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
    filter.frequency.linearRampToValueAtTime(2200, now + 0.25);
    filter.frequency.linearRampToValueAtTime(300, now + 0.5);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.25, now + 0.2);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.52);
  }

  public playBowDraw() {
    if (!this.isEnabled || this.isMuted || !this.audioCtx) return;
    const now = this.audioCtx.currentTime;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    const filter = this.audioCtx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.linearRampToValueAtTime(320, now + 0.8);
    osc.frequency.linearRampToValueAtTime(380, now + 1.1);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(350, now);
    filter.frequency.linearRampToValueAtTime(950, now + 0.8);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.4);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.9);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.15);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start(now);
    osc.stop(now + 1.2);
  }

  public playMagicalSparkle() {
    if (!this.isEnabled || this.isMuted || !this.audioCtx) return;
    const notes = [1046.50, 1174.66, 1318.51, 1567.98, 1760.00, 2093.00, 2349.32, 2637.02];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        if (!this.audioCtx || this.isMuted) return;
        const now = this.audioCtx.currentTime;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.09, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.5);
      }, idx * 65);
    });
  }

  public playHeartBoom() {
    if (!this.isEnabled || this.isMuted || !this.audioCtx) return;
    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(35, now + 0.6);

    gain.gain.setValueAtTime(0.6, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.7);

    [523.25, 659.25, 783.99, 1046.50].forEach((f, idx) => {
      setTimeout(() => this.playChime(f, 0.4, 0.15), idx * 60);
    });
  }

  public playClick() {
    if (!this.isEnabled || this.isMuted || !this.audioCtx) return;
    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(900 + Math.random() * 100, now);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.05);
  }

  public playUnlock() {
    if (!this.isEnabled || this.isMuted || !this.audioCtx) return;
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
      setTimeout(() => this.playChime(freq, 0.5, 0.2), idx * 80);
    });
  }

  public playWrong() {
    if (!this.isEnabled || this.isMuted || !this.audioCtx) return;
    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.setValueAtTime(110, now + 0.1);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.24);
  }

  public playEnvelope() {
    this.playChime(880, 0.5, 0.2);
  }

  public playShutter() {
    this.playClick();
    setTimeout(() => this.playClick(), 70);
  }

  public playBlow() {
    this.playChime(440, 0.4, 0.15);
  }

  public playCelebration() {
    if (!this.isEnabled || this.isMuted || !this.audioCtx) return;
    const seq = [
      { f: 523.25, d: 0 },
      { f: 659.25, d: 150 },
      { f: 783.99, d: 300 },
      { f: 1046.50, d: 450 },
      { f: 1318.51, d: 600 }
    ];
    seq.forEach(s => {
      setTimeout(() => this.playChime(s.f, 0.8, 0.25), s.d);
    });
  }

  public playChime(freq: number, duration: number = 0.5, volume: number = 0.2) {
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

  public playKiss() {
    if (!this.isEnabled || this.isMuted || !this.audioCtx) return;
    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
    osc.frequency.exponentialRampToValueAtTime(450, now + 0.16);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.2);
  }

  public playRingReveal() {
    if (!this.isEnabled || this.isMuted || !this.audioCtx) return;
    const chords = [659.25, 880.00, 1046.50, 1318.51];
    chords.forEach((freq, idx) => {
      setTimeout(() => this.playChime(freq, 0.6, 0.2), idx * 80);
    });
  }
}

export const sound = new SoundService();

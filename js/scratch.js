/**
 * ==============================================================================
 * INTERACTIVE TOUCH SCRATCH CARD COMPONENT
 * ==============================================================================
 * Canvas-based scratch mechanic with real-time percentage reveal calculation,
 * particle sparkle feedback, and smooth touch-gesture handling.
 */

class ScratchCard {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.options = Object.assign({
      scratchRadius: 24,
      threshold: 45, // % scratched before auto-reveal
      onComplete: () => {}
    }, options);

    this.canvas = this.container.querySelector("canvas");
    this.ctx = this.canvas ? this.canvas.getContext("2d") : null;
    this.isDrawing = false;
    this.isCompleted = false;
    this.lastPoint = null;

    if (this.canvas) {
      this.init();
    }
  }

  init() {
    this.resizeCanvas();
    this.drawFoil();
    this.bindEvents();
  }

  resizeCanvas() {
    const rect = this.container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = rect.width || 320;
    this.height = rect.height || 180;

    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    this.ctx.scale(dpr, dpr);
  }

  drawFoil() {
    // Beautiful pastel rose-gold holographic gradient
    const grad = this.ctx.createLinearGradient(0, 0, this.width, this.height);
    grad.addColorStop(0, "#ffd1dc");
    grad.addColorStop(0.3, "#fbc4ab");
    grad.addColorStop(0.6, "#ffb5a7");
    grad.addColorStop(1, "#fcd5ce");

    this.ctx.fillStyle = grad;
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Subtle decorative pattern / sparkles on top
    this.ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    for (let i = 0; i < 40; i++) {
      const x = (i * 37) % this.width;
      const y = (i * 23) % this.height;
      this.ctx.beginPath();
      this.ctx.arc(x, y, (i % 3) + 1.5, 0, Math.PI * 2);
      this.ctx.fill();
    }

    // Centered instruction text on foil
    this.ctx.fillStyle = "#843b62";
    this.ctx.font = "bold 15px 'Outfit', sans-serif";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText("✨ SCRATCH TO REVEAL ✨", this.width / 2, this.height / 2 - 10);
    
    this.ctx.fillStyle = "rgba(132, 59, 98, 0.7)";
    this.ctx.font = "12px 'Outfit', sans-serif";
    this.ctx.fillText("Swipe gently with your finger", this.width / 2, this.height / 2 + 15);
  }

  bindEvents() {
    const getPos = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
        screenX: clientX,
        screenY: clientY
      };
    };

    const start = (e) => {
      if (this.isCompleted) return;
      this.isDrawing = true;
      const pos = getPos(e);
      this.lastPoint = pos;
      this.scratch(pos.x, pos.y);
      if (window.soundEngine) window.soundEngine.playScratch();
    };

    const move = (e) => {
      if (!this.isDrawing || this.isCompleted) return;
      e.preventDefault(); // Prevent accidental scroll while scratching
      const pos = getPos(e);
      this.scratchLine(this.lastPoint.x, this.lastPoint.y, pos.x, pos.y);
      this.lastPoint = pos;

      // Trigger sparkle particles at touch point
      if (window.appParticleEngine) {
        window.appParticleEngine.createTouchDust(pos.screenX, pos.screenY, 2);
      }
      if (Math.random() > 0.6 && window.soundEngine) {
        window.soundEngine.playScratch();
      }
    };

    const end = () => {
      if (!this.isDrawing) return;
      this.isDrawing = false;
      this.checkProgress();
    };

    // Touch events
    this.canvas.addEventListener("touchstart", start, { passive: false });
    this.canvas.addEventListener("touchmove", move, { passive: false });
    this.canvas.addEventListener("touchend", end);
    this.canvas.addEventListener("touchcancel", end);

    // Mouse events
    this.canvas.addEventListener("mousedown", start);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", end);
  }

  scratch(x, y) {
    this.ctx.globalCompositeOperation = "destination-out";
    this.ctx.beginPath();
    this.ctx.arc(x, y, this.options.scratchRadius, 0, Math.PI * 2);
    this.ctx.fill();
  }

  scratchLine(x1, y1, x2, y2) {
    this.ctx.globalCompositeOperation = "destination-out";
    this.ctx.lineWidth = this.options.scratchRadius * 2;
    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
  }

  checkProgress() {
    if (this.isCompleted) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.floor(this.canvas.width);
    const h = Math.floor(this.canvas.height);
    const imgData = this.ctx.getImageData(0, 0, w, h);
    const pixels = imgData.data;
    let transparentCount = 0;
    const step = 32; // Fast sample rate

    for (let i = 3; i < pixels.length; i += step * 4) {
      if (pixels[i] < 128) {
        transparentCount++;
      }
    }

    const totalSamples = Math.floor(pixels.length / (step * 4));
    const percent = (transparentCount / totalSamples) * 100;

    if (percent >= this.options.threshold) {
      this.autoReveal();
    }
  }

  autoReveal() {
    this.isCompleted = true;
    this.canvas.style.transition = "opacity 0.8s ease-out";
    this.canvas.style.opacity = "0";
    this.canvas.style.pointerEvents = "none";

    if (window.soundEngine) {
      window.soundEngine.playUnlock();
    }

    const rect = this.canvas.getBoundingClientRect();
    if (window.appParticleEngine) {
      window.appParticleEngine.createHeartExplosion(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
        40
      );
    }

    setTimeout(() => {
      if (this.options.onComplete) {
        this.options.onComplete();
      }
    }, 600);
  }
}

window.ScratchCard = ScratchCard;

/**
 * ==============================================================================
 * PARTICLE & VISUAL FX ENGINE
 * ==============================================================================
 * High-performance HTML5 Canvas physics engine for balloon pops, heart explosions,
 * starry nebulae, confetti celebration, and touch dust.
 */

class ParticleEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    this.particles = [];
    this.stars = [];
    this.ambientHearts = [];
    this.animationFrameId = null;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    
    this.resize();
    window.addEventListener("resize", () => this.resize());
    this.startLoop();
  }

  resize() {
    if (!this.canvas) return;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);
  }

  startLoop() {
    const loop = () => {
      this.update();
      this.render();
      this.animationFrameId = requestAnimationFrame(loop);
    };
    loop();
  }

  // ----------------------------------------------------------------------------
  // 1. BALLOON POP BURST
  // ----------------------------------------------------------------------------
  createBalloonPop(x, y, color = "#ff6b8b", count = 35) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 2;
      const size = Math.random() * 6 + 2;
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: size,
        color: color,
        alpha: 1,
        decay: Math.random() * 0.02 + 0.015,
        gravity: 0.15,
        drag: 0.96,
        type: Math.random() > 0.4 ? "circle" : "heart",
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.2
      });
    }
  }

  // ----------------------------------------------------------------------------
  // 2. GIANT HEART EXPLOSION
  // ----------------------------------------------------------------------------
  createHeartExplosion(centerX, centerY, count = 120) {
    const colors = ["#ff3366", "#ff69b4", "#ff9bb2", "#ffccd5", "#ffd700", "#ffffff"];
    for (let i = 0; i < count; i++) {
      // Create heart-shaped parametric spread or radial blast
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 12 + 3;
      const size = Math.random() * 10 + 4;
      const color = colors[Math.floor(Math.random() * colors.length)];

      this.particles.push({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: size,
        color: color,
        alpha: 1,
        decay: Math.random() * 0.012 + 0.008,
        gravity: 0.08,
        drag: 0.97,
        type: Math.random() > 0.3 ? "heart" : "sparkle",
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.15
      });
    }
  }

  // ----------------------------------------------------------------------------
  // 3. FINAL CELEBRATION CONFETTI & HEARTS SHOWER
  // ----------------------------------------------------------------------------
  triggerCelebrationShower(durationMs = 4000) {
    const colors = [
      "#ff2a6d", "#ff70a6", "#ff9770", "#ffd670", "#e9ff70", 
      "#70d6ff", "#b388ff", "#ffffff", "#ff80bf"
    ];

    const startTime = Date.now();
    const interval = setInterval(() => {
      if (Date.now() - startTime > durationMs) {
        clearInterval(interval);
        return;
      }

      // Spawn confetti from top and sides
      for (let i = 0; i < 8; i++) {
        const x = Math.random() * this.width;
        const y = -20;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const types = ["rect", "heart", "sparkle", "circle"];

        this.particles.push({
          x: x,
          y: y,
          vx: (Math.random() - 0.5) * 4,
          vy: Math.random() * 5 + 3,
          size: Math.random() * 8 + 4,
          color: color,
          alpha: 1,
          decay: 0.004,
          gravity: 0.1,
          drag: 0.99,
          type: types[Math.floor(Math.random() * types.length)],
          rotation: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.1
        });
      }
    }, 60);
  }

  // ----------------------------------------------------------------------------
  // 4. TOUCH SPARKLES / SCRATCH CARD DUST
  // ----------------------------------------------------------------------------
  createTouchDust(x, y, count = 5) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3 + 1;
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1,
        size: Math.random() * 4 + 2,
        color: Math.random() > 0.5 ? "#ffd700" : "#ff85a2",
        alpha: 1,
        decay: 0.04,
        gravity: 0.05,
        drag: 0.95,
        type: "sparkle",
        rotation: 0,
        vRot: 0.1
      });
    }
  }

  // ----------------------------------------------------------------------------
  // 5. UNIVERSE STARRY BACKGROUND (AMBIENT)
  // ----------------------------------------------------------------------------
  initUniverseStars(count = 60) {
    this.stars = [];
    for (let i = 0; i < count; i++) {
      this.stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() * 2.5 + 0.5,
        alpha: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        twinkleDir: 1,
        color: Math.random() > 0.3 ? "#ffffff" : "#ffb7d5"
      });
    }
  }

  // ----------------------------------------------------------------------------
  // PHYSICS UPDATE & DRAW
  // ----------------------------------------------------------------------------
  update() {
    // 1. Update stars twinkle
    for (let i = 0; i < this.stars.length; i++) {
      const s = this.stars[i];
      s.alpha += s.twinkleSpeed * s.twinkleDir;
      if (s.alpha >= 1) {
        s.alpha = 1;
        s.twinkleDir = -1;
      } else if (s.alpha <= 0.15) {
        s.alpha = 0.15;
        s.twinkleDir = 1;
      }
    }

    // 2. Update dynamic particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= p.drag;
      p.vy *= p.drag;
      p.rotation += p.vRot;
      p.alpha -= p.decay;

      if (p.alpha <= 0 || p.y > this.height + 50) {
        this.particles.splice(i, 1);
      }
    }
  }

  render() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Draw ambient stars
    for (let i = 0; i < this.stars.length; i++) {
      const s = this.stars[i];
      this.ctx.save();
      this.ctx.globalAlpha = s.alpha;
      this.ctx.fillStyle = s.color;
      this.ctx.shadowBlur = 6;
      this.ctx.shadowColor = s.color;
      this.ctx.beginPath();
      this.ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    // Draw dynamic particles
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, p.alpha);
      this.ctx.fillStyle = p.color;
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.rotation);

      if (p.type === "circle") {
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        this.ctx.fill();
      } else if (p.type === "rect") {
        this.ctx.fillRect(-p.size, -p.size * 0.5, p.size * 2, p.size);
      } else if (p.type === "sparkle") {
        this.drawSparkle(0, 0, p.size);
      } else if (p.type === "heart") {
        this.drawHeart(0, 0, p.size);
      }

      this.ctx.restore();
    }
  }

  drawSparkle(x, y, size) {
    this.ctx.beginPath();
    this.ctx.moveTo(x, y - size);
    this.ctx.quadraticCurveTo(x, y, x + size, y);
    this.ctx.quadraticCurveTo(x, y, x, y + size);
    this.ctx.quadraticCurveTo(x, y, x - size, y);
    this.ctx.quadraticCurveTo(x, y, x, y - size);
    this.ctx.fill();
  }

  drawHeart(x, y, size) {
    const s = size * 0.7;
    this.ctx.beginPath();
    this.ctx.moveTo(x, y + s * 0.3);
    this.ctx.bezierCurveTo(x, y, x - s, y - s * 0.6, x - s, y - s);
    this.ctx.bezierCurveTo(x - s, y - s * 1.5, x - s * 0.3, y - s * 1.5, x, y - s * 0.6);
    this.ctx.bezierCurveTo(x + s * 0.3, y - s * 1.5, x + s, y - s * 1.5, x + s, y - s);
    this.ctx.bezierCurveTo(x + s, y - s * 0.6, x, y, x, y + s * 0.3);
    this.ctx.fill();
  }
}

// Global instance initialized when DOM is ready
window.ParticleEngine = ParticleEngine;

/**
 * ==============================================================================
 * HER LITTLE UNIVERSE — MASTER APPLICATION CONTROLLER
 * ==============================================================================
 * Orchestrates scenes, state transitions, interactive touch events, animations,
 * passcode vault, scratch card, film reel, and cake celebration.
 */

class BirthdayApp {
  constructor() {
    this.config = window.BIRTHDAY_CONFIG || {};
    this.currentSceneIndex = 0;
    this.scenes = [];
    this.passcodeEntered = "";
    this.failedAttempts = 0;
    this.activeQuoteCardIndex = 0;
    this.activeMemoryIndex = 0;
    this.isCandleBlown = false;

    this.init();
  }

  init() {
    // 1. Initialize Canvas Particle Engine
    window.appParticleEngine = new ParticleEngine("fx-canvas");

    // 2. Query Scenes
    this.scenes = Array.from(document.querySelectorAll(".scene"));
    
    // 3. Bind UI Buttons and Gestures
    this.bindSoundPrompt();
    this.bindHeaderControls();
    this.bindVaultKeypad();
    this.bindInteractiveStars();
    this.bindQuotesStepper();
    this.bindEnvelope();
    this.bindScratchCard();
    this.bindMemoryTimeline();
    this.bindFilmReel();
    this.bindCandleCelebration();
    this.bindEasterEgg();
    this.bindReplayNavigation();

    // 4. Populate Config Values in DOM
    this.applyConfigToDOM();
  }

  applyConfigToDOM() {
    // Insert Name and dynamic strings
    const nameEls = document.querySelectorAll(".var-recipient-name");
    nameEls.forEach(el => el.textContent = this.config.recipientName || "Anifa");

    const senderEls = document.querySelectorAll(".var-sender-name");
    senderEls.forEach(el => el.textContent = this.config.senderName || "Your Bestie");

    // Handwritten Letter Content
    const letterDateEl = document.querySelector("#letter-date");
    if (letterDateEl) letterDateEl.textContent = this.config.letter.date;

    const letterSalutationEl = document.querySelector("#letter-salutation");
    if (letterSalutationEl) letterSalutationEl.textContent = this.config.letter.salutation;

    const letterBodyEl = document.querySelector("#letter-paragraphs-container");
    if (letterBodyEl && this.config.letter.paragraphs) {
      letterBodyEl.innerHTML = this.config.letter.paragraphs
        .map(p => `<p class="letter-p">${p}</p>`)
        .join("");
    }

    const letterClosingEl = document.querySelector("#letter-closing");
    if (letterClosingEl) letterClosingEl.textContent = this.config.letter.closing;

    const letterSignatureEl = document.querySelector("#letter-signature");
    if (letterSignatureEl) letterSignatureEl.textContent = this.config.letter.signature;

    // Scratch Message
    const scratchMsgEl = document.querySelector("#scratch-secret-text");
    if (scratchMsgEl) scratchMsgEl.textContent = this.config.scratchCard.hiddenMessage;

    // Easter Egg
    const easterMsgEl = document.querySelector("#easter-secret-text");
    if (easterMsgEl) easterMsgEl.textContent = this.config.easterEgg.secretMessage;
  }

  // ----------------------------------------------------------------------------
  // SCENE TRANSITION CONTROLLER
  // ----------------------------------------------------------------------------
  goToScene(sceneId) {
    const targetScene = document.getElementById(sceneId);
    if (!targetScene) return;

    this.scenes.forEach(s => s.classList.remove("active"));
    targetScene.classList.add("active");

    // Dynamic background adjustment for thematic colors per scene
    const viewport = document.getElementById("app-viewport");
    if (sceneId.includes("universe") || sceneId.includes("star") || sceneId.includes("film") || sceneId.includes("hidden")) {
      viewport.style.background = "linear-gradient(180deg, #0b091a 0%, #1e1233 50%, #3b1443 100%)";
    } else if (sceneId.includes("quotes") || sceneId.includes("letter")) {
      viewport.style.background = "linear-gradient(180deg, #fff0f3 0%, #ffe5ec 60%, #fcd5ce 100%)";
    } else if (sceneId.includes("celebration")) {
      viewport.style.background = "linear-gradient(180deg, #ffe5ec 0%, #ffccd5 50%, #ffd166 100%)";
    } else {
      viewport.style.background = "linear-gradient(180deg, #fff0f3 0%, #ffe5ec 100%)";
    }

    // Trigger scene-specific lifecycle animations
    this.onSceneEnter(sceneId);
  }

  onSceneEnter(sceneId) {
    switch(sceneId) {
      case "scene-opening":
        this.runOpeningSequence();
        break;
      case "scene-balloons":
        this.runBalloonSequence();
        break;
      case "scene-cupid":
        this.runCupidSequence();
        break;
      case "scene-heart-impact":
        this.runHeartImpactSequence();
        break;
      case "scene-lock":
        this.startVaultQuotesCycle();
        break;
      case "scene-universe-loading":
        this.runUniverseLoadingSequence();
        break;
      case "scene-interactive-stars":
        this.renderInteractiveStars();
        break;
    }
  }

  // ----------------------------------------------------------------------------
  // SCENE 0: SOUND PROMPT
  // ----------------------------------------------------------------------------
  bindSoundPrompt() {
    const modal = document.getElementById("sound-prompt-modal");
    const enterWithSoundBtn = document.getElementById("btn-enter-sound");
    const enterMutedBtn = document.getElementById("btn-enter-muted");

    const startApp = async (withSound) => {
      if (withSound && window.soundEngine) {
        await window.soundEngine.enableAudio();
      }
      modal.classList.add("hidden");
      this.goToScene("scene-opening");
    };

    if (enterWithSoundBtn) {
      enterWithSoundBtn.addEventListener("click", () => startApp(true));
    }
    if (enterMutedBtn) {
      enterMutedBtn.addEventListener("click", () => startApp(false));
    }
  }

  bindHeaderControls() {
    const soundToggleBtn = document.getElementById("btn-sound-toggle");
    if (soundToggleBtn) {
      soundToggleBtn.addEventListener("click", () => {
        if (!window.soundEngine.soundEnabled) {
          window.soundEngine.enableAudio();
          soundToggleBtn.textContent = "🔊";
        } else {
          const isMuted = window.soundEngine.toggleMute();
          soundToggleBtn.textContent = isMuted ? "🔇" : "🔊";
        }
      });
    }
  }

  // ----------------------------------------------------------------------------
  // SCENE 1: OPENING TYPED REVEAL
  // ----------------------------------------------------------------------------
  runOpeningSequence() {
    const t1 = document.getElementById("open-text-1");
    const t2 = document.getElementById("open-text-2");
    const t3 = document.getElementById("open-text-3");
    const sub = document.getElementById("open-subtext");

    setTimeout(() => t1.classList.add("visible"), 800);
    setTimeout(() => t2.classList.add("visible"), 2600);
    setTimeout(() => {
      t3.classList.add("visible");
      sub.classList.add("visible");
      // Enable tap to proceed
      const scene = document.getElementById("scene-opening");
      const tapHandler = () => {
        scene.removeEventListener("click", tapHandler);
        this.goToScene("scene-balloons");
      };
      scene.addEventListener("click", tapHandler);
    }, 4500);
  }

  // ----------------------------------------------------------------------------
  // SCENE 2: BALLOONS SEQUENCE
  // ----------------------------------------------------------------------------
  runBalloonSequence() {
    const container = document.getElementById("balloons-wrapper");
    container.innerHTML = "";

    const balloonColors = ["#ff4d6d", "#ff758f", "#ffb3c6", "#ffd166", "#c9184a"];
    const count = 7;
    let poppedCount = 0;

    for (let i = 0; i < count; i++) {
      const b = document.createElement("div");
      b.className = "balloon-item";
      const col = balloonColors[i % balloonColors.length];
      b.style.background = `radial-gradient(circle at 35% 35%, ${col}, #a4133c)`;
      b.style.left = `${15 + (i * 12) + (Math.random() * 5)}%`;
      b.style.bottom = "-120px";
      
      // Floating animation with random delays
      const speed = 7 + Math.random() * 3;
      const delay = i * 0.4;
      b.style.transition = `bottom ${speed}s linear ${delay}s, transform 0.2s`;

      // Pop Handler
      const popBalloon = (e) => {
        e.stopPropagation();
        const rect = b.getBoundingClientRect();
        if (window.appParticleEngine) {
          window.appParticleEngine.createBalloonPop(
            rect.left + rect.width / 2,
            rect.top + rect.height / 2,
            col,
            30
          );
        }
        if (window.soundEngine) window.soundEngine.playPop();
        b.remove();
        poppedCount++;

        if (poppedCount >= 3) {
          setTimeout(() => {
            this.goToScene("scene-cupid");
          }, 800);
        }
      };

      b.addEventListener("click", popBalloon);
      b.addEventListener("touchstart", popBalloon);

      container.appendChild(b);

      // Trigger float upward
      setTimeout(() => {
        b.style.bottom = "110%";
      }, 50);
    }

    // Auto-advance after 5.5s if not all tapped
    setTimeout(() => {
      if (document.getElementById("scene-balloons").classList.contains("active")) {
        this.goToScene("scene-cupid");
      }
    }, 6000);
  }

  // ----------------------------------------------------------------------------
  // SCENE 3 & 4: CUPID & HEART IMPACT
  // ----------------------------------------------------------------------------
  runCupidSequence() {
    const cupid = document.getElementById("cupid-character");
    const shootBtn = document.getElementById("btn-cupid-shoot");

    if (shootBtn) {
      shootBtn.onclick = () => {
        shootBtn.disabled = true;
        if (window.soundEngine) window.soundEngine.playWhoosh();
        cupid.style.transform = "translateX(-80px) scale(0.9)";

        // Arrow fly animation across viewport
        setTimeout(() => {
          this.goToScene("scene-heart-impact");
        }, 500);
      };
    }
  }

  runHeartImpactSequence() {
    const giantHeart = document.getElementById("giant-heart-target");
    const impactText = document.getElementById("heart-reveal-text");
    const banterBox = document.getElementById("banter-chat-box");
    const continueBtn = document.getElementById("btn-after-impact");

    setTimeout(() => {
      // Explode the heart!
      const rect = giantHeart.getBoundingClientRect();
      if (window.appParticleEngine) {
        window.appParticleEngine.createHeartExplosion(
          rect.left + rect.width / 2,
          rect.top + rect.height / 2,
          100
        );
      }
      if (window.soundEngine) window.soundEngine.playHeartBoom();

      giantHeart.style.display = "none";
      impactText.style.display = "block";
      banterBox.style.display = "flex";
      continueBtn.style.display = "flex";
    }, 400);

    if (continueBtn) {
      continueBtn.onclick = () => {
        this.goToScene("scene-lock");
      };
    }
  }

  // ----------------------------------------------------------------------------
  // SCENE 5: VAULT PASSCODE KEYPAD
  // ----------------------------------------------------------------------------
  bindVaultKeypad() {
    const keys = document.querySelectorAll(".keypad-btn");
    const dots = document.querySelectorAll(".passcode-dot");
    const feedback = document.getElementById("vault-feedback");
    const lockIcon = document.getElementById("vault-lock-icon");

    const updateDots = () => {
      dots.forEach((dot, idx) => {
        if (idx < this.passcodeEntered.length) {
          dot.classList.add("filled");
        } else {
          dot.classList.remove("filled");
        }
      });
    };

    keys.forEach(btn => {
      btn.addEventListener("click", () => {
        const val = btn.getAttribute("data-val");

        if (val === "del") {
          this.passcodeEntered = this.passcodeEntered.slice(0, -1);
          updateDots();
          if (window.soundEngine) window.soundEngine.playKeyClick();
          return;
        }

        if (val === "clear") {
          this.passcodeEntered = "";
          updateDots();
          if (window.soundEngine) window.soundEngine.playKeyClick();
          return;
        }

        if (this.passcodeEntered.length >= 4) return;

        this.passcodeEntered += val;
        updateDots();
        if (window.soundEngine) window.soundEngine.playKeyClick();

        if (this.passcodeEntered.length === 4) {
          this.validatePasscode(feedback, lockIcon);
        }
      });
    });
  }

  validatePasscode(feedback, lockIcon) {
    const correctCode = this.config.secretPassword || "1517";

    if (this.passcodeEntered === correctCode) {
      // Success!
      feedback.textContent = "Passcode accepted! Unlocking… ✨";
      lockIcon.textContent = "🔓";
      lockIcon.style.transform = "scale(1.25) rotate(15deg)";
      if (window.soundEngine) window.soundEngine.playUnlock();

      if (window.appParticleEngine) {
        const rect = lockIcon.getBoundingClientRect();
        window.appParticleEngine.createTouchDust(rect.left + rect.width / 2, rect.top + rect.height / 2, 25);
      }

      setTimeout(() => {
        this.goToScene("scene-surprise");
      }, 1200);
    } else {
      // Wrong passcode playful responses
      this.failedAttempts++;
      const msgs = this.config.lockScreen.wrongPasswordMessages || ["Nice try! 😌"];
      const msg = msgs[Math.min(this.failedAttempts - 1, msgs.length - 1)];

      feedback.textContent = msg;
      lockIcon.parentElement.classList.add("shake-anim");
      if (window.soundEngine) window.soundEngine.playWrong();

      setTimeout(() => {
        lockIcon.parentElement.classList.remove("shake-anim");
        this.passcodeEntered = "";
        const dots = document.querySelectorAll(".passcode-dot");
        dots.forEach(d => d.classList.remove("filled"));
      }, 600);
    }
  }

  startVaultQuotesCycle() {
    const quoteEl = document.getElementById("vault-cycling-quote");
    if (!quoteEl) return;
    const quotes = this.config.lockScreen.cyclingQuotes || [];
    let qIdx = 0;

    setInterval(() => {
      if (!document.getElementById("scene-lock").classList.contains("active")) return;
      quoteEl.style.opacity = "0";
      setTimeout(() => {
        qIdx = (qIdx + 1) % quotes.length;
        quoteEl.textContent = quotes[qIdx];
        quoteEl.style.opacity = "1";
      }, 500);
    }, 4200);
  }

  // ----------------------------------------------------------------------------
  // SCENE 6: SURPRISE BUTTON -> UNIVERSE LOADING
  // ----------------------------------------------------------------------------
  bindEnvelope() {
    const openSurpriseBtn = document.getElementById("btn-open-surprise");
    if (openSurpriseBtn) {
      openSurpriseBtn.onclick = () => {
        if (window.soundEngine) window.soundEngine.playUnlock();
        this.goToScene("scene-universe-loading");
      };
    }

    // Scene 10 3D Envelope
    const envelope = document.getElementById("envelope-stage");
    const modal = document.getElementById("full-letter-modal");
    const closeLetterBtn = document.getElementById("btn-close-letter");

    if (envelope) {
      envelope.onclick = () => {
        envelope.classList.add("opened");
        if (window.soundEngine) window.soundEngine.playEnvelope();
        setTimeout(() => {
          if (modal) modal.classList.add("show");
        }, 800);
      };
    }

    if (closeLetterBtn && modal) {
      closeLetterBtn.onclick = () => {
        modal.classList.remove("show");
        this.goToScene("scene-scratch");
      };
    }
  }

  // ----------------------------------------------------------------------------
  // SCENE 7: LITTLE UNIVERSE LOADING STEPPER
  // ----------------------------------------------------------------------------
  runUniverseLoadingSequence() {
    const textEl = document.getElementById("universe-loading-text");
    const steps = this.config.universeLoadingSteps || [];
    let currentStep = 0;

    if (window.appParticleEngine) {
      window.appParticleEngine.initUniverseStars(80);
    }

    const nextStep = () => {
      if (currentStep < steps.length) {
        textEl.style.opacity = "0";
        setTimeout(() => {
          textEl.textContent = `${steps[currentStep].icon} ${steps[currentStep].text}`;
          textEl.style.opacity = "1";
          if (window.soundEngine) window.soundEngine.playChime(600 + currentStep * 100, 0.4);
          currentStep++;
          setTimeout(nextStep, 1500);
        }, 300);
      } else {
        setTimeout(() => {
          this.goToScene("scene-interactive-stars");
        }, 1200);
      }
    };

    nextStep();
  }

  // ----------------------------------------------------------------------------
  // SCENE 8: INTERACTIVE STARS
  // ----------------------------------------------------------------------------
  renderInteractiveStars() {
    const container = document.getElementById("universe-starfield");
    const modal = document.getElementById("star-popup-modal");
    const titleEl = document.getElementById("star-popup-title");
    const descEl = document.getElementById("star-popup-desc");
    const proceedBtn = document.getElementById("btn-proceed-from-stars");

    if (!container) return;
    container.innerHTML = "";

    const starData = this.config.interactiveStars || [];
    const positions = [
      { top: "25%", left: "20%" },
      { top: "35%", left: "75%" },
      { top: "50%", left: "30%" },
      { top: "60%", left: "80%" },
      { top: "72%", left: "25%" },
      { top: "42%", left: "55%" }
    ];

    starData.forEach((star, idx) => {
      const pos = positions[idx % positions.length];
      const starEl = document.createElement("div");
      starEl.className = "interactive-star";
      starEl.innerHTML = "⭐";
      starEl.style.top = pos.top;
      starEl.style.left = pos.left;

      starEl.onclick = (e) => {
        e.stopPropagation();
        if (window.soundEngine) window.soundEngine.playChime(880, 0.6);
        titleEl.textContent = star.title;
        descEl.textContent = star.text;
        modal.classList.add("show");

        if (window.appParticleEngine) {
          const rect = starEl.getBoundingClientRect();
          window.appParticleEngine.createTouchDust(rect.left + rect.width / 2, rect.top + rect.height / 2, 15);
        }
      };

      container.appendChild(starEl);
    });

    // Close popup on tap outside
    document.addEventListener("click", () => {
      if (modal) modal.classList.remove("show");
    });

    if (proceedBtn) {
      proceedBtn.onclick = () => {
        this.goToScene("scene-quotes");
      };
    }
  }

  bindInteractiveStars() {
    // Handled in renderInteractiveStars
  }

  // ----------------------------------------------------------------------------
  // SCENE 9: QUOTE CARDS STEPPER
  // ----------------------------------------------------------------------------
  bindQuotesStepper() {
    const titleEl = document.getElementById("quote-card-title");
    const bodyEl = document.getElementById("quote-card-body");
    const footEl = document.getElementById("quote-card-footnote");
    const nextBtn = document.getElementById("btn-next-quote");
    const quotes = this.config.quoteCards || [];

    const renderQuote = (idx) => {
      const q = quotes[idx];
      if (!q) return;
      titleEl.textContent = q.title;
      bodyEl.innerHTML = q.lines.map(l => `<p class="quote-card-line">${l}</p>`).join("");
      footEl.textContent = q.footnote;
    };

    if (nextBtn) {
      nextBtn.onclick = () => {
        if (window.soundEngine) window.soundEngine.playKeyClick();
        this.activeQuoteCardIndex++;
        if (this.activeQuoteCardIndex < quotes.length) {
          renderQuote(this.activeQuoteCardIndex);
        } else {
          this.goToScene("scene-envelope");
        }
      };
    }

    renderQuote(0);
  }

  // ----------------------------------------------------------------------------
  // SCENE 11: SCRATCH CARD
  // ----------------------------------------------------------------------------
  bindScratchCard() {
    const toMemoriesBtn = document.getElementById("btn-to-memories");

    new ScratchCard("scratch-card-box", {
      scratchRadius: 26,
      threshold: 40,
      onComplete: () => {
        if (toMemoriesBtn) {
          toMemoriesBtn.style.display = "flex";
          toMemoriesBtn.scrollIntoView({ behavior: "smooth" });
        }
      }
    });

    if (toMemoriesBtn) {
      toMemoriesBtn.onclick = () => {
        this.goToScene("scene-timeline");
      };
    }
  }

  // ----------------------------------------------------------------------------
  // SCENE 12 & 13: MEMORY TIMELINE & FILM REEL
  // ----------------------------------------------------------------------------
  bindMemoryTimeline() {
    const prevBtn = document.getElementById("btn-prev-memory");
    const nextBtn = document.getElementById("btn-next-memory");
    const imgEl = document.getElementById("polaroid-img");
    const titleEl = document.getElementById("polaroid-title");
    const descEl = document.getElementById("polaroid-desc");
    const tagEl = document.getElementById("polaroid-tag");
    const filmReelBtn = document.getElementById("btn-play-film-reel");

    const memories = this.config.memories || [];

    const updateCard = (idx) => {
      const mem = memories[idx];
      if (!mem) return;
      imgEl.src = mem.image;
      titleEl.textContent = mem.title;
      descEl.textContent = mem.caption;
      if (tagEl) tagEl.textContent = mem.tag || mem.date;
      if (window.soundEngine) window.soundEngine.playKeyClick();
    };

    if (prevBtn) {
      prevBtn.onclick = () => {
        if (this.activeMemoryIndex > 0) {
          this.activeMemoryIndex--;
          updateCard(this.activeMemoryIndex);
        }
      };
    }

    if (nextBtn) {
      nextBtn.onclick = () => {
        if (this.activeMemoryIndex < memories.length - 1) {
          this.activeMemoryIndex++;
          updateCard(this.activeMemoryIndex);
        }
      };
    }

    if (filmReelBtn) {
      filmReelBtn.onclick = () => {
        this.runFilmReelSequence();
      };
    }

    updateCard(0);
  }

  bindFilmReel() {
    // Handled in runFilmReelSequence
  }

  runFilmReelSequence() {
    const overlay = document.getElementById("film-reel-overlay");
    const reelImg = document.getElementById("film-reel-img");
    const flash = document.getElementById("film-shutter-flash");
    const finishBtn = document.getElementById("btn-finish-film");
    const memories = this.config.memories || [];

    overlay.classList.add("active");
    let current = 0;

    const playNext = () => {
      if (current < memories.length) {
        reelImg.src = memories[current].image;
        flash.classList.add("flash-active");
        if (window.soundEngine) window.soundEngine.playShutter();

        setTimeout(() => {
          flash.classList.remove("flash-active");
        }, 500);

        current++;
        setTimeout(playNext, 1200);
      } else {
        if (finishBtn) finishBtn.style.display = "flex";
      }
    };

    playNext();

    if (finishBtn) {
      finishBtn.onclick = () => {
        overlay.classList.remove("active");
        this.goToScene("scene-hidden-final");
      };
    }
  }

  // ----------------------------------------------------------------------------
  // SCENE 14 & 15: FINAL HIDDEN MESSAGE & CAKE CELEBRATION
  // ----------------------------------------------------------------------------
  bindCandleCelebration() {
    const toCelebrationBtn = document.getElementById("btn-to-celebration");
    if (toCelebrationBtn) {
      toCelebrationBtn.onclick = () => {
        this.goToScene("scene-celebration");
        this.tryInitMicBlowing(blowCandle);
      };
    }

    const flame = document.getElementById("candleFlame");
    const smoke = document.getElementById("candleSmoke");
    const celebPostBlow = document.getElementById("celebration-post-blow");
    const cakeInstructions = document.getElementById("cake-instructions");

    const blowCandle = () => {
      if (this.isCandleBlown) return;
      this.isCandleBlown = true;

      // Extinguish flame with smoke
      if (flame) flame.style.display = "none";
      if (smoke) smoke.classList.add("rise");
      if (window.soundEngine) window.soundEngine.playBlow();

      if (cakeInstructions) cakeInstructions.textContent = "✨ Your wish is flying into the universe… ✨";

      // Momentary silence, then BOOM celebration!
      setTimeout(() => {
        if (window.soundEngine) window.soundEngine.playCelebration();
        if (window.appParticleEngine) {
          window.appParticleEngine.triggerCelebrationShower(5000);
        }
        if (celebPostBlow) celebPostBlow.style.display = "block";
      }, 1200);
    };

    if (flame) {
      flame.onclick = blowCandle;
    }
    const cakeWrapper = document.querySelector(".cake-wrapper");
    if (cakeWrapper) {
      cakeWrapper.onclick = blowCandle;
    }
  }

  tryInitMicBlowing(blowCallback) {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return;
    try {
      navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioCtx.createAnalyser();
        const microphone = audioCtx.createMediaStreamSource(stream);
        analyser.fftSize = 256;
        microphone.connect(analyser);

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const checkBlow = () => {
          if (this.isCandleBlown) {
            stream.getTracks().forEach(track => track.stop());
            return;
          }
          analyser.getByteFrequencyData(dataArray);
          let sum = 0;
          for (let i = 0; i < bufferLength; i++) {
            sum += dataArray[i];
          }
          const avg = sum / bufferLength;

          // Detected strong breath sound
          if (avg > 75) {
            blowCallback();
            stream.getTracks().forEach(track => track.stop());
            return;
          }
          requestAnimationFrame(checkBlow);
        };
        checkBlow();
      }).catch(() => {
        // User denied mic or not supported, tap interaction remains active
      });
    } catch (e) {}
  }

  // ----------------------------------------------------------------------------
  // EASTER EGG & REPLAY CONTROLS
  // ----------------------------------------------------------------------------
  bindEasterEgg() {
    const star = document.getElementById("hidden-easter-star");
    const modal = document.getElementById("easter-egg-modal");
    const closeBtn = document.getElementById("btn-close-easter");

    if (star && modal) {
      star.onclick = (e) => {
        e.stopPropagation();
        if (window.soundEngine) window.soundEngine.playUnlock();
        modal.classList.add("show");
      };
    }

    if (closeBtn && modal) {
      closeBtn.onclick = () => {
        modal.classList.remove("show");
      };
    }
  }

  bindReplayNavigation() {
    const replayStoryBtn = document.getElementById("btn-replay-story");
    const rereadLetterBtn = document.getElementById("btn-reread-letter");
    const replayMemoriesBtn = document.getElementById("btn-replay-memories");

    if (replayStoryBtn) {
      replayStoryBtn.onclick = () => {
        window.location.reload();
      };
    }

    if (rereadLetterBtn) {
      rereadLetterBtn.onclick = () => {
        const modal = document.getElementById("full-letter-modal");
        if (modal) modal.classList.add("show");
      };
    }

    if (replayMemoriesBtn) {
      replayMemoriesBtn.onclick = () => {
        this.goToScene("scene-timeline");
      };
    }
  }
}

// Initialize on DOM load
window.addEventListener("DOMContentLoaded", () => {
  window.birthdayApp = new BirthdayApp();
});

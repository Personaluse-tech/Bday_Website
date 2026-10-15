import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';
import { BIRTHDAY_CONFIG } from '../config';

interface Props {
  onReplayStory: () => void;
  onRereadLetter: () => void;
  onReplayMemories: () => void;
  onOpenEasterEgg: () => void;
  onNext: () => void;
}

export const SceneCelebration: React.FC<Props> = ({
  onReplayStory,
  onRereadLetter,
  onReplayMemories,
  onOpenEasterEgg,
  onNext
}) => {
  const [isBlown, setIsBlown] = useState(false);

  const handleBlow = () => {
    if (isBlown) return;
    setIsBlown(true);
    sound.playBlow();

    // Trigger Confetti Explosion
    setTimeout(() => {
      sound.playCelebration();
      
      const count = 220;
      const defaults = {
        origin: { y: 0.65 }
      };

      const fire = (particleRatio: number, opts: confetti.Options) => {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio)
        });
      };

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
        colors: ['#ff4d6d', '#ffd166', '#ff758f']
      });
      fire(0.2, {
        spread: 60,
        colors: ['#70d6ff', '#ff80bf', '#ffffff']
      });
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 45
      });
    }, 500);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-between py-5 px-5 text-center relative overflow-y-auto select-none">
      {/* Top Banner Prompt */}
      <div className="shrink-0 pt-1">
        <p className="font-semibold text-xs text-[#c9184a] animate-pulse tracking-wide">
          {!isBlown ? BIRTHDAY_CONFIG.celebration.candlePrompt : '✨ May all your wishes come true, Anifa! ✨'}
        </p>
      </div>

      {/* Birthday Cake (Scales nicely to allow everything to be visible) */}
      <motion.div 
        id="blow-candle-btn"
        onClick={handleBlow}
        animate={isBlown ? { scale: 0.75, y: -5 } : { scale: [1, 1.02, 1] }}
        transition={{ duration: 0.5 }}
        className="w-[160px] sm:w-[180px] h-[160px] sm:h-[180px] mx-auto cursor-pointer relative shrink-0"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 300" width="100%" height="100%" className="overflow-visible">
          <defs>
            <linearGradient id="cakePlate" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff"/>
              <stop offset="100%" stopColor="#e2eafc"/>
            </linearGradient>
            <linearGradient id="frosting1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffb3c6"/>
              <stop offset="50%" stopColor="#ff8fab"/>
              <stop offset="100%" stopColor="#fb6f92"/>
            </linearGradient>
            <linearGradient id="frosting2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fff0f3"/>
              <stop offset="100%" stopColor="#ffccd5"/>
            </linearGradient>
            <linearGradient id="candleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffd166"/>
              <stop offset="50%" stopColor="#ffffff"/>
              <stop offset="100%" stopColor="#ffd166"/>
            </linearGradient>
            <radialGradient id="flameGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff"/>
              <stop offset="30%" stopColor="#ffea00"/>
              <stop offset="70%" stopColor="#ff5400"/>
              <stop offset="100%" stopColor="#ff0054"/>
            </radialGradient>
          </defs>
          <ellipse cx="140" cy="270" rx="120" ry="18" fill="#000000" opacity="0.08"/>
          <ellipse cx="140" cy="265" rx="110" ry="15" fill="url(#cakePlate)" stroke="#f0f2f5" strokeWidth="2"/>
          <rect x="50" y="190" width="180" height="65" rx="12" fill="url(#frosting1)"/>
          <path d="M 50,195 Q 65,225 80,195 Q 95,230 110,195 Q 130,235 150,195 Q 170,228 190,195 Q 210,232 230,195 L 230,190 L 50,190 Z" fill="#ffffff" opacity="0.8"/>
          <circle cx="75" cy="230" r="3" fill="#ffd166"/>
          <circle cx="115" cy="235" r="3" fill="#70d6ff"/>
          <circle cx="165" cy="225" r="3" fill="#ffffff"/>
          <circle cx="205" cy="235" r="3" fill="#ff70a6"/>
          <rect x="75" y="130" width="130" height="60" rx="10" fill="url(#frosting2)"/>
          <path d="M 75,135 Q 90,165 105,135 Q 120,170 140,135 Q 160,168 180,135 Q 195,160 205,135 L 205,130 L 75,130 Z" fill="#ff8fab"/>
          <circle cx="85" cy="128" r="8" fill="#ffffff"/>
          <circle cx="112" cy="126" r="8" fill="#ffffff"/>
          <circle cx="140" cy="125" r="9" fill="#ffffff"/>
          <circle cx="168" cy="126" r="8" fill="#ffffff"/>
          <circle cx="195" cy="128" r="8" fill="#ffffff"/>
          
          {/* Candle */}
          <rect x="135" y="65" width="10" height="60" rx="4" fill="url(#candleGrad)"/>
          <line x1="140" y1="65" x2="140" y2="52" stroke="#2b2d42" strokeWidth="2"/>

          {/* Candle Flame */}
          {!isBlown ? (
            <g className="animate-pulse origin-[140px_50px]">
              <ellipse cx="140" cy="38" rx="8" ry="16" fill="url(#flameGrad)"/>
              <ellipse cx="140" cy="40" rx="4" ry="9" fill="#ffffff"/>
              <circle cx="140" cy="35" r="18" fill="#ffd166" opacity="0.25"/>
            </g>
          ) : (
            <g className="animate-fade-out">
              <path d="M 140,50 Q 130,35 145,20 Q 135,5 140,-5" fill="none" stroke="#d3d3d3" strokeWidth="3" strokeLinecap="round" opacity="0.6"/>
            </g>
          )}
        </svg>
      </motion.div>

      {/* Post Blow Content */}
      {isBlown && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full flex flex-col items-center my-auto"
        >
          <h1 className="font-serif text-2xl font-bold text-[#c9184a] mb-0.5 tracking-tight">
            HAPPY BIRTHDAY, {BIRTHDAY_CONFIG.recipientName.toUpperCase()}! 🎉
          </h1>
          <p className="text-xs text-[#6b535d] leading-relaxed max-w-[280px] mb-3">
            {BIRTHDAY_CONFIG.celebration.postBlowSubtext}
          </p>

          {/* Bestie Summary Card */}
          <div className="bg-white/85 backdrop-blur-md rounded-2xl p-3 shadow-xs border border-white/90 flex flex-col gap-1 w-full max-w-[270px] mb-3">
            {BIRTHDAY_CONFIG.celebration.bestieSummary.map((line, i) => (
              <span 
                key={i} 
                className={`font-handwriting text-base font-bold ${
                  i === 4 ? 'text-[#ff4d6d]' : 'text-[#c9184a]'
                }`}
              >
                {line}
              </span>
            ))}
          </div>

          {/* Action Buttons with One More Surprise as Primary CTA */}
          <div className="flex flex-col gap-2 w-full max-w-[270px]">
            <motion.button
              id="open-post-gift-btn"
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              onClick={() => {
                sound.playClick();
                onNext();
              }}
              className="w-full h-12 rounded-full bg-gradient-to-r from-[#ff4d6d] via-[#ff758f] to-[#f4a261] text-white font-bold text-xs sm:text-sm shadow-md active:scale-95 transition-transform flex items-center justify-center gap-1.5 cursor-pointer hover:shadow-lg border-2 border-white/60"
            >
              <span>Wait... One More Surprise! 🎁✨</span>
            </motion.button>

            <button
              id="replay-story-btn"
              onClick={onReplayStory}
              className="w-full h-10 rounded-full bg-white/70 hover:bg-white text-[#c9184a] font-semibold text-xs shadow-xs border border-[#ffccd5] active:scale-95 transition-transform flex items-center justify-center cursor-pointer"
            >
              <span>🔄 Replay The Story</span>
            </button>
            <button
              id="reread-letter-btn"
              onClick={onRereadLetter}
              className="w-full h-10 rounded-full border border-[#c9184a]/20 text-[#c9184a] font-semibold text-xs active:scale-95 transition-transform flex items-center justify-center cursor-pointer bg-white/50 hover:bg-white/70"
            >
              <span>💌 Read My Letter Again</span>
            </button>
            <button
              id="replay-memories-btn"
              onClick={onReplayMemories}
              className="w-full h-9 rounded-full text-[#6b535d] font-semibold text-xs active:scale-95 transition-transform flex items-center justify-center cursor-pointer hover:bg-white/40"
            >
              <span>📸 Replay Memories</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* Secret Twinkling Star for Easter Egg */}
      <motion.button
        id="easter-egg-star-btn"
        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2.2 }}
        onClick={onOpenEasterEgg}
        className="absolute bottom-2 right-3 text-base cursor-pointer z-50 p-2.5 active:scale-125 transition-transform"
        title="Secret Star"
        aria-label="Secret Easter Egg Star"
      >
        ⭐
      </motion.button>
    </div>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/sound';
import { BIRTHDAY_CONFIG, InteractiveStarItem } from '../config';

interface Props {
  onNext: () => void;
}

const STAR_POSITIONS = [
  { top: '22%', left: '20%' },
  { top: '30%', left: '78%' },
  { top: '46%', left: '24%' },
  { top: '56%', left: '76%' },
  { top: '68%', left: '26%' },
  { top: '40%', left: '52%' }
];

export const SceneInteractiveStars: React.FC<Props> = ({ onNext }) => {
  const [selectedStar, setSelectedStar] = useState<InteractiveStarItem | null>(null);
  const [openedStarIds, setOpenedStarIds] = useState<number[]>([]);

  const handleStarClick = (star: InteractiveStarItem) => {
    sound.playChime(750 + star.id * 75, 0.5, 0.25);
    setOpenedStarIds(prev => prev.includes(star.id) ? prev : [...prev, star.id]);
    setSelectedStar(star);
  };

  const handleClose = () => {
    sound.playClick();
    setSelectedStar(null);
  };

  return (
    <div className="w-full h-full relative p-6 flex flex-col justify-between items-center text-center bg-gradient-to-b from-[#0b091a] via-[#1e1233] to-[#3b1443] text-white overflow-hidden">
      {/* Ambient background stardust */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              width: `${(i % 3) + 1}px`,
              height: `${(i % 3) + 1}px`,
              top: `${(i * 19) % 100}%`,
              left: `${(i * 27) % 100}%`,
              animationDuration: `${2 + (i % 4)}s`,
              animationDelay: `${(i * 0.4)}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-20 pt-1">
        <h2 className="font-serif text-xl font-bold text-[#ffccd5] mb-1">
          Your Sky of Stars ✨
        </h2>
        <p className="text-xs text-[#c9ada7] max-w-[270px] mx-auto">
          Tap each glowing golden star to reveal a secret note
        </p>
        <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[11px] text-[#ffd166]">
          <span>⭐</span>
          <span>{openedStarIds.length} of {BIRTHDAY_CONFIG.interactiveStars.length} stars revealed</span>
        </div>
      </div>

      {/* Star Nodes (wrapper is pointer-events-none so background doesn't trap clicks; buttons have pointer-events-auto) */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {BIRTHDAY_CONFIG.interactiveStars.map((star, idx) => {
          const pos = STAR_POSITIONS[idx % STAR_POSITIONS.length];
          const isOpened = openedStarIds.includes(star.id);

          return (
            <motion.button
              key={star.id}
              id={`star-${star.id}`}
              onClick={() => handleStarClick(star)}
              aria-label={`Open note: ${star.title}`}
              animate={{ 
                scale: [1, 1.25, 1],
                filter: [
                  'drop-shadow(0 0 6px rgba(255,209,102,0.6))',
                  'drop-shadow(0 0 16px rgba(255,209,102,1))',
                  'drop-shadow(0 0 6px rgba(255,209,102,0.6))'
                ]
              }}
              transition={{ repeat: Infinity, duration: 2 + (idx % 3) * 0.6, ease: "easeInOut" }}
              className="absolute w-14 h-14 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer active:scale-125 transition-transform pointer-events-auto group focus:outline-none"
              style={{ top: pos.top, left: pos.left }}
            >
              {/* Outer soft pulsing ring */}
              <span className="absolute inset-1 rounded-full bg-[#ffd166]/15 animate-ping opacity-60" style={{ animationDuration: `${2.5 + (idx % 2)}s` }} />
              
              {/* Star emoji with hover/tap glow */}
              <span className="relative text-3xl select-none transform transition-transform group-hover:scale-110">
                ⭐
              </span>

              {/* Opened star subtle indicator badge */}
              {isOpened && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#ff758f] text-[9px] font-bold flex items-center justify-center text-white shadow-sm">
                  ✓
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Modal Popup Overlay */}
      <AnimatePresence>
        {selectedStar && (
          <div 
            id="star-modal-backdrop"
            onClick={handleClose}
            className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-5 pointer-events-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 15 }}
              transition={{ type: 'spring', damping: 24, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#1c122c]/95 backdrop-blur-md border border-[#ffd166]/40 rounded-3xl p-6 text-left w-full max-w-[310px] shadow-2xl relative"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl animate-pulse">✨</span>
                <button
                  id="close-star-note-x"
                  onClick={handleClose}
                  aria-label="Close note"
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-[#ffccd5] flex items-center justify-center text-xs cursor-pointer active:scale-90 transition-all"
                >
                  ✕
                </button>
              </div>

              <h3 className="font-serif text-base font-bold text-[#ffd166] mb-2 flex items-center gap-1.5">
                {selectedStar.title}
              </h3>
              
              <p className="text-xs text-[#f8edeb] leading-relaxed mb-5">
                {selectedStar.text}
              </p>

              <button
                id="close-star-note-btn"
                onClick={handleClose}
                className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#ffd166]/20 to-[#ff758f]/20 hover:from-[#ffd166]/30 hover:to-[#ff758f]/30 border border-[#ffd166]/40 text-xs font-semibold text-[#ffd166] cursor-pointer active:scale-95 transition-all text-center flex items-center justify-center gap-1.5"
              >
                <span>Close Note</span>
                <span>✨</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bottom Button */}
      <div className="relative z-30 shrink-0 pb-3 w-full max-w-[280px] pointer-events-auto">
        <button
          id="read-thoughts-btn"
          onClick={onNext}
          className="w-full h-12 rounded-full bg-gradient-to-r from-[#ff4d6d] to-[#ff758f] text-white font-semibold text-sm shadow-md active:scale-95 transition-transform cursor-pointer flex items-center justify-center"
        >
          <span>Read My Thoughts 💌</span>
        </button>
      </div>
    </div>
  );
};

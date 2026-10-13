import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/sound';
import { BIRTHDAY_CONFIG, InteractiveStarItem } from '../config';

interface Props {
  onNext: () => void;
}

const STAR_POSITIONS = [
  { top: '22%', left: '18%' },
  { top: '32%', left: '76%' },
  { top: '48%', left: '28%' },
  { top: '58%', left: '78%' },
  { top: '70%', left: '22%' },
  { top: '40%', left: '52%' }
];

export const SceneInteractiveStars: React.FC<Props> = ({ onNext }) => {
  const [selectedStar, setSelectedStar] = useState<InteractiveStarItem | null>(null);

  const handleStarClick = (star: InteractiveStarItem) => {
    sound.playChime(880, 0.6);
    setSelectedStar(star);
  };

  return (
    <div className="w-full h-full relative p-6 flex flex-col justify-between items-center text-center bg-gradient-to-b from-[#0b091a] via-[#1e1233] to-[#3b1443] text-white">
      <div>
        <h2 className="font-serif text-xl font-bold text-[#ffccd5] mb-1">
          Your Sky of Stars ✨
        </h2>
        <p className="text-xs text-[#c9ada7]">
          Tap the glowing golden stars to reveal secret notes
        </p>
      </div>

      {/* Star Nodes */}
      <div className="absolute inset-0 pointer-events-auto">
        {BIRTHDAY_CONFIG.interactiveStars.map((star, idx) => {
          const pos = STAR_POSITIONS[idx % STAR_POSITIONS.length];
          return (
            <motion.button
              key={star.id}
              onClick={() => handleStarClick(star)}
              animate={{ 
                scale: [1, 1.3, 1],
                filter: [
                  'drop-shadow(0 0 6px rgba(255,209,102,0.6))',
                  'drop-shadow(0 0 14px rgba(255,209,102,1))',
                  'drop-shadow(0 0 6px rgba(255,209,102,0.6))'
                ]
              }}
              transition={{ repeat: Infinity, duration: 2 + (idx % 3) * 0.5 }}
              className="absolute text-2xl cursor-pointer active:scale-150 transition-transform"
              style={{ top: pos.top, left: pos.left }}
            >
              ⭐
            </motion.button>
          );
        })}
      </div>

      {/* Modal Popup */}
      <AnimatePresence>
        {selectedStar && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="z-50 bg-[#1e1233]/90 backdrop-blur-md border border-[#ffd166]/40 rounded-2xl p-5 text-left max-w-[300px] shadow-2xl mb-16"
          >
            <h3 className="font-serif text-sm font-bold text-[#ffd166] mb-1.5 flex items-center gap-1.5">
              <span>✨</span> {selectedStar.title}
            </h3>
            <p className="text-xs text-[#f8edeb] leading-relaxed mb-3">
              {selectedStar.text}
            </p>
            <button
              onClick={() => setSelectedStar(null)}
              className="text-[11px] font-semibold text-[#ff758f] underline cursor-pointer"
            >
              Close note
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={onNext}
        className="z-40 py-3.5 px-8 rounded-full bg-gradient-to-r from-[#ff4d6d] to-[#ff758f] text-white font-semibold text-sm shadow-md active:scale-95 transition-transform cursor-pointer"
      >
        <span>Read My Thoughts 💌</span>
      </button>
    </div>
  );
};

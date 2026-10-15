import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/sound';
import { BIRTHDAY_CONFIG, PenguinCharacterItem } from '../config';

interface Props {
  onNext: () => void;
}

export const ScenePostPenguins: React.FC<Props> = ({ onNext }) => {
  const config = BIRTHDAY_CONFIG.postBirthday.penguins;
  const [selectedPenguin, setSelectedPenguin] = useState<PenguinCharacterItem | null>(null);
  const [exploredPenguinIds, setExploredPenguinIds] = useState<string[]>([]);

  const handleSelectPenguin = (penguin: PenguinCharacterItem) => {
    sound.playChime(700 + (penguin.id === 'sweet' ? 100 : penguin.id === 'chaotic' ? 220 : 160), 0.5, 0.25);
    setExploredPenguinIds(prev => prev.includes(penguin.id) ? prev : [...prev, penguin.id]);
    setSelectedPenguin(penguin);
  };

  const handleCloseModal = () => {
    sound.playClick();
    setSelectedPenguin(null);
  };

  return (
    <div className="w-full h-full relative p-4 sm:p-6 flex flex-col justify-between items-center text-center bg-[#fdfbf7] text-[#2b1b22] overflow-hidden select-none">
      {/* Scrapbook Stitched Border */}
      <div className="absolute inset-3 border-2 border-dashed border-[#70a288]/30 rounded-3xl pointer-events-none z-10" />

      {/* Decorative Washi Tapes */}
      <div className="absolute top-2 left-8 w-16 h-5 bg-[#b5e2fa]/70 -rotate-3 shadow-xs border-y border-white/60 pointer-events-none z-20" />
      <div className="absolute top-2 right-8 w-16 h-5 bg-[#ffccd5]/70 rotate-3 shadow-xs border-y border-white/60 pointer-events-none z-20" />

      {/* Header */}
      <div className="relative z-20 pt-1 shrink-0 max-w-[320px]">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#e8f5e9] text-[#2e7d32] font-serif italic text-xs font-semibold mb-1 shadow-xs">
          <span>🐧</span>
          <span>{config.heading}</span>
        </div>
        <h2 className="font-serif text-lg sm:text-xl font-bold text-[#c9184a]">
          Meet Your Bestie Squad
        </h2>
        <p className="text-xs text-[#6b535d] mt-0.5 max-w-[280px] mx-auto">
          {config.subheading}
        </p>
        <div className="mt-1 text-[11px] text-[#e07a5f] font-medium">
          Explored: {exploredPenguinIds.length} of {config.penguins.length} penguins ✨
        </div>
      </div>

      {/* Penguin Trio Layout - Responsive for both Portrait and Landscape */}
      <div className="relative z-20 w-full flex-1 flex items-center justify-center py-2 px-1">
        <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full max-w-[360px] sm:max-w-[400px]">
          {config.penguins.map((penguin, idx) => {
            const isExplored = exploredPenguinIds.includes(penguin.id);
            const isCurrent = selectedPenguin?.id === penguin.id;

            return (
              <motion.button
                key={penguin.id}
                id={`penguin-btn-${penguin.id}`}
                onClick={() => handleSelectPenguin(penguin)}
                animate={{
                  y: [0, -6, 0],
                  scale: isCurrent ? 1.05 : 1
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.2 + idx * 0.4,
                  ease: "easeInOut"
                }}
                className={`relative flex flex-col items-center p-2 sm:p-3 rounded-2xl cursor-pointer transition-all active:scale-95 border-2 ${
                  isCurrent
                    ? 'bg-white shadow-lg border-[#ff758f]'
                    : isExplored
                    ? 'bg-white/80 shadow-xs border-[#ffd166]/50'
                    : 'bg-white/60 shadow-xs border-transparent hover:bg-white/90'
                }`}
              >
                {/* Badge Tag */}
                <div className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold text-white mb-1 shadow-xs ${penguin.badgeColor}`}>
                  {penguin.personality.split(' ')[1] || penguin.personality}
                </div>

                {/* Penguin Illustration */}
                <div className="w-16 h-18 sm:w-20 sm:h-22 relative my-1">
                  <img
                    src={penguin.illustration}
                    alt={penguin.name}
                    className="w-full h-full object-contain filter drop-shadow-sm"
                  />
                  {isExplored && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#ff4d6d] text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                      ✓
                    </span>
                  )}
                </div>

                {/* Name */}
                <span className="font-serif text-xs font-bold text-[#2b1b22]">
                  {penguin.name}
                </span>
                <span className="text-[10px] text-[#6b535d] line-clamp-1 italic font-serif">
                  Tap to hear ♡
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Modal Popup with Penguin's Secret Note */}
      <AnimatePresence>
        {selectedPenguin && (
          <div
            id="penguin-modal-backdrop"
            onClick={handleCloseModal}
            className="absolute inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-5 pointer-events-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-5 text-left w-full max-w-[310px] shadow-2xl relative border-2 border-[#ffd166]/60"
            >
              {/* Corner Close Button */}
              <button
                id="close-penguin-note-x"
                onClick={handleCloseModal}
                className="absolute top-4 right-4 w-7 h-7 rounded-full bg-[#f4ebe1] hover:bg-[#ebdccb] text-[#6b535d] flex items-center justify-center text-xs font-bold cursor-pointer active:scale-90 transition-all"
                aria-label="Close"
              >
                ✕
              </button>

              {/* Penguin Avatar in Modal */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-14 h-14 shrink-0 bg-[#fff0f3] rounded-2xl p-1 shadow-inner border border-[#ffccd5]">
                  <img
                    src={selectedPenguin.illustration}
                    alt={selectedPenguin.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <div className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-bold text-white mb-0.5 ${selectedPenguin.badgeColor}`}>
                    {selectedPenguin.personality}
                  </div>
                  <h3 className="font-serif text-base font-bold text-[#c9184a]">
                    {selectedPenguin.name}'s Note
                  </h3>
                </div>
              </div>

              {/* Message Quote */}
              <div className="bg-[#fdfbf7] rounded-xl p-3.5 border-l-4 border-[#ff758f] shadow-xs mb-3">
                <p className="font-serif italic text-sm text-[#2b1b22] leading-relaxed">
                  “{selectedPenguin.message}”
                </p>
                <span className="font-handwriting text-sm text-[#e07a5f] font-bold block mt-1 text-right">
                  {selectedPenguin.footnote}
                </span>
              </div>

              <button
                id="close-penguin-note-btn"
                onClick={handleCloseModal}
                className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#ff4d6d] to-[#ff758f] text-white text-xs font-semibold cursor-pointer active:scale-95 transition-transform text-center shadow-sm"
              >
                Got it! 🐧✨
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Continue Button Section */}
      <div className="relative z-30 shrink-0 pb-2 w-full max-w-[280px]">
        <button
          id="continue-to-scrapbook-btn"
          onClick={() => {
            sound.playClick();
            onNext();
          }}
          className="w-full h-12 rounded-full bg-gradient-to-r from-[#e07a5f] to-[#f4a261] text-white font-semibold text-sm shadow-md active:scale-95 transition-transform cursor-pointer flex items-center justify-center gap-2 hover:shadow-lg focus:outline-none"
        >
          <span>{config.continueBtn}</span>
        </button>
      </div>
    </div>
  );
};

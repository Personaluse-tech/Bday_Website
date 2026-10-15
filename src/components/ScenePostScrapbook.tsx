import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/sound';
import { BIRTHDAY_CONFIG, ScrapbookMemoryItem } from '../config';

interface Props {
  onNext: () => void;
}

export const ScenePostScrapbook: React.FC<Props> = ({ onNext }) => {
  const config = BIRTHDAY_CONFIG.postBirthday.scrapbook;
  const [activeMemory, setActiveMemory] = useState<ScrapbookMemoryItem | null>(null);

  const handleOpenPhoto = (item: ScrapbookMemoryItem) => {
    sound.playShutter();
    setActiveMemory(item);
  };

  const handleClosePhoto = () => {
    sound.playClick();
    setActiveMemory(null);
  };

  return (
    <div className="w-full h-full relative flex flex-col justify-between bg-[#fbf8f3] text-[#2b1b22] overflow-hidden select-none">
      {/* Scrapbook Hand-drawn Stitch Border */}
      <div className="absolute inset-2 sm:inset-3 border-2 border-dashed border-[#e07a5f]/30 rounded-3xl pointer-events-none z-10" />

      {/* Decorative Washi Tapes at Top */}
      <div className="absolute top-2 left-6 w-20 h-5 bg-[#ffccd5]/80 -rotate-3 shadow-xs border-y border-white/60 pointer-events-none z-20" />
      <div className="absolute top-2 right-6 w-20 h-5 bg-[#ffe6a7]/80 rotate-2 shadow-xs border-y border-white/60 pointer-events-none z-20" />

      {/* Header Bar */}
      <div className="relative z-20 pt-5 pb-2 px-6 shrink-0 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#ffeedb] text-[#e07a5f] font-serif italic text-xs font-semibold mb-1 shadow-xs">
          <span>📸</span>
          <span>Personal Scrapbook</span>
        </div>
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#c9184a]">
          {config.heading}
        </h2>
        <p className="text-xs text-[#6b535d] mt-0.5">
          {config.subheading}
        </p>
        <span className="text-[10px] text-[#e07a5f] font-medium block mt-0.5">
          (Tap any photo to read the full memory ♡)
        </span>
      </div>

      {/* Scrollable Scrapbook Collage Area */}
      <div className="relative z-20 flex-1 min-h-0 w-full overflow-y-auto px-4 sm:px-6 py-2">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 pb-6">
          {config.memories.map((item, index) => {
            const rot = item.rotation ?? (index % 2 === 0 ? -2 : 2);

            return (
              <motion.div
                key={item.id}
                id={`scrapbook-photo-${item.id}`}
                onClick={() => handleOpenPhoto(item)}
                whileHover={{ scale: 1.03, rotate: 0 }}
                whileTap={{ scale: 0.97 }}
                className="relative bg-white p-2.5 pb-3.5 rounded-xl shadow-md border border-[#e5e5e5] cursor-pointer group transition-shadow hover:shadow-xl"
                style={{
                  transform: `rotate(${rot}deg)`
                }}
              >
                {/* Washi Tape Accent */}
                <div
                  className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-12 h-4 shadow-2xs border-y border-white/60 z-10"
                  style={{
                    backgroundColor: item.washiColor || '#ffd166',
                    opacity: 0.85,
                    transform: `rotate(${index % 2 === 0 ? -4 : 5}deg)`
                  }}
                />

                {/* Photo Frame Container */}
                <div className="w-full aspect-square rounded-lg overflow-hidden bg-[#fff0f3] mb-2 shadow-inner border border-black/5 relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  {item.tag && (
                    <span className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/60 backdrop-blur-xs text-white text-[8px] font-semibold rounded-md">
                      {item.tag}
                    </span>
                  )}
                </div>

                {/* Polaroid Bottom Caption */}
                <h4 className="font-serif text-[11px] sm:text-xs font-bold text-[#2b1b22] line-clamp-1 text-center">
                  {item.title}
                </h4>
                <p className="font-handwriting text-xs text-[#c9184a] font-bold line-clamp-1 text-center mt-0.5">
                  “{item.caption}”
                </p>
                {item.date && (
                  <span className="text-[9px] text-[#6b535d] block text-center mt-0.5 opacity-80">
                    {item.date}
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal for Enlarge Photo & Full Caption */}
      <AnimatePresence>
        {activeMemory && (
          <div
            id="scrapbook-lightbox-backdrop"
            onClick={handleClosePhoto}
            className="absolute inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 pointer-events-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-4 sm:p-5 text-left w-full max-w-[320px] shadow-2xl relative border-2 border-[#ffd166]/60 flex flex-col"
            >
              {/* Corner Close Button */}
              <button
                id="close-lightbox-btn"
                onClick={handleClosePhoto}
                className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#f4ebe1] hover:bg-[#ebdccb] text-[#6b535d] flex items-center justify-center text-xs font-bold cursor-pointer active:scale-90 transition-all z-10"
                aria-label="Close"
              >
                ✕
              </button>

              {/* Photo Display */}
              <div className="w-full aspect-square rounded-2xl overflow-hidden bg-[#fff0f3] mb-3 shadow-inner border border-black/5">
                <img
                  src={activeMemory.image}
                  alt={activeMemory.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Memory Details */}
              <div className="flex items-center justify-between mb-1">
                <span className="px-2 py-0.5 rounded-full bg-[#ffeedb] text-[#e07a5f] text-[10px] font-bold">
                  {activeMemory.date || 'Memory ♡'}
                </span>
                {activeMemory.tag && (
                  <span className="text-[10px] text-[#6b535d] italic font-serif">
                    {activeMemory.tag}
                  </span>
                )}
              </div>

              <h3 className="font-serif text-base font-bold text-[#c9184a] mb-1">
                {activeMemory.title}
              </h3>

              <div className="bg-[#fdfbf7] p-3 rounded-xl border border-[#ffccd5]/50 shadow-2xs mb-3">
                <p className="font-handwriting text-base font-bold text-[#843b62] leading-snug">
                  “{activeMemory.caption}”
                </p>
              </div>

              <button
                id="close-lightbox-confirm-btn"
                onClick={handleClosePhoto}
                className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#ff4d6d] to-[#ff758f] text-white text-xs font-semibold cursor-pointer active:scale-95 transition-transform text-center shadow-sm"
              >
                Keep in My Heart ♡
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Sticky Bottom Next Button Bar (never overlaps content) */}
      <div className="relative z-30 shrink-0 p-3 pt-2 bg-gradient-to-t from-[#fbf8f3] via-[#fbf8f3] to-transparent w-full flex justify-center">
        <button
          id="continue-to-proposal-btn"
          onClick={() => {
            sound.playClick();
            onNext();
          }}
          className="w-full max-w-[280px] h-12 rounded-full bg-gradient-to-r from-[#ff4d6d] to-[#ff758f] text-white font-semibold text-sm shadow-md active:scale-95 transition-transform cursor-pointer flex items-center justify-center gap-2 hover:shadow-lg focus:outline-none"
        >
          <span>{config.continueBtn}</span>
        </button>
      </div>
    </div>
  );
};

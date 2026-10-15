import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/sound';
import { BIRTHDAY_CONFIG } from '../config';
import { HugIntroAnimation } from './HugIntroAnimation';
import { HugEmbraceAnimation } from './HugEmbraceAnimation';

interface Props {
  onNext: () => void;
}

export const ScenePostHug: React.FC<Props> = ({ onNext }) => {
  const config = BIRTHDAY_CONFIG.postBirthday.hug;
  const [isHugging, setIsHugging] = useState(false);
  const [embraceComplete, setEmbraceComplete] = useState(false);

  const handleGiveHug = () => {
    if (isHugging) return;
    setIsHugging(true);
  };

  return (
    <div className="w-full h-full relative p-4 sm:p-6 flex flex-col justify-between items-center text-center bg-[#fdfbf7] text-[#2b1b22] overflow-y-auto select-none">
      {/* Decorative Scrapbook Frame with Safe Inner Spacing */}
      <div className="absolute inset-2 sm:inset-3 border-2 border-dashed border-[#ff758f]/25 rounded-3xl pointer-events-none z-10" />

      {/* Top Header */}
      <div className="relative z-20 pt-2 shrink-0 max-w-[340px]">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#ffe5ec] text-[#c9184a] font-serif italic text-xs font-semibold mb-1.5 shadow-2xs">
          <span>🤗</span>
          <span>Squeeze Me Tight</span>
        </div>
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#c9184a] leading-tight break-words px-2">
          {config.heading}
        </h2>
        <p className="text-xs text-[#6b535d] mt-1 px-3">
          {config.subheading}
        </p>
      </div>

      {/* Center Character Area */}
      <div className="relative z-20 w-full flex-1 flex flex-col items-center justify-center my-auto py-2 min-w-0">
        <AnimatePresence mode="wait">
          {!isHugging ? (
            /* ================= STAGE 1: PLEADING FOR HUG ================= */
            <motion.div
              key="open-arms"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.35 }}
              className="w-full max-w-[340px] flex flex-col items-center px-1"
            >
              {/* Pleading Bear Animation */}
              <div className="w-full flex justify-center mb-1">
                <HugIntroAnimation />
              </div>

              {/* Supporting Card */}
              <div className="bg-white/95 rounded-2xl p-4 shadow-sm border border-[#ffd166]/60 w-full mb-3 text-center box-border">
                <p className="font-serif italic text-xs sm:text-sm text-[#2b1b22] leading-relaxed break-words">
                  “Arms are calibrated, warmth is at maximum level, waiting for your touch.”
                </p>
                <span className="font-handwriting text-base text-[#e07a5f] font-bold block mt-1.5">
                  Ready when you are ♡
                </span>
              </div>

              {/* Hug Trigger Button */}
              <button
                id="give-hug-btn"
                onClick={handleGiveHug}
                className="w-full h-12 rounded-full bg-gradient-to-r from-[#ff4d6d] to-[#ff758f] text-white font-semibold text-sm shadow-md active:scale-95 transition-transform cursor-pointer flex items-center justify-center gap-2 hover:shadow-lg focus:outline-none"
              >
                <span>{config.buttonText}</span>
              </button>
            </motion.div>
          ) : (
            /* ================= STAGE 2: OPPOSITE SIDES EMBRACE ================= */
            <motion.div
              key="hugging"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-[340px] flex flex-col items-center px-1"
            >
              {/* Two Characters Running In & Embracing */}
              <div className="w-full flex justify-center mb-1">
                <HugEmbraceAnimation onComplete={() => setEmbraceComplete(true)} />
              </div>

              {/* Warm Reveal Note Card (Appears after the hug and I MISS YOU reveal) */}
              <AnimatePresence>
                {embraceComplete && (
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55 }}
                    className="w-full flex flex-col items-center"
                  >
                    <div className="bg-white/95 rounded-2xl p-4 sm:p-5 shadow-md border-2 border-[#ff4d6d]/30 w-full mb-3 text-center box-border">
                      <h3 className="font-serif text-base sm:text-lg font-bold text-[#c9184a] mb-1.5 break-words">
                        {config.revealTitle}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#6b535d] leading-relaxed mb-2 font-sans break-words">
                        {config.revealSubtitle}
                      </p>
                      <div className="pt-2 border-t border-[#ffccd5]/50">
                        <p className="font-handwriting text-base sm:text-lg font-bold text-[#e07a5f]">
                          “Distance means so little when someone means so much.” ❤️
                        </p>
                      </div>
                    </div>

                    {/* Continue to Final Scene Button */}
                    <button
                      id="hug-continue-btn"
                      onClick={() => {
                        sound.playClick();
                        onNext();
                      }}
                      className="w-full h-12 rounded-full bg-gradient-to-r from-[#ff4d6d] to-[#ff758f] text-white font-semibold text-sm shadow-md active:scale-95 transition-transform cursor-pointer flex items-center justify-center gap-2 hover:shadow-lg focus:outline-none"
                    >
                      <span>{config.continueBtn}</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Subtext with safe area padding */}
      <div className="relative z-20 pb-2 shrink-0">
        <p className="font-handwriting text-base font-bold text-[#843b62]">
          unlimited free hugs included in our friendship contract ♡
        </p>
      </div>
    </div>
  );
};

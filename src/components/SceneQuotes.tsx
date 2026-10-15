import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/sound';
import { BIRTHDAY_CONFIG } from '../config';

interface Props {
  onNext: () => void;
}

export const SceneQuotes: React.FC<Props> = ({ onNext }) => {
  const [index, setIndex] = useState(0);
  const quotes = BIRTHDAY_CONFIG.quoteCards;

  const handleNext = () => {
    sound.playClick();
    if (index < quotes.length - 1) {
      setIndex(prev => prev + 1);
    } else {
      onNext();
    }
  };

  const current = quotes[index];

  return (
    <div className="w-full h-full flex flex-col items-center justify-between py-6 px-4 text-center select-none overflow-y-auto">
      {/* Top Tag */}
      <div className="flex items-center gap-2 bg-white/70 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/80 shadow-xs shrink-0">
        <span className="text-[#ff4d6d] text-xs">✦</span>
        <span className="text-[11px] font-semibold text-[#843b62] tracking-wider uppercase">
          Thought {index + 1} of {quotes.length}
        </span>
      </div>

      {/* Quote Card */}
      <div className="w-full max-w-[340px] sm:max-w-[360px] bg-white/95 backdrop-blur-md rounded-3xl pt-8 pb-7 px-7 sm:pt-9 sm:pb-8 sm:px-8 shadow-[0_8px_30px_rgba(201,24,74,0.08)] border border-white/95 flex flex-col justify-between my-auto text-left relative box-border min-w-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col gap-4 min-w-0"
          >
            <div className="flex items-center justify-between border-b border-[#ffd1dc] pb-3 pt-1 px-1">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#c9184a] break-words pr-2 tracking-wide leading-snug pl-1">
                {current.title}
              </h3>
              <span className="text-sm text-[#ff758f] shrink-0">♡</span>
            </div>

            <div className="flex flex-col gap-3 my-1 min-w-0">
              {current.lines.map((line, i) => (
                <p key={i} className="text-xs sm:text-sm text-[#2b1b22] leading-relaxed font-normal break-words">
                  {line}
                </p>
              ))}
            </div>

            <p className="font-handwriting text-xl sm:text-2xl text-[#ff4d6d] font-bold pt-1 break-words">
              {current.footnote}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Action Button */}
      <div className="w-full max-w-[280px] shrink-0 pb-2">
        <button
          id="next-thought-btn"
          onClick={handleNext}
          className="w-full h-12 rounded-full bg-gradient-to-r from-[#ff4d6d] to-[#ff758f] text-white font-semibold text-sm shadow-[0_4px_16px_rgba(255,77,109,0.35)] active:scale-95 transition-transform flex items-center justify-center cursor-pointer"
        >
          <span>{index < quotes.length - 1 ? 'Next Thought ✨' : 'Read My Letter 💌'}</span>
        </button>
      </div>
    </div>
  );
};

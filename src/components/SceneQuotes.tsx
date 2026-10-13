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
    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
      <div className="w-full max-w-[320px] min-h-[380px] bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-md border border-white/95 flex flex-col justify-between text-left">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-4"
          >
            <h3 className="font-serif text-lg font-bold text-[#c9184a] pb-2 border-b border-[#ffd1dc]">
              {current.title}
            </h3>

            <div className="flex flex-col gap-3 my-2">
              {current.lines.map((line, i) => (
                <p key={i} className="text-sm text-[#2b1b22] leading-relaxed">
                  {line}
                </p>
              ))}
            </div>

            <p className="font-handwriting text-xl text-[#ff4d6d] font-bold">
              {current.footnote}
            </p>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={handleNext}
          className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#ff4d6d] to-[#ff758f] text-white font-semibold text-sm shadow-md active:scale-95 transition-transform mt-4 cursor-pointer"
        >
          <span>{index < quotes.length - 1 ? 'Next Thought ✨' : 'Read My Letter 💌'}</span>
        </button>
      </div>
    </div>
  );
};

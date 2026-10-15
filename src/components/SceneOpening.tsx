import React from 'react';
import { motion } from 'framer-motion';
import { BIRTHDAY_CONFIG } from '../config';

interface Props {
  onNext: () => void;
}

export const SceneOpening: React.FC<Props> = ({ onNext }) => {
  return (
    <div 
      onClick={onNext}
      className="w-full h-full flex flex-col items-center justify-between py-10 px-6 text-center cursor-pointer select-none relative overflow-y-auto"
    >
      <div className="shrink-0 pt-2 opacity-0">spacer</div>

      <div className="flex flex-col gap-6 max-w-[320px] my-auto">
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9 }}
          className="font-serif text-2xl text-[#c9184a] leading-relaxed"
        >
          {BIRTHDAY_CONFIG.opening.line1}
        </motion.p>

        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.9 }}
          className="font-serif text-2xl text-[#c9184a] leading-relaxed"
        >
          {BIRTHDAY_CONFIG.opening.line2}
        </motion.p>

        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3, duration: 0.9 }}
          className="font-serif text-2xl text-[#ff4d6d] font-semibold leading-relaxed"
        >
          {BIRTHDAY_CONFIG.opening.line3}
        </motion.p>
      </div>

      <div className="shrink-0 pb-4">
        <motion.button 
          id="step-inside-btn"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: [0.7, 1, 0.7], scale: 1 }}
          transition={{ delay: 2.8, duration: 2, repeat: Infinity }}
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="px-6 py-2.5 rounded-full bg-white/70 hover:bg-white/90 backdrop-blur-md border border-white/80 shadow-xs text-xs font-semibold text-[#843b62] cursor-pointer active:scale-95 transition-all"
        >
          {BIRTHDAY_CONFIG.opening.subtext}
        </motion.button>
      </div>
    </div>
  );
};

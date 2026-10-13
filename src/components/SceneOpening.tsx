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
      className="w-full h-full flex flex-col items-center justify-center p-8 text-center cursor-pointer select-none relative"
    >
      <div className="flex flex-col gap-6 max-w-[320px]">
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="font-serif text-2xl text-[#c9184a] leading-relaxed"
        >
          {BIRTHDAY_CONFIG.opening.line1}
        </motion.p>

        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="font-serif text-2xl text-[#c9184a] leading-relaxed"
        >
          {BIRTHDAY_CONFIG.opening.line2}
        </motion.p>

        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.7, duration: 1 }}
          className="font-serif text-2xl text-[#ff4d6d] font-semibold leading-relaxed"
        >
          {BIRTHDAY_CONFIG.opening.line3}
        </motion.p>
      </div>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ delay: 3.5, duration: 2, repeat: Infinity }}
        className="absolute bottom-12 text-xs text-[#6b535d] tracking-wider"
      >
        {BIRTHDAY_CONFIG.opening.subtext}
      </motion.p>
    </div>
  );
};

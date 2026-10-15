import React from 'react';
import { motion } from 'framer-motion';
import { BIRTHDAY_CONFIG } from '../config';

interface Props {
  onNext: () => void;
}

export const SceneHiddenFinal: React.FC<Props> = ({ onNext }) => {
  const msg = BIRTHDAY_CONFIG.finalHiddenMessage;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-[#0b091a] via-[#1e1233] to-[#3b1443] text-white">
      <div className="flex flex-col gap-5 max-w-[300px] mb-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-serif text-xl text-[#ffccd5] leading-relaxed"
        >
          {msg.line1}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-sm text-[#f8edeb]"
        >
          {msg.line2}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1 }}
          className="font-serif text-2xl text-[#ffd166] italic font-semibold"
        >
          {msg.line3}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3.0 }}
          className="text-lg text-[#ff758f] font-bold"
        >
          {msg.line4}
        </motion.p>
      </div>

      <motion.button
        id="cut-cake-btn"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.6 }}
        onClick={onNext}
        className="py-3.5 px-8 rounded-full bg-gradient-to-r from-[#ff4d6d] to-[#ff758f] text-white font-semibold text-sm shadow-md active:scale-95 transition-transform cursor-pointer"
      >
        <span>Let's Cut The Cake! 🎂✨</span>
      </motion.button>
    </div>
  );
};

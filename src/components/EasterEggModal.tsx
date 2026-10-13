import React from 'react';
import { motion } from 'framer-motion';
import { sound } from '../utils/sound';
import { BIRTHDAY_CONFIG } from '../config';

interface Props {
  onClose: () => void;
}

export const EasterEggModal: React.FC<Props> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-md flex items-center justify-center p-6 text-center"
    >
      <motion.div
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 20 }}
        className="w-full max-w-[310px] bg-white rounded-3xl p-6 shadow-2xl flex flex-col items-center"
      >
        <div className="text-4xl mb-2">👑✨</div>
        <h3 className="font-serif text-lg font-bold text-[#c9184a] mb-3">
          {BIRTHDAY_CONFIG.easterEgg.secretFoundTitle}
        </h3>

        <div className="w-full h-36 rounded-xl overflow-hidden bg-[#ffe5ec] mb-3 shadow-inner">
          <img
            src={BIRTHDAY_CONFIG.easterEgg.secretImage}
            alt="Secret Easter Egg"
            className="w-full h-full object-cover"
          />
        </div>

        <p className="text-xs text-[#2b1b22] leading-relaxed mb-4">
          {BIRTHDAY_CONFIG.easterEgg.secretMessage}
        </p>

        <p className="font-handwriting text-sm font-bold text-[#ff4d6d] mb-5">
          {BIRTHDAY_CONFIG.easterEgg.secretSign}
        </p>

        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-[#ff4d6d] to-[#ff758f] text-white font-semibold text-xs shadow-md active:scale-95 transition-transform cursor-pointer"
        >
          <span>Keep Our Secret 💖</span>
        </button>
      </motion.div>
    </motion.div>
  );
};

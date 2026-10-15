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
      className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 text-center select-none"
    >
      <motion.div
        initial={{ scale: 0.85, y: 15 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.85, y: 15 }}
        className="w-full max-w-[340px] max-h-[92vh] overflow-y-auto bg-white rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col items-center border border-[#ffccd5]/50 box-border"
      >
        <div className="text-3xl mb-1 select-none">👑✨</div>
        <h3 className="font-serif text-base sm:text-lg font-bold text-[#c9184a] mb-2 leading-tight px-1">
          {BIRTHDAY_CONFIG.easterEgg.secretFoundTitle}
        </h3>

        {/* 1:1 Aspect Ratio Photo Box — Fits Full Portrait/Square Photo */}
        <div className="w-full max-w-[260px] aspect-square rounded-2xl overflow-hidden bg-[#fff0f3] mb-3 shadow-md border-2 border-[#ffccd5]/60 relative mx-auto">
          <img
            src={BIRTHDAY_CONFIG.easterEgg.secretImage}
            alt="Secret Easter Egg"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <p className="text-xs text-[#2b1b22] leading-relaxed mb-2 px-1 font-sans">
          {BIRTHDAY_CONFIG.easterEgg.secretMessage}
        </p>

        <p className="font-handwriting text-sm sm:text-base font-bold text-[#ff4d6d] mb-4">
          {BIRTHDAY_CONFIG.easterEgg.secretSign}
        </p>

        <button
          id="close-easter-egg-btn"
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="w-full h-11 rounded-full bg-gradient-to-r from-[#ff4d6d] to-[#ff758f] text-white font-semibold text-xs shadow-md active:scale-95 transition-transform cursor-pointer flex items-center justify-center gap-2 hover:shadow-lg focus:outline-none"
        >
          <span>Keep Our Secret 💖</span>
        </button>
      </motion.div>
    </motion.div>
  );
};

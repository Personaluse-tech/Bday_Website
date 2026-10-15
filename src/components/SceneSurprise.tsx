import React from 'react';
import { motion } from 'framer-motion';
import { sound } from '../utils/sound';
import { BIRTHDAY_CONFIG } from '../config';

interface Props {
  onNext: () => void;
}

export const SceneSurprise: React.FC<Props> = ({ onNext }) => {
  const handleClick = () => {
    sound.playUnlock();
    onNext();
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white/85 backdrop-blur-md rounded-3xl p-7 shadow-lg max-w-[320px] border border-white/90 flex flex-col items-center"
      >
        <h2 className="font-serif text-2xl font-bold text-[#c9184a] mb-2 tracking-tight">
          I knew you'd know it, {BIRTHDAY_CONFIG.recipientName} ❤️
        </h2>
        <p className="text-xs text-[#6b535d] leading-relaxed mb-6">
          Your little universe is ready to unfold. Step into the starry sky.
        </p>

        <motion.button
          id="unlock-universe-btn"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          animate={{ scale: [1, 1.1, 1], boxShadow: ['0 0 15px rgba(255,77,109,0.4)', '0 0 30px rgba(255,77,109,0.8)', '0 0 15px rgba(255,77,109,0.4)'] }}
          transition={{ repeat: Infinity, duration: 2 }}
          onClick={handleClick}
          className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#ff4d6d] to-[#c9184a] text-white text-4xl flex items-center justify-center shadow-xl cursor-pointer"
        >
          ❤️
        </motion.button>

        <p className="text-[11px] text-[#ff4d6d] font-bold tracking-widest mt-5">
          TAP TO UNLOCK UNIVERSE
        </p>
      </motion.div>
    </div>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { sound } from '../utils/sound';

interface Props {
  onProceed: () => void;
}

export const SoundPromptModal: React.FC<Props> = ({ onProceed }) => {
  const handleStart = async (withSound: boolean) => {
    if (withSound) {
      await sound.enableAudio();
    }
    onProceed();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-6 text-center bg-[#fff0f3]/95 backdrop-blur-md"
    >
      <motion.div 
        animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
        className="text-5xl mb-4"
      >
        ✨
      </motion.div>
      <h1 className="font-serif text-2xl font-bold text-[#c9184a] mb-2">Her Little Universe</h1>
      <p className="text-sm text-[#6b535d] max-w-[280px] mb-8 leading-relaxed">
        An interactive birthday experience crafted especially for you. Put on your headphones for the best dreamy experience.
      </p>

      <div className="flex flex-col gap-3 w-full max-w-[260px]">
        <button
          onClick={() => handleStart(true)}
          className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#ff4d6d] to-[#ff758f] text-white font-semibold text-sm shadow-md active:scale-95 transition-transform flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>🔊 Enter with Sound</span>
        </button>
        <button
          onClick={() => handleStart(false)}
          className="w-full py-3 px-6 rounded-full border border-[#843b62]/20 text-[#6b535d] font-medium text-xs active:scale-95 transition-transform cursor-pointer"
        >
          Continue silently
        </button>
      </div>
    </motion.div>
  );
};

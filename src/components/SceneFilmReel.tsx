import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/sound';
import { BIRTHDAY_CONFIG } from '../config';

interface Props {
  onNext: () => void;
}

export const SceneFilmReel: React.FC<Props> = ({ onNext }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flash, setFlash] = useState(false);
  const memories = BIRTHDAY_CONFIG.memories;

  useEffect(() => {
    sound.playShutter();
    setFlash(true);
    const flashTimer = setTimeout(() => setFlash(false), 250);

    if (currentIdx < memories.length - 1) {
      const nextTimer = setTimeout(() => {
        setCurrentIdx(prev => prev + 1);
      }, 1300);
      return () => {
        clearTimeout(flashTimer);
        clearTimeout(nextTimer);
      };
    }
  }, [currentIdx, memories.length]);

  return (
    <div className="fixed inset-0 z-[130] bg-black flex flex-col items-center justify-center p-6 text-center text-white">
      {/* Flash Effect */}
      {flash && <div className="absolute inset-0 bg-white pointer-events-none z-50 animate-pulse" />}

      <div className="w-full max-w-[290px] bg-white rounded-2xl p-4 shadow-2xl text-[#2b1b22] mb-6">
        <div className="w-full h-[250px] rounded-xl overflow-hidden bg-black/10 mb-3">
          <AnimatePresence mode="wait">
            <motion.img
              key={memories[currentIdx].id}
              src={memories[currentIdx].image}
              alt={memories[currentIdx].title}
              initial={{ scale: 1.1, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>
        </div>

        <p className="font-handwriting text-xl text-[#c9184a] font-bold">
          Replaying our moments forever… 🎬
        </p>
      </div>

      {currentIdx >= memories.length - 1 && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={onNext}
          className="py-3.5 px-8 rounded-full bg-gradient-to-r from-[#ff4d6d] to-[#ff758f] text-white font-semibold text-sm shadow-lg active:scale-95 transition-transform cursor-pointer"
        >
          <span>One Last Thing… ❤️</span>
        </motion.button>
      )}
    </div>
  );
};

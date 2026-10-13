import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/sound';
import { BIRTHDAY_CONFIG } from '../config';

interface Props {
  onPlayFilm: () => void;
}

export const SceneTimeline: React.FC<Props> = ({ onPlayFilm }) => {
  const [index, setIndex] = useState(0);
  const memories = BIRTHDAY_CONFIG.memories;

  const handlePrev = () => {
    if (index > 0) {
      sound.playClick();
      setIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (index < memories.length - 1) {
      sound.playClick();
      setIndex(prev => prev + 1);
    }
  };

  const current = memories[index];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
      <h2 className="font-serif text-xl font-bold text-[#c9184a] mb-4">
        Our Little Timeline 🎞️
      </h2>

      {/* Polaroid Card */}
      <div className="w-full max-w-[310px] h-[390px] relative mb-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 0.95, rotate: index % 2 === 0 ? -2 : 2 }}
            animate={{ opacity: 1, scale: 1, rotate: index % 2 === 0 ? -1 : 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full bg-white rounded-2xl p-4 shadow-md flex flex-col justify-between"
          >
            {/* Washi Tape */}
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#ffe66d]/60 backdrop-blur-[1px] rotate-[-2deg]" />

            {/* Photo Frame */}
            <div className="w-full h-[240px] rounded-xl overflow-hidden bg-[#f8edeb] shadow-inner">
              <img 
                src={current.image} 
                alt={current.title} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Caption */}
            <div className="text-left mt-2">
              <span className="text-[10px] font-bold tracking-wider text-[#ff4d6d]">
                {current.tag || current.date}
              </span>
              <h3 className="font-handwriting text-xl font-bold text-[#c9184a]">
                {current.title}
              </h3>
              <p className="text-xs text-[#6b535d] leading-snug">
                {current.caption}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination Controls */}
      <div className="flex gap-3 mb-3">
        <button
          onClick={handlePrev}
          disabled={index === 0}
          className="py-2 px-5 rounded-full border border-[#843b62]/20 text-[#6b535d] text-xs font-medium disabled:opacity-30 active:scale-95 cursor-pointer"
        >
          ← Prev
        </button>
        <button
          onClick={handleNext}
          disabled={index === memories.length - 1}
          className="py-2 px-6 rounded-full bg-gradient-to-r from-[#ff4d6d] to-[#ff758f] text-white text-xs font-semibold shadow-sm disabled:opacity-30 active:scale-95 cursor-pointer"
        >
          Next Photo →
        </button>
      </div>

      <button
        onClick={onPlayFilm}
        className="text-xs font-medium text-[#c9184a] underline py-1.5 cursor-pointer"
      >
        ↻ Replay As Cinematic Film
      </button>
    </div>
  );
};

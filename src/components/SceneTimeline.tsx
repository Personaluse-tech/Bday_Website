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
    } else {
      // Reached the end: play film
      sound.playClick();
      onPlayFilm();
    }
  };

  const current = memories[index];

  return (
    <div className="w-full h-full flex flex-col items-center justify-between py-5 px-4 text-center select-none overflow-y-auto">
      {/* Top Header */}
      <div className="flex flex-col items-center shrink-0">
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#c9184a] tracking-tight">
          Our Little Timeline 🎞️
        </h2>
        <span className="text-[11px] text-[#843b62]/70 font-medium mt-0.5">
          Chapter {index + 1} of {memories.length}
        </span>
      </div>

      {/* Polaroid Card */}
      <div className="w-full max-w-[310px] my-auto relative py-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 0.95, rotate: index % 2 === 0 ? -2 : 2 }}
            animate={{ opacity: 1, scale: 1, rotate: index % 2 === 0 ? -1 : 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-full bg-white rounded-3xl p-4 shadow-[0_8px_25px_rgba(201,24,74,0.1)] border border-[#ffccd5]/40 flex flex-col justify-between"
          >
            {/* Cute Washi Tape */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-20 h-4.5 bg-[#ffe66d]/70 backdrop-blur-[1px] rotate-[-2deg] rounded-xs shadow-xs" />

            {/* Photo Frame */}
            <div className="w-full h-[180px] sm:h-[210px] rounded-2xl overflow-hidden bg-[#f8edeb] shadow-inner mb-3">
              <img 
                src={current.image} 
                alt={current.title} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Caption & Title */}
            <div className="text-left">
              <span className="text-[10px] font-bold tracking-wider text-[#ff4d6d] uppercase">
                {current.tag || current.date}
              </span>
              <h3 className="font-handwriting text-xl font-bold text-[#c9184a] leading-tight">
                {current.title}
              </h3>
              <p className="text-xs text-[#6b535d] leading-snug mt-1">
                {current.caption}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls Area */}
      <div className="w-full max-w-[310px] flex flex-col items-center gap-2.5 shrink-0 pb-1">
        {/* Pagination Buttons */}
        <div className="flex gap-2.5 w-full">
          <button
            id="timeline-prev-btn"
            onClick={handlePrev}
            disabled={index === 0}
            className="flex-1 h-11 rounded-full border border-[#843b62]/25 text-[#6b535d] text-xs font-semibold disabled:opacity-30 active:scale-95 transition-all cursor-pointer bg-white/70"
          >
            ← Prev
          </button>
          <button
            id="timeline-next-btn"
            onClick={handleNext}
            className="flex-1 h-11 rounded-full bg-gradient-to-r from-[#ff4d6d] to-[#ff758f] text-white text-xs font-semibold shadow-md active:scale-95 transition-all cursor-pointer"
          >
            {index < memories.length - 1 ? 'Next Photo →' : 'Watch Film 🎬'}
          </button>
        </div>

        {/* Cinematic Film Shortcut */}
        <button
          id="play-film-btn"
          onClick={onPlayFilm}
          className="text-xs font-semibold text-[#c9184a] hover:underline py-1 cursor-pointer flex items-center gap-1.5"
        >
          <span>↻ Replay As Cinematic Film</span>
        </button>
      </div>
    </div>
  );
};

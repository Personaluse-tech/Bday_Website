import React from 'react';
import { motion } from 'framer-motion';
import { BIRTHDAY_CONFIG } from '../config';

interface Props {
  onNext: () => void;
}

export const SceneHeartImpact: React.FC<Props> = ({ onNext }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-between py-6 px-5 text-center select-none overflow-y-auto">
      {/* Top Heading Group */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center shrink-0 pt-2"
      >
        <span className="text-3xl mb-1 filter drop-shadow-[0_2px_8px_rgba(255,77,109,0.4)]">
          💘✨
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl text-[#c9184a] font-bold tracking-tight">
          HAPPY BIRTHDAY, {BIRTHDAY_CONFIG.recipientName.toUpperCase()}! ❤️
        </h1>
        <p className="text-xs sm:text-sm text-[#6b535d] mt-1 font-medium">
          to my favorite human in the entire universe.
        </p>
      </motion.div>

      {/* Playful Bestie Banter Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-[340px] sm:max-w-[360px] bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 shadow-[0_8px_30px_rgba(201,24,74,0.08)] border border-white/95 flex flex-col gap-3.5 my-auto text-left box-border min-w-0"
      >
        <div className="flex items-center justify-between border-b border-[#ffe5ec] pb-2.5">
          <span className="text-[11px] font-semibold text-[#ff4d6d] tracking-wider uppercase">
            Official Bestie Dialogue
          </span>
          <span className="text-xs text-[#ffd166]">✦ ✦ ✦</span>
        </div>

        <div className="flex flex-col gap-2.5 min-w-0">
          {/* Dialogue Lines with comfortable internal padding */}
          <div className="bg-[#fff0f3] rounded-2xl px-4 py-3 border border-[#ffd1dc]/60">
            <p className="text-xs sm:text-sm text-[#2b1b22] font-medium leading-relaxed break-words">
              <span className="font-bold text-[#c9184a]">You:</span> “Are we best friends?”
            </p>
          </div>

          <div className="bg-[#fcf4dd]/80 rounded-2xl px-4 py-3 border border-[#ffd166]/40">
            <p className="text-xs sm:text-sm text-[#2b1b22] font-medium leading-relaxed break-words">
              <span className="font-bold text-[#800f2f]">Me:</span> “Obviously.”
            </p>
          </div>

          <div className="bg-[#fff0f3] rounded-2xl px-4 py-3 border border-[#ffd1dc]/60">
            <p className="text-xs sm:text-sm text-[#2b1b22] font-medium leading-relaxed break-words">
              <span className="font-bold text-[#c9184a]">You:</span> “Then why does this whole thing look like a suspiciously romantic love story?”
            </p>
          </div>

          <div className="bg-gradient-to-r from-[#ffe5ec] to-[#ffccd5] rounded-2xl px-4 py-3.5 border border-[#ff758f]/40 shadow-xs">
            <p className="font-handwriting text-lg sm:text-xl text-[#c9184a] font-bold leading-snug break-words">
              “Don't ask questions, {BIRTHDAY_CONFIG.recipientName} ({BIRTHDAY_CONFIG.nickname}). Just let the drama unfold.” 😂❤️
            </p>
          </div>
        </div>

        <p className="text-[11px] text-center text-[#843b62]/80 pt-1 tracking-wider font-medium">
          Two besties • One shared brain cell • Infinite love
        </p>
      </motion.div>

      {/* Unlock Action Button */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="w-full flex flex-col items-center gap-2 shrink-0 pb-2"
      >
        <button
          id="unlock-secret-btn"
          onClick={onNext}
          className="w-full max-w-[280px] h-12 rounded-full bg-gradient-to-r from-[#ff4d6d] to-[#ff758f] text-white font-semibold text-sm shadow-[0_4px_16px_rgba(255,77,109,0.35)] active:scale-95 transition-transform flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Unlock Your Secret 🔐</span>
        </button>
        <span className="text-[11px] text-[#843b62]/60">
          A secret passcode is required ahead ✨
        </span>
      </motion.div>
    </div>
  );
};

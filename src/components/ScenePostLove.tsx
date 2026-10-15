import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';
import { BIRTHDAY_CONFIG } from '../config';
import { KissesOverlay } from './KissesOverlay';

interface Props {
  onReplaySurprise: () => void;
  onReadLetterAgain: () => void;
  onReplayMemories: () => void;
}

export const ScenePostLove: React.FC<Props> = ({
  onReplaySurprise,
  onReadLetterAgain,
  onReplayMemories
}) => {
  const config = BIRTHDAY_CONFIG.postBirthday.finalLove;
  
  const textLine1 = config.messageLine1; // "I LOVE YOU"
  const textLine2 = config.recipientName; // "ANIFA (PYAARI) ❤️"
  
  const [charCountLine1, setCharCountLine1] = useState(0);
  const [charCountLine2, setCharCountLine2] = useState(0);
  const [isDoneWriting, setIsDoneWriting] = useState(false);
  const [showKisses, setShowKisses] = useState(false);

  useEffect(() => {
    // 1. Initial gentle suspense pause
    const startDelay = setTimeout(() => {
      let idx1 = 0;
      const interval1 = setInterval(() => {
        idx1++;
        setCharCountLine1(idx1);
        if (idx1 % 3 === 0) {
          sound.playClick();
        }
        if (idx1 >= textLine1.length) {
          clearInterval(interval1);

          // 2. Brief pause before Line 2
          setTimeout(() => {
            let idx2 = 0;
            const interval2 = setInterval(() => {
              idx2++;
              setCharCountLine2(idx2);
              if (idx2 % 3 === 0) {
                sound.playClick();
              }
              if (idx2 >= textLine2.length) {
                clearInterval(interval2);
                setIsDoneWriting(true);
                sound.playCelebration();
                
                // Gentle confetti burst
                confetti({
                  particleCount: 50,
                  spread: 60,
                  origin: { y: 0.55 },
                  colors: ['#ff4d6d', '#ffd166', '#ff758f', '#e07a5f']
                });

                // 3. Pause so full message is readable, then trigger animated kisses!
                setTimeout(() => {
                  setShowKisses(true);
                }, 600);
              }
            }, 65);
          }, 250);
        }
      }, 65);
    }, 250);

    return () => clearTimeout(startDelay);
  }, [textLine1, textLine2]);

  return (
    <div className="w-full h-full relative p-4 sm:p-6 flex flex-col justify-between items-center text-center bg-[#fdfbf7] text-[#2b1b22] overflow-y-auto select-none">
      {/* Decorative Scrapbook Frame with Safe Inner Spacing */}
      <div className="absolute inset-2 sm:inset-3 border-2 border-dashed border-[#e07a5f]/25 rounded-3xl pointer-events-none z-10" />

      {/* Top Header Tag */}
      <div className="relative z-20 pt-2 shrink-0">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#ffeedb] text-[#e07a5f] font-serif italic text-xs font-semibold mb-1 shadow-2xs">
          <span>💌</span>
          <span>{config.heading}</span>
        </div>
      </div>

      {/* Center Handwritten Scrapbook Card */}
      <div className="relative z-20 w-full flex-1 flex flex-col items-center justify-center my-auto py-2 min-w-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative bg-white/95 rounded-3xl p-6 sm:p-8 shadow-lg border-2 border-[#f4a261]/35 w-full max-w-[340px] text-center box-border overflow-visible"
        >
          {/* Animated Kisses and Floating Hearts Overlay */}
          <KissesOverlay active={showKisses} />

          {/* Paper Texture Stamp */}
          <div className="text-[11px] font-serif text-[#e07a5f]/60 italic mb-1">
            special delivery for my pyaari ♡
          </div>

          {/* Gentle Pulsing Heart */}
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="text-4xl mb-3"
          >
            💖
          </motion.div>

          {/* Handwritten Line 1: "I LOVE YOU" */}
          <div className="min-h-[48px] flex items-center justify-center">
            <h1 className="font-handwriting text-4xl sm:text-5xl font-bold text-[#c9184a] tracking-wider leading-none break-words">
              {textLine1.slice(0, charCountLine1)}
              {charCountLine1 < textLine1.length && (
                <span className="inline-block w-1.5 h-8 bg-[#c9184a] ml-1 animate-pulse align-middle" />
              )}
            </h1>
          </div>

          {/* Handwritten Line 2: "ANIFA (PYAARI) ❤️" */}
          <div className="min-h-[44px] flex items-center justify-center mt-1">
            <h2 className="font-handwriting text-2xl sm:text-3xl font-bold text-[#ff4d6d] tracking-wide leading-none break-words">
              {textLine2.slice(0, charCountLine2)}
              {charCountLine1 >= textLine1.length && charCountLine2 < textLine2.length && (
                <span className="inline-block w-1.5 h-6 bg-[#ff4d6d] ml-1 animate-pulse align-middle" />
              )}
            </h2>
          </div>

          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-2 my-4 opacity-40">
            <div className="w-12 h-px bg-[#e07a5f]" />
            <span className="text-xs text-[#e07a5f]">✦</span>
            <div className="w-12 h-px bg-[#e07a5f]" />
          </div>

          {/* Bestie Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: isDoneWriting ? 1 : 0.4, y: isDoneWriting ? 0 : 4 }}
            transition={{ duration: 0.5 }}
            className="font-serif italic text-xs sm:text-sm text-[#6b535d] leading-relaxed break-words"
          >
            {config.bestieTagline}
          </motion.p>
        </motion.div>
      </div>

      {/* Bottom Replay Action Buttons (Stacked cleanly with adequate spacing) */}
      <div className="relative z-30 shrink-0 pb-3 w-full max-w-[310px] flex flex-col gap-2">
        <button
          id="replay-surprise-btn"
          onClick={() => {
            sound.playClick();
            onReplaySurprise();
          }}
          className="w-full h-11 rounded-full bg-gradient-to-r from-[#ff4d6d] to-[#ff758f] text-white font-semibold text-xs shadow-md active:scale-95 transition-transform cursor-pointer flex items-center justify-center gap-1.5 hover:shadow-lg focus:outline-none"
        >
          <span>{config.replaySurpriseBtn}</span>
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button
            id="read-letter-again-btn"
            onClick={() => {
              sound.playClick();
              onReadLetterAgain();
            }}
            className="w-full h-10 rounded-full bg-white/90 hover:bg-white text-[#c9184a] font-semibold text-xs shadow-xs border border-[#ffccd5] active:scale-95 transition-all cursor-pointer flex items-center justify-center focus:outline-none"
          >
            <span>{config.readLetterAgainBtn}</span>
          </button>
          <button
            id="replay-memories-post-btn"
            onClick={() => {
              sound.playClick();
              onReplayMemories();
            }}
            className="w-full h-10 rounded-full bg-white/90 hover:bg-white text-[#6b535d] font-semibold text-xs shadow-xs border border-[#e07a5f]/30 active:scale-95 transition-all cursor-pointer flex items-center justify-center focus:outline-none"
          >
            <span>{config.replayMemoriesBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';
import { BIRTHDAY_CONFIG } from '../config';

interface Props {
  onNext: () => void;
}

export const ScenePostGift: React.FC<Props> = ({ onNext }) => {
  const config = BIRTHDAY_CONFIG.postBirthday.gift;
  const [giftState, setGiftState] = useState<'prompt' | 'opened' | 'rejected'>('prompt');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAccept = () => {
    if (isProcessing) return;
    setIsProcessing(true);
    setGiftState('opened');
    sound.playPop();

    // Trigger sweet confetti burst
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#ff758f', '#ffd166', '#ff4d6d', '#06d6a0', '#70d6ff']
    });

    setTimeout(() => {
      sound.playMagicalSparkle();
    }, 400);

    setTimeout(() => {
      onNext();
    }, 2200);
  };

  const handleDecline = () => {
    sound.playWrong();
    setGiftState('rejected');
  };

  const handleTryAgain = () => {
    sound.playClick();
    setGiftState('prompt');
  };

  return (
    <div className="w-full h-full relative p-5 sm:p-6 flex flex-col justify-between items-center text-center bg-[#fdfbf7] text-[#2b1b22] overflow-hidden select-none">
      {/* Scrapbook Hand-drawn Stitched Border */}
      <div className="absolute inset-3 border-2 border-dashed border-[#e07a5f]/30 rounded-3xl pointer-events-none z-10" />

      {/* Cute Washi Tape Decor at Corners */}
      <div className="absolute top-2 left-6 w-16 h-5 bg-[#ffccd5]/80 -rotate-6 shadow-xs border-y border-white/60 pointer-events-none z-20" />
      <div className="absolute top-2 right-6 w-16 h-5 bg-[#ffe6a7]/80 rotate-6 shadow-xs border-y border-white/60 pointer-events-none z-20" />

      {/* Header Section */}
      <div className="relative z-20 pt-2 shrink-0 max-w-[320px]">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#ffeedb] text-[#e07a5f] font-serif italic text-xs font-semibold mb-2 shadow-xs">
          <span>🎁</span>
          <span>A Post-Birthday Surprise</span>
        </div>
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#c9184a] leading-tight">
          {config.characterText}
        </h2>
      </div>

      {/* Center Interactive Gift Card Area */}
      <div className="relative z-20 w-full flex-1 flex flex-col items-center justify-center my-auto py-2">
        <AnimatePresence mode="wait">
          {giftState === 'prompt' && (
            <motion.div
              key="prompt"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.35 }}
              className="w-full max-w-[300px] flex flex-col items-center"
            >
              {/* Cute Illustrated Gift Box */}
              <motion.div
                animate={{ y: [0, -6, 0], rotate: [-1, 1, -1] }}
                transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
                className="w-44 h-44 sm:w-48 sm:h-48 mb-3"
              >
                <img
                  src="assets/illustrations/gift-box.svg"
                  alt="Gift for Anifa"
                  className="w-full h-full object-contain filter drop-shadow-md"
                />
              </motion.div>

              {/* Scrapbook Card Plate */}
              <div className="bg-white/95 rounded-2xl p-4 shadow-md border border-[#ffd166]/60 w-full mb-4">
                <p className="font-handwriting text-2xl font-bold text-[#e07a5f] tracking-wide mb-1">
                  {config.cardPrompt}
                </p>
                <p className="text-[11px] text-[#6b535d] font-sans">
                  Special delivery for Anifa. Handle with infinite affection! ♡
                </p>
              </div>

              {/* Two Interactive Choices */}
              <div className="flex flex-col gap-2.5 w-full">
                <button
                  id="accept-gift-yes-btn"
                  onClick={handleAccept}
                  disabled={isProcessing}
                  className="w-full h-12 rounded-full bg-gradient-to-r from-[#ff4d6d] to-[#ff758f] text-white font-semibold text-sm shadow-md active:scale-95 transition-transform cursor-pointer flex items-center justify-center gap-2 hover:shadow-lg focus:outline-none"
                >
                  <span>{config.acceptBtn}</span>
                </button>
                <button
                  id="accept-gift-no-btn"
                  onClick={handleDecline}
                  disabled={isProcessing}
                  className="w-full h-10 rounded-full bg-[#f4ebe1] hover:bg-[#ebdccb] text-[#6b535d] font-medium text-xs active:scale-95 transition-all cursor-pointer flex items-center justify-center focus:outline-none border border-[#e07a5f]/20"
                >
                  <span>{config.declineBtn}</span>
                </button>
              </div>
            </motion.div>
          )}

          {giftState === 'opened' && (
            <motion.div
              key="opened"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="w-full max-w-[300px] flex flex-col items-center"
            >
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-48 h-48 sm:w-52 sm:h-52 mb-3"
              >
                <img
                  src="assets/illustrations/gift-box-open.svg"
                  alt="Opened Gift"
                  className="w-full h-full object-contain filter drop-shadow-lg"
                />
              </motion.div>

              <div className="bg-white/95 rounded-2xl p-4 shadow-md border border-[#ff4d6d]/40 w-full">
                <h3 className="font-serif text-lg font-bold text-[#c9184a] mb-1">
                  {config.successTitle}
                </h3>
                <p className="text-xs text-[#6b535d] leading-relaxed">
                  {config.successSubtitle}
                </p>
                <div className="mt-2 flex justify-center gap-1.5 text-base animate-bounce">
                  <span>💖</span>
                  <span>🐧</span>
                  <span>✨</span>
                </div>
              </div>
            </motion.div>
          )}

          {giftState === 'rejected' && (
            <motion.div
              key="rejected"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-[300px] flex flex-col items-center"
            >
              <div className="text-6xl mb-2 animate-bounce">
                😭💔
              </div>

              <div className="bg-white/95 rounded-2xl p-5 shadow-lg border-2 border-[#ff758f]/50 w-full mb-4">
                <h3 className="font-serif text-base font-bold text-[#c9184a] mb-2">
                  {config.rejectReactionTitle}
                </h3>
                <p className="text-xs text-[#6b535d] leading-relaxed mb-1 font-sans">
                  {config.rejectReactionSubtitle}
                </p>
                <span className="font-handwriting text-lg text-[#ff4d6d] font-bold block mt-2">
                  “Nice try, but you can't escape my love that easily!”
                </span>
              </div>

              <button
                id="gift-try-again-btn"
                onClick={handleTryAgain}
                className="w-full h-12 rounded-full bg-gradient-to-r from-[#ff4d6d] to-[#ff758f] text-white font-semibold text-sm shadow-md active:scale-95 transition-transform cursor-pointer flex items-center justify-center gap-2 hover:shadow-lg focus:outline-none"
              >
                <span>{config.tryAgainBtn}</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Little Subtext Note at bottom */}
      <div className="relative z-20 pb-1 shrink-0">
        <p className="font-handwriting text-base font-bold text-[#843b62]">
          crafted with love &amp; chaos for Anifa ♡
        </p>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';
import { BIRTHDAY_CONFIG } from '../config';
import { ProposalAnimation } from './ProposalAnimation';

interface Props {
  onNext: () => void;
}

export const ScenePostProposal: React.FC<Props> = ({ onNext }) => {
  const config = BIRTHDAY_CONFIG.postBirthday.proposal;
  const [choice, setChoice] = useState<'unanswered' | 'yes' | 'think'>('unanswered');
  const [animationReady, setAnimationReady] = useState(false);

  const handleYes = () => {
    sound.playMagicalSparkle();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff4d6d', '#ffd166', '#ff758f', '#70d6ff', '#e07a5f']
    });
    setChoice('yes');
  };

  const handleThink = () => {
    sound.playWrong();
    setChoice('think');
  };

  return (
    <div className="w-full h-full relative p-4 sm:p-6 flex flex-col justify-between items-center text-center bg-[#fdfbf7] text-[#2b1b22] overflow-y-auto select-none">
      {/* Decorative Scrapbook Frame with Safe Inner Spacing */}
      <div className="absolute inset-2 sm:inset-3 border-2 border-dashed border-[#ff758f]/25 rounded-3xl pointer-events-none z-10" />

      {/* Top Header */}
      <div className="relative z-20 pt-2 shrink-0 max-w-[340px]">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#ffe5ec] text-[#c9184a] font-serif italic text-xs font-semibold mb-1.5 shadow-2xs">
          <span>💍</span>
          <span>A Highly Critical Question</span>
        </div>
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#c9184a] leading-tight break-words px-2">
          {config.heading}
        </h2>
        <p className="text-xs text-[#6b535d] mt-1 px-3">
          {config.subheading}
        </p>
      </div>

      {/* Center Animated Character & Content */}
      <div className="relative z-20 w-full flex-1 flex flex-col items-center justify-center my-auto py-2 min-w-0">
        <AnimatePresence mode="wait">
          {choice === 'unanswered' && (
            <motion.div
              key="unanswered"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.35 }}
              className="w-full max-w-[340px] flex flex-col items-center px-1"
            >
              {/* Kneeling Proposal Animation */}
              <div className="w-full flex justify-center mb-1">
                <ProposalAnimation onComplete={() => setAnimationReady(true)} />
              </div>

              {/* Proposal Dialogue Card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: animationReady ? 1 : 0.85, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white/95 rounded-2xl p-4 sm:p-5 shadow-sm border border-[#ff758f]/30 w-full mb-3 text-left box-border"
              >
                <p className="font-serif italic text-xs sm:text-sm text-[#2b1b22] leading-relaxed break-words">
                  “We've survived each other's worst jokes, 3 AM mental breakdowns, and suspicious couple vibes. It's time to make it official.”
                </p>
                <span className="font-handwriting text-base text-[#ff4d6d] font-bold block mt-2">
                  — Besties for life (and lovers for the plot) ♡
                </span>
              </motion.div>

              {/* Action Buttons with clear spacing */}
              <div className="flex flex-col gap-2.5 w-full">
                <button
                  id="proposal-yes-btn"
                  onClick={handleYes}
                  className="w-full h-12 rounded-full bg-gradient-to-r from-[#ff4d6d] to-[#ff758f] text-white font-semibold text-sm shadow-md active:scale-95 transition-transform cursor-pointer flex items-center justify-center gap-2 hover:shadow-lg focus:outline-none"
                >
                  <span>{config.yesBtn}</span>
                </button>
                <button
                  id="proposal-think-btn"
                  onClick={handleThink}
                  className="w-full h-10 rounded-full bg-[#f4ebe1] hover:bg-[#ebdccb] text-[#6b535d] font-medium text-xs active:scale-95 transition-all cursor-pointer flex items-center justify-center focus:outline-none border border-[#e07a5f]/20"
                >
                  <span>{config.thinkBtn}</span>
                </button>
              </div>
            </motion.div>
          )}

          {choice === 'yes' && (
            <motion.div
              key="yes"
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: 'spring', damping: 22, stiffness: 280 }}
              className="w-full max-w-[340px] flex flex-col items-center px-2"
            >
              <div className="text-5xl mb-2 animate-bounce">
                🎉💍👰‍♀️
              </div>

              <div className="bg-white/95 rounded-2xl p-5 shadow-md border-2 border-[#ff4d6d]/40 w-full mb-4 text-center box-border">
                <h3 className="font-serif text-lg font-bold text-[#c9184a] mb-2 break-words">
                  {config.yesTitle}
                </h3>
                <p className="text-xs sm:text-sm text-[#6b535d] leading-relaxed mb-3 font-sans break-words">
                  {config.yesMessage}
                </p>
                <div className="p-3 bg-[#fff0f3] rounded-xl border border-[#ffccd5]">
                  <p className="font-handwriting text-base font-bold text-[#ff4d6d]">
                    Official Status: Married to our friendship forever! ❤️
                  </p>
                </div>
              </div>

              <button
                id="proposal-continue-from-yes-btn"
                onClick={() => {
                  sound.playClick();
                  onNext();
                }}
                className="w-full h-12 rounded-full bg-gradient-to-r from-[#ff4d6d] to-[#ff758f] text-white font-semibold text-sm shadow-md active:scale-95 transition-transform cursor-pointer flex items-center justify-center gap-2 hover:shadow-lg focus:outline-none"
              >
                <span>{config.continueBtn}</span>
              </button>
            </motion.div>
          )}

          {choice === 'think' && (
            <motion.div
              key="think"
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-[340px] flex flex-col items-center px-2"
            >
              <div className="text-5xl mb-2 animate-bounce">
                🤨🤦‍♀️💀
              </div>

              <div className="bg-white/95 rounded-2xl p-5 shadow-md border-2 border-[#ff758f]/40 w-full mb-4 text-center box-border">
                <h3 className="font-serif text-base font-bold text-[#c9184a] mb-2 break-words">
                  {config.thinkTitle}
                </h3>
                <p className="text-xs text-[#6b535d] leading-relaxed mb-3 font-sans break-words">
                  {config.thinkMessage}
                </p>
                <p className="font-handwriting text-base font-bold text-[#ff4d6d]">
                  “Thinking time has expired. Your default answer is YES!” 😂
                </p>
              </div>

              <div className="flex flex-col gap-2.5 w-full">
                <button
                  id="proposal-switch-to-yes-btn"
                  onClick={handleYes}
                  className="w-full h-12 rounded-full bg-gradient-to-r from-[#ff4d6d] to-[#ff758f] text-white font-semibold text-sm shadow-md active:scale-95 transition-transform cursor-pointer flex items-center justify-center gap-2 hover:shadow-lg focus:outline-none"
                >
                  <span>{config.thinkChangeBtn}</span>
                </button>
                <button
                  id="proposal-continue-anyway-btn"
                  onClick={() => {
                    sound.playClick();
                    onNext();
                  }}
                  className="w-full h-10 rounded-full bg-[#f4ebe1] hover:bg-[#ebdccb] text-[#6b535d] font-medium text-xs active:scale-95 transition-all cursor-pointer flex items-center justify-center border border-[#e07a5f]/20"
                >
                  <span>Accept Fate &amp; Continue Hug 🤗</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Subtext with safe area padding */}
      <div className="relative z-20 pb-2 shrink-0">
        <p className="font-handwriting text-base font-bold text-[#843b62]">
          certified soulmate bond • non-transferable ♡
        </p>
      </div>
    </div>
  );
};

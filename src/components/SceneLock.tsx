import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sound } from '../utils/sound';
import { BIRTHDAY_CONFIG } from '../config';

interface Props {
  onNext: () => void;
}

export const SceneLock: React.FC<Props> = ({ onNext }) => {
  const [passcode, setPasscode] = useState('');
  const [feedback, setFeedback] = useState('Enter the 4-digit secret passcode');
  const [isShaking, setIsShaking] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [failedCount, setFailedCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIdx(prev => (prev + 1) % BIRTHDAY_CONFIG.lockScreen.cyclingQuotes.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const handleKey = (val: string) => {
    if (isUnlocked) return;

    if (val === 'del') {
      sound.playClick();
      setPasscode(prev => prev.slice(0, -1));
      return;
    }

    if (val === 'clear') {
      sound.playClick();
      setPasscode('');
      return;
    }

    if (passcode.length >= 4) return;

    sound.playClick();
    const nextCode = passcode + val;
    setPasscode(nextCode);

    if (nextCode.length === 4) {
      validate(nextCode);
    }
  };

  const validate = (code: string) => {
    if (code === BIRTHDAY_CONFIG.secretPassword) {
      setIsUnlocked(true);
      sound.playUnlock();
      setFeedback('Passcode accepted! Unlocking your universe… ✨');
      setTimeout(() => {
        onNext();
      }, 1000);
    } else {
      sound.playWrong();
      setIsShaking(true);
      const nextFail = failedCount + 1;
      setFailedCount(nextFail);
      const msgs = BIRTHDAY_CONFIG.lockScreen.wrongPasswordMessages;
      setFeedback(msgs[Math.min(nextFail - 1, msgs.length - 1)]);

      setTimeout(() => {
        setIsShaking(false);
        setPasscode('');
      }, 650);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-between py-5 px-4 text-center select-none overflow-y-auto">
      {/* Top Header & Lock Icon */}
      <div className="flex flex-col items-center shrink-0">
        <motion.div 
          animate={isShaking ? { x: [-8, 8, -6, 6, 0] } : isUnlocked ? { scale: 1.25, rotate: 12 } : {}}
          transition={{ duration: 0.4 }}
          className="text-3xl mb-1 filter drop-shadow-sm"
        >
          {isUnlocked ? '🔓' : '🔒'}
        </motion.div>
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#c9184a] tracking-tight">
          {BIRTHDAY_CONFIG.lockScreen.heading}
        </h2>
        <p className="text-xs text-[#6b535d] mt-0.5 max-w-[260px]">
          {BIRTHDAY_CONFIG.lockScreen.subheading}
        </p>
      </div>

      {/* Cycling Friendship Quote */}
      <div className="min-h-[38px] flex items-center justify-center px-4 my-auto shrink-0 max-w-[300px]">
        <motion.p 
          key={quoteIdx}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.35 }}
          className="font-serif italic text-xs text-[#843b62] leading-snug"
        >
          {BIRTHDAY_CONFIG.lockScreen.cyclingQuotes[quoteIdx]}
        </motion.p>
      </div>

      {/* Passcode Dots & Feedback Area */}
      <div className="flex flex-col items-center gap-2.5 shrink-0 my-auto">
        <motion.div 
          animate={isShaking ? { x: [-10, 10, -6, 6, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="flex gap-4 justify-center"
        >
          {[0, 1, 2, 3].map(idx => (
            <div
              key={idx}
              className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-200 ${
                idx < passcode.length 
                  ? 'bg-[#c9184a] border-[#c9184a] scale-120 shadow-[0_0_10px_#ff4d6d]' 
                  : 'bg-white/60 border-[#c9184a]/40'
              }`}
            />
          ))}
        </motion.div>

        <p className={`text-xs font-semibold min-h-[18px] max-w-[280px] transition-colors ${
          isUnlocked ? 'text-[#38b000]' : failedCount > 0 ? 'text-[#d90429]' : 'text-[#843b62]'
        }`}>
          {feedback}
        </p>

        <span className="text-[11px] text-[#843b62]/70 font-medium">
          {BIRTHDAY_CONFIG.lockScreen.hint}
        </span>
      </div>

      {/* Numeric Keypad (48-56px touch targets, zero overlap) */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-3 w-full max-w-[240px] shrink-0 pb-2">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'clear', '0', 'del'].map(btn => (
          <button
            key={btn}
            id={`keypad-${btn}`}
            onClick={() => handleKey(btn)}
            className="w-14 h-14 sm:w-15 sm:h-15 rounded-full bg-white/85 backdrop-blur-md border border-white/90 shadow-sm text-lg font-semibold text-[#2b1b22] flex items-center justify-center active:scale-90 active:bg-[#ffccd5] transition-all mx-auto cursor-pointer"
          >
            {btn === 'clear' ? (
              <span className="text-xs font-bold text-[#843b62]">C</span>
            ) : btn === 'del' ? (
              <span className="text-sm font-bold text-[#843b62]">⌫</span>
            ) : (
              btn
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

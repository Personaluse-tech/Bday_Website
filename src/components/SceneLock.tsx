import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sound } from '../utils/sound';
import { BIRTHDAY_CONFIG } from '../config';

interface Props {
  onNext: () => void;
}

export const SceneLock: React.FC<Props> = ({ onNext }) => {
  const [passcode, setPasscode] = useState('');
  const [feedback, setFeedback] = useState('Enter your 4-digit secret passcode');
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
      setFeedback('Passcode accepted! Unlocking… ✨');
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
      }, 600);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
      <div className="mb-4">
        <motion.div 
          animate={isShaking ? { x: [-8, 8, -6, 6, 0] } : isUnlocked ? { scale: 1.25, rotate: 15 } : {}}
          className="text-4xl mb-1"
        >
          {isUnlocked ? '🔓' : '🔒'}
        </motion.div>
        <h2 className="font-serif text-xl font-bold text-[#c9184a]">
          {BIRTHDAY_CONFIG.lockScreen.heading}
        </h2>
        <p className="text-xs text-[#6b535d] mt-0.5">
          {BIRTHDAY_CONFIG.lockScreen.subheading}
        </p>
      </div>

      <div className="h-12 flex items-center justify-center px-4 mb-3">
        <p className="font-serif italic text-xs text-[#843b62] leading-snug transition-opacity duration-300">
          {BIRTHDAY_CONFIG.lockScreen.cyclingQuotes[quoteIdx]}
        </p>
      </div>

      {/* Passcode dots */}
      <div className="flex gap-3.5 justify-center mb-4">
        {[0, 1, 2, 3].map(idx => (
          <div
            key={idx}
            className={`w-3.5 h-3.5 rounded-full border-2 border-[#c9184a] transition-all duration-200 ${
              idx < passcode.length ? 'bg-[#c9184a] scale-110 shadow-[0_0_8px_#ff4d6d]' : 'bg-transparent'
            }`}
          />
        ))}
      </div>

      <p className="text-xs font-medium text-[#c9184a] min-h-[20px] mb-4">
        {feedback}
      </p>

      {/* Numeric Keypad */}
      <div className="grid grid-cols-3 gap-3 w-full max-w-[260px]">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'clear', '0', 'del'].map(btn => (
          <button
            key={btn}
            onClick={() => handleKey(btn)}
            className="w-16 h-16 rounded-full bg-white/80 backdrop-blur-sm border border-white/90 shadow-sm text-lg font-semibold text-[#2b1b22] flex items-center justify-center active:scale-90 active:bg-[#ffccd5] transition-all mx-auto cursor-pointer"
          >
            {btn === 'clear' ? 'C' : btn === 'del' ? '⌫' : btn}
          </button>
        ))}
      </div>
    </div>
  );
};

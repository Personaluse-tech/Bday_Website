import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/sound';
import { BIRTHDAY_CONFIG } from '../config';

interface Props {
  onNext: () => void;
}

export const SceneUniverseLoading: React.FC<Props> = ({ onNext }) => {
  const [stepIdx, setStepIdx] = useState(0);
  const steps = BIRTHDAY_CONFIG.universeLoadingSteps;

  useEffect(() => {
    sound.playChime(600 + stepIdx * 80, 0.4);

    if (stepIdx < steps.length - 1) {
      const timer = setTimeout(() => {
        setStepIdx(prev => prev + 1);
      }, 1400);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        onNext();
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [stepIdx, steps.length, onNext]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-[#0b091a] via-[#1e1233] to-[#3b1443] text-white">
      <div className="min-h-[120px] flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={stepIdx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-3"
          >
            <span className="text-4xl">{steps[stepIdx].icon}</span>
            <p className="font-serif text-lg text-[#ffccd5] max-w-[280px] leading-relaxed">
              {steps[stepIdx].text}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-2 mt-8">
        {steps.map((_, i) => (
          <div 
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i <= stepIdx ? 'bg-[#ffd166] scale-125 shadow-[0_0_8px_#ffd166]' : 'bg-white/20'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

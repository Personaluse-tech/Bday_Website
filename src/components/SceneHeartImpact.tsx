import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { sound } from '../utils/sound';
import { BIRTHDAY_CONFIG } from '../config';

interface Props {
  onNext: () => void;
}

export const SceneHeartImpact: React.FC<Props> = ({ onNext }) => {
  const [exploded, setExploded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExploded(true);
      sound.playHeartBoom();
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
      {!exploded ? (
        <motion.div
          initial={{ scale: 0.2, opacity: 0 }}
          animate={{ scale: [1, 1.2, 1], opacity: 1 }}
          className="w-28 h-28 bg-gradient-to-tr from-[#ff4d6d] to-[#c9184a] rotate-[-45deg] relative shadow-[0_0_40px_rgba(255,77,109,0.8)] before:content-[''] before:w-28 before:h-28 before:bg-inherit before:rounded-full before:absolute before:-top-14 before:left-0 after:content-[''] after:w-28 after:h-28 after:bg-inherit after:rounded-full after:absolute after:top-0 after:left-14"
        />
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center max-w-[310px]"
        >
          <motion.h2 
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="font-serif text-2xl text-[#c9184a] font-bold mb-1"
          >
            {BIRTHDAY_CONFIG.cupidBanter.afterImpact1}
          </motion.h2>
          <p className="text-sm text-[#6b535d] mb-5">
            {BIRTHDAY_CONFIG.cupidBanter.afterImpact2}
          </p>

          <div className="bg-white/85 backdrop-blur-md rounded-2xl p-4 shadow-sm flex flex-col gap-2.5 text-left mb-6 w-full">
            {BIRTHDAY_CONFIG.cupidBanter.playfulBanter.map((line, idx) => (
              <p 
                key={idx} 
                className={`text-xs leading-relaxed ${idx === 3 ? 'font-handwriting text-lg text-[#c9184a] font-bold text-center' : 'text-[#2b1b22]'}`}
              >
                {line}
              </p>
            ))}
          </div>

          <button
            onClick={onNext}
            className="py-3.5 px-8 rounded-full bg-gradient-to-r from-[#ff4d6d] to-[#ff758f] text-white font-semibold text-sm shadow-md active:scale-95 transition-transform cursor-pointer"
          >
            <span>Unlock Your Secret 🔐</span>
          </button>
        </motion.div>
      )}
    </div>
  );
};

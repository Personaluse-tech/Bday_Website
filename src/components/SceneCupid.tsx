import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sound } from '../utils/sound';
import { BIRTHDAY_CONFIG } from '../config';

interface Props {
  onNext: () => void;
}

export const SceneCupid: React.FC<Props> = ({ onNext }) => {
  const [shooting, setShooting] = useState(false);

  const handleShoot = () => {
    setShooting(true);
    sound.playWhoosh();
    setTimeout(() => {
      onNext();
    }, 600);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0, y: -10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl shadow-sm text-[#c9184a] font-handwriting text-xl mb-6 relative max-w-[280px]"
      >
        {BIRTHDAY_CONFIG.cupidBanter.dialogue}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 border-solid border-t-white/90 border-t-8 border-x-transparent border-x-8 border-b-0" />
      </motion.div>

      <motion.div
        animate={{ 
          y: shooting ? -40 : [0, -10, 0],
          x: shooting ? -60 : 0,
          scale: shooting ? 0.9 : 1
        }}
        transition={{ 
          y: { duration: 3, repeat: shooting ? 0 : Infinity, ease: 'easeInOut' }
        }}
        className="w-[200px] h-[210px] mb-6"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 320" width="100%" height="100%">
          <defs>
            <linearGradient id="cupidSkin" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#ffe4d6"/>
              <stop offset="100%" stop-color="#fcd5ce"/>
            </linearGradient>
            <linearGradient id="wingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#ffffff"/>
              <stop offset="100%" stop-color="#ffccd5"/>
            </linearGradient>
            <linearGradient id="bowGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#ffe66d"/>
              <stop offset="100%" stop-color="#ffb703"/>
            </linearGradient>
          </defs>
          <g className="wings">
            <path d="M 110,130 C 50,70 30,120 40,160 C 50,190 90,180 115,160 Z" fill="url(#wingGrad)" opacity="0.95"/>
            <path d="M 190,130 C 250,70 270,120 260,160 C 250,190 210,180 185,160 Z" fill="url(#wingGrad)" opacity="0.95"/>
          </g>
          <ellipse cx="150" cy="55" rx="36" ry="10" fill="none" stroke="#ffd166" stroke-width="5" opacity="0.9"/>
          <path d="M 125,145 C 120,200 130,225 150,225 C 170,225 180,200 175,145 Z" fill="#ffffff" opacity="0.95"/>
          <circle cx="138" cy="230" r="10" fill="url(#cupidSkin)"/>
          <circle cx="162" cy="230" r="10" fill="url(#cupidSkin)"/>
          <circle cx="150" cy="115" r="48" fill="url(#cupidSkin)"/>
          <circle cx="112" cy="95" r="12" fill="#fb8500"/>
          <circle cx="130" cy="72" r="14" fill="#fb8500"/>
          <circle cx="155" cy="70" r="15" fill="#fb8500"/>
          <circle cx="178" cy="76" r="14" fill="#fb8500"/>
          <circle cx="188" cy="95" r="12" fill="#fb8500"/>
          <ellipse cx="134" cy="116" rx="5.5" ry="7" fill="#4a0e2e"/>
          <ellipse cx="166" cy="116" rx="5.5" ry="7" fill="#4a0e2e"/>
          <circle cx="136" cy="113" r="2.5" fill="#ffffff"/>
          <circle cx="168" cy="113" r="2.5" fill="#ffffff"/>
          <ellipse cx="122" cy="126" rx="9" ry="5.5" fill="#ff758f" opacity="0.6"/>
          <ellipse cx="178" cy="126" rx="9" ry="5.5" fill="#ff758f" opacity="0.6"/>
          <path d="M 143,128 Q 150,135 157,128" fill="none" stroke="#a4133c" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M 125,145 C 110,148 95,142 85,150" fill="none" stroke="url(#cupidSkin)" stroke-width="10" stroke-linecap="round"/>
          <path d="M 175,145 C 190,148 200,152 210,158" fill="none" stroke="url(#cupidSkin)" stroke-width="10" stroke-linecap="round"/>
          <g transform="translate(10, 0)">
            <path d="M 75,100 Q 60,150 75,200" fill="none" stroke="url(#bowGold)" stroke-width="6" stroke-linecap="round"/>
            <path d="M 75,100 Q 140,150 75,200" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="3,1"/>
            <line x1="60" y1="150" x2="150" y2="150" stroke="#ffd166" stroke-width="3.5" stroke-linecap="round"/>
            <path d="M 50,150 C 45,143 38,143 35,147 C 32,151 35,155 50,165 C 65,155 68,151 65,147 C 62,143 55,143 50,150 Z" fill="#ff0055" transform="rotate(90 50 150) translate(0, -5)"/>
          </g>
        </svg>
      </motion.div>

      <button
        onClick={handleShoot}
        disabled={shooting}
        className="py-3.5 px-8 rounded-full bg-gradient-to-r from-[#ff4d6d] to-[#ff758f] text-white font-semibold text-sm shadow-md active:scale-95 transition-transform cursor-pointer"
      >
        <span>Shoot the Arrow 💘</span>
      </button>
    </div>
  );
};

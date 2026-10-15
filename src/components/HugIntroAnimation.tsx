import React from 'react';
import { motion } from 'framer-motion';

export const HugIntroAnimation: React.FC = () => {
  return (
    <div className="w-full max-w-[320px] h-[210px] sm:h-[230px] relative flex items-center justify-center select-none overflow-visible">
      {/* Soft Radiating Pastel Heart Backdrop (Inspired by Reference Video) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-60">
        <svg viewBox="0 0 200 180" className="w-56 h-52">
          <path
            d="M 100,35 C 120,10 170,18 170,60 C 170,105 110,145 100,155 C 90,145 30,105 30,60 C 30,18 80,10 100,35 Z"
            fill="#ffe5ec"
            opacity="0.5"
          />
          <path
            d="M 100,50 C 115,30 155,36 155,70 C 155,105 108,135 100,142 C 92,135 45,105 45,70 C 45,36 85,30 100,50 Z"
            fill="#ffccd5"
            opacity="0.35"
          />
        </svg>
      </div>

      {/* Ground Shadow */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-44 h-4 bg-[#4a1525]/10 rounded-full blur-xs" />

      {/* Floating Gentle Yearning Hearts and Sparkles */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -28, 0],
              opacity: [0.3, 0.9, 0.3],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              repeat: Infinity,
              duration: 2.2 + (i % 3) * 0.4,
              delay: i * 0.35,
              ease: 'easeInOut'
            }}
            className="absolute text-sm select-none"
            style={{
              top: `${16 + (i * 18) % 65}%`,
              left: `${14 + (i * 26) % 72}%`
            }}
          >
            {i % 3 === 0 ? '🥺' : i % 3 === 1 ? '💗' : '✨'}
          </motion.div>
        ))}
      </div>

      {/* ================= CUTE BUBU BEAR: PLEADING & REACHING FOR HUG ================= */}
      <motion.div
        animate={{
          y: [0, -7, 0],
          scale: [1, 1.05, 1],
          rotate: [0, -4, -1, -4, 0]
        }}
        transition={{
          repeat: Infinity,
          duration: 2.4,
          ease: 'easeInOut'
        }}
        className="relative z-20 flex flex-col items-center"
      >
        <div className="w-44 h-48 sm:w-48 sm:h-52 relative">
          <svg viewBox="0 0 140 140" className="w-full h-full overflow-visible">
            <defs>
              <filter id="pleadDropShad" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#4a1525" floodOpacity="0.12"/>
              </filter>
              <linearGradient id="pleadBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff"/>
                <stop offset="65%" stopColor="#fff5f7"/>
                <stop offset="100%" stopColor="#fed7e2"/>
              </linearGradient>
            </defs>

            <g filter="url(#pleadDropShad)">
              {/* Ears */}
              <circle cx="38" cy="28" r="14" fill="#fff5f7"/>
              <circle cx="38" cy="28" r="8" fill="#fbb6ce"/>
              <circle cx="102" cy="28" r="14" fill="#fff5f7"/>
              <circle cx="102" cy="28" r="8" fill="#fbb6ce"/>

              {/* Chubby Round Pear-Shaped Body & Head */}
              <path
                d="M 32,58 C 26,28 114,28 108,58 C 114,98 122,120 100,126 C 80,132 60,132 40,126 C 18,120 26,98 32,58 Z"
                fill="url(#pleadBodyGrad)"
              />

              {/* Soft Pink Tummy Heart */}
              <path
                d="M 70,88 C 65,80 52,82 56,92 C 59,102 70,110 70,110 C 70,110 81,102 84,92 C 88,82 75,80 70,88 Z"
                fill="#ff758f"
                opacity="0.38"
              />

              {/* Big, Watery, Glossy Anime Pleading Eyes with Tear Glisten */}
              {/* Left Eye */}
              <g transform="translate(48, 52)">
                <ellipse cx="0" cy="0" rx="9.5" ry="11.5" fill="#1b1725"/>
                {/* Big glossy main reflection */}
                <ellipse cx="-2.5" cy="-3.5" rx="4.5" ry="5.8" fill="#ffffff"/>
                {/* Secondary water drop reflection */}
                <circle cx="3.5" cy="4" r="2.8" fill="#ffffff"/>
                <circle cx="-3" cy="5.5" r="1.6" fill="#ffffff"/>
                {/* Shimmering anime tear glisten */}
                <path d="M -4,7 Q 0,11 4,7" stroke="#b5e2fa" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.9"/>
              </g>

              {/* Right Eye */}
              <g transform="translate(92, 52)">
                <ellipse cx="0" cy="0" rx="9.5" ry="11.5" fill="#1b1725"/>
                {/* Big glossy main reflection */}
                <ellipse cx="-2.5" cy="-3.5" rx="4.5" ry="5.8" fill="#ffffff"/>
                {/* Secondary water drop reflection */}
                <circle cx="3.5" cy="4" r="2.8" fill="#ffffff"/>
                <circle cx="-3" cy="5.5" r="1.6" fill="#ffffff"/>
                {/* Shimmering anime tear glisten */}
                <path d="M -4,7 Q 0,11 4,7" stroke="#b5e2fa" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.9"/>
              </g>

              {/* Pleading Puppy-Dog Eyebrows (Sloping upward toward center) */}
              <path d="M 36,42 Q 44,37 52,35" stroke="#4a1525" strokeWidth="2.8" strokeLinecap="round" fill="none"/>
              <path d="M 104,42 Q 96,37 88,35" stroke="#4a1525" strokeWidth="2.8" strokeLinecap="round" fill="none"/>

              {/* Little Watery Tear Sparkles in Corners */}
              <motion.circle
                cx="42"
                cy="58"
                r="2.2"
                fill="#b5e2fa"
                animate={{ opacity: [0.6, 1, 0.6], scale: [0.9, 1.25, 0.9] }}
                transition={{ repeat: Infinity, duration: 1.6 }}
              />
              <motion.circle
                cx="98"
                cy="58"
                r="2.2"
                fill="#b5e2fa"
                animate={{ opacity: [0.6, 1, 0.6], scale: [0.9, 1.25, 0.9] }}
                transition={{ repeat: Infinity, duration: 1.6, delay: 0.3 }}
              />

              {/* Rosy Blushing Cheeks */}
              <ellipse cx="36" cy="65" rx="9" ry="5" fill="#ff758f" opacity="0.65"/>
              <ellipse cx="104" cy="65" rx="9" ry="5" fill="#ff758f" opacity="0.65"/>

              {/* Nose & Cute Quivering Sad Pout ("Please hug me...") */}
              <ellipse cx="70" cy="58" rx="4" ry="3" fill="#2b1b22"/>
              <path d="M 64,70 Q 70,66 76,70" stroke="#2b1b22" strokeWidth="2.2" fill="none" strokeLinecap="round"/>

              {/* Chubby Little Feet */}
              <ellipse cx="50" cy="128" rx="10" ry="6" fill="#fbb6ce"/>
              <ellipse cx="90" cy="128" rx="10" ry="6" fill="#fbb6ce"/>

              {/* ================= OUTSTRETCHED ARMS REACHING TOWARD VIEWER ================= */}
              {/* Left Pleading Arm & Big Chubby Paw */}
              <g>
                <path d="M 38,75 C 24,72 12,80 18,92 C 22,100 36,98 42,88 Z" fill="#fff5f7"/>
                {/* Left Paw reaching forward */}
                <ellipse cx="15" cy="88" rx="11" ry="10" fill="#ffffff" stroke="#fed7e2" strokeWidth="1.5"/>
                {/* Pink Paw Pads */}
                <ellipse cx="15" cy="88" rx="5.5" ry="5" fill="#ff758f"/>
                <circle cx="10" cy="82" r="2.2" fill="#ff758f"/>
                <circle cx="15" cy="80" r="2.2" fill="#ff758f"/>
                <circle cx="20" cy="82" r="2.2" fill="#ff758f"/>
              </g>

              {/* Right Pleading Arm & Big Chubby Paw */}
              <g>
                <path d="M 102,75 C 116,72 128,80 122,92 C 118,100 104,98 98,88 Z" fill="#fff5f7"/>
                {/* Right Paw reaching forward */}
                <ellipse cx="125" cy="88" rx="11" ry="10" fill="#ffffff" stroke="#fed7e2" strokeWidth="1.5"/>
                {/* Pink Paw Pads */}
                <ellipse cx="125" cy="88" rx="5.5" ry="5" fill="#ff758f"/>
                <circle cx="120" cy="82" r="2.2" fill="#ff758f"/>
                <circle cx="125" cy="80" r="2.2" fill="#ff758f"/>
                <circle cx="130" cy="82" r="2.2" fill="#ff758f"/>
              </g>
            </g>
          </svg>
        </div>
      </motion.div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/sound';

interface Props {
  onComplete: () => void;
}

export const HugEmbraceAnimation: React.FC<Props> = ({ onComplete }) => {
  // Sequence stages:
  // 1. 'anticipate': characters start apart on left and right looking at each other (0s - 1.2s)
  // 2. 'approach': both visibly travel toward the center (1.2s - 2.4s)
  // 3. 'embrace': they collide into a warm squeeze with wrapping arms (2.4s - 4.4s)
  // 4. 'missyou': "I MISS YOU ❤️" reveals underneath while hugging (4.4s - 6.0s)
  // 5. 'card': message card reveals (6.0s+)
  const [stage, setStage] = useState<'anticipate' | 'approach' | 'embrace' | 'missyou'>('anticipate');
  const [missYouChars, setMissYouChars] = useState(0);

  const fullMissYouText = "I MISS YOU";

  useEffect(() => {
    // Stage 1 -> Stage 2: Begin running toward each other at 1.4s
    const t1 = setTimeout(() => {
      setStage('approach');
    }, 1400);

    // Stage 2 -> Stage 3: Collide into warm embrace at 2.8s
    const t2 = setTimeout(() => {
      setStage('embrace');
      sound.playPop();
      sound.playMagicalSparkle();
    }, 2800);

    // Stage 3 -> Stage 4: Reveal "I MISS YOU" at 5.0s (held hug for 2.2s)
    const t3 = setTimeout(() => {
      setStage('missyou');
      // Typewriter effect for "I MISS YOU"
      let count = 0;
      const typeInterval = setInterval(() => {
        count++;
        setMissYouChars(count);
        if (count >= fullMissYouText.length) {
          clearInterval(typeInterval);
        }
      }, 100);
    }, 5000);

    // Stage 4 -> onComplete: Trigger message card reveal at 6.8s
    const t4 = setTimeout(() => {
      onComplete();
    }, 6800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <div className="w-full max-w-[340px] flex flex-col items-center justify-center select-none overflow-visible py-1">
      {/* Soft Radiating Concentric Heart Background (From Reference Video) */}
      <div className="w-full h-[210px] sm:h-[230px] relative flex items-center justify-center overflow-visible">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-60">
          <svg viewBox="0 0 220 200" className="w-64 h-60">
            {/* Outer Heart Layer */}
            <path
              d="M 110,40 C 130,15 185,25 185,75 C 185,125 120,165 110,175 C 100,165 35,125 35,75 C 35,25 90,15 110,40 Z"
              fill="#ffe5ec"
              opacity="0.45"
            />
            {/* Middle Heart Layer */}
            <path
              d="M 110,55 C 126,32 170,40 170,82 C 170,125 118,155 110,165 C 102,155 50,125 50,82 C 50,40 94,32 110,55 Z"
              fill="#ffccd5"
              opacity="0.35"
            />
            {/* Inner Heart Layer */}
            <path
              d="M 110,70 C 122,50 155,56 155,90 C 155,122 116,145 110,152 C 104,145 65,122 65,90 C 65,56 98,50 110,70 Z"
              fill="#fff0f3"
              opacity="0.4"
            />
          </svg>
        </div>

        {/* Reference Video Top Banner Arched Text */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 pointer-events-none z-10 whitespace-nowrap">
          <span className="font-handwriting text-base sm:text-lg font-bold text-[#784c25]/85 tracking-wide">
            Virtual hug for ya! ♡
          </span>
        </div>

        {/* Ground Shadow */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-60 h-4 bg-[#4a1525]/10 rounded-full blur-xs" />

        {/* Floating Heart Bubbles when embraced (Inspired by Reference Video Screenshots) */}
        <AnimatePresence>
          {(stage === 'embrace' || stage === 'missyou') && (
            <div className="absolute inset-0 pointer-events-none z-30">
              {[...Array(9)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    opacity: 0,
                    scale: 0.3,
                    x: 140 + (i % 2 === 0 ? (i * 15) : -(i * 15)),
                    y: 75
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.4, 1.25, 0.8],
                    y: -25 - (i * 10),
                    x: 140 + (i % 2 === 0 ? (i * 22) : -(i * 22))
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.2 + (i % 3) * 0.4,
                    delay: i * 0.22
                  }}
                  className="absolute text-base select-none"
                >
                  {i % 3 === 0 ? '💗' : i % 3 === 1 ? '🌸' : '✨'}
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* ================= PHASES 1 & 2: TWO CHARACTERS START APART & TRAVEL ================= */}
        {(stage === 'anticipate' || stage === 'approach') && (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* 1. LEFT CHARACTER: Caramel Brown Bear (Dudu) */}
            <motion.div
              initial={{ x: -95, y: 0 }}
              animate={
                stage === 'anticipate'
                  ? { x: -90, y: [0, -3, 0], rotate: [0, 1, 0] }
                  : { x: -18, y: [0, -7, 0], rotate: [2, -2, 2] }
              }
              transition={
                stage === 'anticipate'
                  ? { repeat: Infinity, duration: 1.2, ease: 'easeInOut' }
                  : { duration: 1.1, ease: [0.4, 0, 0.2, 1] }
              }
              className="absolute z-20 flex flex-col items-center"
            >
              <div className="w-24 h-28 sm:w-28 sm:h-32">
                <svg viewBox="0 0 100 110" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="duduRunGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#d4924a"/>
                      <stop offset="60%" stopColor="#b57538"/>
                      <stop offset="100%" stopColor="#9c5f2b"/>
                    </linearGradient>
                  </defs>

                  {/* Little round tail on left back (matches reference screenshot 1) */}
                  <circle cx="16" cy="74" r="5" fill="#9c5f2b"/>

                  {/* Ears */}
                  <circle cx="36" cy="22" r="10" fill="#d4924a"/>
                  <circle cx="36" cy="22" r="6" fill="#804a1f"/>
                  <circle cx="76" cy="22" r="10" fill="#d4924a"/>
                  <circle cx="76" cy="22" r="6" fill="#804a1f"/>

                  {/* Body leaning forward in anticipation */}
                  <path
                    d="M 28,46 C 26,24 82,24 80,46 C 82,74 88,88 74,95 C 60,99 48,99 34,95 C 20,88 26,74 28,46 Z"
                    fill="url(#duduRunGrad)"
                  />

                  {/* Chubby cheeks */}
                  <ellipse cx="62" cy="52" rx="6" ry="3.5" fill="#ff758f" opacity="0.6"/>

                  {/* Face looking eagerly to the right */}
                  <circle cx="56" cy="42" r="4" fill="#2b1b22"/>
                  <circle cx="55" cy="40.5" r="1.5" fill="#ffffff"/>
                  <circle cx="74" cy="42" r="4" fill="#2b1b22"/>
                  <circle cx="73" cy="40.5" r="1.5" fill="#ffffff"/>
                  <ellipse cx="68" cy="47" rx="3.5" ry="2.5" fill="#2b1b22"/>
                  <path d="M 65,51 Q 68,54 72,51" stroke="#2b1b22" strokeWidth="1.6" fill="none" strokeLinecap="round"/>

                  {/* Arms ready to embrace */}
                  <path d="M 62,64 C 74,60 86,64 84,74 C 80,80 70,78 62,72 Z" fill="#b57538"/>
                  <circle cx="84" cy="72" r="5" fill="#d4924a"/>

                  {/* Little feet */}
                  <ellipse cx="42" cy="97" rx="8" ry="5" fill="#9c5f2b"/>
                  <ellipse cx="68" cy="97" rx="8" ry="5" fill="#9c5f2b"/>
                </svg>
              </div>
            </motion.div>

            {/* 2. RIGHT CHARACTER: White/Mint Bear (Bubu) */}
            <motion.div
              initial={{ x: 95, y: 0 }}
              animate={
                stage === 'anticipate'
                  ? { x: 90, y: [0, -3, 0], rotate: [0, -2, 0] }
                  : { x: 18, y: [0, -8, 0], rotate: [-4, 4, -4] }
              }
              transition={
                stage === 'anticipate'
                  ? { repeat: Infinity, duration: 1.2, ease: 'easeInOut' }
                  : { duration: 1.1, ease: [0.4, 0, 0.2, 1] }
              }
              className="absolute z-20 flex flex-col items-center"
            >
              <div className="w-24 h-28 sm:w-28 sm:h-32">
                <svg viewBox="0 0 100 110" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="bubuRunGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff"/>
                      <stop offset="65%" stopColor="#f8fafc"/>
                      <stop offset="100%" stopColor="#fed7e2"/>
                    </linearGradient>
                  </defs>

                  {/* Ears */}
                  <circle cx="28" cy="22" r="10" fill="#ffffff"/>
                  <circle cx="28" cy="22" r="6" fill="#fbb6ce"/>
                  <circle cx="68" cy="22" r="10" fill="#ffffff"/>
                  <circle cx="68" cy="22" r="6" fill="#fbb6ce"/>

                  {/* Body leaning forward in eager leap */}
                  <path
                    d="M 22,46 C 20,24 76,24 74,46 C 76,74 82,88 68,95 C 54,99 42,99 28,95 C 14,88 20,74 22,46 Z"
                    fill="url(#bubuRunGrad)"
                  />

                  {/* Cheeks */}
                  <ellipse cx="38" cy="52" rx="6" ry="3.5" fill="#ff758f" opacity="0.6"/>

                  {/* Face looking eagerly to the left */}
                  <circle cx="26" cy="42" r="4" fill="#2b1b22"/>
                  <circle cx="25" cy="40.5" r="1.5" fill="#ffffff"/>
                  <circle cx="46" cy="42" r="4" fill="#2b1b22"/>
                  <circle cx="45" cy="40.5" r="1.5" fill="#ffffff"/>
                  <ellipse cx="34" cy="47" rx="3.5" ry="2.5" fill="#2b1b22"/>
                  <path d="M 31,51 Q 34,54 38,51" stroke="#2b1b22" strokeWidth="1.6" fill="none" strokeLinecap="round"/>

                  {/* Arms reaching eagerly forward to the left */}
                  <path d="M 40,64 C 28,60 16,64 18,74 C 22,80 32,78 40,72 Z" fill="#ffffff"/>
                  <circle cx="16" cy="72" r="5" fill="#fed7e2"/>

                  {/* Little feet */}
                  <ellipse cx="34" cy="97" rx="8" ry="5" fill="#fed7e2"/>
                  <ellipse cx="60" cy="97" rx="8" ry="5" fill="#fed7e2"/>
                </svg>
              </div>
            </motion.div>
          </div>
        )}

        {/* ================= PHASES 3 & 4: THE WARM SQUISHY EMBRACE ================= */}
        {(stage === 'embrace' || stage === 'missyou') && (
          <motion.div
            initial={{ scale: 0.85 }}
            animate={{
              scale: [0.94, 1.14, 1.02, 1.06, 1.02],
              rotate: [-1.5, 1.5, -1.5]
            }}
            transition={{
              scale: { duration: 0.5, ease: 'easeOut' },
              rotate: { repeat: Infinity, duration: 2.2, ease: 'easeInOut' }
            }}
            className="relative z-20 flex items-center justify-center"
          >
            {/* The Embracing Couple (Matching Reference Video Screenshots 2, 3, 4) */}
            <div className="w-52 h-44 sm:w-56 sm:h-48 relative">
              <svg viewBox="0 0 160 140" className="w-full h-full overflow-visible">
                <defs>
                  <filter id="embraceShadowFilter" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#4a1525" floodOpacity="0.14"/>
                  </filter>
                  <linearGradient id="embDuduGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#d4924a"/>
                    <stop offset="60%" stopColor="#b57538"/>
                    <stop offset="100%" stopColor="#9c5f2b"/>
                  </linearGradient>
                  <linearGradient id="embBubuGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff"/>
                    <stop offset="60%" stopColor="#f8fafc"/>
                    <stop offset="100%" stopColor="#fed7e2"/>
                  </linearGradient>
                </defs>

                <g filter="url(#embraceShadowFilter)">
                  {/* 1. Left Bear (Dudu/Brown) standing in profile holding Bubu */}
                  <circle cx="16" cy="80" r="5" fill="#9c5f2b"/> {/* Tail */}
                  <circle cx="48" cy="30" r="11" fill="#d4924a"/>
                  <circle cx="48" cy="30" r="6" fill="#804a1f"/>
                  <path
                    d="M 32,50 C 26,28 82,28 80,50 C 84,78 86,98 72,104 C 58,108 44,108 32,104 C 20,98 24,78 32,50 Z"
                    fill="url(#embDuduGrad)"
                  />

                  {/* 2. Right Bear (Bubu/White) leaping and nestled in Dudu's chest */}
                  <circle cx="120" cy="32" r="11" fill="#ffffff"/>
                  <circle cx="120" cy="32" r="6" fill="#fbb6ce"/>
                  <path
                    d="M 80,48 C 76,28 132,28 128,48 C 132,78 136,98 122,104 C 108,108 94,108 82,104 C 70,98 74,78 80,48 Z"
                    fill="url(#embBubuGrad)"
                  />

                  {/* Faces: Both have blissful closed smiling eyes (⌒ ⌒) */}
                  {/* Dudu's happy smiling eye and rosy cheek */}
                  <ellipse cx="50" cy="58" rx="6" ry="3.5" fill="#ff758f" opacity="0.6"/>
                  <path d="M 54,50 Q 60,44 66,50" stroke="#2b1b22" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                  <ellipse cx="68" cy="54" rx="3.5" ry="2.5" fill="#2b1b22"/>

                  {/* Bubu's happy smiling eye nestled in cheek */}
                  <ellipse cx="106" cy="58" rx="6" ry="3.5" fill="#ff758f" opacity="0.6"/>
                  <path d="M 92,50 Q 98,44 104,50" stroke="#2b1b22" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                  <ellipse cx="90" cy="54" rx="3.5" ry="2.5" fill="#2b1b22"/>

                  {/* Arms wrapped around each other's backs (from Reference Video) */}
                  {/* Dudu's brown arm wrapping around Bubu's back */}
                  <path d="M 64,70 C 82,74 112,76 122,70 C 128,74 126,84 118,86 C 96,90 72,86 62,80 Z" fill="#b57538"/>
                  <circle cx="120" cy="74" r="6.5" fill="#d4924a"/>

                  {/* Bubu's white arm wrapping around Dudu's back */}
                  <path d="M 98,68 C 80,72 52,74 38,68 C 32,72 34,82 42,84 C 64,88 88,84 100,78 Z" fill="#ffffff"/>
                  <circle cx="38" cy="74" r="6.5" fill="#fed7e2"/>

                  {/* Big Glowing Heart in Center of Embrace */}
                  <path
                    d="M 80,68 C 75,56 60,58 64,70 C 68,82 80,94 80,94 C 80,94 92,82 96,70 C 100,58 85,56 80,68 Z"
                    fill="#ff4d6d"
                  />

                  {/* Feet */}
                  <ellipse cx="48" cy="106" rx="8" ry="5" fill="#9c5f2b"/>
                  <ellipse cx="110" cy="106" rx="8" ry="5" fill="#fed7e2"/>
                </g>
              </svg>
            </div>
          </motion.div>
        )}
      </div>

      {/* ================= PHASE 5: “I MISS YOU” TEXT REVEAL ================= */}
      <div className="w-full min-h-[38px] flex items-center justify-center my-1">
        <AnimatePresence>
          {stage === 'missyou' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="flex items-center justify-center gap-2"
            >
              <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-[#784c25] tracking-wider drop-shadow-xs">
                {fullMissYouText.slice(0, missYouChars)}
              </h2>
              {missYouChars >= fullMissYouText.length && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 0.5 }}
                  className="text-2xl"
                >
                  ❤️
                </motion.span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/sound';

interface Props {
  onComplete: () => void;
}

export const ProposalAnimation: React.FC<Props> = ({ onComplete }) => {
  // Stages: 'approach' -> 'kneel' -> 'ring' -> 'celebrate'
  const [stage, setStage] = useState<'approach' | 'kneel' | 'ring' | 'celebrate'>('approach');

  useEffect(() => {
    // Stage 1: Approach for 1.4s
    const t1 = setTimeout(() => {
      setStage('kneel');
      sound.playClick();
    }, 1400);

    // Stage 2: Kneel down, then pull out ring box at 2.6s
    const t2 = setTimeout(() => {
      setStage('ring');
      sound.playRingReveal();
    }, 2600);

    // Stage 3: Dudu reacts with happy gasp & hearts at 3.8s
    const t3 = setTimeout(() => {
      setStage('celebrate');
      sound.playMagicalSparkle();
      onComplete();
    }, 3800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <div className="w-full max-w-[340px] h-[190px] sm:h-[210px] relative flex items-center justify-center select-none overflow-visible">
      {/* Ambient Sparkles & Floating Hearts when celebrating */}
      <AnimatePresence>
        {stage === 'celebrate' && (
          <div className="absolute inset-0 pointer-events-none z-30">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  scale: 0.2,
                  x: 130 + (i % 2 === 0 ? (i * 18) : -(i * 18)),
                  y: 80
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.2, 0.8],
                  y: -10 - (i * 12),
                  x: 130 + (i % 2 === 0 ? (i * 22) : -(i * 22))
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2 + (i % 3) * 0.5,
                  delay: i * 0.2
                }}
                className="absolute text-base"
              >
                {i % 3 === 0 ? '💖' : i % 3 === 1 ? '✨' : '🌸'}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Main Ground Shadow */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-64 h-5 bg-[#4a1525]/10 rounded-full blur-xs" />

      {/* STAGE CONTAINER */}
      <div className="relative w-full h-full flex items-end justify-center pb-3">

        {/* ================= CHARACTER 1: PROPOSING BEAR (BUBU / WHITE) ================= */}
        <motion.div
          animate={
            stage === 'approach'
              ? { x: [-80, -28], y: [0, -6, 0], rotate: [-2, 2, -2] }
              : stage === 'kneel'
              ? { x: -25, y: [0, 14], rotate: 0 }
              : { x: -25, y: 14, rotate: 0 }
          }
          transition={
            stage === 'approach'
              ? { repeat: Infinity, duration: 0.6, ease: 'easeInOut' }
              : { duration: 0.6, ease: 'easeOut' }
          }
          className="relative z-20 flex flex-col items-center"
        >
          {/* White Bear SVG (Kneeling or Standing) */}
          <div className="w-24 h-28 sm:w-28 sm:h-32 relative">
            <svg viewBox="0 0 100 110" className="w-full h-full overflow-visible">
              <defs>
                <filter id="bubuShad" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#4a1525" flood-opacity="0.12"/>
                </filter>
                <linearGradient id="bubuBody" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#ffffff"/>
                  <stop offset="60%" stop-color="#fff5f7"/>
                  <stop offset="100%" stop-color="#fed7e2"/>
                </linearGradient>
                <linearGradient id="ringGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#ffe6a7"/>
                  <stop offset="50%" stop-color="#ffd166"/>
                  <stop offset="100%" stop-color="#e09f3e"/>
                </linearGradient>
              </defs>

              <g filter="url(#bubuShad)">
                {/* Ears */}
                <circle cx="28" cy="22" r="10" fill="#fff5f7"/>
                <circle cx="28" cy="22" r="6" fill="#fbb6ce"/>
                <circle cx="68" cy="22" r="10" fill="#fff5f7"/>
                <circle cx="68" cy="22" r="6" fill="#fbb6ce"/>

                {/* Chubby Head & Body */}
                {stage === 'approach' ? (
                  /* Standing Pear-Shaped Body */
                  <path d="M 22,48 C 20,26 76,26 74,48 C 76,75 82,90 68,96 C 54,100 42,100 28,96 C 14,90 20,75 22,48 Z" fill="url(#bubuBody)"/>
                ) : (
                  /* Kneeling Body: lower and leaning slightly forward */
                  <path d="M 22,44 C 20,24 76,24 74,44 C 76,66 84,78 68,84 C 54,88 38,88 24,84 C 12,78 20,66 22,44 Z" fill="url(#bubuBody)"/>
                )}

                {/* Face: Eyes, Blush, Smile */}
                {/* Cheeks */}
                <ellipse cx="28" cy="48" rx="6" ry="3.5" fill="#ff758f" opacity="0.6"/>
                <ellipse cx="68" cy="48" rx="6" ry="3.5" fill="#ff758f" opacity="0.6"/>

                {/* Eyes */}
                {stage === 'celebrate' ? (
                  /* Happy Crescent Eyes */
                  <>
                    <path d="M 32,42 Q 38,36 44,42" stroke="#2b1b22" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                    <path d="M 52,42 Q 58,36 64,42" stroke="#2b1b22" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                  </>
                ) : (
                  /* Loving Open Eyes with Sparkles */
                  <>
                    <circle cx="38" cy="40" r="4" fill="#2b1b22"/>
                    <circle cx="37" cy="38.5" r="1.5" fill="#ffffff"/>
                    <circle cx="58" cy="40" r="4" fill="#2b1b22"/>
                    <circle cx="57" cy="38.5" r="1.5" fill="#ffffff"/>
                  </>
                )}

                {/* Nose & Mouth */}
                <ellipse cx="48" cy="45" rx="3.5" ry="2.5" fill="#2b1b22"/>
                <path d="M 45,48 Q 48,51 51,48" stroke="#2b1b22" strokeWidth="1.6" fill="none" strokeLinecap="round"/>

                {/* Legs */}
                {stage === 'approach' ? (
                  /* Standing Little Feet */
                  <>
                    <ellipse cx="36" cy="97" rx="8" ry="5" fill="#fed7e2"/>
                    <ellipse cx="60" cy="97" rx="8" ry="5" fill="#fed7e2"/>
                  </>
                ) : (
                  /* Kneeling Leg (front knee bent on ground, back leg resting) */
                  <>
                    <ellipse cx="70" cy="85" rx="10" ry="5" fill="#fbb6ce"/>
                    <path d="M 22,82 C 16,84 14,88 24,90 C 36,92 46,88 40,84 Z" fill="#fbb6ce"/>
                  </>
                )}

                {/* Paws */}
                {stage === 'approach' ? (
                  /* Walking Paws */
                  <>
                    <circle cx="20" cy="62" r="5" fill="#fed7e2"/>
                    <circle cx="76" cy="62" r="5" fill="#fed7e2"/>
                  </>
                ) : (
                  /* Paws offering the ring box forward */
                  <>
                    <ellipse cx="64" cy="62" rx="5" ry="4" fill="#fbb6ce"/>
                    <ellipse cx="76" cy="62" rx="5" ry="4" fill="#fbb6ce"/>
                  </>
                )}
              </g>

              {/* ================= RING BOX & DIAMOND RING ================= */}
              {(stage === 'ring' || stage === 'celebrate') && (
                <g transform="translate(68, 48)">
                  {/* Velvet Box Base */}
                  <rect x="0" y="8" width="16" height="12" rx="2.5" fill="#800f2f"/>
                  {/* Velvet Box Lid (Popped open tilted) */}
                  <path d="M 0,8 L 16,8 L 14,-2 L 2,-2 Z" fill="#c9184a"/>
                  <rect x="2" y="7" width="12" height="3" fill="#ffe5ec"/>

                  {/* Golden Ring Band */}
                  <ellipse cx="8" cy="6" rx="5" ry="3" fill="url(#ringGoldGrad)"/>
                  <ellipse cx="8" cy="6" rx="3" ry="1.5" fill="#800f2f"/>

                  {/* Radiant Sparkling Diamond */}
                  <polygon points="8,-3 4,2 12,2" fill="#e0fbfc"/>
                  <polygon points="4,2 6,6 10,6 12,2" fill="#90e0ef"/>

                  {/* Diamond Sparkle Stars */}
                  <motion.g
                    animate={{ scale: [0.8, 1.4, 0.8], opacity: [0.7, 1, 0.7] }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                  >
                    <path d="M 8,-8 L 8,2 M 3,-3 L 13,-3" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round"/>
                    <circle cx="8" cy="-3" r="1.5" fill="#ffffff"/>
                  </motion.g>
                </g>
              )}
            </svg>
          </div>
        </motion.div>

        {/* ================= CHARACTER 2: RECEIVING BEAR (DUDU / CARAMEL) ================= */}
        <motion.div
          animate={
            stage === 'celebrate'
              ? { scale: [1, 1.08, 1], y: [0, -4, 0] }
              : { scale: 1, y: 0 }
          }
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="relative z-20 flex flex-col items-center ml-2"
        >
          <div className="w-24 h-28 sm:w-28 sm:h-32 relative">
            <svg viewBox="0 0 100 110" className="w-full h-full overflow-visible">
              <defs>
                <filter id="duduShad" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#4a1525" flood-opacity="0.12"/>
                </filter>
                <linearGradient id="duduBody" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#fbd38d"/>
                  <stop offset="60%" stop-color="#f6ad55"/>
                  <stop offset="100%" stop-color="#ed8936"/>
                </linearGradient>
              </defs>

              <g filter="url(#duduShad)">
                {/* Ears */}
                <circle cx="32" cy="22" r="10" fill="#fbd38d"/>
                <circle cx="32" cy="22" r="6" fill="#dd6b20" opacity="0.6"/>
                <circle cx="72" cy="22" r="10" fill="#fbd38d"/>
                <circle cx="72" cy="22" r="6" fill="#dd6b20" opacity="0.6"/>

                {/* Chubby Head & Body */}
                <path d="M 26,48 C 24,26 80,26 78,48 C 80,75 86,90 72,96 C 58,100 46,100 32,96 C 18,90 24,75 26,48 Z" fill="url(#duduBody)"/>

                {/* Snout Patch */}
                <ellipse cx="52" cy="50" rx="14" ry="10" fill="#fffaf0" opacity="0.9"/>
                <ellipse cx="52" cy="46" rx="3.5" ry="2.5" fill="#2b1b22"/>

                {/* Cheeks */}
                <ellipse cx="32" cy="52" rx="7" ry="4" fill="#ff4d6d" opacity={stage === 'celebrate' ? 0.75 : 0.4}/>
                <ellipse cx="72" cy="52" rx="7" ry="4" fill="#ff4d6d" opacity={stage === 'celebrate' ? 0.75 : 0.4}/>

                {/* Eyes & Mouth depending on stage */}
                {stage === 'celebrate' ? (
                  /* GAST / SHOCKED JOY: Big Starry Anime Eyes & Gasping Mouth */
                  <>
                    {/* Left Eye: Big sparkle circle */}
                    <circle cx="40" cy="40" r="6.5" fill="#2b1b22"/>
                    <circle cx="38" cy="38" r="2.5" fill="#ffffff"/>
                    <circle cx="42" cy="43" r="1.2" fill="#ffffff"/>
                    {/* Star in eye */}
                    <polygon points="40,36 41,39 44,40 41,41 40,44 39,41 36,40 39,39" fill="#ffd166"/>

                    {/* Right Eye: Big sparkle circle */}
                    <circle cx="64" cy="40" r="6.5" fill="#2b1b22"/>
                    <circle cx="62" cy="38" r="2.5" fill="#ffffff"/>
                    <circle cx="66" cy="43" r="1.2" fill="#ffffff"/>
                    {/* Star in eye */}
                    <polygon points="64,36 65,39 68,40 65,41 64,44 63,41 60,40 63,39" fill="#ffd166"/>

                    {/* Cute O-shaped Gasping Mouth */}
                    <ellipse cx="52" cy="52" rx="4.5" ry="5.5" fill="#c9184a"/>
                    <ellipse cx="52" cy="54" rx="2.5" ry="2.5" fill="#ff758f"/>

                    {/* Paws on Cheeks (Classic Adorable Gasp Pose) */}
                    <circle cx="28" cy="54" r="6" fill="#fbd38d"/>
                    <circle cx="76" cy="54" r="6" fill="#fbd38d"/>
                  </>
                ) : (
                  /* Curious Blink Eyes & Small Smile */
                  <>
                    <circle cx="42" cy="40" r="4" fill="#2b1b22"/>
                    <circle cx="41" cy="38.5" r="1.5" fill="#ffffff"/>
                    <circle cx="62" cy="40" r="4" fill="#2b1b22"/>
                    <circle cx="61" cy="38.5" r="1.5" fill="#ffffff"/>
                    <path d="M 49,50 Q 52,53 55,50" stroke="#2b1b22" strokeWidth="1.6" fill="none" strokeLinecap="round"/>

                    {/* Rest Paws */}
                    <circle cx="24" cy="64" r="5" fill="#fbd38d"/>
                    <circle cx="80" cy="64" r="5" fill="#fbd38d"/>
                  </>
                )}

                {/* Standing Feet */}
                <ellipse cx="40" cy="97" rx="8" ry="5" fill="#ed8936"/>
                <ellipse cx="64" cy="97" rx="8" ry="5" fill="#ed8936"/>
              </g>
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

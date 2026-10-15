import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { sound } from '../utils/sound';

interface Props {
  active: boolean;
}

interface StampedKiss {
  id: string;
  x: number; // percentage
  y: number; // percentage
  rotate: number;
  scale: number;
  delay: number;
  color: string;
}

const STAMPED_KISSES: StampedKiss[] = [
  { id: 'top-left', x: 12, y: 16, rotate: -22, scale: 0.85, delay: 0.2, color: '#ff4d6d' },
  { id: 'top-right', x: 88, y: 18, rotate: 20, scale: 0.8, delay: 0.5, color: '#c9184a' },
  { id: 'mid-left', x: 8, y: 55, rotate: 12, scale: 0.75, delay: 0.8, color: '#ff758f' },
  { id: 'mid-right', x: 92, y: 62, rotate: -15, scale: 0.8, delay: 1.1, color: '#ff4d6d' },
  { id: 'bottom-left', x: 18, y: 84, rotate: -8, scale: 0.75, delay: 1.4, color: '#e07a5f' },
  { id: 'bottom-right', x: 82, y: 82, rotate: 16, scale: 0.85, delay: 1.7, color: '#c9184a' },
];

export const KissesOverlay: React.FC<Props> = ({ active }) => {
  useEffect(() => {
    if (!active) return;
    // Play sweet soft kiss sounds as kisses stamp
    const t1 = setTimeout(() => sound.playKiss(), 300);
    const t2 = setTimeout(() => sound.playKiss(), 750);
    const t3 = setTimeout(() => sound.playKiss(), 1300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-visible">
      {/* Floating Gentle Heart Sparkles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          initial={{ opacity: 0, scale: 0.3, y: 10 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.4, 1.2, 0.6],
            y: [-5, -45]
          }}
          transition={{
            repeat: Infinity,
            duration: 2.2 + (i % 3) * 0.4,
            delay: i * 0.3,
            ease: 'easeOut'
          }}
          className="absolute text-sm select-none"
          style={{
            top: `${22 + (i * 12) % 55}%`,
            left: `${12 + (i * 18) % 76}%`
          }}
        >
          {i % 2 === 0 ? '✨' : '💖'}
        </motion.div>
      ))}

      {/* Sweet Lipstick Kiss Marks Stamped on Card */}
      {STAMPED_KISSES.map((kiss) => (
        <motion.div
          key={kiss.id}
          initial={{ opacity: 0, scale: 2.2, rotate: kiss.rotate - 15 }}
          animate={{
            opacity: [0, 1, 0.9],
            scale: [2.2, kiss.scale * 1.15, kiss.scale],
            rotate: kiss.rotate
          }}
          transition={{
            duration: 0.45,
            delay: kiss.delay,
            ease: 'easeOut'
          }}
          style={{
            position: 'absolute',
            left: `${kiss.x}%`,
            top: `${kiss.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
          className="w-9 h-7 sm:w-11 sm:h-8"
        >
          {/* Detailed Lipstick Lips SVG */}
          <svg viewBox="0 0 50 35" className="w-full h-full filter drop-shadow-xs">
            <g fill={kiss.color}>
              {/* Upper Lip with Bow */}
              <path d="M 5,16 C 10,8 18,7 23,12 C 24,13 25,13 26,12 C 31,7 39,8 44,16 C 41,18 36,17 31,16 C 27,15 25,17 24,17 C 23,17 21,15 17,16 C 12,17 8,18 5,16 Z"/>
              {/* Lower Lip Chubby Curve */}
              <path d="M 8,19 C 14,18 19,20 25,20 C 31,20 36,18 42,19 C 39,26 33,31 25,31 C 17,31 11,26 8,19 Z"/>
              {/* Soft Center Gloss Highlight */}
              <ellipse cx="25" cy="18" rx="7" ry="1.2" fill="#ffffff" opacity="0.45"/>
            </g>
          </svg>
        </motion.div>
      ))}

      {/* Gentle Floating Drifting Kisses Traveling Toward Center */}
      {[0, 1].map((idx) => (
        <motion.div
          key={`drift-${idx}`}
          initial={{
            opacity: 0,
            scale: 0.6,
            x: idx === 0 ? -40 : 40,
            y: idx === 0 ? -20 : 20
          }}
          animate={{
            opacity: [0, 0.85, 0.8, 0],
            scale: [0.6, 1.05, 0.9, 0.4],
            x: [idx === 0 ? -40 : 40, idx === 0 ? -5 : 5],
            y: [idx === 0 ? -20 : 20, 0]
          }}
          transition={{
            repeat: Infinity,
            repeatDelay: 1.5,
            duration: 3,
            delay: 1.8 + idx * 0.8,
            ease: 'easeOut'
          }}
          style={{
            position: 'absolute',
            top: '46%',
            left: idx === 0 ? '25%' : '75%'
          }}
          className="text-lg select-none"
        >
          💋
        </motion.div>
      ))}
    </div>
  );
};

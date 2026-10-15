import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/sound';

interface Props {
  onNext: () => void;
}

interface BalloonData {
  id: number;
  color: string;
  left: number;
  delay: number;
  duration: number;
}

const BALLOON_COLORS = [
  'radial-gradient(circle at 35% 35%, #ff4d6d, #a4133c)',
  'radial-gradient(circle at 35% 35%, #ff758f, #c9184a)',
  'radial-gradient(circle at 35% 35%, #ffd166, #e0a96d)',
  'radial-gradient(circle at 35% 35%, #ffb3c6, #ff4d6d)',
  'radial-gradient(circle at 35% 35%, #ff85a2, #800f2f)',
  'radial-gradient(circle at 35% 35%, #c9184a, #590d22)'
];

export const SceneBalloons: React.FC<Props> = ({ onNext }) => {
  const [balloons, setBalloons] = useState<BalloonData[]>([
    { id: 1, color: BALLOON_COLORS[0], left: 15, delay: 0.1, duration: 6.5 },
    { id: 2, color: BALLOON_COLORS[1], left: 35, delay: 0.4, duration: 7.2 },
    { id: 3, color: BALLOON_COLORS[2], left: 60, delay: 0.2, duration: 6.8 },
    { id: 4, color: BALLOON_COLORS[3], left: 80, delay: 0.6, duration: 7.5 },
    { id: 5, color: BALLOON_COLORS[4], left: 25, delay: 1.0, duration: 7.0 },
    { id: 6, color: BALLOON_COLORS[5], left: 70, delay: 1.2, duration: 6.6 }
  ]);

  const [poppedCount, setPoppedCount] = useState(0);

  const popBalloon = (id: number) => {
    sound.playPop();
    setBalloons(prev => prev.filter(b => b.id !== id));
    const nextPopped = poppedCount + 1;
    setPoppedCount(nextPopped);

    if (nextPopped >= 2) {
      setTimeout(() => {
        onNext();
      }, 500);
    }
  };

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col items-center justify-between pt-3 pb-6 px-4 select-none">
      {/* Top Helper Badge */}
      <div className="relative z-30 bg-white/85 backdrop-blur-md px-5 py-2 rounded-full text-xs font-semibold text-[#c9184a] shadow-xs border border-white/80 shrink-0">
        Tap the floating balloons! 🎈✨ ({poppedCount}/2)
      </div>

      {/* Floating Balloons Canvas (pointer-events-none on wrapper so clicks reach buttons) */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <AnimatePresence>
          {balloons.map(b => (
            <motion.div
              key={b.id}
              initial={{ y: '105vh', x: 0, opacity: 0.95 }}
              animate={{ 
                y: '-25vh', 
                x: [0, (b.id % 2 === 0 ? 15 : -15), 0],
                opacity: 1
              }}
              exit={{ scale: 1.4, opacity: 0 }}
              transition={{ 
                y: { duration: b.duration, delay: b.delay, ease: 'linear' },
                x: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
              }}
              onClick={() => popBalloon(b.id)}
              className="absolute w-[72px] h-[92px] rounded-[50%_50%_50%_50%/40%_40%_60%_60%] cursor-pointer shadow-lg active:scale-90 transition-transform pointer-events-auto"
              style={{
                left: `${b.left}%`,
                background: b.color
              }}
            >
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-[#843b62]/30" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Skip Button Pill with relative z-30 and pointer-events-auto */}
      <div className="relative z-30 shrink-0 pb-2">
        <button
          id="skip-balloons-btn"
          onClick={onNext}
          className="h-11 px-7 rounded-full bg-white/90 backdrop-blur-md border border-white/90 shadow-sm text-xs font-semibold text-[#843b62] hover:text-[#c9184a] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5 pointer-events-auto"
        >
          <span>Skip sequence →</span>
        </button>
      </div>
    </div>
  );
};

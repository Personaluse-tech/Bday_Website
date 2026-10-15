import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/sound';
import { BIRTHDAY_CONFIG } from '../config';

interface Props {
  onNext: () => void;
}

type AnimStage = 
  | 'idle'       // Standing in natural aiming pose
  | 'raise'      // Raising the bow
  | 'nock'       // Reaching for arrow and placing against bowstring
  | 'draw'       // Pulling bowstring backward, visibly bending bow
  | 'aim'        // Holding drawn bow briefly aiming at heart
  | 'release'    // Releasing string, launching arrow
  | 'flying'     // Arrow travelling visibly across screen
  | 'impact'     // Arrow accurately hits heart, impact reaction
  | 'burst';     // Heart bursts into small pink hearts and sparkles

interface SparkleParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  type: 'heart' | 'star' | 'circle';
}

export const SceneCupid: React.FC<Props> = ({ onNext }) => {
  const [stage, setStage] = useState<AnimStage>('idle');
  const [isPlaying, setIsPlaying] = useState(false);
  const [arenaWidth, setArenaWidth] = useState(340);
  const [particles, setParticles] = useState<SparkleParticle[]>([]);

  const arenaRef = useRef<HTMLDivElement | null>(null);
  const timerRefs = useRef<number[]>([]);

  // Measure arena width responsively for pixel-perfect arrow trajectory
  useEffect(() => {
    const updateWidth = () => {
      if (arenaRef.current) {
        const w = arenaRef.current.clientWidth;
        setArenaWidth(w);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => {
      window.removeEventListener('resize', updateWidth);
      timerRefs.current.forEach(t => window.clearTimeout(t));
    };
  }, []);

  // Pre-generate burst particles
  const generateParticles = () => {
    const items: SparkleParticle[] = [];
    const colors = ['#ff4d6d', '#ff758f', '#ff8fab', '#ffd166', '#ffffff', '#c9184a'];
    const types: ('heart' | 'star' | 'circle')[] = ['heart', 'heart', 'star', 'circle'];

    for (let i = 0; i < 36; i++) {
      const angle = (i / 36) * Math.PI * 2 + (Math.random() * 0.3 - 0.15);
      const distance = 45 + Math.random() * 75;
      items.push({
        id: i,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        size: 10 + Math.random() * 12,
        color: colors[i % colors.length],
        delay: Math.random() * 0.12,
        type: types[i % types.length]
      });
    }
    setParticles(items);
  };

  const addTimer = (cb: () => void, ms: number) => {
    const id = window.setTimeout(cb, ms);
    timerRefs.current.push(id);
    return id;
  };

  const handleStartAnimation = () => {
    if (isPlaying) return;
    setIsPlaying(true);

    // Stage 1: Raise the bow (0.15s)
    setStage('raise');

    // Stage 2: Reach for arrow and place against bowstring (0.75s)
    addTimer(() => {
      setStage('nock');
    }, 700);

    // Stage 3: Pull bowstring backward, visibly bending the bow (1.4s)
    addTimer(() => {
      setStage('draw');
      sound.playBowDraw();
    }, 1350);

    // Stage 4: Hold drawn bow briefly aiming at heart (2.3s)
    addTimer(() => {
      setStage('aim');
    }, 2250);

    // Stage 5: Release string & launch arrow (2.85s)
    addTimer(() => {
      setStage('release');
      sound.playWhoosh();
    }, 2850);

    // Stage 6: Arrow travels across the screen (2.95s -> 3.45s)
    addTimer(() => {
      setStage('flying');
    }, 2950);

    // Stage 7: Arrow hits target heart (3.45s)
    addTimer(() => {
      setStage('impact');
      sound.playHeartBoom();
    }, 3450);

    // Stage 8: Heart bursts into small pink hearts and sparkles (3.75s)
    addTimer(() => {
      generateParticles();
      setStage('burst');
      sound.playMagicalSparkle();
    }, 3750);

    // Stage 9: Transition naturally to the next scene (5.2s)
    addTimer(() => {
      onNext();
    }, 5200);
  };

  // Calculations for responsive arrow travel distance
  // Cupid bow tip is roughly 95px from arena left edge
  // Heart target center is roughly arenaWidth - 55px
  const arrowOriginX = 95;
  const targetCenterX = Math.max(arenaWidth - 55, 230);
  const travelDistance = targetCenterX - arrowOriginX;

  const isDrawn = stage === 'draw' || stage === 'aim';
  const isPostRelease = stage === 'release' || stage === 'flying' || stage === 'impact' || stage === 'burst';

  return (
    <div className="w-full h-full flex flex-col items-center justify-between py-4 px-4 text-center select-none relative overflow-hidden">
      {/* Cupid banter speech bubble */}
      <motion.div 
        initial={{ scale: 0.85, opacity: 0, y: -8 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-2xl shadow-sm text-[#c9184a] font-handwriting text-lg sm:text-xl relative max-w-[290px] border border-white/80 z-20 shrink-0 mt-1"
      >
        <span>{BIRTHDAY_CONFIG.cupidBanter.dialogue}</span>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 border-solid border-t-white/90 border-t-8 border-x-transparent border-x-8 border-b-0" />
      </motion.div>

      {/* Main Animation Stage Arena */}
      <div 
        ref={arenaRef}
        className="w-full flex-1 max-h-[340px] min-h-[260px] relative flex items-center justify-between px-2 sm:px-4 my-auto overflow-visible"
      >
        {/* Soft background glow arena */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
          <div className="w-64 h-48 rounded-full bg-gradient-to-r from-[#ffccd5] via-[#ff758f] to-[#ffd166] blur-3xl" />
        </div>

        {/* ---------------- CUPID CHARACTER (LEFT SIDE) ---------------- */}
        <motion.div
          animate={{
            y: stage === 'idle' ? [0, -6, 0] : stage === 'aim' ? [0, -2, 0] : 0,
            scale: stage === 'release' ? [1, 0.96, 1] : 1
          }}
          transition={{
            y: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
            scale: { duration: 0.3 }
          }}
          className="relative w-[130px] sm:w-[145px] h-[170px] sm:h-[190px] shrink-0 z-10 origin-center"
        >
          <svg viewBox="0 0 160 190" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="cupidSkinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fff0eb"/>
                <stop offset="100%" stopColor="#ffd8cc"/>
              </linearGradient>
              <linearGradient id="cupidHairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffe066"/>
                <stop offset="60%" stopColor="#fab005"/>
                <stop offset="100%" stopColor="#f59f00"/>
              </linearGradient>
              <linearGradient id="cupidWingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff"/>
                <stop offset="60%" stopColor="#fff0f3"/>
                <stop offset="100%" stopColor="#ffccd5"/>
              </linearGradient>
              <linearGradient id="bowGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffe066"/>
                <stop offset="50%" stopColor="#ffd166"/>
                <stop offset="100%" stopColor="#e09f3e"/>
              </linearGradient>
              <filter id="cupidSoftGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur"/>
                <feComposite in="SourceGraphic" in2="blur" operator="over"/>
              </filter>
            </defs>

            {/* Angel Wings (Back fluttering) */}
            <motion.g 
              animate={{ rotate: [-3, 5, -3] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              style={{ transformOrigin: '40px 95px' }}
            >
              {/* Back Wing */}
              <path 
                d="M 40,85 C 10,50 0,85 10,115 C 18,135 42,125 45,105 Z" 
                fill="url(#cupidWingGrad)" 
                opacity="0.8"
                filter="url(#cupidSoftGlow)"
              />
              {/* Front Wing */}
              <path 
                d="M 48,82 C 22,40 12,75 22,110 C 30,132 52,120 54,100 Z" 
                fill="url(#cupidWingGrad)" 
                opacity="0.95"
              />
            </motion.g>

            {/* Golden Halo */}
            <ellipse 
              cx="65" 
              cy="28" 
              rx="24" 
              ry="7" 
              fill="none" 
              stroke="#ffd166" 
              strokeWidth="4" 
              opacity="0.95"
              filter="url(#cupidSoftGlow)"
            />

            {/* Cupid Body / Chibi Toga */}
            <path 
              d="M 52,95 C 46,135 52,152 68,152 C 84,152 90,135 84,95 Z" 
              fill="#ffffff" 
              opacity="0.97"
            />
            {/* Toga folds and golden sash */}
            <path d="M 54,98 Q 68,115 82,98" fill="none" stroke="#ffccd5" strokeWidth="2.5"/>
            <path d="M 52,110 Q 68,125 84,110" fill="none" stroke="#ffd166" strokeWidth="2.5"/>

            {/* Chubby Little Feet */}
            <circle cx="60" cy="155" r="7" fill="url(#cupidSkinGrad)"/>
            <circle cx="76" cy="155" r="7" fill="url(#cupidSkinGrad)"/>

            {/* Head (Facing Right toward target) */}
            <circle cx="68" cy="62" r="30" fill="url(#cupidSkinGrad)"/>

            {/* Curly Golden Blonde Hair */}
            <path 
              d="M 42,55 C 38,32 55,20 74,20 C 92,20 102,32 98,55 C 95,42 85,34 72,34 C 58,34 48,42 42,55 Z" 
              fill="url(#cupidHairGrad)"
            />
            <circle cx="45" cy="46" r="8" fill="#fab005"/>
            <circle cx="58" cy="30" r="9" fill="#f59f00"/>
            <circle cx="74" cy="28" r="9.5" fill="#f59f00"/>
            <circle cx="90" cy="33" r="8.5" fill="#fab005"/>
            <circle cx="98" cy="46" r="7" fill="#fab005"/>

            {/* Face details - Eyes looking Right toward Target */}
            {stage === 'aim' || stage === 'draw' ? (
              // Focused Aiming Eye (determined wink + focus)
              <>
                {/* Left eye winking line */}
                <path d="M 60,62 Q 65,58 70,62" fill="none" stroke="#4a0e2e" strokeWidth="2.5" strokeLinecap="round"/>
                {/* Right eye focused sharp circle */}
                <ellipse cx="82" cy="61" rx="4" ry="5.5" fill="#4a0e2e"/>
                <circle cx="83" cy="59" r="1.8" fill="#ffffff"/>
              </>
            ) : (
              // Sweet cheerful eyes
              <>
                <ellipse cx="64" cy="62" rx="4" ry="5.5" fill="#4a0e2e"/>
                <ellipse cx="80" cy="62" rx="4" ry="5.5" fill="#4a0e2e"/>
                <circle cx="65.5" cy="60" r="1.8" fill="#ffffff"/>
                <circle cx="81.5" cy="60" r="1.8" fill="#ffffff"/>
              </>
            )}

            {/* Blush Cheeks */}
            <ellipse cx="58" cy="69" rx="6.5" ry="4" fill="#ff758f" opacity="0.6"/>
            <ellipse cx="84" cy="69" rx="6.5" ry="4" fill="#ff758f" opacity="0.6"/>

            {/* Determined / Sweet Smile */}
            <path 
              d={isDrawn ? "M 70,72 Q 74,75 78,72" : "M 69,71 Q 74,78 79,71"} 
              fill="none" 
              stroke="#a4133c" 
              strokeWidth="2.2" 
              strokeLinecap="round"
            />

            {/* Left Arm (Extending forward holding the Bow stave to the right) */}
            <motion.path 
              animate={{
                d: stage === 'idle' 
                  ? "M 76,95 C 90,102 100,100 110,100" 
                  : "M 76,95 C 92,96 102,96 114,96"
              }}
              transition={{ duration: 0.3 }}
              fill="none" 
              stroke="url(#cupidSkinGrad)" 
              strokeWidth="8.5" 
              strokeLinecap="round"
            />

            {/* ---------------- THE BOW & STRING LAYER ---------------- */}
            <g transform="translate(114, 96)">
              {/* Bow Stave (Bending visibly when drawn!) */}
              <motion.path 
                animate={{
                  d: isDrawn 
                    ? "M -8,-50 Q 22,0 -8,50"   // Visibly bent under strong tension!
                    : "M 0,-48 Q 16,0 0,48"     // Natural arc
                }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                fill="none" 
                stroke="url(#bowGoldGrad)" 
                strokeWidth="5" 
                strokeLinecap="round"
                filter="url(#cupidSoftGlow)"
              />

              {/* Bow String (Pulled back into sharp V by right hand, snaps straight on release!) */}
              <motion.path 
                animate={{
                  d: isDrawn
                    ? "M -8,-50 L -38,0 L -8,50"  // Deep V pulled back to Cupid's cheek!
                    : stage === 'nock'
                    ? "M 0,-48 L -14,0 L 0,48"   // Slight tension as arrow is placed
                    : "M 0,-48 L 4,0 L 0,48"     // Straight string at rest
                }}
                transition={{ duration: isPostRelease ? 0.08 : 0.35, ease: 'easeOut' }}
                fill="none" 
                stroke="#ffffff" 
                strokeWidth="2" 
                opacity="0.95"
              />

              {/* Arrow on Bowstring (Before release) */}
              {!isPostRelease && stage !== 'idle' && stage !== 'raise' && (
                <motion.g
                  initial={{ opacity: 0, x: -10 }}
                  animate={{
                    opacity: 1,
                    x: isDrawn ? -38 : -14 // Moves backward with the bowstring!
                  }}
                  transition={{ duration: 0.35 }}
                >
                  {/* Shaft */}
                  <line x1="0" y1="0" x2="48" y2="0" stroke="#ffd166" strokeWidth="3" strokeLinecap="round"/>
                  {/* Fletching / Feathers at back */}
                  <polygon points="2,-4 10,0 2,4" fill="#ffccd5"/>
                  <polygon points="-4,-4 4,0 -4,4" fill="#ff758f"/>
                  {/* Heart Arrowhead */}
                  <path 
                    d="M 48,-6 C 53,-11 60,-7 60,-2 C 60,3 52,9 48,11 C 44,9 36,3 36,-2 C 36,-7 43,-11 48,-6 Z" 
                    fill="#ff0055" 
                    transform="rotate(90 48 0) scale(0.65)"
                  />
                </motion.g>
              )}
            </g>

            {/* Right Arm & Hand (Reaching, Pulling back string, and Releasing) */}
            <motion.path 
              animate={{
                d: isDrawn
                  ? "M 62,95 C 65,92 72,94 76,96"    // Pulled tight back near cheek
                  : stage === 'nock'
                  ? "M 62,95 C 75,98 88,97 100,96"   // Reaching forward to nock
                  : stage === 'raise'
                  ? "M 62,95 C 68,102 74,108 80,110"  // Raising
                  : isPostRelease
                  ? "M 62,95 C 66,96 70,98 72,98"    // Recoil after release
                  : "M 62,95 C 65,108 68,122 72,130" // Relaxed by side
              }}
              transition={{ duration: 0.3 }}
              fill="none" 
              stroke="url(#cupidSkinGrad)" 
              strokeWidth="8" 
              strokeLinecap="round"
            />
          </svg>
        </motion.div>

        {/* ---------------- FLYING ARROW LAYER ---------------- */}
        {/* Visibly flies from Cupid's bow on left across to Target on right */}
        {isPostRelease && stage !== 'burst' && (
          <motion.div
            initial={{ x: 0, opacity: 1 }}
            animate={{ 
              x: stage === 'flying' || stage === 'impact' ? travelDistance : 0 
            }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1] // Fast dynamic whoosh
            }}
            style={{ 
              position: 'absolute', 
              left: `${arrowOriginX}px`, 
              top: '50%', 
              marginTop: '-12px',
              zIndex: 30,
              pointerEvents: 'none'
            }}
            className="flex items-center"
          >
            {/* The Arrow SVG */}
            <svg width="68" height="24" viewBox="0 0 68 24" className="overflow-visible">
              <defs>
                <filter id="arrowGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="glow"/>
                  <feComposite in="SourceGraphic" in2="glow" operator="over"/>
                </filter>
              </defs>

              {/* Glowing flight trail */}
              <line x1="-30" y1="12" x2="30" y2="12" stroke="rgba(255,117,143,0.6)" strokeWidth="4" strokeLinecap="round" filter="url(#arrowGlow)"/>
              <line x1="-15" y1="12" x2="45" y2="12" stroke="rgba(255,209,102,0.8)" strokeWidth="2" strokeLinecap="round"/>

              {/* Arrow shaft */}
              <line x1="10" y1="12" x2="55" y2="12" stroke="#ffd166" strokeWidth="3" strokeLinecap="round"/>

              {/* Arrow Feathers */}
              <polygon points="10,6 20,12 10,18" fill="#ffffff" opacity="0.9"/>
              <polygon points="4,6 14,12 4,18" fill="#ff758f"/>

              {/* Heart Arrowhead pointing right */}
              <g transform="translate(54, 12) rotate(90) scale(0.6)" filter="url(#arrowGlow)">
                <path 
                  d="M 0,-6 C 5,-13 14,-8 14,-1 C 14,5 2,12 0,15 C -2,12 -14,5 -14,-1 C -14,-8 -5,-13 0,-6 Z" 
                  fill="#ff0055"
                />
              </g>
            </svg>

            {/* Trailing sparkle particles along arrow flight */}
            <motion.div 
              animate={{ opacity: [0.8, 0], scale: [1, 0.4] }}
              transition={{ repeat: Infinity, duration: 0.18 }}
              className="absolute -left-2 text-xs text-[#ffd166]"
            >
              ✨
            </motion.div>
          </motion.div>
        )}

        {/* ---------------- GLOWING HEART TARGET (RIGHT SIDE) ---------------- */}
        <div 
          style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }}
          className="w-[84px] sm:w-[96px] h-[84px] sm:h-[96px] flex items-center justify-center shrink-0 z-20"
        >
          {/* Target state before burst */}
          {stage !== 'burst' ? (
            <motion.div
              animate={
                stage === 'impact' 
                  ? { 
                      scale: [1, 1.35, 1.1], 
                      x: [-4, 6, -3, 3, 0],
                      filter: ['brightness(1)', 'brightness(2.2)', 'brightness(1.2)'] 
                    }
                  : { 
                      scale: [1, 1.08, 1],
                      y: [0, -5, 0]
                    }
              }
              transition={
                stage === 'impact'
                  ? { duration: 0.3 }
                  : { repeat: Infinity, duration: 2.2, ease: 'easeInOut' }
              }
              className="relative w-full h-full flex items-center justify-center cursor-pointer"
            >
              {/* Pulsating target rings / aura */}
              <motion.div 
                animate={{ scale: [1, 1.25, 1], opacity: [0.35, 0.7, 0.35] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#ff4d6d]/40 to-[#ff758f]/20 blur-md"
              />
              <div className="absolute inset-2 rounded-full border-2 border-dashed border-[#ff758f]/50 animate-spin-slow" />

              {/* Beautiful glowing Heart SVG */}
              <svg viewBox="0 0 100 100" className="w-[68px] sm:w-[76px] h-[68px] sm:h-[76px] overflow-visible drop-shadow-[0_0_16px_rgba(255,77,109,0.85)]">
                <defs>
                  <linearGradient id="targetHeartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff4d6d"/>
                    <stop offset="50%" stopColor="#c9184a"/>
                    <stop offset="100%" stopColor="#800f2f"/>
                  </linearGradient>
                  <linearGradient id="goldTargetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffe66d"/>
                    <stop offset="100%" stopColor="#ffb703"/>
                  </linearGradient>
                </defs>

                {/* Heart Base */}
                <path 
                  d="M 50,25 C 60,10 85,15 85,38 C 85,60 55,80 50,86 C 45,80 15,60 15,38 C 15,15 40,10 50,25 Z" 
                  fill="url(#targetHeartGrad)"
                />

                {/* Concentric Golden Target Ring inside Heart */}
                <path 
                  d="M 50,34 C 57,22 75,26 75,42 C 75,58 53,72 50,76 C 47,72 25,58 25,42 C 25,26 43,22 50,34 Z" 
                  fill="none" 
                  stroke="url(#goldTargetGrad)" 
                  strokeWidth="2.5" 
                  opacity="0.8"
                />

                {/* Inner Bullseye Core */}
                <circle cx="50" cy="46" r="6" fill="#ffd166"/>
                <circle cx="50" cy="46" r="2.5" fill="#ffffff"/>

                {/* Shimmer sparkle */}
                <path d="M 68,26 L 70,30 L 74,31 L 70,32 L 68,36 L 66,32 L 62,31 L 66,30 Z" fill="#ffffff" opacity="0.9"/>
              </svg>

              {/* Impact Flash Shockwave */}
              {stage === 'impact' && (
                <motion.div
                  initial={{ scale: 0.5, opacity: 1 }}
                  animate={{ scale: 2.5, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute w-20 h-20 rounded-full bg-white blur-xs pointer-events-none"
                />
              )}
            </motion.div>
          ) : (
            // Burst Particle Explosion (24+ pink hearts & 30+ golden sparkles)
            <div className="relative w-full h-full flex items-center justify-center">
              <AnimatePresence>
                {particles.map(p => (
                  <motion.div
                    key={p.id}
                    initial={{ x: 0, y: 0, scale: 0.2, opacity: 1 }}
                    animate={{ 
                      x: p.x, 
                      y: p.y, 
                      scale: [0.2, 1.2, 0.8], 
                      opacity: [1, 1, 0],
                      rotate: p.id % 2 === 0 ? 90 : -90
                    }}
                    transition={{ 
                      duration: 1.2, 
                      delay: p.delay, 
                      ease: [0.2, 0.8, 0.2, 1] 
                    }}
                    style={{ position: 'absolute', pointerEvents: 'none' }}
                  >
                    {p.type === 'heart' ? (
                      <span style={{ fontSize: `${p.size}px`, color: p.color }}>❤️</span>
                    ) : p.type === 'star' ? (
                      <span style={{ fontSize: `${p.size}px`, color: p.color }}>✨</span>
                    ) : (
                      <div 
                        style={{ 
                          width: `${p.size * 0.6}px`, 
                          height: `${p.size * 0.6}px`, 
                          backgroundColor: p.color 
                        }} 
                        className="rounded-full shadow-sm"
                      />
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Central burst radiance */}
              <motion.div
                initial={{ scale: 0.2, opacity: 0.9 }}
                animate={{ scale: 3, opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="w-24 h-24 rounded-full bg-gradient-to-r from-[#ff4d6d] via-[#ffd166] to-[#ff758f] blur-md pointer-events-none"
              />
            </div>
          )}
        </div>
      </div>

      {/* ---------------- ACTION BUTTON CONTROLS ---------------- */}
      <div className="w-full flex flex-col items-center gap-2.5 z-20 shrink-0 mb-2">
        <motion.button
          id="release-arrow-btn"
          whileHover={!isPlaying ? { scale: 1.04 } : {}}
          whileTap={!isPlaying ? { scale: 0.96 } : {}}
          onClick={handleStartAnimation}
          disabled={isPlaying}
          className={`w-full max-w-[270px] h-12 rounded-full font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
            isPlaying 
              ? 'bg-[#c9184a]/20 text-[#c9184a] cursor-not-allowed border border-[#c9184a]/30' 
              : 'bg-gradient-to-r from-[#ff4d6d] to-[#ff758f] text-white active:scale-95 shadow-[0_4px_16px_rgba(255,77,109,0.35)]'
          }`}
        >
          {isPlaying ? (
            <span className="flex items-center gap-2 text-xs">
              <span className="animate-spin text-sm">🏹</span>
              <span>
                {stage === 'draw' || stage === 'aim' ? 'Aiming with all my love…' :
                 stage === 'flying' || stage === 'impact' ? 'Target locked on! ❤️' :
                 stage === 'burst' ? 'Happy Birthday, Anifa! ✨' : 'Drawing the bow…'}
              </span>
            </span>
          ) : (
            <span>Release the Arrow 💘</span>
          )}
        </motion.button>

        {/* Skip button control */}
        <button
          id="skip-cupid-btn"
          onClick={onNext}
          className="text-xs text-[#843b62]/70 hover:text-[#843b62] transition-colors py-1 cursor-pointer"
        >
          Skip animation →
        </button>
      </div>
    </div>
  );
};

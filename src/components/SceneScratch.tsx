import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { sound } from '../utils/sound';
import { BIRTHDAY_CONFIG } from '../config';

interface Props {
  onNext: () => void;
}

export const SceneScratch: React.FC<Props> = ({ onNext }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const isDrawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width = 300;
    const h = canvas.height = 180;

    // Draw pastel foil gradient
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#ffd1dc');
    grad.addColorStop(0.5, '#fbc4ab');
    grad.addColorStop(1, '#fcd5ce');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Subtle sparkles on foil
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    for (let i = 0; i < 30; i++) {
      ctx.beginPath();
      ctx.arc((i * 37) % w, (i * 23) % h, (i % 3) + 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = '#843b62';
    ctx.font = 'bold 14px Outfit, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ SCRATCH TO REVEAL ✨', w / 2, h / 2 - 8);
    ctx.font = '11px Outfit, sans-serif';
    ctx.fillStyle = 'rgba(132, 59, 98, 0.8)';
    ctx.fillText('Swipe with your finger or mouse', w / 2, h / 2 + 14);
  }, []);

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 24, 0, Math.PI * 2);
    ctx.fill();

    checkProgress(ctx, canvas);
  };

  const checkProgress = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    if (isRevealed) return;
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imgData.data;
    let transparent = 0;
    const step = 32;

    for (let i = 3; i < pixels.length; i += step * 4) {
      if (pixels[i] < 128) transparent++;
    }

    const total = pixels.length / (step * 4);
    if (transparent / total > 0.38) {
      setIsRevealed(true);
      sound.playUnlock();
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    isDrawing.current = true;
    scratch(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDrawing.current) return;
    scratch(e.clientX, e.clientY);
  };

  const handlePointerUp = () => {
    isDrawing.current = false;
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
      <h2 className="font-serif text-xl font-bold text-[#c9184a] mb-1">
        Scratch To Reveal ✨
      </h2>
      <p className="text-xs text-[#6b535d] mb-5">
        {BIRTHDAY_CONFIG.scratchCard.instruction}
      </p>

      {/* Scratch Box */}
      <div className="w-[300px] h-[180px] rounded-2xl relative overflow-hidden shadow-md mb-6">
        {/* Underneath Message */}
        <div className="absolute inset-0 bg-[#fff0f3] p-5 flex flex-col items-center justify-center text-center">
          <h3 className="font-serif text-sm font-bold text-[#c9184a] mb-1.5">
            {BIRTHDAY_CONFIG.scratchCard.hiddenTitle}
          </h3>
          <p className="text-xs text-[#2b1b22] leading-relaxed">
            {BIRTHDAY_CONFIG.scratchCard.hiddenMessage}
          </p>
        </div>

        {/* Scratch Canvas Overlay */}
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className={`absolute inset-0 cursor-crosshair touch-none transition-opacity duration-700 ${
            isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        />
      </div>

      <motion.button
        id="scratch-proceed-btn"
        animate={isRevealed ? { scale: [1, 1.05, 1], opacity: 1 } : { opacity: 0.5 }}
        onClick={onNext}
        className="py-3.5 px-8 rounded-full bg-gradient-to-r from-[#ff4d6d] to-[#ff758f] text-white font-semibold text-sm shadow-md active:scale-95 transition-transform cursor-pointer"
      >
        <span>{BIRTHDAY_CONFIG.scratchCard.postScratchPrompt}</span>
      </motion.button>
    </div>
  );
};

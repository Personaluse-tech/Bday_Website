import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/sound';
import { BIRTHDAY_CONFIG } from '../config';

interface Props {
  onNext: () => void;
}

export const SceneEnvelope: React.FC<Props> = ({ onNext }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showFullLetter, setShowFullLetter] = useState(false);

  const handleOpenEnvelope = () => {
    if (isOpen) return;
    setIsOpen(true);
    sound.playEnvelope();
    setTimeout(() => {
      setShowFullLetter(true);
    }, 700);
  };

  const handleCloseLetter = () => {
    setShowFullLetter(false);
    onNext();
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
      <h2 className="font-serif text-xl font-bold text-[#c9184a] mb-6">
        There's a letter for you… 💌
      </h2>

      {/* 3D Envelope */}
      <div 
        onClick={handleOpenEnvelope}
        className="w-[280px] h-[190px] relative cursor-pointer mb-6"
      >
        <div className="absolute inset-0 bg-[#f4acb7] rounded-xl shadow-md" />
        
        {/* Paper inside rising */}
        <motion.div
          animate={isOpen ? { y: -70, scale: 1.05 } : { y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="absolute top-2 left-3 right-3 h-[170px] bg-[#fffdfa] rounded-lg p-3 shadow-inner flex flex-col items-center justify-center border border-[#f1e3d3]"
        >
          <p className="font-handwriting text-lg text-[#c9184a] font-bold">
            Tap to open and read… ✨
          </p>
        </motion.div>

        {/* Envelope Top Flap */}
        <motion.div
          animate={isOpen ? { rotateX: 180, zIndex: 0 } : { rotateX: 0, zIndex: 10 }}
          transition={{ duration: 0.6 }}
          style={{ transformOrigin: 'top' }}
          className="absolute top-0 left-0 w-0 h-0 border-l-[140px] border-l-transparent border-r-[140px] border-r-transparent border-t-[95px] border-t-[#ffcad4]"
        />

        {/* Wax Seal */}
        {!isOpen && (
          <div className="absolute top-20 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#c9184a] text-[#ffd166] flex items-center justify-center text-lg shadow-md z-20">
            ❤️
          </div>
        )}
      </div>

      <p className="text-xs text-[#6b535d]">Tap the sealed envelope to open</p>

      {/* Fullscreen Handwritten Letter Modal */}
      <AnimatePresence>
        {showFullLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-md flex items-center justify-center p-5 text-left"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-[340px] max-h-[82vh] bg-[#fffef7] rounded-2xl p-6 overflow-y-auto shadow-2xl border border-[#f2e9e4]"
            >
              <div className="text-right text-xs text-[#6b535d] mb-3">
                {BIRTHDAY_CONFIG.letter.date}
              </div>

              <div className="font-handwriting text-2xl font-bold text-[#c9184a] mb-4">
                {BIRTHDAY_CONFIG.letter.salutation}
              </div>

              <div className="flex flex-col gap-3 text-xs text-[#2b1b22] leading-relaxed">
                {BIRTHDAY_CONFIG.letter.paragraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              <div className="font-handwriting text-lg text-[#ff4d6d] font-bold text-right mt-5">
                {BIRTHDAY_CONFIG.letter.closing}
              </div>
              <div className="font-serif text-sm font-semibold text-[#c9184a] text-right">
                {BIRTHDAY_CONFIG.letter.signature}
              </div>

              <button
                onClick={handleCloseLetter}
                className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#ff4d6d] to-[#ff758f] text-white font-semibold text-xs shadow-md active:scale-95 transition-transform mt-6 cursor-pointer"
              >
                <span>One More Secret Awaits 🎁</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from './utils/sound';
import { BIRTHDAY_CONFIG } from './config';

import { SoundPromptModal } from './components/SoundPromptModal';
import { SceneOpening } from './components/SceneOpening';
import { SceneBalloons } from './components/SceneBalloons';
import { SceneCupid } from './components/SceneCupid';
import { SceneHeartImpact } from './components/SceneHeartImpact';
import { SceneLock } from './components/SceneLock';
import { SceneSurprise } from './components/SceneSurprise';
import { SceneUniverseLoading } from './components/SceneUniverseLoading';
import { SceneInteractiveStars } from './components/SceneInteractiveStars';
import { SceneQuotes } from './components/SceneQuotes';
import { SceneEnvelope } from './components/SceneEnvelope';
import { SceneScratch } from './components/SceneScratch';
import { SceneTimeline } from './components/SceneTimeline';
import { SceneFilmReel } from './components/SceneFilmReel';
import { SceneHiddenFinal } from './components/SceneHiddenFinal';
import { SceneCelebration } from './components/SceneCelebration';
import { EasterEggModal } from './components/EasterEggModal';

export type SceneId = 
  | 'prompt'
  | 'opening'
  | 'balloons'
  | 'cupid'
  | 'heart-impact'
  | 'lock'
  | 'surprise'
  | 'universe-loading'
  | 'interactive-stars'
  | 'quotes'
  | 'envelope'
  | 'scratch'
  | 'timeline'
  | 'film-reel'
  | 'hidden-final'
  | 'celebration';

export const App: React.FC = () => {
  const [currentScene, setCurrentScene] = useState<SceneId>('prompt');
  const [isMuted, setIsMuted] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  const toggleSound = () => {
    if (!sound.isEnabled) {
      sound.enableAudio();
      setIsMuted(false);
    } else {
      const muted = sound.toggleMute();
      setIsMuted(muted);
    }
  };

  const getBackgroundStyle = () => {
    switch (currentScene) {
      case 'universe-loading':
      case 'interactive-stars':
      case 'hidden-final':
        return 'bg-gradient-to-b from-[#0b091a] via-[#1e1233] to-[#3b1443]';
      case 'quotes':
      case 'envelope':
        return 'bg-gradient-to-b from-[#fff0f3] via-[#ffe5ec] to-[#fcd5ce]';
      case 'celebration':
        return 'bg-gradient-to-b from-[#ffe5ec] via-[#ffccd5] to-[#ffd166]/40';
      default:
        return 'bg-gradient-to-b from-[#fff0f3] to-[#ffe5ec]';
    }
  };

  return (
    <div className="w-screen h-[100dvh] flex items-center justify-center bg-[#120e16] overflow-hidden select-none">
      {/* Mobile Frame Container */}
      <main 
        className={`w-full h-full max-w-[440px] max-h-[940px] sm:h-[92vh] sm:rounded-[40px] sm:border-8 sm:border-white/10 shadow-2xl relative flex flex-col overflow-hidden transition-colors duration-1000 ${getBackgroundStyle()}`}
      >
        {/* Top Header */}
        <header className="absolute top-4 left-0 right-0 h-12 px-5 flex justify-between items-center z-50 pointer-events-auto">
          <span className="font-serif italic text-xs text-[#843b62]/80 tracking-wider">
            her little universe • {BIRTHDAY_CONFIG.recipientName.toLowerCase()}
          </span>
          <button
            onClick={toggleSound}
            aria-label="Toggle sound"
            className="w-9 h-9 rounded-full bg-white/70 backdrop-blur-md border border-white/80 shadow-sm flex items-center justify-center text-sm cursor-pointer active:scale-90 transition-transform"
          >
            {isMuted ? '🔇' : '🔊'}
          </button>
        </header>

        {/* Scene Area with Framer Motion transitions */}
        <div className="flex-1 w-full h-full relative overflow-hidden pt-12">
          <AnimatePresence mode="wait">
            {currentScene === 'prompt' && (
              <SoundPromptModal 
                key="prompt"
                onProceed={() => setCurrentScene('opening')} 
              />
            )}

            {currentScene === 'opening' && (
              <motion.div
                key="opening"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full"
              >
                <SceneOpening onNext={() => setCurrentScene('balloons')} />
              </motion.div>
            )}

            {currentScene === 'balloons' && (
              <motion.div
                key="balloons"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full"
              >
                <SceneBalloons onNext={() => setCurrentScene('cupid')} />
              </motion.div>
            )}

            {currentScene === 'cupid' && (
              <motion.div
                key="cupid"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full"
              >
                <SceneCupid onNext={() => setCurrentScene('heart-impact')} />
              </motion.div>
            )}

            {currentScene === 'heart-impact' && (
              <motion.div
                key="heart-impact"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full"
              >
                <SceneHeartImpact onNext={() => setCurrentScene('lock')} />
              </motion.div>
            )}

            {currentScene === 'lock' && (
              <motion.div
                key="lock"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full"
              >
                <SceneLock onNext={() => setCurrentScene('surprise')} />
              </motion.div>
            )}

            {currentScene === 'surprise' && (
              <motion.div
                key="surprise"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full"
              >
                <SceneSurprise onNext={() => setCurrentScene('universe-loading')} />
              </motion.div>
            )}

            {currentScene === 'universe-loading' && (
              <motion.div
                key="universe-loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full h-full"
              >
                <SceneUniverseLoading onNext={() => setCurrentScene('interactive-stars')} />
              </motion.div>
            )}

            {currentScene === 'interactive-stars' && (
              <motion.div
                key="interactive-stars"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full"
              >
                <SceneInteractiveStars onNext={() => setCurrentScene('quotes')} />
              </motion.div>
            )}

            {currentScene === 'quotes' && (
              <motion.div
                key="quotes"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full"
              >
                <SceneQuotes onNext={() => setCurrentScene('envelope')} />
              </motion.div>
            )}

            {currentScene === 'envelope' && (
              <motion.div
                key="envelope"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full"
              >
                <SceneEnvelope onNext={() => setCurrentScene('scratch')} />
              </motion.div>
            )}

            {currentScene === 'scratch' && (
              <motion.div
                key="scratch"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full"
              >
                <SceneScratch onNext={() => setCurrentScene('timeline')} />
              </motion.div>
            )}

            {currentScene === 'timeline' && (
              <motion.div
                key="timeline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full"
              >
                <SceneTimeline onPlayFilm={() => setCurrentScene('film-reel')} />
              </motion.div>
            )}

            {currentScene === 'film-reel' && (
              <SceneFilmReel 
                key="film-reel"
                onNext={() => setCurrentScene('hidden-final')} 
              />
            )}

            {currentScene === 'hidden-final' && (
              <motion.div
                key="hidden-final"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full h-full"
              >
                <SceneHiddenFinal onNext={() => setCurrentScene('celebration')} />
              </motion.div>
            )}

            {currentScene === 'celebration' && (
              <motion.div
                key="celebration"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full h-full"
              >
                <SceneCelebration 
                  onReplayStory={() => setCurrentScene('opening')}
                  onRereadLetter={() => setCurrentScene('envelope')}
                  onReplayMemories={() => setCurrentScene('timeline')}
                  onOpenEasterEgg={() => setShowEasterEgg(true)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Secret Easter Egg Modal */}
        <AnimatePresence>
          {showEasterEgg && (
            <EasterEggModal onClose={() => setShowEasterEgg(false)} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

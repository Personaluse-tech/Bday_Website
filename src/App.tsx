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
import { ScenePostGift } from './components/ScenePostGift';
import { ScenePostPenguins } from './components/ScenePostPenguins';
import { ScenePostScrapbook } from './components/ScenePostScrapbook';
import { ScenePostProposal } from './components/ScenePostProposal';
import { ScenePostHug } from './components/ScenePostHug';
import { ScenePostLove } from './components/ScenePostLove';

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
  | 'celebration'
  | 'post-gift'
  | 'post-penguins'
  | 'post-scrapbook'
  | 'post-proposal'
  | 'post-hug'
  | 'post-love';

export const App: React.FC = () => {
  const [currentScene, setCurrentScene] = useState<SceneId>(() => {
    try {
      const searchParam = new URLSearchParams(window.location.search).get('scene') as SceneId;
      if (searchParam) return searchParam;
      const hashParam = window.location.hash.replace('#', '') as SceneId;
      if (hashParam) return hashParam;
    } catch {
      // ignore
    }
    return 'prompt';
  });
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
      case 'post-gift':
      case 'post-penguins':
      case 'post-scrapbook':
      case 'post-proposal':
      case 'post-hug':
      case 'post-love':
        return 'bg-[#fdfbf7]';
      default:
        return 'bg-gradient-to-b from-[#fff0f3] to-[#ffe5ec]';
    }
  };

  const isDark = ['universe-loading', 'interactive-stars', 'hidden-final'].includes(currentScene);

  return (
    <div className="w-screen h-[100dvh] flex items-center justify-center bg-[#120e16] overflow-hidden select-none">
      {/* Mobile Frame Container (supports responsive horizontal expansion in landscape) */}
      <main 
        className={`w-full h-full max-w-[440px] landscape:max-w-[860px] max-h-[940px] sm:h-[92vh] sm:rounded-[40px] sm:border-8 sm:border-white/10 shadow-2xl relative flex flex-col overflow-hidden transition-all duration-700 ${getBackgroundStyle()}`}
      >
        {/* Top Header */}
        <header className="w-full shrink-0 h-14 px-4 sm:px-5 flex justify-between items-center z-40 pointer-events-auto pt-2">
          <div className={`flex items-center gap-1.5 py-1 px-3 rounded-full backdrop-blur-md border transition-colors duration-500 shadow-xs ${
            isDark ? 'bg-white/10 border-white/15 text-[#ffccd5]' : 'bg-white/70 border-white/90 text-[#843b62]'
          }`}>
            <span className={isDark ? 'text-[#ffd166] text-xs' : 'text-[#ff4d6d] text-xs'}>✦</span>
            <span className="font-serif italic font-medium text-xs tracking-wide">
              a tiny universe for anifa
            </span>
            <span className={isDark ? 'text-[#ff758f] text-[10px]' : 'text-[#c9184a] text-[10px]'}>♡</span>
          </div>

          <button
            id="sound-toggle-btn"
            onClick={toggleSound}
            aria-label="Toggle sound"
            className={`w-9 h-9 rounded-full backdrop-blur-md border shadow-sm flex items-center justify-center text-sm cursor-pointer active:scale-90 transition-all ${
              isDark ? 'bg-white/15 border-white/20 text-white hover:bg-white/25' : 'bg-white/75 border-white/90 text-[#843b62] hover:bg-white'
            }`}
          >
            {isMuted ? '🔇' : '🔊'}
          </button>
        </header>

        {/* Scene Area with Framer Motion transitions */}
        <div className="flex-1 w-full min-h-0 relative flex flex-col overflow-hidden">
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
                  onNext={() => setCurrentScene('post-gift')}
                />
              </motion.div>
            )}

            {currentScene === 'post-gift' && (
              <motion.div
                key="post-gift"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full"
              >
                <ScenePostGift onNext={() => setCurrentScene('post-penguins')} />
              </motion.div>
            )}

            {currentScene === 'post-penguins' && (
              <motion.div
                key="post-penguins"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full"
              >
                <ScenePostPenguins onNext={() => setCurrentScene('post-scrapbook')} />
              </motion.div>
            )}

            {currentScene === 'post-scrapbook' && (
              <motion.div
                key="post-scrapbook"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full"
              >
                <ScenePostScrapbook onNext={() => setCurrentScene('post-proposal')} />
              </motion.div>
            )}

            {currentScene === 'post-proposal' && (
              <motion.div
                key="post-proposal"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full"
              >
                <ScenePostProposal onNext={() => setCurrentScene('post-hug')} />
              </motion.div>
            )}

            {currentScene === 'post-hug' && (
              <motion.div
                key="post-hug"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full"
              >
                <ScenePostHug onNext={() => setCurrentScene('post-love')} />
              </motion.div>
            )}

            {currentScene === 'post-love' && (
              <motion.div
                key="post-love"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full h-full"
              >
                <ScenePostLove
                  onReplaySurprise={() => setCurrentScene('post-gift')}
                  onReadLetterAgain={() => setCurrentScene('envelope')}
                  onReplayMemories={() => setCurrentScene('post-scrapbook')}
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

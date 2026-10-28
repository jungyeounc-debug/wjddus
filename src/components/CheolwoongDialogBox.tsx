/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { CheolwoongMood, DialogueChoice } from '../types/game';
import { soundManager } from '../utils/audio';
import { CheolwoongAvatar } from './CheolwoongAvatar';

interface CheolwoongDialogBoxProps {
  mood: CheolwoongMood;
  text: string;
  choices?: DialogueChoice[];
  onSelectChoice?: (choice: DialogueChoice) => void;
  onDismiss?: () => void;
  speed?: 'slow' | 'normal' | 'fast' | 'instant';
  speakerTitle?: string;
}

export const CheolwoongDialogBox: React.FC<CheolwoongDialogBoxProps> = ({
  mood = 'normal',
  text,
  choices = [],
  onSelectChoice,
  onDismiss,
  speed = 'normal',
  speakerTitle = '철웅 사장님',
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [activeMood, setActiveMood] = useState<CheolwoongMood>(mood);

  useEffect(() => {
    setActiveMood(mood);
  }, [mood]);

  // Typewriter effect
  useEffect(() => {
    if (speed === 'instant') {
      setDisplayedText(text);
      setIsTyping(false);
      return;
    }

    const intervalMs = speed === 'slow' ? 45 : speed === 'fast' ? 15 : 28;
    setDisplayedText('');
    setIsTyping(true);

    let currentIndex = 0;
    const timer = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        if (currentIndex % 3 === 0) {
          soundManager.playTypewriter();
        }
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, intervalMs);

    return () => clearInterval(timer);
  }, [text, speed]);

  const handleSkipTyping = () => {
    if (isTyping) {
      setDisplayedText(text);
      setIsTyping(false);
    }
  };

  const moodBadges: Record<CheolwoongMood, { emoji: string; label: string; color: string }> = {
    normal: { emoji: '🍜', label: '평온', color: 'bg-amber-100 text-amber-800' },
    smile: { emoji: '😄', label: '흐뭇', color: 'bg-emerald-100 text-emerald-800' },
    touched: { emoji: '🥹', label: '감동', color: 'bg-pink-100 text-pink-800' },
    shocked: { emoji: '😱', label: '당황', color: 'bg-red-100 text-red-800' },
    pout: { emoji: '😤', label: '삐짐', color: 'bg-purple-100 text-purple-800' },
    serious: { emoji: '🧐', label: '진지', color: 'bg-blue-100 text-blue-800' },
    sleepy: { emoji: '🥱', label: '졸림', color: 'bg-slate-100 text-slate-800' },
  };

  const currentBadge = moodBadges[activeMood] || moodBadges.normal;

  return (
    <div
      onClick={handleSkipTyping}
      className="relative w-full max-w-4xl mx-auto bg-linear-to-r from-amber-50/95 via-orange-50/95 to-amber-50/95 border-4 border-amber-600 rounded-3xl p-3.5 sm:p-5 shadow-2xl backdrop-blur-md select-none transition-all"
    >
      {/* 2000s Classic Screws/Rivets at Corners */}
      <div className="absolute top-2 left-2 w-2.5 h-2.5 rounded-full bg-amber-700 border border-amber-300 shadow-inner" />
      <div className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-amber-700 border border-amber-300 shadow-inner" />
      <div className="absolute bottom-2 left-2 w-2.5 h-2.5 rounded-full bg-amber-700 border border-amber-300 shadow-inner" />
      <div className="absolute bottom-2 right-2 w-2.5 h-2.5 rounded-full bg-amber-700 border border-amber-300 shadow-inner" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5">
        {/* Mascot Avatar with Mood Effect */}
        <div className="relative shrink-0 flex items-center gap-2">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-3 border-amber-500 bg-amber-50 shadow-md flex items-center justify-center p-0.5">
            <CheolwoongAvatar
              mood={activeMood}
              size="md"
              className="w-full h-full object-contain"
            />
            {/* Mood Overlay Icon */}
            <div className="absolute bottom-0.5 right-0.5 w-6 h-6 rounded-full bg-white/95 border border-amber-400 flex items-center justify-center text-xs shadow-sm z-10">
              {currentBadge.emoji}
            </div>
          </div>
          <div className="sm:hidden flex flex-col">
            <span className="font-jua text-base text-amber-950 font-bold">{speakerTitle}</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full w-max ${currentBadge.color}`}>
              {currentBadge.label}
            </span>
          </div>
        </div>

        {/* Text and Choices Content */}
        <div className="flex-1 w-full text-left">
          {/* Speaker Header (Desktop) */}
          <div className="hidden sm:flex items-center gap-2 mb-1.5">
            <span className="font-jua text-lg text-amber-950 font-bold">{speakerTitle}</span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${currentBadge.color}`}>
              {currentBadge.emoji} {currentBadge.label}
            </span>
          </div>

          {/* Typewriter Text Body */}
          <div className="min-h-[46px] flex items-center">
            <p className="text-sm sm:text-base font-semibold text-slate-800 leading-snug">
              {displayedText}
              {isTyping && <span className="inline-block w-2 h-4 ml-1 bg-amber-600 animate-pulse" />}
            </p>
          </div>

          {/* Multiple-choice Response Options */}
          {!isTyping && choices.length > 0 && (
            <div className="mt-3 pt-2 border-t border-amber-200/80 flex flex-wrap gap-2 animate-fade-in">
              {choices.map((choice, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    soundManager.playJellyPop();
                    if (choice.affinityDelta > 0) {
                      soundManager.playHeartChime();
                    }
                    if (onSelectChoice) onSelectChoice(choice);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-amber-100 border-2 border-amber-400 hover:border-amber-600 text-amber-950 text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition active:scale-95 flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-amber-600">💬</span>
                  <span>{choice.text}</span>
                  {choice.affinityDelta > 0 && (
                    <span className="text-pink-600 text-[11px] font-extrabold">❤️+{choice.affinityDelta}</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Dismiss / Close indicator */}
        {onDismiss && !isTyping && choices.length === 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              soundManager.playClick();
              onDismiss();
            }}
            className="self-end sm:self-center px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold shadow transition cursor-pointer"
          >
            확인 ↵
          </button>
        )}
      </div>
    </div>
  );
};

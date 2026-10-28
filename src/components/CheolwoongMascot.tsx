/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CheolwoongMood } from '../types/game';
import { soundManager } from '../utils/audio';
import { CheolwoongAvatar } from './CheolwoongAvatar';

interface CheolwoongMascotProps {
  mood?: CheolwoongMood;
  speechText?: string;
  onClickSpeech?: () => void;
  compact?: boolean;
}

export const CheolwoongMascot: React.FC<CheolwoongMascotProps> = ({
  mood = 'greeting',
  speechText,
  onClickSpeech,
  compact = false,
}) => {
  // Default speech per mood
  const defaultSpeech = {
    greeting: '어서 와! 오늘도 연라면 활기차게 열어볼까? 🍜',
    cooking: '보글보글~ 물 조절과 불 조절이 생명이라구! 🍳',
    happy: '우와아! 완벽한 맛이야! 손님이 엄청 감동하셨어! 🌟',
    cheering: '이 맛이지! 역시 우리 연라면은 사랑입니다! 💖',
    shocked: '으악! 내 손이 미끄러졌나?! 손님 미안해요... 💦',
  }[mood];

  const currentSpeech = speechText || defaultSpeech;

  const handleMascotClick = () => {
    soundManager.playCheolwoongVoice();
    if (onClickSpeech) onClickSpeech();
  };

  const moodBadges = {
    greeting: '👋',
    cooking: '🔥',
    happy: '✨',
    cheering: '🎉',
    shocked: '💧',
  }[mood];

  return (
    <div className={`flex items-end gap-3 select-none ${compact ? 'scale-90' : ''}`}>
      {/* Mascot Avatar Box */}
      <div
        onClick={handleMascotClick}
        className="relative group cursor-pointer shrink-0 transition-transform active:scale-95"
        title="철웅 사장님 (클릭해서 목소리 듣기!)"
      >
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-3 border-amber-400 bg-amber-50/90 shadow-md flex items-center justify-center p-1">
          {/* Chef Cheol-woong Vector SVG Portrait with dynamic moods */}
          <CheolwoongAvatar
            mood={mood}
            size="lg"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Name tag pill badge */}
        <div className="absolute -bottom-2 inset-x-0 mx-auto w-max px-2 py-0.5 bg-amber-600 text-white text-[11px] font-bold rounded-full shadow border border-white flex items-center gap-0.5 z-20">
          <span>철웅 사장</span>
          <span>{moodBadges}</span>
        </div>
      </div>

      {/* Speech Bubble */}
      <div
        onClick={handleMascotClick}
        className="relative bg-white/95 backdrop-blur-xs border-2 border-amber-200 rounded-2xl p-3 sm:p-3.5 shadow-md max-w-xs sm:max-w-md cursor-pointer hover:border-amber-300 transition-all text-left"
      >
        {/* Pointer arrow to avatar */}
        <div className="absolute left-[-8px] bottom-4 w-0 h-0 border-t-[8px] border-t-transparent border-r-[8px] border-r-amber-200 border-b-[8px] border-b-transparent" />
        <div className="absolute left-[-6px] bottom-4 w-0 h-0 border-t-[7px] border-t-transparent border-r-[7px] border-r-white border-b-[7px] border-b-transparent" />

        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 mb-0.5">
          <span className="font-jua text-sm text-amber-900">철웅 사장님</span>
          <span className="text-[10px] text-amber-600">· 클릭하면 인사해요</span>
        </div>
        <p className="text-xs sm:text-sm font-medium text-slate-800 leading-snug">
          {currentSpeech}
        </p>
      </div>
    </div>
  );
};

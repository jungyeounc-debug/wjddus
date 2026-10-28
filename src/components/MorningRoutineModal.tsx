/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { DailyEventInfo, DialogueChoice, PlayerProfile } from '../types/game';
import { soundManager } from '../utils/audio';
import { CheolwoongDialogBox } from './CheolwoongDialogBox';

interface MorningRoutineModalProps {
  day: number;
  dailyEvent: DailyEventInfo;
  profile: PlayerProfile;
  affinityLevel: number;
  onOpenMarket: () => void;
  onStartService: () => void;
  onOpenChat: () => void;
}

export const MorningRoutineModal: React.FC<MorningRoutineModalProps> = ({
  day,
  dailyEvent,
  profile,
  affinityLevel,
  onOpenMarket,
  onStartService,
  onOpenChat,
}) => {
  const [dialogState, setDialogState] = useState<{
    text: string;
    choices: DialogueChoice[];
  }>({
    text: `"${profile.name}! 좋은 아침이다! 오늘 날씨는 [${dailyEvent.title}]이군. ${dailyEvent.cheolwoongGreeting}"`,
    choices: [
      {
        text: '오늘도 힘차게 라면을 끓여볼게요!',
        affinityDelta: 5,
        cheolwoongReply: '하하, 그 패기 좋다! 오늘도 가게를 불태워보자고!',
        replyMood: 'smile',
      },
      {
        text: '오늘 이벤트에 맞는 추천 라면이 있을까요?',
        affinityDelta: 4,
        cheolwoongReply: `${dailyEvent.buffDesc}! 손님들 주문 잘 보고 맞춰 끓여봐!`,
        replyMood: 'serious',
      },
      {
        text: '사장님 아침 식사는 드셨어요?',
        affinityDelta: 6,
        cheolwoongReply: '오, 날 챙겨주는 건 너밖에 없구나... 감동이다 임마!',
        replyMood: 'touched',
      },
    ],
  });

  const handleChoice = (choice: DialogueChoice) => {
    setDialogState({
      text: choice.cheolwoongReply,
      choices: [],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-linear-to-b from-amber-50 via-orange-50 to-amber-100 border-4 border-amber-500 rounded-3xl p-5 sm:p-7 shadow-2xl overflow-hidden">
        {/* Retro Header Strip */}
        <div className="flex items-center justify-between border-b-2 border-amber-300 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌅</span>
            <div>
              <span className="text-xs font-black text-amber-600 tracking-wide">
                DAY {day} · 출근 브리핑
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-amber-950 font-jua">
                연라면 아침 준비 시간
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-200/80 rounded-full border border-amber-400 text-xs font-bold text-amber-900">
            <span>❤️ 사장님 호감도 Lv.{affinityLevel}</span>
          </div>
        </div>

        {/* Daily Event Card */}
        <div className="bg-white/95 rounded-2xl p-4 border-2 border-amber-200 shadow-sm mb-5 flex items-center gap-4">
          <div className="w-14 h-14 shrink-0 rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-3xl shadow-inner">
            {dailyEvent.emoji}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 bg-amber-500 text-white text-xs font-black rounded-md">
                오늘의 환경 & 이벤트
              </span>
              <h3 className="font-jua text-lg text-amber-950">{dailyEvent.title}</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 mb-1">{dailyEvent.desc}</p>
            <p className="text-xs font-bold text-amber-700 bg-amber-50 p-1.5 rounded-lg border border-amber-200/60">
              💡 {dailyEvent.buffDesc}
            </p>
          </div>
        </div>

        {/* Cheol-woong Interactive Dialog */}
        <div className="mb-6">
          <CheolwoongDialogBox
            mood="normal"
            text={dialogState.text}
            choices={dialogState.choices}
            onSelectChoice={handleChoice}
          />
        </div>

        {/* Routine Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenMarket();
            }}
            className="py-3 px-4 rounded-2xl bg-linear-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-sm font-jua shadow-md hover:shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer border-2 border-white"
          >
            <span className="text-lg">🛒</span>
            <span>재료 장보기 (마트)</span>
          </button>

          <button
            onClick={() => {
              soundManager.playCheolwoongVoice();
              onOpenChat();
            }}
            className="py-3 px-4 rounded-2xl bg-linear-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-black text-sm font-jua shadow-md hover:shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer border-2 border-white"
          >
            <span className="text-lg">💬</span>
            <span>사장님과 수다</span>
          </button>

          <button
            onClick={() => {
              soundManager.playChime();
              onStartService();
            }}
            className="py-3 px-4 rounded-2xl bg-linear-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:to-red-600 text-white font-black text-sm font-jua shadow-lg hover:shadow-xl transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer border-2 border-white animate-pulse"
          >
            <span className="text-lg">🔥</span>
            <span>영업 개시하기!</span>
          </button>
        </div>
      </div>
    </div>
  );
};

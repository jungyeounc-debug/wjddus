/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PlayerProfile } from '../types/game';
import { soundManager } from '../utils/audio';

interface NewbieIntroModalProps {
  onComplete: (profile: PlayerProfile) => void;
}

export const NewbieIntroModal: React.FC<NewbieIntroModalProps> = ({ onComplete }) => {
  const [name, setName] = useState('신입 요리사');
  const [apronColor, setApronColor] = useState<PlayerProfile['apronColor']>('navy');
  const [hatType, setHatType] = useState<PlayerProfile['hatType']>('chef');

  const apronColors: { id: PlayerProfile['apronColor']; name: string; bg: string }[] = [
    { id: 'navy', name: '네이비', bg: 'bg-indigo-700' },
    { id: 'red', name: '레드', bg: 'bg-rose-600' },
    { id: 'yellow', name: '머스터드', bg: 'bg-amber-500' },
    { id: 'mint', name: '민트', bg: 'bg-emerald-500' },
    { id: 'pink', name: '베이비핑크', bg: 'bg-pink-400' },
    { id: 'black', name: '모던블랙', bg: 'bg-slate-800' },
  ];

  const hatOptions: { id: PlayerProfile['hatType']; name: string; emoji: string }[] = [
    { id: 'chef', name: '셰프 모자', emoji: '👨‍🍳' },
    { id: 'bandana', name: '열정 두건', emoji: '🧣' },
    { id: 'beanie', name: '귀여운 비니', emoji: '🧢' },
    { id: 'ribbon', name: '빨간 리본', emoji: '🎀' },
    { id: 'none', name: '단정한 머리', emoji: '✨' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playCheolwoongVoice();
    soundManager.playChime();
    const finalProfile: PlayerProfile = {
      name: name.trim() || '신입 요리사',
      title: '새싹 요리사',
      apronColor,
      hatType,
      level: 1,
      xp: 0,
      maxXp: 100,
    };
    onComplete(finalProfile);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-linear-to-b from-amber-50 to-orange-50 border-4 border-amber-500 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Retro 2000s Decorative Banner */}
        <div className="absolute top-0 inset-x-0 h-4 bg-linear-to-r from-red-500 via-amber-400 to-yellow-400" />

        <div className="text-center mb-5 mt-2">
          <span className="inline-block px-3 py-1 bg-amber-500 text-white text-xs font-black rounded-full mb-1 tracking-wider shadow">
            🍜 연라면 신입 입사 환영회 🍜
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-amber-950 font-jua">
            "네가 오늘부터 일할 신입이냐?!"
          </h2>
        </div>

        {/* Cheol-woong Greeting Box */}
        <div className="flex items-center gap-4 bg-white/90 border-2 border-amber-300 rounded-2xl p-4 shadow-sm mb-6">
          <div className="relative w-20 h-20 shrink-0 rounded-2xl overflow-hidden border-2 border-amber-500 bg-amber-100 shadow">
            <img
              src="/src/assets/images/cheolwoong_mascot_1793179767062.jpg"
              alt="철웅 사장님"
              className="w-full h-full object-cover object-top"
            />
            <span className="absolute bottom-0 inset-x-0 bg-amber-700 text-white text-[10px] font-bold text-center py-0.5">
              철웅 사장
            </span>
          </div>
          <div className="text-left text-sm text-amber-900 leading-relaxed font-medium">
            <p className="font-bold text-amber-950 mb-1">
              "반갑다! 난 이 연라면 사장 철웅이다."
            </p>
            <p className="text-xs sm:text-sm text-slate-700">
              손님들에게 세상에서 제일 맛있는 라면을 끓여주는 게 우리 철칙이지.
              먼저 네 이름과 유니폼부터 맞춰보자고!
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name input */}
          <div>
            <label className="block text-xs font-bold text-amber-900 mb-1">
              🏷️ 요리사 이름 (사장님이 불러줄 호칭)
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={10}
              placeholder="예: 꼬들이, 지은, 라면왕"
              className="w-full px-4 py-2.5 rounded-xl border-2 border-amber-300 bg-white text-amber-950 font-bold focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition"
              required
            />
          </div>

          {/* Apron Color */}
          <div>
            <label className="block text-xs font-bold text-amber-900 mb-1">
              🎽 앞치마 색상 고르기
            </label>
            <div className="grid grid-cols-6 gap-2">
              {apronColors.map((color) => (
                <button
                  type="button"
                  key={color.id}
                  onClick={() => {
                    soundManager.playClick();
                    setApronColor(color.id);
                  }}
                  className={`h-11 rounded-xl border-3 flex flex-col items-center justify-center transition-transform ${
                    color.bg
                  } ${
                    apronColor === color.id
                      ? 'border-white ring-4 ring-amber-400 scale-105 shadow-md'
                      : 'border-black/20 hover:scale-100 opacity-80'
                  }`}
                  title={color.name}
                >
                  {apronColor === color.id && <span className="text-white text-xs font-black">✓</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Hat Type */}
          <div>
            <label className="block text-xs font-bold text-amber-900 mb-1">
              👒 주방 모자 스타일
            </label>
            <div className="grid grid-cols-5 gap-2">
              {hatOptions.map((hat) => (
                <button
                  type="button"
                  key={hat.id}
                  onClick={() => {
                    soundManager.playClick();
                    setHatType(hat.id);
                  }}
                  className={`py-2 px-1 rounded-xl border-2 flex flex-col items-center justify-center gap-1 transition ${
                    hatType === hat.id
                      ? 'border-amber-500 bg-amber-200 shadow font-bold text-amber-950 scale-105'
                      : 'border-amber-200 bg-white/80 hover:bg-amber-50 text-slate-700'
                  }`}
                >
                  <span className="text-xl">{hat.emoji}</span>
                  <span className="text-[11px] font-medium">{hat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-4 py-3.5 px-6 rounded-2xl bg-linear-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:to-red-600 text-white font-black text-lg font-jua shadow-lg hover:shadow-xl transition-all active:scale-95 border-2 border-white flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>어서 와! 연라면 첫 출근하기</span>
            <span>🍜🔥</span>
          </button>
        </form>
      </div>
    </div>
  );
};

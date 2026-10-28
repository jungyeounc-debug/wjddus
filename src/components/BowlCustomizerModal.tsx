/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  BowlColor,
  BowlCustomization,
  BowlPattern,
  BowlShape,
  ChopsticksType,
  TrayColor,
} from '../types/game';
import { soundManager } from '../utils/audio';
import {
  BOWL_COLORS,
  BOWL_PATTERNS,
  BOWL_SHAPES,
  CHOPSTICKS_LIST,
  TRAY_COLORS,
} from '../utils/gameData';
import { GameStorage } from '../utils/storage';
import { RamenBowlVisual } from './RamenBowlVisual';
import { Sparkles, Utensils, X, Check } from 'lucide-react';

interface BowlCustomizerModalProps {
  currentBowl: BowlCustomization;
  onSaveBowl: (bowl: BowlCustomization) => void;
  onClose: () => void;
}

export const BowlCustomizerModal: React.FC<BowlCustomizerModalProps> = ({
  currentBowl,
  onSaveBowl,
  onClose,
}) => {
  const [bowl, setBowl] = useState<BowlCustomization>({ ...currentBowl });
  const [activeTab, setActiveTab] = useState<'shape' | 'color' | 'pattern' | 'utensils'>('shape');

  const handleSave = () => {
    soundManager.playChime();
    onSaveBowl(bowl);
    GameStorage.setBowlConfig(bowl);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl bg-linear-to-b from-amber-50 via-orange-50 to-amber-100 border-4 border-amber-500 rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-amber-300 pb-3 mb-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md text-xl">
              🥣
            </div>
            <div>
              <span className="text-[11px] font-bold text-amber-700">연라면 시그니처 세팅</span>
              <h2 className="text-xl sm:text-2xl font-black text-amber-950 font-jua">
                나만의 라면 그릇 공방
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-amber-200 hover:bg-amber-300 text-amber-900 flex items-center justify-center font-bold transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Split: Left Preview, Right Selectors */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4 overflow-hidden min-h-0">
          {/* Left Preview Box */}
          <div className="md:col-span-5 bg-white/90 rounded-2xl p-4 border-2 border-amber-300 shadow-sm flex flex-col items-center justify-center">
            <span className="text-xs font-black text-amber-800 mb-2 px-3 py-1 bg-amber-100 rounded-full border border-amber-300">
              ✨ 완성된 그릇 미리보기
            </span>

            <div className="my-auto py-2 flex flex-col items-center">
              <RamenBowlVisual
                ramenCategory="soup"
                waterLevel="normal"
                broth="spicy"
                noodle="firm"
                toppings={['egg', 'green_onion', 'cheese']}
                bowlConfig={bowl}
                size="md"
                showSteam={false}
              />

              {/* Cutlery & Tray Preview Badge */}
              <div className="mt-4 flex items-center gap-3 text-xs font-bold text-slate-700 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
                <span>🥢 {CHOPSTICKS_LIST.find((c) => c.id === bowl.chopsticks)?.name}</span>
                <span>·</span>
                <span>🪵 {TRAY_COLORS.find((t) => t.id === bowl.tray)?.name}</span>
              </div>
            </div>
          </div>

          {/* Right Customization Controls */}
          <div className="md:col-span-7 flex flex-col overflow-hidden bg-white/80 rounded-2xl p-3 sm:p-4 border-2 border-amber-200 shadow-sm">
            {/* Tabs */}
            <div className="flex items-center gap-1.5 pb-2 border-b border-amber-200 shrink-0">
              {[
                { id: 'shape', label: '그릇 모양 🥣' },
                { id: 'color', label: '그릇 색상 🎨' },
                { id: 'pattern', label: '무늬 장식 ✨' },
                { id: 'utensils', label: '수저 & 쟁반 🥢' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    soundManager.playClick();
                    setActiveTab(tab.id as any);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-amber-500 text-white shadow'
                      : 'bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Panes */}
            <div className="flex-1 overflow-y-auto py-3 space-y-2 pr-1">
              {activeTab === 'shape' && (
                <div className="grid grid-cols-2 gap-2">
                  {BOWL_SHAPES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        soundManager.playClick();
                        setBowl((prev) => ({ ...prev, shape: s.id }));
                      }}
                      className={`p-3 rounded-xl border-2 text-left transition flex items-center gap-2.5 cursor-pointer ${
                        bowl.shape === s.id
                          ? 'border-amber-500 bg-amber-100/90 shadow'
                          : 'border-slate-200 hover:border-amber-300 bg-white'
                      }`}
                    >
                      <span className="text-2xl">{s.emoji}</span>
                      <div>
                        <h4 className="font-jua text-sm text-amber-950">{s.name}</h4>
                        <p className="text-[10px] text-slate-500">{s.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {activeTab === 'color' && (
                <div className="grid grid-cols-4 gap-2">
                  {BOWL_COLORS.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        soundManager.playClick();
                        setBowl((prev) => ({ ...prev, color: c.id }));
                      }}
                      className={`p-2.5 rounded-xl border-2 flex flex-col items-center justify-center gap-1.5 transition cursor-pointer ${
                        bowl.color === c.id
                          ? 'border-amber-500 bg-amber-100/80 shadow ring-2 ring-amber-300'
                          : 'border-slate-200 hover:border-amber-300 bg-white'
                      }`}
                    >
                      <div
                        className="w-8 h-8 rounded-full border-2 border-slate-300 shadow-inner"
                        style={{ backgroundColor: c.bgHex }}
                      />
                      <span className="text-xs font-bold text-slate-800">{c.name}</span>
                    </button>
                  ))}
                </div>
              )}

              {activeTab === 'pattern' && (
                <div className="grid grid-cols-2 gap-2">
                  {BOWL_PATTERNS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        soundManager.playClick();
                        setBowl((prev) => ({ ...prev, pattern: p.id }));
                      }}
                      className={`p-2.5 rounded-xl border-2 text-left flex items-center gap-2 transition cursor-pointer ${
                        bowl.pattern === p.id
                          ? 'border-amber-500 bg-amber-100/90 shadow'
                          : 'border-slate-200 hover:border-amber-300 bg-white'
                      }`}
                    >
                      <span className="text-xl">✨</span>
                      <div>
                        <h4 className="font-jua text-xs text-amber-950">{p.name}</h4>
                        <p className="text-[10px] text-slate-500">{p.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {activeTab === 'utensils' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-amber-900 mb-1.5">
                      🥢 젓가락 선택
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {CHOPSTICKS_LIST.map((chop) => (
                        <button
                          key={chop.id}
                          onClick={() => {
                            soundManager.playClick();
                            setBowl((prev) => ({ ...prev, chopsticks: chop.id }));
                          }}
                          className={`p-2.5 rounded-xl border-2 text-left flex items-center gap-2 cursor-pointer ${
                            bowl.chopsticks === chop.id
                              ? 'border-amber-500 bg-amber-100 shadow'
                              : 'border-slate-200 hover:border-amber-300 bg-white'
                          }`}
                        >
                          <span className="text-xl">{chop.emoji}</span>
                          <div>
                            <span className="font-jua text-xs text-amber-950 block">
                              {chop.name}
                            </span>
                            <span className="text-[10px] text-slate-500">{chop.desc}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-amber-900 mb-1.5">
                      🪵 받침 쟁반(트레이) 선택
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {TRAY_COLORS.map((tray) => (
                        <button
                          key={tray.id}
                          onClick={() => {
                            soundManager.playClick();
                            setBowl((prev) => ({ ...prev, tray: tray.id }));
                          }}
                          className={`p-2.5 rounded-xl border-2 text-center cursor-pointer ${
                            bowl.tray === tray.id
                              ? 'border-amber-500 bg-amber-100 shadow'
                              : 'border-slate-200 hover:border-amber-300 bg-white'
                          }`}
                        >
                          <span className="font-jua text-xs text-amber-950 block">
                            {tray.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t-2 border-amber-300 flex items-center justify-between shrink-0">
          <p className="text-xs text-amber-800 font-medium">
            💡 손님 중 일부는 예쁜 그릇에 라면을 주면 추가 팁을 줍니다!
          </p>
          <button
            onClick={handleSave}
            className="py-2.5 px-6 rounded-2xl bg-linear-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-black text-sm font-jua shadow-md transition active:scale-95 cursor-pointer border-2 border-white flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>이 그릇으로 확정하기</span>
          </button>
        </div>
      </div>
    </div>
  );
};

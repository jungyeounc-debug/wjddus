/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GameSettings } from '../types/game';
import { soundManager } from '../utils/audio';
import { GameStorage } from '../utils/storage';
import { Settings, Volume2, VolumeX, RotateCcw, X, Check } from 'lucide-react';

interface SettingsModalProps {
  settings: GameSettings;
  onSaveSettings: (settings: GameSettings) => void;
  onResetAllData: () => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  settings,
  onSaveSettings,
  onResetAllData,
  onClose,
}) => {
  const [localSettings, setLocalSettings] = useState<GameSettings>({ ...settings });
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleSave = () => {
    soundManager.playChime();
    onSaveSettings(localSettings);
    GameStorage.setSettings(localSettings);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-linear-to-b from-amber-50 via-orange-50 to-amber-100 border-4 border-amber-500 rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-amber-300 pb-3 mb-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-amber-700">환경 설정 & 편의 기능</span>
              <h2 className="text-xl sm:text-2xl font-black text-amber-950 font-jua">
                연라면 게임 옵션
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

        {/* Settings Body */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {/* Audio Sliders */}
          <div className="bg-white/90 rounded-2xl p-4 border border-amber-200 shadow-xs space-y-3">
            <h4 className="font-jua text-sm text-amber-950 flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 text-amber-600" />
              <span>사운드 볼륨</span>
            </h4>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>배경음악 (BGM)</span>
                <span>{localSettings.bgmVolume}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={localSettings.bgmVolume}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setLocalSettings((s) => ({ ...s, bgmVolume: val }));
                  soundManager.setBgmVolume(val);
                }}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>효과음 (SFX)</span>
                <span>{localSettings.sfxVolume}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={localSettings.sfxVolume}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setLocalSettings((s) => ({ ...s, sfxVolume: val }));
                  soundManager.setSfxVolume(val);
                }}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Difficulty & Time */}
          <div className="bg-white/90 rounded-2xl p-4 border border-amber-200 shadow-xs space-y-3">
            <h4 className="font-jua text-sm text-amber-950">영업 시간 & 난이도</h4>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  하루 영업 제한시간
                </label>
                <div className="grid grid-cols-4 gap-1">
                  {[60, 90, 120, 180].map((sec) => (
                    <button
                      key={sec}
                      type="button"
                      onClick={() => setLocalSettings((s) => ({ ...s, serviceDuration: sec as any }))}
                      className={`py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                        localSettings.serviceDuration === sec
                          ? 'bg-amber-500 text-white shadow'
                          : 'bg-slate-100 hover:bg-amber-50 text-slate-700'
                      }`}
                    >
                      {sec}초
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">게임 난이도</label>
                <div className="grid grid-cols-3 gap-1">
                  {[
                    { id: 'easy', label: '순한맛' },
                    { id: 'normal', label: '보통' },
                    { id: 'hard', label: '매운맛' },
                  ].map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setLocalSettings((s) => ({ ...s, difficulty: d.id as any }))}
                      className={`py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                        localSettings.difficulty === d.id
                          ? 'bg-amber-500 text-white shadow'
                          : 'bg-slate-100 hover:bg-amber-50 text-slate-700'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Typewriter Speed & Theme */}
          <div className="bg-white/90 rounded-2xl p-4 border border-amber-200 shadow-xs space-y-3">
            <h4 className="font-jua text-sm text-amber-950">대화 및 화면 테마</h4>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">대화 속도</label>
                <div className="grid grid-cols-4 gap-1">
                  {[
                    { id: 'slow', label: '느림' },
                    { id: 'normal', label: '보통' },
                    { id: 'fast', label: '빠름' },
                    { id: 'instant', label: '즉시' },
                  ].map((sp) => (
                    <button
                      key={sp.id}
                      type="button"
                      onClick={() => setLocalSettings((s) => ({ ...s, dialogSpeed: sp.id as any }))}
                      className={`py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                        localSettings.dialogSpeed === sp.id
                          ? 'bg-amber-500 text-white shadow'
                          : 'bg-slate-100 hover:bg-amber-50 text-slate-700'
                      }`}
                    >
                      {sp.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">가게 테마</label>
                <div className="grid grid-cols-4 gap-1">
                  {[
                    { id: 'day', label: '낮 ☀️' },
                    { id: 'night', label: '밤 🌙' },
                    { id: 'cherry', label: '봄 🌸' },
                    { id: 'snow', label: '눈 ❄️' },
                  ].map((th) => (
                    <button
                      key={th.id}
                      type="button"
                      onClick={() => setLocalSettings((s) => ({ ...s, theme: th.id as any }))}
                      className={`py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                        localSettings.theme === th.id
                          ? 'bg-amber-500 text-white shadow'
                          : 'bg-slate-100 hover:bg-amber-50 text-slate-700'
                      }`}
                    >
                      {th.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Reset progress area */}
          <div className="pt-2">
            {!showResetConfirm ? (
              <button
                type="button"
                onClick={() => setShowResetConfirm(true)}
                className="text-xs text-rose-600 hover:text-rose-800 font-bold flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>데이터 초기화 (처음부터 다시 시작)</span>
              </button>
            ) : (
              <div className="p-3 bg-rose-50 border border-rose-300 rounded-xl flex items-center justify-between">
                <span className="text-xs text-rose-800 font-bold">
                  정말 모든 진행 상황을 초기화하시겠습니까?
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      soundManager.playMistake();
                      onResetAllData();
                      setShowResetConfirm(false);
                      onClose();
                    }}
                    className="px-3 py-1 bg-rose-600 text-white rounded-lg text-xs font-bold hover:bg-rose-700"
                  >
                    초기화 확인
                  </button>
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="px-3 py-1 bg-slate-200 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-300"
                  >
                    취소
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t-2 border-amber-300 flex justify-end shrink-0">
          <button
            onClick={handleSave}
            className="py-2 px-6 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-sm font-jua shadow transition active:scale-95 cursor-pointer flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>설정 저장하기</span>
          </button>
        </div>
      </div>
    </div>
  );
};

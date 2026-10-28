/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Achievement } from '../types/game';
import { soundManager } from '../utils/audio';
import { GameStorage } from '../utils/storage';
import { Award, Coins, Sparkles, X, CheckCircle2 } from 'lucide-react';

interface AchievementsModalProps {
  achievements: Achievement[];
  coins: number;
  onUpdateCoins: (coins: number) => void;
  onUpdateAchievements: (achievements: Achievement[]) => void;
  onClose: () => void;
}

export const AchievementsModal: React.FC<AchievementsModalProps> = ({
  achievements,
  coins,
  onUpdateCoins,
  onUpdateAchievements,
  onClose,
}) => {
  const handleClaimReward = (ach: Achievement) => {
    if (!ach.unlocked) return;
    soundManager.playCoin();
    soundManager.playFanfare();

    const newCoins = coins + ach.rewardCoins;
    const updated = achievements.map((a) =>
      a.id === ach.id ? { ...a, rewardCoins: 0 } : a
    );

    onUpdateCoins(newCoins);
    onUpdateAchievements(updated);
    GameStorage.setCoins(newCoins);
    GameStorage.setAchievements(updated);
  };

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl bg-linear-to-b from-amber-50 via-orange-50 to-amber-100 border-4 border-amber-500 rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-amber-300 pb-3 mb-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-amber-700">장인 요리사 명예의 전당</span>
              <h2 className="text-xl sm:text-2xl font-black text-amber-950 font-jua">
                연라면 도전 과제 ({unlockedCount}/{achievements.length})
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-200/90 border border-amber-400 rounded-full font-bold text-amber-950 text-xs">
              <Coins className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
              <span>{coins} 코인</span>
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
        </div>

        {/* Achievement List */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
          {achievements.map((ach) => {
            const canClaim = ach.unlocked && ach.rewardCoins > 0;
            const isClaimed = ach.unlocked && ach.rewardCoins === 0;

            return (
              <div
                key={ach.id}
                className={`p-3.5 rounded-2xl border-2 transition flex items-center justify-between gap-3 ${
                  ach.unlocked
                    ? 'bg-white/95 border-amber-300 shadow-xs'
                    : 'bg-slate-100/70 border-slate-200 opacity-65'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl border-2 shadow-xs shrink-0 ${
                      ach.unlocked
                        ? 'bg-amber-100 border-amber-400'
                        : 'bg-slate-200 border-slate-300 grayscale'
                    }`}
                  >
                    {ach.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-jua text-base text-amber-950">{ach.title}</h4>
                      {ach.unlocked && (
                        <span className="px-2 py-0.2 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
                          달성!
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">{ach.desc}</p>
                  </div>
                </div>

                <div className="shrink-0">
                  {canClaim ? (
                    <button
                      onClick={() => handleClaimReward(ach)}
                      className="py-1.5 px-3.5 rounded-xl bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs shadow-md transition active:scale-95 flex items-center gap-1 cursor-pointer animate-pulse"
                    >
                      <Coins className="w-3.5 h-3.5 fill-white" />
                      <span>{ach.rewardCoins} 받기</span>
                    </button>
                  ) : isClaimed ? (
                    <div className="flex items-center gap-1 text-xs font-bold text-slate-400">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>수령 완료</span>
                    </div>
                  ) : (
                    <div className="text-right">
                      <span className="text-[11px] font-bold text-slate-400 block">보상</span>
                      <span className="text-xs font-bold text-amber-700">
                        {ach.rewardCoins} 코인
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t-2 border-amber-300 flex justify-end shrink-0">
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="py-2 px-5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs font-jua shadow transition active:scale-95 cursor-pointer"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

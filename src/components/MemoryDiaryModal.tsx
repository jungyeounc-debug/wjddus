/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CheolwoongAffinity, DiaryStory } from '../types/game';
import { soundManager } from '../utils/audio';
import { CHEOLWOONG_DIARY_STORIES } from '../utils/gameData';
import { BookOpen, Heart, Lock, Sparkles, X, ChevronRight } from 'lucide-react';

interface MemoryDiaryModalProps {
  affinity: CheolwoongAffinity;
  onClose: () => void;
}

export const MemoryDiaryModal: React.FC<MemoryDiaryModalProps> = ({ affinity, onClose }) => {
  const [selectedStory, setSelectedStory] = useState<DiaryStory>(() => {
    return CHEOLWOONG_DIARY_STORIES[0];
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl bg-linear-to-b from-amber-50 via-orange-50 to-amber-100 border-4 border-amber-500 rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-amber-300 pb-3 mb-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-amber-700">철웅 사장님과의 인연 기록</span>
              <h2 className="text-xl sm:text-2xl font-black text-amber-950 font-jua">
                연라면 추억 수첩 📖
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-pink-100 border border-pink-300 rounded-full text-xs font-bold text-pink-700 shadow-xs">
              <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
              <span>
                친밀도 Lv.{affinity.level} ({affinity.points}/{affinity.maxPoints})
              </span>
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

        {/* Two-pane Layout (Left: Story List, Right: Story Viewer) */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 overflow-hidden min-h-0">
          {/* Story List Pane */}
          <div className="md:col-span-1 overflow-y-auto space-y-2 pr-1 border-r md:border-amber-200">
            {CHEOLWOONG_DIARY_STORIES.map((story) => {
              const isUnlocked = affinity.level >= story.unlockedAtAffinityLevel;
              const isSelected = selectedStory.id === story.id;

              return (
                <button
                  key={story.id}
                  disabled={!isUnlocked}
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedStory(story);
                  }}
                  className={`w-full p-3 rounded-2xl text-left transition flex items-center justify-between border-2 cursor-pointer ${
                    isSelected && isUnlocked
                      ? 'bg-amber-500 text-white border-amber-600 shadow-md scale-102'
                      : isUnlocked
                      ? 'bg-white hover:bg-amber-100 text-amber-950 border-amber-200 shadow-xs'
                      : 'bg-slate-200/60 text-slate-400 border-slate-300 cursor-not-allowed opacity-75'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">
                      {isUnlocked ? (isSelected ? '📖' : '📜') : '🔒'}
                    </span>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                          isSelected && isUnlocked ? 'bg-amber-700 text-white' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {story.id}장
                        </span>
                        <span className="text-xs font-semibold">
                          {isUnlocked ? `친밀도 Lv.${story.unlockedAtAffinityLevel}` : `Lv.${story.unlockedAtAffinityLevel} 해금`}
                        </span>
                      </div>
                      <h4 className="font-jua text-sm leading-snug mt-0.5">
                        {isUnlocked ? story.title : '비밀 이야기'}
                      </h4>
                    </div>
                  </div>
                  {isUnlocked && <ChevronRight className="w-4 h-4 opacity-70" />}
                </button>
              );
            })}
          </div>

          {/* Story Content Reader Pane */}
          <div className="md:col-span-2 bg-white/95 rounded-2xl p-5 border-2 border-amber-300 shadow-sm flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center gap-2 mb-2 pb-2 border-b border-amber-100">
                <span className="text-2xl">🍜</span>
                <div>
                  <span className="text-xs font-bold text-amber-700">제 {selectedStory.id}장</span>
                  <h3 className="font-jua text-xl text-amber-950">{selectedStory.title}</h3>
                </div>
              </div>

              {/* Story summary & body */}
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 mb-4 text-xs font-medium text-amber-900 leading-relaxed">
                📌 <strong>기록 요약:</strong> {selectedStory.summary}
              </div>

              <div className="text-sm text-slate-700 leading-relaxed font-normal whitespace-pre-line space-y-3">
                {selectedStory.fullStory}
              </div>
            </div>

            {selectedStory.specialRewardName && (
              <div className="mt-4 pt-3 border-t border-amber-200 flex items-center justify-between bg-amber-100/50 p-3 rounded-xl">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span className="text-xs font-bold text-amber-950">
                    인연 특별 보상: {selectedStory.specialRewardName}
                  </span>
                </div>
                <span className="text-xs font-bold text-emerald-600">✓ 획득 완료</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t-2 border-amber-300 flex items-center justify-between shrink-0">
          <p className="text-xs text-amber-800 font-medium">
            💡 사장님께 간식을 선물하거나 완벽한 라면을 대접하면 친밀도가 쑥쑥 올라갑니다!
          </p>
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="py-2 px-5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs font-jua shadow transition active:scale-95 cursor-pointer"
          >
            수첩 덮기
          </button>
        </div>
      </div>
    </div>
  );
};

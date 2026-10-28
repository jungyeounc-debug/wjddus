/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { soundManager } from '../utils/audio';
import { Coins, Star, Users, ArrowRight, Store, TrendingUp, Receipt } from 'lucide-react';

interface DaySummaryModalProps {
  day: number;
  isOpen: boolean;
  earnedCoins: number;
  servedCount: number;
  perfectCount: number;
  leftCount: number;
  ingredientCost?: number;
  onNextDay: () => void;
  onOpenShop: () => void;
}

export const DaySummaryModal: React.FC<DaySummaryModalProps> = ({
  day,
  isOpen,
  earnedCoins,
  servedCount,
  perfectCount,
  leftCount,
  ingredientCost = Math.round(earnedCoins * 0.25),
  onNextDay,
  onOpenShop,
}) => {
  if (!isOpen) return null;

  const netProfit = Math.max(0, earnedCoins - ingredientCost);

  // Cheol-woong comment based on performance
  let comment = '오늘도 연라면을 찾아주신 모든 분들 덕분에 행복했어! 내일도 파이팅하자!';
  if (perfectCount >= 3) {
    comment = '우와아! 오늘 손님들 만족도가 최고였어! 이 기세로 동네 최고 맛집이 되자구!';
  } else if (leftCount > servedCount) {
    comment = '아이고, 오늘은 손님이 좀 기다리다 가셨네... 내일은 손을 더 빠르게 놀려보자!';
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm select-none animate-fade-in">
      <div className="relative max-w-lg w-full bg-linear-to-b from-amber-50 to-orange-50 rounded-3xl p-5 sm:p-7 shadow-2xl border-4 border-amber-400 flex flex-col items-center text-center">
        {/* Confetti icon / trophy */}
        <div className="w-16 h-16 rounded-2xl bg-amber-200 border-2 border-amber-400 flex items-center justify-center text-3xl shadow-md mb-2">
          🎉
        </div>

        <h2 className="font-jua text-2xl sm:text-3xl text-amber-950 mb-1">
          {day}일차 영업 마감 정산표
        </h2>
        <p className="text-xs sm:text-sm text-amber-800 mb-4">
          오늘 하루도 수고 많으셨습니다! 철웅 사장님과의 정산 내역입니다.
        </p>

        {/* Financial Breakdown Table */}
        <div className="w-full bg-white/95 rounded-2xl p-4 border-2 border-amber-200 shadow-sm mb-4 text-left">
          <div className="flex items-center gap-1.5 pb-2 border-b border-amber-100 text-xs font-bold text-amber-900 mb-2.5">
            <Receipt className="w-4 h-4 text-amber-600" />
            <span>오늘의 손익 계산서</span>
          </div>

          <div className="space-y-1.5 text-xs sm:text-sm">
            <div className="flex justify-between items-center text-slate-700">
              <span>총 매출액 (판매 코인)</span>
              <span className="font-bold text-amber-900 tabular-nums">+{earnedCoins} G</span>
            </div>
            <div className="flex justify-between items-center text-slate-500">
              <span>식자재 소모 원가</span>
              <span className="font-bold text-rose-600 tabular-nums">-{ingredientCost} G</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-amber-200 text-sm font-extrabold text-emerald-800">
              <span className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span>오늘의 순이익</span>
              </span>
              <span className="text-base tabular-nums font-jua">+{netProfit} G</span>
            </div>
          </div>
        </div>

        {/* Performance Stats Grid */}
        <div className="w-full grid grid-cols-3 gap-2 mb-4">
          <div className="bg-white/90 rounded-xl p-2.5 border border-amber-200 shadow-2xs flex flex-col items-center">
            <Users className="w-4 h-4 text-blue-600 mb-0.5" />
            <span className="text-[10px] text-slate-500 font-medium">대접한 손님</span>
            <span className="font-jua text-base text-blue-900 tabular-nums">{servedCount}명</span>
          </div>

          <div className="bg-white/90 rounded-xl p-2.5 border border-amber-200 shadow-2xs flex flex-col items-center">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-400 mb-0.5" />
            <span className="text-[10px] text-slate-500 font-medium">5성 만점</span>
            <span className="font-jua text-base text-yellow-700 tabular-nums">{perfectCount}그릇</span>
          </div>

          <div className="bg-white/90 rounded-xl p-2.5 border border-amber-200 shadow-2xs flex flex-col items-center">
            <span className="text-base mb-0.5">😤</span>
            <span className="text-[10px] text-slate-500 font-medium">놓친 손님</span>
            <span className="font-jua text-base text-rose-600 tabular-nums">{leftCount}명</span>
          </div>
        </div>

        {/* Cheol-woong comment bubble */}
        <div className="w-full bg-white/95 border-2 border-amber-200 rounded-2xl p-3 mb-5 text-left flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden border border-amber-400 shrink-0">
            <img
              src="/src/assets/images/cheolwoong_mascot_1793179767062.jpg"
              alt="철웅 사장님"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div>
            <div className="font-jua text-xs text-amber-900">철웅 사장님의 마감 한마디</div>
            <p className="text-xs text-slate-700 mt-0.5 leading-relaxed font-medium">
              "{comment}"
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex gap-3">
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenShop();
            }}
            className="flex-1 py-3 bg-white hover:bg-amber-100 text-amber-900 font-jua rounded-2xl text-xs sm:text-sm border-2 border-amber-300 shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Store className="w-4 h-4 text-amber-600" />
            <span>식자재 마트</span>
          </button>

          <button
            onClick={() => {
              soundManager.playChime();
              onNextDay();
            }}
            className="flex-1 py-3 bg-linear-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:to-red-600 text-white font-jua rounded-2xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer border-2 border-white"
          >
            <span>{day + 1}일차 출근하기</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

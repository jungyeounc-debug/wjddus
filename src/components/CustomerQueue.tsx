/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Customer } from '../types/game';
import { BROTH_LIST, formatOrderToSpeech, getChefHint, TOPPING_LIST } from '../utils/gameData';
import { ToppingVisual } from './ToppingVisual';
import { Lightbulb, ChevronDown, ChevronUp, Crown, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface CustomerQueueProps {
  customer: Customer | null;
  onCustomerTimeout?: () => void;
}

export const CustomerQueue: React.FC<CustomerQueueProps> = ({ customer }) => {
  const [showHint, setShowHint] = useState<boolean>(false);

  if (!customer) {
    return (
      <div className="bg-amber-100/60 border-2 border-dashed border-amber-300 rounded-3xl p-5 text-center text-amber-900 font-jua text-sm animate-pulse">
        다음 손님이 문을 열고 들어오기를 기다리는 중입니다... 🚪🍜
      </div>
    );
  }

  const category = customer.order.category || customer.order.ramenCategory || 'soup';
  const isStir = category === 'stir';
  const isBibim = category === 'bibim';
  const isJjajang = category === 'jjajang';

  const categoryBadge = {
    soup: { text: '🍜 국물라면', bg: 'bg-red-500' },
    stir: { text: '🥢 볶음라면', bg: 'bg-orange-500' },
    bibim: { text: '❄️ 비빔라면', bg: 'bg-sky-500' },
    jjajang: { text: '🧅 짜장라면', bg: 'bg-stone-700' },
  }[category];

  const patiencePercent = Math.max(0, Math.min(100, (customer.currentPatience / customer.maxPatience) * 100));
  const brothObj = BROTH_LIST.find((b) => b.id === customer.order.broth);

  const waterLabelMap = {
    less: isStir || isJjajang ? '바짝 졸이기 (적게)' : '물 적게 (진하게)',
    normal: isStir || isJjajang ? '자작한 8스푼 (보통)' : '물 보통 (알맞게)',
    more: isStir || isJjajang ? '촉촉하게 (많이)' : '물 많이 (삼삼하게)',
  };

  const doneness = customer.order.noodleDoneness || customer.order.noodle || 'firm';
  const noodleLabelMap = { firm: '면 꼬들꼬들', normal: '면 보통 탱글', soft: '면 푹 퍼짐' };

  const noodleTypeNames: Record<string, string> = {
    basic: '기본면',
    chewy: '쫄깃면',
    thin: '얇은면',
    flat: '넓적면',
    udon: '우동면',
  };
  const noodleTypeName = noodleTypeNames[customer.order.noodleType || 'basic'] || '기본면';

  const patienceColor =
    patiencePercent > 50 ? 'bg-emerald-500' : patiencePercent > 25 ? 'bg-amber-500' : 'bg-red-500 animate-pulse';

  const toggleHint = () => {
    soundManager.playClick();
    setShowHint((prev) => !prev);
  };

  return (
    <div
      className={`relative bg-white/95 backdrop-blur-md border-3 rounded-3xl p-3.5 sm:p-4 shadow-md transition-all ${
        customer.isCritic
          ? 'border-amber-400 bg-amber-50/50 ring-3 ring-amber-300/60'
          : customer.isVipRegular
          ? 'border-purple-400 bg-purple-50/40 ring-2 ring-purple-300/50'
          : 'border-amber-300'
      }`}
    >
      {/* Top right badges: Critic badge + Hint button */}
      <div className="flex items-center gap-2 absolute -top-3.5 right-4 z-10">
        {customer.isCritic && (
          <div className="bg-linear-to-r from-amber-500 to-yellow-400 text-white font-jua text-xs px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1 border border-white">
            <Crown className="w-3.5 h-3.5 fill-white text-white" />
            <span>라면 평론가 (만점시 3배!)</span>
          </div>
        )}

        {customer.isVipRegular && (
          <div className="bg-purple-600 text-white font-jua text-xs px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1 border border-white">
            <Sparkles className="w-3.5 h-3.5" />
            <span>골목 VIP 단골손님</span>
          </div>
        )}

        <button
          onClick={toggleHint}
          className="bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-jua text-xs px-3 py-1 rounded-full shadow-md flex items-center gap-1 border border-amber-300 transition-transform cursor-pointer"
        >
          <Lightbulb className="w-3.5 h-3.5 text-yellow-200 animate-pulse" />
          <span>사장님 힌트</span>
          {showHint ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Top row: Customer Avatar + Name & Patience Bar */}
      <div className="flex items-center gap-3 mb-2.5">
        <div className="relative w-12 h-12 rounded-2xl bg-amber-100 border-2 border-amber-400 flex items-center justify-center text-3xl shadow-xs shrink-0">
          {customer.emoji}
          {patiencePercent <= 25 && (
            <span className="absolute -top-1 -right-1 text-sm animate-bounce">💢</span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 truncate">
              <span className="font-jua text-base sm:text-lg text-slate-900 truncate">
                {customer.name}
              </span>
              <span
                className={`text-[11px] font-jua px-2 py-0.5 rounded-full text-white shadow-xs ${categoryBadge.bg}`}
              >
                {categoryBadge.text}
              </span>
            </div>

            <span className="text-xs font-bold tabular-nums text-slate-600 shrink-0">
              인내심 {Math.ceil(customer.currentPatience)}초
            </span>
          </div>

          {/* Patience progress bar */}
          <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden mt-1 p-0.5 border border-slate-300">
            <div
              className={`h-full rounded-full transition-all duration-300 ${patienceColor}`}
              style={{ width: `${patiencePercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Chef Golden Recipe Hint Box (when opened) */}
      {showHint && (
        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-3 text-xs text-yellow-950 font-medium mb-3 shadow-inner animate-fade-in flex items-start gap-2">
          <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="font-jua text-amber-900 text-xs mb-0.5">
              ⭐ 만점(5성) 받는 철웅 사장님의 황금 레시피 힌트
            </div>
            <p className="leading-relaxed">{getChefHint(customer)}</p>
          </div>
        </div>
      )}

      {/* Spoken Order Bubble */}
      <div className="bg-amber-50/90 border border-amber-300 rounded-2xl p-2.5 sm:p-3 text-xs sm:text-sm text-slate-800 leading-relaxed mb-3">
        <p className="font-medium text-amber-950 mb-0.5">
          "{formatOrderToSpeech(customer.order)}"
        </p>
      </div>

      {/* Structured Order Checklist for quick gameplay reading */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 border-t border-amber-200">
        <div className="bg-white rounded-xl p-2 border border-slate-200 shadow-2xs">
          <div className="text-[10px] text-slate-500 font-bold">1. 종류 & 물 양</div>
          <div className="text-xs font-bold text-blue-700 truncate">
            {waterLabelMap[customer.order.waterLevel]}
          </div>
        </div>

        <div className="bg-white rounded-xl p-2 border border-slate-200 shadow-2xs">
          <div className="text-[10px] text-slate-500 font-bold">2. 수프 / 맵기</div>
          <div className="text-xs font-bold text-red-600 truncate">
            {brothObj?.emoji} {brothObj?.name || '기본'} · 🌶️ {customer.order.spicyLevel || 1}단계
          </div>
        </div>

        <div className="bg-white rounded-xl p-2 border border-slate-200 shadow-2xs">
          <div className="text-[10px] text-slate-500 font-bold">3. 면발 종류 & 익힘</div>
          <div className="text-xs font-bold text-amber-800 truncate">
            {noodleTypeName} · {noodleLabelMap[doneness]}
          </div>
        </div>

        <div className="bg-white rounded-xl p-2 border border-slate-200 shadow-2xs">
          <div className="text-[10px] text-slate-500 font-bold">4. 토핑 & 사이드</div>
          <div className="text-xs font-bold text-emerald-700 truncate flex items-center gap-1">
            {customer.order.toppings.length === 0 ? (
              <span className="text-slate-400">토핑 없음</span>
            ) : (
              customer.order.toppings.map((tid) => {
                const def = TOPPING_LIST.find((t) => t.id === tid);
                return (
                  <span key={tid} title={def?.name} className="inline-flex items-center">
                    <ToppingVisual id={tid} size="xs" />
                  </span>
                );
              })
            )}
            {customer.order.sideDish && customer.order.sideDish !== 'none' && (
              <span className="text-blue-600 text-[10px] font-bold">
                · {customer.order.sideDish === 'danmuji' ? '단무지' : customer.order.sideDish === 'kimchi' ? '김치' : customer.order.sideDish === 'rice' ? '밥' : '음료'}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

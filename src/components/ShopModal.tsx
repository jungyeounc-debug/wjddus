/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BOWL_SKINS, BROTH_LIST, SHOP_DECORS, TOPPING_LIST } from '../utils/ramenData';
import { soundManager } from '../utils/audio';
import { ToppingVisual } from './ToppingVisual';
import { X, Check, ShoppingBag, Coins } from 'lucide-react';

interface ShopModalProps {
  coins: number;
  unlockedBroths: string[];
  unlockedToppings: string[];
  unlockedBowls: string[];
  activeBowl: string;
  ownedDecors: string[];
  isOpen: boolean;
  onClose: () => void;
  onBuyBroth: (id: string, price: number) => void;
  onBuyTopping: (id: string, price: number) => void;
  onBuyBowl: (id: string, price: number) => void;
  onSelectBowl: (id: string) => void;
  onBuyDecor: (id: string, price: number) => void;
}

export const ShopModal: React.FC<ShopModalProps> = ({
  coins,
  unlockedBroths,
  unlockedToppings,
  unlockedBowls,
  activeBowl,
  ownedDecors,
  isOpen,
  onClose,
  onBuyBroth,
  onBuyTopping,
  onBuyBowl,
  onSelectBowl,
  onBuyDecor,
}) => {
  const [activeTab, setActiveTab] = useState<'broth' | 'topping' | 'bowl' | 'decor'>('broth');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs select-none">
      <div className="relative max-w-2xl w-full bg-amber-50 rounded-3xl p-5 sm:p-6 shadow-2xl border-4 border-amber-300 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-amber-200">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏪</span>
            <div>
              <h2 className="font-jua text-xl sm:text-2xl text-amber-950">
                연라면 재료 & 인테리어 상점
              </h2>
              <p className="text-xs text-amber-700">
                코인으로 새 국물, 프리미엄 토핑, 예쁜 그릇과 인테리어를 해금하세요!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-amber-100 px-3 py-1.5 rounded-full border border-amber-300">
              <Coins className="w-4 h-4 text-amber-600" />
              <span className="font-jua text-amber-900 tabular-nums text-sm">
                {coins} G
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-amber-200 rounded-full text-amber-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1.5 my-3 bg-amber-100/70 p-1.5 rounded-2xl border border-amber-200">
          {[
            { id: 'broth', label: '🍲 새 국물 수프' },
            { id: 'topping', label: '🥓 프리미엄 토핑' },
            { id: 'bowl', label: '🥣 라면 그릇' },
            { id: 'decor', label: '✨ 가게 인테리어' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                soundManager.playClick();
                setActiveTab(tab.id as 'broth' | 'topping' | 'bowl' | 'decor');
              }}
              className={`flex-1 py-1.5 rounded-xl font-jua text-xs transition-all ${
                activeTab === tab.id
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-amber-900 hover:bg-amber-200/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content List */}
        <div className="flex-1 overflow-y-auto pr-1">
          {/* 1. BROTHS */}
          {activeTab === 'broth' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-1">
              {BROTH_LIST.map((b) => {
                const isUnlocked = b.unlockedByDefault || unlockedBroths.includes(b.id);
                const canAfford = coins >= b.price;

                return (
                  <div
                    key={b.id}
                    className="bg-white rounded-2xl p-3.5 border-2 border-amber-200 flex items-center justify-between gap-3 shadow-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{b.emoji}</span>
                      <div>
                        <div className="font-jua text-slate-900 text-sm flex items-center gap-1">
                          <span>{b.name} 국물</span>
                          {isUnlocked && (
                            <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.2 rounded-full font-sans font-bold">
                              보유중
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-500">{b.flavorText}</div>
                      </div>
                    </div>

                    {!isUnlocked ? (
                      <button
                        onClick={() => {
                          if (canAfford) {
                            soundManager.playCoin();
                            onBuyBroth(b.id, b.price);
                          } else {
                            soundManager.playMistake();
                          }
                        }}
                        disabled={!canAfford}
                        className={`px-3 py-1.5 rounded-xl font-jua text-xs shrink-0 transition-all ${
                          canAfford
                            ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-sm'
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        {b.price} G 구매
                      </button>
                    ) : (
                      <span className="text-xs text-emerald-600 font-bold shrink-0 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> 사용가능
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* 2. TOPPINGS */}
          {activeTab === 'topping' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-1">
              {TOPPING_LIST.map((t) => {
                const isUnlocked = t.unlockedByDefault || unlockedToppings.includes(t.id);
                const canAfford = coins >= t.price;

                return (
                  <div
                    key={t.id}
                    className="bg-white rounded-2xl p-3.5 border-2 border-amber-200 flex items-center justify-between gap-3 shadow-xs"
                  >
                    <div className="flex items-center gap-3">
                      <ToppingVisual id={t.id} size="md" className="shrink-0" />
                      <div>
                        <div className="font-jua text-slate-900 text-sm flex items-center gap-1">
                          <span>{t.name}</span>
                          {isUnlocked && (
                            <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.2 rounded-full font-sans font-bold">
                              보유중
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-500">
                          {t.category === 'basic' ? '기본 제공 토핑' : '프리미엄 인기 토핑'}
                        </div>
                      </div>
                    </div>

                    {!isUnlocked ? (
                      <button
                        onClick={() => {
                          if (canAfford) {
                            soundManager.playCoin();
                            onBuyTopping(t.id, t.price);
                          } else {
                            soundManager.playMistake();
                          }
                        }}
                        disabled={!canAfford}
                        className={`px-3 py-1.5 rounded-xl font-jua text-xs shrink-0 transition-all ${
                          canAfford
                            ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-sm'
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        {t.price} G 구매
                      </button>
                    ) : (
                      <span className="text-xs text-emerald-600 font-bold shrink-0 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> 사용가능
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* 3. BOWLS */}
          {activeTab === 'bowl' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-1">
              {BOWL_SKINS.map((bowl) => {
                const isUnlocked = unlockedBowls.includes(bowl.id);
                const isSelected = activeBowl === bowl.id;
                const canAfford = coins >= bowl.price;

                return (
                  <div
                    key={bowl.id}
                    className={`bg-white rounded-2xl p-3.5 border-2 flex items-center justify-between gap-3 shadow-xs transition-all ${
                      isSelected ? 'border-amber-600 bg-amber-50/70' : 'border-amber-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{bowl.emoji}</span>
                      <div>
                        <div className="font-jua text-slate-900 text-sm flex items-center gap-1">
                          <span>{bowl.name}</span>
                        </div>
                        <div className="text-xs text-slate-500">
                          {isSelected ? '현재 장착 중' : isUnlocked ? '보유중' : `${bowl.price} G`}
                        </div>
                      </div>
                    </div>

                    {!isUnlocked ? (
                      <button
                        onClick={() => {
                          if (canAfford) {
                            soundManager.playCoin();
                            onBuyBowl(bowl.id, bowl.price);
                          } else {
                            soundManager.playMistake();
                          }
                        }}
                        disabled={!canAfford}
                        className={`px-3 py-1.5 rounded-xl font-jua text-xs shrink-0 transition-all ${
                          canAfford
                            ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-sm'
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        {bowl.price} G 구매
                      </button>
                    ) : isSelected ? (
                      <span className="text-xs bg-amber-600 text-white font-jua px-2.5 py-1 rounded-lg">
                        장착중 ✨
                      </span>
                    ) : (
                      <button
                        onClick={() => {
                          soundManager.playClick();
                          onSelectBowl(bowl.id);
                        }}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-amber-100 text-slate-800 font-jua rounded-xl text-xs"
                      >
                        장착하기
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* 4. DECORS & BUFFS */}
          {activeTab === 'decor' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-1">
              {SHOP_DECORS.map((dec) => {
                const isOwned = ownedDecors.includes(dec.id);
                const canAfford = coins >= dec.price;

                return (
                  <div
                    key={dec.id}
                    className="bg-white rounded-2xl p-3.5 border-2 border-amber-200 flex items-center justify-between gap-3 shadow-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{dec.emoji}</span>
                      <div>
                        <div className="font-jua text-slate-900 text-sm flex items-center gap-1">
                          <span>{dec.name}</span>
                          <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded-full font-bold">
                            {dec.bonus}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500">{dec.description}</div>
                      </div>
                    </div>

                    {!isOwned ? (
                      <button
                        onClick={() => {
                          if (canAfford) {
                            soundManager.playCoin();
                            onBuyDecor(dec.id, dec.price);
                          } else {
                            soundManager.playMistake();
                          }
                        }}
                        disabled={!canAfford}
                        className={`px-3 py-1.5 rounded-xl font-jua text-xs shrink-0 transition-all ${
                          canAfford
                            ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-sm'
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        {dec.price} G 구매
                      </button>
                    ) : (
                      <span className="text-xs text-emerald-600 font-bold shrink-0 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> 효과 적용중
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-amber-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-jua rounded-xl text-xs sm:text-sm shadow-sm transition-colors"
          >
            상점 나가기
          </button>
        </div>
      </div>
    </div>
  );
};

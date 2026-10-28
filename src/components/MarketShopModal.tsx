/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MarketItem } from '../types/game';
import { soundManager } from '../utils/audio';
import { BASE_MARKET_ITEMS } from '../utils/gameData';
import { GameStorage } from '../utils/storage';
import { Coins, ShoppingBag, Flame, Sparkles, X, Plus, Check } from 'lucide-react';

interface MarketShopModalProps {
  coins: number;
  inventory: Record<string, number>;
  stoveCount: number;
  onUpdateCoins: (newCoins: number) => void;
  onUpdateInventory: (newInv: Record<string, number>) => void;
  onUpdateStoveCount: (count: number) => void;
  onClose: () => void;
}

export const MarketShopModal: React.FC<MarketShopModalProps> = ({
  coins,
  inventory,
  stoveCount,
  onUpdateCoins,
  onUpdateInventory,
  onUpdateStoveCount,
  onClose,
}) => {
  const [tab, setTab] = useState<'all' | 'noodle' | 'topping' | 'side' | 'snack' | 'equipment'>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2000);
  };

  const filteredItems = BASE_MARKET_ITEMS.filter((item) => {
    if (tab === 'all') return true;
    return item.category === tab;
  });

  const handleBuyItem = (item: MarketItem) => {
    if (coins < item.currentPrice) {
      soundManager.playMistake();
      showToast('코인이 부족합니다!');
      return;
    }

    soundManager.playCoin();
    const newCoins = coins - item.currentPrice;
    const currentQty = inventory[item.id] || 0;
    const newInv = {
      ...inventory,
      [item.id]: currentQty + item.stockUnit,
    };

    onUpdateCoins(newCoins);
    onUpdateInventory(newInv);
    GameStorage.setCoins(newCoins);
    GameStorage.setInventory(newInv);
    showToast(`${item.name} ${item.stockUnit}개 구매 완료!`);
  };

  const handleUpgradeStove = () => {
    const nextStove = stoveCount + 1;
    const cost = nextStove === 2 ? 300 : 800;

    if (stoveCount >= 3) {
      showToast('이미 최대 화구(3구)를 보유 중입니다!');
      return;
    }

    if (coins < cost) {
      soundManager.playMistake();
      showToast(`화구 확장에 ${cost}코인이 필요합니다!`);
      return;
    }

    soundManager.playChime();
    const newCoins = coins - cost;
    onUpdateCoins(newCoins);
    onUpdateStoveCount(nextStove);
    GameStorage.setCoins(newCoins);
    GameStorage.setStoveCount(nextStove);
    showToast(`화구가 ${nextStove}구로 확장되었습니다! 동시에 여러 라면을 끓일 수 있어요!`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl bg-linear-to-b from-amber-50 via-orange-50 to-amber-100 border-4 border-amber-500 rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-amber-300 pb-3 mb-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-amber-700">전통시장 식자재 마트</span>
              <h2 className="text-xl sm:text-2xl font-black text-amber-950 font-jua">
                연라면 아침 장보기
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-200/90 border border-amber-400 rounded-full font-bold text-amber-950 text-sm shadow-xs">
              <Coins className="w-4 h-4 text-amber-600 fill-amber-500" />
              <span>{coins} 코인</span>
            </div>
            <button
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="w-9 h-9 rounded-full bg-amber-200 hover:bg-amber-300 text-amber-900 flex items-center justify-center font-bold transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toast Alert */}
        {toastMessage && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30 px-4 py-2 bg-amber-900 text-amber-100 font-bold text-xs rounded-full shadow-lg border border-amber-400 animate-bounce">
            {toastMessage}
          </div>
        )}

        {/* Tab Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 shrink-0 border-b border-amber-200">
          {[
            { id: 'all', label: '전체' },
            { id: 'noodle', label: '면사리' },
            { id: 'topping', label: '토핑' },
            { id: 'side', label: '곁들임' },
            { id: 'snack', label: '사장님 간식🎁' },
            { id: 'equipment', label: '주방 설비🔥' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                soundManager.playClick();
                setTab(item.id as any);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer ${
                tab === item.id
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'bg-white/80 hover:bg-amber-100 text-amber-950 border border-amber-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto py-3 space-y-3 pr-1">
          {tab === 'equipment' ? (
            /* Kitchen Equipment Section (Multi-stove upgrade) */
            <div className="space-y-4">
              <div className="bg-white/95 rounded-2xl p-5 border-2 border-amber-300 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-orange-100 border-2 border-orange-400 flex items-center justify-center text-3xl shadow-inner">
                    🍳
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-jua text-lg sm:text-xl text-amber-950">
                        주방 화구 확장 (현재 {stoveCount}구)
                      </h3>
                      <span className="px-2 py-0.5 bg-orange-500 text-white text-[11px] font-bold rounded-full">
                        효율 UP!
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700">
                      화구가 늘어나면 동시에 2그릇, 3그릇의 라면을 한꺼번에 끓일 수 있어 손님 회전율이 비약적으로 증가합니다!
                    </p>
                  </div>
                </div>

                <div className="shrink-0">
                  {stoveCount >= 3 ? (
                    <div className="px-5 py-2.5 bg-emerald-100 border border-emerald-400 text-emerald-800 font-bold rounded-2xl flex items-center gap-2">
                      <Check className="w-5 h-5 text-emerald-600" />
                      <span>최고 등급 완료 (3구)</span>
                    </div>
                  ) : (
                    <button
                      onClick={handleUpgradeStove}
                      className="py-3 px-6 rounded-2xl bg-linear-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-black text-sm font-jua shadow-md transition active:scale-95 cursor-pointer border-2 border-white flex items-center gap-2"
                    >
                      <Flame className="w-4 h-4" />
                      <span>{stoveCount + 1}구 확장 ({stoveCount === 1 ? '300코인' : '800코인'})</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Decorative Guide */}
              <div className="bg-amber-100/70 rounded-2xl p-4 border border-amber-300 text-xs text-amber-900 leading-relaxed">
                💡 <strong>철웅 사장님의 조언:</strong> "손님이 몰리는 점심 피크타임엔 2구나 3구 화구가 필수지! 물을 미리 올려두고 면을 차례로 넣으면 콤보가 쭉쭉 터진다구!"
              </div>
            </div>
          ) : (
            /* Items Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {filteredItems.map((item) => {
                const currentStock = inventory[item.id] || 0;
                return (
                  <div
                    key={item.id}
                    className="bg-white/95 rounded-2xl p-3.5 border-2 border-amber-200 hover:border-amber-400 shadow-sm transition flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2.5">
                          <span className="text-3xl">{item.emoji}</span>
                          <div>
                            <h4 className="font-jua text-base text-amber-950 leading-tight">
                              {item.name}
                            </h4>
                            <span className="text-[11px] text-amber-700 font-medium">
                              {item.stockUnit}개 단위
                            </span>
                          </div>
                        </div>

                        {/* Current owned quantity badge */}
                        <div className="text-right">
                          <span className="text-[10px] text-slate-500 font-bold block">보유 수량</span>
                          <span className="font-extrabold text-amber-900 text-sm">
                            {currentStock}개
                          </span>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-600 line-clamp-2 mb-3">
                        {item.desc}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-amber-100">
                      <div className="flex items-center gap-1 font-black text-amber-900 text-sm">
                        <Coins className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                        <span>{item.currentPrice}</span>
                      </div>

                      <button
                        onClick={() => handleBuyItem(item)}
                        className="py-1.5 px-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs hover:shadow transition active:scale-95 flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                        <span>구매</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t-2 border-amber-300 flex items-center justify-between shrink-0">
          <p className="text-xs text-amber-800 font-medium">
            💡 재료를 넉넉히 사두면 영업 중 품절 걱정 없이 손님을 맞이할 수 있어요!
          </p>
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="py-2.5 px-6 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-black text-sm font-jua shadow transition active:scale-95 cursor-pointer"
          >
            장보기 완료
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PhotoCard } from '../types/game';
import { RamenBowlVisual } from './RamenBowlVisual';
import { PhotoCardModal } from './PhotoCardModal';
import { soundManager } from '../utils/audio';
import { X, Trash2, Camera, Star } from 'lucide-react';

interface AlbumModalProps {
  cards: PhotoCard[];
  isOpen: boolean;
  onClose: () => void;
  onDeleteCard: (id: string) => void;
  onSelectCard?: (card: PhotoCard) => void;
}

export const AlbumModal: React.FC<AlbumModalProps> = ({
  cards,
  isOpen,
  onClose,
  onDeleteCard,
  onSelectCard,
}) => {
  const [filter, setFilter] = useState<'all' | 'order' | 'custom'>('all');
  const [selectedCard, setSelectedCard] = useState<PhotoCard | null>(null);

  if (!isOpen) return null;

  const filteredCards = cards.filter((c) => {
    if (filter === 'all') return true;
    return c.mode === filter;
  });

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    soundManager.playClick();
    if (confirm('이 사진 카드를 앨범에서 삭제하시겠습니까?')) {
      onDeleteCard(id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs select-none">
      <div className="relative max-w-3xl w-full bg-amber-50 rounded-3xl p-5 sm:p-6 shadow-2xl border-4 border-amber-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-amber-200">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📸</span>
            <div>
              <h2 className="font-jua text-xl sm:text-2xl text-amber-950">
                연라면 사진 앨범
              </h2>
              <p className="text-xs text-amber-700">
                총 {cards.length}장의 추억이 보관되어 있습니다.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-amber-200 rounded-full text-amber-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 my-3">
          {[
            { id: 'all', label: '전체 보기' },
            { id: 'order', label: '손님 주문 라면' },
            { id: 'custom', label: '나만의 라면' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                soundManager.playClick();
                setFilter(tab.id as 'all' | 'order' | 'custom');
              }}
              className={`px-3 py-1.5 rounded-xl font-jua text-xs transition-all ${
                filter === tab.id
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-white text-amber-900 hover:bg-amber-100 border border-amber-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="flex-1 overflow-y-auto pr-1">
          {filteredCards.length === 0 ? (
            <div className="py-16 text-center text-slate-400 flex flex-col items-center gap-2">
              <Camera className="w-12 h-12 stroke-[1.5] text-amber-300" />
              <p className="font-jua text-base text-amber-800">
                아직 저장된 라면 사진 카드가 없어요!
              </p>
              <p className="text-xs text-slate-500">
                라면을 완성하고 '📸 찰칵!' 버튼을 눌러 카드를 모아보세요.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 p-1">
              {filteredCards.map((card) => (
                <div
                  key={card.id}
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedCard(card);
                  }}
                  className="bg-white rounded-2xl p-3 border-2 border-amber-200 shadow-sm hover:shadow-md hover:scale-102 transition-all cursor-pointer flex flex-col items-center group relative"
                >
                  {/* Delete button */}
                  <button
                    onClick={(e) => handleDelete(e, card.id)}
                    title="카드 삭제"
                    className="absolute top-2 right-2 p-1.5 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  {/* Ramen visual thumbnail */}
                  <div className="w-full aspect-square bg-amber-50 rounded-xl flex items-center justify-center p-2 mb-2 border border-amber-100">
                    <RamenBowlVisual
                      ramenCategory={card.ramen.ramenCategory}
                      waterLevel={card.ramen.waterLevel}
                      broth={card.ramen.broth}
                      noodle={card.ramen.noodle}
                      toppings={card.ramen.toppings}
                      bowlSkinId={card.ramen.bowlSkinId}
                      size="sm"
                      showSteam={false}
                    />
                  </div>

                  {/* Card Title */}
                  <h4 className="font-jua text-xs sm:text-sm text-slate-900 text-center truncate w-full">
                    {card.title}
                  </h4>

                  {/* Rating or custom badge */}
                  <div className="flex items-center gap-1 mt-1">
                    {card.rating ? (
                      <div className="flex items-center text-[10px] text-amber-500">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="font-bold ml-0.5">{card.rating.stars}점</span>
                      </div>
                    ) : (
                      <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded-full">
                        나만의 레시피
                      </span>
                    )}
                    <span className="text-[10px] text-slate-400">· {card.createdAt}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-amber-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-jua rounded-xl text-xs sm:text-sm shadow-sm transition-colors"
          >
            닫기
          </button>
        </div>
      </div>

      {/* Selected Card Polaroid Detail Modal */}
      {selectedCard && (
        <PhotoCardModal
          card={selectedCard}
          isOpen={true}
          onClose={() => setSelectedCard(null)}
        />
      )}
    </div>
  );
};

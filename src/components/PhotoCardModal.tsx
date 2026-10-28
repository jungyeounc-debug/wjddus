/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { PhotoCard } from '../types/game';
import { RamenBowlVisual } from './RamenBowlVisual';
import { BROTH_LIST, TOPPING_LIST } from '../utils/ramenData';
import { ToppingVisual } from './ToppingVisual';
import { soundManager } from '../utils/audio';
import { Download, Camera, Check, X, Star } from 'lucide-react';

interface PhotoCardModalProps {
  card: PhotoCard;
  isOpen: boolean;
  onClose: () => void;
  onFlashCompleted?: () => void;
}

export const PhotoCardModal: React.FC<PhotoCardModalProps> = ({
  card,
  isOpen,
  onClose,
}) => {
  const [hasFlashed, setHasFlashed] = useState<boolean>(true);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const isStir = card.ramen.ramenCategory === 'stir';
  const brothObj = BROTH_LIST.find((b) => b.id === card.ramen.broth);
  const noodleKey = card.ramen.noodle || card.ramen.noodleDoneness || 'normal';
  const noodleLabel = { firm: '꼬들꼬들', normal: '적당히 탱글', soft: '부드럽게 푹' }[noodleKey];
  const waterKey = card.ramen.waterLevel || 'normal';
  const waterLabel = isStir
    ? { less: '바짝 졸이기', normal: '자작한 8스푼', more: '촉촉하게' }[waterKey]
    : { less: '진하게 적게', normal: '알맞게 적당히', more: '시원하게 넉넉히' }[waterKey];

  const toppingNames = card.ramen.toppings.map((tid) => {
    const t = TOPPING_LIST.find((x) => x.id === tid);
    return t ? `${t.emoji} ${t.name}` : tid;
  });

  // Re-take photo or re-trigger flash
  const handleSnapFlash = () => {
    soundManager.playCameraShutter();
    setHasFlashed(false);
    setTimeout(() => {
      setHasFlashed(true);
    }, 100);
  };

  // High quality Canvas PNG generator for downloading the Polaroid card
  const handleDownloadImage = () => {
    soundManager.playClick();
    const canvas = document.createElement('canvas');
    const width = 640;
    const height = 860;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw polaroid card background
    ctx.fillStyle = '#FFFFFF';
    ctx.roundRect(20, 20, width - 40, height - 40, 24);
    ctx.fill();

    // Subtle polaroid shadow
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Inner photo area background (warm soft pastel)
    ctx.fillStyle = '#FEF3C7';
    ctx.roundRect(40, 90, width - 80, 420, 16);
    ctx.fill();

    // Title: 연라면 · 오늘의 라면
    ctx.fillStyle = '#B45309';
    ctx.font = 'bold 26px "Jua", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('연라면 · 오늘의 라면', width / 2, 65);

    // Ramen Name
    ctx.fillStyle = '#1E293B';
    ctx.font = 'bold 28px "Jua", sans-serif';
    ctx.fillText(card.title, width / 2, 545);

    // Rating Stars
    if (card.rating) {
      const starStr = '★'.repeat(card.rating.stars) + '☆'.repeat(5 - card.rating.stars);
      ctx.fillStyle = '#F59E0B';
      ctx.font = '24px sans-serif';
      ctx.fillText(starStr, width / 2, 580);
    }

    // Customer or chef quote
    ctx.fillStyle = '#475569';
    ctx.font = 'italic 17px "Noto Sans KR", sans-serif';
    const quote = card.customerComment || card.cheolwoongComment;
    ctx.fillText(`"${quote}"`, width / 2, 615);

    // Ingredients info box
    ctx.fillStyle = '#F8FAFC';
    ctx.roundRect(45, 640, width - 90, 100, 12);
    ctx.fill();
    ctx.strokeStyle = '#CBD5E1';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = '#334155';
    ctx.font = '14px "Noto Sans KR", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`• 국물: ${brothObj?.name || '기본'} (${waterLabel})`, 60, 670);
    ctx.fillText(`• 면 익힘: ${noodleLabel}`, 60, 695);
    ctx.fillText(
      `• 토핑: ${toppingNames.length > 0 ? toppingNames.join(', ') : '기본 (토핑 없음)'}`,
      60,
      720
    );

    // Bottom signatures: Cheolwoong + Date
    ctx.fillStyle = '#B45309';
    ctx.font = 'bold 18px "Gaegu", cursive';
    ctx.textAlign = 'right';
    ctx.fillText('철웅 사장님 ✍️  연라면', width - 60, 785);

    ctx.fillStyle = '#94A3B8';
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(card.createdAt, 60, 785);

    // Draw visual placeholder / stamp inside the photo area
    ctx.fillStyle = brothObj?.color || '#DC2626';
    ctx.beginPath();
    ctx.arc(width / 2, 300, 130, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#D97706';
    ctx.lineWidth = 12;
    ctx.stroke();

    // Food emoji stamp
    ctx.font = '72px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🍜', width / 2, 325);

    // Convert to download link
    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `연라면_오늘의라면_${Date.now()}.png`;
    a.click();

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  const handleClose = () => {
    soundManager.playClick();
    onClose();
  };

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-xs select-none overflow-y-auto"
    >
      {/* Camera Flash Overlay */}
      {!hasFlashed && (
        <div className="fixed inset-0 bg-white z-50 pointer-events-none animate-flash" />
      )}

      {/* Modal Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-md w-full my-auto bg-transparent flex flex-col items-center"
      >
        {/* Top Header Bar with prominent close button */}
        <div className="w-full flex items-center justify-between mb-2 px-1">
          <span className="text-white/80 font-jua text-xs flex items-center gap-1">
            <span>📸</span>
            <span>오늘의 라면 사진 카드</span>
          </span>

          <button
            onClick={handleClose}
            className="px-3 py-1.5 bg-white/20 hover:bg-white/40 active:scale-95 text-white rounded-full text-xs font-jua transition-all flex items-center gap-1.5 shadow-md border border-white/40 cursor-pointer"
            title="닫기"
          >
            <X className="w-4 h-4" />
            <span>닫기 (X)</span>
          </button>
        </div>

        {/* Polaroid Card */}
        <div
          ref={cardRef}
          className="relative w-full bg-white rounded-3xl p-5 sm:p-6 shadow-2xl border-4 border-amber-100 flex flex-col items-center rotate-[-0.5deg] transition-transform hover:rotate-0"
        >
          {/* Card Top Inner Header with In-Card Close Button */}
          <div className="w-full flex items-center justify-between pb-3 border-b border-dashed border-amber-200">
            <span className="font-jua text-amber-700 text-sm tracking-wide">
              연라면 · 오늘의 라면 📸
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-slate-400">
                {card.createdAt}
              </span>
              <button
                onClick={handleClose}
                className="p-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 transition-colors cursor-pointer"
                title="카드 닫기"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Photo Frame with Ramen Visual */}
          <div className="w-full my-3 sm:my-4 bg-linear-to-b from-amber-50 to-orange-50 rounded-2xl p-3 sm:p-4 border border-amber-200 shadow-inner flex flex-col items-center justify-center min-h-[200px] sm:min-h-[220px]">
            <RamenBowlVisual
              ramenCategory={card.ramen.ramenCategory}
              waterLevel={card.ramen.waterLevel}
              broth={card.ramen.broth}
              noodle={card.ramen.noodle}
              toppings={card.ramen.toppings}
              bowlSkinId={card.ramen.bowlSkinId}
              size="md"
              showSteam={false}
            />
          </div>

          {/* Ramen Title */}
          <h2 className="font-jua text-xl sm:text-2xl text-slate-900 text-center mb-1">
            {card.title}
          </h2>

          {/* Star Rating if order mode */}
          {card.rating && (
            <div className="flex items-center gap-1 my-1">
              {[1, 2, 3, 4, 5].map((st) => (
                <Star
                  key={st}
                  className={`w-5 h-5 ${
                    st <= card.rating!.stars
                      ? 'text-amber-400 fill-amber-400'
                      : 'text-slate-200'
                  }`}
                />
              ))}
              <span className="font-jua text-sm text-amber-900 ml-1">
                ({card.rating.stars}점)
              </span>
            </div>
          )}

          {/* Customer or Cheolwoong review line */}
          <div className="w-full bg-amber-50/70 rounded-xl p-2.5 my-2 text-center border border-amber-200/80">
            <p className="text-xs text-slate-700 italic font-medium">
              "{card.customerComment || card.cheolwoongComment}"
            </p>
            {card.customerName && (
              <span className="text-[11px] text-amber-700 block mt-0.5">
                — {card.customerName}
              </span>
            )}
          </div>

          {/* Ingredients Breakdown */}
          <div className="w-full text-left text-xs text-slate-600 space-y-1 my-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-700">종류:</span>
              <span className="font-jua text-amber-800">
                {isStir ? '🥢 볶음면 (짜파게티/불닭 등)' : '🍜 뜨끈한 국물라면'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-700">{isStir ? '볶음 소스:' : '국물 수프:'}</span>
              <span>
                {brothObj?.name || '기본'} ({waterLabel})
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-700">면발:</span>
              <span>{noodleLabel}</span>
            </div>
            <div className="flex items-start justify-between gap-2 pt-1 border-t border-slate-200">
              <span className="font-bold text-slate-700 shrink-0">토핑:</span>
              <div className="flex items-center gap-1.5 flex-wrap justify-end">
                {card.ramen.toppings.length === 0 ? (
                  <span className="text-slate-400">기본 (토핑 없음)</span>
                ) : (
                  card.ramen.toppings.map((tid, i) => {
                    const def = TOPPING_LIST.find((x) => x.id === tid);
                    return (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 bg-white px-1.5 py-0.5 rounded-lg border border-amber-200 text-[11px] font-medium text-slate-700 shadow-2xs"
                      >
                        <ToppingVisual id={tid} size="xs" />
                        <span>{def?.name}</span>
                      </span>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Cheol-woong signature stamp */}
          <div className="w-full flex items-center justify-between pt-2 border-t border-amber-100 mt-1">
            <span className="text-[11px] text-slate-400">
              연라면 앨범 등록 완료 ✨
            </span>
            <div className="font-gaegu text-lg text-amber-800 font-bold flex items-center gap-1">
              <span>철웅 사장님</span>
              <span className="text-xs bg-red-100 text-red-600 px-1 rounded-sm border border-red-300">
                인증
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons Below Card */}
        <div className="w-full flex flex-col gap-2.5 mt-3.5">
          <div className="w-full flex gap-2">
            <button
              onClick={handleSnapFlash}
              className="flex-1 py-2.5 bg-white/95 hover:bg-white text-slate-800 font-jua rounded-2xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-1.5 border border-amber-200 active:scale-98 cursor-pointer"
            >
              <Camera className="w-4 h-4 text-amber-600" />
              <span>📸 플래시 찰칵!</span>
            </button>

            <button
              onClick={handleDownloadImage}
              className="flex-1 py-2.5 bg-amber-600 hover:bg-amber-700 active:scale-98 text-white font-jua rounded-2xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>저장 완료!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>카드 이미지 저장</span>
                </>
              )}
            </button>
          </div>

          {/* Prominent Large Close Button */}
          <button
            onClick={handleClose}
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 active:scale-98 text-white font-jua rounded-2xl text-sm sm:text-base shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer border-2 border-slate-700"
          >
            <X className="w-5 h-5 text-amber-300" />
            <span>카드 닫기 (가게로 돌아가기)</span>
          </button>
        </div>
      </div>
    </div>
  );
};

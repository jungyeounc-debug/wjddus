/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { PhotoCard } from '../types/game';
import { soundManager } from '../utils/audio';
import {
  renderPhotoCardToCanvas,
  downloadCanvasAsPNG,
  compressCanvasForAlbum,
} from '../utils/photoCardCanvas';
import { GameStorage } from '../utils/storage';
import { Download, Camera, Check, X, Smartphone, Sparkles } from 'lucide-react';

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
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isRendering, setIsRendering] = useState<boolean>(true);
  const [showMobileSaveSheet, setShowMobileSaveSheet] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Render card to Canvas 2D and set preview
  const generateCard = useCallback(async () => {
    setIsRendering(true);
    try {
      const canvas = await renderPhotoCardToCanvas(card);
      canvasRef.current = canvas;
      const pngUrl = canvas.toDataURL('image/png');
      setPreviewUrl(pngUrl);

      // Save compressed JPEG (quality 0.8) to album storage if not already saved
      const jpegUrl = compressCanvasForAlbum(canvas);
      if (!card.imageDataUrl) {
        card.imageDataUrl = jpegUrl;
        GameStorage.saveAlbumCard(card);
      }
    } catch (err) {
      console.error('Failed to render photo card to canvas:', err);
    } finally {
      setIsRendering(false);
    }
  }, [card]);

  useEffect(() => {
    if (isOpen) {
      generateCard();
    }
  }, [isOpen, generateCard]);

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

  // Re-take photo or re-trigger flash
  const handleSnapFlash = () => {
    soundManager.playCameraShutter();
    setHasFlashed(false);
    setTimeout(() => {
      setHasFlashed(true);
    }, 150);
  };

  // High quality Canvas PNG download
  const handleDownloadImage = async () => {
    soundManager.playClick();
    if (!canvasRef.current) return;

    try {
      const success = await downloadCanvasAsPNG(canvasRef.current, card.title);
      if (success) {
        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 2500);
      } else {
        // Fallback for mobile / iOS where direct blob download is restricted
        setShowMobileSaveSheet(true);
      }
    } catch {
      setShowMobileSaveSheet(true);
    }
  };

  const handleClose = () => {
    soundManager.playClick();
    onClose();
  };

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm select-none overflow-y-auto"
    >
      {/* Camera Flash Overlay */}
      {!hasFlashed && (
        <div className="fixed inset-0 bg-white z-50 pointer-events-none animate-flash" />
      )}

      {/* Modal Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-lg w-full my-auto flex flex-col items-center"
      >
        {/* Top Header Bar with prominent close button */}
        <div className="w-full flex items-center justify-between mb-2 px-1">
          <span className="text-white/90 font-jua text-sm flex items-center gap-1.5 drop-shadow">
            <span>📸</span>
            <span>연라면 오늘의 라면 사진 카드</span>
            <span className="text-amber-300 text-xs font-normal">
              (1080×1350 Canvas HD)
            </span>
          </span>

          <button
            onClick={handleClose}
            className="px-3.5 py-1.5 bg-white/20 hover:bg-white/40 active:scale-95 text-white rounded-full text-xs font-jua transition-all flex items-center gap-1.5 shadow-md border border-white/40 cursor-pointer"
            title="닫기"
          >
            <X className="w-4 h-4" />
            <span>닫기 (X)</span>
          </button>
        </div>

        {/* 100% Identical Canvas Card Preview */}
        <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-300/80 bg-amber-50 flex flex-col items-center justify-center min-h-[460px] sm:min-h-[520px]">
          {isRendering || !previewUrl ? (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-4" />
              <p className="font-jua text-base text-amber-900">
                오늘의 라면 카드를 현상하는 중... 📸
              </p>
              <p className="text-xs text-amber-700 mt-1">
                그릇, 국물, 면발, 토핑을 캔버스에 직접 정성껏 그리고 있어요!
              </p>
            </div>
          ) : (
            <div className="relative w-full p-2 flex flex-col items-center">
              {/* Display exact canvas rendered image */}
              <img
                src={previewUrl}
                alt="오늘의 라면 사진 카드"
                className="w-full h-auto rounded-2xl shadow-md object-contain max-h-[70vh]"
              />

              {/* Verified Badge Overlay */}
              <div className="absolute top-4 right-4 bg-amber-900/85 text-amber-200 text-[11px] font-jua px-2.5 py-1 rounded-full shadow backdrop-blur-xs border border-amber-400/50 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>1080×1350 PNG 원본 일치</span>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons Below Card */}
        <div className="w-full flex flex-col gap-2 mt-3">
          <div className="w-full flex gap-2">
            <button
              onClick={handleSnapFlash}
              className="flex-1 py-3 bg-white/95 hover:bg-white text-slate-800 font-jua rounded-2xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-1.5 border border-amber-200 active:scale-98 cursor-pointer"
            >
              <Camera className="w-4 h-4 text-amber-600" />
              <span>📸 플래시 찰칵!</span>
            </button>

            <button
              onClick={handleDownloadImage}
              disabled={isRendering}
              className="flex-1 py-3 bg-amber-600 hover:bg-amber-700 active:scale-98 disabled:opacity-50 text-white font-jua rounded-2xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-amber-500"
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>PNG 저장 완료!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>이미지로 저장 (PNG)</span>
                </>
              )}
            </button>

            {/* Mobile / iOS quick long-press viewer */}
            <button
              onClick={() => setShowMobileSaveSheet(true)}
              className="px-3 py-3 bg-amber-100 hover:bg-amber-200 text-amber-900 font-jua rounded-2xl text-xs shadow-md transition-all flex items-center justify-center gap-1 border border-amber-300 cursor-pointer"
              title="스마트폰에서 저장하기"
            >
              <Smartphone className="w-4 h-4" />
              <span className="hidden sm:inline">모바일 저장</span>
            </button>
          </div>

          {/* Prominent Large Close Button */}
          <button
            onClick={handleClose}
            className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 active:scale-98 text-white font-jua rounded-2xl text-sm sm:text-base shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer border-2 border-slate-700"
          >
            <X className="w-5 h-5 text-amber-300" />
            <span>카드 닫기 (가게로 돌아가기)</span>
          </button>
        </div>
      </div>

      {/* Mobile / iOS Touch Save Fallback Modal */}
      {showMobileSaveSheet && previewUrl && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setShowMobileSaveSheet(false);
          }}
          className="fixed inset-0 z-60 bg-black/90 p-4 flex flex-col items-center justify-center select-none"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-sm w-full bg-white rounded-3xl p-4 flex flex-col items-center text-center shadow-2xl"
          >
            <div className="w-full flex justify-between items-center pb-2 mb-2 border-b border-amber-200">
              <span className="font-jua text-amber-900 text-sm flex items-center gap-1">
                📱 스마트폰 / 아이폰 사진 저장
              </span>
              <button
                onClick={() => setShowMobileSaveSheet(false)}
                className="p-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-amber-50 rounded-2xl p-2 mb-3 border border-amber-200">
              <img
                src={previewUrl}
                alt="연라면 오늘의 라면 카드"
                className="w-full h-auto rounded-xl shadow-inner max-h-[60vh] object-contain"
              />
            </div>

            <div className="bg-amber-100/70 p-3 rounded-2xl w-full mb-3 text-left">
              <p className="font-jua text-xs text-amber-950 mb-1">
                👉 <strong>사진 저장 방법:</strong>
              </p>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                위 이미지를 <strong>손가락으로 1~2초간 길게 꾹 누른 뒤</strong> 나타나는 메뉴에서 <strong>'사진 앱에 저장'</strong> 또는 <strong>'이미지 저장'</strong>을 선택하세요!
              </p>
            </div>

            <button
              onClick={() => setShowMobileSaveSheet(false)}
              className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-jua rounded-xl text-sm cursor-pointer"
            >
              확인 (닫기)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

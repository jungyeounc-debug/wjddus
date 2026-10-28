/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { RamenBowlVisual } from './RamenBowlVisual';
import { RamenShopBackground } from './RamenShopBackground';
import { CheolwoongAvatar } from './CheolwoongAvatar';
import { soundManager } from '../utils/audio';
import {
  Play,
  Sparkles,
  BookOpen,
  Store,
  HelpCircle,
  X,
  Volume2,
  VolumeX,
  Award,
  Settings,
  Heart,
  Utensils,
} from 'lucide-react';

interface TitleScreenProps {
  day: number;
  coins: number;
  highScore: number;
  albumCount: number;
  affinityLevel?: number;
  playerName?: string;
  isMuted: boolean;
  onToggleMute: () => void;
  onStartGame: () => void;
  onOpenMyRamen: () => void;
  onOpenAlbum: () => void;
  onOpenShop: () => void;
  onOpenDiary?: () => void;
  onOpenAchievements?: () => void;
  onOpenSettings?: () => void;
  onOpenBowlCustomizer?: () => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({
  day,
  coins,
  highScore,
  albumCount,
  affinityLevel = 1,
  playerName = '신입 요리사',
  isMuted,
  onToggleMute,
  onStartGame,
  onOpenMyRamen,
  onOpenAlbum,
  onOpenShop,
  onOpenDiary,
  onOpenAchievements,
  onOpenSettings,
  onOpenBowlCustomizer,
}) => {
  const [showHowToPlay, setShowHowToPlay] = useState<boolean>(false);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between p-3 sm:p-5 overflow-hidden select-none">
      {/* Background Shop Illustration with Warm Ambient Ambience */}
      <RamenShopBackground />

      {/* Top Bar Status HUD */}
      <header className="relative z-10 w-full max-w-4xl flex items-center justify-between gap-2 py-2 text-white">
        {/* Left: Day & Coins & Chef badge */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="bg-amber-900/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-amber-500/50 flex items-center gap-1.5 text-xs sm:text-sm font-jua shadow-sm">
            <span>📅 {day}일차 영업</span>
          </div>

          <div className="bg-amber-900/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-amber-500/50 flex items-center gap-1.5 text-xs sm:text-sm font-jua text-amber-300 shadow-sm">
            <span>🪙 {coins} G</span>
          </div>

          {onOpenDiary && (
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenDiary();
              }}
              className="bg-pink-900/80 hover:bg-pink-800 backdrop-blur-md px-3 py-1.5 rounded-full border border-pink-400/50 flex items-center gap-1 text-xs font-jua text-pink-200 shadow-sm cursor-pointer transition"
            >
              <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400" />
              <span>철웅 호감도 Lv.{affinityLevel}</span>
            </button>
          )}
        </div>

        {/* Right: Achievements, Settings, Help, Sound toggle */}
        <div className="flex items-center gap-1.5">
          {onOpenAchievements && (
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenAchievements();
              }}
              className="p-2 bg-amber-900/80 hover:bg-amber-800 backdrop-blur-md rounded-full border border-amber-500/50 text-yellow-300 transition shadow-sm cursor-pointer"
              title="도전 과제"
            >
              <Award className="w-4 h-4" />
            </button>
          )}

          {onOpenBowlCustomizer && (
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenBowlCustomizer();
              }}
              className="p-2 bg-amber-900/80 hover:bg-amber-800 backdrop-blur-md rounded-full border border-amber-500/50 text-white transition shadow-sm cursor-pointer"
              title="그릇 공방"
            >
              <Utensils className="w-4 h-4" />
            </button>
          )}

          {onOpenSettings && (
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenSettings();
              }}
              className="p-2 bg-amber-900/80 hover:bg-amber-800 backdrop-blur-md rounded-full border border-amber-500/50 text-white transition shadow-sm cursor-pointer"
              title="게임 설정"
            >
              <Settings className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => {
              soundManager.playClick();
              setShowHowToPlay(true);
            }}
            className="p-2 bg-amber-900/80 hover:bg-amber-800 backdrop-blur-md rounded-full border border-amber-500/50 text-white transition shadow-sm cursor-pointer"
            title="게임 방법"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          <button
            onClick={onToggleMute}
            className="p-2 bg-amber-900/80 hover:bg-amber-800 backdrop-blur-md rounded-full border border-amber-500/50 text-white transition shadow-sm cursor-pointer"
            title={isMuted ? '음소거 해제' : '음소거'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-300" /> : <Volume2 className="w-4 h-4 text-emerald-300" />}
          </button>
        </div>
      </header>

      {/* Hero Centerpiece: Signboard & Mascot & Ramen Bowl */}
      <main className="relative z-10 flex flex-col items-center text-center my-auto max-w-lg w-full">
        {/* Retro 2000s Signboard Banner */}
        <div className="relative mb-3">
          <div className="bg-linear-to-b from-amber-100 via-yellow-50 to-amber-200 border-4 border-amber-600 rounded-3xl px-8 py-3.5 shadow-2xl flex flex-col items-center">
            <span className="text-[11px] sm:text-xs font-bold text-amber-800 tracking-widest uppercase mb-0.5">
              Cozy & Retro Ramen Tycoon
            </span>
            <h1 className="font-jua text-4xl sm:text-5xl text-red-700 tracking-tight drop-shadow-sm flex items-center gap-2">
              <span>연라면</span>
              <span className="text-2xl sm:text-3xl">🍜</span>
            </h1>
            <p className="font-gaegu text-lg sm:text-xl text-amber-950 font-bold mt-1">
              철웅 사장님과 함께 키워가는 라면가게 이야기
            </p>
          </div>

          <div className="absolute -top-3 left-8 w-2 h-4 bg-amber-800 rounded-full" />
          <div className="absolute -top-3 right-8 w-2 h-4 bg-amber-800 rounded-full" />
        </div>

        {/* Mascot + Ramen centerpiece layout */}
        <div className="relative my-3 flex items-center justify-center">
          <div className="relative z-10 transition-transform hover:scale-105 duration-300">
            <RamenBowlVisual
              waterLevel="normal"
              broth="spicy"
              noodle="firm"
              toppings={['egg', 'cheese', 'green_onion', 'fish_cake']}
              size="lg"
              showSteam={true}
              isBoiling={true}
            />
          </div>

          {/* Cheol-woong Mascot Peek Badge */}
          <div className="absolute -right-6 -bottom-2 z-20 flex flex-col items-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-3 border-amber-400 bg-amber-50 shadow-xl rotate-6 hover:rotate-0 transition-transform flex items-center justify-center p-1">
              <CheolwoongAvatar mood="smile" size="lg" className="w-full h-full object-contain" />
            </div>
            <span className="font-jua text-[11px] bg-amber-600 text-white px-2 py-0.5 rounded-full shadow border border-white -mt-2 z-30">
              철웅 사장님 👨‍🍳
            </span>
          </div>
        </div>

        {/* Cheol-woong greeting line */}
        <div className="bg-white/95 backdrop-blur-md border-2 border-amber-300 rounded-2xl px-5 py-2.5 shadow-md mb-5 max-w-sm">
          <p className="font-jua text-sm text-slate-800">
            "어서 와, {playerName}! 오늘도 연라면 활기차게 열어볼까?!"
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="w-full flex flex-col gap-2.5">
          <button
            onClick={() => {
              soundManager.playClick();
              onStartGame();
            }}
            className="w-full py-4 bg-linear-to-r from-red-600 via-orange-500 to-amber-600 hover:from-red-500 hover:to-amber-500 active:scale-98 text-white font-jua text-xl sm:text-2xl rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 border-2 border-yellow-300 cursor-pointer animate-pulse"
          >
            <Play className="w-6 h-6 fill-white" />
            <span>가게 열기 (오늘의 영업)</span>
          </button>

          <div className="grid grid-cols-4 gap-2">
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenMyRamen();
              }}
              className="py-3 bg-white/90 hover:bg-white active:scale-95 text-amber-950 font-jua text-xs rounded-2xl shadow-md border-2 border-amber-200 transition-all flex flex-col items-center justify-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>나만의 라면</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                onOpenAlbum();
              }}
              className="py-3 bg-white/90 hover:bg-white active:scale-95 text-amber-950 font-jua text-xs rounded-2xl shadow-md border-2 border-amber-200 transition-all flex flex-col items-center justify-center gap-1 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>라면 앨범({albumCount})</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                onOpenShop();
              }}
              className="py-3 bg-white/90 hover:bg-white active:scale-95 text-amber-950 font-jua text-xs rounded-2xl shadow-md border-2 border-amber-200 transition-all flex flex-col items-center justify-center gap-1 cursor-pointer"
            >
              <Store className="w-4 h-4 text-emerald-600" />
              <span>식자재 마트</span>
            </button>

            {onOpenDiary && (
              <button
                onClick={() => {
                  soundManager.playClick();
                  onOpenDiary();
                }}
                className="py-3 bg-white/90 hover:bg-white active:scale-95 text-amber-950 font-jua text-xs rounded-2xl shadow-md border-2 border-pink-300 transition-all flex flex-col items-center justify-center gap-1 cursor-pointer"
              >
                <Heart className="w-4 h-4 text-pink-600 fill-pink-500" />
                <span>추억 수첩</span>
              </button>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-white/70 text-[11px] font-sans pb-1 text-center">
        연라면 (Yeon Ramen) · 2000s 레트로 감성 만화풍 라면가게 경영 게임
      </footer>

      {/* How to play modal */}
      {showHowToPlay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs select-none">
          <div className="relative max-w-lg w-full bg-amber-50 rounded-3xl p-6 shadow-2xl border-4 border-amber-400 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-amber-300">
              <h3 className="font-jua text-xl text-amber-950 flex items-center gap-2">
                <span>📖 연라면 조리 & 영업 가이드</span>
              </h3>
              <button
                onClick={() => setShowHowToPlay(false)}
                className="p-1.5 hover:bg-amber-200 rounded-full text-amber-900 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700 my-4 leading-relaxed">
              <div className="bg-white p-3.5 rounded-2xl border border-amber-200">
                <h4 className="font-jua text-sm text-amber-900 mb-1">
                  1. 4대 라면 카테고리
                </h4>
                <p>
                  손님들은 <strong>국물라면</strong>, <strong>볶음라면</strong>, <strong>시원한 비빔라면</strong>, <strong>짜장라면</strong>을 주문합니다.
                  볶음면은 국물 8스푼만 자작하게 남기고, 비빔면은 찬물에 촥촥 헹궈주는 것이 핵심 비법입니다!
                </p>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-amber-200">
                <h4 className="font-jua text-sm text-amber-900 mb-1">
                  2. 철웅 사장님과의 인연과 친밀도
                </h4>
                <p>
                  사장님께 붕어빵, 믹스커피 같은 간식을 선물하거나 대화에서 센스 있는 답변을 고르면 <strong>친밀도</strong>가 올라갑니다.
                  친밀도가 오르면 특별 이야기 5부작과 비법 다대기가 해금됩니다!
                </p>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-amber-200">
                <h4 className="font-jua text-sm text-amber-900 mb-1">
                  3. 라면 평론가 손님 & 사진 카드
                </h4>
                <p>
                  가끔 찾아오는 <strong>라면 평론가</strong>에게 5점 만점을 받으면 코인을 3배로 줍니다!
                  라면을 완성하고 <strong>📸 찰칵!</strong> 버튼을 누르면 폴라로이드 사진 카드가 앨범에 보관되고 PNG 파일로 다운로드할 수 있습니다.
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowHowToPlay(false)}
                className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-jua rounded-xl text-xs sm:text-sm cursor-pointer"
              >
                확인 완료!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

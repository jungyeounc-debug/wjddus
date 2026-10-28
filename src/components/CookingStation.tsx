/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  BowlCustomization,
  BrothType,
  CookedRamen,
  EggType,
  FlameLevel,
  NoodleDoneness,
  NoodleType,
  RamenCategory,
  SideDish,
  SpicyLevel,
  ToppingId,
  WaterLevel,
} from '../types/game';
import {
  BROTH_LIST,
  BOWL_SHAPES,
  NOODLE_TYPES,
  TOPPING_LIST,
  generateRamenTitle,
} from '../utils/gameData';
import { soundManager } from '../utils/audio';
import { RamenBowlVisual } from './RamenBowlVisual';
import { ToppingVisual } from './ToppingVisual';
import {
  Flame,
  RotateCcw,
  Sparkles,
  Droplets,
  Timer,
  Check,
  Snowflake,
  Utensils,
  ChevronRight,
  Plus,
} from 'lucide-react';

interface CookingStationProps {
  unlockedBroths: string[];
  unlockedToppings: string[];
  activeBowl: BowlCustomization;
  stoveCount: number;
  inventory?: Record<string, number>;
  isCustomMode?: boolean;
  onServeRamen: (ramen: CookedRamen) => void;
  onMistakeTrigger?: () => void;
  onOpenBowlCustomizer?: () => void;
}

export const CookingStation: React.FC<CookingStationProps> = ({
  unlockedBroths,
  unlockedToppings,
  activeBowl,
  stoveCount = 1,
  inventory = {},
  isCustomMode = false,
  onServeRamen,
  onMistakeTrigger,
  onOpenBowlCustomizer,
}) => {
  // Multi-stove slot index
  const [activeStoveIndex, setActiveStoveIndex] = useState<number>(0);

  // Cooking state per pot
  const [ramenCategory, setRamenCategory] = useState<RamenCategory>('soup');
  const [noodleType, setNoodleType] = useState<NoodleType>('basic');
  const [waterLevel, setWaterLevel] = useState<WaterLevel>('normal');
  const [flameLevel, setFlameLevel] = useState<FlameLevel>('med');
  const [broth, setBroth] = useState<BrothType>('spicy');
  const [spicyLevel, setSpicyLevel] = useState<SpicyLevel>(1);
  const [noodleDoneness, setNoodleDoneness] = useState<NoodleDoneness>('firm');
  const [eggType, setEggType] = useState<EggType>('soft');
  const [toppings, setToppings] = useState<ToppingId[]>([]);
  const [sideDish, setSideDish] = useState<SideDish>('danmuji');
  const [customRamenName, setCustomRamenName] = useState<string>('');

  // Step tabs: 1: 종류&면 2: 물&불 3: 삶기&헹굼 4: 수프&맵기 5: 토핑&사이드
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Boiling timer & boil-over risk
  const [isBoiling, setIsBoiling] = useState<boolean>(false);
  const [boilProgress, setBoilProgress] = useState<number>(0); // 0 to 100
  const [boilFinished, setBoilFinished] = useState<boolean>(false);
  const boilIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Bibim cold water rinse clicks mini-game
  const [rinseCount, setRinseCount] = useState<number>(0);

  // Pot shake & chop animation
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [chopVisual, setChopVisual] = useState<boolean>(false);

  // Auto pick matching broth when category changes
  const handleSelectCategory = (cat: RamenCategory) => {
    soundManager.playJellyPop();
    setRamenCategory(cat);
    const valid = BROTH_LIST.filter(
      (b) => b.categoryType === cat && (b.unlockedByDefault || unlockedBroths.includes(b.id))
    );
    if (valid.length > 0) {
      setBroth(valid[0].id);
    }
  };

  const triggerPotShake = () => {
    setIsShaking(true);
    soundManager.playMistake();
    if (onMistakeTrigger) onMistakeTrigger();
    setTimeout(() => setIsShaking(false), 500);
  };

  // Boiling controls
  const startBoiling = () => {
    soundManager.playClick();
    setIsBoiling(true);
    setBoilProgress(0);
    setBoilFinished(false);

    // Speed depends on flame level
    const speedMult = flameLevel === 'high' ? 1.5 : flameLevel === 'low' ? 0.7 : 1.0;
    const duration = 6500 / speedMult;
    const startTime = Date.now();

    if (boilIntervalRef.current) clearInterval(boilIntervalRef.current);

    boilIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, (elapsed / duration) * 100);
      setBoilProgress(progress);

      if (Math.random() < 0.25) {
        soundManager.playBoilBubble();
      }

      // High flame boil-over hazard at > 92%
      if (flameLevel === 'high' && progress > 92 && progress < 96) {
        triggerPotShake();
      }

      if (progress >= 100) {
        clearInterval(boilIntervalRef.current!);
        setIsBoiling(false);
        setBoilFinished(true);
        setNoodleDoneness('soft');
        soundManager.playTimerDing();
      }
    }, 50);
  };

  const stopBoiling = () => {
    if (!isBoiling) return;
    if (boilIntervalRef.current) clearInterval(boilIntervalRef.current);
    setIsBoiling(false);
    setBoilFinished(true);
    soundManager.playTimerDing();

    if (boilProgress < 42) {
      setNoodleDoneness('firm');
    } else if (boilProgress < 76) {
      setNoodleDoneness('normal');
    } else {
      setNoodleDoneness('soft');
    }
  };

  // Add topping with cutting board chop
  const handleAddTopping = (tid: ToppingId) => {
    if (toppings.length >= 8) {
      triggerPotShake();
      return;
    }
    soundManager.playChop();
    setChopVisual(true);
    setTimeout(() => setChopVisual(false), 200);
    setToppings((prev) => [...prev, tid]);
  };

  // Rinse mini-game for cold bibim noodles
  const handleColdRinse = () => {
    soundManager.playWaterPour();
    setRinseCount((c) => Math.min(5, c + 1));
  };

  // Reset station
  const resetStation = () => {
    setCurrentStep(1);
    setRamenCategory('soup');
    setNoodleType('basic');
    setWaterLevel('normal');
    setFlameLevel('med');
    setBroth('spicy');
    setSpicyLevel(1);
    setNoodleDoneness('firm');
    setEggType('soft');
    setToppings([]);
    setSideDish('danmuji');
    setCustomRamenName('');
    setIsBoiling(false);
    setBoilProgress(0);
    setBoilFinished(false);
    setRinseCount(0);
  };

  // Serve Ramen
  const handleServe = () => {
    soundManager.playFanfare();

    const cooked: CookedRamen = {
      category: ramenCategory,
      ramenCategory,
      noodleType,
      waterLevel,
      broth,
      spicyLevel,
      noodleDoneness,
      noodle: noodleDoneness,
      eggType,
      toppings,
      sideDish,
      bowl: activeBowl,
      bowlSkinId: activeBowl.shape,
      title: '',
      cookedAt: new Date().toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
      cookedDay: 1,
    };

    const autoTitle = generateRamenTitle(cooked);
    cooked.title = isCustomMode && customRamenName.trim() ? customRamenName.trim() : autoTitle;
    cooked.customName = isCustomMode ? customRamenName.trim() : undefined;

    onServeRamen(cooked);
    resetStation();
  };

  const availableBroths = BROTH_LIST.filter(
    (b) => b.categoryType === ramenCategory && (b.unlockedByDefault || unlockedBroths.includes(b.id))
  );

  const availableToppings = TOPPING_LIST.filter(
    (t) => t.unlockedByDefault || unlockedToppings.includes(t.id)
  );

  return (
    <div className="bg-linear-to-b from-amber-50/95 via-orange-50/95 to-amber-100/95 border-3 border-amber-400 rounded-3xl p-3 sm:p-5 shadow-xl backdrop-blur-md">
      {/* Top Bar: Multi-stove Selector + Step Tabs + Reset */}
      <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-amber-300 flex-wrap gap-2">
        {/* Multi-stove switcher (if unlocked) */}
        {stoveCount > 1 && (
          <div className="flex items-center gap-1 bg-amber-200/80 p-1 rounded-2xl border border-amber-400">
            {Array.from({ length: stoveCount }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  soundManager.playClick();
                  setActiveStoveIndex(idx);
                }}
                className={`px-2.5 py-1 rounded-xl text-xs font-jua transition cursor-pointer ${
                  activeStoveIndex === idx
                    ? 'bg-amber-600 text-white shadow'
                    : 'text-amber-900 hover:bg-amber-100'
                }`}
              >
                🔥 {idx + 1}구 화구
              </button>
            ))}
          </div>
        )}

        {/* Step Tabs Navigation */}
        <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-0.5">
          {[
            { num: 1, label: '1.라면&면' },
            { num: 2, label: '2.물&불' },
            { num: 3, label: '3.면 삶기' },
            { num: 4, label: '4.수프&맵기' },
            { num: 5, label: '5.토핑&세팅' },
          ].map((s) => (
            <button
              key={s.num}
              onClick={() => {
                soundManager.playClick();
                setCurrentStep(s.num);
              }}
              className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl font-jua text-xs sm:text-sm transition flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                currentStep === s.num
                  ? 'bg-amber-500 text-white shadow-md scale-102 ring-2 ring-amber-300'
                  : 'bg-white/80 hover:bg-amber-100 text-amber-950 border border-amber-200'
              }`}
            >
              <span>{s.label}</span>
              {currentStep > s.num && <Check className="w-3.5 h-3.5 text-emerald-300" />}
            </button>
          ))}
        </div>

        {/* Reset button */}
        <button
          onClick={resetStation}
          title="처음부터 다시 끓이기"
          className="p-1.5 px-2.5 rounded-xl bg-white/80 hover:bg-rose-50 text-slate-500 hover:text-rose-600 border border-amber-300 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">다시 끓이기</span>
        </button>
      </div>

      {/* Main Grid: Left Bowl Preview + Right Interactive Controls */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Left Bowl Stage */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-3 bg-white/70 rounded-2xl border-2 border-amber-300 shadow-inner min-h-[290px] relative">
          {/* Flame animation beneath pot */}
          <div className="absolute bottom-2 flex items-center gap-2">
            <span
              className={`text-2xl transition-transform ${
                flameLevel === 'high'
                  ? 'scale-125 text-red-500 animate-bounce'
                  : flameLevel === 'low'
                  ? 'scale-90 text-amber-400'
                  : 'scale-105 text-orange-500 animate-pulse'
              }`}
            >
              🔥
            </span>
            <span className="text-[11px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
              {flameLevel === 'low' ? '약불 (서서히)' : flameLevel === 'high' ? '강불 (화력 뿜뿜!)' : '중불 (황금 화력)'}
            </span>
          </div>

          <div className={`transition-transform my-auto ${isShaking ? 'animate-pot-shake' : ''}`}>
            <RamenBowlVisual
              ramenCategory={ramenCategory}
              waterLevel={waterLevel}
              broth={broth}
              spicyLevel={spicyLevel}
              noodle={noodleDoneness}
              toppings={toppings}
              bowlConfig={activeBowl}
              isBoiling={isBoiling}
              size="md"
              showSteam={true}
            />
          </div>

          {/* Quick Bowl Customizer Trigger */}
          {onOpenBowlCustomizer && (
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenBowlCustomizer();
              }}
              className="absolute top-2 right-2 text-[11px] font-bold text-amber-800 bg-amber-100 hover:bg-amber-200 px-2.5 py-1 rounded-xl border border-amber-300 shadow-2xs flex items-center gap-1 cursor-pointer"
            >
              <Utensils className="w-3 h-3" />
              <span>그릇 변경</span>
            </button>
          )}
        </div>

        {/* Right Step Actions */}
        <div className="md:col-span-7 bg-white/90 rounded-2xl p-4 border-2 border-amber-200 shadow-sm min-h-[290px] flex flex-col justify-between">
          {/* STEP 1: Ramen Category & Noodle Type */}
          {currentStep === 1 && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-amber-900 mb-1.5">
                  🍜 1. 어떤 스타일의 라면을 만드시겠습니까?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'soup', name: '국물라면', emoji: '🍲', desc: '얼큰한 국물' },
                    { id: 'stir', name: '볶음라면', emoji: '🥢', desc: '자작한 볶음' },
                    { id: 'bibim', name: '비빔라면', emoji: '❄️', desc: '새콤 시원' },
                    { id: 'jjajang', name: '짜장라면', emoji: '🧅', desc: '달콤 춘장' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleSelectCategory(cat.id as any)}
                      className={`p-2.5 rounded-xl border-2 text-center transition active:scale-95 cursor-pointer ${
                        ramenCategory === cat.id
                          ? 'border-amber-500 bg-amber-100 shadow font-bold text-amber-950 ring-2 ring-amber-300'
                          : 'border-slate-200 hover:border-amber-300 bg-white text-slate-700'
                      }`}
                    >
                      <span className="text-2xl block mb-0.5">{cat.emoji}</span>
                      <span className="font-jua text-xs block">{cat.name}</span>
                      <span className="text-[10px] text-slate-500">{cat.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-900 mb-1.5">
                  🥢 2. 면발 종류 선택
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                  {NOODLE_TYPES.map((nt) => (
                    <button
                      key={nt.id}
                      onClick={() => {
                        soundManager.playClick();
                        setNoodleType(nt.id);
                      }}
                      className={`p-2 rounded-xl border-2 text-center transition cursor-pointer ${
                        noodleType === nt.id
                          ? 'border-amber-500 bg-amber-100 font-bold text-amber-950 shadow-xs'
                          : 'border-slate-200 hover:bg-amber-50 bg-white text-slate-700'
                      }`}
                    >
                      <span className="text-xl block">{nt.emoji}</span>
                      <span className="font-jua text-xs block mt-0.5">{nt.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Water Level & Flame Controls */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-amber-900 mb-1.5 flex items-center gap-1.5">
                  <Droplets className="w-4 h-4 text-blue-500" />
                  <span>
                    {ramenCategory === 'stir' || ramenCategory === 'jjajang'
                      ? '물 버리기 & 남은 국물 조절 (8스푼이 황금비율!)'
                      : '냄비에 물 붓기'}
                  </span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    {
                      id: 'less',
                      name: ramenCategory === 'stir' ? '바짝 졸이기 (적게)' : '물 적게 (짜릿/진하게)',
                      icon: '💧',
                    },
                    {
                      id: 'normal',
                      name: ramenCategory === 'stir' ? '자작한 8스푼 (보통)' : '물 보통 (황금비율)',
                      icon: '💧💧',
                    },
                    {
                      id: 'more',
                      name: ramenCategory === 'stir' ? '촉촉하게 (많이)' : '물 많이 (삼삼하게)',
                      icon: '💧💧💧',
                    },
                  ].map((w) => (
                    <button
                      key={w.id}
                      onClick={() => {
                        soundManager.playWaterPour();
                        setWaterLevel(w.id as any);
                      }}
                      className={`p-3 rounded-2xl border-2 text-center transition active:scale-95 cursor-pointer ${
                        waterLevel === w.id
                          ? 'border-blue-500 bg-blue-50 text-blue-900 font-bold shadow'
                          : 'border-slate-200 hover:border-blue-300 bg-white text-slate-700'
                      }`}
                    >
                      <span className="text-lg block mb-1">{w.icon}</span>
                      <span className="font-jua text-xs block">{w.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-900 mb-1.5 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span>화구 화력 조절</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'low', name: '약불 (은은하게)', desc: '천천히 끓음' },
                    { id: 'med', name: '중불 (표준 화력)', desc: '안정적인 끓임' },
                    { id: 'high', name: '강불 (화력 폭발!)', desc: '초고속 (넘침 주의)' },
                  ].map((fl) => (
                    <button
                      key={fl.id}
                      onClick={() => {
                        soundManager.playSizzle();
                        setFlameLevel(fl.id as any);
                      }}
                      className={`p-2.5 rounded-xl border-2 text-center transition cursor-pointer ${
                        flameLevel === fl.id
                          ? 'border-orange-500 bg-orange-50 text-orange-950 font-bold shadow'
                          : 'border-slate-200 hover:border-orange-300 bg-white text-slate-700'
                      }`}
                    >
                      <span className="font-jua text-xs block">{fl.name}</span>
                      <span className="text-[10px] text-slate-500">{fl.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Noodle Boiling & Cold Rinse */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-amber-900 flex items-center gap-1">
                    <Timer className="w-4 h-4 text-amber-600" />
                    <span>면 익히기 타이머 게이지</span>
                  </label>
                  <span className="text-xs font-black text-amber-900">
                    현재: {noodleDoneness === 'firm' ? '꼬들꼬들 💛' : noodleDoneness === 'normal' ? '보통 탱글 💚' : '푹 퍼짐 💙'}
                  </span>
                </div>

                {/* Doneness Progress Gauge */}
                <div className="relative w-full h-8 bg-slate-200 rounded-full border-2 border-slate-300 overflow-hidden shadow-inner flex items-center">
                  <div
                    className="h-full bg-linear-to-r from-amber-400 via-emerald-400 to-blue-400 transition-all duration-75"
                    style={{ width: `${boilProgress}%` }}
                  />
                  {/* Gauge marker indicators */}
                  <div className="absolute inset-0 flex text-[10px] font-bold text-slate-700 pointer-events-none items-center justify-between px-3">
                    <span>꼬들 (0~42%)</span>
                    <span>보통 (43~76%)</span>
                    <span>퍼짐 (77~100%)</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3 mt-3">
                  {!isBoiling ? (
                    <button
                      onClick={startBoiling}
                      className="py-2.5 px-6 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-jua text-sm shadow-md transition active:scale-95 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Flame className="w-4 h-4" />
                      <span>{boilFinished ? '다시 끓이기' : '불 켜고 면 삶기!'}</span>
                    </button>
                  ) : (
                    <button
                      onClick={stopBoiling}
                      className="py-2.5 px-6 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-jua text-sm shadow-lg transition active:scale-95 animate-pulse flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>🛑 지금 건져내기! (스톱)</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Bibim Cold Rinse Mini-game */}
              {ramenCategory === 'bibim' && (
                <div className="bg-sky-50 border-2 border-sky-300 rounded-2xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Snowflake className="w-5 h-5 text-sky-500" />
                    <div>
                      <h4 className="font-jua text-xs text-sky-950">
                        찬물 헹구기 ({rinseCount}/5회 완료)
                      </h4>
                      <p className="text-[10px] text-sky-700">연타해서 찰기를 살리세요!</p>
                    </div>
                  </div>
                  <button
                    onClick={handleColdRinse}
                    className="py-1.5 px-3.5 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs rounded-xl shadow transition active:scale-90 cursor-pointer"
                  >
                    찬물 헹구기 촥!
                  </button>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: Broth & Sauce + Spicy Clicker */}
          {currentStep === 4 && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-amber-900 mb-1.5">
                  🍲 국물 & 특제 소스 선택
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-36 overflow-y-auto pr-1">
                  {availableBroths.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => {
                        soundManager.playClick();
                        setBroth(b.id);
                      }}
                      className={`p-2 rounded-xl border-2 text-left flex items-center gap-2 transition cursor-pointer ${
                        broth === b.id
                          ? 'border-amber-500 bg-amber-100 shadow text-amber-950 font-bold'
                          : 'border-slate-200 hover:border-amber-300 bg-white text-slate-700'
                      }`}
                    >
                      <span className="text-xl shrink-0">{b.emoji}</span>
                      <div className="truncate">
                        <span className="font-jua text-xs block truncate">{b.name}</span>
                        <span className="text-[9px] text-slate-500 block truncate">{b.flavorText}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Spicy level clicker */}
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-3 flex items-center justify-between">
                <div>
                  <h4 className="font-jua text-xs text-rose-950 flex items-center gap-1">
                    <span>🌶️ 고춧가루 팍팍! (맵기 {spicyLevel}단계)</span>
                  </h4>
                  <p className="text-[10px] text-rose-700">손님 주문에 맞게 0~5단계 조절</p>
                </div>

                <div className="flex items-center gap-1">
                  {[0, 1, 2, 3, 4, 5].map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => {
                        soundManager.playClick();
                        setSpicyLevel(lvl as SpicyLevel);
                      }}
                      className={`w-7 h-7 rounded-lg font-jua text-xs transition cursor-pointer ${
                        spicyLevel === lvl
                          ? 'bg-rose-600 text-white shadow ring-2 ring-rose-300 scale-105'
                          : 'bg-white border border-rose-200 text-rose-800 hover:bg-rose-100'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Toppings + Egg + Side Dish */}
          {currentStep === 5 && (
            <div className="space-y-3">
              {/* Egg style */}
              <div>
                <label className="block text-xs font-bold text-amber-900 mb-1">
                  🍳 계란 스타일 선택
                </label>
                <div className="grid grid-cols-5 gap-1">
                  {[
                    { id: 'none', label: '없음' },
                    { id: 'raw', label: '날계란' },
                    { id: 'soft', label: '반숙' },
                    { id: 'hard', label: '완숙' },
                    { id: 'beaten', label: '풀어서' },
                  ].map((eg) => (
                    <button
                      key={eg.id}
                      onClick={() => {
                        soundManager.playClick();
                        setEggType(eg.id as EggType);
                      }}
                      className={`py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                        eggType === eg.id
                          ? 'bg-amber-500 text-white shadow'
                          : 'bg-slate-100 hover:bg-amber-50 text-slate-700'
                      }`}
                    >
                      {eg.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toppings Grid with Chop Animation */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-amber-900">
                    🥩 토핑 얹기 ({toppings.length}/8개)
                  </label>
                  {toppings.length > 0 && (
                    <button
                      onClick={() => setToppings([])}
                      className="text-[10px] text-rose-600 hover:underline cursor-pointer"
                    >
                      토핑 비우기
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5 max-h-24 overflow-y-auto pr-1">
                  {availableToppings.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => handleAddTopping(t.id)}
                      className="p-1.5 rounded-xl border border-amber-200 bg-white hover:bg-amber-100 flex flex-col items-center justify-center transition active:scale-95 cursor-pointer shadow-2xs"
                    >
                      <span className="text-base">{t.emoji}</span>
                      <span className="text-[10px] font-medium text-slate-800 truncate w-full text-center">
                        {t.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Side Dish Selector */}
              <div>
                <label className="block text-xs font-bold text-amber-900 mb-1">
                  🍚 곁들임 반찬 세팅
                </label>
                <div className="grid grid-cols-5 gap-1">
                  {[
                    { id: 'none', label: '없음', emoji: '✖️' },
                    { id: 'danmuji', label: '단무지', emoji: '🟡' },
                    { id: 'kimchi', label: '김치', emoji: '🥬' },
                    { id: 'rice', label: '공기밥', emoji: '🍚' },
                    { id: 'coke', label: '음료수', emoji: '🥤' },
                  ].map((sd) => (
                    <button
                      key={sd.id}
                      onClick={() => {
                        soundManager.playClick();
                        setSideDish(sd.id as SideDish);
                      }}
                      className={`py-1 rounded-xl border text-center transition cursor-pointer ${
                        sideDish === sd.id
                          ? 'border-amber-500 bg-amber-100 text-amber-950 font-bold shadow-xs'
                          : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      <span className="text-sm block">{sd.emoji}</span>
                      <span className="text-[10px] block">{sd.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Bottom Next / Serve Controls */}
          <div className="pt-3 border-t border-amber-200 flex items-center justify-between">
            {currentStep < 5 ? (
              <button
                onClick={() => {
                  soundManager.playClick();
                  setCurrentStep((prev) => Math.min(5, prev + 1));
                }}
                className="ml-auto py-2 px-5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-jua text-xs sm:text-sm shadow transition active:scale-95 flex items-center gap-1 cursor-pointer"
              >
                <span>다음 단계로</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleServe}
                className="w-full py-3 rounded-2xl bg-linear-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:to-red-600 text-white font-jua text-sm sm:text-base shadow-lg hover:shadow-xl transition active:scale-95 flex items-center justify-center gap-2 cursor-pointer border-2 border-white animate-pulse"
              >
                <Sparkles className="w-5 h-5 text-yellow-200" />
                <span>손님께 라면 내어주기! 🍜</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

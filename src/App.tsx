/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  BowlCustomization,
  CheolwoongAffinity,
  CheolwoongMood,
  CookedRamen,
  Customer,
  DailyEventInfo,
  GameSettings,
  PhotoCard,
  PlayerProfile,
  RamenRating,
} from './types/game';
import { GameStorage } from './utils/storage';
import { soundManager } from './utils/audio';
import { evaluateRamen, generateRandomCustomer } from './utils/ramenData';
import { DAILY_EVENTS } from './utils/gameData';

// UI Modals & Components
import { TitleScreen } from './components/TitleScreen';
import { CustomerQueue } from './components/CustomerQueue';
import { CookingStation } from './components/CookingStation';
import { CheolwoongMascot } from './components/CheolwoongMascot';
import { CheolwoongDialogBox } from './components/CheolwoongDialogBox';
import { NewbieIntroModal } from './components/NewbieIntroModal';
import { MorningRoutineModal } from './components/MorningRoutineModal';
import { MarketShopModal } from './components/MarketShopModal';
import { CheolwoongChatModal } from './components/CheolwoongChatModal';
import { MemoryDiaryModal } from './components/MemoryDiaryModal';
import { BowlCustomizerModal } from './components/BowlCustomizerModal';
import { AchievementsModal } from './components/AchievementsModal';
import { SettingsModal } from './components/SettingsModal';
import { PhotoCardModal } from './components/PhotoCardModal';
import { AlbumModal } from './components/AlbumModal';
import { ShopModal } from './components/ShopModal';
import { DaySummaryModal } from './components/DaySummaryModal';

import {
  ArrowLeft,
  Clock,
  Coins,
  Volume2,
  VolumeX,
  Sparkles,
  BookOpen,
  Store,
  Star,
  MessageCircle,
  Award,
  Settings as SettingsIcon,
  Heart,
  Flame,
  ChefHat,
  ShoppingBag,
} from 'lucide-react';

export default function App() {
  // Screens: TITLE | MORNING | PLAYING | MY_RAMEN
  const [screen, setScreen] = useState<'TITLE' | 'MORNING' | 'PLAYING' | 'MY_RAMEN'>('TITLE');

  // Player Profile & First Launch
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean>(() => GameStorage.isFirstLaunch());
  const [profile, setProfile] = useState<PlayerProfile>(() => GameStorage.getPlayerProfile());

  // Economy & Progression
  const [coins, setCoins] = useState<number>(() => GameStorage.getCoins());
  const [day, setDay] = useState<number>(() => GameStorage.getDay());
  const [highScore, setHighScore] = useState<number>(() => GameStorage.getHighScore());
  const [affinity, setAffinity] = useState<CheolwoongAffinity>(() => GameStorage.getAffinity());
  const [inventory, setInventory] = useState<Record<string, number>>(() => GameStorage.getInventory());
  const [stoveCount, setStoveCount] = useState<number>(() => GameStorage.getStoveCount());

  // Customization & Collections
  const [bowlConfig, setBowlConfig] = useState<BowlCustomization>(() => GameStorage.getBowlConfig());
  const [unlockedBroths, setUnlockedBroths] = useState<string[]>(() => GameStorage.getUnlockedBroths());
  const [unlockedToppings, setUnlockedToppings] = useState<string[]>(() => GameStorage.getUnlockedToppings());
  const [unlockedBowls, setUnlockedBowls] = useState<string[]>(() => GameStorage.getUnlockedBowls());
  const [ownedDecors, setOwnedDecors] = useState<string[]>(() => GameStorage.getOwnedDecors());
  const [albumCards, setAlbumCards] = useState<PhotoCard[]>(() => GameStorage.getAlbumCards());
  const [achievements, setAchievements] = useState(() => GameStorage.getAchievements());
  const [settings, setSettings] = useState<GameSettings>(() => GameStorage.getSettings());
  const [isMuted, setIsMuted] = useState<boolean>(() => GameStorage.getMuted());

  // In-game round state
  const [roundTimeLeft, setRoundTimeLeft] = useState<number>(() => settings.serviceDuration || 90);
  const [dayEarnedCoins, setDayEarnedCoins] = useState<number>(0);
  const [dayServedCount, setDayServedCount] = useState<number>(0);
  const [dayPerfectCount, setDayPerfectCount] = useState<number>(0);
  const [dayLeftCount, setDayLeftCount] = useState<number>(0);
  const [comboCount, setComboCount] = useState<number>(0);

  // Active customer & Cheol-woong mood
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
  const [cheolwoongMood, setCheolwoongMood] = useState<CheolwoongMood>('normal');
  const [cheolwoongSpeech, setCheolwoongSpeech] = useState<string>('');

  // Daily Event
  const weatherKeys: Array<keyof typeof DAILY_EVENTS> = ['sunny', 'rainy', 'hot', 'festival', 'birthday'];
  const dailyWeather = weatherKeys[(day - 1) % weatherKeys.length];
  const currentDailyEvent: DailyEventInfo = DAILY_EVENTS[dailyWeather] || DAILY_EVENTS.sunny;

  // Post-serve result popup
  const [lastRating, setLastRating] = useState<{
    rating: RamenRating;
    customer: Customer;
    ramen: CookedRamen;
  } | null>(null);

  // Modals
  const [isMarketOpen, setIsMarketOpen] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isDiaryOpen, setIsDiaryOpen] = useState<boolean>(false);
  const [isBowlCustomizerOpen, setIsBowlCustomizerOpen] = useState<boolean>(false);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isAlbumOpen, setIsAlbumOpen] = useState<boolean>(false);
  const [isShopOpen, setIsShopOpen] = useState<boolean>(false);
  const [isDaySummaryOpen, setIsDaySummaryOpen] = useState<boolean>(false);
  const [activePhotoCard, setActivePhotoCard] = useState<PhotoCard | null>(null);

  // Sync mute & sound volume
  useEffect(() => {
    soundManager.setMuted(isMuted);
    soundManager.setBgmVolume(settings.bgmVolume);
    soundManager.setSfxVolume(settings.sfxVolume);
  }, [isMuted, settings]);

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    GameStorage.setMuted(next);
  };

  // Next Customer Spawner
  const spawnNextCustomer = useCallback(() => {
    const newCust = generateRandomCustomer(day, unlockedBroths, unlockedToppings);
    // Adjust speed by difficulty
    if (settings.difficulty === 'hard') {
      newCust.maxPatience *= 0.8;
      newCust.currentPatience *= 0.8;
    } else if (settings.difficulty === 'easy') {
      newCust.maxPatience *= 1.25;
      newCust.currentPatience *= 1.25;
    }

    if (ownedDecors.includes('neon_sign')) {
      newCust.maxPatience *= 1.15;
      newCust.currentPatience *= 1.15;
    }

    setCurrentCustomer(newCust);
    setCheolwoongMood('normal');
    setCheolwoongSpeech(
      newCust.isCritic
        ? '앗! 저분은 유명한 라면 평론가 손님이야! 만점을 받으면 코인이 무려 3배라구!'
        : `${newCust.name} 손님이 오셨어! 주문하신 대로 정성껏 만들어보자!`
    );
  }, [day, unlockedBroths, unlockedToppings, ownedDecors, settings.difficulty]);

  // Round Timer
  useEffect(() => {
    if (screen !== 'PLAYING') return;

    const timer = setInterval(() => {
      setRoundTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          finishDayRound();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [screen]);

  // Customer Patience Tick
  useEffect(() => {
    if (screen !== 'PLAYING' || !currentCustomer) return;

    const interval = setInterval(() => {
      setCurrentCustomer((prev) => {
        if (!prev) return null;
        const nextPatience = prev.currentPatience - 0.5;

        // Customer lost patience and left!
        if (nextPatience <= 0) {
          soundManager.playMistake();
          setDayLeftCount((c) => c + 1);
          setComboCount(0); // Break combo
          setCheolwoongMood('shocked');
          setCheolwoongSpeech('아이고 손님이 너무 오래 기다리셔서 화나서 가셨어... ㅠㅠ 다음엔 더 빨리 해보자!');
          setTimeout(() => {
            spawnNextCustomer();
          }, 1500);
          return null;
        }

        return { ...prev, currentPatience: nextPatience };
      });
    }, 500);

    return () => clearInterval(interval);
  }, [screen, currentCustomer, spawnNextCustomer]);

  // Start Morning Routine
  const handleOpenMorningRoutine = () => {
    setScreen('MORNING');
    soundManager.playChime();
  };

  // Start Day Service (Playing)
  const handleStartServiceHour = () => {
    setRoundTimeLeft(settings.serviceDuration || 90);
    setDayEarnedCoins(0);
    setDayServedCount(0);
    setDayPerfectCount(0);
    setDayLeftCount(0);
    setComboCount(0);
    setLastRating(null);
    setScreen('PLAYING');
    spawnNextCustomer();
  };

  // Finish Day Round
  const finishDayRound = () => {
    soundManager.playSuccessChime();
    setCurrentCustomer(null);
    setIsDaySummaryOpen(true);
    if (dayEarnedCoins > highScore) {
      setHighScore(dayEarnedCoins);
      GameStorage.setHighScore(dayEarnedCoins);
    }
  };

  // Next Day Transition
  const handleNextDay = () => {
    const nextDay = day + 1;
    setDay(nextDay);
    GameStorage.setDay(nextDay);
    setIsDaySummaryOpen(false);
    handleOpenMorningRoutine();
  };

  // Serve Ramen Handler (In Order Mode)
  const handleServeOrderRamen = (ramen: CookedRamen) => {
    if (!currentCustomer) return;

    const rating = evaluateRamen(ramen, currentCustomer, ownedDecors);

    // Update stats & combo
    const newCombo = rating.stars >= 4 ? comboCount + 1 : 0;
    setComboCount(newCombo);
    if (newCombo > 1) {
      soundManager.playCombo(newCombo);
    }

    const earnedWithCombo = rating.earnedCoins + (newCombo > 2 ? newCombo * 5 : 0);
    setDayEarnedCoins((c) => c + earnedWithCombo);
    const newCoins = coins + earnedWithCombo;
    setCoins(newCoins);
    GameStorage.setCoins(newCoins);

    // Consume 1 noodle from inventory if present
    if (inventory.noodle && inventory.noodle > 0) {
      const nextInv = { ...inventory, noodle: inventory.noodle - 1 };
      setInventory(nextInv);
      GameStorage.setInventory(nextInv);
    }

    setDayServedCount((c) => c + 1);
    if (rating.stars === 5) {
      setDayPerfectCount((c) => c + 1);
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#EF4444', '#10B981', '#3B82F6'],
      });
      setCheolwoongMood('smile');
      setCheolwoongSpeech(
        rating.isCriticBonus
          ? '대박! 평론가님이 만점을 주셨어! 코인 3배 보너스 획득! 🌟🎉'
          : `우와아! 완벽한 라면이야! ${profile.name}, 넌 최고의 요리사야! 👍`
      );
    } else if (rating.stars >= 3) {
      setCheolwoongMood('smile');
      setCheolwoongSpeech('좋아 좋아, 손님이 맛있게 드셨어! 계속 힘내자구!');
    } else {
      setCheolwoongMood('shocked');
      setCheolwoongSpeech('으악... 주문이랑 조금 달랐나봐 손님 표정이... 💦 다음엔 꼭 맞추자!');
    }

    setLastRating({
      rating,
      customer: currentCustomer,
      ramen,
    });
  };

  // Snap Photo Card for Served Ramen
  const handleSnapPhotoCard = () => {
    if (!lastRating) return;
    soundManager.playCameraShutter();

    const newCard: PhotoCard = {
      id: `card_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      title: lastRating.ramen.title,
      mode: 'order',
      ramen: lastRating.ramen,
      rating: lastRating.rating,
      customerName: lastRating.customer.name,
      customerComment: lastRating.rating.feedback,
      customerEmoji: lastRating.customer.emoji,
      playerName: profile.name,
      borderColor: '#F59E0B',
      createdAt: new Date().toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
      dayNumber: day,
      cheolwoongSignature: '철웅 사장님',
      cheolwoongComment: lastRating.rating.stars === 5 ? '정성이 담긴 최고의 한 그릇!' : '언제나 정성으로!',
    };

    GameStorage.saveAlbumCard(newCard);
    setAlbumCards(GameStorage.getAlbumCards());
    setActivePhotoCard(newCard);
  };

  // Close serve feedback & spawn next customer
  const handleProceedToNextCustomer = () => {
    soundManager.playClick();
    setLastRating(null);
    spawnNextCustomer();
  };

  // Serve Custom Ramen
  const handleServeCustomRamen = (ramen: CookedRamen) => {
    soundManager.playCameraShutter();

    const newCard: PhotoCard = {
      id: `custom_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      title: ramen.title,
      mode: 'custom',
      ramen,
      playerName: profile.name,
      borderColor: '#3B82F6',
      createdAt: new Date().toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
      dayNumber: day,
      cheolwoongSignature: '철웅 사장님',
      cheolwoongComment: '세상에 단 하나뿐인 나만의 특제 라면!',
    };

    GameStorage.saveAlbumCard(newCard);
    GameStorage.saveCustomRecipe(ramen);
    setAlbumCards(GameStorage.getAlbumCards());
    setActivePhotoCard(newCard);
  };

  // First Launch Complete
  const handleCompleteNewbie = (newProfile: PlayerProfile) => {
    setProfile(newProfile);
    setIsFirstLaunch(false);
    GameStorage.setPlayerProfile(newProfile);
    GameStorage.markFirstLaunchComplete();
  };

  // Reset Progress
  const handleResetAllData = () => {
    GameStorage.clearAll();
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#FFFBEB] text-[#1F2937] flex flex-col justify-between selection:bg-amber-300">
      {/* 1. NEWBIE ONBOARDING MODAL */}
      {isFirstLaunch && <NewbieIntroModal onComplete={handleCompleteNewbie} />}

      {/* 2. TITLE SCREEN */}
      {screen === 'TITLE' && (
        <TitleScreen
          day={day}
          coins={coins}
          highScore={highScore}
          albumCount={albumCards.length}
          affinityLevel={affinity.level}
          playerName={profile.name}
          isMuted={isMuted}
          onToggleMute={toggleMute}
          onStartGame={handleOpenMorningRoutine}
          onOpenMyRamen={() => setScreen('MY_RAMEN')}
          onOpenAlbum={() => setIsAlbumOpen(true)}
          onOpenShop={() => setIsMarketOpen(true)}
          onOpenDiary={() => setIsDiaryOpen(true)}
          onOpenAchievements={() => setIsAchievementsOpen(true)}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenBowlCustomizer={() => setIsBowlCustomizerOpen(true)}
        />
      )}

      {/* 3. MORNING ROUTINE MODAL */}
      {screen === 'MORNING' && (
        <MorningRoutineModal
          day={day}
          dailyEvent={currentDailyEvent}
          profile={profile}
          affinityLevel={affinity.level}
          onOpenMarket={() => setIsMarketOpen(true)}
          onOpenChat={() => setIsChatOpen(true)}
          onStartService={handleStartServiceHour}
        />
      )}

      {/* 4. PLAYING SCREEN & 5. MY RAMEN SCREEN */}
      {(screen === 'PLAYING' || screen === 'MY_RAMEN') && (
        <div className="flex-1 flex flex-col justify-between max-w-5xl mx-auto w-full p-2.5 sm:p-4">
          {/* Top Bar HUD */}
          <header className="flex items-center justify-between gap-3 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border-2 border-amber-300 shadow-sm mb-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setScreen('TITLE');
                }}
                className="p-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 transition flex items-center gap-1 text-xs font-jua cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">메인 메뉴</span>
              </button>

              <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 rounded-xl border border-amber-200 text-xs font-bold text-amber-950">
                <ChefHat className="w-3.5 h-3.5 text-amber-600" />
                <span>{profile.name} 요리사</span>
              </div>
            </div>

            {/* Middle: Timer & Combo */}
            {screen === 'PLAYING' && (
              <div className="flex items-center gap-2">
                <div
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-black border transition ${
                    roundTimeLeft <= 15
                      ? 'bg-red-500 text-white border-red-600 animate-pulse'
                      : 'bg-amber-100 text-amber-950 border-amber-300'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>{roundTimeLeft}초</span>
                </div>

                {comboCount > 1 && (
                  <div className="bg-linear-to-r from-orange-500 to-red-500 text-white text-xs font-black px-2.5 py-1 rounded-full shadow animate-bounce flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 fill-yellow-300 text-yellow-300" />
                    <span>{comboCount} 콤보!</span>
                  </div>
                )}
              </div>
            )}

            {/* Right: Coins, Cheolwoong talk button, Mute */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 px-3 py-1 bg-amber-200/90 border border-amber-400 rounded-full text-xs font-bold text-amber-950">
                <Coins className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                <span className="tabular-nums">{coins} G</span>
              </div>

              <button
                onClick={() => {
                  soundManager.playCheolwoongVoice();
                  setIsChatOpen(true);
                }}
                className="p-1.5 px-2.5 rounded-xl bg-sky-100 hover:bg-sky-200 text-sky-900 border border-sky-300 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                title="사장님께 말 걸기"
              >
                <MessageCircle className="w-3.5 h-3.5 text-sky-600" />
                <span className="hidden sm:inline">사장님 대화</span>
              </button>

              <button
                onClick={toggleMute}
                className="p-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 transition cursor-pointer"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
              </button>
            </div>
          </header>

          {/* MAIN ARENA */}
          <main className="flex-1 flex flex-col gap-3">
            {/* TOP HALL: Customer Queue or Free Recipe Banner */}
            {screen === 'PLAYING' ? (
              <CustomerQueue customer={currentCustomer} />
            ) : (
              <div className="bg-linear-to-r from-blue-500 to-indigo-600 text-white rounded-3xl p-4 shadow-md flex items-center justify-between">
                <div>
                  <h3 className="font-jua text-lg sm:text-xl flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-yellow-300" />
                    <span>나만의 특제 라면 연구소</span>
                  </h3>
                  <p className="text-xs text-blue-100">
                    손님 주문 없이 원하는 국물, 면, 토핑을 자유롭게 조합하여 나만의 라면을 완성해보세요!
                  </p>
                </div>
              </div>
            )}

            {/* CENTER / MASCOT STRIP */}
            <div className="bg-white/80 rounded-2xl p-2.5 sm:p-3 border-2 border-amber-200 flex items-center justify-between gap-3 shadow-xs">
              <CheolwoongMascot
                mood={cheolwoongMood}
                speechText={cheolwoongSpeech}
                onClickSpeech={() => setIsChatOpen(true)}
              />

              <div className="shrink-0 hidden sm:flex items-center gap-2">
                <button
                  onClick={() => setIsMarketOpen(true)}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-jua shadow transition cursor-pointer flex items-center gap-1"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>재료 마트</span>
                </button>
                <button
                  onClick={() => setIsBowlCustomizerOpen(true)}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-jua shadow-2xs transition cursor-pointer"
                >
                  🥣 그릇 변경
                </button>
              </div>
            </div>

            {/* BOTTOM KITCHEN: Multi-stove Cooking Station */}
            <CookingStation
              unlockedBroths={unlockedBroths}
              unlockedToppings={unlockedToppings}
              activeBowl={bowlConfig}
              stoveCount={stoveCount}
              inventory={inventory}
              isCustomMode={screen === 'MY_RAMEN'}
              onServeRamen={screen === 'PLAYING' ? handleServeOrderRamen : handleServeCustomRamen}
              onMistakeTrigger={() => {
                setCheolwoongMood('shocked');
                setCheolwoongSpeech('앗! 냄비가 끓어넘칠 뻔했어! 조심해!');
              }}
              onOpenBowlCustomizer={() => setIsBowlCustomizerOpen(true)}
            />
          </main>
        </div>
      )}

      {/* POST-SERVE RESULT POPUP MODAL */}
      {lastRating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs select-none animate-fade-in">
          <div className="relative max-w-md w-full bg-linear-to-b from-amber-50 to-orange-50 rounded-3xl p-6 shadow-2xl border-4 border-amber-400 flex flex-col items-center text-center">
            {/* Stars */}
            <div className="flex items-center gap-1 text-3xl mb-2 text-yellow-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`transition-transform duration-300 ${
                    i < lastRating.rating.stars ? 'scale-110 drop-shadow-md' : 'opacity-30'
                  }`}
                >
                  ★
                </span>
              ))}
            </div>

            <h3 className="font-jua text-2xl text-amber-950 mb-1">
              {lastRating.rating.stars === 5
                ? '✨ PERFECT! 전설의 라면! ✨'
                : lastRating.rating.stars >= 4
                ? '대만족! 아주 맛있어요!'
                : lastRating.rating.stars >= 3
                ? '괜찮네요, 잘 먹었습니다!'
                : '앗... 조금 아쉬웠어요!'}
            </h3>

            {/* Customer Quote */}
            <div className="bg-white/90 border border-amber-200 rounded-2xl p-3 my-3 text-xs sm:text-sm text-slate-800 font-medium">
              "{lastRating.rating.feedback}"
            </div>

            {/* Earned Coins */}
            <div className="flex items-center gap-1.5 px-4 py-2 bg-amber-100 rounded-full border border-amber-300 font-jua text-amber-900 text-lg mb-4">
              <Coins className="w-5 h-5 text-amber-600 fill-amber-500" />
              <span>+{lastRating.rating.earnedCoins} 코인 획득!</span>
            </div>

            {/* Actions: Snap Polaroid or Continue */}
            <div className="w-full flex gap-2.5">
              <button
                onClick={handleSnapPhotoCard}
                className="flex-1 py-3 bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-jua text-sm rounded-2xl shadow transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>📸 사진 카드 찰칵!</span>
              </button>

              <button
                onClick={handleProceedToNextCustomer}
                className="flex-1 py-3 bg-white hover:bg-amber-100 text-amber-950 font-jua text-sm rounded-2xl border-2 border-amber-300 shadow-xs transition cursor-pointer"
              >
                <span>다음 손님 맞기 ↵</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ALL OVERLAY MODALS */}
      {isMarketOpen && (
        <MarketShopModal
          coins={coins}
          inventory={inventory}
          stoveCount={stoveCount}
          onUpdateCoins={setCoins}
          onUpdateInventory={setInventory}
          onUpdateStoveCount={setStoveCount}
          onClose={() => setIsMarketOpen(false)}
        />
      )}

      {isChatOpen && (
        <CheolwoongChatModal
          affinity={affinity}
          profile={profile}
          inventory={inventory}
          onUpdateAffinity={setAffinity}
          onUpdateInventory={setInventory}
          onClose={() => setIsChatOpen(false)}
        />
      )}

      {isDiaryOpen && (
        <MemoryDiaryModal affinity={affinity} onClose={() => setIsDiaryOpen(false)} />
      )}

      {isBowlCustomizerOpen && (
        <BowlCustomizerModal
          currentBowl={bowlConfig}
          onSaveBowl={setBowlConfig}
          onClose={() => setIsBowlCustomizerOpen(false)}
        />
      )}

      {isAchievementsOpen && (
        <AchievementsModal
          achievements={achievements}
          coins={coins}
          onUpdateCoins={setCoins}
          onUpdateAchievements={setAchievements}
          onClose={() => setIsAchievementsOpen(false)}
        />
      )}

      {isSettingsOpen && (
        <SettingsModal
          settings={settings}
          onSaveSettings={setSettings}
          onResetAllData={handleResetAllData}
          onClose={() => setIsSettingsOpen(false)}
        />
      )}

      {isAlbumOpen && (
        <AlbumModal
          cards={albumCards}
          isOpen={isAlbumOpen}
          onClose={() => setIsAlbumOpen(false)}
          onSelectCard={(c) => setActivePhotoCard(c)}
          onDeleteCard={(id) => {
            GameStorage.deleteAlbumCard(id);
            setAlbumCards(GameStorage.getAlbumCards());
          }}
        />
      )}

      {activePhotoCard && (
        <PhotoCardModal
          card={activePhotoCard}
          isOpen={!!activePhotoCard}
          onClose={() => setActivePhotoCard(null)}
        />
      )}

      {isDaySummaryOpen && (
        <DaySummaryModal
          day={day}
          isOpen={isDaySummaryOpen}
          earnedCoins={dayEarnedCoins}
          servedCount={dayServedCount}
          perfectCount={dayPerfectCount}
          leftCount={dayLeftCount}
          ingredientCost={Math.round(dayEarnedCoins * 0.2)}
          onNextDay={handleNextDay}
          onOpenShop={() => {
            setIsDaySummaryOpen(false);
            setIsMarketOpen(true);
          }}
        />
      )}
    </div>
  );
}

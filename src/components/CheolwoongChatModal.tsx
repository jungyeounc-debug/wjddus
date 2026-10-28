/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CheolwoongAffinity, CheolwoongMood, DialogueChoice, PlayerProfile } from '../types/game';
import { soundManager } from '../utils/audio';
import { CHEF_GOLDEN_TIPS, DAD_JOKES } from '../utils/gameData';
import { GameStorage } from '../utils/storage';
import { CheolwoongAvatar } from './CheolwoongAvatar';
import { CheolwoongDialogBox } from './CheolwoongDialogBox';
import { Heart, Sparkles, X, Coffee, Lightbulb, Smile, History, Gift } from 'lucide-react';

interface CheolwoongChatModalProps {
  affinity: CheolwoongAffinity;
  profile: PlayerProfile;
  inventory: Record<string, number>;
  onUpdateAffinity: (newAffinity: CheolwoongAffinity) => void;
  onUpdateInventory: (newInv: Record<string, number>) => void;
  onClose: () => void;
}

export const CheolwoongChatModal: React.FC<CheolwoongChatModalProps> = ({
  affinity,
  profile,
  inventory,
  onUpdateAffinity,
  onUpdateInventory,
  onClose,
}) => {
  const [currentText, setCurrentText] = useState<string>(
    `"어이 ${profile.name}! 바쁜 와중에도 날 찾아왔냐? 그래, 무슨 일 있어?"`
  );
  const [currentMood, setCurrentMood] = useState<CheolwoongMood>('normal');
  const [choices, setChoices] = useState<DialogueChoice[]>([]);
  const [giftFeedback, setGiftFeedback] = useState<string | null>(null);

  // Add affinity points helper
  const addAffinityPoints = (delta: number) => {
    let nextPoints = affinity.points + delta;
    let nextLevel = affinity.level;
    const max = affinity.maxPoints;

    while (nextPoints >= max && nextLevel < 5) {
      nextPoints -= max;
      nextLevel += 1;
      soundManager.playFanfare();
    }

    const updated: CheolwoongAffinity = {
      ...affinity,
      level: nextLevel,
      points: Math.min(nextPoints, max),
      unlockedStories: Array.from(new Set([...affinity.unlockedStories, nextLevel])),
    };

    onUpdateAffinity(updated);
    GameStorage.setAffinity(updated);
  };

  // 1. Mood check
  const handleAskMood = () => {
    soundManager.playClick();
    const moodPhrases = [
      {
        text: `"오늘 컨디션 최고다! 주방 화구 불꽃만 봐도 가슴이 뛴다구. 너랑 함께 일해서 그런가 봐!"`,
        mood: 'smile' as CheolwoongMood,
        delta: 4,
      },
      {
        text: `"살짝 허리가 뻐근하긴 한데 손님들 맛있게 먹는 모습 보면 씻은 듯이 낫지. 너도 무리하진 마라!"`,
        mood: 'touched' as CheolwoongMood,
        delta: 5,
      },
      {
        text: `"어제 새로 개발한 마라 비빔 소스 생각하느라 밤잠을 설쳤더니 눈이 가물가물하네, 하하!"`,
        mood: 'sleepy' as CheolwoongMood,
        delta: 3,
      },
    ];
    const picked = moodPhrases[Math.floor(Math.random() * moodPhrases.length)];
    setCurrentMood(picked.mood);
    setCurrentText(picked.text);
    setChoices([]);
    addAffinityPoints(picked.delta);
  };

  // 2. Secret chef tips
  const handleAskTips = () => {
    soundManager.playClick();
    const tip = CHEF_GOLDEN_TIPS[Math.floor(Math.random() * CHEF_GOLDEN_TIPS.length)];
    setCurrentMood('serious');
    setCurrentText(`"잘 들어둬라! [${tip.title}]: ${tip.content}"`);
    setChoices([]);
    addAffinityPoints(3);
  };

  // 3. Old memories
  const handleAskHistory = () => {
    soundManager.playClick();
    const stories = [
      {
        text: `"내가 스무 살 때 종로 골목 라면집에서 맨 처음 배운 게 양은냄비 닦기였어. 바닥이 거울처럼 번쩍일 때까지 닦아야 육수를 만지게 해줬지. 넌 벌써 국물을 잘 다루니 대단한 녀석이야."`,
        mood: 'touched' as CheolwoongMood,
      },
      {
        text: `"이 '연라면'이라는 간판 말이다... '인연 연(緣)' 자를 써서 지은 거야. 한 그릇의 라면으로 따뜻한 사람의 인연을 맺고 싶었거든. 너와의 만남도 소중한 인연이지."`,
        mood: 'smile' as CheolwoongMood,
      },
      {
        text: `"어릴 때 비 오는 날 어머니가 끓여주신 김치 콩나물 라면 맛을 아직도 잊지 못해. 그 한 그릇이 너무 따뜻해서 나도 요리사가 되기로 마음먹었단다."`,
        mood: 'touched' as CheolwoongMood,
      },
    ];
    const picked = stories[Math.floor(Math.random() * stories.length)];
    setCurrentMood(picked.mood);
    setCurrentText(picked.text);
    setChoices([]);
    addAffinityPoints(5);
  };

  // 4. Dad jokes
  const handleAskDadJoke = () => {
    soundManager.playClick();
    const joke = DAD_JOKES[Math.floor(Math.random() * DAD_JOKES.length)];
    setCurrentMood('smile');
    setCurrentText(`"크흠, 어디 하나 들려줄까? ${joke.q} 정답은... ${joke.a} 푸하하하! 기가 막히지 않냐?!"`);
    setChoices([
      {
        text: '푸하하! 사장님 너무 웃겨요!!',
        affinityDelta: 6,
        cheolwoongReply: '역시 내 개그를 알아주는 건 너밖에 없다니까!',
        replyMood: 'smile',
      },
      {
        text: '사장님... 얼른 라면이나 끓이시죠...',
        affinityDelta: 2,
        cheolwoongReply: '으흠! 너무 냉정한 거 아니냐?! 그래도 귀엽다 임마!',
        replyMood: 'pout',
      },
    ]);
    addAffinityPoints(3);
  };

  // 5. Gift giving
  const handleGiveGift = (itemId: string, itemName: string, giftBonus: number) => {
    const qty = inventory[itemId] || 0;
    if (qty <= 0) {
      soundManager.playMistake();
      setGiftFeedback(`가방에 [${itemName}]이(가) 없습니다! 마트에서 사 와주세요.`);
      return;
    }

    soundManager.playHeartChime();
    const newInv = { ...inventory, [itemId]: qty - 1 };
    onUpdateInventory(newInv);
    GameStorage.setInventory(newInv);
    addAffinityPoints(giftBonus);

    const giftResponses: Record<string, string> = {
      snack_fishbread: `"헉! 이건 따끈따끈한 팥 붕어빵 아니냐?! 겉은 바삭하고 속은 달콤하고... 고맙다 ${profile.name}야, 힘이 펄펄 난다!"`,
      snack_coffee: `"캬~ 역시 피로회복엔 노란 믹스커피가 최고지! 딱 털어 마시니까 정신이 번쩍 드네! 넌 정말 센스쟁이야!"`,
      snack_hotteok: `"우와! 꿀이 뚝뚝 떨어지는 호떡이잖아?! 손 데일 뻔했네, 하하! 너무 맛있다!"`,
      snack_milk: `"시원한 딸기우유라니! 내가 단 거 좋아하는 거 어떻게 알았냐? 감동이다..."`,
      snack_hotdog: `"설탕 듬뿍 케첩 뿌린 핫도그! 옛날 생각나네. 정말 든든하다!"`,
    };

    setCurrentMood('touched');
    setCurrentText(giftResponses[itemId] || `"선물 고맙다! 네 마음이 너무 따뜻하구나!"`);
    setGiftFeedback(`[${itemName}] 선물 성공! 사장님 호감도 +${giftBonus}! ❤️`);
    setChoices([]);
  };

  const giftItems = [
    { id: 'snack_fishbread', name: '붕어빵', emoji: '🐟', bonus: 15 },
    { id: 'snack_coffee', name: '믹스커피', emoji: '☕', bonus: 12 },
    { id: 'snack_hotteok', name: '호떡', emoji: '🥞', bonus: 14 },
    { id: 'snack_milk', name: '딸기우유', emoji: '🍓', bonus: 10 },
    { id: 'snack_hotdog', name: '핫도그', emoji: '🌭', bonus: 12 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-linear-to-b from-amber-50 via-orange-50 to-amber-100 border-4 border-amber-500 rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-amber-300 pb-3 mb-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-11 h-11 rounded-2xl bg-amber-100 border-2 border-amber-400 overflow-hidden flex items-center justify-center shadow-md p-0.5">
              <CheolwoongAvatar mood={currentMood} size="sm" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-amber-700">철웅 사장님과의 티타임</span>
              <h2 className="text-xl sm:text-2xl font-black text-amber-950 font-jua">
                사장님한테 말 걸기
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Affinity gauge */}
            <div className="flex items-center gap-1.5 px-3 py-1 bg-pink-100 border border-pink-300 rounded-full text-xs font-bold text-pink-700 shadow-xs">
              <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500 animate-pulse" />
              <span>
                Lv.{affinity.level} ({affinity.points}/{affinity.maxPoints})
              </span>
            </div>
            <button
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="w-8 h-8 rounded-full bg-amber-200 hover:bg-amber-300 text-amber-900 flex items-center justify-center font-bold transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Gift feedback notification */}
        {giftFeedback && (
          <div className="mb-2 px-3 py-1.5 bg-pink-500 text-white text-xs font-bold rounded-xl text-center shadow animate-fade-in">
            {giftFeedback}
          </div>
        )}

        {/* Live Cheolwoong Dialogue Box */}
        <div className="mb-4 shrink-0">
          <CheolwoongDialogBox
            mood={currentMood}
            text={currentText}
            choices={choices}
            onSelectChoice={(c) => {
              setCurrentMood(c.replyMood);
              setCurrentText(c.cheolwoongReply);
              setChoices([]);
              addAffinityPoints(c.affinityDelta);
            }}
          />
        </div>

        {/* Conversation Action Menu */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <button
              onClick={handleAskMood}
              className="p-3 rounded-2xl bg-white hover:bg-amber-100 border-2 border-amber-300 hover:border-amber-500 text-left transition active:scale-95 shadow-xs flex items-center gap-3 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-xl shrink-0">
                😊
              </div>
              <div>
                <h4 className="font-jua text-sm text-amber-950">오늘 기분 어떠세요?</h4>
                <p className="text-[11px] text-slate-500">사장님의 현재 컨디션 묻기</p>
              </div>
            </button>

            <button
              onClick={handleAskTips}
              className="p-3 rounded-2xl bg-white hover:bg-amber-100 border-2 border-amber-300 hover:border-amber-500 text-left transition active:scale-95 shadow-xs flex items-center gap-3 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-xl shrink-0">
                💡
              </div>
              <div>
                <h4 className="font-jua text-sm text-amber-950">라면 비법 좀 알려주세요!</h4>
                <p className="text-[11px] text-slate-500">물·불·면 타이밍 꿀팁 전수</p>
              </div>
            </button>

            <button
              onClick={handleAskHistory}
              className="p-3 rounded-2xl bg-white hover:bg-amber-100 border-2 border-amber-300 hover:border-amber-500 text-left transition active:scale-95 shadow-xs flex items-center gap-3 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-xl shrink-0">
                📜
              </div>
              <div>
                <h4 className="font-jua text-sm text-amber-950">사장님 옛날이야기</h4>
                <p className="text-[11px] text-slate-500">라면 청년 시절의 추억</p>
              </div>
            </button>

            <button
              onClick={handleAskDadJoke}
              className="p-3 rounded-2xl bg-white hover:bg-amber-100 border-2 border-amber-300 hover:border-amber-500 text-left transition active:scale-95 shadow-xs flex items-center gap-3 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-xl shrink-0">
                🤣
              </div>
              <div>
                <h4 className="font-jua text-sm text-amber-950">아재개그 해주세요</h4>
                <p className="text-[11px] text-slate-500">썰렁하지만 정겨운 유머</p>
              </div>
            </button>
          </div>

          {/* Snacks & Gifts Section */}
          <div className="bg-white/95 rounded-2xl p-3.5 border-2 border-pink-200 shadow-xs">
            <div className="flex items-center gap-2 mb-2">
              <Gift className="w-4 h-4 text-pink-600" />
              <h4 className="font-jua text-sm text-pink-950">
                🎁 간식 선물하기 (친밀도 대폭 상승!)
              </h4>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {giftItems.map((g) => {
                const count = inventory[g.id] || 0;
                return (
                  <button
                    key={g.id}
                    onClick={() => handleGiveGift(g.id, g.name, g.bonus)}
                    className="p-2 rounded-xl border border-pink-200 hover:border-pink-400 bg-pink-50/50 hover:bg-pink-100 flex flex-col items-center justify-center gap-1 transition active:scale-95 cursor-pointer"
                  >
                    <span className="text-2xl">{g.emoji}</span>
                    <span className="text-xs font-bold text-pink-950">{g.name}</span>
                    <span className="text-[10px] text-slate-600">보유: {count}개</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-amber-200 flex justify-end shrink-0">
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="py-2 px-5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs font-jua shadow transition active:scale-95 cursor-pointer"
          >
            대화 마치기
          </button>
        </div>
      </div>
    </div>
  );
};

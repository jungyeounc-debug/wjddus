/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type RamenCategory = 'soup' | 'stir' | 'bibim' | 'jjajang'; // 국물라면, 볶음라면, 비빔라면, 짜장라면
export type NoodleType = 'basic' | 'chewy' | 'thin' | 'flat' | 'udon'; // 기본면, 쫄깃면, 얇은면, 넓적면, 우동면
export type WaterLevel = 'less' | 'normal' | 'more';
export type FlameLevel = 'low' | 'med' | 'high'; // 약불, 중불, 강불
export type NoodleDoneness = 'firm' | 'normal' | 'soft';
export type EggType = 'none' | 'raw' | 'soft' | 'hard' | 'beaten'; // 없음, 날계란, 반숙, 완숙, 풀어서
export type SpicyLevel = 0 | 1 | 2 | 3 | 4 | 5; // 고춧가루 0~5단계
export type SideDish = 'danmuji' | 'kimchi' | 'rice' | 'coke' | 'none'; // 곁들임

export type BrothType =
  // 국물라면
  | 'mild'
  | 'spicy'
  | 'super_spicy'
  | 'seafood'
  | 'kimchi'
  | 'bone'
  | 'rose'
  | 'mara'
  | 'curry'
  // 볶음라면
  | 'stir_buldak'
  | 'stir_rose'
  | 'stir_oil'
  | 'stir_jjajang'
  | 'stir_bibim'
  // 비빔라면
  | 'bibim_apple'
  | 'bibim_sour'
  // 짜장라면
  | 'jjajang_classic'
  | 'jjajang_truffle';

export type ToppingId =
  | 'egg'
  | 'cheese'
  | 'green_onion'
  | 'rice_cake'
  | 'dumpling'
  | 'ham'
  | 'kimchi'
  | 'bean_sprout'
  | 'fish_cake'
  | 'chashu'
  | 'shrimp'
  | 'corn'
  | 'cheongyang_pepper'
  | 'seaweed'
  | 'mushroom'
  | 'squid'
  | 'sausage'
  | 'garlic'
  | 'tempura'
  | 'sesame';

export interface ToppingDef {
  id: ToppingId;
  name: string;
  emoji: string;
  color: string;
  category: 'basic' | 'unlocked';
  price: number;
  unlockedByDefault: boolean;
}

export interface BrothDef {
  id: BrothType;
  name: string;
  emoji: string;
  categoryType: RamenCategory;
  color: string;
  bubbleColor: string;
  flavorText: string;
  category: 'basic' | 'unlocked';
  price: number;
  unlockedByDefault: boolean;
}

export type BowlShape = 'classic_pot' | 'round_bowl' | 'flat_plate' | 'stone_pot' | 'large_bowl' | 'heart_bowl' | 'golden_pot';
export type BowlColor = 'yellow' | 'gold' | 'red' | 'blue' | 'mint' | 'pink' | 'black' | 'white';
export type BowlPattern = 'none' | 'dots' | 'stripes' | 'flower' | 'stars' | 'check' | 'traditional';
export type ChopsticksType = 'wood' | 'metal' | 'bamboo' | 'gold';
export type TrayColor = 'wood' | 'red' | 'blue' | 'mint' | 'pink' | 'none';

export interface BowlCustomization {
  shape: BowlShape;
  color: BowlColor;
  pattern: BowlPattern;
  chopsticks: ChopsticksType;
  tray: TrayColor;
}

export interface PlayerProfile {
  name: string;
  title: string;
  apronColor: 'navy' | 'red' | 'yellow' | 'mint' | 'pink' | 'black' | 'white';
  hatType: 'none' | 'chef' | 'bandana' | 'beanie' | 'ribbon';
  level: number;
  xp: number;
  maxXp: number;
}

export type CheolwoongMood = 'normal' | 'smile' | 'touched' | 'shocked' | 'pout' | 'serious' | 'sleepy';

export interface CheolwoongAffinity {
  level: number; // 1 to 5
  points: number; // 0 to 100 per level
  maxPoints: number;
  unlockedStories: number[]; // e.g. [1, 2]
}

export interface MarketItem {
  id: string;
  name: string;
  category: 'noodle' | 'topping' | 'broth' | 'side' | 'snack';
  emoji: string;
  basePrice: number;
  currentPrice: number; // dynamic daily price
  stockUnit: number; // e.g. buy 5 at a time
  desc: string;
}

export interface CustomerOrder {
  category?: RamenCategory;
  ramenCategory?: RamenCategory; // backwards-compatible alias
  noodleType?: NoodleType;
  waterLevel: WaterLevel;
  broth: BrothType;
  spicyLevel?: SpicyLevel;
  noodleDoneness?: NoodleDoneness;
  noodle?: NoodleDoneness; // backwards-compatible alias
  eggType?: EggType;
  toppings: ToppingId[];
  sideDish?: SideDish;
  prefersPrettyBowl?: boolean;
  specialRequest?: string;
}

export type CustomerRole = 'regular' | 'office' | 'kid' | 'spicy_lover' | 'vip_regular' | 'critic' | 'student' | 'grandma';

export interface Customer {
  id: string;
  name: string;
  emoji: string;
  role: CustomerRole;
  isCritic: boolean;
  isVipRegular?: boolean;
  dialogueGreeting: string;
  dialogueSuccess: string;
  dialogueFailed: string;
  order: CustomerOrder;
  maxPatience: number;
  currentPatience: number;
  regularDishName?: string;
}

export interface PlacedTopping {
  id: ToppingId;
  xPercent: number; // 0 to 100 inside bowl
  yPercent: number;
  rotation: number;
  scale: number;
}

export interface CookedRamen {
  category?: RamenCategory;
  ramenCategory?: RamenCategory; // alias
  noodleType?: NoodleType;
  waterLevel: WaterLevel;
  broth: BrothType;
  spicyLevel?: SpicyLevel;
  noodleDoneness?: NoodleDoneness;
  noodle?: NoodleDoneness; // alias
  eggType?: EggType;
  toppings: ToppingId[];
  placedToppings?: PlacedTopping[];
  sideDish?: SideDish;
  bowl?: BowlCustomization;
  bowlSkinId?: string;
  title: string;
  customName?: string;
  cookedAt: string;
  cookedDay?: number;
}

export interface RamenRating {
  stars: number; // 1 to 5
  scorePercent: number;
  feedback: string;
  details?: any;
  earnedCoins: number;
  earnedXp?: number;
  tipCoins?: number;
  isCriticBonus: boolean;
  deductions?: string[];
  bonuses?: string[];
  cheolwoongReaction?: string;
  cheolwoongMood?: CheolwoongMood;
}

export interface BowlSkin {
  id: string;
  name: string;
  emoji?: string;
  category?: string;
  price: number;
  unlockedByDefault?: boolean;
  bowlColor: string;
  rimColor: string;
  pattern?: string;
}

export interface ShopDecor {
  id: string;
  name: string;
  desc?: string;
  description?: string;
  bonus?: string;
  emoji: string;
  price: number;
}

export interface PhotoCard {
  id: string;
  title: string;
  mode: 'order' | 'custom';
  ramen: CookedRamen;
  rating?: RamenRating;
  customerName?: string;
  customerComment?: string;
  customerEmoji?: string;
  playerName: string;
  borderColor: string;
  createdAt: string;
  dayNumber: number;
  cheolwoongSignature: string;
  cheolwoongComment: string;
}

export type DailyWeather = 'sunny' | 'rainy' | 'hot' | 'festival' | 'birthday';

export interface DailyEventInfo {
  weather: DailyWeather;
  title: string;
  desc: string;
  emoji: string;
  buffDesc: string;
  cheolwoongGreeting: string;
}

export interface GameSettings {
  difficulty: 'easy' | 'normal' | 'hard';
  serviceDuration: 60 | 90 | 120 | 180;
  customerSpeed: 'slow' | 'normal' | 'fast';
  bgmVolume: number; // 0 to 100
  sfxVolume: number; // 0 to 100
  theme: 'day' | 'night' | 'cherry' | 'snow';
  fontSize: 'small' | 'medium' | 'large';
  dialogSpeed: 'slow' | 'normal' | 'fast' | 'instant';
  nagFrequency: 'high' | 'normal' | 'low';
  reduceMotion: boolean;
  autoHint: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  desc: string;
  icon: string;
  rewardCoins: number;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

export interface DiaryStory {
  id: number;
  title: string;
  unlockedAtAffinityLevel: number;
  summary: string;
  fullStory: string;
  specialRewardName?: string;
  unlocked: boolean;
}

export interface DialogueChoice {
  text: string;
  affinityDelta: number;
  cheolwoongReply: string;
  replyMood: CheolwoongMood;
}

export interface DialogueNode {
  id: string;
  speaker: '철웅' | '시스템' | '손님';
  mood: CheolwoongMood;
  text: string;
  choices?: DialogueChoice[];
  onFinish?: () => void;
}

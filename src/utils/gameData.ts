/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Achievement,
  BowlColor,
  BowlPattern,
  BowlShape,
  BrothDef,
  ChopsticksType,
  CookedRamen,
  Customer,
  CustomerOrder,
  DailyEventInfo,
  DailyWeather,
  DiaryStory,
  MarketItem,
  NoodleType,
  RamenCategory,
  RamenRating,
  SideDish,
  SpicyLevel,
  ToppingDef,
  ToppingId,
  TrayColor,
  WaterLevel,
} from '../types/game';

// 1. 국물 & 소스 목록 (국물라면, 볶음라면, 비빔라면, 짜장라면)
export const BROTH_LIST: BrothDef[] = [
  // --- [국물라면 수프] ---
  {
    id: 'mild',
    name: '순한맛',
    emoji: '🍲',
    categoryType: 'soup',
    color: '#F59E0B',
    bubbleColor: '#FDE68A',
    flavorText: '자극적이지 않고 구수한 클래식 기본 국물',
    category: 'basic',
    price: 0,
    unlockedByDefault: true,
  },
  {
    id: 'spicy',
    name: '얼큰 매운맛',
    emoji: '🌶️',
    categoryType: 'soup',
    color: '#DC2626',
    bubbleColor: '#FCA5A5',
    flavorText: '칼칼하고 화끈한 한국인의 소울 국물',
    category: 'basic',
    price: 0,
    unlockedByDefault: true,
  },
  {
    id: 'super_spicy',
    name: '지옥불 매운맛',
    emoji: '🔥',
    categoryType: 'soup',
    color: '#991B1B',
    bubbleColor: '#EF4444',
    flavorText: '땀이 뻘뻘 나는 극한의 화끈한 매운맛',
    category: 'unlocked',
    price: 180,
    unlockedByDefault: false,
  },
  {
    id: 'seafood',
    name: '시원 해물',
    emoji: '🦐',
    categoryType: 'soup',
    color: '#D97706',
    bubbleColor: '#FED7AA',
    flavorText: '꽃게와 새우 향이 우러난 시원한 바다 국물',
    category: 'basic',
    price: 0,
    unlockedByDefault: true,
  },
  {
    id: 'kimchi',
    name: '얼큰 김치',
    emoji: '🥬',
    categoryType: 'soup',
    color: '#B91C1C',
    bubbleColor: '#FECACA',
    flavorText: '새콤 개운하게 우러난 칼칼 김치 국물',
    category: 'basic',
    price: 0,
    unlockedByDefault: true,
  },
  {
    id: 'bone',
    name: '사골 백탕',
    emoji: '🥣',
    categoryType: 'soup',
    color: '#FEF3C7',
    bubbleColor: '#FFFFFF',
    flavorText: '오랜 시간 푹 고아낸 뽀얗고 든든한 진국',
    category: 'unlocked',
    price: 150,
    unlockedByDefault: false,
  },
  {
    id: 'rose',
    name: '로제 크림',
    emoji: '🧀',
    categoryType: 'soup',
    color: '#FB923C',
    bubbleColor: '#FED7AA',
    flavorText: '고추장에 우유 생크림을 더한 부드러운 로제 국물',
    category: 'unlocked',
    price: 200,
    unlockedByDefault: false,
  },
  {
    id: 'mara',
    name: '얼얼 마라',
    emoji: '🌶️',
    categoryType: 'soup',
    color: '#7F1D1D',
    bubbleColor: '#F87171',
    flavorText: '화자오 향이 톡 쏘는 중독적인 특제 마라 국물',
    category: 'unlocked',
    price: 250,
    unlockedByDefault: false,
  },

  // --- [볶음라면 소스] ---
  {
    id: 'stir_buldak',
    name: '화끈 불닭 소스',
    emoji: '🔥',
    categoryType: 'stir',
    color: '#7F1D1D',
    bubbleColor: '#DC2626',
    flavorText: '스트레스가 싹 풀리는 화끈 중독 볶음 소스',
    category: 'basic',
    price: 0,
    unlockedByDefault: true,
  },
  {
    id: 'stir_rose',
    name: '꾸덕 로제 소스',
    emoji: '🧀',
    categoryType: 'stir',
    color: '#EA580C',
    bubbleColor: '#FED7AA',
    flavorText: '매콤 고추장과 생크림이 만나 꾸덕한 로제 볶음 소스',
    category: 'unlocked',
    price: 160,
    unlockedByDefault: false,
  },
  {
    id: 'stir_oil',
    name: '파기름 간장 소스',
    emoji: '🍳',
    categoryType: 'stir',
    color: '#A16207',
    bubbleColor: '#FEF08A',
    flavorText: '대파 불향과 진간장의 감칠맛이 도는 볶음 소스',
    category: 'unlocked',
    price: 140,
    unlockedByDefault: false,
  },

  // --- [비빔라면 소스] ---
  {
    id: 'bibim_apple',
    name: '사과 비빔장',
    emoji: '🍎',
    categoryType: 'bibim',
    color: '#B91C1C',
    bubbleColor: '#F87171',
    flavorText: '달콤한 사과 과즙과 참기름이 입맛 돋우는 비빔장',
    category: 'basic',
    price: 0,
    unlockedByDefault: true,
  },
  {
    id: 'bibim_sour',
    name: '초고추장 비빔장',
    emoji: '🍋',
    categoryType: 'bibim',
    color: '#DC2626',
    bubbleColor: '#FECACA',
    flavorText: '새콤한 식초 향이 톡 쏘는 개운한 여름 비빔장',
    category: 'unlocked',
    price: 150,
    unlockedByDefault: false,
  },

  // --- [짜장라면 소스] ---
  {
    id: 'jjajang_classic',
    name: '클래식 춘장 짜장',
    emoji: '🥢',
    categoryType: 'jjajang',
    color: '#27170E',
    bubbleColor: '#451A03',
    flavorText: '달콤 짭조름 양파와 춘장을 볶아낸 국민 짜파게티 소스',
    category: 'basic',
    price: 0,
    unlockedByDefault: true,
  },
  {
    id: 'jjajang_truffle',
    name: '트러플 오일 짜장',
    emoji: '🍄',
    categoryType: 'jjajang',
    color: '#1C1917',
    bubbleColor: '#44403C',
    flavorText: '향긋한 트러플 오일 풍미가 고급스러운 특제 짜장 소스',
    category: 'unlocked',
    price: 220,
    unlockedByDefault: false,
  },
];

// 2. 토핑 20종 목록
export const TOPPING_LIST: ToppingDef[] = [
  { id: 'egg', name: '계란', emoji: '🥚', color: '#FCD34D', category: 'basic', price: 0, unlockedByDefault: true },
  { id: 'cheese', name: '치즈', emoji: '🧀', color: '#FDE047', category: 'basic', price: 0, unlockedByDefault: true },
  { id: 'green_onion', name: '파 송송', emoji: '🧅', color: '#4ADE80', category: 'basic', price: 0, unlockedByDefault: true },
  { id: 'rice_cake', name: '쫄깃 떡', emoji: '🍡', color: '#F3F4F6', category: 'basic', price: 0, unlockedByDefault: true },
  { id: 'dumpling', name: '손만두', emoji: '🥟', color: '#E5E7EB', category: 'basic', price: 0, unlockedByDefault: true },
  { id: 'ham', name: '스팸/햄', emoji: '🥓', color: '#F472B6', category: 'basic', price: 0, unlockedByDefault: true },
  { id: 'kimchi', name: '익은 김치', emoji: '🥬', color: '#EF4444', category: 'basic', price: 0, unlockedByDefault: true },
  { id: 'bean_sprout', name: '아삭 콩나물', emoji: '🌱', color: '#BBF7D0', category: 'basic', price: 0, unlockedByDefault: true },
  { id: 'fish_cake', name: '부산 어묵', emoji: '🍥', color: '#FBCFE8', category: 'basic', price: 0, unlockedByDefault: true },
  { id: 'seaweed', name: '바삭 김', emoji: '🍙', color: '#1E293B', category: 'basic', price: 0, unlockedByDefault: true },
  { id: 'mushroom', name: '표고버섯', emoji: '🍄', color: '#78350F', category: 'basic', price: 0, unlockedByDefault: true },
  { id: 'sausage', name: '문어 비엔나', emoji: '🌭', color: '#E11D48', category: 'basic', price: 0, unlockedByDefault: true },
  { id: 'garlic', name: '다진 마늘', emoji: '🧄', color: '#FEF08A', category: 'basic', price: 0, unlockedByDefault: true },
  { id: 'sesame', name: '고소한 깨소금', emoji: '✨', color: '#FBBF24', category: 'basic', price: 0, unlockedByDefault: true },

  // 해금 프리미엄 토핑
  { id: 'chashu', name: '두툼 차슈', emoji: '🥩', color: '#78350F', category: 'unlocked', price: 120, unlockedByDefault: false },
  { id: 'shrimp', name: '통통 새우', emoji: '🍤', color: '#FB923C', category: 'unlocked', price: 140, unlockedByDefault: false },
  { id: 'corn', name: '옥수수콘', emoji: '🌽', color: '#FACC15', category: 'unlocked', price: 80, unlockedByDefault: false },
  { id: 'cheongyang_pepper', name: '청양고추', emoji: '🌶️', color: '#16A34A', category: 'unlocked', price: 90, unlockedByDefault: false },
  { id: 'squid', name: '탱글 오징어', emoji: '🦑', color: '#E11D48', category: 'unlocked', price: 130, unlockedByDefault: false },
  { id: 'tempura', name: '튀김가루', emoji: '🍘', color: '#FBBF24', category: 'unlocked', price: 70, unlockedByDefault: false },
];

// 3. 면 종류
export interface NoodleTypeDef {
  id: NoodleType;
  name: string;
  shortName: string;
  emoji: string;
  desc: string;
  speedDesc: string;
  cookDurationMultiplier: number;
  greenZone: { firmMax: number; normalMax: number };
  colorHex: string;
}

export const NOODLE_TYPES: NoodleTypeDef[] = [
  {
    id: 'basic',
    name: '기본면',
    shortName: '기본면',
    emoji: '🍜',
    desc: '기본면 · 표준적인 조리시간',
    speedDesc: '표준 조리',
    cookDurationMultiplier: 1.0,
    greenZone: { firmMax: 42, normalMax: 76 },
    colorHex: '#FDE047',
  },
  {
    id: 'chewy',
    name: '쫄깃면',
    shortName: '쫄깃면',
    emoji: '🥢',
    desc: '쫄깃면 · 조금 천천히 익어요, 탄력만점!',
    speedDesc: '조금 느림 (탄력)',
    cookDurationMultiplier: 1.2,
    greenZone: { firmMax: 45, normalMax: 78 },
    colorHex: '#F59E0B',
  },
  {
    id: 'thin',
    name: '얇은면',
    shortName: '얇은면',
    emoji: '🍲',
    desc: '얇은면 · 가장 빨리 익어요, 호로록!',
    speedDesc: '가장 빠름 ⚡',
    cookDurationMultiplier: 0.72,
    greenZone: { firmMax: 35, normalMax: 68 },
    colorHex: '#FEF9C3',
  },
  {
    id: 'flat',
    name: '넓적면',
    shortName: '넓적면',
    emoji: '🥓',
    desc: '넓적면 · 조금 천천히 익어요, 쫀득식감!',
    speedDesc: '조금 느림 (쫀득)',
    cookDurationMultiplier: 1.2,
    greenZone: { firmMax: 45, normalMax: 78 },
    colorHex: '#FDE68A',
  },
  {
    id: 'udon',
    name: '우동면',
    shortName: '우동면',
    emoji: '🥣',
    desc: '우동면 · 가장 천천히 익어요, 든든함!',
    speedDesc: '가장 느림 ⏳',
    cookDurationMultiplier: 1.55,
    greenZone: { firmMax: 50, normalMax: 82 },
    colorHex: '#FFFBEB',
  },
];

// 4. 그릇 꾸미기 세부 옵션
export const BOWL_SHAPES: { id: BowlShape; name: string; emoji: string; desc: string }[] = [
  { id: 'classic_pot', name: '추억의 양은냄비', emoji: '🥘', desc: '열전도율 최고인 국민 냄비' },
  { id: 'round_bowl', name: '동그란 국그릇', emoji: '🥣', desc: '단정하고 깊이감 있는 사기그릇' },
  { id: 'flat_plate', name: '넓은 볶음 접시', emoji: '🍽️', desc: '볶음면과 비빔면에 어울리는 접시' },
  { id: 'stone_pot', name: '뜨끈 뚝배기', emoji: '🍲', desc: '마지막 국물까지 식지 않는 뚝배기' },
  { id: 'large_bowl', name: '큰 대접', emoji: '🍜', desc: '푸짐한 곱빼기용 큰 그릇' },
  { id: 'heart_bowl', name: '러블리 하트그릇', emoji: '💖', desc: '사랑이 담긴 귀여운 하트 모양' },
  { id: 'golden_pot', name: '장인의 황금냄비', emoji: '👑', desc: '빛나는 연라면 명예의 황금 냄비' },
];

export const BOWL_COLORS: { id: BowlColor; name: string; hex: string; bgHex: string; rimHex: string }[] = [
  { id: 'yellow', name: '양은 노랑', hex: '#F59E0B', bgHex: '#FBBF24', rimHex: '#D97706' },
  { id: 'gold', name: '황금빛', hex: '#EAB308', bgHex: '#FACC15', rimHex: '#B45309' },
  { id: 'white', name: '깔끔 화이트', hex: '#F8FAFC', bgHex: '#FFFFFF', rimHex: '#E2E8F0' },
  { id: 'black', name: '모던 블랙', hex: '#1E293B', bgHex: '#334155', rimHex: '#0F172A' },
  { id: 'red', name: '열정 레드', hex: '#EF4444', bgHex: '#F87171', rimHex: '#B91C1C' },
  { id: 'mint', name: '분식 민트', hex: '#10B981', bgHex: '#34D399', rimHex: '#047857' },
  { id: 'pink', name: '딸기 핑크', hex: '#F472B6', bgHex: '#F472B6', rimHex: '#BE185D' },
  { id: 'blue', name: '시원 블루', hex: '#3B82F6', bgHex: '#60A5FA', rimHex: '#1D4ED8' },
];

export const BOWL_PATTERNS: { id: BowlPattern; name: string; desc: string }[] = [
  { id: 'none', name: '민무늬', desc: '깔끔한 단색' },
  { id: 'dots', name: '분식집 물방울', desc: '레트로 멜라민 점무늬' },
  { id: 'stripes', name: '경쾌한 줄무늬', desc: '테두리 스트라이프' },
  { id: 'flower', name: '봄빛 벚꽃', desc: '화사한 꽃잎 무늬' },
  { id: 'stars', name: '반짝 별빛', desc: '귀여운 별무리' },
  { id: 'check', name: '아기자기 체크', desc: '클래식 격자' },
  { id: 'traditional', name: '한국 전통 문양', desc: '단아한 기와 문양' },
];

export const CHOPSTICKS_LIST: { id: ChopsticksType; name: string; emoji: string; desc: string }[] = [
  { id: 'wood', name: '나무 젓가락', emoji: '🥢', desc: '정겨운 분식집 나무 젓가락' },
  { id: 'metal', name: '전통 쇠젓가락', emoji: '🥄', desc: '찰진 손맛의 한국식 쇠수저' },
  { id: 'bamboo', name: '대나무 젓가락', emoji: '🎋', desc: '가볍고 그립감 좋은 대나무 수저' },
  { id: 'gold', name: '황금 수저 세트', emoji: '✨', desc: '부귀영화를 부르는 황금 수저' },
];

export const TRAYS_LIST: { id: TrayColor; name: string; hex: string }[] = [
  { id: 'wood', name: '우드 트레이', hex: '#78350F' },
  { id: 'mint', name: '민트 트레이', hex: '#059669' },
  { id: 'red', name: '레트로 레드', hex: '#DC2626' },
  { id: 'pink', name: '파스텔 핑크', hex: '#DB2777' },
  { id: 'blue', name: '클래식 블루', hex: '#2563EB' },
  { id: 'none', name: '트레이 없음', hex: 'transparent' },
];

// 5. 시장 장보기 품목 (매일 가격 변동)
export const MARKET_BASE_ITEMS: MarketItem[] = [
  { id: 'noodle_pack', name: '신선한 면사리 세트', category: 'noodle', emoji: '🍜', basePrice: 20, currentPrice: 20, stockUnit: 5, desc: '주문마다 소모되는 라면 면발 5개' },
  { id: 'egg_pack', name: '신선한 달걀 1판', category: 'topping', emoji: '🥚', basePrice: 25, currentPrice: 25, stockUnit: 5, desc: '달걀 토핑 5개' },
  { id: 'green_onion_bundle', name: '싱싱한 대파 한 단', category: 'topping', emoji: '🧅', basePrice: 15, currentPrice: 15, stockUnit: 5, desc: '파 송송 토핑 5개' },
  { id: 'cheese_pack', name: '체다 슬라이스 치즈', category: 'topping', emoji: '🧀', basePrice: 30, currentPrice: 30, stockUnit: 5, desc: '치즈 토핑 5개' },
  { id: 'ham_pack', name: '두툼 스팸 햄', category: 'topping', emoji: '🥓', basePrice: 35, currentPrice: 35, stockUnit: 5, desc: '스팸/햄 토핑 5개' },
  { id: 'kimchi_jar', name: '숙성 배추김치', category: 'topping', emoji: '🥬', basePrice: 20, currentPrice: 20, stockUnit: 5, desc: '김치 토핑 및 곁들임 5회분' },
  { id: 'danmuji_pack', name: '아삭 노란 단무지', category: 'side', emoji: '🟡', basePrice: 15, currentPrice: 15, stockUnit: 5, desc: '단무지 곁들임 5회분' },
  { id: 'rice_bowl', name: '고슬고슬 갓 지은 밥', category: 'side', emoji: '🍚', basePrice: 20, currentPrice: 20, stockUnit: 5, desc: '공깃밥 곁들임 5회분' },
  { id: 'coke_can', name: '시원한 캔음료', category: 'side', emoji: '🥤', basePrice: 25, currentPrice: 25, stockUnit: 5, desc: '음료수 곁들임 5캔' },

  // 사장님 선물용 간식
  { id: 'snack_fishbread', name: '따끈 바삭 팥 붕어빵', category: 'snack', emoji: '🐟', basePrice: 50, currentPrice: 50, stockUnit: 1, desc: '철웅 사장님이 가장 좋아하는 국민 간식 (+친밀도 대폭 UP)' },
  { id: 'snack_coffee', name: '달달한 노란 믹스커피', category: 'snack', emoji: '☕', basePrice: 35, currentPrice: 35, stockUnit: 1, desc: '아침마다 사장님이 찾는 활력소 (+친밀도 UP)' },
  { id: 'snack_hotteok', name: '꿀 뚝뚝 찹쌀 호떡', category: 'snack', emoji: '🥞', basePrice: 55, currentPrice: 55, stockUnit: 1, desc: '겨울철 사장님의 소울 푸드 (+친밀도 대폭 UP)' },
  { id: 'snack_hotdog', name: '설탕 케첩 바른 핫도그', category: 'snack', emoji: '🌭', basePrice: 45, currentPrice: 45, stockUnit: 1, desc: '든든하고 달콤 짭조름한 간식 (+친밀도 UP)' },
  { id: 'snack_sikhye', name: '살얼음 동동 달콤 식혜', category: 'snack', emoji: '🍶', basePrice: 40, currentPrice: 40, stockUnit: 1, desc: '기름진 라면을 먹고 마시면 최고인 전통 음료 (+친밀도 UP)' },
];

// 6. 일일 날씨 & 이벤트
export const DAILY_EVENTS: Record<DailyWeather, DailyEventInfo> = {
  sunny: {
    weather: 'sunny',
    title: '맑고 화창한 날',
    desc: '기분 좋은 햇살이 비치는 날입니다. 골목 손님들이 기분 좋게 찾아옵니다.',
    emoji: '☀️',
    buffDesc: '기본 손님 만족도 +5%',
    cheolwoongGreeting: '오늘 날씨 죽이네! 이런 날엔 콧노래 부르면서 라면 끓여야 제맛이지.',
  },
  rainy: {
    weather: 'rainy',
    title: '비 내리는 촉촉한 날',
    desc: '빗소리가 들려옵니다. 얼큰하고 뜨끈한 국물라면을 찾는 손님이 대폭 늘어납니다!',
    emoji: '🌧️',
    buffDesc: '국물라면 주문율 +40%, 국물라면 팁 +20%',
    cheolwoongGreeting: '비 오는 날엔 창밖 보면서 뜨끈한 국물 후루룩 들이켜는 게 인생의 낙 아니겠냐?',
  },
  hot: {
    weather: 'hot',
    title: '더운 여름날',
    desc: '날이 덥고 화창합니다. 새콤달콤 시원한 비빔라면을 찾는 손님이 급증합니다!',
    emoji: '🔥',
    buffDesc: '비빔라면 주문율 +50%, 손님 인내심 살짝 단축',
    cheolwoongGreeting: '어휴 덥다 더워! 신입아, 찬물 팍팍 틀어서 비빔면 시원하게 헹궈내자!',
  },
  festival: {
    weather: 'festival',
    title: '동네 골목 축제날!',
    desc: '가게 앞 골목에서 흥겨운 축제가 열려 손님들이 2배로 몰려듭니다!',
    emoji: '🎉',
    buffDesc: '손님 방문 속도 2배, 영업 코인 대폭 증가!',
    cheolwoongGreeting: '신입! 오늘 손님 물밀듯이 올 테니까 긴장 바짝 하고 화구 불꽃 올려라!',
  },
  birthday: {
    weather: 'birthday',
    title: '철웅 사장님 생신날 🎂',
    desc: '오늘은 철웅 사장님의 생신입니다! 사장님께 간식을 드리면 특별한 감동 이벤트가 발생합니다.',
    emoji: '🎂',
    buffDesc: '사장님 선물 효과 3배, 전 손님 팁 +30%',
    cheolwoongGreeting: '에헴... 오늘이 무슨 날인지 넌 모를 테지만... 뭐, 그냥 평소처럼 일하자구.',
  },
};

// 7. 친밀도 스토리 (5단계)
export const DIARY_STORIES: DiaryStory[] = [
  {
    id: 1,
    title: '1장: 철웅 사장님이 연라면을 처음 연 날',
    unlockedAtAffinityLevel: 1,
    summary: '무일푼 청년 시절, 작은 포장마차 한 칸에서 시작된 철웅의 라면 인생 이야기',
    fullStory:
      '내가 스물다섯 무렵이었지. 가진 거라곤 양은냄비 서너 개랑 열정밖에 없었어. 추운 겨울바람 부는 날, 덜덜 떨며 찾아온 손님이 내가 끓인 라면 국물 한 모금 마시고 "살 것 같다"고 웃어주던 그 표정을 아직도 잊지 못해. 그때 결심했지. 평생 사람들의 속을 덥혀주는 라면을 끓이겠다고.',
    unlocked: true,
  },
  {
    id: 2,
    title: '2장: 가게 이름이 왜 "연라면"인지의 비밀',
    unlockedAtAffinityLevel: 2,
    summary: '단순한 라면이 아닌, 사람과 사람을 잇는 인연(緣)의 국물',
    fullStory:
      '손님들이 맨날 물어봐. "사장님 성함이 철웅인데 왜 철웅라면이 아니고 연라면이에요?" 하고. 하하! 연라면의 "연" 자는 인연 연(緣) 자야. 이 문을 열고 들어오는 모든 손님과 우리 사이에 맺어지는 따뜻한 인연. 그리고 냄비 위로 뭉게뭉게 피어오르는 연기(煙)라는 뜻도 있지. 너와 내가 만난 것도 소중한 인연이고 말야.',
    unlocked: false,
  },
  {
    id: 3,
    title: '3장: 사장님의 첫 대실패 라면 썰',
    unlockedAtAffinityLevel: 3,
    summary: '욕심만 앞서서 초콜릿과 된장을 섞었다가 손님에게 된통 혼났던 흑역사',
    fullStory:
      '신입 너한테만 몰래 고백하는 건데, 나도 처음엔 사고뭉치였어. 남들이 안 하는 혁신적인 메뉴를 개발하겠다고 초콜릿에 고추장이랑 춘장을 들이붓고 끓였거든? 단골 형님이 한 입 먹더니 숟가락 던지면서 "철웅아, 너 사람 잡을 일 있냐?!" 소리를 질렀지. 그날 밤새 울면서 깨달았어. 기본에 충실하지 않은 기교는 독이라는 걸.',
    unlocked: false,
  },
  {
    id: 4,
    title: '4장: 전설의 비밀 특제 다대기 레시피 전수',
    unlockedAtAffinityLevel: 4,
    summary: '철웅 사장님이 20년간 비밀로 간직해 온 황금 비법 소스 전수!',
    fullStory:
      '이제 너한테 이 비법을 넘겨줄 때가 된 것 같다. 양파를 약불에서 카라멜색이 날 때까지 볶고, 거기에 건새우 가루와 청주 세 방울, 그리고 마지막에 대파 기름을 두르는 거야. 이 비법이면 아무리 까다로운 평론가라도 눈을 번쩍 뜨게 되지. 잘 기억해 둬라, 넌 이미 내 든든한 요리사니까.',
    specialRewardName: '전설의 특제 다대기 해금 (코인 +30%)',
    unlocked: false,
  },
  {
    id: 5,
    title: '5장: 진짜 동료로 인정한 감동의 순간',
    unlockedAtAffinityLevel: 5,
    summary: '신입 요리사에서 연라면의 둘도 없는 평생 파트너가 된 플레이어',
    fullStory:
      '처음 네가 앞치마 두르고 들어왔을 땐 며칠 하다가 힘들어서 도망갈 줄 알았다. 그런데 매일 아침 눈 비비며 나와서 육수 우리고, 손님 한 분 한 분 정성껏 라면을 내어주는 네 모습을 보면서 가슴이 뭉클했어. 이제 연라면은 나 혼자만의 가게가 아니야. 너와 내가 함께 지켜나가는 우리의 연라면이다. 고맙다, 내 최고의 파트너야.',
    specialRewardName: '철웅의 황금 국자 명예 칭호 수여',
    unlocked: false,
  },
];

// 8. 도전과제 12종
export const ACHIEVEMENTS_LIST: Achievement[] = [
  { id: 'first_perfect', title: '첫 만점 라면!', desc: '손님에게 별 5개 만점을 받으세요.', icon: '⭐', rewardCoins: 50, unlocked: false },
  { id: 'combo_5', title: '콤보의 달인', desc: '연속 5번 이상 별 4개 이상 라면을 서빙하세요.', icon: '🔥', rewardCoins: 80, unlocked: false },
  { id: 'combo_10', title: '전설의 라면 머신', desc: '연속 10콤보를 달성하세요!', icon: '⚡', rewardCoins: 200, unlocked: false },
  { id: 'critic_perfect', title: '평론가의 극찬', desc: '라면 평론가에게 5성 만점을 받아 코인 3배를 획득하세요.', icon: '🧐', rewardCoins: 150, unlocked: false },
  { id: 'day_served_20', title: '문전성시 연라면', desc: '하루 동안 손님 15명 이상을 대접하세요.', icon: '👥', rewardCoins: 100, unlocked: false },
  { id: 'all_categories', title: '라면 사천왕', desc: '국물, 볶음, 비빔, 짜장 라면을 모두 한 번씩 조리하세요.', icon: '🍜', rewardCoins: 120, unlocked: false },
  { id: 'affinity_max', title: '사장님의 단짝', desc: '철웅 사장님과의 친밀도를 5단계까지 달성하세요.', icon: '💖', rewardCoins: 300, unlocked: false },
  { id: 'bowl_collector', title: '그릇 수집가', desc: '그릇 꾸미기 세트를 5종 이상 사용해보세요.', icon: '🥣', rewardCoins: 90, unlocked: false },
  { id: 'spicy_master', title: '맵부심 정복자', desc: '고춧가루 5단계 지옥불 라면을 완벽히 조리하세요.', icon: '🌶️', rewardCoins: 100, unlocked: false },
  { id: 'secret_recipe', title: '비밀 레시피 전수자', desc: '사장님의 4단계 비밀 스토리를 해금하세요.', icon: '📜', rewardCoins: 200, unlocked: false },
  { id: 'custom_master', title: '나만의 시그니처', desc: '나만의 라면을 직접 만들어 앨범에 저장하세요.', icon: '📸', rewardCoins: 60, unlocked: false },
  { id: 'rich_chef', title: '연라면 대박 사장', desc: '누적 코인 1,000G를 모으세요.', icon: '💰', rewardCoins: 250, unlocked: false },
];

// 9. 철웅의 꿀팁 라이브러리
export const CHEOLWOONG_TIPS = [
  '주문 말풍선 끝까지 읽어라! 곁들임(단무지, 밥 등) 빼먹으면 손님이 서운해서 별 하나 날아간다.',
  '면은 게이지 초록 구간(보통)에서 멈추면 딱 알맞게 탱글탱글하다.',
  '인내심 게이지 빨간색 뜬 손님부터 먼저 챙겨라! 급한 불부터 끄는 게 프로 요리사다.',
  '냄비 화구를 2개로 늘리면 손님 회전율이 두 배로 빨라진다. 상점에서 화구부터 업그레이드해라!',
  '단골 손님은 "늘 먹던 걸로요!" 하고 쓱 들어온다. 뭘 좋아했는지 기억해 두면 만점 예약이지!',
  '계란이랑 파는 라면의 기본이다. 아침 장보기 때 항상 넉넉하게 채워둬라.',
  '평론가는 국물 맛뿐만 아니라 그릇 어울림과 곁들임까지 깐깐하게 본다더라.',
  '콤보를 안 끊기게 이어가면 팁 코인이 눈덩이처럼 불어난다.',
  '볶음라면은 면 삶고 물을 딱 자작하게(8스푼) 남겨야 소스가 꾸덕하게 배어든다.',
  '비빔라면은 찬물에 촥촥 헹궈야 면발이 탱탱해져서 안 퍼진다.',
  '고춧가루 버튼은 손님이 주문한 맵기 숫자만큼 정확히 눌러야 한다!',
  '가게 인테리어를 예쁘게 꾸미면 손님들이 기다리는 동안 덜 지루해해서 인내심이 늘어난다.',
  '도마 위에서 칼질 연타를 빠르게 할수록 토핑 썰리는 속도가 빨라진다!',
  '반숙 계란은 타이밍 게이지 노란색 눈금에 맞춰 건져야 노른자가 촉촉하게 흐른다.',
  '비 오는 날엔 국물라면을 찾는 손님이 많으니 육수 재료를 든든히 챙겨라.',
];

// 10. 아재개그 모음
export const CHEOLWOONG_DAD_JOKES = [
  { q: '라면이 왜 항상 불만인지 아냐?', a: '...맨날 "불" 위에 올라가서 그렇단다! 으하하하!' },
  { q: '세상에서 가장 슬픈 라면은?', a: '...다 끓였는데 엎질러진 라면이지... 아 이건 진짜 슬픈데?' },
  { q: '파가 화나면 뭔지 아냐?', a: '...파송송 계란탁! ...아니고 "파"르르 떨린단다! 크하하!' },
  { q: '왕이 넘어지면 뭔지 아냐?', a: '...킹콩! 푸하하! 신입아 표정이 왜 굳어있냐?' },
  { q: '신 김치가 노래를 부르면?', a: '...신나는 김치! 으하하하, 배꼽 빠지지 않냐?' },
];

// Compatibility aliases
export const BASE_MARKET_ITEMS = MARKET_BASE_ITEMS;
export const CHEF_GOLDEN_TIPS = CHEOLWOONG_TIPS.map((tip, idx) => ({
  id: `tip_${idx}`,
  title: `비법 ${idx + 1}`,
  content: tip,
}));
export const DAD_JOKES = CHEOLWOONG_DAD_JOKES;
export const CHEOLWOONG_DIARY_STORIES = DIARY_STORIES;
export const TRAY_COLORS = TRAYS_LIST;

export {
  formatOrderToSpeech,
  getChefHint,
  generateRamenTitle,
  evaluateRamen,
} from './ramenData';


/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  BrothDef,
  BowlSkin,
  Customer,
  CustomerOrder,
  RamenRating,
  ShopDecor,
  ToppingDef,
  ToppingId,
  CookedRamen,
  RamenCategory,
  NoodleType,
} from '../types/game';

export const BROTH_LIST: BrothDef[] = [
  // --- [1. 국물라면 수프] ---
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
    name: '매운맛',
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
    id: 'seafood',
    name: '해물',
    emoji: '🦐',
    categoryType: 'soup',
    color: '#D97706',
    bubbleColor: '#FED7AA',
    flavorText: '바다의 깊은 풍미가 살아있는 시원한 국물',
    category: 'basic',
    price: 0,
    unlockedByDefault: true,
  },
  {
    id: 'kimchi',
    name: '김치',
    emoji: '🥬',
    categoryType: 'soup',
    color: '#B91C1C',
    bubbleColor: '#FECACA',
    flavorText: '새콤 개운하게 우러난 얼큰 김치 국물',
    category: 'basic',
    price: 0,
    unlockedByDefault: true,
  },
  {
    id: 'mara',
    name: '마라',
    emoji: '🔥',
    categoryType: 'soup',
    color: '#991B1B',
    bubbleColor: '#F87171',
    flavorText: '입안이 얼얼하게 중독적인 특제 마라 국물',
    category: 'unlocked',
    price: 150,
    unlockedByDefault: false,
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
    price: 200,
    unlockedByDefault: false,
  },
  {
    id: 'curry',
    name: '카레',
    emoji: '🍛',
    categoryType: 'soup',
    color: '#CA8A04',
    bubbleColor: '#FEF08A',
    flavorText: '향긋하고 깊은 향미의 일본풍 카레 국물',
    category: 'unlocked',
    price: 250,
    unlockedByDefault: false,
  },

  // --- [2. 볶음면 / 비빔면 소스] ---
  {
    id: 'stir_jjajang',
    name: '짜파게티풍 짜장',
    emoji: '🥢',
    categoryType: 'stir',
    color: '#26140D',
    bubbleColor: '#451A03',
    flavorText: '춘장과 양파를 볶아낸 달콤 짭조름한 국민 짜장 소스',
    category: 'basic',
    price: 0,
    unlockedByDefault: true,
  },
  {
    id: 'stir_buldak',
    name: '화끈 불닭 볶음',
    emoji: '🔥',
    categoryType: 'stir',
    color: '#7F1D1D',
    bubbleColor: '#DC2626',
    flavorText: '스트레스가 싹 풀리는 화끈하고 중독적인 매운 볶음 소스',
    category: 'basic',
    price: 0,
    unlockedByDefault: true,
  },
  {
    id: 'stir_bibim',
    name: '새콤달콤 비빔',
    emoji: '🍎',
    categoryType: 'stir',
    color: '#991B1B',
    bubbleColor: '#F87171',
    flavorText: '사과 과즙과 참기름 향이 향긋한 시원한 비빔 소스',
    category: 'basic',
    price: 0,
    unlockedByDefault: true,
  },
  {
    id: 'stir_rose',
    name: '꾸덕 로제 크림',
    emoji: '🧀',
    categoryType: 'stir',
    color: '#EA580C',
    bubbleColor: '#FED7AA',
    flavorText: '매콤 고추장과 부드러운 우유 크림이 만난 로제 소스',
    category: 'unlocked',
    price: 180,
    unlockedByDefault: false,
  },
  {
    id: 'stir_oil',
    name: '파기름 볶음',
    emoji: '🍳',
    categoryType: 'stir',
    color: '#A16207',
    bubbleColor: '#FEF08A',
    flavorText: '대파의 은은한 불향과 간장의 감칠맛 볶음 소스',
    category: 'unlocked',
    price: 160,
    unlockedByDefault: false,
  },
];

export const TOPPING_LIST: ToppingDef[] = [
  // 기본 기본형 토핑
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

  // 상점 해금 프리미엄 토핑
  { id: 'chashu', name: '두툼 차슈', emoji: '🥩', color: '#78350F', category: 'unlocked', price: 120, unlockedByDefault: false },
  { id: 'shrimp', name: '통통 새우', emoji: '🍤', color: '#FB923C', category: 'unlocked', price: 140, unlockedByDefault: false },
  { id: 'corn', name: '옥수수콘', emoji: '🌽', color: '#FACC15', category: 'unlocked', price: 80, unlockedByDefault: false },
  { id: 'cheongyang_pepper', name: '청양고추', emoji: '🌶️', color: '#16A34A', category: 'unlocked', price: 90, unlockedByDefault: false },
  { id: 'squid', name: '탱글 오징어', emoji: '🦑', color: '#E11D48', category: 'unlocked', price: 130, unlockedByDefault: false },
  { id: 'tempura', name: '튀김가루', emoji: '🍘', color: '#FBBF24', category: 'unlocked', price: 70, unlockedByDefault: false },
];

export const BOWL_SKINS: BowlSkin[] = [
  { id: 'classic_pot', name: '추억의 양은냄비', emoji: '🥘', bowlColor: '#F59E0B', rimColor: '#D97706', price: 0 },
  { id: 'frying_pan', name: '철판 볶음팬', emoji: '🍳', bowlColor: '#1F2937', rimColor: '#111827', price: 0 },
  { id: 'retro_green', name: '분식집 초록 멜라민', emoji: '🥣', bowlColor: '#059669', rimColor: '#047857', pattern: 'dots', price: 100 },
  { id: 'black_stone', name: '뜨끈 돌솥 뚝배기', emoji: '🍲', bowlColor: '#374151', rimColor: '#1F2937', price: 120 },
  { id: 'ceramic_white', name: '포근 백자 도자기', emoji: '🏺', bowlColor: '#F3F4F6', rimColor: '#E5E7EB', price: 150 },
  { id: 'pink_heart', name: '핑크 러블리 하트볼', emoji: '💖', bowlColor: '#F472B6', rimColor: '#EC4899', price: 200 },
  { id: 'golden_dragon', name: '장인의 황금 뚝배기', emoji: '👑', bowlColor: '#EAB308', rimColor: '#CA8A04', price: 300 },
];

export const SHOP_DECORS: ShopDecor[] = [
  { id: 'neon_sign', name: '연라면 레트로 네온사인', emoji: '✨', description: '손님 인내심 감소 속도가 15% 느려집니다', price: 180, bonus: '인내심 +15%' },
  { id: 'maneki_neko', name: '행운의 황금 복고양이', emoji: '🐱', description: '손님이 주는 팁 코인이 20% 증가합니다', price: 220, bonus: '팁 코인 +20%' },
  { id: 'cherry_blossom', name: '봄빛 벚꽃 화병', emoji: '🌸', description: '가게 분위기가 좋아져 손님이 더 자주 찾아옵니다', price: 260, bonus: '손님 방문 속도 UP' },
  { id: 'master_plaque', name: '라면명인 인증 현판', emoji: '🏅', description: '별 5개 평가를 받으면 보너스 30코인 추가!', price: 350, bonus: '5성 보너스 +30G' },
];

export interface CustomerArchetype {
  role: Customer['role'];
  nameTemplates: string[];
  emojis: string[];
  greetings: string[];
  successQuotes: string[];
  failedQuotes: string[];
  isCritic?: boolean;
}

export const CUSTOMER_ARCHETYPES: CustomerArchetype[] = [
  {
    role: 'student',
    nameTemplates: ['고3 수험생 민지', '하굣길 중학생 지호', '시험 끝난 대학생 은우', '체육특기생 태오'],
    emojis: ['🎒', '🧢', '👧', '🧑‍🎓'],
    greetings: [
      '사장님! 배고파서 쓰러질 것 같아요!',
      '야자 끝나고 바로 뛰어왔어요!',
      '오늘 시험 망쳐서 맛있는 라면이 필요해요...',
      '라면 냄새에 이끌려서 들어왔어요!',
    ],
    successQuotes: [
      '우와아! 진짜 천국의 맛이에요! 단골 될게요!',
      '역시 철웅 사장님 손맛 최고! 힘이 번쩍 나요!',
      '이 라면이면 전교 1등도 하겠어요! 대박!',
    ],
    failedQuotes: [
      '으으... 제가 시킨 거랑 맛이 좀 달라요 ㅠㅠ',
      '너무 오래 기다려서 학원 시간 늦었어요...',
    ],
  },
  {
    role: 'office',
    nameTemplates: ['야근 직장인 김대리', '칼퇴 꿈나무 이사원', '커피 중독 박과장', '스트레스 만렙 최팀장'],
    emojis: ['💼', '👔', '👩‍💼', '🧑‍💻'],
    greetings: [
      '오늘 하루도 하얗게 불태웠습니다... 맛있는 한 그릇 부탁해요.',
      '사장님, 속이 확 풀리거나 입맛 돋우는 볶음면 좀 말아주세요.',
      '퇴근길에 연라면 불빛 보고 살았다 싶었어요.',
    ],
    successQuotes: [
      '캬~ 하루 스트레스가 눈 녹듯 사라지네요. 내일도 올게요!',
      '한 모금, 한 젓가락에 피로가 싹 가십니다. 최고예요!',
      '사장님 손맛은 보약입니다. 진심이에요!',
    ],
    failedQuotes: [
      '음... 국물/소스가 너무 짜거나 면이 좀 안 맞네요...',
      '기다리다 지쳐서 그냥 가겠습니다...',
    ],
  },
  {
    role: 'regular',
    nameTemplates: ['동네 주민 영수 삼촌', '단골 손님 미영 이모', '옆집 카페 바리스타 준', '꽃집 사장님 혜련'],
    emojis: ['🙋‍♂️', '👵', '🧑‍🍳', '🌻'],
    greetings: [
      '철웅아~ 오늘도 맛있는 냄새 솔솔 나네!',
      '우리 철웅 사장님 얼굴 보러 왔지~',
      '오늘 딱 생각나는 메뉴가 있어서 들렀어!',
    ],
    successQuotes: [
      '역시 우리 철웅이 솜씨는 언제 먹어도 감동이야~',
      '연라면 없으면 동네 사람들 어떻게 살았을까 몰라!',
    ],
    failedQuotes: [
      '철웅아, 오늘 손이 좀 바빴나 보네? 다음엔 더 맛있게 해줘~',
    ],
  },
  {
    role: 'grandma',
    nameTemplates: ['따뜻한 점순 할머니', '인심 좋은 복자 할머니', '동네 지킴이 만수 할아버지'],
    emojis: ['👵', '🧓', '👴'],
    greetings: [
      '젊은 총각, 나도 맛난 거 한 그릇 주겠나?',
      '날이 쌀쌀하니 뜨끈한 게 그립구먼.',
    ],
    successQuotes: [
      '아이고 정성이 듬뿍 담겨서 속이 아주 편안하구먼. 복 받을 겨~',
      '내 평생 먹은 라면 중 손에 꼽혀요, 총각 고마워요.',
    ],
    failedQuotes: [
      '에고... 늙은이 입맛에는 좀 안 맞네...',
    ],
  },
  {
    role: 'kid',
    nameTemplates: ['라면 마니아 도윤이', '개구쟁이 서아', '짜파게티 사랑 하준이'],
    emojis: ['👦', '👧', '👶'],
    greetings: [
      '사장님! 저 치즈랑 짜파게티 짱 좋아해요! 맛있게 해주세요!',
      '엄마 몰래 용돈 들고 왔어요!',
    ],
    successQuotes: [
      '우와아아! 짱 맛있어요! 백점 만점에 천점!',
      '내일 친구들 다 데리고 올래요!',
    ],
    failedQuotes: [
      '우앙... 제가 원하던 맛이 아니에요 ㅠㅠ',
    ],
  },
  {
    role: 'critic',
    nameTemplates: ['미식 평론가 고든 김', '라면 칼럼니스트 마에스트로', '미슐랭 암행 조사관'],
    emojis: ['🧐', '🎩', '🕵️‍♂️'],
    isCritic: true,
    greetings: [
      '여기가 그 소문의 연라면인가... 내 미각을 만족시킬 수 있을까?',
      '흠, 면발의 텐션과 소스/국물의 밸런스를 엄격히 평가하겠네.',
      '까다로운 내 기준을 통과한다면 특별한 보상을 주지.',
    ],
    successQuotes: [
      '오오...! 완벽한 물의 양, 면의 익힘, 토핑의 황금 조화! 전설의 한 그릇이다! (코인 3배 지급!)',
      '이것은 단순한 요리가 아닌 하나의 예술이다! 별 다섯 개 만점!',
    ],
    failedQuotes: [
      '실망스럽군. 미식의 기본이 결여되어 있네. 오늘은 평가할 가치도 없소.',
    ],
  },
];

// Helper to generate a random customer order based on day and available ingredients
export function generateRandomCustomer(day: number, unlockedBroths: string[], unlockedToppings: string[]): Customer {
  const isCriticChance = Math.random() < 0.22;
  const pickedArchetype = isCriticChance
    ? CUSTOMER_ARCHETYPES.find((a) => a.isCritic)!
    : CUSTOMER_ARCHETYPES.filter((a) => !a.isCritic)[Math.floor(Math.random() * (CUSTOMER_ARCHETYPES.length - 1))];

  const name = pickedArchetype.nameTemplates[Math.floor(Math.random() * pickedArchetype.nameTemplates.length)];
  const emoji = pickedArchetype.emojis[Math.floor(Math.random() * pickedArchetype.emojis.length)];
  const greeting = pickedArchetype.greetings[Math.floor(Math.random() * pickedArchetype.greetings.length)];
  const successQuote = pickedArchetype.successQuotes[Math.floor(Math.random() * pickedArchetype.successQuotes.length)];
  const failedQuote = pickedArchetype.failedQuotes[Math.floor(Math.random() * pickedArchetype.failedQuotes.length)];

  // Choose Ramen Category: Soup (60%) vs Stir-fried (40%)
  const ramenCategory: RamenCategory = Math.random() < 0.4 ? 'stir' : 'soup';

  // Filter broths/sauces matching category
  const validBroths = BROTH_LIST.filter(
    (b) => b.categoryType === ramenCategory && (b.unlockedByDefault || unlockedBroths.includes(b.id))
  ).map((b) => b.id);

  const broth = validBroths.length > 0 ? validBroths[Math.floor(Math.random() * validBroths.length)] : 'spicy';

  // Water level
  const waterLevels: Array<'less' | 'normal' | 'more'> = ['less', 'normal', 'more'];
  const waterPick = Math.random() < 0.6 ? 'normal' : waterLevels[Math.floor(Math.random() * waterLevels.length)];

  // Noodle doneness
  const noodles: Array<'firm' | 'normal' | 'soft'> = ['firm', 'normal', 'soft'];
  const noodle = noodles[Math.floor(Math.random() * noodles.length)];

  // Topping count based on day
  const validToppings = TOPPING_LIST.filter((t) => t.unlockedByDefault || unlockedToppings.includes(t.id)).map((t) => t.id);
  
  let toppingCount = 1;
  if (day >= 4) {
    toppingCount = Math.floor(Math.random() * 2) + 2; // 2 or 3
  } else if (day >= 2) {
    toppingCount = Math.floor(Math.random() * 2) + 1; // 1 or 2
  }

  // Shuffle and pick
  const shuffledToppings = [...validToppings].sort(() => 0.5 - Math.random());
  const selectedToppings = shuffledToppings.slice(0, Math.min(toppingCount, shuffledToppings.length));

  // Noodle type selection (randomly selected among all 5 types)
  const noodleTypes: NoodleType[] = ['basic', 'chewy', 'thin', 'flat', 'udon'];
  const pickedNoodleType = noodleTypes[Math.floor(Math.random() * noodleTypes.length)];

  // Patience decreases as day increases
  const basePatience = pickedArchetype.isCritic ? 30 : Math.max(24, 40 - day * 1.5);

  const order: CustomerOrder = {
    category: ramenCategory,
    ramenCategory,
    noodleType: pickedNoodleType,
    waterLevel: waterPick,
    broth,
    spicyLevel: 1,
    noodleDoneness: noodle,
    noodle,
    eggType: 'soft',
    toppings: selectedToppings,
    sideDish: 'danmuji',
  };

  return {
    id: `cust_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    name,
    emoji,
    role: pickedArchetype.role,
    isCritic: !!pickedArchetype.isCritic,
    dialogueGreeting: greeting,
    dialogueSuccess: successQuote,
    dialogueFailed: failedQuote,
    order,
    maxPatience: basePatience,
    currentPatience: basePatience,
  };
}

export const NOODLE_TYPE_NAMES: Record<NoodleType, string> = {
  basic: '기본면',
  chewy: '쫄깃면',
  thin: '얇은면',
  flat: '넓적면',
  udon: '우동면',
};

// Convert order to cute spoken request sentence
export function formatOrderToSpeech(order: CustomerOrder): string {
  const isStir = order.ramenCategory === 'stir';

  const waterMap: Record<string, string> = isStir
    ? {
        less: '물은 바짝 졸여서 꾸덕하게',
        normal: '물은 자작하게 8스푼 남겨서',
        more: '물은 촉촉하게 국물 자작하게',
      }
    : {
        less: '물은 자작하고 진하게',
        normal: '물은 딱 알맞게',
        more: '국물 넉넉하게 많이',
      };

  const brothObj = BROTH_LIST.find((b) => b.id === order.broth);
  const brothName = brothObj ? brothObj.name : '기본';

  const noodleMap: Record<string, string> = {
    firm: '꼬들꼬들하게',
    normal: '적당히 탱글하게',
    soft: '부드럽게 푹',
  };

  const noodleTypeName = NOODLE_TYPE_NAMES[order.noodleType || 'basic'] || '기본면';

  const toppingNames = order.toppings
    .map((tid) => TOPPING_LIST.find((t) => t.id === tid)?.name || tid)
    .join(', ');

  const toppingPart = order.toppings.length > 0 ? `토핑은 [${toppingNames}] 올려주세요!` : '토핑 없이 깔끔하게 주세요!';

  const categoryIntro = isStir ? '오늘은 국물 말고 볶음면으로 먹을래요!' : '오늘은 뜨끈한 국물라면으로 주세요!';

  const noodleKey = order.noodle || order.noodleDoneness || 'normal';
  return `"${categoryIntro} [${brothName} 소스]에 ${waterMap[order.waterLevel]} 해주시고, 면은 [${noodleTypeName}]으로 ${noodleMap[noodleKey]} 익혀주세요. ${toppingPart}"`;
}

// Chef's Golden Hint Generator for achieving 5 stars
export function getChefHint(customer: Customer): string {
  const o = customer.order;
  const isStir = o.ramenCategory === 'stir';
  const brothObj = BROTH_LIST.find((b) => b.id === o.broth);
  const noodleTypeName = NOODLE_TYPE_NAMES[o.noodleType || 'basic'] || '기본면';

  const waterHint = isStir
    ? o.waterLevel === 'less'
      ? '물 적게 (바짝 졸이기)'
      : o.waterLevel === 'normal'
      ? '물 보통 (황금비율 8스푼)'
      : '물 많이 (촉촉하게)'
    : o.waterLevel === 'less'
    ? '물 적게 (진한국물)'
    : o.waterLevel === 'normal'
    ? '물 보통 (기본선)'
    : '물 많이 (넉넉한국물)';

  const noodleHint =
    o.noodle === 'firm'
      ? '꼬들면: 타이머 앞쪽에서 정지!'
      : o.noodle === 'normal'
      ? '보통면: 초록 게이지에서 정지!'
      : '퍼진면: 타이머 뒤쪽에서 정지!';

  const toppingHint =
    o.toppings.length > 0
      ? `필수 토핑: [${o.toppings.map((t) => TOPPING_LIST.find((x) => x.id === t)?.name).join(', ')}]만 얹기!`
      : '토핑을 넣지 마세요!';

  return `👨‍🍳 철웅의 황금팁: [${isStir ? '볶음면' : '국물라면'}] + [${brothObj?.name}] + [${noodleTypeName}] + [${waterHint}] + [${noodleHint}] + [${toppingHint}]`;
}

// Generate fun auto-title for cooked ramen
export function generateRamenTitle(ramen: CookedRamen): string {
  const isStir = ramen.ramenCategory === 'stir';
  const brothObj = BROTH_LIST.find((b) => b.id === ramen.broth);
  const brothName = brothObj?.name || (isStir ? '짜장' : '라면');
  const noodleTypeName = NOODLE_TYPE_NAMES[ramen.noodleType || 'basic'] || '기본면';

  const noodleAdj: Record<string, string> = {
    firm: '꼬들',
    normal: '탱글',
    soft: '호로록',
  };

  const waterAdj: Record<string, string> = isStir
    ? {
        less: '꾸덕꾸덕',
        normal: '황금비율',
        more: '촉촉한',
      }
    : {
        less: '진한',
        normal: '황금비율',
        more: '시원한국물',
      };

  const noodleKey = ramen.noodle || ramen.noodleDoneness || 'normal';
  const waterKey = ramen.waterLevel || 'normal';
  const suffix = isStir ? '면' : '라면';

  // Primary topping
  if (ramen.toppings.length === 0) {
    return `${waterAdj[waterKey]} ${noodleAdj[noodleKey]} ${noodleTypeName} ${brothName}${suffix}`;
  }

  const firstToppingObj = TOPPING_LIST.find((t) => t.id === ramen.toppings[0]);
  const toppingName = firstToppingObj ? firstToppingObj.name : '특제';

  if (ramen.toppings.length >= 3) {
    return `모둠 토핑 폭탄 ${noodleAdj[noodleKey]} ${noodleTypeName} ${brothName}${suffix}`;
  }

  return `${toppingName} 듬뿍 ${noodleAdj[noodleKey]} ${noodleTypeName} ${brothName}${suffix}`;
}

// Calculate Rating
export function evaluateRamen(cooked: CookedRamen, customer: Customer, decorBonuses: string[] = []): RamenRating {
  const target = customer.order;
  let score = 0;
  const deductions: string[] = [];

  // 1. Category check (국물라면 vs 볶음면) - 20 pts
  const categoryMatched = cooked.ramenCategory === target.ramenCategory;
  if (categoryMatched) {
    score += 20;
  } else {
    score += 0;
    deductions.push('라면 스타일(국물/볶음)이 달라요');
  }

  // 2. Water check (20 pts)
  const waterMatched = cooked.waterLevel === target.waterLevel;
  if (waterMatched) {
    score += 20;
  } else {
    score += 5;
    deductions.push('물 조절이 아쉬워요');
  }

  // 3. Broth check (25 pts)
  const brothMatched = cooked.broth === target.broth;
  if (brothMatched) {
    score += 25;
  } else {
    score += 5;
    deductions.push('국물/소스 종류가 달라요');
  }

  // 4. Noodle doneness check (15 pts)
  const noodleMatched = (cooked.noodle || cooked.noodleDoneness) === (target.noodle || target.noodleDoneness);
  if (noodleMatched) {
    score += 15;
  } else {
    score += 5;
    deductions.push('면 익힘 정도가 달라요');
  }

  // 5. Noodle Type check (면발 종류: 기본면, 쫄깃면, 얇은면, 넓적면, 우동면) - 20 pts
  const targetNoodleType = target.noodleType || 'basic';
  const cookedNoodleType = cooked.noodleType || 'basic';
  const noodleTypeMatched = targetNoodleType === cookedNoodleType;
  if (noodleTypeMatched) {
    score += 20;
  } else {
    score += 0;
    deductions.push(`면 종류가 달라요 -1점 (주문: ${NOODLE_TYPE_NAMES[targetNoodleType]} / 조리: ${NOODLE_TYPE_NAMES[cookedNoodleType]})`);
  }

  // 6. Toppings check (15 pts)
  const targetToppingSet = new Set(target.toppings);
  const cookedToppingSet = new Set(cooked.toppings);

  let matchedToppingsCount = 0;
  const missingToppings: string[] = [];
  const wrongToppings: string[] = [];

  target.toppings.forEach((t) => {
    if (cookedToppingSet.has(t)) {
      matchedToppingsCount++;
    } else {
      const def = TOPPING_LIST.find((x) => x.id === t);
      missingToppings.push(def?.name || t);
    }
  });

  cooked.toppings.forEach((t) => {
    if (!targetToppingSet.has(t)) {
      const def = TOPPING_LIST.find((x) => x.id === t);
      wrongToppings.push(def?.name || t);
    }
  });

  if (missingToppings.length > 0) {
    deductions.push(`빠진 토핑: ${missingToppings.join(', ')}`);
  }
  if (wrongToppings.length > 0) {
    deductions.push(`주문하지 않은 토핑: ${wrongToppings.join(', ')}`);
  }

  let toppingScoreRatio = 1;
  if (target.toppings.length > 0) {
    toppingScoreRatio = matchedToppingsCount / target.toppings.length;
  }
  // Deduct for unwanted toppings
  if (wrongToppings.length > 0) {
    toppingScoreRatio = Math.max(0, toppingScoreRatio - wrongToppings.length * 0.25);
  }
  score += Math.round(toppingScoreRatio * 15);

  // Determine Stars
  let stars = 1;
  if (score >= 95) stars = 5;
  else if (score >= 80) stars = 4;
  else if (score >= 65) stars = 3;
  else if (score >= 45) stars = 2;
  else stars = 1;

  // If noodle type did not match, deduct 1 star as requested
  if (!noodleTypeMatched) {
    stars = Math.max(1, stars - 1);
  }

  // Base coins
  let baseCoins = stars * 16 + Math.floor(Math.random() * 6);
  if (stars === 5) baseCoins += 25; // 5-star perfection bonus

  // Critic bonus
  let isCriticBonus = false;
  if (customer.isCritic && stars === 5) {
    baseCoins *= 3;
    isCriticBonus = true;
  }

  // Decor bonuses
  if (decorBonuses.includes('maneki_neko')) {
    baseCoins = Math.round(baseCoins * 1.2);
  }
  if (decorBonuses.includes('master_plaque') && stars === 5) {
    baseCoins += 30;
  }

  let feedback = '';
  if (stars === 5) {
    feedback = customer.dialogueSuccess;
  } else if (stars >= 4) {
    feedback = '우와, 꽤 맛있네요! 주문이랑 거의 딱 맞았어요!';
  } else if (stars === 3) {
    feedback = '나쁘지 않아요. 다음엔 주문을 조금만 더 신경써주세요!';
  } else {
    feedback = customer.dialogueFailed;
  }

  return {
    stars,
    scorePercent: score,
    feedback,
    earnedCoins: baseCoins,
    isCriticBonus,
    deductions,
    details: {
      categoryMatched,
      waterMatched,
      brothMatched,
      noodleMatched,
      noodleTypeMatched,
      targetNoodleType,
      cookedNoodleType,
      toppingScore: Math.round(toppingScoreRatio * 100),
      missingToppings,
      wrongToppings,
    },
  };
}

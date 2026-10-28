/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ToppingId } from '../types/game';

interface ToppingVisualProps {
  id: ToppingId;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'bowl';
  className?: string;
}

export const ToppingVisual: React.FC<ToppingVisualProps> = ({
  id,
  size = 'md',
  className = '',
}) => {
  const sizeMap = {
    xs: 'w-4 h-4',
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    bowl: 'w-11 h-11 sm:w-13 sm:h-13',
  };

  const dim = sizeMap[size];

  switch (id) {
    // 1. 송송 썬 대파 (Sliced Green Onion / Scallion Rings - Not a sprout!)
    case 'green_onion':
      return (
        <div className={`relative ${dim} flex items-center justify-center ${className}`} title="송송 대파">
          <svg viewBox="0 0 48 48" className="w-full h-full drop-shadow-sm overflow-visible">
            {/* Scallion ring 1 (Top Right) */}
            <g transform="translate(24, 6) rotate(15)">
              <circle cx="8" cy="8" r="8" fill="#15803D" stroke="#14532D" strokeWidth="1.5" />
              <circle cx="8" cy="8" r="4.8" fill="#86EFAC" />
              <circle cx="8" cy="8" r="2.2" fill="#DCFCE7" />
            </g>
            {/* Scallion ring 2 (Bottom Left) */}
            <g transform="translate(6, 20) rotate(-20)">
              <circle cx="8" cy="8" r="8.5" fill="#16A34A" stroke="#14532D" strokeWidth="1.5" />
              <circle cx="8" cy="8" r="5.2" fill="#BBF7D0" />
              <circle cx="8" cy="8" r="2.4" fill="#F0FDF4" />
            </g>
            {/* Scallion ring 3 (Center Foreground) */}
            <g transform="translate(18, 18) rotate(5)">
              <circle cx="9" cy="9" r="9" fill="#22C55E" stroke="#166534" strokeWidth="1.5" />
              <circle cx="9" cy="9" r="5.5" fill="#DCFCE7" />
              <circle cx="9" cy="9" r="2.5" fill="#FEF9C3" />
            </g>
            {/* Scallion ring 4 (Bottom Right small) */}
            <g transform="translate(26, 26) rotate(40)">
              <circle cx="6" cy="6" r="6" fill="#15803D" stroke="#14532D" strokeWidth="1.2" />
              <circle cx="6" cy="6" r="3.6" fill="#86EFAC" />
            </g>
          </svg>
        </div>
      );

    // 2. 부드러운 반숙 계란 (Soft-boiled Ramen Egg Half)
    case 'egg':
      return (
        <div className={`relative ${dim} flex items-center justify-center ${className}`} title="반숙 계란">
          <svg viewBox="0 0 48 54" className="w-full h-full drop-shadow-md">
            {/* Egg White Oval */}
            <ellipse cx="24" cy="28" rx="19" ry="23" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
            {/* Inner rim depth */}
            <ellipse cx="24" cy="28" rx="17" ry="21" fill="#FFFBEB" opacity="0.6" />
            {/* Golden Orange Runny Yolk */}
            <circle cx="24" cy="30" r="11.5" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
            <circle cx="24" cy="30" r="9.5" fill="#EA580C" opacity="0.4" />
            {/* Yolk gloss highlight */}
            <ellipse cx="21" cy="26" rx="3.5" ry="2" fill="#FFFFFF" opacity="0.8" transform="rotate(-20 21 26)" />
          </svg>
        </div>
      );

    // 3. 고소하게 녹아내리는 체다 치즈 (Melting Cheddar Cheese Slice)
    case 'cheese':
      return (
        <div className={`relative ${dim} flex items-center justify-center ${className}`} title="고소한 체다치즈">
          <svg viewBox="0 0 48 48" className="w-full h-full drop-shadow-md">
            {/* Slightly tilted melted cheese square with soft corners & drips */}
            <path
              d="M10,12 C10,9 13,8 16,9 L36,12 C39,12 41,15 40,18 L38,36 C38,39 35,41 32,40 L12,37 C9,36 8,33 9,30 Z"
              fill="#FBBF24"
              stroke="#D97706"
              strokeWidth="2"
            />
            {/* Soft melting drops on edges */}
            <path d="M12,37 Q15,44 18,38" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
            <path d="M32,40 Q35,45 37,37" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
            {/* Melted sheen */}
            <rect x="16" y="15" width="16" height="14" rx="4" fill="#FCD34D" opacity="0.7" />
            <ellipse cx="20" cy="20" rx="3" ry="1.5" fill="#FFFFFF" opacity="0.6" />
          </svg>
        </div>
      );

    // 4. 쫄깃한 떡국떡 (Sliced Korean Rice Cakes)
    case 'rice_cake':
      return (
        <div className={`relative ${dim} flex items-center justify-center ${className}`} title="쫄깃 떡">
          <svg viewBox="0 0 48 48" className="w-full h-full drop-shadow-sm">
            {/* Tteok 1 (Back) */}
            <g transform="translate(4, 8) rotate(-18)">
              <ellipse cx="14" cy="20" rx="7" ry="16" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" />
              <ellipse cx="14" cy="20" rx="4.5" ry="12" fill="#FFFFFF" />
            </g>
            {/* Tteok 2 (Front) */}
            <g transform="translate(18, 12) rotate(15)">
              <ellipse cx="14" cy="20" rx="7" ry="16" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="2" />
              <ellipse cx="13" cy="18" rx="2" ry="7" fill="#E2E8F0" opacity="0.6" />
            </g>
          </svg>
        </div>
      );

    // 5. 노릇노릇 손만두 (Pan-seared Folded Dumpling)
    case 'dumpling':
      return (
        <div className={`relative ${dim} flex items-center justify-center ${className}`} title="손만두">
          <svg viewBox="0 0 48 48" className="w-full h-full drop-shadow-md">
            {/* Dumpling Body Crescent */}
            <path
              d="M6,32 C6,18 20,10 40,16 C42,26 36,36 24,36 C14,36 8,35 6,32 Z"
              fill="#FEF3C7"
              stroke="#D97706"
              strokeWidth="2"
            />
            {/* Crimped pleats on top rim */}
            <path
              d="M10,24 Q13,20 16,23 Q19,19 23,22 Q27,18 31,21 Q35,17 38,20"
              fill="none"
              stroke="#B45309"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Golden seared bottom blush */}
            <path
              d="M10,32 Q24,38 36,30"
              fill="none"
              stroke="#CA8A04"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      );

    // 6. 노릇하게 구운 스팸/햄 (Grilled Pink Ham / Spam)
    case 'ham':
      return (
        <div className={`relative ${dim} flex items-center justify-center ${className}`} title="노릇 스팸/햄">
          <svg viewBox="0 0 48 48" className="w-full h-full drop-shadow-md">
            {/* Spam rectangular slice with soft bevel */}
            <rect
              x="6"
              y="12"
              width="36"
              height="24"
              rx="4"
              fill="#FB7185"
              stroke="#E11D48"
              strokeWidth="2"
            />
            {/* Meat marble gradient */}
            <rect x="8" y="14" width="32" height="20" rx="3" fill="#FDA4AF" opacity="0.75" />
            {/* Searing grill marks */}
            <line x1="14" y1="16" x2="22" y2="32" stroke="#BE123C" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="24" y1="16" x2="32" y2="32" stroke="#BE123C" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="32" y1="18" x2="38" y2="30" stroke="#BE123C" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
      );

    // 7. 칼칼하고 아삭한 김치 (Spicy Napa Kimchi)
    case 'kimchi':
      return (
        <div className={`relative ${dim} flex items-center justify-center ${className}`} title="칼칼 김치">
          <svg viewBox="0 0 48 48" className="w-full h-full drop-shadow-sm">
            {/* Kimchi leaf 1 */}
            <path
              d="M8,36 C10,24 16,14 26,10 C32,16 30,28 22,38 C14,40 10,38 8,36 Z"
              fill="#EF4444"
              stroke="#B91C1C"
              strokeWidth="1.8"
            />
            {/* White/light cabbage stem center */}
            <path
              d="M12,34 C15,25 20,17 25,14"
              fill="none"
              stroke="#FEE2E2"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Kimchi leaf 2 */}
            <path
              d="M18,34 C24,24 32,16 40,16 C42,24 38,34 28,40 Z"
              fill="#DC2626"
              stroke="#991B1B"
              strokeWidth="1.8"
            />
            {/* Chili flakes sprinkles */}
            <circle cx="20" cy="22" r="1.5" fill="#7F1D1D" />
            <circle cx="32" cy="26" r="1.5" fill="#7F1D1D" />
            <circle cx="24" cy="32" r="1.5" fill="#7F1D1D" />
          </svg>
        </div>
      );

    // 8. 아삭 콩나물 (Crunchy Bean Sprouts with Yellow Heads - Not a leaf!)
    case 'bean_sprout':
      return (
        <div className={`relative ${dim} flex items-center justify-center ${className}`} title="아삭 콩나물">
          <svg viewBox="0 0 48 48" className="w-full h-full drop-shadow-sm overflow-visible">
            {/* Sprout Stem 1 */}
            <path
              d="M12,38 C14,28 18,20 22,12"
              fill="none"
              stroke="#F8FAFC"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            <path
              d="M12,38 C14,28 18,20 22,12"
              fill="none"
              stroke="#CBD5E1"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            {/* Yellow Bean Head 1 */}
            <ellipse cx="23" cy="11" rx="5" ry="4" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" transform="rotate(-20 23 11)" />
            <line x1="21" y1="10" x2="25" y2="12" stroke="#A16207" strokeWidth="1" />

            {/* Sprout Stem 2 */}
            <path
              d="M26,40 C28,30 26,24 34,16"
              fill="none"
              stroke="#F8FAFC"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            <path
              d="M26,40 C28,30 26,24 34,16"
              fill="none"
              stroke="#CBD5E1"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            {/* Yellow Bean Head 2 */}
            <ellipse cx="35" cy="15" rx="5" ry="4" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" transform="rotate(25 35 15)" />
            <line x1="33" y1="14" x2="37" y2="16" stroke="#A16207" strokeWidth="1" />

            {/* Small sprout 3 */}
            <path
              d="M18,36 C22,30 24,24 20,20"
              fill="none"
              stroke="#F1F5F9"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <ellipse cx="19" cy="19" rx="3.5" ry="3" fill="#EAB308" stroke="#CA8A04" strokeWidth="1.2" />
          </svg>
        </div>
      );

    // 9. 부산 나루토 어묵 (Pink Swirl Narutomaki & Fish Cake)
    case 'fish_cake':
      return (
        <div className={`relative ${dim} flex items-center justify-center ${className}`} title="나루토 어묵">
          <svg viewBox="0 0 48 48" className="w-full h-full drop-shadow-md">
            {/* Wavy scalloped outer circle */}
            <circle cx="24" cy="24" r="18" fill="#FFFFFF" stroke="#F472B6" strokeWidth="2" />
            {/* Inner soft cream fill */}
            <circle cx="24" cy="24" r="15" fill="#FFF1F2" />
            {/* Iconic pink spiral */}
            <path
              d="M24,24 
                 m -2, 0 
                 a 2,2 0 1,1 4,0 
                 a 5,5 0 1,0 -10,0 
                 a 8,8 0 1,0 16,0 
                 a 11,11 0 1,0 -22,0"
              fill="none"
              stroke="#EC4899"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      );

    // 10. 특제 간장 두툼 차슈 (Braised Pork Chashu Slice)
    case 'chashu':
      return (
        <div className={`relative ${dim} flex items-center justify-center ${className}`} title="두툼 차슈">
          <svg viewBox="0 0 48 48" className="w-full h-full drop-shadow-md">
            {/* Outer braised caramelized rim */}
            <circle cx="24" cy="24" r="19" fill="#78350F" stroke="#451A03" strokeWidth="2" />
            {/* Tender meat layer */}
            <circle cx="24" cy="24" r="16" fill="#A16207" />
            {/* Fat marbling ring */}
            <ellipse cx="23" cy="23" rx="12" ry="11" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5" />
            {/* Core meat center */}
            <circle cx="22" cy="23" r="6" fill="#854D0E" />
            {/* Sear marks */}
            <line x1="14" y1="18" x2="34" y2="28" stroke="#451A03" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="18" y1="14" x2="32" y2="34" stroke="#451A03" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>
      );

    // 11. 통통한 칵테일 새우 (Plump Grilled Shrimp)
    case 'shrimp':
      return (
        <div className={`relative ${dim} flex items-center justify-center ${className}`} title="통통 새우">
          <svg viewBox="0 0 48 48" className="w-full h-full drop-shadow-md">
            {/* Curled shrimp body */}
            <path
              d="M32,10 C22,6 10,14 10,26 C10,36 22,42 32,36 C38,32 40,24 36,18 C33,14 30,18 28,22 C26,26 22,28 18,24 C16,22 16,18 20,14 C24,10 28,12 32,10 Z"
              fill="#FB923C"
              stroke="#EA580C"
              strokeWidth="2"
            />
            {/* Orange segmented stripes */}
            <path d="M12,22 Q20,18 24,14" fill="none" stroke="#C2410C" strokeWidth="2" strokeLinecap="round" />
            <path d="M11,28 Q20,26 26,20" fill="none" stroke="#C2410C" strokeWidth="2" strokeLinecap="round" />
            <path d="M16,35 Q24,32 30,26" fill="none" stroke="#C2410C" strokeWidth="2" strokeLinecap="round" />
            {/* Tail fins */}
            <path d="M32,36 L40,42 L38,34 Z" fill="#F97316" stroke="#C2410C" strokeWidth="1.5" />
            <path d="M34,36 L42,37 L38,32 Z" fill="#FB923C" stroke="#C2410C" strokeWidth="1.5" />
          </svg>
        </div>
      );

    // 12. 톡톡 옥수수콘 (Sweet Corn Kernels)
    case 'corn':
      return (
        <div className={`relative ${dim} flex items-center justify-center ${className}`} title="스위트콘">
          <svg viewBox="0 0 48 48" className="w-full h-full drop-shadow-sm">
            {/* Cluster of golden shiny kernels */}
            <g transform="translate(14, 12)">
              <rect x="0" y="0" width="10" height="12" rx="4" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
              <ellipse cx="4" cy="4" rx="2" ry="1" fill="#FEF08A" />
            </g>
            <g transform="translate(24, 10)">
              <rect x="0" y="0" width="10" height="13" rx="4" fill="#EAB308" stroke="#A16207" strokeWidth="1.5" />
              <ellipse cx="4" cy="4" rx="2" ry="1" fill="#FEF08A" />
            </g>
            <g transform="translate(8, 22)">
              <rect x="0" y="0" width="11" height="12" rx="4" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
              <ellipse cx="4" cy="4" rx="2" ry="1" fill="#FEF9C3" />
            </g>
            <g transform="translate(19, 21)">
              <rect x="0" y="0" width="11" height="13" rx="4" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
              <ellipse cx="4" cy="4" rx="2" ry="1" fill="#FEF08A" />
            </g>
            <g transform="translate(29, 20)">
              <rect x="0" y="0" width="10" height="12" rx="4" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
            </g>
          </svg>
        </div>
      );

    // 13. 알싸한 청양고추 슬라이스 (Sliced Cheongyang Chili Pepper)
    case 'cheongyang_pepper':
      return (
        <div className={`relative ${dim} flex items-center justify-center ${className}`} title="청양고추">
          <svg viewBox="0 0 48 48" className="w-full h-full drop-shadow-sm">
            {/* Chili slice 1 */}
            <g transform="translate(8, 10) rotate(-15)">
              <ellipse cx="12" cy="14" rx="10" ry="8" fill="#15803D" stroke="#14532D" strokeWidth="2" />
              <ellipse cx="12" cy="14" rx="6.5" ry="5" fill="#4ADE80" />
              {/* Seeds */}
              <circle cx="10" cy="13" r="1.5" fill="#FEF9C3" stroke="#CA8A04" strokeWidth="0.8" />
              <circle cx="14" cy="14" r="1.5" fill="#FEF9C3" stroke="#CA8A04" strokeWidth="0.8" />
            </g>
            {/* Chili slice 2 */}
            <g transform="translate(20, 18) rotate(25)">
              <ellipse cx="11" cy="13" rx="11" ry="8.5" fill="#16A34A" stroke="#14532D" strokeWidth="2" />
              <ellipse cx="11" cy="13" rx="7" ry="5.5" fill="#86EFAC" />
              {/* Seeds */}
              <circle cx="9" cy="12" r="1.6" fill="#FEF9C3" stroke="#CA8A04" strokeWidth="0.8" />
              <circle cx="13" cy="13" r="1.6" fill="#FEF9C3" stroke="#CA8A04" strokeWidth="0.8" />
            </g>
          </svg>
        </div>
      );

    // 14. 바삭 김가루 / 도시락김 (Crispy Seaweed / Nori)
    case 'seaweed':
      return (
        <div className={`relative ${dim} flex items-center justify-center ${className}`} title="바삭 김">
          <svg viewBox="0 0 48 48" className="w-full h-full drop-shadow-sm">
            {/* Seaweed Sheet 1 */}
            <rect x="8" y="10" width="22" height="28" rx="2" fill="#1E293B" stroke="#0F172A" strokeWidth="1.5" transform="rotate(-12 19 24)" />
            <rect x="10" y="12" width="18" height="24" rx="1.5" fill="#334155" opacity="0.4" transform="rotate(-12 19 24)" />
            {/* Seaweed Sheet 2 */}
            <rect x="20" y="12" width="20" height="26" rx="2" fill="#0F172A" stroke="#020617" strokeWidth="1.5" transform="rotate(10 30 25)" />
            {/* Roasted green flecks */}
            <circle cx="18" cy="22" r="1" fill="#475569" />
            <circle cx="28" cy="26" r="1" fill="#475569" />
            <circle cx="32" cy="18" r="1" fill="#475569" />
          </svg>
        </div>
      );

    // 15. 쫄깃 표고버섯 (Shiitake Mushroom with Star Score)
    case 'mushroom':
      return (
        <div className={`relative ${dim} flex items-center justify-center ${className}`} title="표고버섯">
          <svg viewBox="0 0 48 48" className="w-full h-full drop-shadow-md">
            {/* Mushroom Cap */}
            <circle cx="24" cy="24" r="18" fill="#78350F" stroke="#451A03" strokeWidth="2" />
            <circle cx="24" cy="24" r="15" fill="#92400E" />
            {/* Star carve incisions */}
            <line x1="24" y1="10" x2="24" y2="38" stroke="#FEF3C7" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="10" y1="24" x2="38" y2="24" stroke="#FEF3C7" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="14" y1="14" x2="34" y2="34" stroke="#FEF3C7" strokeWidth="2" strokeLinecap="round" />
            <line x1="14" y1="34" x2="34" y2="14" stroke="#FEF3C7" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      );

    // 16. 탱글 통통 오징어 (Squid Rings)
    case 'squid':
      return (
        <div className={`relative ${dim} flex items-center justify-center ${className}`} title="탱글 오징어">
          <svg viewBox="0 0 48 48" className="w-full h-full drop-shadow-md">
            {/* Squid Ring 1 */}
            <ellipse cx="18" cy="22" rx="12" ry="9" fill="#FFF1F2" stroke="#E11D48" strokeWidth="2.5" transform="rotate(-15 18 22)" />
            <ellipse cx="18" cy="22" rx="6" ry="4.5" fill="#F43F5E" opacity="0.2" transform="rotate(-15 18 22)" />
            {/* Squid Ring 2 */}
            <ellipse cx="28" cy="28" rx="11" ry="8" fill="#FFFFFF" stroke="#BE123C" strokeWidth="2.5" transform="rotate(20 28 28)" />
            <ellipse cx="28" cy="28" rx="5.5" ry="4" fill="#E11D48" opacity="0.2" transform="rotate(20 28 28)" />
          </svg>
        </div>
      );

    // 17. 문어 비엔나 소시지 (Octopus Vienna Sausage)
    case 'sausage':
      return (
        <div className={`relative ${dim} flex items-center justify-center ${className}`} title="문어 비엔나">
          <svg viewBox="0 0 48 48" className="w-full h-full drop-shadow-md">
            {/* Sausage Head */}
            <path
              d="M16,18 C16,10 32,10 32,18 L34,26 C36,32 38,36 40,38 L36,38 C34,34 32,30 30,26 L30,38 L26,38 L26,26 L22,26 L22,38 L18,38 L18,26 C16,30 14,34 12,38 L8,38 C10,36 12,32 14,26 Z"
              fill="#E11D48"
              stroke="#9F1239"
              strokeWidth="2"
            />
            {/* Cute eyes */}
            <circle cx="21" cy="16" r="1.5" fill="#000000" />
            <circle cx="27" cy="16" r="1.5" fill="#000000" />
            {/* Mouth */}
            <circle cx="24" cy="20" r="1.5" fill="#FFF1F2" />
          </svg>
        </div>
      );

    // 18. 다진 마늘 듬뿍 (Minced Garlic Spoonful)
    case 'garlic':
      return (
        <div className={`relative ${dim} flex items-center justify-center ${className}`} title="다진 마늘">
          <svg viewBox="0 0 48 48" className="w-full h-full drop-shadow-sm">
            {/* Heaping mound of minced garlic */}
            <ellipse cx="24" cy="26" rx="16" ry="12" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
            <circle cx="18" cy="22" r="4.5" fill="#FEF9C3" />
            <circle cx="26" cy="20" r="5" fill="#FEFCE8" />
            <circle cx="28" cy="26" r="4.2" fill="#FEF08A" />
            <circle cx="22" cy="28" r="4" fill="#FDE047" opacity="0.8" />
            <circle cx="15" cy="27" r="3.5" fill="#FEF9C3" />
            <circle cx="31" cy="23" r="3" fill="#FEFCE8" />
          </svg>
        </div>
      );

    // 19. 바삭 튀김가루 (Crispy Tempura Flakes / Tenkasu)
    case 'tempura':
      return (
        <div className={`relative ${dim} flex items-center justify-center ${className}`} title="튀김가루">
          <svg viewBox="0 0 48 48" className="w-full h-full drop-shadow-sm">
            {/* Crunchy golden tempura beads */}
            <circle cx="16" cy="16" r="5" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />
            <circle cx="26" cy="14" r="4" fill="#FCD34D" stroke="#D97706" strokeWidth="1" />
            <circle cx="34" cy="18" r="4.5" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
            <circle cx="14" cy="26" r="4.2" fill="#FCD34D" stroke="#D97706" strokeWidth="1" />
            <circle cx="22" cy="24" r="5.5" fill="#FBBF24" stroke="#D97706" strokeWidth="1.2" />
            <circle cx="32" cy="27" r="4.8" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />
            <circle cx="20" cy="34" r="3.8" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
            <circle cx="28" cy="35" r="4" fill="#FCD34D" stroke="#D97706" strokeWidth="1" />
          </svg>
        </div>
      );

    default:
      return null;
  }
};

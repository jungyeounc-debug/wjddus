/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CheolwoongMood } from '../types/game';

interface CheolwoongAvatarProps {
  mood?: CheolwoongMood | 'greeting' | 'cooking' | 'happy' | 'cheering' | string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  className?: string;
  showBadge?: boolean;
  animated?: boolean;
}

export const CheolwoongAvatar: React.FC<CheolwoongAvatarProps> = ({
  mood = 'normal',
  size = 'md',
  className = '',
  showBadge = false,
  animated = true,
}) => {
  // Normalize mood
  const normalizedMood: CheolwoongMood = (() => {
    if (mood === 'greeting' || mood === 'cheering' || mood === 'happy') return 'smile';
    if (mood === 'cooking') return 'serious';
    if (
      mood === 'smile' ||
      mood === 'touched' ||
      mood === 'shocked' ||
      mood === 'pout' ||
      mood === 'serious' ||
      mood === 'sleepy' ||
      mood === 'normal'
    ) {
      return mood;
    }
    return 'normal';
  })();

  // Size mapping in pixels / Tailwind classes
  const sizeMap: Record<string, string> = {
    xs: 'w-8 h-8',
    sm: 'w-10 h-10',
    md: 'w-16 h-16 sm:w-20 sm:h-20',
    lg: 'w-24 h-24 sm:w-28 sm:h-28',
    xl: 'w-32 h-32 sm:w-40 sm:h-40',
  };

  const containerSizeClass = typeof size === 'number' ? '' : sizeMap[size] || sizeMap.md;
  const inlineStyle = typeof size === 'number' ? { width: size, height: size } : undefined;

  return (
    <div
      style={inlineStyle}
      className={`relative inline-flex items-center justify-center shrink-0 select-none overflow-visible ${containerSizeClass} ${className}`}
    >
      {/* Outer Glow / Halo for high moods */}
      {(normalizedMood === 'smile' || normalizedMood === 'touched') && (
        <div className="absolute -inset-1 rounded-full bg-amber-400/20 blur-xs -z-10 animate-pulse" />
      )}
      {normalizedMood === 'shocked' && (
        <div className="absolute -inset-1 rounded-full bg-blue-400/25 blur-xs -z-10 animate-ping" />
      )}
      {normalizedMood === 'pout' && (
        <div className="absolute -inset-1 rounded-full bg-rose-400/20 blur-xs -z-10" />
      )}

      {/* Main Vector SVG */}
      <svg
        viewBox="0 0 200 200"
        className={`w-full h-full drop-shadow-md transition-transform duration-300 ${
          animated && normalizedMood === 'smile' ? 'hover:scale-105' : ''
        }`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Skin gradient */}
          <linearGradient id="cheolwoong_skin" x1="100" y1="40" x2="100" y2="150" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFEAD9" />
            <stop offset="1" stopColor="#FAD4BF" />
          </linearGradient>

          {/* Shock forehead shadow */}
          <linearGradient id="shock_shadow" x1="100" y1="40" x2="100" y2="90" gradientUnits="userSpaceOnUse">
            <stop stopColor="#60A5FA" stopOpacity="0.6" />
            <stop offset="1" stopColor="#3B82F6" stopOpacity="0" />
          </linearGradient>

          {/* Chef Headband gradient */}
          <linearGradient id="headband_grad" x1="40" y1="50" x2="160" y2="50" gradientUnits="userSpaceOnUse">
            <stop stopColor="#EF4444" />
            <stop offset="0.5" stopColor="#DC2626" />
            <stop offset="1" stopColor="#B91C1C" />
          </linearGradient>

          {/* Apron gradient */}
          <linearGradient id="apron_grad" x1="100" y1="140" x2="100" y2="200" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F59E0B" />
            <stop offset="1" stopColor="#D97706" />
          </linearGradient>

          {/* Hair color */}
          <linearGradient id="hair_grad" x1="100" y1="20" x2="100" y2="80" gradientUnits="userSpaceOnUse">
            <stop stopColor="#38251E" />
            <stop offset="1" stopColor="#1E130F" />
          </linearGradient>
        </defs>

        {/* --- CHEST & CHEF APRON --- */}
        <g id="body">
          {/* Chef White Shirt Collar & Shoulders */}
          <path
            d="M 38 195 Q 40 148 70 142 L 100 156 L 130 142 Q 160 148 162 195 Z"
            fill="#FFFFFF"
            stroke="#261A15"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Red Neckerchief tie */}
          <path
            d="M 86 148 L 100 166 L 114 148 Q 100 152 86 148 Z"
            fill="#EF4444"
            stroke="#B91C1C"
            strokeWidth="2"
          />

          {/* Apron Straps & Body */}
          <path
            d="M 52 195 L 64 150 L 136 150 L 148 195 Z"
            fill="url(#apron_grad)"
            stroke="#261A15"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Apron Pocket with Yeon Ramen Logo */}
          <rect
            x="76"
            y="164"
            width="48"
            height="32"
            rx="6"
            fill="#FEF3C7"
            stroke="#B45309"
            strokeWidth="2"
          />
          {/* Logo on pocket */}
          <text
            x="100"
            y="184"
            textAnchor="middle"
            fill="#B45309"
            fontSize="13"
            fontWeight="900"
            fontFamily="sans-serif"
          >
            연라면
          </text>
        </g>

        {/* --- EARS --- */}
        <g id="ears">
          {/* Left ear */}
          <ellipse cx="48" cy="102" rx="10" ry="14" fill="#FFEAD9" stroke="#261A15" strokeWidth="3" />
          <path d="M 49 96 Q 44 102 50 108" stroke="#D79E84" strokeWidth="2" strokeLinecap="round" />

          {/* Right ear */}
          <ellipse cx="152" cy="102" rx="10" ry="14" fill="#FFEAD9" stroke="#261A15" strokeWidth="3" />
          <path d="M 151 96 Q 156 102 150 108" stroke="#D79E84" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* --- HAIR (BACK & SIDES) --- */}
        <g id="hair-back">
          <path
            d="M 44 95 Q 36 60 70 30 Q 100 24 130 30 Q 164 60 156 95"
            fill="url(#hair_grad)"
            stroke="#261A15"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Hair tufts peeking on sides */}
          <path d="M 44 85 Q 34 88 40 98 Q 38 108 46 112" fill="#261A15" />
          <path d="M 156 85 Q 166 88 160 98 Q 162 108 154 112" fill="#261A15" />
        </g>

        {/* --- FACE SHAPE --- */}
        <g id="face">
          {/* Cute chubby face */}
          <path
            d="M 50 92 C 48 135 68 152 100 152 C 132 152 152 135 150 92 C 148 60 134 52 100 52 C 66 52 52 60 50 92 Z"
            fill="url(#cheolwoong_skin)"
            stroke="#261A15"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Shock Forehead Shadow (당황할 때 이마에 파란 그늘) */}
          {normalizedMood === 'shocked' && (
            <path
              d="M 58 64 C 64 56 136 56 142 64 C 140 86 130 96 100 96 C 70 96 60 86 58 64 Z"
              fill="url(#shock_shadow)"
            />
          )}
        </g>

        {/* --- CHEF HEADBAND (두건 / 머리띠) --- */}
        <g id="headband">
          {/* Red Twisted Headband across forehead */}
          <path
            d="M 46 64 C 68 56 132 56 154 64 L 152 75 C 130 68 70 68 48 75 Z"
            fill="url(#headband_grad)"
            stroke="#261A15"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Headband twist pattern / stripes */}
          <path d="M 68 62 L 64 71" stroke="#FEE2E2" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 90 60 L 86 69" stroke="#FEE2E2" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 112 60 L 108 69" stroke="#FEE2E2" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 134 62 L 130 71" stroke="#FEE2E2" strokeWidth="2.5" strokeLinecap="round" />

          {/* Golden Center Ramen Knot / Emblem */}
          <circle cx="100" cy="65" r="7.5" fill="#FCD34D" stroke="#78350F" strokeWidth="2" />
          <path d="M 96 65 Q 100 62 104 65 Q 100 68 96 65" fill="#DC2626" />

          {/* Side knot ties fluttering */}
          <path
            d="M 152 68 Q 166 66 172 74 Q 164 78 152 74 Z"
            fill="#DC2626"
            stroke="#261A15"
            strokeWidth="2"
          />
          <path
            d="M 153 73 Q 168 78 170 88 Q 160 86 151 77 Z"
            fill="#B91C1C"
            stroke="#261A15"
            strokeWidth="2"
          />

          {/* Spiky hair tufts coming out from under headband */}
          <path d="M 72 58 Q 78 48 84 57" fill="#261A15" stroke="#261A15" strokeWidth="2" />
          <path d="M 114 57 Q 120 46 128 58" fill="#261A15" stroke="#261A15" strokeWidth="2" />
          <path d="M 94 56 Q 100 44 104 56" fill="#261A15" stroke="#261A15" strokeWidth="2" />
        </g>

        {/* --- CHEEKS & BLUSH --- */}
        <g id="cheeks">
          {/* Normal blush */}
          {normalizedMood === 'normal' && (
            <>
              <ellipse cx="68" cy="116" rx="9" ry="6" fill="#FB7185" fillOpacity="0.4" />
              <ellipse cx="132" cy="116" rx="9" ry="6" fill="#FB7185" fillOpacity="0.4" />
            </>
          )}

          {/* Smile / Happy blush (Bright pink rosy cheeks) */}
          {normalizedMood === 'smile' && (
            <>
              <ellipse cx="66" cy="114" rx="12" ry="8" fill="#F43F5E" fillOpacity="0.5" />
              <ellipse cx="134" cy="114" rx="12" ry="8" fill="#F43F5E" fillOpacity="0.5" />
              {/* Cute cheek slashes */}
              <path d="M 62 112 L 66 116 M 68 112 L 72 116" stroke="#BE123C" strokeWidth="2" strokeLinecap="round" />
              <path d="M 128 112 L 132 116 M 134 112 L 138 116" stroke="#BE123C" strokeWidth="2" strokeLinecap="round" />
            </>
          )}

          {/* Touched blush (Deep emotional glow) */}
          {normalizedMood === 'touched' && (
            <>
              <ellipse cx="66" cy="115" rx="13" ry="9" fill="#F43F5E" fillOpacity="0.6" />
              <ellipse cx="134" cy="115" rx="13" ry="9" fill="#F43F5E" fillOpacity="0.6" />
              <path d="M 60 114 L 66 117 M 66 112 L 72 116" stroke="#BE123C" strokeWidth="2" strokeLinecap="round" />
              <path d="M 128 112 L 134 116 M 134 114 L 140 117" stroke="#BE123C" strokeWidth="2" strokeLinecap="round" />
            </>
          )}

          {/* Pout blush (Puffed round grumpy red cheeks) */}
          {normalizedMood === 'pout' && (
            <>
              <ellipse cx="62" cy="118" rx="14" ry="10" fill="#F43F5E" fillOpacity="0.65" />
              <ellipse cx="138" cy="118" rx="14" ry="10" fill="#F43F5E" fillOpacity="0.65" />
              {/* Grump lines */}
              <path d="M 58 116 L 66 120" stroke="#9F1239" strokeWidth="2" strokeLinecap="round" />
              <path d="M 134 120 L 142 116" stroke="#9F1239" strokeWidth="2" strokeLinecap="round" />
            </>
          )}

          {/* Shock blush (Pale drop) */}
          {normalizedMood === 'shocked' && (
            <>
              <ellipse cx="68" cy="118" rx="8" ry="5" fill="#93C5FD" fillOpacity="0.4" />
              <ellipse cx="132" cy="118" rx="8" ry="5" fill="#93C5FD" fillOpacity="0.4" />
            </>
          )}

          {/* Serious / Sleepy */}
          {(normalizedMood === 'serious' || normalizedMood === 'sleepy') && (
            <>
              <ellipse cx="68" cy="116" rx="8" ry="5" fill="#FB7185" fillOpacity="0.3" />
              <ellipse cx="132" cy="116" rx="8" ry="5" fill="#FB7185" fillOpacity="0.3" />
            </>
          )}
        </g>

        {/* --- NOSE --- */}
        <path
          d="M 98 106 Q 100 110 102 106"
          stroke="#B45309"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* --- EYEBROWS (표정에 따른 눈썹) --- */}
        <g id="eyebrows">
          {/* Normal eyebrows: Warm, thick, friendly chef brows */}
          {normalizedMood === 'normal' && (
            <>
              <path d="M 64 82 Q 78 77 90 82" stroke="#261A15" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M 136 82 Q 122 77 110 82" stroke="#261A15" strokeWidth="4" strokeLinecap="round" fill="none" />
            </>
          )}

          {/* Smile / Happy eyebrows: Arched high up in delight */}
          {normalizedMood === 'smile' && (
            <>
              <path d="M 62 78 Q 78 70 90 77" stroke="#261A15" strokeWidth="4.5" strokeLinecap="round" fill="none" />
              <path d="M 138 78 Q 122 70 110 77" stroke="#261A15" strokeWidth="4.5" strokeLinecap="round" fill="none" />
            </>
          )}

          {/* Touched eyebrows: Emotional, inner corners raised high */}
          {normalizedMood === 'touched' && (
            <>
              <path d="M 65 85 Q 78 81 89 74" stroke="#261A15" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M 135 85 Q 122 81 111 74" stroke="#261A15" strokeWidth="4" strokeLinecap="round" fill="none" />
            </>
          )}

          {/* Shocked eyebrows: Floating high up on forehead in disbelief */}
          {normalizedMood === 'shocked' && (
            <>
              <path d="M 64 74 Q 78 66 88 74" stroke="#261A15" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M 136 74 Q 122 66 112 74" stroke="#261A15" strokeWidth="4" strokeLinecap="round" fill="none" />
            </>
          )}

          {/* Pout eyebrows: Furrowed down grumpy angle */}
          {normalizedMood === 'pout' && (
            <>
              <path d="M 64 77 Q 78 82 89 86" stroke="#261A15" strokeWidth="4.5" strokeLinecap="round" fill="none" />
              <path d="M 136 77 Q 122 82 111 86" stroke="#261A15" strokeWidth="4.5" strokeLinecap="round" fill="none" />
            </>
          )}

          {/* Serious eyebrows: Sharply concentrated down */}
          {normalizedMood === 'serious' && (
            <>
              <path d="M 65 78 L 88 84" stroke="#261A15" strokeWidth="5" strokeLinecap="round" fill="none" />
              <path d="M 135 78 L 112 84" stroke="#261A15" strokeWidth="5" strokeLinecap="round" fill="none" />
              {/* Brow furrow wrinkle */}
              <path d="M 97 81 L 97 85 M 103 81 L 103 85" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
            </>
          )}

          {/* Sleepy eyebrows: Straight relaxed */}
          {normalizedMood === 'sleepy' && (
            <>
              <path d="M 65 83 L 88 83" stroke="#261A15" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              <path d="M 135 83 L 112 83" stroke="#261A15" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            </>
          )}
        </g>

        {/* --- EYES (표정에 따른 눈) --- */}
        <g id="eyes">
          {/* 1. NORMAL: Big bright cute eyes with warm highlights */}
          {normalizedMood === 'normal' && (
            <>
              {/* Left eye */}
              <circle cx="76" cy="98" r="8.5" fill="#261A15" />
              <circle cx="73.5" cy="95.5" r="3.2" fill="#FFFFFF" />
              <circle cx="78.5" cy="100.5" r="1.4" fill="#FFFFFF" />
              {/* Right eye */}
              <circle cx="124" cy="98" r="8.5" fill="#261A15" />
              <circle cx="121.5" cy="95.5" r="3.2" fill="#FFFFFF" />
              <circle cx="126.5" cy="100.5" r="1.4" fill="#FFFFFF" />
            </>
          )}

          {/* 2. SMILE: Closed inverted crescent laughing eyes (^ ^) */}
          {normalizedMood === 'smile' && (
            <>
              {/* Left eye smile arc */}
              <path
                d="M 66 99 Q 76 87 86 99"
                stroke="#261A15"
                strokeWidth="4.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 68 103 Q 76 96 84 103"
                stroke="#261A15"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              {/* Right eye smile arc */}
              <path
                d="M 114 99 Q 124 87 134 99"
                stroke="#261A15"
                strokeWidth="4.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 116 103 Q 124 96 132 103"
                stroke="#261A15"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
            </>
          )}

          {/* 3. TOUCHED: Oversized glittering anime star eyes with shimmering highlights & tear drops */}
          {normalizedMood === 'touched' && (
            <>
              {/* Left big tearful anime eye */}
              <ellipse cx="76" cy="97" rx="11" ry="12" fill="#1E293B" />
              <ellipse cx="76" cy="103" rx="8" ry="4" fill="#38BDF8" fillOpacity="0.7" />
              {/* Giant star highlight */}
              <polygon
                points="74,90 76,94 80,94 77,97 78,101 74,98 70,101 71,97 68,94 72,94"
                fill="#FFFFFF"
              />
              <circle cx="81" cy="101" r="2" fill="#FFFFFF" />
              <circle cx="70" cy="101" r="1.5" fill="#FFFFFF" />

              {/* Right big tearful anime eye */}
              <ellipse cx="124" cy="97" rx="11" ry="12" fill="#1E293B" />
              <ellipse cx="124" cy="103" rx="8" ry="4" fill="#38BDF8" fillOpacity="0.7" />
              {/* Giant star highlight */}
              <polygon
                points="122,90 124,94 128,94 125,97 126,101 122,98 118,101 119,97 116,94 120,94"
                fill="#FFFFFF"
              />
              <circle cx="129" cy="101" r="2" fill="#FFFFFF" />
              <circle cx="118" cy="101" r="1.5" fill="#FFFFFF" />

              {/* Shimmering tear droplets on corner */}
              <ellipse cx="62" cy="104" rx="2.5" ry="3.5" fill="#7DD3FC" stroke="#0284C7" strokeWidth="1" />
              <ellipse cx="138" cy="104" rx="2.5" ry="3.5" fill="#7DD3FC" stroke="#0284C7" strokeWidth="1" />
            </>
          )}

          {/* 4. SHOCKED: Wide white blank eyes with tiny contracted pupils */}
          {normalizedMood === 'shocked' && (
            <>
              {/* Left shocked eye */}
              <ellipse cx="75" cy="97" rx="12" ry="13" fill="#FFFFFF" stroke="#261A15" strokeWidth="3" />
              <circle cx="75" cy="97" r="3.2" fill="#1E293B" />

              {/* Right shocked eye */}
              <ellipse cx="125" cy="97" rx="12" ry="13" fill="#FFFFFF" stroke="#261A15" strokeWidth="3" />
              <circle cx="125" cy="97" r="3.2" fill="#1E293B" />
            </>
          )}

          {/* 5. POUT: Squinting grumpy eyes looking sideways */}
          {normalizedMood === 'pout' && (
            <>
              {/* Left eye pout squint */}
              <path
                d="M 68 96 Q 76 92 84 96 L 80 102 Q 74 100 68 96 Z"
                fill="#261A15"
                stroke="#261A15"
                strokeWidth="2"
              />
              <circle cx="74" cy="96.5" r="1.5" fill="#FFFFFF" />

              {/* Right eye pout squint */}
              <path
                d="M 116 96 Q 124 92 132 96 L 128 102 Q 122 100 116 96 Z"
                fill="#261A15"
                stroke="#261A15"
                strokeWidth="2"
              />
              <circle cx="122" cy="96.5" r="1.5" fill="#FFFFFF" />
            </>
          )}

          {/* 6. SERIOUS: Sharp focused eyes */}
          {normalizedMood === 'serious' && (
            <>
              <path d="M 68 94 Q 77 91 85 96" stroke="#261A15" strokeWidth="3.5" fill="none" />
              <circle cx="77" cy="99" r="6.5" fill="#261A15" />
              <circle cx="75" cy="97" r="2.2" fill="#FFFFFF" />

              <path d="M 132 94 Q 123 91 115 96" stroke="#261A15" strokeWidth="3.5" fill="none" />
              <circle cx="123" cy="99" r="6.5" fill="#261A15" />
              <circle cx="121" cy="97" r="2.2" fill="#FFFFFF" />
            </>
          )}

          {/* 7. SLEEPY: Drooping sleepy curved lines */}
          {normalizedMood === 'sleepy' && (
            <>
              <path d="M 68 98 Q 76 103 84 98" stroke="#261A15" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              <path d="M 116 98 Q 124 103 132 98" stroke="#261A15" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            </>
          )}
        </g>

        {/* --- MOUTH (표정에 따른 입) --- */}
        <g id="mouth">
          {/* Normal mouth: Warm friendly slight smile */}
          {normalizedMood === 'normal' && (
            <path
              d="M 91 123 Q 100 131 109 123"
              stroke="#831843"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
          )}

          {/* Smile / Happy mouth: Wide joyful open mouth with tongue */}
          {normalizedMood === 'smile' && (
            <g>
              <path
                d="M 87 121 Q 100 142 113 121 Q 100 120 87 121 Z"
                fill="#BE123C"
                stroke="#881337"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              {/* Cute tongue */}
              <path
                d="M 93 131 Q 100 127 107 131 Q 100 141 93 131 Z"
                fill="#FDA4AF"
              />
              {/* Upper tooth bar */}
              <path d="M 93 122 Q 100 125 107 122" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          )}

          {/* Touched mouth: Trembling emotional warm curve */}
          {normalizedMood === 'touched' && (
            <path
              d="M 90 125 Q 95 120 100 125 Q 105 130 110 125"
              stroke="#831843"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
          )}

          {/* Shocked mouth: Wavy trembling open O */}
          {normalizedMood === 'shocked' && (
            <ellipse
              cx="100"
              cy="128"
              rx="9"
              ry="11"
              fill="#881337"
              stroke="#261A15"
              strokeWidth="2.5"
            />
          )}

          {/* Pout mouth: Grumpy squiggly puckered lips with lower lip sticking out */}
          {normalizedMood === 'pout' && (
            <g>
              <path
                d="M 91 127 Q 96 123 100 127 Q 105 123 109 127"
                stroke="#831843"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
              {/* Lower pouting lip shadow */}
              <path
                d="M 95 131 Q 100 134 105 131"
                stroke="#9F1239"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          )}

          {/* Serious mouth: Firmly shut straight line */}
          {normalizedMood === 'serious' && (
            <path
              d="M 91 126 L 109 126"
              stroke="#831843"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          )}

          {/* Sleepy mouth: Small round yawn with drool */}
          {normalizedMood === 'sleepy' && (
            <g>
              <circle cx="100" cy="126" r="5" fill="#881337" stroke="#261A15" strokeWidth="2" />
              {/* Drool drop */}
              <circle cx="106" cy="132" r="2" fill="#7DD3FC" />
            </g>
          )}
        </g>

        {/* --- MOOD SPECIAL EFFECTS (땀방울, 콧김, 반짝이, 하트) --- */}
        {/* Shock sweat drops (파란 식은땀 삐질) */}
        {normalizedMood === 'shocked' && (
          <g id="sweat-drops" className="animate-bounce">
            <path
              d="M 148 68 C 145 68 141 73 141 77 C 141 81 144 84 148 84 C 152 84 155 81 155 77 C 155 73 151 68 148 68 Z"
              fill="#38BDF8"
              stroke="#0284C7"
              strokeWidth="1.5"
            />
            {/* Small second drop */}
            <circle cx="156" cy="88" r="3" fill="#38BDF8" />
            {/* Vertical sweat tension lines */}
            <path d="M 60 70 L 60 82 M 64 68 L 64 84" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" />
          </g>
        )}

        {/* Pout steam puffs (부푼 볼 콧김 / 연기) */}
        {normalizedMood === 'pout' && (
          <g id="steam-puffs" className="animate-pulse">
            {/* Left steam puff */}
            <path
              d="M 44 116 Q 34 110 38 104 Q 46 104 46 112 Z"
              fill="#E2E8F0"
              stroke="#94A3B8"
              strokeWidth="1.5"
            />
            {/* Right steam puff */}
            <path
              d="M 156 116 Q 166 110 162 104 Q 154 104 154 112 Z"
              fill="#E2E8F0"
              stroke="#94A3B8"
              strokeWidth="1.5"
            />
            {/* Angry mark */}
            <path
              d="M 144 64 L 152 64 M 148 60 L 148 68"
              stroke="#EF4444"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </g>
        )}

        {/* Smile sparkles & joy stars */}
        {normalizedMood === 'smile' && (
          <g id="smile-sparkles">
            <polygon points="160,54 162,58 166,60 162,62 160,66 158,62 154,60 158,58" fill="#FBBF24" />
            <polygon points="38,62 40,65 43,66 40,67 38,70 37,67 34,66 37,65" fill="#FBBF24" />
          </g>
        )}

        {/* Touched floating hearts */}
        {normalizedMood === 'touched' && (
          <g id="touched-hearts">
            <path
              d="M 160 56 C 160 52 154 50 152 54 C 150 50 144 52 144 56 C 144 62 152 67 152 67 C 152 67 160 62 160 56 Z"
              fill="#F43F5E"
            />
            <polygon points="42,54 44,57 47,58 44,59 42,62 41,59 38,58 41,57" fill="#F43F5E" />
          </g>
        )}

        {/* Sleepy zZZ */}
        {normalizedMood === 'sleepy' && (
          <g id="sleepy-zzz">
            <text x="150" y="65" fill="#3B82F6" fontSize="16" fontWeight="900" fontFamily="sans-serif">
              z
            </text>
            <text x="162" y="52" fill="#60A5FA" fontSize="20" fontWeight="900" fontFamily="sans-serif">
              Z
            </text>
          </g>
        )}
      </svg>

      {/* Optional Mood Pill Badge */}
      {showBadge && (
        <div className="absolute -bottom-2 inset-x-0 mx-auto w-max px-2 py-0.5 bg-amber-700 text-white text-[10px] font-bold rounded-full shadow border border-white flex items-center gap-1 z-20">
          <span>철웅 사장</span>
          <span>
            {normalizedMood === 'smile' && '😊'}
            {normalizedMood === 'touched' && '🥺'}
            {normalizedMood === 'shocked' && '😱'}
            {normalizedMood === 'pout' && '😤'}
            {normalizedMood === 'serious' && '🔥'}
            {normalizedMood === 'sleepy' && '🥱'}
            {normalizedMood === 'normal' && '👨‍🍳'}
          </span>
        </div>
      )}
    </div>
  );
};

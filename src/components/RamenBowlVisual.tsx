/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  BowlCustomization,
  BrothType,
  NoodleDoneness,
  NoodleType,
  RamenCategory,
  SpicyLevel,
  ToppingId,
  WaterLevel,
} from '../types/game';
import { BROTH_LIST, BOWL_COLORS, TOPPING_LIST } from '../utils/gameData';
import { ToppingVisual } from './ToppingVisual';

interface RamenBowlVisualProps {
  ramenCategory?: RamenCategory;
  noodleType?: NoodleType;
  waterLevel?: WaterLevel;
  broth?: BrothType;
  spicyLevel?: SpicyLevel;
  noodle?: NoodleDoneness;
  toppings?: ToppingId[];
  bowlSkinId?: string;
  bowlConfig?: BowlCustomization;
  isBoiling?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showSteam?: boolean;
}

export const RamenBowlVisual: React.FC<RamenBowlVisualProps> = ({
  ramenCategory = 'soup',
  noodleType = 'basic',
  waterLevel = 'normal',
  broth = 'spicy',
  spicyLevel = 1,
  noodle = 'firm',
  toppings = [],
  bowlSkinId,
  bowlConfig,
  isBoiling = false,
  size = 'md',
  showSteam = true,
}) => {
  const currentBroth = BROTH_LIST.find((b) => b.id === broth) || BROTH_LIST[0];

  // Resolve shape and colors from bowlConfig or legacy bowlSkinId
  const shape = bowlConfig?.shape || (bowlSkinId === 'frying_pan' ? 'flat_plate' : 'classic_pot');
  const colorId = bowlConfig?.color || 'yellow';
  const pattern = bowlConfig?.pattern || 'none';

  const colorDef = BOWL_COLORS.find((c) => c.id === colorId) || BOWL_COLORS[0];
  const bowlColor = colorDef.bgHex;
  const rimColor = colorDef.rimHex;

  // Water level height/scale factor (adjusted for stir-fried / bibim vs soup)
  const isDryNoodle = ramenCategory === 'stir' || ramenCategory === 'bibim' || ramenCategory === 'jjajang';
  const waterFillRatio = isDryNoodle
    ? waterLevel === 'less'
      ? 0.72
      : waterLevel === 'more'
      ? 0.84
      : 0.78
    : waterLevel === 'less'
    ? 0.72
    : waterLevel === 'more'
    ? 0.95
    : 0.85;

  // Size configurations
  const dimensions = {
    sm: 'w-28 h-28',
    md: 'w-52 h-52 sm:w-60 sm:h-60',
    lg: 'w-64 h-64 sm:w-72 sm:h-72',
    hero: 'w-72 h-72 sm:w-80 sm:h-80',
  }[size];

  // Specific topping coordinates for beautiful, natural stacking
  const toppingSlots = [
    { x: '28%', y: '30%', rot: '-8deg', scale: 1 },
    { x: '62%', y: '28%', rot: '12deg', scale: 1 },
    { x: '45%', y: '48%', rot: '-4deg', scale: 1.05 },
    { x: '24%', y: '58%', rot: '15deg', scale: 0.95 },
    { x: '66%', y: '60%', rot: '-12deg', scale: 1 },
    { x: '46%', y: '22%', rot: '6deg', scale: 0.9 },
    { x: '35%', y: '72%', rot: '-5deg', scale: 0.95 },
    { x: '58%', y: '74%', rot: '8deg', scale: 0.95 },
    { x: '16%', y: '42%', rot: '-18deg', scale: 0.88 },
    { x: '76%', y: '44%', rot: '18deg', scale: 0.88 },
    { x: '50%', y: '60%', rot: '3deg', scale: 0.92 },
    { x: '38%', y: '42%', rot: '-10deg', scale: 0.95 },
  ];

  return (
    <div className={`relative flex items-center justify-center select-none ${dimensions}`}>
      {/* Steam effect (Only hot noodles) */}
      {showSteam && ramenCategory !== 'bibim' && (
        <div className="absolute -top-10 inset-x-0 h-16 pointer-events-none flex justify-center gap-4 z-30">
          <div className="w-6 h-12 bg-linear-to-t from-white/60 to-transparent rounded-full filter blur-xs animate-steam-1" />
          <div className="w-8 h-14 bg-linear-to-t from-white/70 to-transparent rounded-full filter blur-xs animate-steam-2" />
          <div className="w-5 h-11 bg-linear-to-t from-white/55 to-transparent rounded-full filter blur-xs animate-steam-3" />
        </div>
      )}

      {/* Cold chill effect for bibim noodles */}
      {showSteam && ramenCategory === 'bibim' && (
        <div className="absolute -top-6 inset-x-0 h-12 pointer-events-none flex justify-center gap-3 z-30">
          <span className="text-blue-300 text-xs animate-bounce">❄️</span>
          <span className="text-cyan-200 text-xs animate-pulse">🧊</span>
          <span className="text-blue-300 text-xs animate-bounce">❄️</span>
        </div>
      )}

      {/* Pot handles if classic pot or golden pot */}
      {(shape === 'classic_pot' || shape === 'golden_pot') && (
        <>
          <div className="absolute -left-3.5 top-1/2 -translate-y-1/2 w-7 h-10 border-4 border-amber-700 rounded-l-full bg-amber-500 shadow-md z-0" />
          <div className="absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-10 border-4 border-amber-700 rounded-r-full bg-amber-500 shadow-md z-0" />
        </>
      )}

      {/* Stone pot thick handles */}
      {shape === 'stone_pot' && (
        <>
          <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-8 bg-neutral-800 rounded-l-lg border-2 border-neutral-600 shadow z-0" />
          <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-8 bg-neutral-800 rounded-r-lg border-2 border-neutral-600 shadow z-0" />
        </>
      )}

      {/* Main Bowl Outer Shell */}
      <div
        className={`relative w-full h-full shadow-2xl flex items-center justify-center overflow-hidden border-8 transition-transform duration-300 ${
          shape === 'heart_bowl' ? 'rounded-[38%]' : shape === 'flat_plate' ? 'rounded-3xl' : 'rounded-full'
        }`}
        style={{
          backgroundColor: shape === 'stone_pot' ? '#262626' : shape === 'golden_pot' ? '#EAB308' : bowlColor,
          borderColor: shape === 'stone_pot' ? '#404040' : shape === 'golden_pot' ? '#CA8A04' : rimColor,
          boxShadow: '0 14px 30px -6px rgba(0, 0, 0, 0.28), inset 0 3px 6px rgba(255, 255, 255, 0.35)',
        }}
      >
        {/* Bowl interior rim depth */}
        <div className="absolute inset-1 rounded-full border-4 border-black/15 pointer-events-none z-10" />

        {/* Patterns */}
        {pattern === 'dots' && (
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, #000 1.5px, transparent 1.5px)',
              backgroundSize: '12px 12px',
            }}
          />
        )}
        {pattern === 'stripes' && (
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 2px, transparent 0, transparent 10px)',
            }}
          />
        )}
        {pattern === 'stars' && (
          <div className="absolute inset-0 opacity-20 pointer-events-none flex flex-wrap gap-3 p-3 overflow-hidden text-[10px]">
            <span>⭐</span><span>✨</span><span>⭐</span><span>✨</span>
          </div>
        )}

        {/* Broth Liquid Layer */}
        <div
          className="relative rounded-full overflow-hidden transition-all duration-500 flex items-center justify-center shadow-inner"
          style={{
            width: `${waterFillRatio * 90}%`,
            height: `${waterFillRatio * 90}%`,
            backgroundColor: currentBroth.color,
            boxShadow: 'inset 0 6px 14px rgba(0,0,0,0.3)',
          }}
        >
          {/* Broth gradient depth & oil sheen */}
          <div
            className="absolute inset-0 rounded-full opacity-60 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 55%, rgba(0,0,0,0.35) 100%)`,
            }}
          />

          {/* Boiling bubbles if boiling */}
          {isBoiling && (
            <div className="absolute inset-0 pointer-events-none">
              <div
                className="absolute w-4 h-4 rounded-full animate-bubble-1 top-1/3 left-1/4"
                style={{ backgroundColor: currentBroth.bubbleColor }}
              />
              <div
                className="absolute w-5 h-5 rounded-full animate-bubble-2 top-1/2 left-2/3"
                style={{ backgroundColor: currentBroth.bubbleColor }}
              />
              <div
                className="absolute w-3 h-3 rounded-full animate-bubble-3 top-2/3 left-1/3"
                style={{ backgroundColor: currentBroth.bubbleColor }}
              />
            </div>
          )}

          {/* Wavy Noodles Representation: Differentiated by noodleType and doneness */}
          <svg className="absolute inset-0 w-full h-full opacity-90 pointer-events-none" viewBox="0 0 100 100">
            {(() => {
              const isJjajang =
                ramenCategory === 'jjajang' ||
                broth === 'stir_jjajang' ||
                broth === 'jjajang_classic' ||
                broth === 'jjajang_truffle';
              const isSoft = noodle === 'soft';
              const isFirm = noodle === 'firm';
              const sag = isSoft ? 3 : isFirm ? -1 : 0;

              if (noodleType === 'thin') {
                // 얇은면: 연한 노란색, 아주 가늘고 촘촘한 곡선을 많이
                const sw = isSoft ? 2.5 : isFirm ? 1.3 : 1.8;
                const c1 = isJjajang ? '#5D4037' : '#FEF9C3';
                const c2 = isJjajang ? '#4E342E' : '#FEF08A';
                const c3 = isJjajang ? '#3E2723' : '#FDE047';
                return (
                  <g>
                    {/* Dense compact multiple fine strands */}
                    <path d={`M20,${34 + sag} Q27,${28 + sag} 35,${35 + sag} T50,${33 + sag} T65,${36 + sag} T80,${32 + sag}`} fill="none" stroke={c1} strokeWidth={sw} strokeLinecap="round" />
                    <path d={`M18,${42 + sag} Q26,${37 + sag} 34,${44 + sag} T49,${41 + sag} T64,${43 + sag} T79,${39 + sag} T86,${43 + sag}`} fill="none" stroke={c2} strokeWidth={sw} strokeLinecap="round" />
                    <path d={`M22,${50 + sag} Q30,${44 + sag} 38,${52 + sag} T54,${49 + sag} T69,${51 + sag} T82,${48 + sag}`} fill="none" stroke={c1} strokeWidth={sw} strokeLinecap="round" />
                    <path d={`M17,${58 + sag} Q25,${53 + sag} 33,${60 + sag} T48,${57 + sag} T63,${59 + sag} T78,${56 + sag} T85,${60 + sag}`} fill="none" stroke={c3} strokeWidth={sw} strokeLinecap="round" />
                    <path d={`M24,${66 + sag} Q32,${61 + sag} 40,${67 + sag} T56,${65 + sag} T71,${67 + sag} T81,${64 + sag}`} fill="none" stroke={c2} strokeWidth={sw} strokeLinecap="round" />
                    <path d={`M28,${73 + sag} Q36,${68 + sag} 44,${74 + sag} T60,${72 + sag} T75,${74 + sag}`} fill="none" stroke={c1} strokeWidth={sw} strokeLinecap="round" />
                    {/* Vertical weave strands */}
                    <path d={`M32,${26 + sag} Q28,${40 + sag} 34,${55 + sag} T30,${72 + sag}`} fill="none" stroke={c2} strokeWidth={sw} strokeLinecap="round" />
                    <path d={`M50,${24 + sag} Q46,${42 + sag} 52,${58 + sag} T48,${76 + sag}`} fill="none" stroke={c1} strokeWidth={sw} strokeLinecap="round" />
                    <path d={`M68,${27 + sag} Q72,${44 + sag} 66,${60 + sag} T70,${74 + sag}`} fill="none" stroke={c3} strokeWidth={sw} strokeLinecap="round" />
                  </g>
                );
              }

              if (noodleType === 'chewy') {
                // 쫄깃면: 진한 노란색, 조금 굵고 탱탱해 보이는 큰 웨이브 + 윤기(하이라이트 선)
                const sw = isSoft ? 5.4 : isFirm ? 3.6 : 4.5;
                const baseColor = isJjajang ? '#3E2723' : '#F59E0B';
                const shadowColor = isJjajang ? '#27140B' : '#D97706';
                const shineColor = isJjajang ? '#6D4C41' : '#FEF9C3';
                return (
                  <g>
                    {/* Shadow underneath */}
                    <path d={`M22,${38 + sag + 1} Q35,${24 + sag} 48,${38 + sag} T78,${36 + sag}`} fill="none" stroke={shadowColor} strokeWidth={sw} strokeLinecap="round" />
                    <path d={`M18,${52 + sag + 1} Q32,${68 + sag} 50,${52 + sag} T82,${54 + sag}`} fill="none" stroke={shadowColor} strokeWidth={sw} strokeLinecap="round" />
                    <path d={`M24,${66 + sag + 1} Q38,${80 + sag} 55,${66 + sag} T76,${68 + sag}`} fill="none" stroke={shadowColor} strokeWidth={sw} strokeLinecap="round" />

                    {/* Main bouncy curves */}
                    <path d={`M22,${38 + sag} Q35,${24 + sag} 48,${38 + sag} T78,${36 + sag}`} fill="none" stroke={baseColor} strokeWidth={sw} strokeLinecap="round" />
                    <path d={`M18,${52 + sag} Q32,${68 + sag} 50,${52 + sag} T82,${54 + sag}`} fill="none" stroke={baseColor} strokeWidth={sw} strokeLinecap="round" />
                    <path d={`M24,${66 + sag} Q38,${80 + sag} 55,${66 + sag} T76,${68 + sag}`} fill="none" stroke={baseColor} strokeWidth={sw} strokeLinecap="round" />
                    <path d={`M34,${28 + sag} Q48,${42 + sag} 64,${28 + sag} T82,${40 + sag}`} fill="none" stroke={baseColor} strokeWidth={sw * 0.9} strokeLinecap="round" />

                    {/* High gloss bounce highlight line (윤기) */}
                    <path d={`M25,${36 + sag} Q35,${25 + sag} 45,${36 + sag} T75,${35 + sag}`} fill="none" stroke={shineColor} strokeWidth={sw * 0.32} strokeLinecap="round" />
                    <path d={`M22,${50 + sag} Q33,${64 + sag} 48,${50 + sag} T79,${52 + sag}`} fill="none" stroke={shineColor} strokeWidth={sw * 0.32} strokeLinecap="round" />
                    <path d={`M28,${64 + sag} Q39,${76 + sag} 53,${64 + sag} T73,${66 + sag}`} fill="none" stroke={shineColor} strokeWidth={sw * 0.32} strokeLinecap="round" />
                  </g>
                );
              }

              if (noodleType === 'flat') {
                // 넓적면: 납작하고 넓은 리본 모양, 완만한 웨이브
                const ribbonW = isSoft ? 13.5 : isFirm ? 8.5 : 10.5;
                const rBody = isJjajang ? '#4E342E' : '#FDE68A';
                const rEdge = isJjajang ? '#27140B' : '#D97706';
                const rShine = isJjajang ? '#6D4C41' : '#FFFBEB';
                return (
                  <g>
                    {/* Ribbon 1 */}
                    <path d={`M20,${34 + sag} Q45,${26 + sag} 80,${38 + sag}`} fill="none" stroke={rEdge} strokeWidth={ribbonW + 1.2} strokeLinecap="square" />
                    <path d={`M20,${34 + sag} Q45,${26 + sag} 80,${38 + sag}`} fill="none" stroke={rBody} strokeWidth={ribbonW} strokeLinecap="square" />
                    <path d={`M22,${33 + sag} Q45,${25 + sag} 78,${37 + sag}`} fill="none" stroke={rShine} strokeWidth={ribbonW * 0.35} strokeLinecap="square" />

                    {/* Ribbon 2 (diagonal cross) */}
                    <path d={`M18,${52 + sag} Q48,${62 + sag} 82,${48 + sag}`} fill="none" stroke={rEdge} strokeWidth={ribbonW + 1.2} strokeLinecap="square" />
                    <path d={`M18,${52 + sag} Q48,${62 + sag} 82,${48 + sag}`} fill="none" stroke={rBody} strokeWidth={ribbonW} strokeLinecap="square" />
                    <path d={`M20,${51 + sag} Q48,${61 + sag} 80,${47 + sag}`} fill="none" stroke={rShine} strokeWidth={ribbonW * 0.35} strokeLinecap="square" />

                    {/* Ribbon 3 */}
                    <path d={`M26,${68 + sag} Q52,${74 + sag} 76,${64 + sag}`} fill="none" stroke={rEdge} strokeWidth={ribbonW + 1.2} strokeLinecap="square" />
                    <path d={`M26,${68 + sag} Q52,${74 + sag} 76,${64 + sag}`} fill="none" stroke={rBody} strokeWidth={ribbonW} strokeLinecap="square" />
                    <path d={`M28,${67 + sag} Q52,${73 + sag} 74,${63 + sag}`} fill="none" stroke={rShine} strokeWidth={ribbonW * 0.35} strokeLinecap="square" />
                  </g>
                );
              }

              if (noodleType === 'udon') {
                // 우동면: 하얀색에 가까운 크림색, 아주 굵고 거의 곧은 면 몇 가닥
                const udonW = isSoft ? 15.5 : isFirm ? 10.0 : 12.5;
                const uBody = isJjajang ? '#451A03' : '#FFFBEB';
                const uShadow = isJjajang ? '#1F0C02' : '#FDE68A';
                const uHighlight = isJjajang ? '#78350F' : '#FFFFFF';
                return (
                  <g>
                    {/* Strand 1 */}
                    <path d={`M22,${36 + sag} C40,${30 + sag} 60,${40 + sag} 78,${34 + sag}`} fill="none" stroke={uShadow} strokeWidth={udonW + 1.5} strokeLinecap="round" />
                    <path d={`M22,${36 + sag} C40,${30 + sag} 60,${40 + sag} 78,${34 + sag}`} fill="none" stroke={uBody} strokeWidth={udonW} strokeLinecap="round" />
                    <path d={`M23,${34 + sag} C40,${28 + sag} 60,${38 + sag} 77,${32 + sag}`} fill="none" stroke={uHighlight} strokeWidth={udonW * 0.35} strokeLinecap="round" />

                    {/* Strand 2 */}
                    <path d={`M20,${52 + sag} C42,${56 + sag} 62,${48 + sag} 82,${54 + sag}`} fill="none" stroke={uShadow} strokeWidth={udonW + 1.5} strokeLinecap="round" />
                    <path d={`M20,${52 + sag} C42,${56 + sag} 62,${48 + sag} 82,${54 + sag}`} fill="none" stroke={uBody} strokeWidth={udonW} strokeLinecap="round" />
                    <path d={`M21,${50 + sag} C42,${54 + sag} 62,${46 + sag} 81,${52 + sag}`} fill="none" stroke={uHighlight} strokeWidth={udonW * 0.35} strokeLinecap="round" />

                    {/* Strand 3 */}
                    <path d={`M25,${68 + sag} C45,${72 + sag} 65,${66 + sag} 76,${70 + sag}`} fill="none" stroke={uShadow} strokeWidth={udonW + 1.5} strokeLinecap="round" />
                    <path d={`M25,${68 + sag} C45,${72 + sag} 65,${66 + sag} 76,${70 + sag}`} fill="none" stroke={uBody} strokeWidth={udonW} strokeLinecap="round" />
                    <path d={`M26,${66 + sag} C45,${70 + sag} 65,${64 + sag} 75,${68 + sag}`} fill="none" stroke={uHighlight} strokeWidth={udonW * 0.35} strokeLinecap="round" />
                  </g>
                );
              }

              // 기본면 (basic): 노란색, 보통 굵기의 꼬불꼬불한 곡선
              const sw = isSoft ? 4.2 : isFirm ? 2.4 : 3.0;
              const b1 = isJjajang ? '#4E342E' : '#FEF08A';
              const b2 = isJjajang ? '#3E2723' : '#FDE047';
              const b3 = isJjajang ? '#271714' : '#EAB308';
              return (
                <g>
                  <path d={`M25,${45 + sag} Q35,${35 + sag} 45,${45 + sag} T65,${45 + sag} T80,${48 + sag}`} fill="none" stroke={b1} strokeWidth={sw} strokeLinecap="round" />
                  <path d={`M20,${55 + sag} Q35,${65 + sag} 50,${55 + sag} T75,${55 + sag} T85,${58 + sag}`} fill="none" stroke={b2} strokeWidth={sw} strokeLinecap="round" />
                  <path d={`M30,${35 + sag} Q45,${25 + sag} 60,${35 + sag} T78,${38 + sag}`} fill="none" stroke={b3} strokeWidth={sw * 0.9} strokeLinecap="round" />
                  <path d={`M28,${68 + sag} Q40,${78 + sag} 55,${68 + sag} T72,${70 + sag}`} fill="none" stroke={b1} strokeWidth={sw * 0.85} strokeLinecap="round" />
                  <path d={`M38,${40 + sag} Q50,${50 + sag} 62,${40 + sag} T75,${42 + sag}`} fill="none" stroke={b2} strokeWidth={sw * 0.8} strokeLinecap="round" />
                </g>
              );
            })()}
          </svg>

          {/* Red Chili Pepper Flakes if spicy level > 0 */}
          {spicyLevel > 0 && (
            <div className="absolute inset-0 pointer-events-none z-15">
              {Array.from({ length: spicyLevel * 4 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full bg-red-600/90 shadow-xs"
                  style={{
                    left: `${25 + (i * 17) % 55}%`,
                    top: `${30 + (i * 23) % 45}%`,
                    transform: `rotate(${i * 45}deg)`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Toppings Layer */}
          <div className="absolute inset-0 z-20">
            {toppings.map((tid, idx) => {
              const def = TOPPING_LIST.find((t) => t.id === tid);
              if (!def) return null;
              const slot = toppingSlots[idx % toppingSlots.length];

              return (
                <div
                  key={`${tid}_${idx}`}
                  className="absolute transition-all duration-300 drop-shadow-md hover:scale-110 flex items-center justify-center cursor-default"
                  style={{
                    left: slot.x,
                    top: slot.y,
                    transform: `translate(-50%, -50%) rotate(${slot.rot}) scale(${slot.scale})`,
                  }}
                  title={def.name}
                >
                  <ToppingVisual id={tid} size={size === 'sm' ? 'sm' : 'bowl'} />
                </div>
              );
            })}
          </div>

          {/* Subtle noodle shine */}
          <div className="absolute top-2 left-6 w-12 h-6 bg-white/20 rounded-full rotate-[-25deg] filter blur-xs pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

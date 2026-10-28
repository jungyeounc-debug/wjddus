/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  BowlCustomization,
  BrothType,
  NoodleDoneness,
  RamenCategory,
  SpicyLevel,
  ToppingId,
  WaterLevel,
} from '../types/game';
import { BROTH_LIST, BOWL_COLORS, TOPPING_LIST } from '../utils/gameData';
import { ToppingVisual } from './ToppingVisual';

interface RamenBowlVisualProps {
  ramenCategory?: RamenCategory;
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

          {/* Wavy Noodles Representation */}
          <svg className="absolute inset-0 w-full h-full opacity-80" viewBox="0 0 100 100">
            {/* Noodle strand coils */}
            <path
              d="M25,45 Q35,35 45,45 T65,45 T80,48"
              fill="none"
              stroke={ramenCategory === 'jjajang' ? '#3E2723' : '#FEF08A'}
              strokeWidth={noodle === 'soft' ? '3.5' : noodle === 'firm' ? '2.4' : '3.0'}
              strokeLinecap="round"
            />
            <path
              d="M20,55 Q35,65 50,55 T75,55 T85,58"
              fill="none"
              stroke={ramenCategory === 'jjajang' ? '#4E342E' : '#FDE047'}
              strokeWidth={noodle === 'soft' ? '3.5' : noodle === 'firm' ? '2.4' : '3.0'}
              strokeLinecap="round"
            />
            <path
              d="M30,35 Q45,25 60,35 T78,38"
              fill="none"
              stroke={ramenCategory === 'jjajang' ? '#3E2723' : '#FACC15'}
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            <path
              d="M28,68 Q40,78 55,68 T72,70"
              fill="none"
              stroke={ramenCategory === 'jjajang' ? '#4E342E' : '#FEF08A'}
              strokeWidth="2.6"
              strokeLinecap="round"
            />
            <path
              d="M38,40 Q50,50 62,40 T75,42"
              fill="none"
              stroke={ramenCategory === 'jjajang' ? '#271714' : '#EAB308'}
              strokeWidth="2.2"
              strokeLinecap="round"
            />
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

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export const RamenShopBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none">
      {/* Base warm ambient gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-amber-950 via-[#2A150D] to-[#170B06]" />

      {/* SVG Cozy Ramen Shop Interior Illustration */}
      <svg
        className="absolute inset-0 w-full h-full object-cover"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Wood wall planks pattern */}
          <linearGradient id="wood_wall" x1="0" y1="0" x2="0" y2="800" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4A2613" />
            <stop offset="0.5" stopColor="#361B0D" />
            <stop offset="1" stopColor="#221008" />
          </linearGradient>

          {/* Lantern glow radial */}
          <radialGradient id="lantern_glow_left" cx="240" cy="180" r="180" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F59E0B" stopOpacity="0.45" />
            <stop offset="0.5" stopColor="#D97706" stopOpacity="0.15" />
            <stop offset="1" stopColor="#B45309" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="lantern_glow_right" cx="960" cy="180" r="180" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F59E0B" stopOpacity="0.45" />
            <stop offset="0.5" stopColor="#D97706" stopOpacity="0.15" />
            <stop offset="1" stopColor="#B45309" stopOpacity="0" />
          </radialGradient>

          {/* Warm kitchen counter highlight */}
          <linearGradient id="counter_wood" x1="0" y1="580" x2="0" y2="800" gradientUnits="userSpaceOnUse">
            <stop stopColor="#78350F" />
            <stop offset="0.08" stopColor="#92400E" />
            <stop offset="0.3" stopColor="#5B290B" />
            <stop offset="1" stopColor="#291104" />
          </linearGradient>

          {/* Brass pot gold gradient */}
          <linearGradient id="brass_pot" x1="0" y1="0" x2="80" y2="60" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FDE68A" />
            <stop offset="0.4" stopColor="#F59E0B" />
            <stop offset="1" stopColor="#B45309" />
          </linearGradient>
        </defs>

        {/* Back Wooden Plank Wall */}
        <rect width="1200" height="800" fill="url(#wood_wall)" />

        {/* Vertical Wood Slats Details */}
        {[80, 160, 240, 320, 400, 480, 560, 640, 720, 800, 880, 960, 1040, 1120].map((x) => (
          <line
            key={x}
            x1={x}
            y1="0"
            x2={x}
            y2="800"
            stroke="#1E0E06"
            strokeWidth="3"
            strokeOpacity="0.6"
          />
        ))}

        {/* --- TOP RETRO AWNING (분식집 차양막) --- */}
        <g id="awning">
          {/* Alternating Red and Warm Cream Stripes */}
          {[
            { x: 0, c: '#DC2626' },
            { x: 100, c: '#FEF3C7' },
            { x: 200, c: '#DC2626' },
            { x: 300, c: '#FEF3C7' },
            { x: 400, c: '#DC2626' },
            { x: 500, c: '#FEF3C7' },
            { x: 600, c: '#DC2626' },
            { x: 700, c: '#FEF3C7' },
            { x: 800, c: '#DC2626' },
            { x: 900, c: '#FEF3C7' },
            { x: 1000, c: '#DC2626' },
            { x: 1100, c: '#FEF3C7' },
          ].map((stripe, idx) => (
            <polygon
              key={idx}
              points={`${stripe.x},0 ${stripe.x + 100},0 ${stripe.x + 90},70 ${stripe.x - 10},70`}
              fill={stripe.c}
              opacity="0.9"
            />
          ))}

          {/* Scalloped Awning Edge */}
          <path
            d="M 0 70 Q 50 90 100 70 Q 150 90 200 70 Q 250 90 300 70 Q 350 90 400 70 Q 450 90 500 70 Q 550 90 600 70 Q 650 90 700 70 Q 750 90 800 70 Q 850 90 900 70 Q 950 90 1000 70 Q 1050 90 1100 70 Q 1150 90 1200 70 L 1200 0 L 0 0 Z"
            fill="none"
            stroke="#991B1B"
            strokeWidth="3"
          />
          {/* Awning shadow */}
          <rect y="70" width="1200" height="25" fill="#000000" opacity="0.35" />
        </g>

        {/* --- NOSTALGIC WOODEN MENU PLAQUES (메뉴판 목판) --- */}
        <g id="menu-boards" opacity="0.85">
          {[
            { x: 180, title: '순한라면', price: '4,000' },
            { x: 260, title: '매운라면', price: '4,500' },
            { x: 340, title: '해물라면', price: '5,500' },
            { x: 860, title: '치즈라면', price: '4,500' },
            { x: 940, title: '짜장라면', price: '4,500' },
            { x: 1020, title: '비빔라면', price: '4,500' },
          ].map((item, idx) => (
            <g key={idx}>
              <rect
                x={item.x}
                y="110"
                width="64"
                height="150"
                rx="4"
                fill="#FDF0D5"
                stroke="#78350F"
                strokeWidth="2.5"
              />
              <line x1={item.x} y1="110" x2={item.x + 32} y2="95" stroke="#92400E" strokeWidth="1.5" />
              <line x1={item.x + 64} y1="110" x2={item.x + 32} y2="95" stroke="#92400E" strokeWidth="1.5" />
              {/* Vertical Menu Text */}
              <text
                x={item.x + 32}
                y="142"
                textAnchor="middle"
                fill="#451A03"
                fontSize="15"
                fontWeight="900"
                fontFamily="sans-serif"
                style={{ writingMode: 'vertical-rl' }}
              >
                {item.title}
              </text>
              <text
                x={item.x + 32}
                y="245"
                textAnchor="middle"
                fill="#991B1B"
                fontSize="11"
                fontWeight="800"
                fontFamily="sans-serif"
              >
                {item.price}
              </text>
            </g>
          ))}
        </g>

        {/* --- KITCHEN SHELF (주방 선반 & 양은냄비) --- */}
        <g id="kitchen-shelf">
          {/* Main Shelf Plank */}
          <rect x="100" y="320" width="1000" height="18" fill="#78350F" stroke="#451A03" strokeWidth="2" />
          <polygon points="100,338 100,370 140,338" fill="#451A03" />
          <polygon points="1100,338 1100,370 1060,338" fill="#451A03" />

          {/* Golden Brass Ramen Pots (양은냄비들) on Left */}
          <g transform="translate(140, 275)">
            {/* Pot 1 */}
            <path
              d="M 5 20 Q 5 45 40 45 Q 75 45 75 20 Z"
              fill="url(#brass_pot)"
              stroke="#78350F"
              strokeWidth="2"
            />
            {/* Pot rim */}
            <ellipse cx="40" cy="20" rx="35" ry="7" fill="#FDE68A" stroke="#78350F" strokeWidth="2" />
            {/* Side handles */}
            <path d="M 5 22 Q -5 20 -2 15 Q 5 15 5 20" fill="#F59E0B" stroke="#78350F" strokeWidth="1.5" />
            <path d="M 75 22 Q 85 20 82 15 Q 75 15 75 20" fill="#F59E0B" stroke="#78350F" strokeWidth="1.5" />
          </g>

          <g transform="translate(230, 280)">
            {/* Pot 2 */}
            <path
              d="M 5 18 Q 5 40 35 40 Q 65 40 65 18 Z"
              fill="url(#brass_pot)"
              stroke="#78350F"
              strokeWidth="2"
            />
            <ellipse cx="35" cy="18" rx="30" ry="6" fill="#FDE68A" stroke="#78350F" strokeWidth="2" />
          </g>

          {/* Stacked White Ramen Bowls on Right Shelf */}
          <g transform="translate(920, 260)">
            {[0, 12, 24].map((offset, i) => (
              <g key={i} transform={`translate(0, ${offset})`}>
                <path
                  d="M 5 15 Q 5 35 45 35 Q 85 35 85 15 Z"
                  fill="#FFFBEB"
                  stroke="#991B1B"
                  strokeWidth="2"
                />
                <ellipse cx="45" cy="15" rx="40" ry="8" fill="#FFFFFF" stroke="#991B1B" strokeWidth="2" />
                <path d="M 12 18 Q 45 23 78 18" stroke="#DC2626" strokeWidth="2" fill="none" />
              </g>
            ))}
          </g>

          {/* Condiment Jars (후추통, 고춧가루통, 파단지) */}
          <g transform="translate(420, 275)">
            {/* Red pepper jar */}
            <rect x="0" y="8" width="28" height="38" rx="4" fill="#EF4444" stroke="#7F1D1D" strokeWidth="2" />
            <rect x="4" y="0" width="20" height="8" rx="2" fill="#FEF3C7" stroke="#7F1D1D" strokeWidth="1.5" />
            <text x="14" y="32" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">
              🌶️
            </text>

            {/* Pepper jar */}
            <rect x="36" y="8" width="28" height="38" rx="4" fill="#334155" stroke="#0F172A" strokeWidth="2" />
            <rect x="40" y="0" width="20" height="8" rx="2" fill="#CBD5E1" stroke="#0F172A" strokeWidth="1.5" />
            <text x="50" y="30" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">
              후추
            </text>

            {/* Green onion crock */}
            <rect x="74" y="12" width="36" height="34" rx="5" fill="#15803D" stroke="#14532D" strokeWidth="2" />
            <text x="92" y="34" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold">
              파
            </text>
          </g>
        </g>

        {/* --- LANTERNS WITH WARM GLOW (홍등 / 주막 등불) --- */}
        {/* Glow Halos */}
        <circle cx="240" cy="180" r="180" fill="url(#lantern_glow_left)" />
        <circle cx="960" cy="180" r="180" fill="url(#lantern_glow_right)" />

        {/* Left Lantern */}
        <g id="left-lantern" transform="translate(205, 120)">
          <line x1="35" y1="-50" x2="35" y2="0" stroke="#78350F" strokeWidth="3" />
          {/* Lantern Cap */}
          <rect x="15" y="-6" width="40" height="10" rx="3" fill="#1C1917" />
          {/* Lantern Body */}
          <ellipse cx="35" cy="50" rx="35" ry="46" fill="#DC2626" stroke="#991B1B" strokeWidth="3" />
          {/* Lantern Ribs */}
          <ellipse cx="35" cy="50" rx="18" ry="46" fill="none" stroke="#FEE2E2" strokeWidth="2" opacity="0.6" />
          <line x1="35" y1="4" x2="35" y2="96" stroke="#FEE2E2" strokeWidth="2" opacity="0.6" />
          {/* Lantern Badge Text */}
          <rect x="15" y="30" width="40" height="40" rx="4" fill="#FEF3C7" stroke="#78350F" strokeWidth="2" />
          <text
            x="35"
            y="56"
            textAnchor="middle"
            fill="#B91C1C"
            fontSize="18"
            fontWeight="900"
            fontFamily="sans-serif"
          >
            연
          </text>
          {/* Bottom tassel */}
          <rect x="25" y="96" width="20" height="8" fill="#1C1917" />
          <line x1="35" y1="104" x2="35" y2="135" stroke="#F59E0B" strokeWidth="4" />
        </g>

        {/* Right Lantern */}
        <g id="right-lantern" transform="translate(925, 120)">
          <line x1="35" y1="-50" x2="35" y2="0" stroke="#78350F" strokeWidth="3" />
          <rect x="15" y="-6" width="40" height="10" rx="3" fill="#1C1917" />
          <ellipse cx="35" cy="50" rx="35" ry="46" fill="#EA580C" stroke="#C2410C" strokeWidth="3" />
          <ellipse cx="35" cy="50" rx="18" ry="46" fill="none" stroke="#FFEDD5" strokeWidth="2" opacity="0.6" />
          <line x1="35" y1="4" x2="35" y2="96" stroke="#FFEDD5" strokeWidth="2" opacity="0.6" />
          <rect x="15" y="30" width="40" height="40" rx="4" fill="#FEF3C7" stroke="#78350F" strokeWidth="2" />
          <text
            x="35"
            y="57"
            textAnchor="middle"
            fill="#C2410C"
            fontSize="18"
            fontWeight="900"
            fontFamily="sans-serif"
          >
            라면
          </text>
          <rect x="25" y="96" width="20" height="8" fill="#1C1917" />
          <line x1="35" y1="104" x2="35" y2="135" stroke="#F59E0B" strokeWidth="4" />
        </g>

        {/* --- FRONT RAMEN BAR COUNTER (가게 카운터 테이블) --- */}
        <g id="counter">
          {/* Counter Top Surface */}
          <polygon points="0,580 1200,580 1200,620 0,620" fill="#92400E" />
          <line x1="0" y1="580" x2="1200" y2="580" stroke="#FDE68A" strokeWidth="3" opacity="0.5" />
          {/* Counter Front Wooden Planks */}
          <rect x="0" y="620" width="1200" height="180" fill="url(#counter_wood)" />
          {/* Counter Planks Dividers */}
          {[120, 240, 360, 480, 600, 720, 840, 960, 1080].map((x) => (
            <line key={x} x1={x} y1="620" x2={x} y2="800" stroke="#170B06" strokeWidth="4" />
          ))}
          {/* Counter Railing */}
          <line x1="0" y1="640" x2="1200" y2="640" stroke="#78350F" strokeWidth="6" />
        </g>
      </svg>

      {/* Warm Ambient Vignette Scrim */}
      <div className="absolute inset-0 bg-radial from-transparent via-amber-950/40 to-amber-950/80 pointer-events-none" />
    </div>
  );
};

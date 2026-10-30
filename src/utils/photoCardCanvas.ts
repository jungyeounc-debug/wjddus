/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PhotoCard, ToppingId } from '../types/game';
import { BROTH_LIST, TOPPING_LIST, BOWL_SKINS } from './ramenData';

// Canvas standard dimensions (4:5 vertical high-res card)
export const CARD_CANVAS_WIDTH = 1080;
export const CARD_CANVAS_HEIGHT = 1350;

/**
 * Text wrapping utility for Canvas 2D supporting Korean words and character breaks
 */
export function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  if (!text) return [];
  const lines: string[] = [];
  const paragraphs = text.split('\n');

  for (const para of paragraphs) {
    if (!para.trim()) {
      lines.push('');
      continue;
    }
    const words = para.split(' ');
    let currentLine = '';

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const metrics = ctx.measureText(testLine);

      if (metrics.width <= maxWidth) {
        currentLine = testLine;
      } else {
        if (currentLine) {
          lines.push(currentLine);
          currentLine = '';
        }

        // If a single word is wider than maxWidth, break character by character
        if (ctx.measureText(word).width > maxWidth) {
          let charLine = '';
          for (const char of word) {
            const testChar = charLine + char;
            if (ctx.measureText(testChar).width <= maxWidth) {
              charLine = testChar;
            } else {
              lines.push(charLine);
              charLine = char;
            }
          }
          currentLine = charLine;
        } else {
          currentLine = word;
        }
      }
    }
    if (currentLine) {
      lines.push(currentLine);
    }
  }

  return lines;
}

/**
 * Wait for webfonts to load with safety timeout
 */
export async function ensureFontsLoaded(): Promise<void> {
  if (typeof document !== 'undefined' && 'fonts' in document) {
    try {
      await Promise.race([
        document.fonts.ready,
        new Promise((resolve) => setTimeout(resolve, 800)),
      ]);
    } catch {
      // Fallback smoothly if font API fails
    }
  }
}

/**
 * Draw a rounded rectangle on Canvas 2D
 */
function drawRoundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  ctx.lineTo(x + radius, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

/**
 * Top-down Ramen Bowl Drawing on Canvas 2D
 */
function drawRamenBowlOnCanvas(
  ctx: CanvasRenderingContext2D,
  card: PhotoCard,
  centerX: number,
  centerY: number,
  radius: number
) {
  const ramen = card.ramen;
  const isStir = ramen.ramenCategory === 'stir' || ramen.ramenCategory === 'bibim' || ramen.ramenCategory === 'jjajang';
  const brothObj = BROTH_LIST.find((b) => b.id === ramen.broth) || BROTH_LIST[0];
  const bowlSkin = BOWL_SKINS.find((b) => b.id === ramen.bowlSkinId) || BOWL_SKINS[0];

  ctx.save();

  // 1. Outer drop shadow for the bowl
  ctx.shadowColor = 'rgba(0, 0, 0, 0.22)';
  ctx.shadowBlur = 24;
  ctx.shadowOffsetY = 14;

  // 2. Brass pot handles if classic pot or golden pot
  const hasHandles = !ramen.bowlSkinId || ramen.bowlSkinId === 'classic_pot' || ramen.bowlSkinId === 'golden_dragon';
  if (hasHandles) {
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 6;
    ctx.fillStyle = bowlSkin.rimColor || '#D97706';
    // Left ear handle
    ctx.beginPath();
    ctx.ellipse(centerX - radius - 16, centerY, 22, 34, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#FEF3C7';
    ctx.beginPath();
    ctx.ellipse(centerX - radius - 16, centerY, 10, 18, 0, 0, Math.PI * 2);
    ctx.fill();

    // Right ear handle
    ctx.fillStyle = bowlSkin.rimColor || '#D97706';
    ctx.beginPath();
    ctx.ellipse(centerX + radius + 16, centerY, 22, 34, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#FEF3C7';
    ctx.beginPath();
    ctx.ellipse(centerX + radius + 16, centerY, 10, 18, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // 3. Bowl Outer Rim
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.fillStyle = bowlSkin.bowlColor || '#F59E0B';
  ctx.fill();

  // Reset shadow for internal bowl details
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;

  // 4. Bowl Rim Lip
  ctx.lineWidth = 14;
  ctx.strokeStyle = bowlSkin.rimColor || '#D97706';
  ctx.stroke();

  // Highlight on outer bowl rim
  ctx.lineWidth = 4;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius - 5, -Math.PI * 0.8, -Math.PI * 0.2);
  ctx.stroke();

  // Retro Green Melamine pattern (dots)
  if (ramen.bowlSkinId === 'retro_green' || bowlSkin.pattern === 'dots') {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    for (let i = 0; i < 16; i++) {
      const angle = (i * Math.PI * 2) / 16;
      const dotX = centerX + Math.cos(angle) * (radius - 10);
      const dotY = centerY + Math.sin(angle) * (radius - 10);
      ctx.beginPath();
      ctx.arc(dotX, dotY, 3.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // 5. Broth / Sauce Layer
  const soupRadius = radius - 18;
  const soupGradient = ctx.createRadialGradient(
    centerX - 35,
    centerY - 35,
    soupRadius * 0.1,
    centerX,
    centerY,
    soupRadius
  );

  // Determine Soup color
  if (isStir) {
    if (ramen.broth === 'stir_jjajang' || ramen.broth === 'jjajang_classic') {
      soupGradient.addColorStop(0, '#3E2723');
      soupGradient.addColorStop(0.7, '#26140D');
      soupGradient.addColorStop(1, '#120A06');
    } else if (ramen.broth === 'stir_buldak') {
      soupGradient.addColorStop(0, '#991B1B');
      soupGradient.addColorStop(0.7, '#7F1D1D');
      soupGradient.addColorStop(1, '#450A0A');
    } else if (ramen.broth === 'stir_rose') {
      soupGradient.addColorStop(0, '#FB7185');
      soupGradient.addColorStop(0.8, '#EA580C');
      soupGradient.addColorStop(1, '#C2410C');
    } else {
      soupGradient.addColorStop(0, '#B91C1C');
      soupGradient.addColorStop(0.7, '#991B1B');
      soupGradient.addColorStop(1, '#7F1D1D');
    }
  } else {
    // Soup Ramens
    if (ramen.broth === 'bone') {
      soupGradient.addColorStop(0, '#FFFBEB');
      soupGradient.addColorStop(0.6, '#FEF3C7');
      soupGradient.addColorStop(1, '#FDE68A');
    } else if (ramen.broth === 'spicy' || ramen.broth === 'kimchi') {
      soupGradient.addColorStop(0, '#EF4444');
      soupGradient.addColorStop(0.6, '#DC2626');
      soupGradient.addColorStop(1, '#991B1B');
    } else if (ramen.broth === 'super_spicy' || ramen.broth === 'mara') {
      soupGradient.addColorStop(0, '#DC2626');
      soupGradient.addColorStop(0.6, '#991B1B');
      soupGradient.addColorStop(1, '#5B0E14');
    } else if (ramen.broth === 'seafood') {
      soupGradient.addColorStop(0, '#F97316');
      soupGradient.addColorStop(0.7, '#EA580C');
      soupGradient.addColorStop(1, '#C2410C');
    } else if (ramen.broth === 'rose') {
      soupGradient.addColorStop(0, '#FDA4AF');
      soupGradient.addColorStop(0.7, '#F43F5E');
      soupGradient.addColorStop(1, '#BE123C');
    } else if (ramen.broth === 'curry') {
      soupGradient.addColorStop(0, '#FACC15');
      soupGradient.addColorStop(0.7, '#CA8A04');
      soupGradient.addColorStop(1, '#854D0E');
    } else {
      // mild / default
      soupGradient.addColorStop(0, '#FBBF24');
      soupGradient.addColorStop(0.7, '#D97706');
      soupGradient.addColorStop(1, '#B45309');
    }
  }

  ctx.beginPath();
  ctx.arc(centerX, centerY, soupRadius, 0, Math.PI * 2);
  ctx.fillStyle = soupGradient;
  ctx.fill();

  // Inner soup edge depth
  ctx.lineWidth = 6;
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.28)';
  ctx.stroke();

  // 6. Distinct Noodle Strands (면 종류별 맞춤 2D 캔버스 렌더링)
  const noodleType = ramen.noodleType || 'basic';
  const isJjajang =
    ramen.broth === 'stir_jjajang' ||
    ramen.broth === 'jjajang_classic' ||
    ramen.broth === 'jjajang_truffle';
  const isSoft = ramen.noodle === 'soft';
  const isFirm = ramen.noodle === 'firm';
  const sag = isSoft ? 8 : isFirm ? -3 : 0;

  ctx.save();
  ctx.beginPath();
  ctx.arc(centerX, centerY, soupRadius - 8, 0, Math.PI * 2);
  ctx.clip();

  interface NoodleCurve {
    x0: number;
    y0: number;
    cp1x: number;
    cp1y: number;
    cp2x: number;
    cp2y: number;
    x1: number;
    y1: number;
  }

  if (noodleType === 'thin') {
    // [얇은면] 연한 노란색, 아주 가늘고 촘촘한 곡선을 많이
    const nWidth = isSoft ? 5.0 : isFirm ? 2.5 : 3.5;
    const thinCurves: NoodleCurve[] = [
      { x0: centerX - 110, y0: centerY - 65 + sag, cp1x: centerX - 60, cp1y: centerY - 95 + sag, cp2x: centerX + 40, cp2y: centerY - 45 + sag, x1: centerX + 105, y1: centerY - 70 + sag },
      { x0: centerX - 120, y0: centerY - 45 + sag, cp1x: centerX - 50, cp1y: centerY - 25 + sag, cp2x: centerX + 30, cp2y: centerY - 65 + sag, x1: centerX + 115, y1: centerY - 40 + sag },
      { x0: centerX - 125, y0: centerY - 25 + sag, cp1x: centerX - 70, cp1y: centerY - 5 + sag, cp2x: centerX + 50, cp2y: centerY - 35 + sag, x1: centerX + 120, y1: centerY - 15 + sag },
      { x0: centerX - 120, y0: centerY - 5 + sag, cp1x: centerX - 40, cp1y: centerY + 25 + sag, cp2x: centerX + 40, cp2y: centerY - 15 + sag, x1: centerX + 115, y1: centerY + 10 + sag },
      { x0: centerX - 115, y0: centerY + 15 + sag, cp1x: centerX - 60, cp1y: centerY + 45 + sag, cp2x: centerX + 30, cp2y: centerY + 5 + sag, x1: centerX + 110, y1: centerY + 30 + sag },
      { x0: centerX - 110, y0: centerY + 35 + sag, cp1x: centerX - 40, cp1y: centerY + 65 + sag, cp2x: centerX + 50, cp2y: centerY + 25 + sag, x1: centerX + 105, y1: centerY + 50 + sag },
      { x0: centerX - 95, y0: centerY + 55 + sag, cp1x: centerX - 30, cp1y: centerY + 85 + sag, cp2x: centerX + 40, cp2y: centerY + 45 + sag, x1: centerX + 90, y1: centerY + 68 + sag },
      // Cross weave strands
      { x0: centerX - 65, y0: centerY - 110 + sag, cp1x: centerX - 90, cp1y: centerY - 20 + sag, cp2x: centerX - 40, cp2y: centerY + 70 + sag, x1: centerX - 60, y1: centerY + 110 + sag },
      { x0: centerX - 15, y0: centerY - 120 + sag, cp1x: centerX - 45, cp1y: centerY - 10 + sag, cp2x: centerX + 15, cp2y: centerY + 80 + sag, x1: centerX - 10, y1: centerY + 115 + sag },
      { x0: centerX + 35, y0: centerY - 115 + sag, cp1x: centerX + 10, cp1y: centerY - 15 + sag, cp2x: centerX + 60, cp2y: centerY + 70 + sag, x1: centerX + 40, y1: centerY + 110 + sag },
      { x0: centerX + 75, y0: centerY - 95 + sag, cp1x: centerX + 50, cp1y: centerY - 5 + sag, cp2x: centerX + 90, cp2y: centerY + 60 + sag, x1: centerX + 70, y1: centerY + 95 + sag },
    ];

    ctx.lineWidth = nWidth;
    ctx.lineCap = 'round';
    ctx.strokeStyle = isJjajang ? '#3E2723' : '#FDE047';
    for (const c of thinCurves) {
      ctx.beginPath();
      ctx.moveTo(c.x0, c.y0 + 2);
      ctx.bezierCurveTo(c.cp1x, c.cp1y + 2, c.cp2x, c.cp2y + 2, c.x1, c.y1 + 2);
      ctx.stroke();
    }
    ctx.strokeStyle = isJjajang ? '#5D4037' : '#FEF9C3';
    for (const c of thinCurves) {
      ctx.beginPath();
      ctx.moveTo(c.x0, c.y0);
      ctx.bezierCurveTo(c.cp1x, c.cp1y, c.cp2x, c.cp2y, c.x1, c.y1);
      ctx.stroke();
    }
  } else if (noodleType === 'chewy') {
    // [쫄깃면] 진한 노란색, 조금 굵고 탱탱해 보이는 큰 웨이브 + 윤기(하이라이트 선)
    const nWidth = isSoft ? 13.5 : isFirm ? 8.0 : 10.0;
    const chewyCurves: NoodleCurve[] = [
      { x0: centerX - 110, y0: centerY - 50 + sag, cp1x: centerX - 60, cp1y: centerY - 95 + sag, cp2x: centerX + 40, cp2y: centerY - 15 + sag, x1: centerX + 105, y1: centerY - 55 + sag },
      { x0: centerX - 120, y0: centerY - 15 + sag, cp1x: centerX - 40, cp1y: centerY + 30 + sag, cp2x: centerX + 50, cp2y: centerY - 55 + sag, x1: centerX + 115, y1: centerY - 10 + sag },
      { x0: centerX - 115, y0: centerY + 25 + sag, cp1x: centerX - 55, cp1y: centerY + 70 + sag, cp2x: centerX + 45, cp2y: centerY - 10 + sag, x1: centerX + 110, y1: centerY + 35 + sag },
      { x0: centerX - 95, y0: centerY + 65 + sag, cp1x: centerX - 35, cp1y: centerY + 105 + sag, cp2x: centerX + 60, cp2y: centerY + 35 + sag, x1: centerX + 90, y1: centerY + 75 + sag },
      { x0: centerX - 30, y0: centerY - 110 + sag, cp1x: centerX - 75, cp1y: centerY - 15 + sag, cp2x: centerX + 15, cp2y: centerY + 75 + sag, x1: centerX - 25, y1: centerY + 110 + sag },
    ];

    // Under-shadow
    ctx.lineWidth = nWidth + 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = isJjajang ? '#1F0C02' : '#B45309';
    for (const c of chewyCurves) {
      ctx.beginPath();
      ctx.moveTo(c.x0, c.y0 + 3);
      ctx.bezierCurveTo(c.cp1x, c.cp1y + 3, c.cp2x, c.cp2y + 3, c.x1, c.y1 + 3);
      ctx.stroke();
    }

    // Main Golden bouncy core
    ctx.lineWidth = nWidth;
    ctx.strokeStyle = isJjajang ? '#3E2723' : '#F59E0B';
    for (const c of chewyCurves) {
      ctx.beginPath();
      ctx.moveTo(c.x0, c.y0);
      ctx.bezierCurveTo(c.cp1x, c.cp1y, c.cp2x, c.cp2y, c.x1, c.y1);
      ctx.stroke();
    }

    // High-gloss highlight stroke (윤기)
    ctx.lineWidth = nWidth * 0.32;
    ctx.strokeStyle = isJjajang ? '#6D4C41' : '#FEF9C3';
    for (const c of chewyCurves) {
      ctx.beginPath();
      ctx.moveTo(c.x0, c.y0 - 2);
      ctx.bezierCurveTo(c.cp1x, c.cp1y - 2, c.cp2x, c.cp2y - 2, c.x1, c.y1 - 2);
      ctx.stroke();
    }
  } else if (noodleType === 'flat') {
    // [넓적면] 납작하고 넓은 리본 모양, 완만한 웨이브
    const ribbonW = isSoft ? 29.0 : isFirm ? 18.0 : 23.0;
    const flatRibbons: NoodleCurve[] = [
      { x0: centerX - 115, y0: centerY - 55 + sag, cp1x: centerX - 35, cp1y: centerY - 80 + sag, cp2x: centerX + 45, cp2y: centerY - 35 + sag, x1: centerX + 110, y1: centerY - 45 + sag },
      { x0: centerX - 120, y0: centerY - 5 + sag, cp1x: centerX - 40, cp1y: centerY + 25 + sag, cp2x: centerX + 40, cp2y: centerY - 25 + sag, x1: centerX + 115, y1: centerY + 5 + sag },
      { x0: centerX - 110, y0: centerY + 45 + sag, cp1x: centerX - 30, cp1y: centerY + 75 + sag, cp2x: centerX + 55, cp2y: centerY + 25 + sag, x1: centerX + 105, y1: centerY + 55 + sag },
      { x0: centerX - 45, y0: centerY - 105 + sag, cp1x: centerX - 70, cp1y: centerY - 10 + sag, cp2x: centerX + 10, cp2y: centerY + 65 + sag, x1: centerX - 25, y1: centerY + 105 + sag },
    ];

    // Ribbon border/depth
    ctx.lineWidth = ribbonW + 2.5;
    ctx.lineCap = 'butt';
    ctx.strokeStyle = isJjajang ? '#27140B' : '#D97706';
    for (const r of flatRibbons) {
      ctx.beginPath();
      ctx.moveTo(r.x0, r.y0 + 2);
      ctx.bezierCurveTo(r.cp1x, r.cp1y + 2, r.cp2x, r.cp2y + 2, r.x1, r.y1 + 2);
      ctx.stroke();
    }

    // Ribbon Body
    ctx.lineWidth = ribbonW;
    ctx.strokeStyle = isJjajang ? '#4E342E' : '#FDE68A';
    for (const r of flatRibbons) {
      ctx.beginPath();
      ctx.moveTo(r.x0, r.y0);
      ctx.bezierCurveTo(r.cp1x, r.cp1y, r.cp2x, r.cp2y, r.x1, r.y1);
      ctx.stroke();
    }

    // Ribbon surface sheen
    ctx.lineWidth = ribbonW * 0.35;
    ctx.strokeStyle = isJjajang ? '#6D4C41' : '#FFFBEB';
    for (const r of flatRibbons) {
      ctx.beginPath();
      ctx.moveTo(r.x0, r.y0 - 2);
      ctx.bezierCurveTo(r.cp1x, r.cp1y - 2, r.cp2x, r.cp2y - 2, r.x1, r.y1 - 2);
      ctx.stroke();
    }
  } else if (noodleType === 'udon') {
    // [우동면] 하얀색에 가까운 크림색, 아주 굵고 거의 곧은 면 몇 가닥
    const udonW = isSoft ? 34.0 : isFirm ? 22.0 : 27.0;
    const udonStrands: NoodleCurve[] = [
      { x0: centerX - 110, y0: centerY - 48 + sag, cp1x: centerX - 35, cp1y: centerY - 62 + sag, cp2x: centerX + 45, cp2y: centerY - 38 + sag, x1: centerX + 105, y1: centerY - 50 + sag },
      { x0: centerX - 115, y0: centerY - 5 + sag, cp1x: centerX - 40, cp1y: centerY + 10 + sag, cp2x: centerX + 45, cp2y: centerY - 15 + sag, x1: centerX + 115, y1: centerY + 2 + sag },
      { x0: centerX - 110, y0: centerY + 42 + sag, cp1x: centerX - 30, cp1y: centerY + 58 + sag, cp2x: centerX + 50, cp2y: centerY + 30 + sag, x1: centerX + 105, y1: centerY + 48 + sag },
      { x0: centerX - 35, y0: centerY - 105 + sag, cp1x: centerX - 55, cp1y: centerY - 10 + sag, cp2x: centerX + 15, cp2y: centerY + 65 + sag, x1: centerX - 15, y1: centerY + 105 + sag },
    ];

    // Shadow border
    ctx.lineWidth = udonW + 3;
    ctx.lineCap = 'round';
    ctx.strokeStyle = isJjajang ? '#1F0C02' : '#FDE68A';
    for (const u of udonStrands) {
      ctx.beginPath();
      ctx.moveTo(u.x0, u.y0 + 3);
      ctx.bezierCurveTo(u.cp1x, u.cp1y + 3, u.cp2x, u.cp2y + 3, u.x1, u.y1 + 3);
      ctx.stroke();
    }

    // Plump cream cylinder
    ctx.lineWidth = udonW;
    ctx.strokeStyle = isJjajang ? '#451A03' : '#FFFBEB';
    for (const u of udonStrands) {
      ctx.beginPath();
      ctx.moveTo(u.x0, u.y0);
      ctx.bezierCurveTo(u.cp1x, u.cp1y, u.cp2x, u.cp2y, u.x1, u.y1);
      ctx.stroke();
    }

    // Specular cylindrical highlight
    ctx.lineWidth = udonW * 0.35;
    ctx.strokeStyle = isJjajang ? '#78350F' : '#FFFFFF';
    for (const u of udonStrands) {
      ctx.beginPath();
      ctx.moveTo(u.x0, u.y0 - 2);
      ctx.bezierCurveTo(u.cp1x, u.cp1y - 2, u.cp2x, u.cp2y - 2, u.x1, u.y1 - 2);
      ctx.stroke();
    }
  } else {
    // [기본면] 노란색, 보통 굵기의 꼬불꼬불한 곡선
    const noodleWidth = isSoft ? 9.5 : isFirm ? 5.5 : 7.0;
    const noodleCurves: NoodleCurve[] = [
      { x0: centerX - 80, y0: centerY - 45 + sag, cp1x: centerX - 50, cp1y: centerY - 70 + sag, cp2x: centerX + 20, cp2y: centerY - 20 + sag, x1: centerX + 75, y1: centerY - 40 + sag },
      { x0: centerX - 90, y0: centerY - 15 + sag, cp1x: centerX - 30, cp1y: centerY + 10 + sag, cp2x: centerX + 40, cp2y: centerY - 45 + sag, x1: centerX + 85, y1: centerY - 10 + sag },
      { x0: centerX - 75, y0: centerY + 15 + sag, cp1x: centerX - 40, cp1y: centerY + 45 + sag, cp2x: centerX + 30, cp2y: centerY - 10 + sag, x1: centerX + 80, y1: centerY + 25 + sag },
      { x0: centerX - 60, y0: centerY + 45 + sag, cp1x: centerX - 20, cp1y: centerY + 70 + sag, cp2x: centerX + 50, cp2y: centerY + 20 + sag, x1: centerX + 70, y1: centerY + 55 + sag },
      { x0: centerX - 35, y0: centerY - 80 + sag, cp1x: centerX - 60, cp1y: centerY - 20 + sag, cp2x: centerX - 10, cp2y: centerY + 60 + sag, x1: centerX - 40, y1: centerY + 80 + sag },
      { x0: centerX + 30, y0: centerY - 75 + sag, cp1x: centerX + 60, cp1y: centerY - 10 + sag, cp2x: centerX + 15, cp2y: centerY + 50 + sag, x1: centerX + 35, y1: centerY + 75 + sag },
    ];

    // Shadow
    ctx.lineWidth = noodleWidth + 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = isJjajang ? '#27140B' : '#D97706';
    for (const n of noodleCurves) {
      ctx.beginPath();
      ctx.moveTo(n.x0, n.y0 + 2);
      ctx.bezierCurveTo(n.cp1x, n.cp1y + 2, n.cp2x, n.cp2y + 2, n.x1, n.y1 + 2);
      ctx.stroke();
    }

    // Core
    ctx.lineWidth = noodleWidth;
    ctx.strokeStyle = isJjajang ? '#4E342E' : '#FDE047';
    for (const n of noodleCurves) {
      ctx.beginPath();
      ctx.moveTo(n.x0, n.y0);
      ctx.bezierCurveTo(n.cp1x, n.cp1y, n.cp2x, n.cp2y, n.x1, n.y1);
      ctx.stroke();
    }
  }

  // Soup oil glistening circles
  ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
  ctx.beginPath();
  ctx.ellipse(centerX - 45, centerY - 55, 22, 10, -Math.PI / 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore(); // release clip

  // 7. Render Every Topping with High Detail (모든 토핑 빠짐없이 배치)
  // Ensure egg is included if eggType was chosen or egg is in toppings
  let toppings: ToppingId[] = [...(ramen.toppings || [])];
  if (ramen.eggType && ramen.eggType !== 'none' && !toppings.includes('egg')) {
    toppings.push('egg');
  }

  const placedToppings = ramen.placedToppings;
  const toppingCount = toppings.length;

  toppings.forEach((toppingId: ToppingId, idx: number) => {
    let topX = centerX;
    let topY = centerY;

    if (placedToppings && placedToppings[idx]) {
      // Map user placed coordinates if available (0~100)
      topX = centerX - soupRadius + (placedToppings[idx].xPercent / 100) * (soupRadius * 2);
      topY = centerY - soupRadius + (placedToppings[idx].yPercent / 100) * (soupRadius * 2);
    } else {
      // Natural chef plating layout around the bowl
      if (toppingCount === 1) {
        topX = centerX;
        topY = centerY - 15;
      } else if (toppingCount === 2) {
        topX = idx === 0 ? centerX - 48 : centerX + 48;
        topY = centerY + (idx === 0 ? -12 : 12);
      } else if (toppingCount === 3) {
        const angles = [-Math.PI / 2, Math.PI / 6, (5 * Math.PI) / 6];
        topX = centerX + Math.cos(angles[idx]) * 56;
        topY = centerY + Math.sin(angles[idx]) * 56;
      } else {
        const angle = (idx * Math.PI * 2) / toppingCount - Math.PI / 2;
        const dist = 60 + (idx % 2 === 0 ? 0 : 14);
        topX = centerX + Math.cos(angle) * dist;
        topY = centerY + Math.sin(angle) * dist;
      }
    }

    // Draw individual topping
    ctx.save();
    ctx.translate(topX, topY);

    // Subtle drop shadow for topping
    ctx.shadowColor = 'rgba(0, 0, 0, 0.32)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 4;

    if (toppingId === 'egg') {
      // Custom egg drawing reflecting soft-boiled (반숙) vs hard-boiled (완숙)
      const isSoftBoiled = !ramen.eggType || ramen.eggType === 'soft' || ramen.eggType === 'raw';

      // Egg white oval
      ctx.beginPath();
      ctx.ellipse(0, 0, 32, 40, Math.PI / 12, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#E2E8F0';
      ctx.stroke();

      // Inner yolk
      ctx.beginPath();
      ctx.arc(2, 4, 18, 0, Math.PI * 2);
      if (isSoftBoiled) {
        // Soft-boiled: Rich runny golden-orange yolk
        const yolkGrad = ctx.createRadialGradient(0, 2, 2, 2, 4, 18);
        yolkGrad.addColorStop(0, '#F59E0B');
        yolkGrad.addColorStop(0.75, '#EA580C');
        yolkGrad.addColorStop(1, '#C2410C');
        ctx.fillStyle = yolkGrad;
      } else {
        // Hard-boiled: Solid pale yellow yolk with subtle sulfur ring
        ctx.fillStyle = '#FDE047';
      }
      ctx.fill();

      // Yolk highlight
      ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
      ctx.beginPath();
      ctx.ellipse(-3, 0, 5, 2.5, -Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();
    } else if (toppingId === 'cheese') {
      // Melting Cheddar Cheese slice
      ctx.beginPath();
      drawRoundRect(ctx, -26, -26, 52, 52, 8);
      ctx.fillStyle = '#FBBF24';
      ctx.fill();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#D97706';
      ctx.stroke();

      // Melted cheese drip highlights
      ctx.fillStyle = '#FDE047';
      ctx.beginPath();
      drawRoundRect(ctx, -18, -18, 36, 36, 5);
      ctx.fill();
    } else if (toppingId === 'green_onion') {
      // Scallion green rings
      const rings = [
        { x: -14, y: -10, r: 12, fill: '#15803D', inner: '#86EFAC' },
        { x: 12, y: -6, r: 13, fill: '#16A34A', inner: '#BBF7D0' },
        { x: -4, y: 12, r: 14, fill: '#22C55E', inner: '#DCFCE7' },
      ];
      for (const ring of rings) {
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ring.r, 0, Math.PI * 2);
        ctx.fillStyle = ring.fill;
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = '#14532D';
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ring.r * 0.58, 0, Math.PI * 2);
        ctx.fillStyle = ring.inner;
        ctx.fill();
      }
    } else if (toppingId === 'fish_cake') {
      // Narutomaki Fish Cake
      ctx.beginPath();
      ctx.arc(0, 0, 26, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#FCE7F3';
      ctx.stroke();

      // Pink spiral
      ctx.lineWidth = 4.5;
      ctx.strokeStyle = '#F43F5E';
      ctx.lineCap = 'round';
      ctx.beginPath();
      for (let a = 0; a < Math.PI * 3.5; a += 0.2) {
        const r = (a / (Math.PI * 3.5)) * 16;
        const px = Math.cos(a) * r;
        const py = Math.sin(a) * r;
        if (a === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
    } else {
      // Render topping emoji with high-visibility backing aura
      const topDef = TOPPING_LIST.find((t) => t.id === toppingId);
      const emoji = topDef?.emoji || '🍥';

      // Soft white backing circle
      ctx.beginPath();
      ctx.arc(0, 0, 27, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.stroke();

      ctx.font = '46px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(emoji, 0, 3);
    }

    ctx.restore();
  });

  // 8. Sprinkle sesame seeds & chopped scallion flecks on top
  ctx.fillStyle = '#FDE047';
  ctx.beginPath();
  ctx.arc(centerX - 15, centerY - 25, 2.5, 0, Math.PI * 2);
  ctx.arc(centerX + 25, centerY - 15, 2.5, 0, Math.PI * 2);
  ctx.arc(centerX + 5, centerY + 30, 2.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#22C55E';
  ctx.beginPath();
  ctx.arc(centerX - 35, centerY + 15, 3, 0, Math.PI * 2);
  ctx.arc(centerX + 35, centerY - 35, 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

/**
 * Main Canvas 2D Generator for 1080x1350 "오늘의 라면" Photo Card
 */
export async function renderPhotoCardToCanvas(card: PhotoCard): Promise<HTMLCanvasElement> {
  // 1. Wait for fonts so Korean text renders crisp without layout shifts
  await ensureFontsLoaded();

  const canvas = document.createElement('canvas');
  canvas.width = CARD_CANVAS_WIDTH;
  canvas.height = CARD_CANVAS_HEIGHT;

  const ctx = canvas.getContext('2d', { alpha: false });
  if (!ctx) throw new Error('Failed to get 2D canvas context');

  // Enable high quality image smoothing
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // Card Outer Margins & Polaroid Frame
  // Polaroid: Left/Right/Top = 40px, Bottom = 60px (classic thicker polaroid chin)
  const marginX = 40;
  const marginY = 40;
  const cardW = CARD_CANVAS_WIDTH - marginX * 2; // 1000px
  const cardH = CARD_CANVAS_HEIGHT - marginY * 2; // 1270px

  // User selected card border color or default warm gold
  const borderColor = card.borderColor || '#F59E0B';

  // --- BACKGROUND OF THE POLAROID ---
  // Outer table canvas background
  ctx.fillStyle = '#F8FAFC';
  ctx.fillRect(0, 0, CARD_CANVAS_WIDTH, CARD_CANVAS_HEIGHT);

  // Soft table woodgrain texture tint
  const bgGrad = ctx.createLinearGradient(0, 0, CARD_CANVAS_WIDTH, CARD_CANVAS_HEIGHT);
  bgGrad.addColorStop(0, '#FEF9C3');
  bgGrad.addColorStop(1, '#FFEDD5');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, CARD_CANVAS_WIDTH, CARD_CANVAS_HEIGHT);

  // Polaroid outer shadow
  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.16)';
  ctx.shadowBlur = 36;
  ctx.shadowOffsetY = 18;

  // Polaroid Card Base (Crisp White with user's selected accent border)
  drawRoundRect(ctx, marginX, marginY, cardW, cardH, 36);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  ctx.restore();

  // Polaroid Accent Border (4px)
  ctx.save();
  ctx.lineWidth = 6;
  ctx.strokeStyle = borderColor;
  drawRoundRect(ctx, marginX, marginY, cardW, cardH, 36);
  ctx.stroke();
  ctx.restore();

  // Inner Photo Pad (Soft Pastel Cream Container)
  const innerMarginX = 64;
  const innerW = CARD_CANVAS_WIDTH - innerMarginX * 2; // 952px

  // ==========================================
  // [1] 맨 위 제목: "연라면 · 오늘의 라면"
  // ==========================================
  const titleY = 100;
  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Title Badge Pill Background
  const titleBadgeW = 540;
  const titleBadgeH = 54;
  ctx.fillStyle = '#FFFBEB';
  drawRoundRect(ctx, (CARD_CANVAS_WIDTH - titleBadgeW) / 2, titleY - titleBadgeH / 2, titleBadgeW, titleBadgeH, 27);
  ctx.fill();
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = '#FDE68A';
  ctx.stroke();

  // Title Text
  ctx.font = 'bold 36px "Jua", "Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif';
  ctx.fillStyle = '#B45309';
  ctx.fillText('✨ 연라면 · 오늘의 라면 📸 ✨', CARD_CANVAS_WIDTH / 2, titleY);
  ctx.restore();

  // ==========================================
  // [2] 라면 그림 (Top-Down Bowl Canvas Drawing)
  // ==========================================
  const bowlCenterY = 325;
  const bowlRadius = 155; // 310px diameter

  // Soft decorative plate beneath bowl
  ctx.save();
  ctx.fillStyle = '#FFF7ED';
  ctx.beginPath();
  ctx.arc(CARD_CANVAS_WIDTH / 2, bowlCenterY, bowlRadius + 24, 0, Math.PI * 2);
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#FED7AA';
  ctx.stroke();
  ctx.restore();

  // Draw the actual bowl with broth, noodles, toppings
  drawRamenBowlOnCanvas(ctx, card, CARD_CANVAS_WIDTH / 2, bowlCenterY, bowlRadius);

  // ==========================================
  // [3] 라면 이름 (Ramen Title)
  // ==========================================
  const nameY = 530;
  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = 'bold 44px "Jua", "Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif';
  ctx.fillStyle = '#0F172A';

  // Truncate/wrap name if extremely long
  const ramenTitle = card.title || '정성 가득 연라면';
  ctx.fillText(ramenTitle, CARD_CANVAS_WIDTH / 2, nameY);

  // Cute title underline banner
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#F59E0B';
  ctx.beginPath();
  const titleMetrics = ctx.measureText(ramenTitle);
  const lineW = Math.min(titleMetrics.width + 40, 800);
  ctx.moveTo((CARD_CANVAS_WIDTH - lineW) / 2, nameY + 28);
  ctx.lineTo((CARD_CANVAS_WIDTH + lineW) / 2, nameY + 28);
  ctx.stroke();
  ctx.restore();

  // ==========================================
  // [4] 별점 (Rating Stars)
  // ==========================================
  const ratingY = 595;
  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const starsCount = card.rating ? Math.max(1, Math.min(5, card.rating.stars)) : 5;
  let starGlyphs = '';
  for (let s = 1; s <= 5; s++) {
    starGlyphs += s <= starsCount ? '★ ' : '☆ ';
  }
  starGlyphs = starGlyphs.trim();

  // Yellow stars + score label
  ctx.font = 'bold 36px "Noto Sans KR", "Apple SD Gothic Neo", sans-serif';
  ctx.fillStyle = '#F59E0B';
  ctx.fillText(starGlyphs, CARD_CANVAS_WIDTH / 2 - 80, ratingY);

  ctx.font = 'bold 26px "Jua", "Noto Sans KR", "Apple SD Gothic Neo", sans-serif';
  ctx.fillStyle = '#B45309';
  const ratingLabel = card.rating ? `(${starsCount}점 / 5점 만점)` : '(나만의 스페셜 레시피)';
  ctx.fillText(ratingLabel, CARD_CANVAS_WIDTH / 2 + 130, ratingY);
  ctx.restore();

  // ==========================================
  // [5] 손님 한마디 (Speech Bubble Box)
  // ==========================================
  const speechBoxX = innerMarginX;
  const speechBoxY = 640;
  const speechBoxW = innerW;
  const speechBoxH = 105;

  ctx.save();
  // Speech bubble box
  ctx.fillStyle = '#FEF3C7';
  drawRoundRect(ctx, speechBoxX, speechBoxY, speechBoxW, speechBoxH, 20);
  ctx.fill();
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = '#FDE68A';
  ctx.stroke();

  // Quote icon & customer title
  ctx.font = 'bold 20px "Jua", "Noto Sans KR", "Apple SD Gothic Neo", sans-serif';
  ctx.fillStyle = '#92400E';
  ctx.textAlign = 'left';
  ctx.fillText(`💬 손님 한마디 ${card.customerName ? `(손님: ${card.customerName})` : ''}`, speechBoxX + 24, speechBoxY + 30);

  // Customer quote with automatic word wrapping
  ctx.font = 'italic 500 22px "Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif';
  ctx.fillStyle = '#1E293B';
  const quoteText = `"${card.customerComment || card.rating?.feedback || '국물이 끝내줘요! 또 오겠습니다!'}"`;
  const quoteLines = wrapText(ctx, quoteText, speechBoxW - 50);

  let qY = speechBoxY + 62;
  for (let i = 0; i < Math.min(quoteLines.length, 2); i++) {
    ctx.fillText(quoteLines[i], speechBoxX + 24, qY);
    qY += 28;
  }
  ctx.restore();

  // ==========================================
  // [6] 레시피 정보 박스 (Recipe Info Box)
  // ==========================================
  // 라면 종류, 면, 국물/소스, 맵기(🌶️ 개수), 면 익힘, 토핑 목록, 곁들임
  const recipeBoxX = innerMarginX;
  const recipeBoxY = 765;
  const recipeBoxW = innerW;
  const recipeBoxH = 240;

  ctx.save();
  ctx.fillStyle = '#F8FAFC';
  drawRoundRect(ctx, recipeBoxX, recipeBoxY, recipeBoxW, recipeBoxH, 22);
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#E2E8F0';
  ctx.stroke();

  // Recipe Box Header Pill
  ctx.fillStyle = '#E2E8F0';
  drawRoundRect(ctx, recipeBoxX + 20, recipeBoxY + 16, 170, 34, 12);
  ctx.fill();
  ctx.font = 'bold 18px "Jua", "Noto Sans KR", sans-serif';
  ctx.fillStyle = '#334155';
  ctx.textAlign = 'center';
  ctx.fillText('📋 조리 레시피 명세', recipeBoxX + 105, recipeBoxY + 39);

  // Prepare recipe values
  const ramen = card.ramen;
  const isStir = ramen.ramenCategory === 'stir' || ramen.ramenCategory === 'bibim' || ramen.ramenCategory === 'jjajang';
  const categoryLabel = isStir ? '🥢 볶음면 / 비빔면' : '🍜 뜨끈한 국물라면';

  const brothDef = BROTH_LIST.find((b) => b.id === ramen.broth);
  const brothName = brothDef?.name || '기본';

  const waterKey = ramen.waterLevel || 'normal';
  const waterLabel = isStir
    ? { less: '바짝 졸이기', normal: '자작한 8스푼', more: '촉촉하게' }[waterKey]
    : { less: '진하게 적게', normal: '알맞게 적당히', more: '시원하게 넉넉히' }[waterKey];

  const noodleKey = ramen.noodle || ramen.noodleDoneness || 'normal';
  const noodleDonenessLabel = { firm: '꼬들꼬들', normal: '적당히 탱글', soft: '부드럽게 푹' }[noodleKey];
  const noodleTypeLabel = { basic: '기본면', chewy: '쫄깃면', thin: '얇은면', flat: '넓적면', udon: '우동면' }[ramen.noodleType || 'basic'];

  // Spicy Level 🌶️
  const spicyCount = ramen.spicyLevel !== undefined ? ramen.spicyLevel : 1;
  const spicyString = spicyCount === 0 ? '순한맛 (안 매움)' : `${'🌶️'.repeat(spicyCount)} (${spicyCount}단계)`;

  // Topping list formatted
  const toppingNames = (ramen.toppings || [])
    .map((tid) => {
      const t = TOPPING_LIST.find((x) => x.id === tid);
      return t ? `${t.name}` : tid;
    })
    .join(', ') || '기본 (토핑 없음)';

  // Side dish
  const sideMap: Record<string, string> = {
    danmuji: '아삭 단무지',
    kimchi: '잘 익은 배추김치',
    rice: '공깃밥',
    coke: '시원한 콜라',
    none: '없음',
  };
  const sideLabel = sideMap[ramen.sideDish || 'danmuji'] || '아삭 단무지';

  // Grid Layout inside Recipe Box
  // Left Column (X = recipeBoxX + 24)
  const col1X = recipeBoxX + 24;
  const col2X = recipeBoxX + 490;
  let rowY = recipeBoxY + 80;

  ctx.textAlign = 'left';

  // Helper row renderer
  const drawInfoItem = (x: number, y: number, label: string, val: string, maxValW: number = 320) => {
    ctx.font = 'bold 20px "Noto Sans KR", "Apple SD Gothic Neo", sans-serif';
    ctx.fillStyle = '#64748B';
    ctx.fillText(label, x, y);

    ctx.font = '600 20px "Noto Sans KR", "Apple SD Gothic Neo", sans-serif';
    ctx.fillStyle = '#0F172A';
    const labelW = ctx.measureText(label).width;
    ctx.fillText(val, x + labelW + 10, y);
  };

  // Row 1
  drawInfoItem(col1X, rowY, '• 라면 종류: ', categoryLabel);
  drawInfoItem(col2X, rowY, '• 국물/소스: ', `${brothName} (${waterLabel})`);

  // Row 2
  rowY += 38;
  drawInfoItem(col1X, rowY, '• 면발 선택: ', `${noodleTypeLabel} · ${noodleDonenessLabel}`);
  drawInfoItem(col2X, rowY, '• 맵기 강도: ', spicyString);

  // Row 3
  rowY += 38;
  drawInfoItem(col2X, rowY, '• 곁들임: ', sideLabel);

  // Row 3 Left & Multi-line Toppings Box
  ctx.font = 'bold 20px "Noto Sans KR", "Apple SD Gothic Neo", sans-serif';
  ctx.fillStyle = '#64748B';
  ctx.fillText('• 토핑 목록: ', col1X, rowY);

  ctx.font = '600 19px "Noto Sans KR", "Apple SD Gothic Neo", sans-serif';
  ctx.fillStyle = '#0F172A';
  const toppingLines = wrapText(ctx, toppingNames, 350);
  let topTextY = rowY;
  for (let i = 0; i < Math.min(toppingLines.length, 2); i++) {
    ctx.fillText(toppingLines[i], col1X + 115, topTextY);
    topTextY += 26;
  }
  ctx.restore();

  // ==========================================
  // [7] 철웅 사장님 한줄평 (Chef Feedback Box)
  // ==========================================
  const chefBoxX = innerMarginX;
  const chefBoxY = 1025;
  const chefBoxW = innerW;
  const chefBoxH = 95;

  ctx.save();
  ctx.fillStyle = '#FFF7ED';
  drawRoundRect(ctx, chefBoxX, chefBoxY, chefBoxW, chefBoxH, 20);
  ctx.fill();
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = '#FDBA74';
  ctx.stroke();

  // Chef icon badge
  ctx.font = 'bold 20px "Jua", "Noto Sans KR", sans-serif';
  ctx.fillStyle = '#C2410C';
  ctx.textAlign = 'left';
  ctx.fillText('👨‍🍳 철웅 사장님의 주방 한줄평', chefBoxX + 24, chefBoxY + 30);

  // Chef comment text
  ctx.font = '600 21px "Noto Sans KR", "Apple SD Gothic Neo", sans-serif';
  ctx.fillStyle = '#431407';
  const chefComment = `"${card.cheolwoongComment || '물 조절과 면발 탱글함이 살아있어! 훌륭하다, 신입!'}"`;
  const chefLines = wrapText(ctx, chefComment, chefBoxW - 48);

  let cY = chefBoxY + 62;
  for (let i = 0; i < Math.min(chefLines.length, 2); i++) {
    ctx.fillText(chefLines[i], chefBoxX + 24, cY);
    cY += 28;
  }
  ctx.restore();

  // ==========================================
  // [8] 맨 아래 한 줄 (Bottom Signatures)
  // 왼쪽에 "영업 ○일째 · 날짜", 오른쪽에 "요리사: (이름) · 철웅 사장님 ✍️"
  // ==========================================
  const footerY = 1170;
  ctx.save();

  // Top divider line
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = '#CBD5E1';
  ctx.beginPath();
  ctx.moveTo(innerMarginX, footerY - 24);
  ctx.lineTo(CARD_CANVAS_WIDTH - innerMarginX, footerY - 24);
  ctx.stroke();

  // Left: 영업 N일째 · 날짜
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.font = '600 22px "Noto Sans KR", "Apple SD Gothic Neo", sans-serif';
  ctx.fillStyle = '#64748B';
  const dayStr = `영업 ${card.dayNumber || 1}일째 · ${card.createdAt}`;
  ctx.fillText(dayStr, innerMarginX + 10, footerY);

  // Right: 요리사 (이름) · 철웅 사장님 ✍️
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';

  // Chef signature with tilted handwritten Gaegu font
  ctx.font = 'bold 28px "Gaegu", "Noto Sans KR", cursive';
  ctx.fillStyle = '#78350F';
  const playerLabel = card.playerName ? `요리사: ${card.playerName} · ` : '';
  const rightSign = `${playerLabel}철웅 사장님 ✍️`;
  ctx.fillText(rightSign, CARD_CANVAS_WIDTH - innerMarginX - 85, footerY);

  // Red Verification Seal Stamp [인증 💮]
  const stampX = CARD_CANVAS_WIDTH - innerMarginX - 65;
  const stampY = footerY - 18;
  ctx.strokeStyle = '#DC2626';
  ctx.lineWidth = 2.5;
  drawRoundRect(ctx, stampX, stampY, 56, 36, 8);
  ctx.stroke();

  ctx.fillStyle = 'rgba(239, 68, 68, 0.08)';
  drawRoundRect(ctx, stampX, stampY, 56, 36, 8);
  ctx.fill();

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = 'bold 18px "Jua", sans-serif';
  ctx.fillStyle = '#DC2626';
  ctx.fillText('인증', stampX + 28, stampY + 18);

  ctx.restore();

  return canvas;
}

/**
 * Download Canvas as PNG file
 */
export async function downloadCanvasAsPNG(canvas: HTMLCanvasElement, ramenTitle: string): Promise<boolean> {
  const safeTitle = (ramenTitle || '오늘의라면').replace(/[\\/:*?"<>|]/g, '_').trim();
  const filename = `연라면_오늘의라면_${safeTitle}.png`;

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        resolve(false);
        return;
      }

      try {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 2000);
        resolve(true);
      } catch (err) {
        console.warn('Direct blob download failed:', err);
        resolve(false);
      }
    }, 'image/png');
  });
}

/**
 * Compress canvas to JPEG 0.8 data URL for compact album storage
 */
export function compressCanvasForAlbum(canvas: HTMLCanvasElement): string {
  // Compress to JPEG 0.8 to keep under 100KB per photo card in LocalStorage
  return canvas.toDataURL('image/jpeg', 0.8);
}

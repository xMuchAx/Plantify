import React from 'react';
import Svg, { Circle, Defs, Ellipse, LinearGradient, Path, Rect, Stop } from 'react-native-svg';
import { MascotComponentProps, StandardPot } from './shared';

const VB = '0 0 100 120';

export function BasilicMascot({ stage, size }: MascotComponentProps) {
  // Real basil: 3-5 simple stems with paired oval leaves, bushy crown
  function BasilLeaf({ cx, cy, s, rot = 0 }: { cx: number; cy: number; s: number; rot?: number }) {
    return (
      <>
        <Path
          d={`M${cx} ${cy + s} Q${cx + s * 0.7} ${cy + s * 0.3} ${cx + s * 0.6} ${cy - s * 0.4} Q${cx} ${cy - s} ${cx - s * 0.6} ${cy - s * 0.4} Q${cx - s * 0.7} ${cy + s * 0.3} ${cx} ${cy + s} Z`}
          fill="#22C55E"
          transform={`rotate(${rot} ${cx} ${cy})`}
        />
        <Path
          d={`M${cx} ${cy - s * 0.9} L${cx} ${cy + s * 0.9}`}
          stroke="#16A34A"
          strokeWidth="0.5"
          opacity="0.6"
          transform={`rotate(${rot} ${cx} ${cy})`}
        />
      </>
    );
  }
  const stemCount = stage === 1 ? 1 : stage === 2 ? 2 : stage === 3 ? 3 : stage === 4 ? 4 : 5;
  const topY = 64 - stage * 7;
  return (
    <Svg width={size} height={size} viewBox={VB}>
      <StandardPot />
      {Array.from({ length: stemCount }).map((_, i) => {
        const offset = (i - (stemCount - 1) / 2) * 8;
        const x = 50 + offset;
        return (
          <React.Fragment key={i}>
            <Path
              d={`M${x} 88 L${x} ${topY}`}
              stroke="#16A34A"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            {/* Leaf pairs along stem */}
            <BasilLeaf cx={x - 5} cy={topY + 14} s={3.5} rot={-25} />
            <BasilLeaf cx={x + 5} cy={topY + 14} s={3.5} rot={25} />
            {stage >= 2 && (
              <>
                <BasilLeaf cx={x - 5.5} cy={topY + 4} s={4} rot={-15} />
                <BasilLeaf cx={x + 5.5} cy={topY + 4} s={4} rot={15} />
              </>
            )}
            {/* Crown leaves */}
            <BasilLeaf cx={x - 2} cy={topY - 1} s={3.5} rot={-30} />
            <BasilLeaf cx={x + 2} cy={topY - 1} s={3.5} rot={30} />
            {stage >= 4 && <BasilLeaf cx={x} cy={topY - 4} s={3} rot={0} />}
            {/* Tiny white flowers at top - mature stage */}
            {stage === 5 && i % 2 === 0 && (
              <>
                <Circle cx={x} cy={topY - 8} r="1.2" fill="#FFFFFF" />
                <Circle cx={x - 2} cy={topY - 6} r="0.8" fill="#FFFFFF" />
                <Circle cx={x + 2} cy={topY - 6} r="0.8" fill="#FFFFFF" />
              </>
            )}
          </React.Fragment>
        );
      })}
    </Svg>
  );
}

export function LavandeMascot({ stage, size }: MascotComponentProps) {
  // Tall purple flower spikes, narrow gray-green base leaves
  return (
    <Svg width={size} height={size} viewBox={VB}>
      <Defs>
        <LinearGradient id="lavSpike" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#C084FC" />
          <Stop offset="1" stopColor="#7E22CE" />
        </LinearGradient>
      </Defs>
      <StandardPot />
      {/* Base of narrow gray-green leaves */}
      {[[42, 86], [50, 86], [58, 86], [38, 88], [62, 88], [46, 88], [54, 88]].map(
        ([x, y], i) => (
          <Ellipse
            key={i}
            cx={x}
            cy={y - 4}
            rx="1.2"
            ry="6"
            fill="#9CA3AF"
            transform={`rotate(${(x - 50) * 2} ${x} ${y - 4})`}
          />
        )
      )}
      {/* Tall flower spikes */}
      {(() => {
        const stalkCount = stage === 1 ? 2 : stage === 2 ? 3 : stage === 3 ? 5 : stage === 4 ? 7 : 9;
        const heights = stage === 1 ? [22, 18] : stage === 2 ? [26, 22, 18] : stage === 3 ? [30, 22, 28, 20, 26] : stage === 4 ? [32, 26, 30, 24, 28, 22, 20] : [36, 28, 32, 26, 30, 24, 28, 22, 20];
        return Array.from({ length: stalkCount }).map((_, i) => {
          const x = 36 + (i * 28) / Math.max(1, stalkCount - 1);
          const stalkLen = heights[i] || 24;
          const baseY = 80;
          const tipY = baseY - stalkLen;
          return (
            <React.Fragment key={i}>
              {/* Stem */}
              <Path
                d={`M${x} ${baseY} L${x + (i % 2 === 0 ? -0.5 : 0.5)} ${tipY + 6}`}
                stroke="#86EFAC"
                strokeWidth="1"
                strokeLinecap="round"
              />
              {/* Spike head - elongated cluster of small purple buds */}
              {Array.from({ length: 5 }).map((_, j) => {
                const dy = j * 1.6;
                const dx = (j % 2 === 0 ? -1.5 : 1.5);
                return (
                  <Ellipse
                    key={j}
                    cx={x + dx}
                    cy={tipY + dy}
                    rx="1.3"
                    ry="1.6"
                    fill="url(#lavSpike)"
                  />
                );
              })}
              <Circle cx={x} cy={tipY - 1} r="1" fill="#A855F7" />
            </React.Fragment>
          );
        });
      })()}
    </Svg>
  );
}

export function RomarinMascot({ stage, size }: MascotComponentProps) {
  // Woody stems with dense needle-like leaves
  const stems = stage === 1 ? 1 : stage === 2 ? 2 : stage === 3 ? 3 : stage === 4 ? 4 : 5;
  return (
    <Svg width={size} height={size} viewBox={VB}>
      <StandardPot />
      {Array.from({ length: stems }).map((_, i) => {
        const offset = (i - (stems - 1) / 2) * 8;
        const x = 50 + offset;
        const top = 50 - stage * 4;
        // Slight curvature
        const wiggle = (i % 2 === 0 ? 1 : -1) * 1.5;
        return (
          <React.Fragment key={i}>
            <Path
              d={`M${x} 88 Q${x + wiggle} ${(88 + top) / 2} ${x} ${top}`}
              stroke="#7C5036"
              strokeWidth="1.4"
              strokeLinecap="round"
              fill="none"
            />
            {/* Needle-like leaves along the stem - paired */}
            {Array.from({ length: 7 }).map((_, j) => {
              const t = (j + 1) / 8;
              const px = x + wiggle * (1 - Math.abs(2 * t - 1));
              const py = 88 + (top - 88) * t;
              return (
                <React.Fragment key={j}>
                  <Path
                    d={`M${px} ${py} L${px - 4} ${py - 2}`}
                    stroke="#15803D"
                    strokeWidth="0.9"
                    strokeLinecap="round"
                  />
                  <Path
                    d={`M${px} ${py} L${px + 4} ${py - 2}`}
                    stroke="#15803D"
                    strokeWidth="0.9"
                    strokeLinecap="round"
                  />
                  <Path
                    d={`M${px} ${py} L${px - 3.5} ${py + 1}`}
                    stroke="#22C55E"
                    strokeWidth="0.7"
                    strokeLinecap="round"
                  />
                  <Path
                    d={`M${px} ${py} L${px + 3.5} ${py + 1}`}
                    stroke="#22C55E"
                    strokeWidth="0.7"
                    strokeLinecap="round"
                  />
                </React.Fragment>
              );
            })}
            {/* Top tuft */}
            <Path d={`M${x} ${top} L${x - 3} ${top - 3}`} stroke="#22C55E" strokeWidth="0.8" />
            <Path d={`M${x} ${top} L${x + 3} ${top - 3}`} stroke="#22C55E" strokeWidth="0.8" />
            <Path d={`M${x} ${top} L${x} ${top - 4}`} stroke="#22C55E" strokeWidth="0.8" />
            {/* Pale blue flowers in mature stages */}
            {stage >= 4 && (
              <>
                <Circle cx={x - 4} cy={top + 12} r="1.2" fill="#A5B4FC" />
                <Circle cx={x + 4} cy={top + 18} r="1.2" fill="#A5B4FC" />
              </>
            )}
            {stage === 5 && (
              <Circle cx={x} cy={top + 6} r="1" fill="#818CF8" />
            )}
          </React.Fragment>
        );
      })}
    </Svg>
  );
}

export function MentheMascot({ stage, size }: MascotComponentProps) {
  // Pointed serrated leaves with clear teeth on simple stems
  function MintLeaf({ cx, cy, s, rot = 0 }: { cx: number; cy: number; s: number; rot?: number }) {
    return (
      <>
        <Path
          d={`M${cx} ${cy + s} Q${cx - s * 0.5} ${cy + s * 0.3} ${cx - s * 0.55} ${cy - s * 0.3} Q${cx} ${cy - s * 1.2} ${cx + s * 0.55} ${cy - s * 0.3} Q${cx + s * 0.5} ${cy + s * 0.3} ${cx} ${cy + s} Z`}
          fill="#22C55E"
          transform={`rotate(${rot} ${cx} ${cy})`}
        />
        {/* Serrated edge teeth */}
        {[-0.6, -0.3, 0, 0.3, 0.6].map((t, i) => (
          <React.Fragment key={i}>
            <Path
              d={`M${cx - s * 0.5 - 0.5} ${cy + s * t} L${cx - s * 0.55 - 1.5} ${cy + s * t - 0.2}`}
              stroke="#22C55E"
              strokeWidth="1"
              transform={`rotate(${rot} ${cx} ${cy})`}
            />
            <Path
              d={`M${cx + s * 0.5 + 0.5} ${cy + s * t} L${cx + s * 0.55 + 1.5} ${cy + s * t - 0.2}`}
              stroke="#22C55E"
              strokeWidth="1"
              transform={`rotate(${rot} ${cx} ${cy})`}
            />
          </React.Fragment>
        ))}
        {/* Central vein */}
        <Path
          d={`M${cx} ${cy - s * 1.1} L${cx} ${cy + s * 0.9}`}
          stroke="#15803D"
          strokeWidth="0.5"
          transform={`rotate(${rot} ${cx} ${cy})`}
        />
      </>
    );
  }
  const stems = stage === 1 ? 2 : stage === 2 ? 3 : stage === 3 ? 4 : stage === 4 ? 5 : 6;
  return (
    <Svg width={size} height={size} viewBox={VB}>
      <StandardPot />
      {Array.from({ length: stems }).map((_, i) => {
        const offset = (i - (stems - 1) / 2) * 7;
        const x = 50 + offset;
        const top = 56 - stage * 5;
        return (
          <React.Fragment key={i}>
            {/* Square mint stem */}
            <Path
              d={`M${x} 88 L${x} ${top}`}
              stroke="#15803D"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            {/* Paired leaves at intervals */}
            <MintLeaf cx={x - 5} cy={top + 14} s={3.5} rot={-30} />
            <MintLeaf cx={x + 5} cy={top + 14} s={3.5} rot={30} />
            {stage >= 2 && (
              <>
                <MintLeaf cx={x - 5} cy={top + 4} s={4} rot={-30} />
                <MintLeaf cx={x + 5} cy={top + 4} s={4} rot={30} />
              </>
            )}
            {stage >= 3 && (
              <MintLeaf cx={x} cy={top - 3} s={3.5} rot={0} />
            )}
          </React.Fragment>
        );
      })}
    </Svg>
  );
}

export function ThymMascot({ stage, size }: MascotComponentProps) {
  // Low-growing creeping thyme with dense tiny leaf clusters
  return (
    <Svg width={size} height={size} viewBox={VB}>
      <StandardPot />
      {/* Spreading horizontal twigs */}
      {Array.from({ length: stage * 2 + 2 }).map((_, i) => {
        const startX = 30 + (i * 40) / (stage * 2 + 1);
        const endX = startX + (i % 2 === 0 ? 6 : -6);
        const startY = 86 - (i % 3) * 1.5;
        const endY = startY - 6 - (i % 4);
        return (
          <Path
            key={`b${i}`}
            d={`M${startX} ${startY} Q${(startX + endX) / 2} ${(startY + endY) / 2 - 1} ${endX} ${endY}`}
            stroke="#7C5036"
            strokeWidth="0.9"
            strokeLinecap="round"
            fill="none"
          />
        );
      })}
      {/* Dense leaf clusters */}
      {Array.from({ length: 18 + stage * 6 }).map((_, i) => {
        const x = 26 + (i * 48) / (18 + stage * 6 - 1);
        const y = 86 - (i % 5) * 1.6 - (i % 7) * 1.2;
        return (
          <React.Fragment key={`l${i}`}>
            <Ellipse cx={x} cy={y} rx="1.2" ry="0.8" fill="#65A30D" />
            <Ellipse cx={x + 1} cy={y - 1.5} rx="1" ry="0.7" fill="#22C55E" />
            <Ellipse cx={x - 1} cy={y - 1.5} rx="1" ry="0.7" fill="#86EFAC" />
          </React.Fragment>
        );
      })}
      {/* Tiny pink/purple flowers on mature plant */}
      {stage >= 4 &&
        Array.from({ length: stage * 2 }).map((_, i) => {
          const x = 32 + (i * 36) / (stage * 2 - 1);
          const y = 78 - (i % 3) * 1.5;
          return (
            <React.Fragment key={`f${i}`}>
              <Circle cx={x} cy={y} r="1.2" fill="#F9A8D4" />
              <Circle cx={x} cy={y} r="0.5" fill="#EC4899" />
            </React.Fragment>
          );
        })}
    </Svg>
  );
}

export function CibouletteMascot({ stage, size }: MascotComponentProps) {
  // Hollow tubular leaves with purple pompom flower
  const tubes = stage === 1 ? 4 : stage === 2 ? 7 : stage === 3 ? 10 : stage === 4 ? 14 : 18;
  const heightMax = 26 + stage * 7;
  return (
    <Svg width={size} height={size} viewBox={VB}>
      <StandardPot />
      {Array.from({ length: tubes }).map((_, i) => {
        const x = 32 + (i * 36) / Math.max(1, tubes - 1);
        const h = heightMax - (i % 4) * 5;
        const angle = ((i % 7) - 3) * 0.8;
        const tipX = x + angle;
        const tipY = 88 - h;
        return (
          <React.Fragment key={i}>
            {/* Main tube body */}
            <Path
              d={`M${x} 88 L${tipX} ${tipY}`}
              stroke="#22C55E"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            {/* Lighter inner edge to suggest hollowness */}
            <Path
              d={`M${x - 0.4} 88 L${tipX - 0.4} ${tipY}`}
              stroke="#86EFAC"
              strokeWidth="0.6"
              strokeLinecap="round"
              opacity="0.7"
            />
            {/* Tiny tip darker */}
            <Circle cx={tipX} cy={tipY} r="0.6" fill="#15803D" />
          </React.Fragment>
        );
      })}
      {/* Purple round pompom flowers */}
      {stage >= 3 && (
        <>
          <Circle cx="44" cy={88 - heightMax + 4} r="4" fill="#A855F7" />
          {[
            [44, 88 - heightMax + 2],
            [42, 88 - heightMax + 5],
            [46, 88 - heightMax + 5],
            [44, 88 - heightMax + 7],
            [40, 88 - heightMax + 4],
            [48, 88 - heightMax + 4],
          ].map(([cx, cy], i) => (
            <Circle key={i} cx={cx} cy={cy} r="1.2" fill="#C084FC" />
          ))}
        </>
      )}
      {stage >= 4 && (
        <>
          <Circle cx="60" cy={88 - heightMax + 10} r="4.5" fill="#A855F7" />
          {[
            [60, 88 - heightMax + 8],
            [58, 88 - heightMax + 11],
            [62, 88 - heightMax + 11],
            [60, 88 - heightMax + 13],
            [56, 88 - heightMax + 10],
            [64, 88 - heightMax + 10],
          ].map(([cx, cy], i) => (
            <Circle key={`b${i}`} cx={cx} cy={cy} r="1.3" fill="#C084FC" />
          ))}
        </>
      )}
      {stage === 5 && (
        <Circle cx="28" cy={88 - heightMax + 16} r="3.5" fill="#A855F7" />
      )}
    </Svg>
  );
}

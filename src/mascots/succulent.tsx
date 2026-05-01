import React from 'react';
import Svg, { Circle, Defs, Ellipse, LinearGradient, Path, Rect, Stop } from 'react-native-svg';
import { HangingPot, MascotComponentProps, StandardPot } from './shared';

const VB = '0 0 100 120';

export function AloeVeraMascot({ stage, size }: MascotComponentProps) {
  // Real aloe: thick upright pointed succulent leaves growing UPWARD with serrated edges
  const leafCount = stage === 1 ? 4 : stage === 2 ? 6 : stage === 3 ? 8 : stage === 4 ? 11 : 14;
  const maxLen = 30 + stage * 6;
  return (
    <Svg width={size} height={size} viewBox={VB}>
      <Defs>
        <LinearGradient id="aloeLeaf" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#86EFAC" />
          <Stop offset="0.6" stopColor="#4ADE80" />
          <Stop offset="1" stopColor="#22C55E" />
        </LinearGradient>
      </Defs>
      <StandardPot />
      {/* Upright leaves with thick base, pointed tip, white teeth on edges */}
      {Array.from({ length: leafCount }).map((_, i) => {
        // Spread leaves like a fan, mostly upward
        const t = leafCount === 1 ? 0 : i / (leafCount - 1);
        const baseAngle = -50 + t * 100; // -50 to +50 degrees from vertical
        const wobble = (i % 2 === 0 ? 1 : -1) * 5;
        const lengthVar = 0.7 + (i % 3) * 0.1;
        const len = maxLen * lengthVar;
        const baseX = 50 + Math.sin((baseAngle * Math.PI) / 180) * 2;
        const baseY = 86;
        const tipAngle = baseAngle + wobble * 0.3;
        const tipX = baseX + Math.sin((tipAngle * Math.PI) / 180) * len;
        const tipY = baseY - Math.cos((tipAngle * Math.PI) / 180) * len;
        // Width perpendicular to leaf direction
        const widthBase = 4;
        const perpX = Math.cos((tipAngle * Math.PI) / 180);
        const perpY = Math.sin((tipAngle * Math.PI) / 180);
        const leftBaseX = baseX - perpX * widthBase;
        const leftBaseY = baseY - perpY * widthBase;
        const rightBaseX = baseX + perpX * widthBase;
        const rightBaseY = baseY - perpY * widthBase;
        const fill = i % 2 === 0 ? 'url(#aloeLeaf)' : '#4ADE80';
        return (
          <React.Fragment key={i}>
            {/* Leaf body - thick base tapering to point */}
            <Path
              d={`M${leftBaseX} ${leftBaseY} Q${baseX - perpX * widthBase * 0.5} ${baseY - len * 0.5 * Math.cos((tipAngle * Math.PI) / 180) * 0.5} ${tipX} ${tipY} Q${baseX + perpX * widthBase * 0.5} ${baseY - len * 0.5 * Math.cos((tipAngle * Math.PI) / 180) * 0.5} ${rightBaseX} ${rightBaseY} Z`}
              fill={fill}
            />
            {/* White teeth on edges - signature aloe feature */}
            {[0.2, 0.4, 0.6, 0.8].map((u, j) => {
              const lx = leftBaseX + (tipX - leftBaseX) * u;
              const ly = leftBaseY + (tipY - leftBaseY) * u;
              const rx = rightBaseX + (tipX - rightBaseX) * u;
              const ry = rightBaseY + (tipY - rightBaseY) * u;
              return (
                <React.Fragment key={j}>
                  <Circle cx={lx} cy={ly} r="0.7" fill="#FFFFFF" />
                  <Circle cx={rx} cy={ry} r="0.7" fill="#FFFFFF" />
                </React.Fragment>
              );
            })}
            {/* White spots on leaf surface */}
            {[0.3, 0.55, 0.75].map((u, j) => (
              <Circle
                key={`s${j}`}
                cx={baseX + (tipX - baseX) * u}
                cy={baseY + (tipY - baseY) * u}
                r="0.4"
                fill="#FFFFFF"
                opacity="0.5"
              />
            ))}
          </React.Fragment>
        );
      })}
      {/* Center core */}
      <Circle cx="50" cy="84" r="2.5" fill="#16A34A" />
    </Svg>
  );
}

export function EcheveriaMascot({ stage, size }: MascotComponentProps) {
  // Tighter rosette, plump pointed leaves with pink tips
  const leafCount = stage === 1 ? 6 : stage === 2 ? 9 : stage === 3 ? 12 : stage === 4 ? 16 : 20;
  const ry = 6 + stage * 2.2;
  return (
    <Svg width={size} height={size} viewBox={VB}>
      <Defs>
        <LinearGradient id="echLeaf" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#A7F3D0" />
          <Stop offset="0.7" stopColor="#6EE7B7" />
          <Stop offset="1" stopColor="#FB7185" />
        </LinearGradient>
      </Defs>
      <StandardPot />
      {Array.from({ length: leafCount }).map((_, i) => {
        const angle = (i * 360) / leafCount - 90;
        const rad = (angle * Math.PI) / 180;
        const tipX = 50 + Math.cos(rad) * ry;
        const tipY = 84 + Math.sin(rad) * ry;
        const baseX = 50;
        const baseY = 84;
        const perpX = -Math.sin(rad) * (ry * 0.42);
        const perpY = Math.cos(rad) * (ry * 0.42);
        const fill = i % 2 === 0 ? 'url(#echLeaf)' : '#6EE7B7';
        return (
          <React.Fragment key={i}>
            <Path
              d={`M${baseX - perpX} ${baseY - perpY} Q${(baseX + tipX) / 2 - perpX * 0.3} ${(baseY + tipY) / 2 - perpY * 0.3} ${tipX} ${tipY} Q${(baseX + tipX) / 2 + perpX * 0.3} ${(baseY + tipY) / 2 + perpY * 0.3} ${baseX + perpX} ${baseY + perpY} Z`}
              fill={fill}
            />
            {/* Pink tip highlight */}
            <Circle cx={tipX} cy={tipY} r="1.2" fill="#FB7185" />
            <Circle cx={tipX} cy={tipY} r="0.5" fill="#FECDD3" />
          </React.Fragment>
        );
      })}
      <Circle cx="50" cy="84" r="2.5" fill="#34D399" />
      {stage === 5 && (
        <>
          <Path d="M50 84 Q56 60 62 36" stroke="#86EFAC" strokeWidth="1.5" fill="none" />
          <Circle cx="62" cy="36" r="3" fill="#FB7185" />
          <Circle cx="58" cy="40" r="2" fill="#FB7185" opacity="0.85" />
          <Circle cx="66" cy="32" r="2" fill="#FB7185" opacity="0.85" />
          <Circle cx="62" cy="36" r="1" fill="#FDE68A" />
        </>
      )}
    </Svg>
  );
}

export function JadeMascot({ stage, size }: MascotComponentProps) {
  // Tree-like jade plant: thick woody trunk, branching, plump oval leaves with red tips
  function JadeLeaf({ cx, cy, rot = 0 }: { cx: number; cy: number; rot?: number }) {
    return (
      <>
        <Ellipse cx={cx} cy={cy} rx="3.2" ry="4.8" fill="url(#jadeLeaf)" transform={`rotate(${rot} ${cx} ${cy})`} />
        {/* Glossy highlight */}
        <Ellipse cx={cx - 0.8} cy={cy - 1} rx="0.8" ry="1.8" fill="#86EFAC" opacity="0.5" transform={`rotate(${rot} ${cx} ${cy})`} />
        {/* Red tip - signature jade feature */}
        <Path
          d={`M${cx - 1.5} ${cy - 4.6} Q${cx} ${cy - 5.2} ${cx + 1.5} ${cy - 4.6} Q${cx + 1} ${cy - 3.5} ${cx - 1} ${cy - 3.5} Z`}
          fill="#DC2626"
          opacity="0.7"
          transform={`rotate(${rot} ${cx} ${cy})`}
        />
      </>
    );
  }
  function LeafCluster({ cx, cy, count = 3 }: { cx: number; cy: number; count?: number }) {
    const positions: Array<[number, number, number]> =
      count === 3
        ? [[cx, cy - 3, 0], [cx - 4, cy + 1, -25], [cx + 4, cy + 1, 25]]
        : count === 5
        ? [[cx, cy - 4, 0], [cx - 5, cy - 1, -30], [cx + 5, cy - 1, 30], [cx - 3, cy + 4, -10], [cx + 3, cy + 4, 10]]
        : [[cx, cy - 5, 0], [cx - 5, cy - 2, -25], [cx + 5, cy - 2, 25], [cx - 6, cy + 3, -45], [cx + 6, cy + 3, 45], [cx - 2, cy + 5, -10], [cx + 2, cy + 5, 10]];
    return (
      <>
        {positions.map(([px, py, rot], i) => (
          <JadeLeaf key={i} cx={px} cy={py} rot={rot} />
        ))}
      </>
    );
  }
  return (
    <Svg width={size} height={size} viewBox={VB}>
      <Defs>
        <LinearGradient id="jadeTrunkBody" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor="#A0714F" />
          <Stop offset="0.5" stopColor="#7C5036" />
          <Stop offset="1" stopColor="#5C3317" />
        </LinearGradient>
        <LinearGradient id="jadeLeaf" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#22C55E" />
          <Stop offset="1" stopColor="#15803D" />
        </LinearGradient>
      </Defs>
      <StandardPot />

      {/* THICK MAIN TRUNK as a closed shape - tree-like jade */}
      <Path
        d="M42 90 Q40 78 44 64 Q42 52 46 40 L54 40 Q58 52 56 64 Q60 78 58 90 Z"
        fill="url(#jadeTrunkBody)"
      />
      {/* Trunk shading (left side darker) */}
      <Path
        d="M42 90 Q40 78 44 64 Q42 52 46 40 L48 40 Q44 52 46 64 Q44 78 46 90 Z"
        fill="#3D2914"
        opacity="0.35"
      />
      {/* Trunk knots */}
      <Circle cx="46" cy="72" r="1" fill="#3D2914" opacity="0.7" />
      <Circle cx="54" cy="60" r="0.9" fill="#3D2914" opacity="0.6" />
      <Circle cx="48" cy="52" r="0.8" fill="#3D2914" opacity="0.5" />

      {/* Branches - Y-shaped */}
      {stage >= 2 && (
        <Path
          d="M44 56 Q34 52 30 44"
          stroke="url(#jadeTrunkBody)"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
      )}
      {stage >= 3 && (
        <Path
          d="M56 50 Q66 46 70 36"
          stroke="url(#jadeTrunkBody)"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
      )}
      {stage >= 4 && (
        <Path
          d="M50 40 L50 26"
          stroke="url(#jadeTrunkBody)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      )}
      {stage >= 5 && (
        <>
          <Path
            d="M44 64 Q34 62 28 56"
            stroke="url(#jadeTrunkBody)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <Path
            d="M56 64 Q66 62 72 56"
            stroke="url(#jadeTrunkBody)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        </>
      )}

      {/* Leaf clusters at branch tips */}
      {stage === 1 && <LeafCluster cx={50} cy={40} count={3} />}
      {stage === 2 && (
        <>
          <LeafCluster cx={50} cy={38} count={3} />
          <LeafCluster cx={30} cy={42} count={3} />
        </>
      )}
      {stage === 3 && (
        <>
          <LeafCluster cx={50} cy={36} count={5} />
          <LeafCluster cx={28} cy={42} count={3} />
          <LeafCluster cx={70} cy={34} count={3} />
        </>
      )}
      {stage === 4 && (
        <>
          <LeafCluster cx={50} cy={24} count={5} />
          <LeafCluster cx={28} cy={42} count={5} />
          <LeafCluster cx={70} cy={34} count={5} />
        </>
      )}
      {stage === 5 && (
        <>
          <LeafCluster cx={50} cy={22} count={7} />
          <LeafCluster cx={26} cy={40} count={5} />
          <LeafCluster cx={72} cy={32} count={5} />
          <LeafCluster cx={26} cy={54} count={3} />
          <LeafCluster cx={74} cy={54} count={3} />
        </>
      )}

      {/* Tiny white star flowers when mature */}
      {stage === 5 &&
        [[40, 28], [60, 28], [50, 18], [22, 38]].map(([cx, cy], i) => (
          <React.Fragment key={`f${i}`}>
            {[0, 72, 144, 216, 288].map((a, j) => {
              const rad = (a * Math.PI) / 180;
              return (
                <Circle
                  key={j}
                  cx={cx + Math.cos(rad) * 1.2}
                  cy={cy + Math.sin(rad) * 1.2}
                  r="0.7"
                  fill="#FFFFFF"
                />
              );
            })}
            <Circle cx={cx} cy={cy} r="0.5" fill="#FBCFE8" />
          </React.Fragment>
        ))}
    </Svg>
  );
}

export function HaworthiaMascot({ stage, size }: MascotComponentProps) {
  const count = stage === 1 ? 6 : stage === 2 ? 9 : stage === 3 ? 12 : stage === 4 ? 16 : 22;
  const ry = 6 + stage * 1.6;
  return (
    <Svg width={size} height={size} viewBox={VB}>
      <StandardPot />
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i * 360) / count - 90;
        const rad = (angle * Math.PI) / 180;
        const tipX = 50 + Math.cos(rad) * ry;
        const tipY = 84 + Math.sin(rad) * ry;
        const baseX = 50;
        const baseY = 84;
        const perpX = -Math.sin(rad) * (ry * 0.32);
        const perpY = Math.cos(rad) * (ry * 0.32);
        return (
          <React.Fragment key={i}>
            <Path
              d={`M${baseX - perpX} ${baseY - perpY} Q${(baseX + tipX) / 2 - perpX * 0.4} ${(baseY + tipY) / 2 - perpY * 0.4} ${tipX} ${tipY} Q${(baseX + tipX) / 2 + perpX * 0.4} ${(baseY + tipY) / 2 + perpY * 0.4} ${baseX + perpX} ${baseY + perpY} Z`}
              fill={i % 2 === 0 ? '#166534' : '#22C55E'}
            />
            {/* White zebra stripes - signature of haworthia */}
            {[0.25, 0.5, 0.75].map((t, j) => {
              const cx = baseX + (tipX - baseX) * t;
              const cy = baseY + (tipY - baseY) * t;
              const lx = cx - perpX * (1 - t) * 0.6;
              const ly = cy - perpY * (1 - t) * 0.6;
              const rx = cx + perpX * (1 - t) * 0.6;
              const ry2 = cy + perpY * (1 - t) * 0.6;
              return (
                <Path
                  key={j}
                  d={`M${lx} ${ly} L${rx} ${ry2}`}
                  stroke="#FFFFFF"
                  strokeWidth="0.6"
                  opacity="0.9"
                />
              );
            })}
          </React.Fragment>
        );
      })}
    </Svg>
  );
}

export function LithopsMascot({ stage, size }: MascotComponentProps) {
  const w = 9 + stage * 2.5;
  const h = 7 + stage * 2;
  return (
    <Svg width={size} height={size} viewBox={VB}>
      <Defs>
        <LinearGradient id="lithopsBody" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#D6D3D1" />
          <Stop offset="0.5" stopColor="#A8A29E" />
          <Stop offset="1" stopColor="#78716C" />
        </LinearGradient>
      </Defs>
      <StandardPot />
      {/* Sand around */}
      <Ellipse cx="50" cy="86" rx="22" ry="3" fill="#A8A29E" opacity="0.4" />

      {/* Two pebble halves with deep central split */}
      <Ellipse cx={50 - w * 0.5 - 0.2} cy="80" rx={w * 0.5} ry={h} fill="url(#lithopsBody)" />
      <Ellipse cx={50 + w * 0.5 + 0.2} cy="80" rx={w * 0.5} ry={h} fill="url(#lithopsBody)" />
      {/* Dark central crack */}
      <Path d="M50 73 L50 87" stroke="#3F3F46" strokeWidth="2" strokeLinecap="round" />
      <Path d="M49.5 73 L49.5 87" stroke="#1C1917" strokeWidth="0.6" />

      {/* Mottled top surface pattern - signature lithops markings */}
      {[
        [44, 75],
        [47, 76],
        [44, 78],
        [46, 80],
        [42, 81],
        [54, 75],
        [56, 76],
        [58, 78],
        [54, 80],
        [56, 82],
      ].map(([cx, cy], i) => (
        <React.Fragment key={i}>
          <Path
            d={`M${cx} ${cy} L${cx + 1} ${cy + 1} L${cx + 0.5} ${cy + 1.5} L${cx - 1} ${cy + 1} Z`}
            fill={i % 2 === 0 ? '#57534E' : '#44403C'}
            opacity="0.7"
          />
        </React.Fragment>
      ))}
      {/* Translucent windows on top */}
      <Ellipse cx={50 - w * 0.5} cy="76" rx={w * 0.25} ry="1.2" fill="#FAFAF9" opacity="0.4" />
      <Ellipse cx={50 + w * 0.5} cy="76" rx={w * 0.25} ry="1.2" fill="#FAFAF9" opacity="0.4" />

      {/* Yellow daisy-like flower from the split */}
      {stage >= 4 && (
        <>
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 360) / 12;
            const rad = (angle * Math.PI) / 180;
            return (
              <Ellipse
                key={i}
                cx={50 + Math.cos(rad) * 5}
                cy={62 + Math.sin(rad) * 5}
                rx="2"
                ry="3.5"
                fill="#FBBF24"
                transform={`rotate(${angle} 50 62)`}
              />
            );
          })}
          <Circle cx="50" cy="62" r="2.5" fill="#F59E0B" />
          <Circle cx="50" cy="62" r="1" fill="#FDE68A" />
          <Path d="M50 75 L50 67" stroke="#86EFAC" strokeWidth="1.5" />
        </>
      )}
      {stage === 5 && (
        <>
          {/* Second flower offset */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 360) / 12;
            const rad = (angle * Math.PI) / 180;
            return (
              <Ellipse
                key={i}
                cx={32 + Math.cos(rad) * 4}
                cy={70 + Math.sin(rad) * 4}
                rx="1.8"
                ry="3"
                fill="#FBBF24"
                transform={`rotate(${angle} 32 70)`}
              />
            );
          })}
          <Circle cx="32" cy="70" r="2" fill="#F59E0B" />
        </>
      )}
    </Svg>
  );
}

export function MammillaireMascot({ stage, size }: MascotComponentProps) {
  // Cylindrical pincushion cactus with diamond tubercles + crown of pink flowers on top
  const h = 18 + stage * 6;
  const w = 14 + stage * 3;
  const topY = 88 - h;
  return (
    <Svg width={size} height={size} viewBox={VB}>
      <Defs>
        <LinearGradient id="mamBody" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor="#15803D" />
          <Stop offset="0.5" stopColor="#22C55E" />
          <Stop offset="1" stopColor="#15803D" />
        </LinearGradient>
      </Defs>
      <StandardPot />
      {/* Cylindrical body with rounded top */}
      <Path
        d={`M${50 - w / 2} 88 L${50 - w / 2} ${topY + w / 2} Q${50 - w / 2} ${topY} 50 ${topY} Q${50 + w / 2} ${topY} ${50 + w / 2} ${topY + w / 2} L${50 + w / 2} 88 Z`}
        fill="url(#mamBody)"
      />
      {/* Vertical rib lines (subtle - it's mostly tubercle pattern) */}
      <Path d={`M${50 - w / 4} ${topY + w / 2} L${50 - w / 4} 87`} stroke="#15803D" strokeWidth="0.4" opacity="0.4" />
      <Path d={`M${50 + w / 4} ${topY + w / 2} L${50 + w / 4} 87`} stroke="#15803D" strokeWidth="0.4" opacity="0.4" />

      {/* Diamond tubercles in offset rows (signature mammillaria pattern) */}
      {(() => {
        const tubercles: Array<[number, number]> = [];
        const rows = Math.floor(h / 4) + 1;
        for (let r = 0; r < rows; r++) {
          const y = topY + 5 + r * 4;
          if (y > 86) break;
          const offset = r % 2 === 0 ? 0 : w / 8;
          const cols = 3;
          for (let c = 0; c < cols; c++) {
            const x = 50 - w / 2 + 3 + offset + (c * (w - 6)) / (cols - 1);
            const distFromCenter = Math.abs(x - 50) / (w / 2);
            if (distFromCenter > 0.95) continue;
            tubercles.push([x, y]);
          }
        }
        return tubercles.map(([cx, cy], i) => (
          <React.Fragment key={i}>
            {/* Diamond-shaped tubercle */}
            <Path
              d={`M${cx} ${cy - 1.5} L${cx + 1.8} ${cy} L${cx} ${cy + 1.5} L${cx - 1.8} ${cy} Z`}
              fill="#16A34A"
              stroke="#15803D"
              strokeWidth="0.3"
            />
            {/* Highlight on tubercle */}
            <Path
              d={`M${cx} ${cy - 1.5} L${cx + 0.8} ${cy} L${cx} ${cy + 0.5} Z`}
              fill="#86EFAC"
              opacity="0.5"
            />
            {/* White star-burst spine cluster - signature mammillaria */}
            {[0, 45, 90, 135].map((a, j) => {
              const rad = (a * Math.PI) / 180;
              return (
                <Path
                  key={j}
                  d={`M${cx - Math.cos(rad) * 1.6} ${cy - Math.sin(rad) * 1.6} L${cx + Math.cos(rad) * 1.6} ${cy + Math.sin(rad) * 1.6}`}
                  stroke="#FFFFFF"
                  strokeWidth="0.4"
                  opacity="0.95"
                />
              );
            })}
            <Circle cx={cx} cy={cy} r="0.4" fill="#FFFFFF" />
          </React.Fragment>
        ));
      })()}

      {/* Crown of pink flowers on top - ring formation */}
      {stage >= 3 && (
        <>
          {Array.from({ length: 5 }).map((_, i) => {
            const angle = -150 + (300 / 4) * i;
            const rad = (angle * Math.PI) / 180;
            const cx = 50 + Math.cos(rad) * (w * 0.4);
            const cy = topY - 1 + Math.sin(rad) * 2;
            return (
              <React.Fragment key={i}>
                {[0, 72, 144, 216, 288].map((a, j) => {
                  const r2 = (a * Math.PI) / 180;
                  return (
                    <Ellipse
                      key={j}
                      cx={cx + Math.cos(r2) * 1.4}
                      cy={cy + Math.sin(r2) * 1.4}
                      rx="1.1"
                      ry="1.6"
                      fill="#EC4899"
                      transform={`rotate(${a} ${cx} ${cy})`}
                    />
                  );
                })}
                <Circle cx={cx} cy={cy} r="0.7" fill="#FDE68A" />
              </React.Fragment>
            );
          })}
        </>
      )}
    </Svg>
  );
}

export function GymnocalyciumMascot({ stage, size }: MascotComponentProps) {
  // Squat round cactus with very deep ribs (gear-like) + big single flower on top
  const r = 11 + stage * 3;
  const ribs = 8;
  const cy0 = 88 - r * 0.85;
  return (
    <Svg width={size} height={size} viewBox={VB}>
      <Defs>
        <LinearGradient id="gymBody" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor="#15803D" />
          <Stop offset="0.5" stopColor="#22C55E" />
          <Stop offset="1" stopColor="#15803D" />
        </LinearGradient>
      </Defs>
      <StandardPot />

      {/* Body shape: lobed/rib silhouette - alternating bumps around perimeter */}
      {(() => {
        const points: string[] = [];
        const N = ribs * 2;
        for (let i = 0; i < N; i++) {
          const angle = (i * 360) / N - 90;
          const rad = (angle * Math.PI) / 180;
          const radius = i % 2 === 0 ? r : r * 0.78;
          const x = 50 + Math.cos(rad) * radius;
          const y = cy0 + Math.sin(rad) * radius * 0.92;
          points.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`);
        }
        return <Path d={points.join(' ') + ' Z'} fill="url(#gymBody)" />;
      })()}

      {/* Deep rib lines from center outward */}
      {Array.from({ length: ribs }).map((_, i) => {
        const angle = (i * 360) / ribs - 90;
        const rad = (angle * Math.PI) / 180;
        const ex = 50 + Math.cos(rad) * r * 0.95;
        const ey = cy0 + Math.sin(rad) * r * 0.85;
        return (
          <React.Fragment key={i}>
            {/* Dark rib groove */}
            <Path
              d={`M50 ${cy0} L${ex} ${ey}`}
              stroke="#0F1A0F"
              strokeWidth="1.6"
              opacity="0.65"
            />
            {/* Lighter inner rib highlight (offset) */}
            <Path
              d={`M50 ${cy0} L${50 + Math.cos(rad) * r * 0.7} ${cy0 + Math.sin(rad) * r * 0.65}`}
              stroke="#86EFAC"
              strokeWidth="0.5"
              opacity="0.4"
            />
          </React.Fragment>
        );
      })}

      {/* Areoles with white spine clusters along each rib */}
      {Array.from({ length: ribs }).map((_, i) => {
        const angle = (i * 360) / ribs - 90 + 180 / ribs;
        const rad = (angle * Math.PI) / 180;
        return [0.45, 0.75].map((t, j) => {
          const ax = 50 + Math.cos(rad) * r * t;
          const ay = cy0 + Math.sin(rad) * r * t * 0.9;
          return (
            <React.Fragment key={`${i}-${j}`}>
              <Circle cx={ax} cy={ay} r="0.6" fill="#FEF9C3" />
              {[0, 60, 120, 180, 240, 300].map((a, k) => {
                const r2 = (a * Math.PI) / 180;
                return (
                  <Path
                    key={k}
                    d={`M${ax} ${ay} L${ax + Math.cos(r2) * 1.4} ${ay + Math.sin(r2) * 1.4}`}
                    stroke="#FFFFFF"
                    strokeWidth="0.35"
                    opacity="0.95"
                  />
                );
              })}
            </React.Fragment>
          );
        });
      })}

      {/* BIG flower on top - signature gymnocalycium */}
      {stage >= 2 && (
        <>
          {/* Stem of flower */}
          <Path d={`M50 ${cy0 - r * 0.85} L50 ${cy0 - r}`} stroke="#16A34A" strokeWidth="1" />
          {/* Outer petals */}
          {Array.from({ length: 10 }).map((_, i) => {
            const angle = (i * 36);
            const rad = (angle * Math.PI) / 180;
            return (
              <Ellipse
                key={i}
                cx={50 + Math.cos(rad) * 5}
                cy={cy0 - r - 4 + Math.sin(rad) * 5}
                rx="3"
                ry="5"
                fill="#F472B6"
                transform={`rotate(${angle + 90} 50 ${cy0 - r - 4})`}
              />
            );
          })}
          {/* Inner petals */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 45);
            const rad = (angle * Math.PI) / 180;
            return (
              <Ellipse
                key={`in${i}`}
                cx={50 + Math.cos(rad) * 2.5}
                cy={cy0 - r - 4 + Math.sin(rad) * 2.5}
                rx="2"
                ry="3.5"
                fill="#EC4899"
                transform={`rotate(${angle + 90} 50 ${cy0 - r - 4})`}
              />
            );
          })}
          {/* Stamens center */}
          <Circle cx="50" cy={cy0 - r - 4} r="2" fill="#FEF3C7" />
          {[0, 60, 120, 180, 240, 300].map((a, j) => {
            const r2 = (a * Math.PI) / 180;
            return (
              <Circle
                key={j}
                cx={50 + Math.cos(r2) * 1}
                cy={cy0 - r - 4 + Math.sin(r2) * 1}
                r="0.4"
                fill="#F59E0B"
              />
            );
          })}
        </>
      )}
      {/* Bud on the side at stage 5 */}
      {stage === 5 && (
        <>
          <Path d={`M${50 - r * 0.5} ${cy0 - r * 0.8} L${50 - r * 0.7} ${cy0 - r * 1}`} stroke="#16A34A" strokeWidth="0.8" />
          <Ellipse cx={50 - r * 0.7} cy={cy0 - r * 1.05} rx="2" ry="3" fill="#F472B6" />
          <Path d={`M${50 - r * 0.7} ${cy0 - r * 1.2}`} stroke="#22C55E" strokeWidth="0.5" />
        </>
      )}
    </Svg>
  );
}

export function OpuntiaMascot({ stage, size }: MascotComponentProps) {
  // Prickly pear: flat green pads connected at narrow joints, with visible areoles
  function Paddle({
    cx,
    cy,
    w,
    h,
    rot = 0,
  }: {
    cx: number;
    cy: number;
    w: number;
    h: number;
    rot?: number;
  }) {
    return (
      <>
        {/* Pad shape - flatter oval, slightly wider at top */}
        <Path
          d={`M${cx} ${cy - h} Q${cx + w * 1.05} ${cy - h * 0.6} ${cx + w} ${cy} Q${cx + w * 0.85} ${cy + h * 0.85} ${cx} ${cy + h} Q${cx - w * 0.85} ${cy + h * 0.85} ${cx - w} ${cy} Q${cx - w * 1.05} ${cy - h * 0.6} ${cx} ${cy - h} Z`}
          fill="#22C55E"
          transform={`rotate(${rot} ${cx} ${cy})`}
        />
        {/* Edge darker outline */}
        <Path
          d={`M${cx} ${cy - h} Q${cx + w * 1.05} ${cy - h * 0.6} ${cx + w} ${cy} Q${cx + w * 0.85} ${cy + h * 0.85} ${cx} ${cy + h} Q${cx - w * 0.85} ${cy + h * 0.85} ${cx - w} ${cy} Q${cx - w * 1.05} ${cy - h * 0.6} ${cx} ${cy - h} Z`}
          fill="none"
          stroke="#15803D"
          strokeWidth="0.7"
          opacity="0.6"
          transform={`rotate(${rot} ${cx} ${cy})`}
        />
        {/* Glossy highlight - left side */}
        <Path
          d={`M${cx - w * 0.6} ${cy - h * 0.3} Q${cx - w * 0.4} ${cy + h * 0.2} ${cx - w * 0.5} ${cy + h * 0.55}`}
          stroke="#86EFAC"
          strokeWidth="2"
          fill="none"
          opacity="0.55"
          transform={`rotate(${rot} ${cx} ${cy})`}
          strokeLinecap="round"
        />
        {/* Areoles in diagonal grid - signature opuntia pattern */}
        {[
          [-0.5, -0.55], [0, -0.55], [0.5, -0.55],
          [-0.55, -0.15], [-0.05, -0.15], [0.45, -0.15],
          [-0.5, 0.25], [0, 0.25], [0.5, 0.25],
          [-0.45, 0.6], [0.05, 0.6], [0.55, 0.6],
        ].map(([dx, dy], i) => {
          const x = cx + dx * w;
          const y = cy + dy * h;
          return (
            <React.Fragment key={i}>
              {/* Yellow tuft (glochids) */}
              <Circle
                cx={x}
                cy={y}
                r="0.7"
                fill="#FEF3C7"
                transform={`rotate(${rot} ${cx} ${cy})`}
              />
              {/* White spine pair */}
              <Path
                d={`M${x - 0.7} ${y - 1.6} L${x + 0.7} ${y - 1.6} M${x} ${y - 1.7} L${x} ${y + 1.5}`}
                stroke="#FFFFFF"
                strokeWidth="0.45"
                transform={`rotate(${rot} ${cx} ${cy})`}
                opacity="0.95"
              />
            </React.Fragment>
          );
        })}
      </>
    );
  }
  return (
    <Svg width={size} height={size} viewBox={VB}>
      <StandardPot />

      {/* Bottom main paddle */}
      <Paddle cx={50} cy={74} w={11} h={13} rot={0} />

      {/* Side pads grow at angles */}
      {stage >= 2 && (
        <>
          <Path d="M40 64 L36 56" stroke="#15803D" strokeWidth="1.5" />
          <Paddle cx={36} cy={50} w={8} h={11} rot={-25} />
        </>
      )}
      {stage >= 3 && (
        <>
          <Path d="M60 64 L64 56" stroke="#15803D" strokeWidth="1.5" />
          <Paddle cx={64} cy={50} w={8} h={11} rot={28} />
        </>
      )}
      {stage >= 4 && (
        <>
          <Path d="M50 62 L48 50" stroke="#15803D" strokeWidth="1.5" />
          <Paddle cx={48} cy={36} w={8} h={11} rot={-5} />
          {/* Yellow flower bloom on top of upper pad */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 45);
            const rad = (angle * Math.PI) / 180;
            return (
              <Ellipse
                key={i}
                cx={56 + Math.cos(rad) * 3}
                cy={32 + Math.sin(rad) * 3}
                rx="2"
                ry="3"
                fill="#FBBF24"
                transform={`rotate(${angle + 90} 56 32)`}
              />
            );
          })}
          <Circle cx="56" cy="32" r="2" fill="#F59E0B" />
          <Circle cx="56" cy="32" r="0.8" fill="#FCD34D" />
        </>
      )}
      {stage === 5 && (
        <>
          <Paddle cx={32} cy={32} w={7} h={10} rot={-30} />
          <Paddle cx={68} cy={28} w={7} h={10} rot={25} />
          {/* Red/magenta prickly pear fruits perched on edges */}
          <Ellipse cx="42" cy="28" rx="3" ry="4" fill="#BE185D" />
          <Ellipse cx="42" cy="28" rx="1.2" ry="1.6" fill="#F472B6" opacity="0.55" />
          <Path d="M42 24 L42 22 M40 23 L41 22 M44 23 L43 22" stroke="#FFFFFF" strokeWidth="0.4" />
          <Ellipse cx="60" cy="22" rx="2.5" ry="3.5" fill="#9F1239" />
          <Path d="M60 19 L60 17" stroke="#FFFFFF" strokeWidth="0.4" />
        </>
      )}
    </Svg>
  );
}

export function CollierPerlesMascot({ stage, size }: MascotComponentProps) {
  // String of pearls: spherical bead-leaves with translucent windows on thin strings
  function Pearl({ cx, cy }: { cx: number; cy: number }) {
    return (
      <>
        {/* Main sphere with shading */}
        <Circle cx={cx} cy={cy} r="3" fill="#4ADE80" />
        <Circle cx={cx} cy={cy} r="2.7" fill="#86EFAC" />
        {/* Bottom shadow */}
        <Path
          d={`M${cx - 2.5} ${cy + 0.8} Q${cx} ${cy + 3.2} ${cx + 2.5} ${cy + 0.8} Q${cx} ${cy + 2.5} ${cx - 2.5} ${cy + 0.8} Z`}
          fill="#22C55E"
          opacity="0.6"
        />
        {/* Highlight - top left */}
        <Ellipse cx={cx - 0.8} cy={cy - 1} rx="0.9" ry="1.3" fill="#FFFFFF" opacity="0.7" />
        {/* Translucent window stripe - signature of senecio rowleyanus */}
        <Path
          d={`M${cx} ${cy - 2.3} Q${cx + 0.5} ${cy} ${cx} ${cy + 2.3}`}
          stroke="#16A34A"
          strokeWidth="0.5"
          fill="none"
          opacity="0.5"
        />
        {/* Tiny pointed tip where it attaches */}
        <Path
          d={`M${cx + 2.2} ${cy + 2.2} L${cx + 3} ${cy + 3}`}
          stroke="#16A34A"
          strokeWidth="0.6"
          strokeLinecap="round"
        />
      </>
    );
  }
  const strands = stage === 1 ? 1 : stage === 2 ? 2 : stage === 3 ? 3 : stage === 4 ? 4 : 5;
  const length = 16 + stage * 6;
  return (
    <Svg width={size} height={size} viewBox={VB}>
      <HangingPot />
      {Array.from({ length: strands }).map((_, s) => {
        const startX = 36 + (s * 28) / Math.max(1, strands - 1);
        const swayDir = s % 2 === 0 ? -1 : 1;
        const beadCount = Math.floor(length / 7);
        return (
          <React.Fragment key={s}>
            {/* Thin string */}
            <Path
              d={`M${startX} 90 Q${startX + swayDir * 1.5} ${90 + length * 0.4} ${startX + swayDir * 4} ${90 + length}`}
              stroke="#86EFAC"
              strokeWidth="0.6"
              fill="none"
            />
            {Array.from({ length: beadCount }).map((_, i) => {
              const t = (i + 1) / (beadCount + 0.5);
              const x = startX + swayDir * t * 4;
              const y = 90 + t * length;
              return <Pearl key={i} cx={x} cy={y} />;
            })}
          </React.Fragment>
        );
      })}
      {/* Cluster of pearls at the top of pot rim */}
      <Pearl cx={44} cy={80} />
      <Pearl cx={50} cy={78} />
      <Pearl cx={56} cy={80} />
      {stage >= 3 && <Pearl cx={42} cy={86} />}
      {stage >= 3 && <Pearl cx={58} cy={86} />}
      {/* Tiny white flowers - signature of mature string of pearls */}
      {stage === 5 &&
        [[42, 100], [58, 102], [50, 116]].map(([cx, cy], i) => (
          <React.Fragment key={`f${i}`}>
            <Circle cx={cx} cy={cy} r="1.8" fill="#FFFFFF" />
            {Array.from({ length: 6 }).map((_, j) => {
              const a = j * 60;
              const rad = (a * Math.PI) / 180;
              return (
                <Path
                  key={j}
                  d={`M${cx} ${cy} L${cx + Math.cos(rad) * 2.5} ${cy + Math.sin(rad) * 2.5}`}
                  stroke="#FBCFE8"
                  strokeWidth="0.4"
                />
              );
            })}
            <Circle cx={cx} cy={cy} r="0.6" fill="#F59E0B" />
          </React.Fragment>
        ))}
    </Svg>
  );
}

export function CollierCoeursMascot({ stage, size }: MascotComponentProps) {
  // Ceropegia woodii - heart leaves with silver marbling on dark green-purple
  function VariegatedHeart({ cx, cy, rot = 0, flipped = false }: { cx: number; cy: number; rot?: number; flipped?: boolean }) {
    const s = 3.5;
    const f = flipped ? -1 : 1;
    return (
      <>
        {/* Inverted heart - point at bottom, lobes at top (like real ceropegia) */}
        <Path
          d={`M${cx} ${cy + s * 0.9} L${cx - s * 0.9} ${cy} Q${cx - s} ${cy - s * 0.6} ${cx - s * 0.5} ${cy - s * 0.7} Q${cx} ${cy - s * 0.4} ${cx + s * 0.5} ${cy - s * 0.7} Q${cx + s} ${cy - s * 0.6} ${cx + s * 0.9} ${cy} Z`}
          fill="#1F2937"
          transform={`rotate(${rot} ${cx} ${cy}) scale(${f}, 1) translate(${flipped ? -2 * cx : 0}, 0)`}
        />
        {/* Silver marbling pattern */}
        <Path
          d={`M${cx - 0.5} ${cy - s * 0.4} Q${cx + 0.5} ${cy - s * 0.2} ${cx} ${cy + s * 0.3}`}
          stroke="#D1D5DB"
          strokeWidth="0.5"
          fill="none"
          transform={`rotate(${rot} ${cx} ${cy})`}
        />
        <Circle cx={cx - 1} cy={cy - 0.5} r="0.6" fill="#9CA3AF" opacity="0.8" />
        <Circle cx={cx + 0.8} cy={cy + 0.3} r="0.5" fill="#9CA3AF" opacity="0.8" />
        <Circle cx={cx} cy={cy - 1.5} r="0.4" fill="#D1D5DB" />
        {/* Pinkish edge tint */}
        <Path
          d={`M${cx - s * 0.9} ${cy} Q${cx - s} ${cy - s * 0.4} ${cx - s * 0.5} ${cy - s * 0.7}`}
          stroke="#9F1239"
          strokeWidth="0.4"
          fill="none"
          opacity="0.8"
          transform={`rotate(${rot} ${cx} ${cy})`}
        />
      </>
    );
  }
  const strands = stage === 1 ? 1 : stage === 2 ? 2 : stage === 3 ? 3 : stage === 4 ? 4 : 5;
  const length = 16 + stage * 6;
  return (
    <Svg width={size} height={size} viewBox={VB}>
      <HangingPot />
      {Array.from({ length: strands }).map((_, s) => {
        const startX = 38 + (s * 24) / Math.max(1, strands - 1);
        const swayDir = s % 2 === 0 ? -1 : 1;
        const heartCount = Math.floor(length / 6);
        return (
          <React.Fragment key={s}>
            {/* Delicate dark string */}
            <Path
              d={`M${startX} 90 Q${startX + swayDir * 1.5} ${90 + length * 0.4} ${startX + swayDir * 4} ${90 + length}`}
              stroke="#7C2D12"
              strokeWidth="0.5"
              fill="none"
            />
            {Array.from({ length: heartCount }).map((_, i) => {
              const t = (i + 0.7) / heartCount;
              const x = startX + swayDir * t * 4;
              const y = 90 + t * length;
              // Hearts alternate side along string, paired
              const sideX = x + (i % 2 === 0 ? -3.5 : 3.5);
              return (
                <React.Fragment key={i}>
                  {/* Tiny stem from string to heart */}
                  <Path
                    d={`M${x} ${y} L${sideX} ${y + 1.5}`}
                    stroke="#7C2D12"
                    strokeWidth="0.4"
                  />
                  <VariegatedHeart cx={sideX} cy={y + 4} flipped={i % 2 === 1} />
                </React.Fragment>
              );
            })}
          </React.Fragment>
        );
      })}
      {/* Top hearts on pot rim */}
      <VariegatedHeart cx={42} cy={80} />
      <VariegatedHeart cx={50} cy={78} />
      <VariegatedHeart cx={58} cy={80} flipped />
      {/* Tubular pink/purple flowers - signature ceropegia */}
      {stage >= 4 &&
        [[34, 96], [66, 100], [50, 110]].map(([cx, cy], i) => (
          <React.Fragment key={`f${i}`}>
            <Path
              d={`M${cx - 1.5} ${cy} Q${cx - 2} ${cy + 4} ${cx} ${cy + 5} Q${cx + 2} ${cy + 4} ${cx + 1.5} ${cy} Q${cx} ${cy - 1} ${cx - 1.5} ${cy} Z`}
              fill="#EC4899"
            />
            <Path d={`M${cx - 1.5} ${cy} L${cx - 0.5} ${cy - 2} M${cx + 1.5} ${cy} L${cx + 0.5} ${cy - 2} M${cx} ${cy - 1} L${cx} ${cy - 3}`} stroke="#9F1239" strokeWidth="0.5" />
          </React.Fragment>
        ))}
    </Svg>
  );
}

export function JoubarbeMascot({ stage, size }: MascotComponentProps) {
  // Tight rosette + small offset chicks around it
  function Rosette({ cx, cy, r, count }: { cx: number; cy: number; r: number; count: number }) {
    return (
      <>
        {Array.from({ length: count }).map((_, i) => {
          const angle = (i * 360) / count - 90;
          const rad = (angle * Math.PI) / 180;
          const tipX = cx + Math.cos(rad) * r;
          const tipY = cy + Math.sin(rad) * r;
          const perpX = -Math.sin(rad) * (r * 0.32);
          const perpY = Math.cos(rad) * (r * 0.32);
          return (
            <React.Fragment key={i}>
              <Path
                d={`M${cx - perpX} ${cy - perpY} Q${tipX} ${tipY} ${cx + perpX} ${cy + perpY} Z`}
                fill={i % 2 === 0 ? '#86EFAC' : '#4ADE80'}
              />
              <Circle cx={tipX} cy={tipY} r={r * 0.18} fill="#F87171" />
            </React.Fragment>
          );
        })}
        <Circle cx={cx} cy={cy} r={r * 0.18} fill="#16A34A" />
      </>
    );
  }
  return (
    <Svg width={size} height={size} viewBox={VB}>
      <StandardPot />
      <Rosette cx={50} cy={84} r={8 + stage * 2} count={stage === 1 ? 8 : stage === 2 ? 10 : stage === 3 ? 14 : stage === 4 ? 18 : 22} />
      {/* Chicks (offset baby plants) */}
      {stage >= 3 && <Rosette cx={32} cy={86} r={4} count={6} />}
      {stage >= 3 && <Rosette cx={68} cy={86} r={4} count={6} />}
      {stage >= 4 && <Rosette cx={40} cy={92} r={3} count={5} />}
      {stage >= 4 && <Rosette cx={60} cy={92} r={3} count={5} />}
      {stage === 5 && <Rosette cx={26} cy={90} r={2.5} count={5} />}
      {stage === 5 && <Rosette cx={74} cy={90} r={2.5} count={5} />}
    </Svg>
  );
}

export function AgaveMascot({ stage, size }: MascotComponentProps) {
  // Large dramatic rosette with sharp pointed leaves with reddish thorns
  const count = stage === 1 ? 6 : stage === 2 ? 8 : stage === 3 ? 11 : stage === 4 ? 14 : 18;
  const ry = 14 + stage * 5;
  return (
    <Svg width={size} height={size} viewBox={VB}>
      <Defs>
        <LinearGradient id="agaveLeaf" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#84CC16" />
          <Stop offset="1" stopColor="#4D7C0F" />
        </LinearGradient>
      </Defs>
      <StandardPot />
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i * 360) / count - 90;
        const rad = (angle * Math.PI) / 180;
        const tipX = 50 + Math.cos(rad) * ry;
        const tipY = 84 + Math.sin(rad) * ry;
        const baseX = 50;
        const baseY = 84;
        const perpX = -Math.sin(rad) * (ry * 0.18);
        const perpY = Math.cos(rad) * (ry * 0.18);
        return (
          <React.Fragment key={i}>
            <Path
              d={`M${baseX - perpX} ${baseY - perpY} Q${tipX + perpX * 0.3} ${tipY + perpY * 0.3} ${tipX} ${tipY} Q${tipX - perpX * 0.3} ${tipY - perpY * 0.3} ${baseX + perpX} ${baseY + perpY} Z`}
              fill={i % 2 === 0 ? 'url(#agaveLeaf)' : '#4D7C0F'}
            />
            {/* Central crease */}
            <Path
              d={`M${baseX} ${baseY} L${tipX} ${tipY}`}
              stroke="#365314"
              strokeWidth="0.4"
              opacity="0.5"
            />
            {/* Sharp red-brown thorns on edges */}
            {[0.4, 0.7].map((t, j) => {
              const px1 = baseX + (tipX - baseX) * t - perpX * (1 - t) * 0.7;
              const py1 = baseY + (tipY - baseY) * t - perpY * (1 - t) * 0.7;
              const px2 = baseX + (tipX - baseX) * t + perpX * (1 - t) * 0.7;
              const py2 = baseY + (tipY - baseY) * t + perpY * (1 - t) * 0.7;
              return (
                <React.Fragment key={j}>
                  <Path
                    d={`M${px1} ${py1} L${px1 - perpX * 0.15} ${py1 - perpY * 0.15}`}
                    stroke="#7C2D12"
                    strokeWidth="0.7"
                  />
                  <Path
                    d={`M${px2} ${py2} L${px2 + perpX * 0.15} ${py2 + perpY * 0.15}`}
                    stroke="#7C2D12"
                    strokeWidth="0.7"
                  />
                </React.Fragment>
              );
            })}
            {/* Sharp reddish tip */}
            <Circle cx={tipX} cy={tipY} r="1" fill="#7C2D12" />
          </React.Fragment>
        );
      })}
    </Svg>
  );
}

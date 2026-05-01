import React from 'react';
import Svg, { Circle, Defs, Ellipse, LinearGradient, Path, Rect, Stop } from 'react-native-svg';
import { GlassVase, HangingPot, MascotComponentProps, StandardPot } from './shared';

const VB = '0 0 100 120';

function MonsteraLeaf({
  cx,
  cy,
  s,
  rot = 0,
  fill = '#16A34A',
  darkSide = '#15803D',
}: {
  cx: number;
  cy: number;
  s: number;
  rot?: number;
  fill?: string;
  darkSide?: string;
}) {
  // Heart-shaped leaf with deep splits cut from the edges
  return (
    <>
      {/* Base heart leaf */}
      <Path
        d={`M${cx} ${cy + s * 1.1} C${cx - s * 1.2} ${cy + s * 0.6} ${cx - s * 1.4} ${cy - s * 0.6} ${cx} ${cy - s * 0.5} C${cx + s * 1.4} ${cy - s * 0.6} ${cx + s * 1.2} ${cy + s * 0.6} ${cx} ${cy + s * 1.1} Z`}
        fill={fill}
        transform={`rotate(${rot} ${cx} ${cy})`}
      />
      {/* Splits/fenestrations - cuts from the edge inward */}
      <Path
        d={`M${cx - s * 1.3} ${cy - s * 0.1} L${cx - s * 0.3} ${cy - s * 0.1} L${cx - s * 0.4} ${cy + s * 0.2} L${cx - s * 1.2} ${cy + s * 0.2} Z`}
        fill="#0F1A0F"
        transform={`rotate(${rot} ${cx} ${cy})`}
      />
      <Path
        d={`M${cx + s * 1.3} ${cy - s * 0.1} L${cx + s * 0.3} ${cy - s * 0.1} L${cx + s * 0.4} ${cy + s * 0.2} L${cx + s * 1.2} ${cy + s * 0.2} Z`}
        fill="#0F1A0F"
        transform={`rotate(${rot} ${cx} ${cy})`}
      />
      <Path
        d={`M${cx - s * 1.2} ${cy + s * 0.5} L${cx - s * 0.4} ${cy + s * 0.5} L${cx - s * 0.5} ${cy + s * 0.8} L${cx - s} ${cy + s * 0.8} Z`}
        fill="#0F1A0F"
        transform={`rotate(${rot} ${cx} ${cy})`}
      />
      <Path
        d={`M${cx + s * 1.2} ${cy + s * 0.5} L${cx + s * 0.4} ${cy + s * 0.5} L${cx + s * 0.5} ${cy + s * 0.8} L${cx + s} ${cy + s * 0.8} Z`}
        fill="#0F1A0F"
        transform={`rotate(${rot} ${cx} ${cy})`}
      />
      {/* Internal hole near midrib */}
      <Ellipse
        cx={cx - s * 0.3}
        cy={cy + s * 0.3}
        rx={s * 0.18}
        ry={s * 0.3}
        fill="#0F1A0F"
        transform={`rotate(${rot} ${cx} ${cy})`}
      />
      {/* Midrib */}
      <Path
        d={`M${cx} ${cy - s * 0.5} L${cx} ${cy + s * 1.05}`}
        stroke={darkSide}
        strokeWidth="0.6"
        opacity="0.7"
        transform={`rotate(${rot} ${cx} ${cy})`}
      />
    </>
  );
}

export function MonsteraDeliciosaMascot({ stage, size }: MascotComponentProps) {
  return (
    <Svg width={size} height={size} viewBox={VB}>
      <StandardPot />
      <Path d="M50 88 Q50 70 50 50" stroke="#15803D" strokeWidth="3" strokeLinecap="round" />
      {stage >= 2 && <Path d="M50 70 Q42 64 36 56" stroke="#15803D" strokeWidth="2.5" strokeLinecap="round" />}
      {stage >= 3 && <Path d="M50 60 Q60 54 64 44" stroke="#15803D" strokeWidth="2.5" strokeLinecap="round" />}
      {stage >= 4 && <Path d="M50 78 Q40 76 32 70" stroke="#15803D" strokeWidth="2" strokeLinecap="round" />}

      {stage === 1 && <MonsteraLeaf cx={50} cy={60} s={9} />}
      {stage === 2 && (
        <>
          <MonsteraLeaf cx={50} cy={50} s={11} />
          <MonsteraLeaf cx={36} cy={64} s={7} rot={-30} />
        </>
      )}
      {stage === 3 && (
        <>
          <MonsteraLeaf cx={50} cy={42} s={13} />
          <MonsteraLeaf cx={32} cy={58} s={9} rot={-35} />
          <MonsteraLeaf cx={68} cy={50} s={9} rot={30} />
        </>
      )}
      {stage === 4 && (
        <>
          <MonsteraLeaf cx={50} cy={36} s={15} />
          <MonsteraLeaf cx={26} cy={54} s={11} rot={-40} />
          <MonsteraLeaf cx={74} cy={46} s={11} rot={40} />
          <MonsteraLeaf cx={36} cy={70} s={8} rot={-15} />
        </>
      )}
      {stage === 5 && (
        <>
          <MonsteraLeaf cx={50} cy={32} s={17} />
          <MonsteraLeaf cx={22} cy={48} s={12} rot={-45} />
          <MonsteraLeaf cx={78} cy={42} s={12} rot={45} />
          <MonsteraLeaf cx={32} cy={70} s={9} rot={-25} />
          <MonsteraLeaf cx={68} cy={72} s={9} rot={25} />
        </>
      )}
    </Svg>
  );
}

export function MonsteraAdansoniiMascot({ stage, size }: MascotComponentProps) {
  // Smaller leaves with prominent OVAL holes (Swiss cheese plant)
  function CheeseLeaf({
    cx,
    cy,
    s,
    rot = 0,
  }: {
    cx: number;
    cy: number;
    s: number;
    rot?: number;
  }) {
    return (
      <>
        <Path
          d={`M${cx} ${cy + s * 0.9} C${cx - s} ${cy + s * 0.4} ${cx - s * 1.1} ${cy - s * 0.4} ${cx} ${cy - s * 0.5} C${cx + s * 1.1} ${cy - s * 0.4} ${cx + s} ${cy + s * 0.4} ${cx} ${cy + s * 0.9} Z`}
          fill="#22C55E"
          transform={`rotate(${rot} ${cx} ${cy})`}
        />
        {/* Multiple oval holes inside */}
        <Ellipse cx={cx - s * 0.4} cy={cy - s * 0.05} rx={s * 0.18} ry={s * 0.28} fill="#0F1A0F" transform={`rotate(${rot} ${cx} ${cy})`} />
        <Ellipse cx={cx + s * 0.4} cy={cy - s * 0.05} rx={s * 0.18} ry={s * 0.28} fill="#0F1A0F" transform={`rotate(${rot} ${cx} ${cy})`} />
        <Ellipse cx={cx - s * 0.3} cy={cy + s * 0.45} rx={s * 0.14} ry={s * 0.22} fill="#0F1A0F" transform={`rotate(${rot} ${cx} ${cy})`} />
        <Ellipse cx={cx + s * 0.3} cy={cy + s * 0.45} rx={s * 0.14} ry={s * 0.22} fill="#0F1A0F" transform={`rotate(${rot} ${cx} ${cy})`} />
        <Path
          d={`M${cx} ${cy - s * 0.5} L${cx} ${cy + s * 0.85}`}
          stroke="#15803D"
          strokeWidth="0.5"
          transform={`rotate(${rot} ${cx} ${cy})`}
        />
      </>
    );
  }
  return (
    <Svg width={size} height={size} viewBox={VB}>
      <StandardPot />
      {/* Climbing/trailing pole */}
      <Path d="M50 88 L50 18" stroke="#7C5036" strokeWidth="2.5" strokeLinecap="round" />
      <Path d="M48 88 L48 18 M52 88 L52 18" stroke="#A0714F" strokeWidth="0.4" opacity="0.5" />
      {stage >= 1 && <CheeseLeaf cx={36} cy={76} s={7} rot={-25} />}
      {stage >= 2 && <CheeseLeaf cx={64} cy={68} s={7.5} rot={30} />}
      {stage >= 3 && <CheeseLeaf cx={32} cy={56} s={8} rot={-30} />}
      {stage >= 4 && <CheeseLeaf cx={68} cy={46} s={8.5} rot={35} />}
      {stage >= 5 && (
        <>
          <CheeseLeaf cx={32} cy={36} s={9} rot={-25} />
          <CheeseLeaf cx={68} cy={26} s={9} rot={25} />
        </>
      )}
    </Svg>
  );
}

function HeartLeaf({ cx, cy, s, fill, rot = 0 }: { cx: number; cy: number; s: number; fill: string; rot?: number }) {
  return (
    <Path
      d={`M${cx} ${cy + s * 0.7} C${cx - s * 1.1} ${cy + s * 0.1} ${cx - s * 0.9} ${cy - s * 0.7} ${cx} ${cy - s * 0.2} C${cx + s * 0.9} ${cy - s * 0.7} ${cx + s * 1.1} ${cy + s * 0.1} ${cx} ${cy + s * 0.7} Z`}
      fill={fill}
      transform={`rotate(${rot} ${cx} ${cy})`}
    />
  );
}

export function PothosMascot({ stage, size }: MascotComponentProps) {
  // Trailing variegated heart leaves from HANGING POT
  const leafConfig: Array<[number, number, number]> = [
    [38, 95, -20],
    [62, 95, 20],
    [30, 102, -35],
    [70, 102, 35],
    [22, 108, -45],
    [78, 108, 45],
    [32, 114, -30],
    [68, 114, 30],
    [44, 96, -10],
    [56, 96, 10],
    [42, 110, -15],
    [58, 110, 15],
  ];
  const limit = stage * 2;
  return (
    <Svg width={size} height={size} viewBox={VB}>
      <HangingPot />
      {/* Vines flowing down */}
      <Path d="M40 86 Q34 96 28 110" stroke="#16A34A" strokeWidth="1" fill="none" />
      <Path d="M60 86 Q66 96 72 110" stroke="#16A34A" strokeWidth="1" fill="none" />
      <Path d="M50 86 Q48 100 50 116" stroke="#16A34A" strokeWidth="0.8" fill="none" opacity="0.7" />

      {leafConfig.slice(0, limit).map(([cx, cy, rot], i) => (
        <React.Fragment key={i}>
          <HeartLeaf cx={cx} cy={cy} s={5} fill="#22C55E" rot={rot} />
          {/* Yellow-green variegation streaks */}
          <Path
            d={`M${cx - 2} ${cy} Q${cx + 1} ${cy + 2} ${cx + 3} ${cy - 1}`}
            stroke="#FDE047"
            strokeWidth="1.5"
            fill="none"
            transform={`rotate(${rot} ${cx} ${cy})`}
            strokeLinecap="round"
            opacity="0.9"
          />
          <Circle cx={cx + 1.5} cy={cy + 1} r="0.8" fill="#FACC15" transform={`rotate(${rot} ${cx} ${cy})`} />
        </React.Fragment>
      ))}
      {/* Top tuft */}
      <HeartLeaf cx={46} cy={80} s={4} fill="#22C55E" />
      <HeartLeaf cx={54} cy={80} s={4} fill="#16A34A" />
    </Svg>
  );
}

export function PhilodendronMascot({ stage, size }: MascotComponentProps) {
  const leaves: Array<[number, number, number, number]> = [
    [50, 70, 0, 8],
    [36, 60, -30, 9],
    [64, 60, 30, 9],
    [30, 44, -45, 10],
    [70, 44, 45, 10],
    [38, 28, -20, 11],
    [62, 28, 20, 11],
    [50, 18, 0, 12],
  ];
  return (
    <Svg width={size} height={size} viewBox={VB}>
      <Defs>
        <LinearGradient id="philoLeaf" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#15803D" />
          <Stop offset="1" stopColor="#166534" />
        </LinearGradient>
      </Defs>
      <StandardPot />
      <Path d="M50 88 Q50 60 50 36" stroke="#15803D" strokeWidth="2.5" strokeLinecap="round" />
      {leaves.slice(0, stage * 2).map(([cx, cy, rot, s], i) => (
        <React.Fragment key={i}>
          <HeartLeaf cx={cx} cy={cy} s={s} fill="url(#philoLeaf)" rot={rot} />
          {/* Veins radiating from base */}
          <Path
            d={`M${cx} ${cy - s * 0.2} L${cx} ${cy + s * 0.65} M${cx} ${cy + s * 0.1} L${cx - s * 0.5} ${cy + s * 0.3} M${cx} ${cy + s * 0.1} L${cx + s * 0.5} ${cy + s * 0.3}`}
            stroke="#86EFAC"
            strokeWidth="0.5"
            opacity="0.55"
            transform={`rotate(${rot} ${cx} ${cy})`}
          />
          {/* Petiole stem */}
          <Path
            d={`M${cx} ${cy + s * 0.7} L50 ${88 - i * 2}`}
            stroke="#15803D"
            strokeWidth="0.7"
            opacity="0.6"
          />
        </React.Fragment>
      ))}
    </Svg>
  );
}

export function PinkPrincessMascot({ stage, size }: MascotComponentProps) {
  const leaves: Array<[number, number, number]> = [
    [50, 72, 0],
    [36, 60, -30],
    [64, 60, 30],
    [30, 44, -45],
    [70, 44, 45],
    [40, 28, -15],
    [60, 28, 15],
  ];
  return (
    <Svg width={size} height={size} viewBox={VB}>
      <StandardPot />
      <Path d="M50 88 Q50 68 50 46" stroke="#15803D" strokeWidth="2.5" strokeLinecap="round" />
      {leaves.slice(0, stage * 2).map(([cx, cy, rot], i) => (
        <React.Fragment key={i}>
          <HeartLeaf cx={cx} cy={cy} s={9} fill="#1A2E1A" rot={rot} />
          {/* Pink variegation patches - signature pink princess */}
          <Path
            d={`M${cx - 4} ${cy + 1} Q${cx - 2} ${cy - 3} ${cx + 1} ${cy - 1} Q${cx + 4} ${cy + 2} ${cx + 2} ${cy + 4}`}
            fill="#EC4899"
            transform={`rotate(${rot} ${cx} ${cy})`}
            opacity="0.95"
          />
          <Path
            d={`M${cx - 1} ${cy + 3} Q${cx + 2} ${cy + 1} ${cx + 3} ${cy + 4}`}
            fill="#F9A8D4"
            transform={`rotate(${rot} ${cx} ${cy})`}
          />
          <Circle cx={cx - 2} cy={cy + 2} r="1.2" fill="#FBCFE8" transform={`rotate(${rot} ${cx} ${cy})`} />
          {/* Veins */}
          <Path
            d={`M${cx} ${cy - 1.8} L${cx} ${cy + 5}`}
            stroke="#86EFAC"
            strokeWidth="0.4"
            opacity="0.6"
            transform={`rotate(${rot} ${cx} ${cy})`}
          />
        </React.Fragment>
      ))}
    </Svg>
  );
}

export function OiseauParadisMascot({ stage, size }: MascotComponentProps) {
  // Strelitzia: large paddle leaves + iconic bird-of-paradise flower
  const paddleY: Array<[number, number, number]> = [
    [40, 70, -10],
    [60, 70, 10],
    [32, 54, -22],
    [68, 54, 22],
    [36, 38, -15],
    [64, 38, 15],
    [50, 24, 0],
  ];
  return (
    <Svg width={size} height={size} viewBox={VB}>
      <Defs>
        <LinearGradient id="strelitziaLeaf" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor="#16A34A" />
          <Stop offset="1" stopColor="#0F766E" />
        </LinearGradient>
      </Defs>
      <StandardPot />
      {paddleY.slice(0, stage + 2).map(([cx, cy, rot], i) => (
        <React.Fragment key={i}>
          {/* Long stem */}
          <Path
            d={`M50 88 L${cx} ${cy + 12}`}
            stroke="#15803D"
            strokeWidth="1.5"
          />
          {/* Big paddle leaf */}
          <Path
            d={`M${cx} ${cy + 12} L${cx - 1} ${cy + 8} Q${cx - 9} ${cy} ${cx - 9} ${cy - 14} L${cx + 9} ${cy - 14} Q${cx + 9} ${cy} ${cx + 1} ${cy + 8} Z`}
            fill="url(#strelitziaLeaf)"
            transform={`rotate(${rot} ${cx} ${cy})`}
          />
          {/* Central vein */}
          <Path
            d={`M${cx} ${cy - 14} L${cx} ${cy + 12}`}
            stroke="#15803D"
            strokeWidth="1"
            transform={`rotate(${rot} ${cx} ${cy})`}
            opacity="0.8"
          />
          {/* Side veins */}
          {[-10, -6, -2, 2, 6, 10].map((dy, j) => (
            <React.Fragment key={j}>
              <Path
                d={`M${cx} ${cy + dy} L${cx - 7} ${cy + dy + 1}`}
                stroke="#15803D"
                strokeWidth="0.4"
                opacity="0.5"
                transform={`rotate(${rot} ${cx} ${cy})`}
              />
              <Path
                d={`M${cx} ${cy + dy} L${cx + 7} ${cy + dy + 1}`}
                stroke="#15803D"
                strokeWidth="0.4"
                opacity="0.5"
                transform={`rotate(${rot} ${cx} ${cy})`}
              />
            </React.Fragment>
          ))}
        </React.Fragment>
      ))}
      {/* Bird of paradise flower */}
      {stage >= 4 && (
        <>
          {/* Long beak-like green spathe */}
          <Path d="M22 36 L48 32 L46 36 L24 40 Z" fill="#15803D" />
          <Path d="M48 32 L46 36" stroke="#0F766E" strokeWidth="0.6" />
          {/* Orange "feathers" emerging */}
          <Path d="M28 32 L18 24 L24 28 L14 22 L22 30 Z" fill="#F97316" />
          <Path d="M30 30 L20 22 L26 26 Z" fill="#FB923C" />
          <Path d="M32 28 L24 18 L28 24 Z" fill="#EA580C" />
          {/* Blue arrow tongue */}
          <Path d="M30 36 L18 32 L24 36 L16 34 Z" fill="#1D4ED8" />
          <Path d="M28 38 L22 38 L25 40 Z" fill="#1E40AF" />
        </>
      )}
      {stage === 5 && (
        <>
          {/* Second flower */}
          <Path d="M76 24 L60 28 L62 24 L74 20 Z" fill="#15803D" />
          <Path d="M68 22 L78 14 L72 18 L82 12 Z" fill="#F97316" />
          <Path d="M68 26 L80 22 L74 26 Z" fill="#1D4ED8" />
        </>
      )}
    </Svg>
  );
}

export function CalatheaOrbifoliaMascot({ stage, size }: MascotComponentProps) {
  const leafPositions: Array<[number, number, number]> = [
    [50, 72, 0],
    [38, 60, -25],
    [62, 60, 25],
    [32, 44, -40],
    [68, 44, 40],
    [42, 28, -15],
    [58, 28, 15],
  ];
  return (
    <Svg width={size} height={size} viewBox={VB}>
      <StandardPot />
      <Path d="M50 88 Q50 70 50 50" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" />
      {leafPositions.slice(0, stage * 2).map(([cx, cy, rot], i) => (
        <React.Fragment key={i}>
          {/* Stem */}
          <Path d={`M${cx} ${cy + 11} L50 88`} stroke="#16A34A" strokeWidth="0.8" opacity="0.6" />
          {/* Round dark green leaf */}
          <Ellipse cx={cx} cy={cy} rx="10" ry="11" fill="#166534" transform={`rotate(${rot} ${cx} ${cy})`} />
          {/* Silver herringbone stripes - signature orbifolia */}
          {[-8, -5, -2, 1, 4, 7].map((dy, j) => (
            <Path
              key={j}
              d={`M${cx - 9} ${cy + dy} Q${cx} ${cy + dy - 1} ${cx + 9} ${cy + dy}`}
              stroke="#A7F3D0"
              strokeWidth="1.4"
              fill="none"
              transform={`rotate(${rot} ${cx} ${cy})`}
            />
          ))}
          {/* Central vein darker */}
          <Path
            d={`M${cx} ${cy - 11} L${cx} ${cy + 11}`}
            stroke="#15803D"
            strokeWidth="1"
            transform={`rotate(${rot} ${cx} ${cy})`}
          />
        </React.Fragment>
      ))}
    </Svg>
  );
}

export function CalatheaMedallionMascot({ stage, size }: MascotComponentProps) {
  const positions: Array<[number, number, number]> = [
    [50, 70, 0],
    [36, 58, -30],
    [64, 58, 30],
    [30, 42, -45],
    [70, 42, 45],
    [42, 26, -15],
    [58, 26, 15],
  ];
  return (
    <Svg width={size} height={size} viewBox={VB}>
      <StandardPot />
      <Path d="M50 88 Q50 70 50 50" stroke="#7C2D12" strokeWidth="2" strokeLinecap="round" />
      {positions.slice(0, stage * 2).map(([cx, cy, rot], i) => (
        <React.Fragment key={i}>
          {/* Purple underside showing through */}
          <Ellipse cx={cx + 1} cy={cy + 1} rx="7.5" ry="11.5" fill="#7C2D12" transform={`rotate(${rot} ${cx} ${cy})`} opacity="0.6" />
          {/* Main green leaf */}
          <Ellipse cx={cx} cy={cy} rx="7" ry="11" fill="#22C55E" transform={`rotate(${rot} ${cx} ${cy})`} />
          {/* Fishbone / feather pattern */}
          {[-7, -3, 1, 5].map((dy, j) => (
            <React.Fragment key={j}>
              <Path
                d={`M${cx} ${cy + dy} Q${cx - 3} ${cy + dy - 1} ${cx - 5} ${cy + dy - 2.5}`}
                stroke="#15803D"
                strokeWidth="1.2"
                fill="none"
                transform={`rotate(${rot} ${cx} ${cy})`}
                strokeLinecap="round"
              />
              <Path
                d={`M${cx} ${cy + dy} Q${cx + 3} ${cy + dy - 1} ${cx + 5} ${cy + dy - 2.5}`}
                stroke="#15803D"
                strokeWidth="1.2"
                fill="none"
                transform={`rotate(${rot} ${cx} ${cy})`}
                strokeLinecap="round"
              />
            </React.Fragment>
          ))}
          {/* Central vein */}
          <Path
            d={`M${cx} ${cy - 10} L${cx} ${cy + 10}`}
            stroke="#15803D"
            strokeWidth="0.7"
            transform={`rotate(${rot} ${cx} ${cy})`}
          />
        </React.Fragment>
      ))}
    </Svg>
  );
}

function ArrowLeaf({ cx, cy, s, fill, rot = 0, veins }: { cx: number; cy: number; s: number; fill: string; rot?: number; veins?: string }) {
  return (
    <>
      <Path
        d={`M${cx} ${cy - s} L${cx - s * 0.6} ${cy} L${cx - s * 0.4} ${cy + s * 0.4} L${cx} ${cy + s} L${cx + s * 0.4} ${cy + s * 0.4} L${cx + s * 0.6} ${cy} Z`}
        fill={fill}
        transform={`rotate(${rot} ${cx} ${cy})`}
      />
      {veins && (
        <Path
          d={`M${cx} ${cy - s} L${cx} ${cy + s} M${cx} ${cy} L${cx - s * 0.5} ${cy + s * 0.3} M${cx} ${cy} L${cx + s * 0.5} ${cy + s * 0.3} M${cx} ${cy - s * 0.4} L${cx - s * 0.4} ${cy - s * 0.1} M${cx} ${cy - s * 0.4} L${cx + s * 0.4} ${cy - s * 0.1}`}
          stroke={veins}
          strokeWidth="0.7"
          transform={`rotate(${rot} ${cx} ${cy})`}
        />
      )}
    </>
  );
}

export function AlocasiaZebrinaMascot({ stage, size }: MascotComponentProps) {
  const positions: Array<[number, number, number]> = [
    [50, 64, 0],
    [38, 50, -20],
    [62, 50, 20],
    [44, 32, -10],
    [56, 32, 10],
    [50, 18, 0],
  ];
  return (
    <Svg width={size} height={size} viewBox={VB}>
      <StandardPot />
      {/* Zebra-striped stems - the signature feature */}
      {positions.slice(0, stage + 1).map(([cx, cy], i) => (
        <React.Fragment key={`s${i}`}>
          {/* Cream-colored stem */}
          <Path
            d={`M50 88 L${cx} ${cy + 8}`}
            stroke="#FEF3C7"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Dark zebra stripes */}
          {[0.1, 0.25, 0.4, 0.55, 0.7, 0.85].map((t, j) => {
            const x = 50 + (cx - 50) * t;
            const y = 88 + (cy + 8 - 88) * t;
            const angle = Math.atan2(cy + 8 - 88, cx - 50);
            const perpX = -Math.sin(angle) * 3;
            const perpY = Math.cos(angle) * 3;
            return (
              <Path
                key={j}
                d={`M${x - perpX} ${y - perpY} L${x + perpX} ${y + perpY}`}
                stroke="#3D2914"
                strokeWidth="1.4"
              />
            );
          })}
        </React.Fragment>
      ))}
      {/* Arrow leaves */}
      {positions.slice(0, stage + 1).map(([cx, cy, rot], i) => (
        <ArrowLeaf key={i} cx={cx} cy={cy} s={9} fill="#15803D" rot={rot} veins="#86EFAC" />
      ))}
    </Svg>
  );
}

export function AlocasiaPollyMascot({ stage, size }: MascotComponentProps) {
  const positions: Array<[number, number, number]> = [
    [50, 60, 0],
    [36, 48, -25],
    [64, 48, 25],
    [42, 30, -10],
    [58, 30, 10],
  ];
  return (
    <Svg width={size} height={size} viewBox={VB}>
      <StandardPot />
      {positions.slice(0, stage + 1).map(([cx, cy], i) => (
        <Path key={`s${i}`} d={`M50 88 Q${(50 + cx) / 2} ${(88 + cy) / 2 + 4} ${cx} ${cy + 8}`} stroke="#15803D" strokeWidth="1.6" fill="none" />
      ))}
      {positions.slice(0, stage + 1).map(([cx, cy, rot], i) => (
        <React.Fragment key={i}>
          <ArrowLeaf cx={cx} cy={cy} s={10} fill="#0F1A0F" rot={rot} />
          {/* Bright white veins - signature polly */}
          <Path
            d={`M${cx} ${cy - 9} L${cx} ${cy + 9} M${cx} ${cy - 4} L${cx - 5} ${cy - 1} M${cx} ${cy - 4} L${cx + 5} ${cy - 1} M${cx} ${cy + 1} L${cx - 5} ${cy + 4} M${cx} ${cy + 1} L${cx + 5} ${cy + 4}`}
            stroke="#FFFFFF"
            strokeWidth="1.1"
            transform={`rotate(${rot} ${cx} ${cy})`}
          />
        </React.Fragment>
      ))}
    </Svg>
  );
}

export function FicusLyrataMascot({ stage, size }: MascotComponentProps) {
  function FiddleLeaf({ cx, cy, s, rot = 0 }: { cx: number; cy: number; s: number; rot?: number }) {
    return (
      <>
        {/* Fiddle/violin shape - narrow at top, wider at bottom */}
        <Path
          d={`M${cx} ${cy - s} Q${cx + s * 0.5} ${cy - s * 0.7} ${cx + s * 0.45} ${cy - s * 0.3} Q${cx + s * 0.3} ${cy - s * 0.05} ${cx + s * 0.65} ${cy + s * 0.2} Q${cx + s * 0.85} ${cy + s * 0.5} ${cx + s * 0.5} ${cy + s * 0.85} Q${cx} ${cy + s * 1.05} ${cx - s * 0.5} ${cy + s * 0.85} Q${cx - s * 0.85} ${cy + s * 0.5} ${cx - s * 0.65} ${cy + s * 0.2} Q${cx - s * 0.3} ${cy - s * 0.05} ${cx - s * 0.45} ${cy - s * 0.3} Q${cx - s * 0.5} ${cy - s * 0.7} ${cx} ${cy - s} Z`}
          fill="#16A34A"
          transform={`rotate(${rot} ${cx} ${cy})`}
        />
        {/* Pale veins */}
        <Path
          d={`M${cx} ${cy - s} L${cx} ${cy + s} M${cx} ${cy - s * 0.4} L${cx - s * 0.5} ${cy - s * 0.1} M${cx} ${cy - s * 0.4} L${cx + s * 0.5} ${cy - s * 0.1} M${cx} ${cy + s * 0.2} L${cx - s * 0.6} ${cy + s * 0.5} M${cx} ${cy + s * 0.2} L${cx + s * 0.6} ${cy + s * 0.5}`}
          stroke="#86EFAC"
          strokeWidth="0.5"
          opacity="0.7"
          transform={`rotate(${rot} ${cx} ${cy})`}
        />
      </>
    );
  }
  const positions: Array<[number, number, number, number]> = [
    [44, 70, -10, 8],
    [56, 64, 10, 9],
    [38, 50, -25, 10],
    [62, 44, 25, 11],
    [44, 28, -10, 12],
    [56, 24, 10, 12],
  ];
  return (
    <Svg width={size} height={size} viewBox={VB}>
      <StandardPot />
      {/* Trunk */}
      <Path d="M50 88 Q50 60 50 28" stroke="#7C5036" strokeWidth="3" strokeLinecap="round" />
      {positions.slice(0, stage + 1).map(([cx, cy, rot, s], i) => (
        <FiddleLeaf key={i} cx={cx} cy={cy} s={s} rot={rot} />
      ))}
    </Svg>
  );
}

export function HoyaKerriiMascot({ stage, size }: MascotComponentProps) {
  return (
    <Svg width={size} height={size} viewBox={VB}>
      <Defs>
        <LinearGradient id="hoyaHeart" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#86EFAC" />
          <Stop offset="0.5" stopColor="#22C55E" />
          <Stop offset="1" stopColor="#15803D" />
        </LinearGradient>
      </Defs>
      <StandardPot />
      {/* The single iconic heart leaf */}
      <Path d="M50 88 L50 70" stroke="#7C5036" strokeWidth="2" strokeLinecap="round" />
      {(() => {
        const s = 18 + stage * 4;
        const cx = 50;
        const cy = 50;
        return (
          <>
            <Path
              d={`M${cx} ${cy + s * 0.7} C${cx - s * 1.2} ${cy + s * 0.1} ${cx - s * 1.1} ${cy - s * 0.7} ${cx} ${cy - s * 0.2} C${cx + s * 1.1} ${cy - s * 0.7} ${cx + s * 1.2} ${cy + s * 0.1} ${cx} ${cy + s * 0.7} Z`}
              fill="url(#hoyaHeart)"
            />
            {/* Highlight to give the leaf depth */}
            <Path
              d={`M${cx - s * 0.3} ${cy - s * 0.2} C${cx - s * 0.6} ${cy - s * 0.4} ${cx - s * 0.4} ${cy} ${cx - s * 0.2} ${cy + s * 0.1} Z`}
              fill="#FFFFFF"
              opacity="0.2"
            />
            {/* Central vein */}
            <Path
              d={`M${cx} ${cy - s * 0.2} L${cx} ${cy + s * 0.6}`}
              stroke="#15803D"
              strokeWidth="0.8"
              opacity="0.6"
            />
            <Path
              d={`M${cx} ${cy + s * 0.1} L${cx - s * 0.5} ${cy + s * 0.4} M${cx} ${cy + s * 0.1} L${cx + s * 0.5} ${cy + s * 0.4}`}
              stroke="#15803D"
              strokeWidth="0.5"
              opacity="0.5"
            />
          </>
        );
      })()}
      {/* Second smaller heart at later stages */}
      {stage >= 4 && (
        <Path
          d={`M30 76 C20 70 22 64 30 66 C38 64 40 70 30 76 Z`}
          fill="#22C55E"
        />
      )}
      {stage === 5 && (
        <Path
          d={`M70 78 C60 72 62 66 70 68 C78 66 80 72 70 78 Z`}
          fill="#22C55E"
        />
      )}
    </Svg>
  );
}

export function HoyaCarnosaMascot({ stage, size }: MascotComponentProps) {
  // HANGING POT with cascading waxy leaves and star flower clusters
  const leaves: Array<[number, number, number]> = [
    [38, 92, -20],
    [62, 92, 20],
    [30, 100, -35],
    [70, 100, 35],
    [26, 108, -45],
    [74, 108, 45],
    [44, 96, -10],
    [56, 96, 10],
  ];
  return (
    <Svg width={size} height={size} viewBox={VB}>
      <HangingPot />
      {/* Trailing vines */}
      <Path d="M40 86 Q34 96 26 110" stroke="#16A34A" strokeWidth="1" fill="none" />
      <Path d="M60 86 Q66 96 74 110" stroke="#16A34A" strokeWidth="1" fill="none" />

      {leaves.slice(0, stage * 2).map(([cx, cy, rot], i) => (
        <React.Fragment key={i}>
          <Ellipse cx={cx} cy={cy} rx="5" ry="4" fill="#16A34A" transform={`rotate(${rot} ${cx} ${cy})`} />
          {/* Waxy highlight */}
          <Ellipse cx={cx - 1.5} cy={cy - 0.8} rx="1.5" ry="1.2" fill="#FFFFFF" opacity="0.35" transform={`rotate(${rot} ${cx} ${cy})`} />
        </React.Fragment>
      ))}

      {/* Star flower clusters - signature feature */}
      {stage >= 3 &&
        [[35, 100], [65, 100], [50, 78]].slice(0, stage - 1).map(([cx, cy], i) => (
          <React.Fragment key={`f${i}`}>
            {/* Cluster of small star flowers */}
            {[
              [-3, -3],
              [3, -3],
              [-3, 3],
              [3, 3],
              [0, 0],
            ].map(([dx, dy], j) => {
              const fx = cx + dx;
              const fy = cy + dy;
              return (
                <React.Fragment key={j}>
                  {[0, 72, 144, 216, 288].map((angle, k) => {
                    const rad = (angle * Math.PI) / 180;
                    return (
                      <Ellipse
                        key={k}
                        cx={fx + Math.cos(rad) * 1.4}
                        cy={fy + Math.sin(rad) * 1.4}
                        rx="0.8"
                        ry="1.1"
                        fill="#FDF2F8"
                        transform={`rotate(${angle} ${fx} ${fy})`}
                      />
                    );
                  })}
                  <Circle cx={fx} cy={fy} r="0.7" fill="#EC4899" />
                </React.Fragment>
              );
            })}
          </React.Fragment>
        ))}
      {/* Top tuft */}
      <Ellipse cx="46" cy="80" rx="4" ry="3" fill="#16A34A" />
      <Ellipse cx="54" cy="80" rx="4" ry="3" fill="#22C55E" />
    </Svg>
  );
}

export function PileaMascot({ stage, size }: MascotComponentProps) {
  const discs: Array<[number, number, number]> = [
    [50, 70, 6],
    [38, 60, 5],
    [62, 60, 5],
    [42, 46, 6],
    [58, 46, 6],
    [50, 32, 7],
    [34, 38, 5],
    [66, 38, 5],
  ];
  return (
    <Svg width={size} height={size} viewBox={VB}>
      <StandardPot />
      {discs.slice(0, stage * 2).map(([cx, cy, r], i) => (
        <React.Fragment key={i}>
          {/* Petiole stem connecting from base */}
          <Path d={`M50 88 Q${(50 + cx) / 2 + (i % 2 === 0 ? -2 : 2)} ${(88 + cy) / 2} ${cx} ${cy}`} stroke="#16A34A" strokeWidth="1" fill="none" />
          {/* Round disc leaf */}
          <Circle cx={cx} cy={cy} r={r} fill="#22C55E" />
          <Circle cx={cx} cy={cy} r={r * 0.7} fill="#16A34A" opacity="0.4" />
          {/* Central spot where stem attaches (UFO plant feature) */}
          <Circle cx={cx} cy={cy} r={r * 0.25} fill="#15803D" />
          <Circle cx={cx} cy={cy} r={r * 0.1} fill="#FDE68A" />
          {/* Glossy highlight */}
          <Ellipse cx={cx - r * 0.4} cy={cy - r * 0.4} rx={r * 0.25} ry={r * 0.15} fill="#FFFFFF" opacity="0.4" />
        </React.Fragment>
      ))}
    </Svg>
  );
}

export function BegoniaRexMascot({ stage, size }: MascotComponentProps) {
  function SpiralLeaf({ cx, cy, s, rot = 0 }: { cx: number; cy: number; s: number; rot?: number }) {
    return (
      <>
        {/* Asymmetric heart-ish begonia leaf */}
        <Path
          d={`M${cx + s * 0.2} ${cy - s} Q${cx + s * 1.1} ${cy - s * 0.3} ${cx + s * 0.9} ${cy + s * 0.4} Q${cx} ${cy + s * 1.1} ${cx - s * 0.9} ${cy + s * 0.4} Q${cx - s * 1.1} ${cy - s * 0.3} ${cx - s * 0.2} ${cy - s} Z`}
          fill="#581C87"
          transform={`rotate(${rot} ${cx} ${cy})`}
        />
        {/* Silver spiral pattern */}
        <Path
          d={`M${cx} ${cy} m0,-${s * 0.55} a${s * 0.55},${s * 0.55} 0 1 1 0,${s * 1.1} a${s * 0.32},${s * 0.32} 0 1 0 0,-${s * 0.65} a${s * 0.18},${s * 0.18} 0 1 1 0,${s * 0.36}`}
          stroke="#A7F3D0"
          strokeWidth="1.5"
          fill="none"
          transform={`rotate(${rot} ${cx} ${cy})`}
        />
        {/* Pink veins */}
        <Path
          d={`M${cx} ${cy - s * 0.9} L${cx} ${cy + s} M${cx} ${cy} L${cx - s * 0.7} ${cy + s * 0.3} M${cx} ${cy} L${cx + s * 0.7} ${cy + s * 0.3}`}
          stroke="#EC4899"
          strokeWidth="0.6"
          opacity="0.7"
          transform={`rotate(${rot} ${cx} ${cy})`}
        />
      </>
    );
  }
  const leaves: Array<[number, number, number, number]> = [
    [50, 70, 0, 7],
    [38, 60, -30, 7],
    [62, 60, 30, 7],
    [32, 44, -45, 8],
    [68, 44, 45, 8],
    [44, 28, -10, 8],
    [56, 28, 10, 8],
  ];
  return (
    <Svg width={size} height={size} viewBox={VB}>
      <StandardPot />
      {leaves.slice(0, stage * 2).map(([cx, cy, rot, s], i) => (
        <SpiralLeaf key={i} cx={cx} cy={cy} s={s} rot={rot} />
      ))}
    </Svg>
  );
}

export function TradescantiaMascot({ stage, size }: MascotComponentProps) {
  // HANGING POT with cascading striped purple leaves
  const leaves: Array<[number, number, number]> = [
    [38, 95, -25],
    [62, 95, 25],
    [32, 102, -40],
    [68, 102, 40],
    [26, 110, -50],
    [74, 110, 50],
    [44, 100, -15],
    [56, 100, 15],
    [38, 112, -25],
    [62, 112, 25],
  ];
  return (
    <Svg width={size} height={size} viewBox={VB}>
      <HangingPot />
      {/* Trailing stems */}
      <Path d="M40 86 Q32 96 26 112" stroke="#A855F7" strokeWidth="1.2" fill="none" />
      <Path d="M60 86 Q68 96 74 112" stroke="#A855F7" strokeWidth="1.2" fill="none" />

      {leaves.slice(0, stage * 2).map(([cx, cy, rot], i) => (
        <React.Fragment key={i}>
          {/* Leaf */}
          <Path
            d={`M${cx} ${cy - 6} Q${cx + 3} ${cy} ${cx + 1} ${cy + 7} Q${cx} ${cy + 8} ${cx - 1} ${cy + 7} Q${cx - 3} ${cy} ${cx} ${cy - 6} Z`}
            fill="#7C3AED"
            transform={`rotate(${rot} ${cx} ${cy})`}
          />
          {/* Silver stripes */}
          <Path
            d={`M${cx - 2.5} ${cy - 3} L${cx + 2.5} ${cy - 3} M${cx - 2.5} ${cy} L${cx + 2.5} ${cy} M${cx - 2.5} ${cy + 3} L${cx + 2.5} ${cy + 3}`}
            stroke="#E9D5FF"
            strokeWidth="0.8"
            transform={`rotate(${rot} ${cx} ${cy})`}
          />
          {/* Central vein darker */}
          <Path
            d={`M${cx} ${cy - 6} L${cx} ${cy + 7}`}
            stroke="#581C87"
            strokeWidth="0.6"
            transform={`rotate(${rot} ${cx} ${cy})`}
          />
        </React.Fragment>
      ))}
      {/* Top tuft */}
      <Path d="M46 78 L46 84 Q44 80 44 76 Z" fill="#7C3AED" />
      <Path d="M54 78 L54 84 Q56 80 56 76 Z" fill="#A855F7" />
    </Svg>
  );
}

export function SansevieriaMascot({ stage, size }: MascotComponentProps) {
  const leaves = stage === 1 ? 2 : stage === 2 ? 3 : stage === 3 ? 4 : stage === 4 ? 6 : 8;
  const tops = [38, 26, 30, 22, 34, 28, 32, 24];
  const positions = [50, 44, 56, 38, 62, 46, 54, 42];
  return (
    <Svg width={size} height={size} viewBox={VB}>
      <Defs>
        <LinearGradient id="sansBody" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor="#15803D" />
          <Stop offset="0.5" stopColor="#166534" />
          <Stop offset="1" stopColor="#14532D" />
        </LinearGradient>
      </Defs>
      <StandardPot />
      {Array.from({ length: leaves }).map((_, i) => {
        const x = positions[i];
        const top = tops[i];
        return (
          <React.Fragment key={i}>
            {/* Yellow edge stripe */}
            <Path
              d={`M${x - 4} 88 L${x - 4} ${top + 6} Q${x} ${top - 3} ${x + 4} ${top + 6} L${x + 4} 88 Z`}
              fill="#FDE68A"
            />
            {/* Main green leaf */}
            <Path
              d={`M${x - 3} 88 L${x - 3} ${top + 7} Q${x} ${top - 1} ${x + 3} ${top + 7} L${x + 3} 88 Z`}
              fill="url(#sansBody)"
            />
            {/* Horizontal wavy stripes */}
            {[15, 30, 45, 60, 75].map((p, j) => {
              const y = 88 - ((88 - top) * p) / 100;
              return (
                <Path
                  key={j}
                  d={`M${x - 2.5} ${y} Q${x} ${y - 0.6} ${x + 2.5} ${y}`}
                  stroke="#22C55E"
                  strokeWidth="0.7"
                  opacity="0.85"
                  fill="none"
                />
              );
            })}
          </React.Fragment>
        );
      })}
    </Svg>
  );
}

export function ZzPlantMascot({ stage, size }: MascotComponentProps) {
  const stems: Array<[number, number, string]> = [
    [40, 56, 'M40 88 Q34 70 40 50'],
    [60, 56, 'M60 88 Q66 70 60 50'],
    [30, 50, 'M30 88 Q22 68 30 44'],
    [70, 50, 'M70 88 Q78 68 70 44'],
    [50, 36, 'M50 88 Q44 60 50 32'],
    [22, 60, 'M22 88 Q14 72 22 56'],
    [78, 60, 'M78 88 Q86 72 78 56'],
  ];
  return (
    <Svg width={size} height={size} viewBox={VB}>
      <Defs>
        <LinearGradient id="zzLeaf" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#22C55E" />
          <Stop offset="1" stopColor="#15803D" />
        </LinearGradient>
      </Defs>
      <StandardPot />
      {stems.slice(0, stage + 2).map(([_, __, d], i) => (
        <Path key={i} d={d} stroke="#166534" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      ))}
      {/* Paired waxy oval leaves on each stem */}
      {stems.slice(0, stage + 2).map(([endX, endY], i) => {
        const stemLeaves = [];
        for (let t = 0.25; t <= 1.0; t += 0.18) {
          const x = 50 + (endX - 50) * t;
          const y = 88 + (endY - 88) * t;
          stemLeaves.push(
            <React.Fragment key={`${i}-${t}`}>
              <Ellipse cx={x - 4} cy={y} rx="3.5" ry="5" fill="url(#zzLeaf)" />
              <Ellipse cx={x + 4} cy={y} rx="3.5" ry="5" fill="#15803D" />
              {/* Glossy waxy highlight */}
              <Ellipse cx={x - 4.7} cy={y - 1.5} rx="0.8" ry="1.5" fill="#FFFFFF" opacity="0.3" />
              <Ellipse cx={x + 3.3} cy={y - 1.5} rx="0.8" ry="1.5" fill="#FFFFFF" opacity="0.3" />
            </React.Fragment>
          );
        }
        return stemLeaves;
      })}
    </Svg>
  );
}

export function LysPaixMascot({ stage, size }: MascotComponentProps) {
  const leaves: Array<[number, number, number]> = [
    [38, 70, -25],
    [62, 70, 25],
    [30, 56, -40],
    [70, 56, 40],
    [42, 42, -15],
    [58, 42, 15],
  ];
  return (
    <Svg width={size} height={size} viewBox={VB}>
      <StandardPot />
      {leaves.slice(0, stage * 2).map(([cx, cy, rot], i) => (
        <React.Fragment key={i}>
          <Ellipse cx={cx} cy={cy} rx="5" ry="13" fill={i % 2 === 0 ? '#16A34A' : '#15803D'} transform={`rotate(${rot} ${cx} ${cy})`} />
          <Path
            d={`M${cx} ${cy - 12} L${cx} ${cy + 12}`}
            stroke="#86EFAC"
            strokeWidth="0.5"
            opacity="0.6"
            transform={`rotate(${rot} ${cx} ${cy})`}
          />
        </React.Fragment>
      ))}
      {stage >= 3 && (
        <>
          {/* Spathe stem */}
          <Path d="M50 60 L50 28" stroke="#16A34A" strokeWidth="1.5" />
          {/* White spathe - peace lily flower */}
          <Path d="M50 50 Q40 40 44 26 Q50 18 56 26 Q60 40 50 50 Z" fill="#FFFFFF" />
          <Path d="M50 50 Q40 40 44 26 Q50 18 56 26" stroke="#E5E7EB" strokeWidth="0.5" fill="none" />
          {/* Yellow spadix */}
          <Path d="M49 28 Q50 22 51 28 L51 42 Q50 44 49 42 Z" fill="#FDE68A" />
          {Array.from({ length: 8 }).map((_, i) => (
            <Circle key={i} cx="50" cy={30 + i * 1.4} r="0.5" fill="#F59E0B" />
          ))}
        </>
      )}
      {stage >= 5 && (
        <>
          <Path d="M30 50 Q22 40 26 26 Q32 18 38 26 Q42 40 32 50 Z" fill="#FFFFFF" opacity="0.95" />
          <Path d="M29 28 Q30 22 31 28 L31 42 Z" fill="#FDE68A" />
        </>
      )}
    </Svg>
  );
}

export function PlanteAraigneeMascot({ stage, size }: MascotComponentProps) {
  // HANGING POT with arching striped leaves and baby plants
  const leaves: Array<[number, number, number]> = [
    [50, 78, 0],
    [36, 86, -45],
    [64, 86, 45],
    [28, 96, -70],
    [72, 96, 70],
    [22, 108, -90],
    [78, 108, 90],
    [40, 102, -55],
    [60, 102, 55],
  ];
  return (
    <Svg width={size} height={size} viewBox={VB}>
      <HangingPot />
      {leaves.slice(0, stage * 2).map(([cx, cy, rot], i) => (
        <React.Fragment key={i}>
          {/* Arching long thin leaf */}
          <Path
            d={`M50 80 Q${(50 + cx) / 2} ${(80 + cy) / 2 + 3} ${cx} ${cy} Q${cx + 2} ${cy + 1} ${cx + 4} ${cy + 4}`}
            stroke="#22C55E"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          {/* White stripe down the middle - chlorophytum signature */}
          <Path
            d={`M50 80 Q${(50 + cx) / 2} ${(80 + cy) / 2 + 3} ${cx} ${cy} Q${cx + 2} ${cy + 1} ${cx + 4} ${cy + 4}`}
            stroke="#FFFFFF"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
          />
        </React.Fragment>
      ))}
      {/* Baby spider plants hanging from runners */}
      {stage >= 4 &&
        [
          [22, 116],
          [78, 116],
        ].map(([cx, cy], i) => (
          <React.Fragment key={`b${i}`}>
            <Path d={`M${cx} ${cy - 10} L${cx} ${cy - 2}`} stroke="#22C55E" strokeWidth="0.8" />
            {/* Mini plant */}
            {[-4, -2, 0, 2, 4].map((dx, j) => (
              <Path
                key={j}
                d={`M${cx + dx * 0.3} ${cy - 2} L${cx + dx} ${cy + 4}`}
                stroke="#22C55E"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            ))}
            {[-3, 0, 3].map((dx, j) => (
              <Circle key={`s${j}`} cx={cx + dx * 0.5} cy={cy + 1} r="0.4" fill="#FFFFFF" />
            ))}
          </React.Fragment>
        ))}
      {/* Tiny white star flowers in stage 5 */}
      {stage === 5 && (
        <>
          <Circle cx="32" cy="118" r="1.2" fill="#FFFFFF" />
          <Circle cx="68" cy="118" r="1.2" fill="#FFFFFF" />
          <Circle cx="50" cy="118" r="1" fill="#FFFFFF" />
        </>
      )}
    </Svg>
  );
}

export function CaoutchoucMascot({ stage, size }: MascotComponentProps) {
  const leaves: Array<[number, number, number, number]> = [
    [42, 72, -15, 7],
    [58, 64, 15, 8],
    [38, 54, -22, 9],
    [62, 46, 22, 9],
    [44, 32, -10, 10],
    [56, 24, 10, 10],
  ];
  return (
    <Svg width={size} height={size} viewBox={VB}>
      <Defs>
        <LinearGradient id="rubberLeaf" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#15803D" />
          <Stop offset="0.5" stopColor="#0F1A0F" />
          <Stop offset="1" stopColor="#15803D" />
        </LinearGradient>
      </Defs>
      <StandardPot />
      <Path d="M50 88 Q48 60 52 28" stroke="#7C5036" strokeWidth="3.5" strokeLinecap="round" />
      {leaves.slice(0, stage + 1).map(([cx, cy, rot, s], i) => (
        <React.Fragment key={i}>
          <Ellipse cx={cx} cy={cy} rx={s} ry={s * 1.5} fill="url(#rubberLeaf)" transform={`rotate(${rot} ${cx} ${cy})`} />
          <Path
            d={`M${cx} ${cy - s * 1.4} L${cx} ${cy + s * 1.4}`}
            stroke="#22C55E"
            strokeWidth="0.7"
            transform={`rotate(${rot} ${cx} ${cy})`}
          />
          {/* Strong glossy highlight - rubber plant has very shiny leaves */}
          <Ellipse cx={cx - s * 0.4} cy={cy - s * 0.5} rx={s * 0.25} ry={s * 0.7} fill="#FFFFFF" opacity="0.3" transform={`rotate(${rot} ${cx} ${cy})`} />
          {/* Red leaf sheath at base - signature ficus elastica */}
          {i === stage && (
            <Path
              d={`M${cx + 1} ${cy + s * 1.4} L${cx + 2} ${cy + s * 2}`}
              stroke="#DC2626"
              strokeWidth="2"
              strokeLinecap="round"
            />
          )}
        </React.Fragment>
      ))}
    </Svg>
  );
}

export function DracaenaMascot({ stage, size }: MascotComponentProps) {
  const topY = 56 - stage * 6;
  return (
    <Svg width={size} height={size} viewBox={VB}>
      <StandardPot />
      {/* Cane trunk with rings */}
      <Rect x="46" y={topY + 6} width="8" height={88 - topY - 6} fill="#7C5036" />
      <Rect x="46" y={topY + 6} width="2" height={88 - topY - 6} fill="#A0714F" opacity="0.7" />
      {[0.2, 0.4, 0.6, 0.8].map((t, i) => (
        <React.Fragment key={i}>
          <Rect x="44" y={topY + 6 + (88 - topY - 6) * t} width="12" height="2" fill="#5C3317" />
          <Rect x="44" y={topY + 6 + (88 - topY - 6) * t + 1.5} width="12" height="0.5" fill="#3D2914" />
        </React.Fragment>
      ))}
      {/* Spiky cluster of long leaves at top - palm-like */}
      {Array.from({ length: 8 + stage * 3 }).map((_, i) => {
        const total = 8 + stage * 3;
        const angle = -85 + (170 / (total - 1)) * i;
        const rad = (angle * Math.PI) / 180;
        const len = 16 + (i % 3) * 2;
        const tx = 50 + Math.sin(rad) * len;
        const ty = topY + 4 - Math.cos(Math.abs(rad) * (Math.PI / 180)) * len * 0.6;
        return (
          <React.Fragment key={i}>
            <Path
              d={`M50 ${topY + 4} Q${(50 + tx) / 2} ${(topY + ty) / 2 - 1} ${tx} ${ty}`}
              stroke={i % 3 === 0 ? '#DC2626' : '#16A34A'}
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
            />
            {/* Lighter highlight on leaves */}
            <Path
              d={`M50 ${topY + 4} Q${(50 + tx) / 2} ${(topY + ty) / 2 - 1} ${tx} ${ty}`}
              stroke="#22C55E"
              strokeWidth="0.6"
              opacity="0.6"
              fill="none"
            />
          </React.Fragment>
        );
      })}
    </Svg>
  );
}

export function YuccaMascot({ stage, size }: MascotComponentProps) {
  return (
    <Svg width={size} height={size} viewBox={VB}>
      <StandardPot />
      {stage >= 2 && (
        <>
          <Rect x="46" y={70 - stage * 4} width="8" height={18 + stage * 4} fill="#7C5036" />
          {[0.3, 0.6].map((t, i) => (
            <Path
              key={i}
              d={`M44 ${70 - stage * 4 + (18 + stage * 4) * t} L56 ${70 - stage * 4 + (18 + stage * 4) * t} M44 ${70 - stage * 4 + (18 + stage * 4) * t + 1} L56 ${70 - stage * 4 + (18 + stage * 4) * t + 1}`}
              stroke="#5C3317"
              strokeWidth="0.8"
            />
          ))}
        </>
      )}
      {/* Stiff sword leaves rosette */}
      {Array.from({ length: 10 + stage * 3 }).map((_, i) => {
        const total = 10 + stage * 3;
        const angle = -90 + (180 / (total - 1)) * i;
        const rad = (angle * Math.PI) / 180;
        const startY = stage >= 2 ? 70 - stage * 4 : 80;
        const len = 18 + stage * 2 + (i % 3) * 2;
        const tx = 50 + Math.sin(rad) * len;
        const ty = startY + Math.cos(rad) * len * 0.4;
        return (
          <Path
            key={i}
            d={`M${50 - 1.2} ${startY + 1} L${tx - 0.8} ${ty + 0.5} L${tx} ${ty - 0.5} L${tx + 0.8} ${ty + 0.5} L${50 + 1.2} ${startY + 1} Z`}
            fill={i % 2 === 0 ? '#22C55E' : '#16A34A'}
          />
        );
      })}
      {/* White flower spike at maturity */}
      {stage === 5 && (
        <>
          <Path d={`M50 ${70 - stage * 4 - 16} L50 ${70 - stage * 4 - 30}`} stroke="#86EFAC" strokeWidth="1.5" />
          {Array.from({ length: 7 }).map((_, i) => (
            <Path
              key={i}
              d={`M${50 + (i % 2 === 0 ? -2 : 2)} ${70 - stage * 4 - 18 - i * 2} Q50 ${70 - stage * 4 - 19 - i * 2} ${50 + (i % 2 === 0 ? 2 : -2)} ${70 - stage * 4 - 18 - i * 2 - 1} Z`}
              fill="#FFFFFF"
            />
          ))}
        </>
      )}
    </Svg>
  );
}

export function BambouBonheurMascot({ stage, size }: MascotComponentProps) {
  // Glass vase with bamboo stalks - one with curl/spiral as user requested
  const stalks = stage === 1 ? 2 : stage === 2 ? 3 : stage === 3 ? 4 : stage === 4 ? 5 : 6;
  return (
    <Svg width={size} height={size} viewBox={VB}>
      <GlassVase />
      {Array.from({ length: stalks }).map((_, i) => {
        const x = 38 + (i * 24) / Math.max(1, stalks - 1);
        const top = 30 - (i % 3) * 4;
        const segments = 5;
        const isCurly = i === 1; // 1 stalk has spiral curl
        if (isCurly) {
          return (
            <React.Fragment key={i}>
              {/* Spiral path - bamboo lucky curled */}
              <Path
                d={`M${x} 88 L${x} 76 Q${x - 8} 70 ${x} 64 Q${x + 8} 58 ${x} 52 Q${x - 8} 46 ${x} 40 Q${x + 6} 34 ${x} ${top}`}
                stroke="#22C55E"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
              <Path
                d={`M${x} 88 L${x} 76 Q${x - 8} 70 ${x} 64 Q${x + 8} 58 ${x} 52 Q${x - 8} 46 ${x} 40 Q${x + 6} 34 ${x} ${top}`}
                stroke="#15803D"
                strokeWidth="0.6"
                fill="none"
                strokeLinecap="round"
                opacity="0.7"
              />
              {/* Node lines on spiral */}
              {[76, 64, 52, 40].map((y, j) => (
                <Path
                  key={j}
                  d={`M${x - 2} ${y} L${x + 2} ${y}`}
                  stroke="#15803D"
                  strokeWidth="1"
                />
              ))}
              {/* Top leaves */}
              <Path d={`M${x} ${top} L${x - 5} ${top - 6} L${x - 3} ${top - 2} Z`} fill="#16A34A" />
              <Path d={`M${x} ${top} L${x + 5} ${top - 6} L${x + 3} ${top - 2} Z`} fill="#22C55E" />
            </React.Fragment>
          );
        }
        const slightCurve = i === 3 ? -2 : 0;
        return (
          <React.Fragment key={i}>
            {/* Slightly curved bamboo stalk */}
            <Path
              d={`M${x - 2} 88 Q${x - 2 + slightCurve} ${(88 + top) / 2} ${x - 2 + slightCurve} ${top} L${x + 2 + slightCurve} ${top} Q${x + 2 + slightCurve} ${(88 + top) / 2} ${x + 2} 88 Z`}
              fill="#22C55E"
            />
            {/* Inner highlight */}
            <Path
              d={`M${x} 88 L${x + slightCurve} ${top}`}
              stroke="#86EFAC"
              strokeWidth="0.5"
              opacity="0.6"
            />
            {/* Node lines */}
            {Array.from({ length: segments }).map((_, j) => (
              <Path
                key={j}
                d={`M${x - 3} ${top + ((88 - top) * (j + 1)) / (segments + 1)} L${x + 3 + slightCurve * (1 - (j + 1) / (segments + 1))} ${top + ((88 - top) * (j + 1)) / (segments + 1)}`}
                stroke="#15803D"
                strokeWidth="1.2"
              />
            ))}
            {/* Leaves at top */}
            <Path d={`M${x + slightCurve} ${top} L${x - 6 + slightCurve} ${top - 6} L${x - 4 + slightCurve} ${top - 2} Z`} fill="#16A34A" />
            <Path d={`M${x + slightCurve} ${top} L${x + 6 + slightCurve} ${top - 6} L${x + 4 + slightCurve} ${top - 2} Z`} fill="#22C55E" />
            <Path d={`M${x + slightCurve} ${top - 4} L${x - 4 + slightCurve} ${top - 10} L${x - 1 + slightCurve} ${top - 6} Z`} fill="#16A34A" />
          </React.Fragment>
        );
      })}
      {/* Red lucky ribbon */}
      {stage >= 3 && (
        <>
          <Path d="M30 86 Q26 90 30 94 L34 94 Q30 90 34 86 Z" fill="#DC2626" />
          <Path d="M70 86 Q74 90 70 94 L66 94 Q70 90 66 86 Z" fill="#DC2626" />
        </>
      )}
    </Svg>
  );
}

export function AnthuriumMascot({ stage, size }: MascotComponentProps) {
  // Red heart spathes with PROMINENT STEMS as user requested
  const flowers: Array<[number, number, number]> = [
    [50, 50, 0],
    [36, 60, -20],
    [64, 60, 20],
    [42, 38, -10],
    [58, 38, 10],
  ];
  return (
    <Svg width={size} height={size} viewBox={VB}>
      <StandardPot />
      {/* Dark green base leaves */}
      {[
        [38, 76, -25],
        [62, 76, 25],
        [32, 66, -40],
        [68, 66, 40],
      ]
        .slice(0, stage + 1)
        .map(([cx, cy, rot], i) => (
          <React.Fragment key={i}>
            <Path
              d={`M${cx} ${cy + 8} Q${cx + 8} ${cy} ${cx} ${cy - 10} Q${cx - 8} ${cy} ${cx} ${cy + 8} Z`}
              fill="#15803D"
              transform={`rotate(${rot} ${cx} ${cy})`}
            />
            <Path
              d={`M${cx} ${cy - 10} L${cx} ${cy + 8}`}
              stroke="#86EFAC"
              strokeWidth="0.5"
              transform={`rotate(${rot} ${cx} ${cy})`}
            />
          </React.Fragment>
        ))}
      {/* Red heart spathes WITH STEMS */}
      {flowers.slice(0, Math.max(1, stage - 1)).map(([cx, cy, rot], i) => (
        <React.Fragment key={i}>
          {/* STEM connecting flower to base - this was missing */}
          <Path
            d={`M${cx} ${cy + 6} Q${(cx + 50) / 2} ${(cy + 84) / 2} 50 84`}
            stroke="#16A34A"
            strokeWidth="1.5"
            fill="none"
          />
          {/* Red heart spathe */}
          <Path
            d={`M${cx} ${cy + 7} C${cx - 9} ${cy} ${cx - 9} ${cy - 8} ${cx} ${cy - 5} C${cx + 9} ${cy - 8} ${cx + 9} ${cy} ${cx} ${cy + 7} Z`}
            fill="#DC2626"
            transform={`rotate(${rot} ${cx} ${cy})`}
          />
          {/* Glossy highlight on spathe */}
          <Path
            d={`M${cx - 3} ${cy - 3} Q${cx - 1} ${cy - 5} ${cx + 1} ${cy - 4}`}
            stroke="#FCA5A5"
            strokeWidth="1"
            fill="none"
            transform={`rotate(${rot} ${cx} ${cy})`}
            opacity="0.8"
          />
          {/* Curved yellow spadix */}
          <Path
            d={`M${cx} ${cy} Q${cx + 2} ${cy - 3} ${cx + 4} ${cy - 7}`}
            stroke="#FDE68A"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
            transform={`rotate(${rot} ${cx} ${cy})`}
          />
        </React.Fragment>
      ))}
    </Svg>
  );
}

export function OrchideeMascot({ stage, size }: MascotComponentProps) {
  // Phalaenopsis - butterfly orchid flowers
  function ButterflyFlower({ cx, cy, s, color, accent }: { cx: number; cy: number; s: number; color: string; accent: string }) {
    return (
      <>
        {/* Two wide side petals */}
        <Path
          d={`M${cx - s * 0.2} ${cy} Q${cx - s * 1.1} ${cy - s * 0.7} ${cx - s * 1.2} ${cy + s * 0.1} Q${cx - s * 0.8} ${cy + s * 0.5} ${cx - s * 0.2} ${cy + s * 0.2} Z`}
          fill={color}
        />
        <Path
          d={`M${cx + s * 0.2} ${cy} Q${cx + s * 1.1} ${cy - s * 0.7} ${cx + s * 1.2} ${cy + s * 0.1} Q${cx + s * 0.8} ${cy + s * 0.5} ${cx + s * 0.2} ${cy + s * 0.2} Z`}
          fill={color}
        />
        {/* Two top petals */}
        <Path
          d={`M${cx - s * 0.4} ${cy - s * 0.3} Q${cx - s * 0.7} ${cy - s} ${cx - s * 0.1} ${cy - s * 1} Q${cx} ${cy - s * 0.6} ${cx - s * 0.4} ${cy - s * 0.3} Z`}
          fill={color}
        />
        <Path
          d={`M${cx + s * 0.4} ${cy - s * 0.3} Q${cx + s * 0.7} ${cy - s} ${cx + s * 0.1} ${cy - s} Q${cx} ${cy - s * 0.6} ${cx + s * 0.4} ${cy - s * 0.3} Z`}
          fill={color}
        />
        {/* Lower lip petal - the labellum */}
        <Path
          d={`M${cx - s * 0.4} ${cy + s * 0.2} Q${cx} ${cy + s * 1.1} ${cx + s * 0.4} ${cy + s * 0.2} Q${cx} ${cy + s * 0.6} ${cx - s * 0.4} ${cy + s * 0.2} Z`}
          fill={accent}
        />
        {/* Center column */}
        <Circle cx={cx} cy={cy} r={s * 0.25} fill="#FDE68A" />
        <Circle cx={cx} cy={cy} r={s * 0.12} fill="#F59E0B" />
        {/* Spots on the labellum */}
        <Circle cx={cx} cy={cy + s * 0.4} r="0.6" fill={accent} opacity="0.8" />
      </>
    );
  }
  return (
    <Svg width={size} height={size} viewBox={VB}>
      <StandardPot />
      {/* Strap-like base leaves */}
      <Path d="M40 86 Q34 78 36 70 Q38 64 44 64 Z" fill="#16A34A" />
      <Path d="M60 86 Q66 78 64 70 Q62 64 56 64 Z" fill="#16A34A" />
      <Path d="M44 84 Q42 76 50 70 Q58 76 56 84" fill="#15803D" />
      <Path d="M44 84 Q42 76 50 70" stroke="#86EFAC" strokeWidth="0.5" fill="none" />

      {/* Arching flower stem with green stake support */}
      {stage >= 2 && (
        <>
          <Path d="M50 70 L50 14" stroke="#7C5036" strokeWidth="0.6" />
          <Path
            d={`M50 64 Q${stage % 2 === 0 ? 60 : 40} 50 ${stage % 2 === 0 ? 66 : 34} 30`}
            stroke="#86EFAC"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          {/* Stem ties to stake */}
          <Path d="M48 60 L52 60" stroke="#15803D" strokeWidth="0.4" />
          <Path d="M48 50 L52 50" stroke="#15803D" strokeWidth="0.4" />
        </>
      )}

      {stage >= 2 && <ButterflyFlower cx={50} cy={50} s={6} color="#EC4899" accent="#BE185D" />}
      {stage >= 3 && <ButterflyFlower cx={36} cy={42} s={6.5} color="#F472B6" accent="#9D174D" />}
      {stage >= 4 && <ButterflyFlower cx={64} cy={36} s={7} color="#EC4899" accent="#BE185D" />}
      {stage === 5 && (
        <>
          <ButterflyFlower cx={26} cy={28} s={7} color="#F9A8D4" accent="#BE185D" />
          <ButterflyFlower cx={74} cy={22} s={7.5} color="#EC4899" accent="#9D174D" />
        </>
      )}

      {/* Aerial roots peeking from base - signature orchid feature */}
      {stage >= 3 && (
        <>
          <Path d="M40 86 Q36 88 34 90" stroke="#A7F3D0" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <Path d="M60 86 Q64 88 66 90" stroke="#A7F3D0" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </>
      )}
    </Svg>
  );
}

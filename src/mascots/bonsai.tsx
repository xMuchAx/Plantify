import React from 'react';
import Svg, { Circle, Defs, Ellipse, LinearGradient, Path, Stop } from 'react-native-svg';
import { FlatPot, MascotComponentProps } from './shared';

const VB = '0 0 100 120';

export function FicusGinsengMascot({ stage, size }: MascotComponentProps) {
  return (
    <Svg width={size} height={size} viewBox={VB}>
      <Defs>
        <LinearGradient id="ficusTrunk" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor="#A0714F" />
          <Stop offset="0.5" stopColor="#8B5E3C" />
          <Stop offset="1" stopColor="#5C3317" />
        </LinearGradient>
        <LinearGradient id="ficusCanopy" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#22C55E" />
          <Stop offset="1" stopColor="#15803D" />
        </LinearGradient>
      </Defs>
      <FlatPot />
      {/* Bulbous trunk as ONE closed shape - signature ficus ginseng silhouette */}
      <Path
        d="M40 90 Q30 80 36 70 Q26 62 38 54 Q34 46 44 40 L56 40 Q66 46 62 54 Q74 62 64 70 Q70 80 60 90 Z"
        fill="url(#ficusTrunk)"
      />
      {/* Trunk shading on left to give 3D effect */}
      <Path
        d="M40 90 Q30 80 36 70 Q26 62 38 54 Q34 46 44 40 L46 40 Q40 46 42 54 Q34 62 42 70 Q36 80 44 90 Z"
        fill="#5C3317"
        opacity="0.35"
      />
      {/* Top highlight on right */}
      <Path
        d="M54 40 L56 40 Q66 46 62 54 Q74 62 64 70 Q70 80 60 90 L58 90 Q66 80 60 70 Q70 62 60 54 Q64 46 54 40 Z"
        fill="#A0714F"
        opacity="0.4"
      />
      {/* Soil mound at base */}
      <Path
        d="M38 91 Q50 88 62 91 L62 93 Q50 92 38 93 Z"
        fill="#3E2A1B"
      />
      {/* Aerial roots descending into pot - signature ficus feature */}
      <Path d="M42 78 Q38 85 41 91" stroke="#6B4423" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <Path d="M58 78 Q62 85 59 91" stroke="#6B4423" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <Path d="M46 80 Q44 87 47 91" stroke="#6B4423" strokeWidth="0.9" fill="none" strokeLinecap="round" opacity="0.7" />
      <Path d="M54 80 Q56 87 53 91" stroke="#6B4423" strokeWidth="0.9" fill="none" strokeLinecap="round" opacity="0.7" />
      {/* Trunk knots/texture */}
      <Circle cx="42" cy="60" r="1.3" fill="#3E2A1B" opacity="0.6" />
      <Circle cx="58" cy="58" r="1.1" fill="#3E2A1B" opacity="0.55" />
      <Circle cx="46" cy="72" r="0.9" fill="#3E2A1B" opacity="0.5" />
      <Circle cx="54" cy="76" r="0.7" fill="#3E2A1B" opacity="0.5" />
      {/* Trunk grain lines */}
      <Path d="M44 50 Q50 52 56 50" stroke="#3E2A1B" strokeWidth="0.4" fill="none" opacity="0.4" />
      <Path d="M40 66 Q50 68 60 66" stroke="#3E2A1B" strokeWidth="0.4" fill="none" opacity="0.4" />

      {/* Branches */}
      {stage >= 2 && <Path d="M44 38 Q36 36 30 32" stroke="#5C3317" strokeWidth="2" strokeLinecap="round" fill="none" />}
      {stage >= 3 && <Path d="M56 38 Q64 36 70 32" stroke="#5C3317" strokeWidth="2" strokeLinecap="round" fill="none" />}
      {stage >= 4 && <Path d="M50 36 Q50 28 50 22" stroke="#5C3317" strokeWidth="1.5" strokeLinecap="round" fill="none" />}

      {/* Foliage clouds */}
      {stage === 1 && (
        <>
          <Ellipse cx="50" cy="34" rx="9" ry="6" fill="url(#ficusCanopy)" />
          <Circle cx="46" cy="32" r="2" fill="#22C55E" opacity="0.6" />
        </>
      )}
      {stage === 2 && (
        <>
          <Ellipse cx="50" cy="32" rx="13" ry="7" fill="url(#ficusCanopy)" />
          <Ellipse cx="32" cy="32" rx="6" ry="5" fill="#15803D" />
          <Circle cx="44" cy="30" r="2" fill="#4ADE80" opacity="0.5" />
        </>
      )}
      {stage === 3 && (
        <>
          <Ellipse cx="50" cy="28" rx="16" ry="8" fill="url(#ficusCanopy)" />
          <Ellipse cx="30" cy="32" rx="8" ry="6" fill="#15803D" />
          <Ellipse cx="70" cy="32" rx="8" ry="6" fill="#15803D" />
          <Circle cx="44" cy="26" r="2" fill="#4ADE80" opacity="0.6" />
          <Circle cx="58" cy="28" r="1.5" fill="#86EFAC" opacity="0.5" />
        </>
      )}
      {stage === 4 && (
        <>
          <Ellipse cx="50" cy="24" rx="20" ry="10" fill="url(#ficusCanopy)" />
          <Ellipse cx="26" cy="32" rx="11" ry="7" fill="#15803D" />
          <Ellipse cx="74" cy="32" rx="11" ry="7" fill="#15803D" />
          <Circle cx="42" cy="22" r="2.5" fill="#4ADE80" opacity="0.6" />
          <Circle cx="58" cy="20" r="2" fill="#86EFAC" opacity="0.5" />
          <Circle cx="32" cy="34" r="1.5" fill="#86EFAC" opacity="0.5" />
        </>
      )}
      {stage === 5 && (
        <>
          <Ellipse cx="50" cy="20" rx="24" ry="11" fill="url(#ficusCanopy)" />
          <Ellipse cx="22" cy="30" rx="13" ry="8" fill="#15803D" />
          <Ellipse cx="78" cy="30" rx="13" ry="8" fill="#15803D" />
          <Ellipse cx="36" cy="48" rx="9" ry="6" fill="#16A34A" />
          <Ellipse cx="64" cy="50" rx="9" ry="6" fill="#16A34A" />
          {[[40, 18], [56, 16], [70, 28], [30, 32]].map(([cx, cy], i) => (
            <Circle key={i} cx={cx} cy={cy} r="2" fill="#86EFAC" opacity="0.55" />
          ))}
        </>
      )}
    </Svg>
  );
}

export function GenevrierMascot({ stage, size }: MascotComponentProps) {
  // Japanese-style conifer with cloud-like layered foliage and twisted trunk
  return (
    <Svg width={size} height={size} viewBox={VB}>
      <Defs>
        <LinearGradient id="conifer" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#15803D" />
          <Stop offset="1" stopColor="#0F766E" />
        </LinearGradient>
      </Defs>
      <FlatPot />
      {/* Dramatic twisted trunk - characteristic of bonsai juniper */}
      <Path
        d="M48 91 Q44 82 52 72 Q42 62 56 50 Q46 38 54 24"
        stroke="#7C5036"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M48 91 Q44 82 52 72 Q42 62 56 50 Q46 38 54 24"
        stroke="#A0714F"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      {/* Deadwood (jin) - characteristic feature */}
      {stage >= 3 && (
        <Path d="M56 50 Q66 44 70 36" stroke="#E5E5E5" strokeWidth="2" strokeLinecap="round" fill="none" />
      )}
      {/* Branches */}
      {stage >= 2 && <Path d="M52 72 Q40 66 32 60" stroke="#7C5036" strokeWidth="2.5" strokeLinecap="round" fill="none" />}
      {stage >= 3 && <Path d="M56 50 Q70 46 76 38" stroke="#7C5036" strokeWidth="2.5" strokeLinecap="round" fill="none" />}
      {stage >= 4 && <Path d="M52 72 Q60 70 64 64" stroke="#7C5036" strokeWidth="2" strokeLinecap="round" fill="none" />}

      {/* Cloud foliage pads - signature bonsai shape */}
      {stage === 1 && (
        <>
          <Ellipse cx="54" cy="22" rx="9" ry="5" fill="url(#conifer)" />
          <Ellipse cx="50" cy="20" rx="3" ry="2" fill="#86EFAC" opacity="0.5" />
        </>
      )}
      {stage === 2 && (
        <>
          <Ellipse cx="54" cy="20" rx="11" ry="5" fill="url(#conifer)" />
          <Ellipse cx="32" cy="58" rx="9" ry="5" fill="url(#conifer)" />
          <Ellipse cx="50" cy="18" rx="4" ry="2" fill="#86EFAC" opacity="0.5" />
        </>
      )}
      {stage === 3 && (
        <>
          <Ellipse cx="54" cy="18" rx="13" ry="6" fill="url(#conifer)" />
          <Ellipse cx="32" cy="58" rx="11" ry="6" fill="url(#conifer)" />
          <Ellipse cx="76" cy="36" rx="10" ry="5" fill="url(#conifer)" />
          <Ellipse cx="50" cy="16" rx="5" ry="2" fill="#86EFAC" opacity="0.5" />
          <Ellipse cx="28" cy="56" rx="3" ry="2" fill="#86EFAC" opacity="0.4" />
        </>
      )}
      {stage === 4 && (
        <>
          <Ellipse cx="54" cy="16" rx="15" ry="7" fill="url(#conifer)" />
          <Ellipse cx="30" cy="58" rx="13" ry="7" fill="url(#conifer)" />
          <Ellipse cx="76" cy="36" rx="12" ry="6" fill="url(#conifer)" />
          <Ellipse cx="64" cy="62" rx="9" ry="5" fill="url(#conifer)" />
          <Ellipse cx="50" cy="14" rx="6" ry="2" fill="#86EFAC" opacity="0.5" />
          <Ellipse cx="74" cy="34" rx="4" ry="2" fill="#86EFAC" opacity="0.4" />
        </>
      )}
      {stage === 5 && (
        <>
          <Ellipse cx="54" cy="14" rx="17" ry="8" fill="url(#conifer)" />
          <Ellipse cx="28" cy="56" rx="15" ry="8" fill="url(#conifer)" />
          <Ellipse cx="76" cy="34" rx="14" ry="7" fill="url(#conifer)" />
          <Ellipse cx="66" cy="62" rx="11" ry="6" fill="url(#conifer)" />
          <Ellipse cx="38" cy="34" rx="9" ry="5" fill="url(#conifer)" />
          <Ellipse cx="50" cy="12" rx="7" ry="2.5" fill="#86EFAC" opacity="0.5" />
          <Ellipse cx="74" cy="32" rx="5" ry="2" fill="#86EFAC" opacity="0.4" />
          <Ellipse cx="26" cy="54" rx="6" ry="2" fill="#86EFAC" opacity="0.4" />
        </>
      )}
    </Svg>
  );
}

export function CarmonaMascot({ stage, size }: MascotComponentProps) {
  // Visible white star flowers + red berries
  function Flower({ cx, cy, s }: { cx: number; cy: number; s: number }) {
    return (
      <>
        {[0, 72, 144, 216, 288].map((a, i) => {
          const rad = (a * Math.PI) / 180;
          return (
            <Ellipse
              key={i}
              cx={cx + Math.cos(rad) * s * 0.5}
              cy={cy + Math.sin(rad) * s * 0.5}
              rx={s * 0.4}
              ry={s * 0.5}
              fill="#FFFFFF"
              transform={`rotate(${a} ${cx} ${cy})`}
            />
          );
        })}
        <Circle cx={cx} cy={cy} r={s * 0.25} fill="#FDE68A" />
      </>
    );
  }
  return (
    <Svg width={size} height={size} viewBox={VB}>
      <FlatPot />
      <Path d="M50 91 Q47 76 52 60 Q48 50 51 40" stroke="#5C3A1F" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      {stage >= 2 && <Path d="M52 60 Q40 54 34 46" stroke="#5C3A1F" strokeWidth="2.5" strokeLinecap="round" fill="none" />}
      {stage >= 3 && <Path d="M51 50 Q62 44 68 36" stroke="#5C3A1F" strokeWidth="2.5" strokeLinecap="round" fill="none" />}
      {stage >= 4 && <Path d="M50 70 Q42 68 36 62" stroke="#5C3A1F" strokeWidth="2" strokeLinecap="round" fill="none" />}

      {/* Dense dark foliage with white flowers AND red berries */}
      {stage === 1 && (
        <>
          <Ellipse cx="51" cy="40" rx="11" ry="7" fill="#166534" />
          <Flower cx={48} cy={38} s={3} />
          <Circle cx="54" cy="42" r="1.5" fill="#DC2626" />
        </>
      )}
      {stage === 2 && (
        <>
          <Ellipse cx="51" cy="38" rx="13" ry="8" fill="#166534" />
          <Ellipse cx="34" cy="46" rx="9" ry="6" fill="#15803D" />
          <Flower cx={48} cy={36} s={3} />
          <Flower cx={32} cy={44} s={2.5} />
          <Circle cx="56" cy="40" r="1.5" fill="#DC2626" />
          <Circle cx="38" cy="48" r="1.5" fill="#DC2626" />
        </>
      )}
      {stage === 3 && (
        <>
          <Ellipse cx="51" cy="34" rx="15" ry="9" fill="#166534" />
          <Ellipse cx="34" cy="46" rx="11" ry="7" fill="#15803D" />
          <Ellipse cx="68" cy="36" rx="11" ry="7" fill="#15803D" />
          {[[46, 32], [54, 36], [32, 44], [68, 34]].map(([x, y], i) => (
            <Flower key={i} cx={x} cy={y} s={3} />
          ))}
          {[[50, 38], [38, 48], [70, 38]].map(([x, y], i) => (
            <Circle key={i} cx={x} cy={y} r="1.5" fill="#DC2626" />
          ))}
        </>
      )}
      {stage === 4 && (
        <>
          <Ellipse cx="50" cy="30" rx="18" ry="10" fill="#166534" />
          <Ellipse cx="32" cy="44" rx="13" ry="8" fill="#15803D" />
          <Ellipse cx="68" cy="36" rx="13" ry="8" fill="#15803D" />
          <Ellipse cx="36" cy="62" rx="10" ry="6" fill="#15803D" />
          {[[44, 28], [54, 30], [30, 42], [68, 34], [38, 60]].map(([x, y], i) => (
            <Flower key={i} cx={x} cy={y} s={3} />
          ))}
          {[[50, 34], [38, 46], [70, 38], [34, 64]].map(([x, y], i) => (
            <Circle key={i} cx={x} cy={y} r="1.6" fill="#DC2626" />
          ))}
        </>
      )}
      {stage === 5 && (
        <>
          <Ellipse cx="50" cy="26" rx="22" ry="11" fill="#166534" />
          <Ellipse cx="28" cy="40" rx="14" ry="9" fill="#15803D" />
          <Ellipse cx="72" cy="32" rx="14" ry="9" fill="#15803D" />
          <Ellipse cx="34" cy="60" rx="11" ry="6" fill="#15803D" />
          <Ellipse cx="66" cy="62" rx="11" ry="6" fill="#15803D" />
          {[[42, 22], [50, 26], [58, 22], [28, 36], [28, 44], [72, 30], [72, 38], [50, 32]].map(
            ([x, y], i) => (
              <Flower key={i} cx={x} cy={y} s={3.2} />
            )
          )}
          {[[36, 26], [62, 26], [44, 30], [56, 30], [22, 42], [78, 34], [38, 62], [62, 64]].map(
            ([x, y], i) => (
              <Circle key={i} cx={x} cy={y} r="1.7" fill="#DC2626" />
            )
          )}
        </>
      )}
    </Svg>
  );
}

export function ErableJaponMascot({ stage, size }: MascotComponentProps) {
  // Real palmate maple leaf shape (5 lobes radiating from center)
  function MapleLeaf({ cx, cy, s, fill }: { cx: number; cy: number; s: number; fill: string }) {
    return (
      <Path
        d={`M${cx} ${cy + s * 0.9} L${cx - s * 0.3} ${cy + s * 0.4} L${cx - s * 0.9} ${cy + s * 0.5} L${cx - s * 0.5} ${cy} L${cx - s} ${cy - s * 0.2} L${cx - s * 0.4} ${cy - s * 0.4} L${cx - s * 0.6} ${cy - s} L${cx - s * 0.1} ${cy - s * 0.5} L${cx} ${cy - s * 1.1} L${cx + s * 0.1} ${cy - s * 0.5} L${cx + s * 0.6} ${cy - s} L${cx + s * 0.4} ${cy - s * 0.4} L${cx + s} ${cy - s * 0.2} L${cx + s * 0.5} ${cy} L${cx + s * 0.9} ${cy + s * 0.5} L${cx + s * 0.3} ${cy + s * 0.4} Z`}
        fill={fill}
      />
    );
  }
  return (
    <Svg width={size} height={size} viewBox={VB}>
      <FlatPot />
      <Path
        d="M50 91 Q46 78 53 64 Q47 54 50 42 Q48 34 52 26"
        stroke="#3D2914"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      {stage >= 2 && <Path d="M53 64 Q42 56 32 50" stroke="#3D2914" strokeWidth="2.2" strokeLinecap="round" fill="none" />}
      {stage >= 3 && <Path d="M50 50 Q62 46 70 38" stroke="#3D2914" strokeWidth="2.2" strokeLinecap="round" fill="none" />}
      {stage >= 4 && <Path d="M50 70 Q42 68 36 62" stroke="#3D2914" strokeWidth="2" strokeLinecap="round" fill="none" />}

      {stage === 1 && <MapleLeaf cx={52} cy={36} s={6} fill="#DC2626" />}
      {stage === 2 && (
        <>
          <MapleLeaf cx={52} cy={32} s={7} fill="#DC2626" />
          <MapleLeaf cx={32} cy={50} s={5} fill="#EA580C" />
        </>
      )}
      {stage === 3 && (
        <>
          <MapleLeaf cx={52} cy={28} s={8} fill="#DC2626" />
          <MapleLeaf cx={32} cy={50} s={6} fill="#EA580C" />
          <MapleLeaf cx={70} cy={38} s={6} fill="#F97316" />
          <MapleLeaf cx={42} cy={36} s={5} fill="#B91C1C" />
        </>
      )}
      {stage === 4 && (
        <>
          <MapleLeaf cx={52} cy={26} s={9} fill="#DC2626" />
          <MapleLeaf cx={30} cy={48} s={7} fill="#EA580C" />
          <MapleLeaf cx={70} cy={38} s={7} fill="#F97316" />
          <MapleLeaf cx={36} cy={62} s={6} fill="#DC2626" />
          <MapleLeaf cx={42} cy={36} s={5} fill="#B91C1C" />
          <MapleLeaf cx={62} cy={28} s={5} fill="#F59E0B" />
        </>
      )}
      {stage === 5 && (
        <>
          <MapleLeaf cx={52} cy={22} s={10} fill="#DC2626" />
          <MapleLeaf cx={26} cy={44} s={8} fill="#EA580C" />
          <MapleLeaf cx={72} cy={36} s={8} fill="#F97316" />
          <MapleLeaf cx={34} cy={62} s={7} fill="#DC2626" />
          <MapleLeaf cx={66} cy={64} s={7} fill="#EA580C" />
          <MapleLeaf cx={42} cy={32} s={6} fill="#B91C1C" />
          <MapleLeaf cx={62} cy={26} s={6} fill="#F59E0B" />
          <MapleLeaf cx={50} cy={42} s={5} fill="#DC2626" />
        </>
      )}
      {/* Few fallen leaves on pot rim - autumnal feel */}
      {stage >= 3 && <MapleLeaf cx={26} cy={92} s={3} fill="#B91C1C" />}
      {stage >= 4 && <MapleLeaf cx={74} cy={92} s={3} fill="#EA580C" />}
    </Svg>
  );
}

export function SerissaMascot({ stage, size }: MascotComponentProps) {
  // Dense canopy with many tiny white star flowers
  function StarFlower({ cx, cy, s }: { cx: number; cy: number; s: number }) {
    return (
      <>
        {[0, 72, 144, 216, 288].map((a, i) => {
          const rad = (a * Math.PI) / 180;
          return (
            <Ellipse
              key={i}
              cx={cx + Math.cos(rad - Math.PI / 2) * s * 0.5}
              cy={cy + Math.sin(rad - Math.PI / 2) * s * 0.5}
              rx={s * 0.35}
              ry={s * 0.5}
              fill="#FFFFFF"
              transform={`rotate(${a} ${cx} ${cy})`}
            />
          );
        })}
        <Circle cx={cx} cy={cy} r={s * 0.2} fill="#FDE68A" />
      </>
    );
  }
  return (
    <Svg width={size} height={size} viewBox={VB}>
      <FlatPot />
      <Path d="M50 91 Q46 76 52 64 Q48 56 51 46" stroke="#7C5036" strokeWidth="3" strokeLinecap="round" fill="none" />
      {stage >= 2 && <Path d="M52 64 Q42 60 36 54" stroke="#7C5036" strokeWidth="2" strokeLinecap="round" fill="none" />}
      {stage >= 3 && <Path d="M51 56 Q60 50 66 42" stroke="#7C5036" strokeWidth="2" strokeLinecap="round" fill="none" />}
      {stage >= 4 && <Path d="M50 72 Q44 70 38 66" stroke="#7C5036" strokeWidth="1.8" strokeLinecap="round" fill="none" />}

      {stage === 1 && (
        <>
          <Ellipse cx="51" cy="46" rx="11" ry="7" fill="#22C55E" />
          {[[46, 42], [52, 48], [48, 50], [54, 44]].map(([x, y], i) => (
            <StarFlower key={i} cx={x} cy={y} s={2.2} />
          ))}
        </>
      )}
      {stage === 2 && (
        <>
          <Ellipse cx="51" cy="42" rx="14" ry="8" fill="#22C55E" />
          <Ellipse cx="36" cy="54" rx="10" ry="6" fill="#16A34A" />
          {[[44, 38], [52, 44], [54, 40], [60, 44], [40, 42], [34, 52], [38, 56]].map(
            ([x, y], i) => (
              <StarFlower key={i} cx={x} cy={y} s={2.2} />
            )
          )}
        </>
      )}
      {stage === 3 && (
        <>
          <Ellipse cx="51" cy="38" rx="17" ry="9" fill="#22C55E" />
          <Ellipse cx="36" cy="54" rx="12" ry="7" fill="#16A34A" />
          <Ellipse cx="66" cy="42" rx="11" ry="7" fill="#16A34A" />
          {[
            [42, 34],
            [50, 38],
            [58, 36],
            [52, 42],
            [60, 40],
            [34, 52],
            [40, 56],
            [62, 40],
            [70, 44],
          ].map(([x, y], i) => (
            <StarFlower key={i} cx={x} cy={y} s={2.3} />
          ))}
        </>
      )}
      {stage === 4 && (
        <>
          <Ellipse cx="50" cy="34" rx="20" ry="10" fill="#22C55E" />
          <Ellipse cx="32" cy="52" rx="13" ry="8" fill="#16A34A" />
          <Ellipse cx="68" cy="42" rx="13" ry="8" fill="#16A34A" />
          <Ellipse cx="38" cy="66" rx="9" ry="6" fill="#16A34A" />
          {[
            [40, 30], [48, 34], [56, 32], [52, 38], [44, 36], [60, 36],
            [28, 50], [34, 54], [38, 50], [62, 40], [70, 42], [66, 46],
            [36, 64], [42, 68],
          ].map(([x, y], i) => (
            <StarFlower key={i} cx={x} cy={y} s={2.3} />
          ))}
        </>
      )}
      {stage === 5 && (
        <>
          <Ellipse cx="50" cy="30" rx="24" ry="11" fill="#22C55E" />
          <Ellipse cx="28" cy="48" rx="14" ry="9" fill="#16A34A" />
          <Ellipse cx="72" cy="40" rx="14" ry="9" fill="#16A34A" />
          <Ellipse cx="36" cy="64" rx="10" ry="6" fill="#16A34A" />
          <Ellipse cx="64" cy="66" rx="10" ry="6" fill="#16A34A" />
          {[
            [38, 26], [46, 30], [54, 28], [60, 32], [50, 34], [42, 32],
            [22, 46], [28, 50], [34, 46], [66, 38], [72, 42], [78, 44],
            [34, 62], [40, 66], [62, 64], [68, 68],
          ].map(([x, y], i) => (
            <StarFlower key={i} cx={x} cy={y} s={2.4} />
          ))}
        </>
      )}
    </Svg>
  );
}

export function AzaleeBonsaiMascot({ stage, size }: MascotComponentProps) {
  // Lush pink flowering azalea
  return (
    <Svg width={size} height={size} viewBox={VB}>
      <Defs>
        <LinearGradient id="azaleeFlowers" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#F9A8D4" />
          <Stop offset="0.5" stopColor="#EC4899" />
          <Stop offset="1" stopColor="#BE185D" />
        </LinearGradient>
      </Defs>
      <FlatPot />
      <Path d="M50 91 Q46 80 52 68 Q47 58 51 48" stroke="#5C3A1F" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      {stage >= 2 && <Path d="M52 68 Q40 62 34 56" stroke="#5C3A1F" strokeWidth="2.5" strokeLinecap="round" fill="none" />}
      {stage >= 3 && <Path d="M51 56 Q62 50 68 40" stroke="#5C3A1F" strokeWidth="2.5" strokeLinecap="round" fill="none" />}
      {stage >= 4 && <Path d="M50 70 Q42 70 34 66" stroke="#5C3A1F" strokeWidth="2" strokeLinecap="round" fill="none" />}

      {/* Foliage base */}
      {stage >= 1 && <Ellipse cx="51" cy="48" rx="11" ry="7" fill="#16A34A" />}
      {stage >= 2 && <Ellipse cx="34" cy="56" rx="10" ry="6" fill="#15803D" />}
      {stage >= 3 && <Ellipse cx="68" cy="40" rx="11" ry="7" fill="#15803D" />}
      {stage >= 4 && (
        <>
          <Ellipse cx="50" cy="32" rx="15" ry="8" fill="#16A34A" />
          <Ellipse cx="34" cy="68" rx="9" ry="5" fill="#15803D" />
        </>
      )}
      {stage >= 5 && (
        <>
          <Ellipse cx="28" cy="38" rx="11" ry="7" fill="#16A34A" />
          <Ellipse cx="72" cy="58" rx="11" ry="7" fill="#15803D" />
          <Ellipse cx="64" cy="68" rx="9" ry="5" fill="#15803D" />
        </>
      )}

      {/* Pink flower bouquets - signature feature */}
      {stage === 1 && (
        <>
          <Circle cx="48" cy="46" r="3.5" fill="url(#azaleeFlowers)" />
          <Circle cx="54" cy="50" r="3" fill="#EC4899" />
          <Circle cx="46" cy="44" r="1" fill="#FBCFE8" />
        </>
      )}
      {stage === 2 && (
        <>
          {[[46, 44], [54, 48], [38, 56], [52, 42], [34, 54]].map(([cx, cy], i) => (
            <Circle key={i} cx={cx} cy={cy} r="3.5" fill="url(#azaleeFlowers)" />
          ))}
          {[[44, 42], [52, 46], [36, 54]].map(([cx, cy], i) => (
            <Circle key={i} cx={cx} cy={cy} r="1.2" fill="#FBCFE8" />
          ))}
        </>
      )}
      {stage === 3 && (
        <>
          {[[42, 44], [50, 40], [56, 46], [38, 52], [30, 56], [60, 36], [70, 42]].map(([cx, cy], i) => (
            <Circle key={i} cx={cx} cy={cy} r="3.8" fill="url(#azaleeFlowers)" />
          ))}
          {[[40, 42], [48, 38], [54, 44], [36, 50], [68, 40]].map(([cx, cy], i) => (
            <Circle key={i} cx={cx} cy={cy} r="1.3" fill="#FBCFE8" />
          ))}
        </>
      )}
      {stage === 4 && (
        <>
          {[
            [40, 32], [48, 28], [56, 32], [52, 38], [60, 36],
            [28, 50], [36, 54], [40, 50], [38, 64], [42, 70],
            [62, 36], [70, 38], [62, 44],
          ].map(([cx, cy], i) => (
            <Circle key={i} cx={cx} cy={cy} r="4" fill="url(#azaleeFlowers)" />
          ))}
          {[[42, 30], [50, 26], [58, 30], [30, 48], [38, 52], [64, 34]].map(([cx, cy], i) => (
            <Circle key={i} cx={cx} cy={cy} r="1.4" fill="#FBCFE8" />
          ))}
        </>
      )}
      {stage === 5 && (
        <>
          {[
            [40, 28], [48, 24], [56, 28], [52, 36], [44, 36], [60, 32], [38, 40],
            [22, 38], [28, 42], [32, 36], [26, 32],
            [70, 56], [78, 60], [72, 50], [66, 64],
            [38, 66], [44, 70], [50, 64], [60, 68], [66, 64],
          ].map(([cx, cy], i) => (
            <Circle key={i} cx={cx} cy={cy} r="4.2" fill="url(#azaleeFlowers)" />
          ))}
          {[[42, 26], [50, 22], [58, 26], [24, 36], [30, 40], [70, 54], [76, 58], [40, 64], [50, 62]].map(([cx, cy], i) => (
            <Circle key={i} cx={cx} cy={cy} r="1.5" fill="#FBCFE8" />
          ))}
        </>
      )}
    </Svg>
  );
}

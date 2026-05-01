import React from 'react';
import { Circle, Defs, Ellipse, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

export type Stage = 1 | 2 | 3 | 4 | 5;

export interface MascotComponentProps {
  stage: Stage;
  size: number;
}

export function StandardPot() {
  return (
    <>
      <Defs>
        <LinearGradient id="potBody" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor="#A0714F" />
          <Stop offset="0.5" stopColor="#8B5E3C" />
          <Stop offset="1" stopColor="#6B4423" />
        </LinearGradient>
      </Defs>
      <Path d="M28 90 L72 90 L70 115 L30 115 Z" fill="url(#potBody)" />
      <Rect x="26" y="86" width="48" height="7" rx="2" fill="#A87A56" />
      <Rect x="26" y="86" width="48" height="2" rx="1" fill="#C99B79" />
      <Rect x="26" y="91" width="48" height="2" rx="1" fill="#5C3317" opacity="0.5" />
      <Ellipse cx="50" cy="89" rx="20" ry="3" fill="#3E2A1B" />
      <Ellipse cx="50" cy="88.5" rx="18" ry="1.5" fill="#241409" opacity="0.7" />
    </>
  );
}

export function FlatPot() {
  return (
    <>
      <Defs>
        <LinearGradient id="flatPotBody" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#A0714F" />
          <Stop offset="1" stopColor="#6B4423" />
        </LinearGradient>
      </Defs>
      <Rect x="20" y="95" width="60" height="14" rx="3" fill="url(#flatPotBody)" />
      <Rect x="17" y="91" width="66" height="6" rx="2" fill="#A87A56" />
      <Rect x="17" y="91" width="66" height="1.5" rx="1" fill="#C99B79" />
      <Ellipse cx="50" cy="91.5" rx="30" ry="3" fill="#3E2A1B" />
      <Ellipse cx="50" cy="91" rx="27" ry="1.2" fill="#241409" opacity="0.7" />
    </>
  );
}

export function HangingPot() {
  return (
    <>
      <Defs>
        <LinearGradient id="hangPot" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#C2856A" />
          <Stop offset="1" stopColor="#8B5E3C" />
        </LinearGradient>
      </Defs>
      {/* Macramé hanging strings - 4 cords meeting at top */}
      <Path d="M32 84 Q40 50 50 14" stroke="#D4A574" strokeWidth="0.7" fill="none" />
      <Path d="M68 84 Q60 50 50 14" stroke="#D4A574" strokeWidth="0.7" fill="none" />
      <Path d="M40 86 Q45 52 50 14" stroke="#D4A574" strokeWidth="0.7" fill="none" opacity="0.7" />
      <Path d="M60 86 Q55 52 50 14" stroke="#D4A574" strokeWidth="0.7" fill="none" opacity="0.7" />
      {/* Knot cluster mid-string */}
      <Circle cx="36" cy="56" r="1.5" fill="#A0714F" />
      <Circle cx="64" cy="56" r="1.5" fill="#A0714F" />
      <Circle cx="44" cy="58" r="1.2" fill="#A0714F" opacity="0.7" />
      <Circle cx="56" cy="58" r="1.2" fill="#A0714F" opacity="0.7" />
      {/* Top knot */}
      <Circle cx="50" cy="14" r="2" fill="#8B5E3C" />
      <Path d="M48 12 L52 12" stroke="#5C3317" strokeWidth="0.8" />
      {/* Pot body */}
      <Path d="M30 84 L70 84 L66 102 L34 102 Z" fill="url(#hangPot)" />
      <Rect x="28" y="80" width="44" height="6" rx="2" fill="#C2856A" />
      <Rect x="28" y="80" width="44" height="1.5" rx="1" fill="#D4A574" />
      <Ellipse cx="50" cy="83" rx="18" ry="2.5" fill="#3E2A1B" />
      <Ellipse cx="50" cy="82.5" rx="16" ry="1" fill="#241409" opacity="0.7" />
    </>
  );
}

export function GlassVase() {
  return (
    <>
      <Defs>
        <LinearGradient id="glassBody" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#E0F2FE" stopOpacity="0.5" />
          <Stop offset="0.5" stopColor="#BAE6FD" stopOpacity="0.4" />
          <Stop offset="1" stopColor="#7DD3FC" stopOpacity="0.55" />
        </LinearGradient>
      </Defs>
      {/* Glass body */}
      <Path d="M32 88 L68 88 L66 112 L34 112 Z" fill="url(#glassBody)" />
      <Path d="M32 88 L68 88" stroke="#7DD3FC" strokeWidth="1.2" />
      {/* Highlights */}
      <Path d="M34 96 L34 110" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.85" />
      <Path d="M66 96 L66 108" stroke="#FFFFFF" strokeWidth="0.7" opacity="0.45" />
      {/* Water level */}
      <Path d="M33 100 L67 100" stroke="#0EA5E9" strokeWidth="0.6" opacity="0.6" />
      <Path d="M34 100 Q40 99 50 100 Q60 101 66 100" stroke="#7DD3FC" strokeWidth="0.4" opacity="0.7" fill="none" />
      {/* Small pebbles at bottom */}
      <Circle cx="42" cy="108" r="2" fill="#9CA3AF" opacity="0.7" />
      <Circle cx="50" cy="109" r="2.2" fill="#6B7280" opacity="0.7" />
      <Circle cx="58" cy="108" r="1.8" fill="#9CA3AF" opacity="0.7" />
    </>
  );
}

export function CeramicPot({ color = '#E5E7EB', accent = '#9CA3AF' }: { color?: string; accent?: string }) {
  return (
    <>
      <Path d="M28 90 Q26 102 30 115 L70 115 Q74 102 72 90 Z" fill={color} />
      <Path d="M28 90 L72 90" stroke={accent} strokeWidth="1.5" />
      <Rect x="26" y="86" width="48" height="6" rx="2" fill={color} />
      <Path d="M26 86 L74 86 L74 88 L26 88 Z" fill={accent} opacity="0.4" />
      <Ellipse cx="50" cy="89" rx="20" ry="2.5" fill="#3E2A1B" />
      <Ellipse cx="50" cy="88.5" rx="17" ry="1" fill="#241409" opacity="0.6" />
    </>
  );
}

export function leafVein(cx: number, cy: number, length: number, rotation: number, color = '#FFFFFF', opacity = 0.4) {
  return (
    <Path
      d={`M${cx} ${cy - length / 2} L${cx} ${cy + length / 2}`}
      stroke={color}
      strokeWidth="0.6"
      opacity={opacity}
      transform={`rotate(${rotation} ${cx} ${cy})`}
    />
  );
}

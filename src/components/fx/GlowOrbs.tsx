import React from 'react';
import { StyleSheet } from 'react-native';
import { BlurMask, Canvas, Circle } from '@shopify/react-native-skia';

interface GlowOrbsProps {
  width: number;
  height: number;
  colorA?: string;
  colorB?: string;
}

/** Soft Skia-rendered glow orbs for layered hero depth. */
export function GlowOrbs({
  width,
  height,
  colorA = 'rgba(99, 102, 241, 0.55)',
  colorB = 'rgba(251, 191, 36, 0.35)',
}: GlowOrbsProps) {
  return (
    <Canvas pointerEvents="none" style={[StyleSheet.absoluteFill, { width, height }]}>
      <Circle cx={width * 0.15} cy={height * 0.2} r={width * 0.35} color={colorA}>
        <BlurMask blur={70} style="normal" />
      </Circle>
      <Circle cx={width * 0.9} cy={height * 0.85} r={width * 0.3} color={colorB}>
        <BlurMask blur={80} style="normal" />
      </Circle>
    </Canvas>
  );
}

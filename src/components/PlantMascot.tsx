import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { getGrowthStage } from '../hooks/useCareLogic';
import { getMascotComponent } from '../mascots/registry';

interface PlantMascotProps {
  speciesId: string;
  ageInDays: number;
  size?: number;
}

export function PlantMascot({ speciesId, ageInDays, size = 200 }: PlantMascotProps) {
  const stage = getGrowthStage(ageInDays);
  const Mascot = getMascotComponent(speciesId);

  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withSequence(
        withTiming(3, { duration: 1800, easing: Easing.inOut(Easing.sin) }),
        withTiming(-3, { duration: 1800, easing: Easing.inOut(Easing.sin) }),
        withTiming(0, { duration: 1800, easing: Easing.inOut(Easing.sin) })
      ),
      -1,
      false
    );
  }, [rotation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Animated.View style={animatedStyle}>
        <Mascot stage={stage} size={size} />
      </Animated.View>
    </View>
  );
}

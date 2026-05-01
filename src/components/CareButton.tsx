import { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import { formatDate, formatNextCareDate } from '../hooks/useCareLogic';
import { CareType, usePlantStore } from '../store/usePlantStore';
import { colors } from '../theme';

interface CareButtonProps {
  plantId: string;
  type: CareType;
  adjustedDays?: number;
}

const CARE_CONFIG: Record<CareType, { emoji: string; label: string; color: string }> = {
  watering: { emoji: '💧', label: 'Arroser', color: colors.blue900 },
  fertilizing: { emoji: '🌱', label: 'Engrais', color: colors.yellow900 },
  repotting: { emoji: '🪴', label: 'Rempoter', color: colors.amber900 },
  pruning: { emoji: '✂️', label: 'Tailler', color: colors.green900 },
};

export function CareButton({ plantId, type, adjustedDays }: CareButtonProps) {
  const { logCare, getLastCare, getNextCareDate } = usePlantStore();
  const scale = useSharedValue(1);

  const lastCare = getLastCare(plantId, type);
  const nextCare = getNextCareDate(plantId, type, adjustedDays);
  const config = CARE_CONFIG[type];

  const isOverdue = nextCare ? new Date(nextCare) < new Date() : false;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = useCallback(() => {
    scale.value = withSequence(withSpring(0.9), withSpring(1.05), withSpring(1));
    logCare(plantId, type);
  }, [plantId, type, logCare, scale]);

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.8}
        style={[styles.button, { backgroundColor: config.color }]}
      >
        <Text style={{ fontSize: 28, marginBottom: 4 }}>{config.emoji}</Text>
        <Text style={styles.label}>{config.label}</Text>
        <View style={{ marginTop: 8, alignItems: 'center' }}>
          {isOverdue ? (
            <View style={styles.overdue}>
              <Text style={{ color: colors.white, fontSize: 12, fontWeight: 'bold' }}>
                Maintenant !
              </Text>
            </View>
          ) : (
            <Text style={{ color: colors.bark400, fontSize: 12 }}>
              {nextCare ? formatNextCareDate(nextCare) : '—'}
            </Text>
          )}
          <Text style={{ color: colors.bark600, fontSize: 12, marginTop: 2 }}>
            Dernier : {formatDate(lastCare)}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: { borderRadius: 16, padding: 16, alignItems: 'center' },
  label: { color: colors.bark100, fontWeight: '600', fontSize: 14 },
  overdue: {
    backgroundColor: colors.red500,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
});

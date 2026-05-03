import { Feather } from '@expo/vector-icons';
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

const CARE_CONFIG: Record<
  CareType,
  {
    icon: React.ComponentProps<typeof Feather>['name'];
    label: string;
    bg: string;
    text: string;
  }
> = {
  watering: { icon: 'droplet', label: 'Arroser', bg: colors.waterBg, text: colors.waterText },
  fertilizing: { icon: 'feather', label: 'Engrais', bg: colors.fertBg, text: colors.fertText },
  repotting: { icon: 'package', label: 'Rempoter', bg: colors.repotBg, text: colors.repotText },
  pruning: { icon: 'scissors', label: 'Tailler', bg: colors.pruneBg, text: colors.pruneText },
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
    scale.value = withSequence(withSpring(0.92), withSpring(1.04), withSpring(1));
    logCare(plantId, type);
  }, [plantId, type, logCare, scale]);

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.85}
        style={styles.button}
      >
        <View style={[styles.iconWrapper, { backgroundColor: config.bg }]}>
          <Feather name={config.icon} size={18} color={config.text} />
        </View>
        <Text style={styles.label}>{config.label}</Text>
        <View style={{ alignItems: 'center', gap: 2 }}>
          {isOverdue ? (
            <View style={styles.overdue}>
              <Text style={styles.overdueText}>Maintenant !</Text>
            </View>
          ) : (
            <Text style={[styles.next, { color: config.text }]}>
              {nextCare ? formatNextCareDate(nextCare) : '—'}
            </Text>
          )}
          <Text style={styles.lastText}>Dernier : {formatDate(lastCare)}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 12,
    alignItems: 'center',
    gap: 8,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: { color: colors.text, fontWeight: '600', fontSize: 14 },
  next: { fontSize: 12, fontWeight: '600' },
  lastText: { color: colors.textSubtle, fontSize: 11 },
  overdue: {
    backgroundColor: colors.dangerBg,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  overdueText: { color: colors.dangerText, fontSize: 11, fontWeight: '700' },
});

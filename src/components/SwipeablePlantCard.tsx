import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { getSpeciesById } from '../data/species';
import { formatNextCareDate, getGrowthStage } from '../hooks/useCareLogic';
import { CareType, usePlantStore } from '../store/usePlantStore';
import { colors } from '../theme';

interface SwipeablePlantCardProps {
  plantId: string;
  onDelete: (id: string) => void;
}

const SWIPE_THRESHOLD = -80;

export function SwipeablePlantCard({ plantId, onDelete }: SwipeablePlantCardProps) {
  const router = useRouter();
  const { plants, getAgeInDays, getStreak, getNextCareDate, setActivePlant } = usePlantStore();
  const plant = plants.find((p) => p.id === plantId);

  const translateX = useSharedValue(0);
  const deleteOpacity = useSharedValue(0);

  if (!plant) return null;

  const species = getSpeciesById(plant.speciesId);
  const ageInDays = getAgeInDays(plantId);
  const streak = getStreak(plantId);
  const stage = getGrowthStage(ageInDays);
  const nextWatering = getNextCareDate(plantId, 'watering' as CareType);

  function handleDelete() {
    onDelete(plantId);
  }

  const panGesture = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .onUpdate((e) => {
      if (e.translationX < 0) {
        translateX.value = Math.max(e.translationX, -120);
        deleteOpacity.value = Math.min(Math.abs(e.translationX) / 80, 1);
      }
    })
    .onEnd((e) => {
      if (e.translationX < SWIPE_THRESHOLD) {
        translateX.value = withTiming(-120);
        deleteOpacity.value = withTiming(1);
      } else {
        translateX.value = withSpring(0);
        deleteOpacity.value = withTiming(0);
      }
    });

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const deleteStyle = useAnimatedStyle(() => ({ opacity: deleteOpacity.value }));

  function handlePress() {
    setActivePlant(plantId);
    router.push(`/plant/${plantId}`);
  }

  const stageEmoji = ['🌱', '🌿', '🪴', '🌳', '🌟'][stage - 1];

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.deleteBg, deleteStyle]}>
        <TouchableOpacity
          onPress={handleDelete}
          style={{ alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', gap: 4 }}
          activeOpacity={0.85}
        >
          <Feather name="trash-2" size={22} color={colors.white} />
          <Text style={styles.deleteText}>Supprimer</Text>
        </TouchableOpacity>
      </Animated.View>

      <GestureDetector gesture={panGesture}>
        <Animated.View style={cardStyle}>
          <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.85}
            style={styles.card}
          >
            <View style={styles.emojiBox}>
              <Text style={{ fontSize: 28 }}>{species?.emoji ?? '🌿'}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Text style={styles.name}>{plant.name}</Text>
                <Text style={{ fontSize: 12 }}>{stageEmoji}</Text>
              </View>
              <Text style={styles.species}>{species?.name}</Text>
              <View style={{ flexDirection: 'row', gap: 14, marginTop: 8 }}>
                <View style={styles.metaItem}>
                  <Feather name="droplet" size={11} color={colors.waterText} />
                  <Text style={styles.metaText}>{formatNextCareDate(nextWatering)}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Feather name="zap" size={11} color={colors.brand} />
                  <Text style={styles.metaText}>{streak}j</Text>
                </View>
                <View style={styles.metaItem}>
                  <Feather name="calendar" size={11} color={colors.textSubtle} />
                  <Text style={styles.metaText}>{ageInDays}j</Text>
                </View>
              </View>
            </View>
            <Feather name="chevron-right" size={20} color={colors.textSubtle} />
          </TouchableOpacity>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 10, borderRadius: 16, overflow: 'hidden' },
  deleteBg: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 112,
    backgroundColor: colors.danger,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteText: { color: colors.white, fontSize: 12, fontWeight: '600' },
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  emojiBox: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: colors.brandSofter,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: { color: colors.text, fontWeight: '700', fontSize: 15 },
  species: { color: colors.textSubtle, fontSize: 12, marginTop: 2 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { color: colors.textMuted, fontSize: 12, fontWeight: '500' },
});

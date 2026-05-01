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
          style={{ alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}
        >
          <Text style={{ fontSize: 24 }}>🗑️</Text>
          <Text style={{ color: colors.white, fontSize: 12, fontWeight: '500', marginTop: 4 }}>
            Supprimer
          </Text>
        </TouchableOpacity>
      </Animated.View>

      <GestureDetector gesture={panGesture}>
        <Animated.View style={cardStyle}>
          <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.8}
            style={styles.card}
          >
            <View style={styles.emojiBox}>
              <Text style={{ fontSize: 28 }}>{species?.emoji ?? '🌿'}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text style={styles.name}>{plant.name}</Text>
                <Text style={{ fontSize: 12 }}>{stageEmoji}</Text>
              </View>
              <Text style={styles.species}>{species?.name}</Text>
              <View style={{ flexDirection: 'row', gap: 12, marginTop: 8 }}>
                <View style={styles.metaItem}>
                  <Text style={{ fontSize: 12 }}>💧</Text>
                  <Text style={styles.metaText}>{formatNextCareDate(nextWatering)}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Text style={{ fontSize: 12 }}>🔥</Text>
                  <Text style={styles.metaText}>{streak}j</Text>
                </View>
                <View style={styles.metaItem}>
                  <Text style={{ fontSize: 12 }}>📅</Text>
                  <Text style={styles.metaText}>{ageInDays}j</Text>
                </View>
              </View>
            </View>
            <Text style={{ color: colors.bark600, fontSize: 18 }}>›</Text>
          </TouchableOpacity>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 12, borderRadius: 16, overflow: 'hidden' },
  deleteBg: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 112,
    backgroundColor: colors.red500,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: colors.forest700,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  emojiBox: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: colors.forest800,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  name: { color: colors.bark100, fontWeight: '600', fontSize: 16 },
  species: { color: colors.bark600, fontSize: 12, marginTop: 2 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { color: colors.bark400, fontSize: 12 },
});

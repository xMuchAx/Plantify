import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PlantMascot } from '../../src/components/PlantMascot';
import { getSpeciesById } from '../../src/data/species';
import { getAdjustedWateringDays, getGrowthStage } from '../../src/hooks/useCareLogic';
import { useWeather } from '../../src/hooks/useWeather';
import { usePlantStore } from '../../src/store/usePlantStore';
import { colors } from '../../src/theme';

const STAGE_LABELS = ['Graine', 'Pousse', 'Jeune plante', 'Plante mature', 'Épanouie'];

export default function HomeScreen() {
  const router = useRouter();
  const { getActivePlant, getAgeInDays, getStreak, getNextCareDate } = usePlantStore();
  const weather = useWeather();

  const activePlant = getActivePlant();
  const species = activePlant ? getSpeciesById(activePlant.speciesId) : null;

  const ageInDays = activePlant ? getAgeInDays(activePlant.id) : 0;
  const streak = activePlant ? getStreak(activePlant.id) : 0;
  const stage = getGrowthStage(ageInDays);

  const adjustedWatering = species
    ? getAdjustedWateringDays(species.wateringFrequencyDays, weather.temp, weather.humidity)
    : 7;

  const nextWatering = activePlant
    ? getNextCareDate(activePlant.id, 'watering', adjustedWatering)
    : null;

  const daysUntilWatering = nextWatering
    ? Math.ceil((new Date(nextWatering).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;

  const weatherEmoji =
    {
      Clear: '☀️',
      Clouds: '☁️',
      Rain: '🌧️',
      Drizzle: '🌦️',
      Thunderstorm: '⛈️',
      Snow: '❄️',
      Mist: '🌫️',
      Fog: '🌫️',
    }[weather.condition] ?? '🌡️';

  if (!activePlant || !species) {
    return (
      <SafeAreaView style={styles.emptyContainer}>
        <Text style={styles.emptyEmoji}>🌱</Text>
        <Text style={styles.emptyTitle}>Bienvenue sur Plantify</Text>
        <Text style={styles.emptyText}>
          Ajoute ta première plante pour commencer à prendre soin d'elle.
        </Text>
        <TouchableOpacity
          onPress={() => router.push('/(tabs)/discover')}
          style={styles.primaryButton}
        >
          <Text style={styles.primaryButtonText}>Découvrir des plantes</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>{activePlant.name}</Text>
            <Text style={styles.subtitle}>{species.name}</Text>
          </View>
          <View style={styles.weatherPill}>
            <Text>{weatherEmoji}</Text>
            <Text style={styles.weatherText}>{weather.temp}°C</Text>
          </View>
        </View>

        {weather.isHeatAlert && (
          <View style={styles.alertBox}>
            <Text style={{ fontSize: 18 }}>🔥</Text>
            <Text style={styles.alertText}>
              Forte chaleur — surveille l'hydratation de {activePlant.name}
            </Text>
          </View>
        )}

        <View style={styles.cardsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Âge</Text>
            <Text style={styles.statValue}>{ageInDays}</Text>
            <Text style={styles.statUnit}>jours</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Streak</Text>
            <Text style={[styles.statValue, { color: colors.leaf400 }]}>{streak}</Text>
            <Text style={styles.statUnit}>🔥 de suite</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Arrosage</Text>
            <Text style={[styles.statValue, { color: colors.blue300 }]}>
              {daysUntilWatering !== null
                ? daysUntilWatering <= 0
                  ? '!'
                  : `J-${daysUntilWatering}`
                : '—'}
            </Text>
            <Text style={styles.statUnit}>jours</Text>
          </View>
        </View>

        <View style={styles.mascotSection}>
          <PlantMascot speciesId={species.id} ageInDays={ageInDays} size={220} />
          <View style={styles.stagePill}>
            <Text style={styles.stagePillText}>
              Stade {stage} · {STAGE_LABELS[stage - 1]}
            </Text>
          </View>
        </View>

        <View style={styles.tipBox}>
          <Text style={styles.tipLabel}>Conseil du jour</Text>
          <Text style={styles.tipText}>{species.wateringTips}</Text>
        </View>

        <TouchableOpacity
          onPress={() => router.push(`/plant/${activePlant.id}`)}
          style={styles.detailButton}
        >
          <Text style={styles.detailButtonText}>Voir tous les soins</Text>
          <Text style={{ color: colors.forest900 }}>→</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.forest900 },
  emptyContainer: {
    flex: 1,
    backgroundColor: colors.forest900,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  emptyEmoji: { fontSize: 64, marginBottom: 24 },
  emptyTitle: {
    color: colors.bark100,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyText: { color: colors.bark600, textAlign: 'center', marginBottom: 32 },
  primaryButton: {
    backgroundColor: colors.leaf400,
    borderRadius: 999,
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  primaryButtonText: { color: colors.forest900, fontWeight: 'bold', fontSize: 16 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: { color: colors.bark100, fontSize: 24, fontWeight: 'bold' },
  subtitle: { color: colors.bark600, fontSize: 14 },
  weatherPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.forest700,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 4,
  },
  weatherText: { color: colors.bark100, fontWeight: '600', fontSize: 14 },
  alertBox: {
    marginHorizontal: 24,
    marginBottom: 12,
    backgroundColor: colors.orange900,
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  alertText: { color: colors.orange200, fontSize: 14, flex: 1 },
  cardsRow: { flexDirection: 'row', paddingHorizontal: 24, gap: 12, marginBottom: 24 },
  statCard: {
    flex: 1,
    backgroundColor: colors.forest700,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  statLabel: { color: colors.bark400, fontSize: 12, marginBottom: 4 },
  statValue: { color: colors.bark100, fontSize: 24, fontWeight: 'bold' },
  statUnit: { color: colors.bark600, fontSize: 12 },
  mascotSection: { alignItems: 'center', paddingVertical: 16 },
  stagePill: {
    marginTop: 16,
    backgroundColor: colors.forest700,
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  stagePillText: { color: colors.leaf400, fontSize: 14, fontWeight: '600' },
  tipBox: {
    marginHorizontal: 24,
    marginTop: 16,
    backgroundColor: colors.forest700,
    borderRadius: 16,
    padding: 16,
  },
  tipLabel: {
    color: colors.bark400,
    fontSize: 12,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tipText: { color: colors.bark100, fontSize: 14, lineHeight: 20 },
  detailButton: {
    marginHorizontal: 24,
    marginTop: 16,
    backgroundColor: colors.leaf400,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  detailButtonText: { color: colors.forest900, fontWeight: 'bold', fontSize: 16 },
});

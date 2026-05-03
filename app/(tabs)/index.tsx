import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PlantMascot } from '../../src/components/PlantMascot';
import { getSpeciesById } from '../../src/data/species';
import { getAdjustedWateringDays, getGrowthStage } from '../../src/hooks/useCareLogic';
import { useWeather } from '../../src/hooks/useWeather';
import { usePlantStore } from '../../src/store/usePlantStore';
import { colors, shadow } from '../../src/theme';

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
        <View style={styles.emptyIcon}>
          <Text style={{ fontSize: 48 }}>🌱</Text>
        </View>
        <Text style={styles.emptyTitle}>Bienvenue sur Plantify</Text>
        <Text style={styles.emptyText}>
          Ajoute ta première plante pour commencer à prendre soin d'elle.
        </Text>
        <TouchableOpacity
          onPress={() => router.push('/(tabs)/discover')}
          style={styles.primaryButton}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryButtonText}>Découvrir des plantes</Text>
          <Feather name="arrow-right" size={18} color={colors.textInverse} />
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
            <Text style={styles.greeting}>Bonjour</Text>
            <Text style={styles.title}>{activePlant.name}</Text>
            <Text style={styles.subtitle}>{species.name}</Text>
          </View>
          <View style={styles.weatherPill}>
            <Text style={{ fontSize: 14 }}>{weatherEmoji}</Text>
            <Text style={styles.weatherText}>{weather.temp}°C</Text>
          </View>
        </View>

        {weather.isHeatAlert && (
          <View style={styles.alertBox}>
            <View style={styles.alertIcon}>
              <Text style={{ fontSize: 14 }}>🔥</Text>
            </View>
            <Text style={styles.alertText}>
              Forte chaleur — surveille l'hydratation de {activePlant.name}
            </Text>
          </View>
        )}

        {/* Mascot */}
        <View style={styles.mascotSection}>
          <PlantMascot speciesId={species.id} ageInDays={ageInDays} size={220} />
          <View style={styles.stagePill}>
            <View style={styles.stageDot} />
            <Text style={styles.stagePillText}>
              Stade {stage} · {STAGE_LABELS[stage - 1]}
            </Text>
          </View>
        </View>

        {/* Info cards */}
        <View style={styles.cardsRow}>
          <View style={styles.statCard}>
            <Feather name="calendar" size={16} color={colors.brand} />
            <Text style={styles.statValue}>{ageInDays}</Text>
            <Text style={styles.statLabel}>jours</Text>
          </View>
          <View style={styles.statCard}>
            <Feather name="zap" size={16} color={colors.brand} />
            <Text style={styles.statValue}>{streak}</Text>
            <Text style={styles.statLabel}>streak</Text>
          </View>
          <View style={styles.statCard}>
            <Feather name="droplet" size={16} color={colors.brand} />
            <Text style={styles.statValue}>
              {daysUntilWatering !== null
                ? daysUntilWatering <= 0
                  ? '!'
                  : `${daysUntilWatering}j`
                : '—'}
            </Text>
            <Text style={styles.statLabel}>arrosage</Text>
          </View>
        </View>

        {/* Tip */}
        <View style={styles.tipBox}>
          <View style={styles.tipHeader}>
            <Feather name="info" size={14} color={colors.brand} />
            <Text style={styles.tipLabel}>Conseil du jour</Text>
          </View>
          <Text style={styles.tipText}>{species.wateringTips}</Text>
        </View>

        {/* CTA */}
        <TouchableOpacity
          onPress={() => router.push(`/plant/${activePlant.id}`)}
          style={styles.detailButton}
          activeOpacity={0.85}
        >
          <Text style={styles.detailButtonText}>Voir tous les soins</Text>
          <Feather name="arrow-right" size={18} color={colors.textInverse} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  emptyContainer: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  emptyIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.brandSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: { color: colors.textMuted, textAlign: 'center', marginBottom: 32, lineHeight: 22 },
  primaryButton: {
    backgroundColor: colors.brand,
    borderRadius: 999,
    paddingHorizontal: 24,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  primaryButtonText: { color: colors.textInverse, fontWeight: '600', fontSize: 15 },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 8,
  },
  greeting: { color: colors.textSubtle, fontSize: 13, fontWeight: '500' },
  title: { color: colors.text, fontSize: 26, fontWeight: '700', marginTop: 2 },
  subtitle: { color: colors.textMuted, fontSize: 14, marginTop: 2 },
  weatherPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 6,
  },
  weatherText: { color: colors.text, fontWeight: '600', fontSize: 13 },
  alertBox: {
    marginHorizontal: 24,
    marginVertical: 12,
    backgroundColor: colors.alertBg,
    borderRadius: 14,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  alertIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FED7AA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertText: { color: colors.alertText, fontSize: 13, flex: 1, fontWeight: '500' },
  mascotSection: { alignItems: 'center', paddingVertical: 12 },
  stagePill: {
    marginTop: 12,
    backgroundColor: colors.brandSofter,
    borderWidth: 1,
    borderColor: colors.brandSoft,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  stageDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.brand },
  stagePillText: { color: colors.brandStrong, fontSize: 13, fontWeight: '600' },
  cardsRow: { flexDirection: 'row', paddingHorizontal: 24, gap: 12, marginTop: 16, marginBottom: 16 },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    gap: 4,
  },
  statValue: { color: colors.text, fontSize: 22, fontWeight: '700' },
  statLabel: { color: colors.textSubtle, fontSize: 11, fontWeight: '500' },
  tipBox: {
    marginHorizontal: 24,
    marginTop: 4,
    backgroundColor: colors.brandSofter,
    borderWidth: 1,
    borderColor: colors.brandSoft,
    borderRadius: 16,
    padding: 16,
  },
  tipHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  tipLabel: {
    color: colors.brandStrong,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tipText: { color: colors.text, fontSize: 14, lineHeight: 20 },
  detailButton: {
    marginHorizontal: 24,
    marginTop: 16,
    backgroundColor: colors.brand,
    borderRadius: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    ...shadow.subtle,
  },
  detailButtonText: { color: colors.textInverse, fontWeight: '600', fontSize: 15 },
});

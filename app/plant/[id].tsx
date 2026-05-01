import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CareButton } from '../../src/components/CareButton';
import { PlantMascot } from '../../src/components/PlantMascot';
import { getSpeciesById } from '../../src/data/species';
import { formatDate, getAdjustedWateringDays, getGrowthStage } from '../../src/hooks/useCareLogic';
import { useWeather } from '../../src/hooks/useWeather';
import { usePlantStore } from '../../src/store/usePlantStore';
import { colors } from '../../src/theme';

const SUNLIGHT_LABELS = {
  full: '☀️ Plein soleil',
  partial: '🌤 Mi-ombre',
  shade: '🌑 Ombre',
};
const STAGE_LABELS = ['Graine', 'Pousse', 'Jeune plante', 'Plante mature', 'Épanouie'];

export default function PlantDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const weather = useWeather();
  const { plants, getAgeInDays, getStreak } = usePlantStore();

  const plant = plants.find((p) => p.id === id);
  const species = plant ? getSpeciesById(plant.speciesId) : null;

  if (!plant || !species) {
    return (
      <SafeAreaView
        style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}
      >
        <Text style={{ color: colors.bark600 }}>Plante introuvable</Text>
      </SafeAreaView>
    );
  }

  const ageInDays = getAgeInDays(plant.id);
  const streak = getStreak(plant.id);
  const stage = getGrowthStage(ageInDays);
  const adjustedWatering = getAdjustedWateringDays(
    species.wateringFrequencyDays,
    weather.temp,
    weather.humidity
  );

  const recentLogs = [...plant.careLogs]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  const careTypeLabels: Record<string, string> = {
    watering: '💧 Arrosage',
    fertilizing: '🌱 Engrais',
    repotting: '🪴 Rempotage',
    pruning: '✂️ Taille',
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={{ color: colors.bark100, fontSize: 18 }}>←</Text>
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{plant.name}</Text>
            <Text style={styles.scientific}>{species.scientificName}</Text>
          </View>
          <Text style={{ fontSize: 28 }}>{species.emoji}</Text>
        </View>

        <View style={styles.mascotSection}>
          <PlantMascot speciesId={species.id} ageInDays={ageInDays} size={160} />
          <Text style={styles.stageLabel}>
            {STAGE_LABELS[stage - 1]} · Stade {stage}/5
          </Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{ageInDays}</Text>
            <Text style={styles.statSub}>jours</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statValue, { color: colors.leaf400 }]}>{streak}</Text>
            <Text style={styles.statSub}>🔥 streak</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statValue, { color: colors.blue300 }]}>
              {adjustedWatering}j
            </Text>
            <Text style={styles.statSub}>arrosage</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statValue, { color: colors.yellow300 }]}>
              {weather.temp}°
            </Text>
            <Text style={styles.statSub}>météo</Text>
          </View>
        </View>

        {adjustedWatering !== species.wateringFrequencyDays && (
          <View style={styles.weatherNotice}>
            <Text>🌡️</Text>
            <Text style={styles.weatherNoticeText}>
              Arrosage ajusté à {adjustedWatering}j (base {species.wateringFrequencyDays}j) selon la
              météo actuelle
            </Text>
          </View>
        )}

        <View style={{ paddingHorizontal: 24, marginBottom: 16 }}>
          <Text style={styles.sectionLabel}>Soins</Text>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <View style={{ flex: 1 }}>
              <CareButton plantId={plant.id} type="watering" adjustedDays={adjustedWatering} />
            </View>
            <View style={{ flex: 1 }}>
              <CareButton plantId={plant.id} type="fertilizing" />
            </View>
          </View>
          <View style={{ flexDirection: 'row', gap: 12, marginTop: 12 }}>
            <View style={{ flex: 1 }}>
              {species.repottingFrequencyDays > 0 && (
                <CareButton plantId={plant.id} type="repotting" />
              )}
            </View>
            <View style={{ flex: 1 }}>
              <CareButton plantId={plant.id} type="pruning" />
            </View>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.sectionLabel}>Infos espèce</Text>
          <View style={{ gap: 8 }}>
            <View style={styles.infoRow}>
              <Text style={styles.infoKey}>Ensoleillement</Text>
              <Text style={styles.infoValue}>{SUNLIGHT_LABELS[species.sunlight]}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoKey}>Température</Text>
              <Text style={styles.infoValue}>
                {species.minTemp}°C → {species.maxTemp}°C
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoKey}>Quantité d'eau</Text>
              <Text style={styles.infoValue}>{species.waterAmountMl} ml</Text>
            </View>
            {species.fertilizingFrequencyDays > 0 && (
              <View style={styles.infoRow}>
                <Text style={styles.infoKey}>Engrais</Text>
                <Text style={styles.infoValue}>
                  Tous les {species.fertilizingFrequencyDays}j
                </Text>
              </View>
            )}
          </View>
          <View style={styles.notesBox}>
            <Text style={[styles.sectionLabel, { marginBottom: 4 }]}>Note</Text>
            <Text style={{ color: colors.bark100, fontSize: 14, lineHeight: 20 }}>
              {species.careNotes}
            </Text>
          </View>
        </View>

        {recentLogs.length > 0 && (
          <View style={{ paddingHorizontal: 24 }}>
            <Text style={styles.sectionLabel}>Historique récent</Text>
            {recentLogs.map((log) => (
              <View key={log.id} style={styles.logRow}>
                <Text style={{ color: colors.bark100, fontSize: 14 }}>
                  {careTypeLabels[log.type]}
                </Text>
                <Text style={{ color: colors.bark600, fontSize: 12 }}>
                  {formatDate(log.date)}
                </Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.forest900 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
    gap: 12,
  },
  backButton: {
    backgroundColor: colors.forest700,
    borderRadius: 999,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { color: colors.bark100, fontSize: 20, fontWeight: 'bold' },
  scientific: { color: colors.bark600, fontSize: 12, fontStyle: 'italic' },
  mascotSection: { alignItems: 'center', paddingVertical: 8 },
  stageLabel: { color: colors.leaf400, fontSize: 14, fontWeight: '500', marginTop: 8 },
  statsRow: { flexDirection: 'row', paddingHorizontal: 24, gap: 12, marginTop: 8, marginBottom: 16 },
  statCard: {
    flex: 1,
    backgroundColor: colors.forest700,
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
  },
  statValue: { fontSize: 24, fontWeight: 'bold', color: colors.bark100 },
  statSub: { color: colors.bark600, fontSize: 12 },
  weatherNotice: {
    marginHorizontal: 24,
    marginBottom: 16,
    backgroundColor: colors.blue950,
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  weatherNoticeText: { color: colors.blue200, fontSize: 12, flex: 1 },
  sectionLabel: {
    color: colors.bark400,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  infoCard: {
    marginHorizontal: 24,
    marginBottom: 16,
    backgroundColor: colors.forest700,
    borderRadius: 16,
    padding: 16,
  },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between' },
  infoKey: { color: colors.bark600, fontSize: 14 },
  infoValue: { color: colors.bark100, fontSize: 14 },
  notesBox: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.forest800,
  },
  logRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.forest700,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
  },
});

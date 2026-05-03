import { Feather } from '@expo/vector-icons';
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
  full: 'Plein soleil',
  partial: 'Mi-ombre',
  shade: 'Ombre',
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
        <Text style={{ color: colors.textMuted }}>Plante introuvable</Text>
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
    watering: 'Arrosage',
    fertilizing: 'Engrais',
    repotting: 'Rempotage',
    pruning: 'Taille',
  };

  const careTypeIcons: Record<string, React.ComponentProps<typeof Feather>['name']> = {
    watering: 'droplet',
    fertilizing: 'feather',
    repotting: 'package',
    pruning: 'scissors',
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
            <Feather name="arrow-left" size={20} color={colors.text} />
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={styles.title}>{plant.name}</Text>
            <Text style={styles.scientific}>{species.scientificName}</Text>
          </View>
          <View style={styles.iconButton}>
            <Text style={{ fontSize: 22 }}>{species.emoji}</Text>
          </View>
        </View>

        <View style={styles.mascotSection}>
          <PlantMascot speciesId={species.id} ageInDays={ageInDays} size={160} />
          <View style={styles.stagePill}>
            <View style={styles.stageDot} />
            <Text style={styles.stagePillText}>
              {STAGE_LABELS[stage - 1]} · {stage}/5
            </Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{ageInDays}</Text>
            <Text style={styles.statSub}>jours</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{streak}</Text>
            <Text style={styles.statSub}>streak</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{adjustedWatering}j</Text>
            <Text style={styles.statSub}>arrosage</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{weather.temp}°</Text>
            <Text style={styles.statSub}>météo</Text>
          </View>
        </View>

        {adjustedWatering !== species.wateringFrequencyDays && (
          <View style={styles.weatherNotice}>
            <Feather name="thermometer" size={14} color={colors.waterText} />
            <Text style={styles.weatherNoticeText}>
              Arrosage ajusté à {adjustedWatering}j (base {species.wateringFrequencyDays}j) selon la
              météo actuelle
            </Text>
          </View>
        )}

        <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
          <Text style={styles.sectionLabel}>Soins</Text>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <View style={{ flex: 1 }}>
              <CareButton plantId={plant.id} type="watering" adjustedDays={adjustedWatering} />
            </View>
            <View style={{ flex: 1 }}>
              <CareButton plantId={plant.id} type="fertilizing" />
            </View>
          </View>
          <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
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
          <View style={{ gap: 12 }}>
            <InfoRow icon="sun" label="Ensoleillement" value={SUNLIGHT_LABELS[species.sunlight]} />
            <InfoRow
              icon="thermometer"
              label="Température"
              value={`${species.minTemp}°C → ${species.maxTemp}°C`}
            />
            <InfoRow icon="droplet" label="Quantité d'eau" value={`${species.waterAmountMl} ml`} />
            {species.fertilizingFrequencyDays > 0 && (
              <InfoRow
                icon="feather"
                label="Engrais"
                value={`Tous les ${species.fertilizingFrequencyDays}j`}
              />
            )}
          </View>
          <View style={styles.notesBox}>
            <Text style={styles.sectionLabel}>Note</Text>
            <Text style={{ color: colors.textMuted, fontSize: 14, lineHeight: 20 }}>
              {species.careNotes}
            </Text>
          </View>
        </View>

        {recentLogs.length > 0 && (
          <View style={{ paddingHorizontal: 20 }}>
            <Text style={styles.sectionLabel}>Historique récent</Text>
            {recentLogs.map((log) => (
              <View key={log.id} style={styles.logRow}>
                <View style={styles.logIcon}>
                  <Feather name={careTypeIcons[log.type]} size={14} color={colors.brand} />
                </View>
                <Text style={{ color: colors.text, fontSize: 14, flex: 1, fontWeight: '500' }}>
                  {careTypeLabels[log.type]}
                </Text>
                <Text style={{ color: colors.textSubtle, fontSize: 12 }}>
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

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ComponentProps<typeof Feather>['name'];
  label: string;
  value: string;
}) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoIconWrapper}>
        <Feather name={icon} size={14} color={colors.brand} />
      </View>
      <Text style={styles.infoKey}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
    gap: 12,
  },
  iconButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { color: colors.text, fontSize: 18, fontWeight: '700' },
  scientific: { color: colors.textSubtle, fontSize: 11, fontStyle: 'italic', marginTop: 1 },
  mascotSection: { alignItems: 'center', paddingVertical: 8 },
  stagePill: {
    marginTop: 8,
    backgroundColor: colors.brandSofter,
    borderWidth: 1,
    borderColor: colors.brandSoft,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  stageDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.brand },
  stagePillText: { color: colors.brandStrong, fontSize: 12, fontWeight: '600' },
  statsRow: { flexDirection: 'row', paddingHorizontal: 20, gap: 8, marginTop: 12, marginBottom: 16 },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
  },
  statValue: { fontSize: 20, fontWeight: '700', color: colors.text },
  statSub: { color: colors.textSubtle, fontSize: 11, marginTop: 2 },
  weatherNotice: {
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: colors.waterBg,
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  weatherNoticeText: { color: colors.waterText, fontSize: 12, flex: 1, fontWeight: '500' },
  sectionLabel: {
    color: colors.textSubtle,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
    fontWeight: '700',
  },
  infoCard: {
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 16,
  },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  infoIconWrapper: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: colors.brandSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoKey: { color: colors.textMuted, fontSize: 13, flex: 1 },
  infoValue: { color: colors.text, fontSize: 13, fontWeight: '600' },
  notesBox: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  logRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
    gap: 10,
  },
  logIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: colors.brandSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

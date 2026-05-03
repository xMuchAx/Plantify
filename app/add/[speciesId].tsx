import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PlantMascot } from '../../src/components/PlantMascot';
import { getSpeciesById } from '../../src/data/species';
import { usePlantStore } from '../../src/store/usePlantStore';
import { colors } from '../../src/theme';

const SUNLIGHT_LABELS = {
  full: 'Plein soleil',
  partial: 'Mi-ombre',
  shade: 'Ombre',
};
const DIFFICULTY_LABELS: Record<string, string> = {
  easy: 'Facile',
  medium: 'Moyen',
  hard: 'Expert',
};

const STAGE_PREVIEW = [
  { stage: 1, ageInDays: 3, label: 'Graine' },
  { stage: 2, ageInDays: 14, label: 'Pousse' },
  { stage: 3, ageInDays: 60, label: 'Jeune plante' },
  { stage: 4, ageInDays: 120, label: 'Plante mature' },
  { stage: 5, ageInDays: 200, label: 'Épanouie' },
];

export default function AddPlantScreen() {
  const { speciesId } = useLocalSearchParams<{ speciesId: string }>();
  const router = useRouter();
  const { addPlant } = usePlantStore();
  const species = getSpeciesById(speciesId);

  const [name, setName] = useState(species?.name ?? '');
  const buttonScale = useSharedValue(1);

  const buttonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  if (!species) {
    return (
      <SafeAreaView
        style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}
      >
        <Text style={{ color: colors.textMuted }}>Espèce introuvable</Text>
        <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 16 }}>
          <Text style={{ color: colors.brand, fontWeight: '600' }}>Retour</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  function handleAdd() {
    if (!name.trim()) return;
    buttonScale.value = withSequence(withSpring(0.92), withSpring(1.04), withSpring(1));
    addPlant(species!.id, name.trim());
    setTimeout(() => {
      router.replace('/(tabs)');
    }, 300);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
            <Feather name="arrow-left" size={20} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.title}>Adopter</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={{ paddingVertical: 16 }}>
          <Text style={[styles.sectionLabel, { paddingHorizontal: 24, marginBottom: 12 }]}>
            Évolution de la mascotte
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 10 }}
          >
            {STAGE_PREVIEW.map((s) => (
              <View key={s.stage} style={styles.stageCard}>
                <PlantMascot speciesId={species.id} ageInDays={s.ageInDays} size={120} />
                <View style={styles.stageBadge}>
                  <Text style={styles.stageNumber}>Stade {s.stage}</Text>
                </View>
                <Text style={styles.stageName}>{s.label}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.infoCard}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <View style={styles.emojiBox}>
              <Text style={{ fontSize: 28 }}>{species.emoji}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.speciesName}>{species.name}</Text>
              <Text style={styles.speciesSci}>{species.scientificName}</Text>
            </View>
          </View>
          <Text style={styles.description}>{species.description}</Text>
          <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginTop: 4 }}>
            <View style={styles.tag}>
              <Feather name="bar-chart-2" size={12} color={colors.brand} />
              <Text style={styles.tagText}>{DIFFICULTY_LABELS[species.difficulty]}</Text>
            </View>
            <View style={styles.tag}>
              <Feather name="sun" size={12} color={colors.brand} />
              <Text style={styles.tagText}>{SUNLIGHT_LABELS[species.sunlight]}</Text>
            </View>
            <View style={styles.tag}>
              <Feather name="droplet" size={12} color={colors.brand} />
              <Text style={styles.tagText}>Tous les {species.wateringFrequencyDays}j</Text>
            </View>
          </View>
        </View>

        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <Text style={styles.inputLabel}>Donne un prénom à ta plante</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder={`Ex: Mon ${species.name}`}
            placeholderTextColor={colors.textSubtle}
            style={styles.input}
            maxLength={30}
            autoFocus
          />
          <Text style={styles.charCount}>{name.length}/30</Text>
        </View>

        <View style={styles.tipBox}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 }}>
            <Feather name="info" size={14} color={colors.brand} />
            <Text style={styles.inputLabel}>Conseil</Text>
          </View>
          <Text style={{ color: colors.textMuted, fontSize: 13, lineHeight: 20 }}>
            {species.wateringTips}
          </Text>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <Animated.View style={buttonStyle}>
          <TouchableOpacity
            onPress={handleAdd}
            disabled={!name.trim()}
            style={[
              styles.addButton,
              {
                backgroundColor: name.trim() ? colors.brand : colors.surfaceAlt,
                borderColor: name.trim() ? colors.brand : colors.border,
              },
            ]}
            activeOpacity={0.85}
          >
            <Text
              style={{
                fontWeight: '600',
                fontSize: 15,
                color: name.trim() ? colors.textInverse : colors.textSubtle,
              }}
            >
              {name.trim() ? `Adopter "${name.trim()}"` : 'Donne un nom'}
            </Text>
            {name.trim() && (
              <Feather name="check" size={18} color={colors.textInverse} />
            )}
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 4,
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
  sectionLabel: {
    color: colors.textSubtle,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontWeight: '700',
  },
  stageCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',
    width: 144,
  },
  stageBadge: {
    backgroundColor: colors.brandSoft,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginTop: 4,
  },
  stageNumber: { color: colors.brandStrong, fontSize: 11, fontWeight: '700' },
  stageName: { color: colors.textMuted, fontSize: 12, marginTop: 4 },
  infoCard: {
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 16,
  },
  emojiBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.brandSofter,
    alignItems: 'center',
    justifyContent: 'center',
  },
  speciesName: { color: colors.text, fontWeight: '700', fontSize: 16 },
  speciesSci: { color: colors.textSubtle, fontSize: 12, fontStyle: 'italic', marginTop: 2 },
  description: { color: colors.textMuted, fontSize: 13, lineHeight: 19, marginBottom: 12 },
  tag: {
    backgroundColor: colors.brandSofter,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  tagText: { color: colors.brandStrong, fontSize: 12, fontWeight: '600' },
  inputLabel: {
    color: colors.textSubtle,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontWeight: '700',
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    color: colors.text,
    fontSize: 15,
  },
  charCount: { color: colors.textSubtle, fontSize: 12, marginTop: 4, textAlign: 'right' },
  tipBox: {
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: colors.brandSofter,
    borderWidth: 1,
    borderColor: colors.brandSoft,
    borderRadius: 14,
    padding: 14,
  },
  bottomBar: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 12,
    backgroundColor: colors.bg,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  addButton: {
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
  },
});

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
  full: '☀️ Plein soleil',
  partial: '🌤 Mi-ombre',
  shade: '🌑 Ombre',
};
const DIFFICULTY_LABELS: Record<string, string> = {
  easy: '🟢 Facile',
  medium: '🟡 Moyen',
  hard: '🔴 Expert',
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
        <Text style={{ color: colors.bark600 }}>Espèce introuvable</Text>
        <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 16 }}>
          <Text style={{ color: colors.leaf400 }}>Retour</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  function handleAdd() {
    if (!name.trim()) return;
    buttonScale.value = withSequence(withSpring(0.9), withSpring(1.05), withSpring(1));
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
        contentContainerStyle={{ paddingBottom: 32 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={{ color: colors.bark100, fontSize: 18 }}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Ajouter une plante</Text>
        </View>

        <View style={{ paddingVertical: 16 }}>
          <Text style={[styles.inputLabel, { paddingHorizontal: 24, marginBottom: 12 }]}>
            Évolution de la mascotte
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24, gap: 12 }}
          >
            {STAGE_PREVIEW.map((s) => (
              <View key={s.stage} style={styles.stageCard}>
                <PlantMascot speciesId={species.id} ageInDays={s.ageInDays} size={120} />
                <Text style={styles.stageNumber}>Stade {s.stage}</Text>
                <Text style={styles.stageName}>{s.label}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.infoCard}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <Text style={{ fontSize: 28 }}>{species.emoji}</Text>
            <View>
              <Text style={{ color: colors.bark100, fontWeight: 'bold', fontSize: 18 }}>
                {species.name}
              </Text>
              <Text style={{ color: colors.bark600, fontSize: 12, fontStyle: 'italic' }}>
                {species.scientificName}
              </Text>
            </View>
          </View>
          <Text style={styles.description}>{species.description}</Text>
          <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{DIFFICULTY_LABELS[species.difficulty]}</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{SUNLIGHT_LABELS[species.sunlight]}</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>💧 Tous les {species.wateringFrequencyDays}j</Text>
            </View>
          </View>
        </View>

        <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
          <Text style={styles.inputLabel}>Donne un prénom à ta plante</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder={`Ex: Mon ${species.name}`}
            placeholderTextColor={colors.bark600}
            style={styles.input}
            maxLength={30}
            autoFocus
          />
          <Text style={styles.charCount}>{name.length}/30</Text>
        </View>

        <View style={styles.tipBox}>
          <Text style={styles.inputLabel}>Conseil</Text>
          <Text style={{ color: colors.bark100, fontSize: 14, lineHeight: 20 }}>
            {species.wateringTips}
          </Text>
        </View>
      </ScrollView>

      <View style={{ paddingHorizontal: 24, paddingBottom: 24, paddingTop: 8 }}>
        <Animated.View style={buttonStyle}>
          <TouchableOpacity
            onPress={handleAdd}
            disabled={!name.trim()}
            style={[
              styles.addButton,
              { backgroundColor: name.trim() ? colors.leaf400 : colors.forest600 },
            ]}
            activeOpacity={0.8}
          >
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 16,
                color: name.trim() ? colors.forest900 : colors.bark600,
              }}
            >
              Adopter {name.trim() ? `"${name.trim()}"` : 'cette plante'}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
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
  title: { color: colors.bark100, fontSize: 20, fontWeight: 'bold', flex: 1 },
  stageCard: {
    backgroundColor: colors.forest700,
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    width: 140,
  },
  stageNumber: { color: colors.leaf400, fontSize: 12, fontWeight: '600', marginTop: 4 },
  stageName: { color: colors.bark400, fontSize: 11, marginTop: 2 },
  infoCard: {
    marginHorizontal: 24,
    marginBottom: 24,
    backgroundColor: colors.forest700,
    borderRadius: 16,
    padding: 16,
  },
  description: { color: colors.bark400, fontSize: 14, lineHeight: 20, marginBottom: 12 },
  tag: { backgroundColor: colors.forest800, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 4 },
  tagText: { color: colors.bark400, fontSize: 12 },
  inputLabel: {
    color: colors.bark400,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.forest700,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    color: colors.bark100,
    fontSize: 16,
  },
  charCount: { color: colors.bark600, fontSize: 12, marginTop: 4, textAlign: 'right' },
  tipBox: {
    marginHorizontal: 24,
    marginBottom: 24,
    backgroundColor: colors.forest800,
    borderRadius: 16,
    padding: 16,
  },
  addButton: { borderRadius: 16, padding: 16, alignItems: 'center' },
});

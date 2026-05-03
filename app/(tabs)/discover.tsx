import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  CATEGORY_LABELS,
  PlantCategory,
  PlantSpecies,
  SPECIES,
} from '../../src/data/species';
import { colors } from '../../src/theme';

const CATEGORIES: PlantCategory[] = ['bonsai', 'cactus', 'tropical', 'classic', 'aromatic'];

const DIFFICULTY_STYLE: Record<string, { bg: string; text: string }> = {
  easy: { bg: '#DCFCE7', text: '#15803D' },
  medium: { bg: '#FEF3C7', text: '#A16207' },
  hard: { bg: '#FEE2E2', text: '#B91C1C' },
};

const DIFFICULTY_LABELS: Record<string, string> = {
  easy: 'Facile',
  medium: 'Moyen',
  hard: 'Expert',
};

function SpeciesCard({ species }: { species: PlantSpecies }) {
  const router = useRouter();
  const diff = DIFFICULTY_STYLE[species.difficulty];
  return (
    <TouchableOpacity
      onPress={() => router.push(`/add/${species.id}`)}
      activeOpacity={0.85}
      style={styles.card}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12 }}>
        <View style={styles.emojiBox}>
          <Text style={{ fontSize: 28 }}>{species.emoji}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{species.name}</Text>
            <View style={[styles.difficultyPill, { backgroundColor: diff.bg }]}>
              <Text style={[styles.difficultyText, { color: diff.text }]}>
                {DIFFICULTY_LABELS[species.difficulty]}
              </Text>
            </View>
          </View>
          <Text style={styles.scientific}>{species.scientificName}</Text>
          <Text numberOfLines={2} style={styles.description}>
            {species.description}
          </Text>
          <View style={{ flexDirection: 'row', gap: 12, marginTop: 8, flexWrap: 'wrap' }}>
            <View style={styles.metaItem}>
              <Feather name="droplet" size={11} color={colors.textSubtle} />
              <Text style={styles.metaText}>Tous les {species.wateringFrequencyDays}j</Text>
            </View>
            <View style={styles.metaItem}>
              <Feather name="sun" size={11} color={colors.textSubtle} />
              <Text style={styles.metaText}>
                {species.sunlight === 'full'
                  ? 'Plein soleil'
                  : species.sunlight === 'partial'
                  ? 'Mi-ombre'
                  : 'Ombre'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function DiscoverScreen() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<PlantCategory | 'all'>('all');

  const filtered = SPECIES.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.scientificName.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'all' || s.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: 12 }}>
        <Text style={styles.title}>Découvrir</Text>
        <Text style={styles.subtitle}>50 espèces à adopter</Text>
        <View style={styles.searchBox}>
          <Feather name="search" size={16} color={colors.textSubtle} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Rechercher une plante..."
            placeholderTextColor={colors.textSubtle}
            style={styles.searchInput}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Feather name="x" size={16} color={colors.textSubtle} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 16, flexGrow: 0 }}
        contentContainerStyle={{ paddingHorizontal: 24, gap: 8 }}
      >
        <TouchableOpacity
          onPress={() => setActiveCategory('all')}
          style={[styles.chip, activeCategory === 'all' && styles.chipActive]}
          activeOpacity={0.85}
        >
          <Text
            style={[
              styles.chipText,
              activeCategory === 'all' && { color: colors.textInverse },
            ]}
          >
            Toutes ({SPECIES.length})
          </Text>
        </TouchableOpacity>
        {CATEGORIES.map((cat) => {
          const count = SPECIES.filter((s) => s.category === cat).length;
          const isActive = activeCategory === cat;
          return (
            <TouchableOpacity
              key={cat}
              onPress={() => setActiveCategory(cat)}
              style={[styles.chip, isActive && styles.chipActive]}
              activeOpacity={0.85}
            >
              <Text style={[styles.chipText, isActive && { color: colors.textInverse }]}>
                {CATEGORY_LABELS[cat]} ({count})
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <ScrollView
        style={{ flex: 1, paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {filtered.length === 0 ? (
          <View style={{ alignItems: 'center', paddingVertical: 64 }}>
            <Feather name="search" size={32} color={colors.textSubtle} />
            <Text style={{ color: colors.textMuted, textAlign: 'center', marginTop: 12 }}>
              Aucune plante trouvée
            </Text>
          </View>
        ) : (
          filtered.map((s) => <SpeciesCard key={s.id} species={s} />)
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  title: { color: colors.text, fontSize: 26, fontWeight: '700' },
  subtitle: { color: colors.textSubtle, fontSize: 13, marginTop: 2, marginBottom: 16 },
  searchBox: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: { flex: 1, color: colors.text, fontSize: 14 },
  chip: {
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: { backgroundColor: colors.brand, borderColor: colors.brand },
  chipText: { fontSize: 13, fontWeight: '600', color: colors.textMuted },
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
  },
  emojiBox: {
    width: 56,
    height: 56,
    backgroundColor: colors.brandSofter,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  name: { color: colors.text, fontWeight: '700', fontSize: 16 },
  difficultyPill: { borderRadius: 999, paddingHorizontal: 8, paddingVertical: 3 },
  difficultyText: { fontSize: 11, fontWeight: '600' },
  scientific: { color: colors.textSubtle, fontSize: 12, fontStyle: 'italic', marginTop: 2 },
  description: { color: colors.textMuted, fontSize: 13, marginTop: 4, lineHeight: 18 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { color: colors.textSubtle, fontSize: 12 },
});

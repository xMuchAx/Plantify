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

const DIFFICULTY_BG: Record<string, string> = {
  easy: colors.green800,
  medium: colors.yellow800,
  hard: colors.red900,
};

const DIFFICULTY_LABELS: Record<string, string> = {
  easy: 'Facile',
  medium: 'Moyen',
  hard: 'Expert',
};

function SpeciesCard({ species }: { species: PlantSpecies }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push(`/add/${species.id}`)}
      activeOpacity={0.8}
      style={styles.card}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12 }}>
        <View style={styles.emojiBox}>
          <Text style={{ fontSize: 24 }}>{species.emoji}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{species.name}</Text>
            <View
              style={[styles.difficultyPill, { backgroundColor: DIFFICULTY_BG[species.difficulty] }]}
            >
              <Text style={{ color: colors.white, fontSize: 12 }}>
                {DIFFICULTY_LABELS[species.difficulty]}
              </Text>
            </View>
          </View>
          <Text style={styles.scientific}>{species.scientificName}</Text>
          <Text style={styles.description}>{species.description}</Text>
          <View style={{ flexDirection: 'row', gap: 12, marginTop: 8 }}>
            <Text style={styles.metaText}>💧 Tous les {species.wateringFrequencyDays}j</Text>
            <Text style={styles.metaText}>
              {species.sunlight === 'full'
                ? '☀️ Plein soleil'
                : species.sunlight === 'partial'
                ? '🌤 Mi-ombre'
                : '🌑 Ombre'}
            </Text>
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
        <View style={styles.searchBox}>
          <Text style={{ color: colors.bark600, marginRight: 8 }}>🔍</Text>
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Rechercher une plante..."
            placeholderTextColor={colors.bark600}
            style={styles.searchInput}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Text style={{ color: colors.bark600, fontSize: 18 }}>×</Text>
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
        >
          <Text
            style={[
              styles.chipText,
              activeCategory === 'all' && { color: colors.forest900 },
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
            >
              <Text style={[styles.chipText, isActive && { color: colors.forest900 }]}>
                {CATEGORY_LABELS[cat]} ({count})
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <ScrollView
        style={{ flex: 1, paddingHorizontal: 24 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {filtered.length === 0 ? (
          <View style={{ alignItems: 'center', paddingVertical: 64 }}>
            <Text style={{ fontSize: 36, marginBottom: 12 }}>🔍</Text>
            <Text style={{ color: colors.bark600, textAlign: 'center' }}>
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
  container: { flex: 1, backgroundColor: colors.forest900 },
  title: { color: colors.bark100, fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  searchBox: {
    backgroundColor: colors.forest700,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  searchInput: { flex: 1, color: colors.bark100, fontSize: 14 },
  chip: {
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.forest700,
  },
  chipActive: { backgroundColor: colors.leaf400 },
  chipText: { fontSize: 14, fontWeight: '500', color: colors.bark400 },
  card: { backgroundColor: colors.forest700, borderRadius: 16, padding: 16, marginBottom: 12 },
  emojiBox: {
    width: 48,
    height: 48,
    backgroundColor: colors.forest800,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  name: { color: colors.bark100, fontWeight: '600', fontSize: 16 },
  difficultyPill: { borderRadius: 999, paddingHorizontal: 8, paddingVertical: 2 },
  scientific: { color: colors.bark600, fontSize: 12, fontStyle: 'italic', marginTop: 2 },
  description: { color: colors.bark400, fontSize: 12, marginTop: 4, lineHeight: 16 },
  metaText: { color: colors.bark600, fontSize: 12 },
});

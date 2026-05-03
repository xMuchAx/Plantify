import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SwipeablePlantCard } from '../../src/components/SwipeablePlantCard';
import { usePlantStore } from '../../src/store/usePlantStore';
import { colors } from '../../src/theme';

export default function PlantsScreen() {
  const router = useRouter();
  const { plants, removePlant } = usePlantStore();

  function handleDelete(id: string) {
    Alert.alert(
      'Supprimer la plante',
      'Es-tu sûr de vouloir supprimer cette plante ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Supprimer', style: 'destructive', onPress: () => removePlant(id) },
      ]
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mes Plantes</Text>
        <View style={styles.countPill}>
          <Text style={styles.countText}>{plants.length}</Text>
        </View>
      </View>

      {plants.length === 0 ? (
        <View style={styles.emptyState}>
          <View style={styles.emptyIcon}>
            <Text style={{ fontSize: 40 }}>🌱</Text>
          </View>
          <Text style={styles.emptyTitle}>Aucune plante pour l'instant</Text>
          <Text style={styles.emptyText}>
            Découvre nos 50 espèces et ajoute ta première plante compagnon.
          </Text>
          <TouchableOpacity
            onPress={() => router.push('/(tabs)/discover')}
            style={styles.primaryButton}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryButtonText}>Découvrir des plantes</Text>
            <Feather name="arrow-right" size={18} color={colors.textInverse} />
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.hintRow}>
            <Feather name="chevron-left" size={14} color={colors.textSubtle} />
            <Text style={styles.swipeHint}>Glisse pour supprimer</Text>
          </View>
          <ScrollView
            style={{ flex: 1, paddingHorizontal: 20 }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 24 }}
          >
            {plants.map((plant) => (
              <SwipeablePlantCard
                key={plant.id}
                plantId={plant.id}
                onDelete={handleDelete}
              />
            ))}
          </ScrollView>
          <View style={{ paddingHorizontal: 20, paddingBottom: 16 }}>
            <TouchableOpacity
              onPress={() => router.push('/(tabs)/discover')}
              style={styles.addButton}
              activeOpacity={0.85}
            >
              <Feather name="plus" size={18} color={colors.brand} />
              <Text style={styles.addButtonText}>Ajouter une plante</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 12,
  },
  title: { color: colors.text, fontSize: 26, fontWeight: '700' },
  countPill: {
    minWidth: 32,
    height: 28,
    paddingHorizontal: 10,
    borderRadius: 14,
    backgroundColor: colors.brandSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: { color: colors.brandStrong, fontWeight: '700', fontSize: 13 },
  hintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  swipeHint: { color: colors.textSubtle, fontSize: 12 },
  emptyState: {
    flex: 1,
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
    fontSize: 20,
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
  addButton: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.brandSoft,
    borderStyle: 'dashed',
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  addButtonText: { color: colors.brandStrong, fontWeight: '600', fontSize: 15 },
});

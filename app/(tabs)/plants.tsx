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
        <Text style={styles.count}>
          {plants.length} plante{plants.length !== 1 ? 's' : ''}
        </Text>
      </View>

      {plants.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>🌱</Text>
          <Text style={styles.emptyTitle}>Aucune plante pour l'instant</Text>
          <Text style={styles.emptyText}>
            Découvre nos 50 espèces et ajoute ta première plante compagnon.
          </Text>
          <TouchableOpacity
            onPress={() => router.push('/(tabs)/discover')}
            style={styles.primaryButton}
          >
            <Text style={styles.primaryButtonText}>Découvrir des plantes</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Text style={styles.swipeHint}>← Glisse vers la gauche pour supprimer</Text>
          <ScrollView
            style={{ flex: 1, paddingHorizontal: 24 }}
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
          <View style={{ paddingHorizontal: 24, paddingBottom: 16 }}>
            <TouchableOpacity
              onPress={() => router.push('/(tabs)/discover')}
              style={styles.addButton}
            >
              <Text style={{ fontSize: 24 }}>+</Text>
              <Text style={styles.addButtonText}>Ajouter une plante</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.forest900 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
  title: { color: colors.bark100, fontSize: 24, fontWeight: 'bold' },
  count: { color: colors.bark600, fontSize: 14 },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  emptyEmoji: { fontSize: 64, marginBottom: 16 },
  emptyTitle: {
    color: colors.bark100,
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: { color: colors.bark600, textAlign: 'center', marginBottom: 32 },
  primaryButton: {
    backgroundColor: colors.leaf400,
    borderRadius: 999,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  primaryButtonText: { color: colors.forest900, fontWeight: 'bold' },
  swipeHint: { color: colors.bark600, fontSize: 12, paddingHorizontal: 24, marginBottom: 12 },
  addButton: {
    backgroundColor: colors.forest700,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: colors.forest600,
  },
  addButtonText: { color: colors.bark100, fontWeight: '600' },
});

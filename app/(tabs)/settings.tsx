import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePlantStore } from '../../src/store/usePlantStore';
import { colors } from '../../src/theme';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [morningReminder, setMorningReminder] = useState(true);
  const { plants } = usePlantStore();

  function handleReset() {
    Alert.alert('Réinitialiser', 'Supprimer toutes tes plantes et données ?', [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Réinitialiser', style: 'destructive', onPress: () => {} },
    ]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: 16 }}>
          <Text style={styles.title}>Réglages</Text>
        </View>

        <View style={styles.statsCard}>
          <Text style={styles.sectionLabel}>Ton jardin</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.statBig}>{plants.length}</Text>
              <Text style={styles.statSub}>Plantes</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.statBig}>
                {plants.reduce((acc, p) => acc + p.careLogs.length, 0)}
              </Text>
              <Text style={styles.statSub}>Soins total</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.statBig}>
                {plants.filter((p) => p.careLogs.length > 0).length}
              </Text>
              <Text style={styles.statSub}>Actives</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { paddingHorizontal: 16, paddingTop: 16 }]}>
            Notifications
          </Text>
          <View style={[styles.row, styles.rowBorder]}>
            <View>
              <Text style={styles.rowTitle}>Rappels de soins</Text>
              <Text style={styles.rowSub}>Reçois des alertes pour tes plantes</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: colors.gray700, true: colors.green800 }}
              thumbColor={notificationsEnabled ? colors.leaf400 : colors.bark600}
            />
          </View>
          <View style={styles.row}>
            <View>
              <Text style={styles.rowTitle}>Rappel du matin</Text>
              <Text style={styles.rowSub}>Résumé des soins à 8h00</Text>
            </View>
            <Switch
              value={morningReminder}
              onValueChange={setMorningReminder}
              trackColor={{ false: colors.gray700, true: colors.green800 }}
              thumbColor={morningReminder ? colors.leaf400 : colors.bark600}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { paddingHorizontal: 16, paddingTop: 16 }]}>
            À propos
          </Text>
          <View style={[styles.row, styles.rowBorder, { justifyContent: 'space-between' }]}>
            <Text style={{ color: colors.bark100, fontSize: 14 }}>Version</Text>
            <Text style={{ color: colors.bark600, fontSize: 14 }}>1.0.0</Text>
          </View>
          <View style={[styles.row, styles.rowBorder, { justifyContent: 'space-between' }]}>
            <Text style={{ color: colors.bark100, fontSize: 14 }}>Espèces disponibles</Text>
            <Text style={{ color: colors.bark600, fontSize: 14 }}>50</Text>
          </View>
          <View style={[styles.row, { justifyContent: 'space-between' }]}>
            <Text style={{ color: colors.bark100, fontSize: 14 }}>Données météo</Text>
            <Text style={{ color: colors.bark600, fontSize: 14 }}>OpenWeatherMap</Text>
          </View>
        </View>

        <View style={{ paddingHorizontal: 24 }}>
          <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
            <Text style={{ color: colors.red400, fontWeight: '500' }}>
              Réinitialiser toutes les données
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.forest900 },
  title: { color: colors.bark100, fontSize: 24, fontWeight: 'bold' },
  statsCard: {
    marginHorizontal: 24,
    marginBottom: 24,
    backgroundColor: colors.forest700,
    borderRadius: 16,
    padding: 16,
  },
  sectionLabel: {
    color: colors.bark400,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  statBig: { color: colors.leaf400, fontSize: 24, fontWeight: 'bold' },
  statSub: { color: colors.bark600, fontSize: 12 },
  section: {
    marginHorizontal: 24,
    marginBottom: 16,
    backgroundColor: colors.forest700,
    borderRadius: 16,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: colors.forest800 },
  rowTitle: { color: colors.bark100, fontSize: 14, fontWeight: '500' },
  rowSub: { color: colors.bark600, fontSize: 12 },
  resetButton: {
    borderWidth: 1,
    borderColor: colors.red900,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
});

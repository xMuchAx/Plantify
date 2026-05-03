import { Feather } from '@expo/vector-icons';
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
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 4 }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.statBig}>{plants.length}</Text>
              <Text style={styles.statSub}>Plantes</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.statBig}>
                {plants.reduce((acc, p) => acc + p.careLogs.length, 0)}
              </Text>
              <Text style={styles.statSub}>Soins total</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.statBig}>
                {plants.filter((p) => p.careLogs.length > 0).length}
              </Text>
              <Text style={styles.statSub}>Actives</Text>
            </View>
          </View>
        </View>

        <Text style={styles.groupLabel}>Notifications</Text>
        <View style={styles.section}>
          <View style={[styles.row, styles.rowBorder]}>
            <View style={styles.rowIcon}>
              <Feather name="bell" size={16} color={colors.brand} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowTitle}>Rappels de soins</Text>
              <Text style={styles.rowSub}>Reçois des alertes pour tes plantes</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: colors.border, true: colors.brand }}
              thumbColor={colors.white}
            />
          </View>
          <View style={styles.row}>
            <View style={styles.rowIcon}>
              <Feather name="sun" size={16} color={colors.brand} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowTitle}>Rappel du matin</Text>
              <Text style={styles.rowSub}>Résumé des soins à 8h00</Text>
            </View>
            <Switch
              value={morningReminder}
              onValueChange={setMorningReminder}
              trackColor={{ false: colors.border, true: colors.brand }}
              thumbColor={colors.white}
            />
          </View>
        </View>

        <Text style={styles.groupLabel}>À propos</Text>
        <View style={styles.section}>
          <View style={[styles.row, styles.rowBorder, { justifyContent: 'space-between' }]}>
            <Text style={styles.rowTitle}>Version</Text>
            <Text style={styles.rowMuted}>1.0.0</Text>
          </View>
          <View style={[styles.row, styles.rowBorder, { justifyContent: 'space-between' }]}>
            <Text style={styles.rowTitle}>Espèces disponibles</Text>
            <Text style={styles.rowMuted}>50</Text>
          </View>
          <View style={[styles.row, { justifyContent: 'space-between' }]}>
            <Text style={styles.rowTitle}>Données météo</Text>
            <Text style={styles.rowMuted}>OpenWeatherMap</Text>
          </View>
        </View>

        <View style={{ paddingHorizontal: 24, marginTop: 16 }}>
          <TouchableOpacity onPress={handleReset} style={styles.resetButton} activeOpacity={0.85}>
            <Feather name="trash-2" size={16} color={colors.danger} />
            <Text style={{ color: colors.danger, fontWeight: '600' }}>
              Réinitialiser toutes les données
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  title: { color: colors.text, fontSize: 26, fontWeight: '700' },
  statsCard: {
    marginHorizontal: 24,
    marginBottom: 24,
    backgroundColor: colors.brandSofter,
    borderWidth: 1,
    borderColor: colors.brandSoft,
    borderRadius: 16,
    padding: 16,
  },
  sectionLabel: {
    color: colors.brandStrong,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
    fontWeight: '700',
  },
  statBig: { color: colors.brandStrong, fontSize: 24, fontWeight: '700' },
  statSub: { color: colors.textMuted, fontSize: 12 },
  statDivider: { width: 1, height: 32, backgroundColor: colors.brandSoft, alignSelf: 'center' },
  groupLabel: {
    color: colors.textSubtle,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  section: {
    marginHorizontal: 24,
    marginBottom: 16,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: colors.divider },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.brandSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowTitle: { color: colors.text, fontSize: 14, fontWeight: '600' },
  rowSub: { color: colors.textSubtle, fontSize: 12, marginTop: 2 },
  rowMuted: { color: colors.textSubtle, fontSize: 14 },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.dangerBg,
    borderRadius: 12,
    paddingVertical: 14,
  },
});

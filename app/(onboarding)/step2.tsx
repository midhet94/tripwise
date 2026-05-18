import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, Spacing, Radii } from '../../constants/theme';
import { GoldButton } from '../../components/ui/GoldButton';
import { TRAVEL_STYLE_OPTIONS, DESTINATIONS } from '../../constants/data';

export default function Step2Screen() {
  const router = useRouter();
  const [styles_, setStyles] = useState<string[]>([]);
  const [destinations, setDestinations] = useState<string[]>([]);

  function toggle<T>(arr: T[], item: T, setter: (a: T[]) => void) {
    setter(arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item]);
  }

  async function handleNext() {
    await AsyncStorage.setItem('tw_travel_prefs', JSON.stringify({ styles: styles_, destinations }));
    router.push('/(onboarding)/step3');
  }

  return (
    <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
      <ProgressBar step={2} />

      <TouchableOpacity onPress={() => router.back()} style={styles.back}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.eyebrow}>Step 2 of 4</Text>
      <Text style={styles.title}>Travel Preferences</Text>
      <Text style={styles.subtitle}>Tell us how you love to travel so we can curate perfectly.</Text>

      <Text style={styles.sectionLabel}>Travel Style</Text>
      <View style={styles.chipRow}>
        {TRAVEL_STYLE_OPTIONS.map((opt) => (
          <TouchableOpacity
            key={opt}
            style={[styles.chip, styles_.includes(opt) && styles.chipActive]}
            onPress={() => toggle(styles_, opt, setStyles)}
          >
            <Text style={[styles.chipText, styles_.includes(opt) && styles.chipTextActive]}>
              {opt}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionLabel}>Dream Destinations</Text>
      <View style={styles.chipRow}>
        {DESTINATIONS.map((d) => (
          <TouchableOpacity
            key={d}
            style={[styles.chip, destinations.includes(d) && styles.chipActive]}
            onPress={() => toggle(destinations, d, setDestinations)}
          >
            <Text style={[styles.chipText, destinations.includes(d) && styles.chipTextActive]}>
              {d}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <GoldButton label="Continue" onPress={handleNext} style={styles.btn} />
      <GoldButton label="Skip for now" variant="ghost" onPress={() => router.push('/(onboarding)/step3')} />
    </ScrollView>
  );
}

function ProgressBar({ step }: { step: number }) {
  return (
    <View style={pb.row}>
      {[1, 2, 3, 4].map((s) => (
        <View key={s} style={[pb.bar, s <= step && pb.barActive, s < step && pb.barDone]} />
      ))}
    </View>
  );
}

const pb = StyleSheet.create({
  row: { flexDirection: 'row', gap: 6, marginBottom: Spacing.lg },
  bar: { flex: 1, height: 3, borderRadius: 2, backgroundColor: Colors.blackBorder },
  barActive: { backgroundColor: Colors.gold },
  barDone: { backgroundColor: Colors.goldDim },
});

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: 60,
    paddingBottom: Spacing.xxl,
  },
  back: { marginBottom: Spacing.md },
  backText: { color: Colors.gold, fontSize: 14 },
  eyebrow: {
    color: Colors.gold,
    fontSize: 11,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: Spacing.xs,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: 30,
    fontFamily: 'Georgia',
    marginBottom: Spacing.xs,
  },
  subtitle: {
    color: Colors.textSecondary,
    fontSize: 14,
    lineHeight: 21,
    marginBottom: Spacing.xl,
  },
  sectionLabel: {
    color: Colors.textSecondary,
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: Spacing.sm,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: Spacing.xl,
  },
  chip: {
    borderWidth: 1,
    borderColor: Colors.blackBorder,
    borderRadius: Radii.full,
    paddingVertical: 8,
    paddingHorizontal: Spacing.md,
  },
  chipActive: {
    borderColor: Colors.gold,
    backgroundColor: Colors.goldDim + '33',
  },
  chipText: {
    color: Colors.textSecondary,
    fontSize: 13,
  },
  chipTextActive: {
    color: Colors.gold,
  },
  btn: {
    marginBottom: Spacing.sm,
  },
});

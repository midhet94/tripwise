import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, Spacing, Radii } from '../../constants/theme';
import { GoldButton } from '../../components/ui/GoldButton';
import { DIETARY_OPTIONS, ACCESSIBILITY_OPTIONS } from '../../constants/data';

export default function Step3Screen() {
  const router = useRouter();
  const [dietary, setDietary] = useState<string[]>([]);
  const [accessibility, setAccessibility] = useState<string[]>([]);

  function toggle<T>(arr: T[], item: T, setter: (a: T[]) => void) {
    setter(arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item]);
  }

  async function handleNext() {
    await AsyncStorage.setItem('tw_dietary', JSON.stringify({ dietary, accessibility }));
    router.push('/(onboarding)/step4');
  }

  return (
    <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
      <ProgressBar step={3} />

      <TouchableOpacity onPress={() => router.back()} style={styles.back}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.eyebrow}>Step 3 of 4</Text>
      <Text style={styles.title}>Dietary & Accessibility</Text>
      <Text style={styles.subtitle}>Every detail matters. We'll ensure everything is arranged before you arrive.</Text>

      <Text style={styles.sectionLabel}>Dietary Requirements</Text>
      <View style={styles.chipRow}>
        {DIETARY_OPTIONS.map((opt) => (
          <TouchableOpacity
            key={opt}
            style={[styles.chip, dietary.includes(opt) && styles.chipActive]}
            onPress={() => toggle(dietary, opt, setDietary)}
          >
            <Text style={[styles.chipText, dietary.includes(opt) && styles.chipTextActive]}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionLabel}>Accessibility Needs</Text>
      <View style={styles.chipRow}>
        {ACCESSIBILITY_OPTIONS.map((opt) => (
          <TouchableOpacity
            key={opt}
            style={[styles.chip, accessibility.includes(opt) && styles.chipActive]}
            onPress={() => toggle(accessibility, opt, setAccessibility)}
          >
            <Text style={[styles.chipText, accessibility.includes(opt) && styles.chipTextActive]}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.noteCard}>
        <Text style={styles.noteText}>
          🛡️  Your information is private and shared only with properties you book through Tripwise.
        </Text>
      </View>

      <GoldButton label="Continue" onPress={handleNext} style={styles.btn} />
      <GoldButton label="Skip for now" variant="ghost" onPress={() => router.push('/(onboarding)/step4')} />
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
  scroll: { flexGrow: 1, paddingHorizontal: Spacing.lg, paddingTop: 60, paddingBottom: Spacing.xxl },
  back: { marginBottom: Spacing.md },
  backText: { color: Colors.gold, fontSize: 14 },
  eyebrow: { color: Colors.gold, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', marginBottom: Spacing.xs },
  title: { color: Colors.textPrimary, fontSize: 30, fontFamily: 'Georgia', marginBottom: Spacing.xs },
  subtitle: { color: Colors.textSecondary, fontSize: 14, lineHeight: 21, marginBottom: Spacing.xl },
  sectionLabel: { color: Colors.textSecondary, fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: Spacing.sm },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: Spacing.xl },
  chip: { borderWidth: 1, borderColor: Colors.blackBorder, borderRadius: Radii.full, paddingVertical: 8, paddingHorizontal: Spacing.md },
  chipActive: { borderColor: Colors.gold, backgroundColor: Colors.goldDim + '33' },
  chipText: { color: Colors.textSecondary, fontSize: 13 },
  chipTextActive: { color: Colors.gold },
  noteCard: { backgroundColor: Colors.blackCard, borderRadius: Radii.md, borderWidth: 1, borderColor: Colors.blackBorder, padding: Spacing.md, marginBottom: Spacing.xl },
  noteText: { color: Colors.textSecondary, fontSize: 13, lineHeight: 19 },
  btn: { marginBottom: Spacing.sm },
});

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, Spacing, Radii } from '../../constants/theme';
import { GoldButton } from '../../components/ui/GoldButton';
import { LuxInput } from '../../components/ui/LuxInput';

const MARITAL_OPTIONS = ['Single', 'Married', 'Partnered', 'Prefer not to say'];

export default function Step1Screen() {
  const router = useRouter();
  const [maritalStatus, setMaritalStatus] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [anniversary, setAnniversary] = useState('');
  const [familyCount, setFamilyCount] = useState('');

  async function handleNext() {
    await AsyncStorage.setItem('tw_profile', JSON.stringify({ maritalStatus, birthdate, anniversary, familyCount }));
    router.push('/(onboarding)/step2');
  }

  return (
    <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
      <ProgressBar step={1} />

      <Text style={styles.eyebrow}>Step 1 of 4</Text>
      <Text style={styles.title}>Your Profile</Text>
      <Text style={styles.subtitle}>Help us personalise every journey for you and yours.</Text>

      <View style={styles.section}>
        <Text style={styles.fieldLabel}>Marital Status</Text>
        <View style={styles.optionRow}>
          {MARITAL_OPTIONS.map((opt) => (
            <TouchableOpacity
              key={opt}
              style={[styles.optionChip, maritalStatus === opt && styles.optionChipActive]}
              onPress={() => setMaritalStatus(opt)}
            >
              <Text style={[styles.optionText, maritalStatus === opt && styles.optionTextActive]}>
                {opt}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <LuxInput
        label="Date of Birth"
        value={birthdate}
        onChangeText={setBirthdate}
        placeholder="DD / MM / YYYY"
        keyboardType="numbers-and-punctuation"
      />

      {(maritalStatus === 'Married' || maritalStatus === 'Partnered') && (
        <LuxInput
          label="Anniversary Date"
          value={anniversary}
          onChangeText={setAnniversary}
          placeholder="DD / MM / YYYY"
          keyboardType="numbers-and-punctuation"
        />
      )}

      <LuxInput
        label="Number of Family Members Travelling"
        value={familyCount}
        onChangeText={setFamilyCount}
        placeholder="e.g. 3"
        keyboardType="number-pad"
      />

      <GoldButton label="Continue" onPress={handleNext} style={styles.btn} />
      <GoldButton label="Skip for now" variant="ghost" onPress={() => router.push('/(onboarding)/step2')} />
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
  section: {
    marginBottom: Spacing.md,
  },
  fieldLabel: {
    color: Colors.textSecondary,
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: Spacing.sm,
  },
  optionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionChip: {
    borderWidth: 1,
    borderColor: Colors.blackBorder,
    borderRadius: Radii.full,
    paddingVertical: 8,
    paddingHorizontal: Spacing.md,
  },
  optionChipActive: {
    borderColor: Colors.gold,
    backgroundColor: Colors.goldDim + '33',
  },
  optionText: {
    color: Colors.textSecondary,
    fontSize: 13,
  },
  optionTextActive: {
    color: Colors.gold,
  },
  btn: {
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
});

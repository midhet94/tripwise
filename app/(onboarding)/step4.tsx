import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, Spacing, Radii } from '../../constants/theme';
import { GoldButton } from '../../components/ui/GoldButton';

const PERKS = [
  { emoji: '🛎️', title: '24/7 Personal Concierge', desc: 'Reach us anytime, anywhere in the world.' },
  { emoji: '✈️', title: 'Private Jet Partnerships', desc: 'Seamless access to charter and fractional flights.' },
  { emoji: '🏰', title: 'Curated Properties Only', desc: 'Every stay personally vetted by our team.' },
  { emoji: '🎁', title: 'Member Surprises', desc: 'Thoughtful touches waiting at every destination.' },
];

export default function Step4Screen() {
  const router = useRouter();

  async function handleEnter() {
    await AsyncStorage.setItem('tw_onboarded', 'true');
    router.replace('/(tabs)');
  }

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <ProgressBar step={4} />

      <View style={styles.crownWrapper}>
        <Text style={styles.crown}>✦</Text>
      </View>

      <Text style={styles.eyebrow}>Welcome to Tripwise</Text>
      <Text style={styles.title}>You're in.</Text>
      <Text style={styles.subtitle}>
        Your world of extraordinary travel begins now. Every journey you take will be unlike any other.
      </Text>

      <View style={styles.perksList}>
        {PERKS.map((p) => (
          <View key={p.title} style={styles.perkRow}>
            <View style={styles.perkIcon}>
              <Text style={styles.perkEmoji}>{p.emoji}</Text>
            </View>
            <View style={styles.perkText}>
              <Text style={styles.perkTitle}>{p.title}</Text>
              <Text style={styles.perkDesc}>{p.desc}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.quoteCard}>
        <Text style={styles.quote}>
          "Travel is the only thing you buy that makes you richer — we ensure it is worthy of your time."
        </Text>
        <Text style={styles.quoteAttr}>— The Tripwise Team</Text>
      </View>

      <GoldButton label="Enter Tripwise" onPress={handleEnter} style={styles.btn} />
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
  crownWrapper: { alignItems: 'center', marginBottom: Spacing.md },
  crown: { color: Colors.gold, fontSize: 40 },
  eyebrow: { color: Colors.gold, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', marginBottom: Spacing.xs, textAlign: 'center' },
  title: { color: Colors.textPrimary, fontSize: 42, fontFamily: 'Georgia', textAlign: 'center', marginBottom: Spacing.sm },
  subtitle: { color: Colors.textSecondary, fontSize: 15, lineHeight: 23, textAlign: 'center', marginBottom: Spacing.xl },
  perksList: { marginBottom: Spacing.xl },
  perkRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: Spacing.lg },
  perkIcon: {
    width: 44,
    height: 44,
    borderRadius: Radii.full,
    backgroundColor: Colors.blackCard,
    borderWidth: 1,
    borderColor: Colors.blackBorder,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  perkEmoji: { fontSize: 20 },
  perkText: { flex: 1 },
  perkTitle: { color: Colors.textPrimary, fontSize: 15, fontWeight: '600', marginBottom: 2 },
  perkDesc: { color: Colors.textSecondary, fontSize: 13, lineHeight: 19 },
  quoteCard: {
    borderLeftWidth: 2,
    borderLeftColor: Colors.gold,
    paddingLeft: Spacing.md,
    marginBottom: Spacing.xl,
  },
  quote: { color: Colors.textSecondary, fontSize: 14, fontFamily: 'Georgia', fontStyle: 'italic', lineHeight: 22 },
  quoteAttr: { color: Colors.textMuted, fontSize: 12, marginTop: 6 },
  btn: { marginTop: Spacing.sm },
});

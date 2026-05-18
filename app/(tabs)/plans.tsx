import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Colors, Spacing, Radii } from '../../constants/theme';
import { GoldButton } from '../../components/ui/GoldButton';
import { Divider } from '../../components/ui/Divider';

const PLANS = [
  {
    id: 'luminary',
    name: 'Luminary',
    price: '₹4,99,000',
    period: 'per year',
    badge: null,
    color: Colors.gold,
    features: [
      '24/7 Personal Concierge',
      'Up to 4 curated trips per year',
      'Preferred rates at 500+ properties',
      'Priority booking & upgrades',
      'Anniversary & birthday surprises',
      'Dedicated travel manager',
    ],
  },
  {
    id: 'prestige',
    name: 'Prestige',
    price: '₹9,99,000',
    period: 'per year',
    badge: 'Most Popular',
    color: Colors.goldLight,
    features: [
      'Everything in Luminary',
      'Unlimited curated trips',
      'Private jet access & coordination',
      'Yacht & villa rentals',
      'White-glove airport services',
      'Exclusive event invitations',
      'Family sub-profiles',
      'Dedicated 24/7 concierge team',
    ],
  },
];

const ONE_OFF_SERVICES = [
  { title: 'Single Trip Curation', price: '₹25,000', desc: 'One fully planned journey' },
  { title: 'Honeymoon Planning', price: '₹40,000', desc: 'Romance, perfected' },
  { title: 'Anniversary Package', price: '₹30,000', desc: 'Unforgettable milestones' },
  { title: 'Family Grand Vacation', price: '₹60,000', desc: 'Multi-generational travel' },
];

export default function PlansScreen() {
  const [selected, setSelected] = useState('prestige');

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>✦  Membership</Text>
          <Text style={styles.title}>Choose Your Circle</Text>
          <Text style={styles.subtitle}>
            Exclusive access to the world's finest travel experiences, curated and executed with precision.
          </Text>
        </View>

        {PLANS.map((plan) => {
          const active = selected === plan.id;
          return (
            <TouchableOpacity
              key={plan.id}
              style={[styles.planCard, active && styles.planCardActive]}
              onPress={() => setSelected(plan.id)}
              activeOpacity={0.85}
            >
              {plan.badge && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularText}>{plan.badge}</Text>
                </View>
              )}
              <View style={styles.planHeader}>
                <View>
                  <Text style={[styles.planName, { color: plan.color }]}>{plan.name}</Text>
                  <Text style={styles.planPrice}>{plan.price}</Text>
                  <Text style={styles.planPeriod}>{plan.period}</Text>
                </View>
                <View style={[styles.radio, active && styles.radioActive]}>
                  {active && <View style={styles.radioDot} />}
                </View>
              </View>

              <Divider style={{ marginVertical: Spacing.md }} />

              {plan.features.map((f) => (
                <View key={f} style={styles.featureRow}>
                  <Text style={[styles.featureCheck, { color: plan.color }]}>✓</Text>
                  <Text style={styles.featureText}>{f}</Text>
                </View>
              ))}
            </TouchableOpacity>
          );
        })}

        <GoldButton
          label={`Join ${PLANS.find((p) => p.id === selected)?.name ?? ''}`}
          onPress={() => {}}
          style={styles.joinBtn}
        />

        <Text style={styles.restoreLink} onPress={() => {}}>
          Restore purchase
        </Text>

        <Divider />

        <Text style={styles.oneOffTitle}>One-Off Services</Text>
        <Text style={styles.oneOffSub}>Not ready for membership? Commission a single journey.</Text>

        {ONE_OFF_SERVICES.map((s) => (
          <TouchableOpacity key={s.title} style={styles.oneOffCard}>
            <View>
              <Text style={styles.oneOffName}>{s.title}</Text>
              <Text style={styles.oneOffDesc}>{s.desc}</Text>
            </View>
            <View style={styles.oneOffRight}>
              <Text style={styles.oneOffPrice}>{s.price}</Text>
              <Text style={styles.oneOffArrow}>→</Text>
            </View>
          </TouchableOpacity>
        ))}

        <View style={{ height: Spacing.xxl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.black },
  scroll: { flex: 1 },
  header: { paddingHorizontal: Spacing.md, paddingTop: Spacing.xl, paddingBottom: Spacing.lg },
  eyebrow: { color: Colors.gold, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', marginBottom: Spacing.xs },
  title: { color: Colors.textPrimary, fontSize: 32, fontFamily: 'Georgia', marginBottom: Spacing.sm },
  subtitle: { color: Colors.textSecondary, fontSize: 14, lineHeight: 21 },

  planCard: {
    marginHorizontal: Spacing.md,
    backgroundColor: Colors.blackCard,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: Colors.blackBorder,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
  },
  planCardActive: {
    borderColor: Colors.gold,
  },
  popularBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.gold,
    borderRadius: Radii.full,
    paddingVertical: 3,
    paddingHorizontal: 10,
    marginBottom: Spacing.sm,
  },
  popularText: { color: Colors.black, fontSize: 10, fontWeight: '700', letterSpacing: 0.5 },
  planHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  planName: { fontSize: 22, fontFamily: 'Georgia', marginBottom: 4 },
  planPrice: { color: Colors.textPrimary, fontSize: 28, fontWeight: '700' },
  planPeriod: { color: Colors.textSecondary, fontSize: 12 },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: Colors.blackBorder,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  radioActive: { borderColor: Colors.gold },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.gold },
  featureRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 },
  featureCheck: { fontSize: 14, marginRight: Spacing.sm, marginTop: 1 },
  featureText: { color: Colors.textSecondary, fontSize: 13, flex: 1, lineHeight: 19 },

  joinBtn: { marginHorizontal: Spacing.md, marginTop: Spacing.sm },
  restoreLink: { color: Colors.textMuted, fontSize: 13, textAlign: 'center', marginTop: Spacing.md, textDecorationLine: 'underline' },

  oneOffTitle: { color: Colors.textPrimary, fontSize: 22, fontFamily: 'Georgia', paddingHorizontal: Spacing.md, marginBottom: 4 },
  oneOffSub: { color: Colors.textSecondary, fontSize: 13, paddingHorizontal: Spacing.md, marginBottom: Spacing.md },
  oneOffCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: Spacing.md,
    backgroundColor: Colors.blackCard,
    borderRadius: Radii.md,
    borderWidth: 1,
    borderColor: Colors.blackBorder,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  oneOffName: { color: Colors.textPrimary, fontSize: 14, fontFamily: 'Georgia', marginBottom: 2 },
  oneOffDesc: { color: Colors.textSecondary, fontSize: 12 },
  oneOffRight: { alignItems: 'flex-end' },
  oneOffPrice: { color: Colors.gold, fontSize: 14, fontWeight: '600' },
  oneOffArrow: { color: Colors.textMuted, fontSize: 16, marginTop: 2 },
});

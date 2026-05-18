import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { Colors, Spacing, Radii } from '../../constants/theme';
import { GoldButton } from '../../components/ui/GoldButton';
import { LuxInput } from '../../components/ui/LuxInput';
import { Divider } from '../../components/ui/Divider';
import { FAMILY_MEMBERS, TRAVEL_PURPOSES, DESTINATIONS, EXPERIENCES } from '../../constants/data';

type Step = 'form' | 'confirm';

export default function BookScreen() {
  const [step, setStep] = useState<Step>('form');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [purpose, setPurpose] = useState('');
  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState('');
  const [selectedExp, setSelectedExp] = useState<string[]>([]);
  const [specialReq, setSpecialReq] = useState('');

  function toggleMember(id: string) {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  }
  function toggleExp(id: string) {
    setSelectedExp((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  }

  if (step === 'confirm') {
    return <ConfirmationScreen
      members={FAMILY_MEMBERS.filter((m) => selectedMembers.includes(m.id))}
      purpose={purpose}
      destination={destination}
      dates={dates}
      experiences={EXPERIENCES.filter((e) => selectedExp.includes(e.id))}
      specialReq={specialReq}
      onBack={() => setStep('form')}
    />;
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

        <View style={styles.header}>
          <Text style={styles.eyebrow}>✈️  Book a Trip</Text>
          <Text style={styles.title}>Commission Your{'\n'}Journey</Text>
          <Text style={styles.subtitle}>Tell us your vision. We'll make it extraordinary.</Text>
        </View>

        {/* Family Members */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Who's travelling?</Text>
          <View style={styles.memberRow}>
            <TouchableOpacity
              style={[styles.memberCard, selectedMembers.length === 0 && styles.memberCardActive]}
              onPress={() => setSelectedMembers([])}
            >
              <Text style={styles.memberEmoji}>🧳</Text>
              <Text style={[styles.memberName, selectedMembers.length === 0 && styles.memberNameActive]}>Just Me</Text>
            </TouchableOpacity>
            {FAMILY_MEMBERS.map((m) => (
              <TouchableOpacity
                key={m.id}
                style={[styles.memberCard, selectedMembers.includes(m.id) && styles.memberCardActive]}
                onPress={() => toggleMember(m.id)}
              >
                <Text style={styles.memberEmoji}>{m.emoji}</Text>
                <Text style={[styles.memberName, selectedMembers.includes(m.id) && styles.memberNameActive]}>
                  {m.name}
                </Text>
                <Text style={styles.memberRelation}>{m.relation}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Purpose */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Purpose of Travel</Text>
          <View style={styles.chipRow}>
            {TRAVEL_PURPOSES.map((p) => (
              <TouchableOpacity
                key={p}
                style={[styles.chip, purpose === p && styles.chipActive]}
                onPress={() => setPurpose(p)}
              >
                <Text style={[styles.chipText, purpose === p && styles.chipTextActive]}>{p}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Destination */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Destination</Text>
          <View style={styles.chipRow}>
            {DESTINATIONS.map((d) => (
              <TouchableOpacity
                key={d}
                style={[styles.chip, destination === d && styles.chipActive]}
                onPress={() => setDestination(d)}
              >
                <Text style={[styles.chipText, destination === d && styles.chipTextActive]}>{d}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Dates */}
        <View style={styles.section}>
          <LuxInput
            label="Travel Dates"
            value={dates}
            onChangeText={setDates}
            placeholder="e.g. 15 Jun – 22 Jun 2026"
          />
        </View>

        {/* Experiences */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Experiences to Include</Text>
          {EXPERIENCES.map((exp) => (
            <TouchableOpacity
              key={exp.id}
              style={[styles.expRow, selectedExp.includes(exp.id) && styles.expRowActive]}
              onPress={() => toggleExp(exp.id)}
            >
              <Text style={styles.expEmoji}>{exp.emoji}</Text>
              <View style={styles.expInfo}>
                <Text style={styles.expTitle}>{exp.title}</Text>
                <Text style={styles.expMeta}>{exp.location}  ·  {exp.duration}  ·  {exp.price}</Text>
              </View>
              <View style={[styles.checkbox, selectedExp.includes(exp.id) && styles.checkboxActive]}>
                {selectedExp.includes(exp.id) && <Text style={styles.checkmark}>✓</Text>}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Special Requests */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Special Requests</Text>
          <View style={styles.textAreaWrapper}>
            <TextInput
              style={styles.textArea}
              value={specialReq}
              onChangeText={setSpecialReq}
              placeholder="Dietary needs, room preferences, surprise arrangements..."
              placeholderTextColor={Colors.textMuted}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </View>

        <GoldButton
          label="Review Request"
          onPress={() => setStep('confirm')}
          style={styles.btn}
          disabled={!destination && !purpose}
        />

        <View style={{ height: Spacing.xxl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function ConfirmationScreen({
  members, purpose, destination, dates, experiences, specialReq, onBack,
}: {
  members: typeof FAMILY_MEMBERS;
  purpose: string;
  destination: string;
  dates: string;
  experiences: typeof EXPERIENCES;
  specialReq: string;
  onBack: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.successScroll}>
          <View style={styles.successIcon}>
            <Text style={styles.successEmoji}>✦</Text>
          </View>
          <Text style={styles.successTitle}>Request Sent</Text>
          <Text style={styles.successSub}>
            Your concierge will reach out within 2 hours with a personalised proposal.
          </Text>

          <View style={styles.conciergeCard}>
            <Text style={styles.conciergeLabel}>YOUR CONCIERGE</Text>
            <View style={styles.conciergeRow}>
              <View style={styles.conciergeAvatar}>
                <Text style={styles.conciergeAvatarText}>A</Text>
              </View>
              <View>
                <Text style={styles.conciergeName}>Aanya Sharma</Text>
                <Text style={styles.conciergeDesc}>Senior Travel Manager · Tripwise</Text>
                <Text style={styles.conciergeContact}>📞  +91 98765 43210</Text>
              </View>
            </View>
          </View>

          <Text style={styles.refNote}>Reference: TW-{Math.floor(100000 + Math.random() * 900000)}</Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>← Edit</Text>
        </TouchableOpacity>

        <Text style={styles.eyebrow}>Review</Text>
        <Text style={styles.title}>Your Request</Text>

        <View style={styles.confirmCard}>
          <SummaryRow label="Destination" value={destination || '—'} />
          <Divider />
          <SummaryRow label="Purpose" value={purpose || '—'} />
          <Divider />
          <SummaryRow label="Dates" value={dates || '—'} />
          <Divider />
          <SummaryRow
            label="Travellers"
            value={members.length === 0 ? 'Solo' : members.map((m) => m.name).join(', ')}
          />
          {experiences.length > 0 && (
            <>
              <Divider />
              <SummaryRow
                label="Experiences"
                value={experiences.map((e) => e.title).join('\n')}
              />
            </>
          )}
          {specialReq ? (
            <>
              <Divider />
              <SummaryRow label="Special Requests" value={specialReq} />
            </>
          ) : null}
        </View>

        <View style={styles.noteCard}>
          <Text style={styles.noteText}>
            🛎️  Once submitted, your dedicated concierge will begin crafting your bespoke itinerary and respond within 2 hours.
          </Text>
        </View>

        <GoldButton label="Submit Request" onPress={() => setSubmitted(true)} style={styles.btn} />
        <View style={{ height: Spacing.xxl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.summaryRow}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={styles.summaryValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.black },
  scroll: { flex: 1 },
  header: { paddingHorizontal: Spacing.md, paddingTop: Spacing.xl, paddingBottom: Spacing.lg },
  eyebrow: { color: Colors.gold, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', marginBottom: Spacing.xs },
  title: { color: Colors.textPrimary, fontSize: 32, fontFamily: 'Georgia', marginBottom: Spacing.sm, lineHeight: 38 },
  subtitle: { color: Colors.textSecondary, fontSize: 14, lineHeight: 21 },

  section: { paddingHorizontal: Spacing.md, marginBottom: Spacing.lg },
  sectionLabel: { color: Colors.textSecondary, fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: Spacing.sm },

  memberRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  memberCard: {
    alignItems: 'center',
    backgroundColor: Colors.blackCard,
    borderWidth: 1,
    borderColor: Colors.blackBorder,
    borderRadius: Radii.md,
    padding: Spacing.sm,
    minWidth: 70,
  },
  memberCardActive: { borderColor: Colors.gold, backgroundColor: Colors.goldDim + '22' },
  memberEmoji: { fontSize: 26, marginBottom: 4 },
  memberName: { color: Colors.textSecondary, fontSize: 12 },
  memberNameActive: { color: Colors.gold },
  memberRelation: { color: Colors.textMuted, fontSize: 10 },

  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { borderWidth: 1, borderColor: Colors.blackBorder, borderRadius: Radii.full, paddingVertical: 8, paddingHorizontal: Spacing.md },
  chipActive: { borderColor: Colors.gold, backgroundColor: Colors.goldDim + '33' },
  chipText: { color: Colors.textSecondary, fontSize: 13 },
  chipTextActive: { color: Colors.gold },

  expRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.blackCard,
    borderRadius: Radii.md,
    borderWidth: 1,
    borderColor: Colors.blackBorder,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  expRowActive: { borderColor: Colors.gold },
  expEmoji: { fontSize: 28, marginRight: Spacing.md },
  expInfo: { flex: 1 },
  expTitle: { color: Colors.textPrimary, fontSize: 13, fontFamily: 'Georgia', marginBottom: 2 },
  expMeta: { color: Colors.textSecondary, fontSize: 11 },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: Radii.sm,
    borderWidth: 1,
    borderColor: Colors.blackBorder,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Spacing.sm,
  },
  checkboxActive: { backgroundColor: Colors.gold, borderColor: Colors.gold },
  checkmark: { color: Colors.black, fontSize: 13, fontWeight: '700' },

  textAreaWrapper: {
    backgroundColor: Colors.blackCard,
    borderWidth: 1,
    borderColor: Colors.blackBorder,
    borderRadius: Radii.sm,
    padding: Spacing.md,
  },
  textArea: { color: Colors.textPrimary, fontSize: 14, minHeight: 100, lineHeight: 21 },

  btn: { marginHorizontal: Spacing.md, marginTop: Spacing.sm },

  backBtn: { padding: Spacing.md, paddingBottom: 0 },
  backText: { color: Colors.gold, fontSize: 14 },

  confirmCard: {
    marginHorizontal: Spacing.md,
    backgroundColor: Colors.blackCard,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: Colors.blackBorder,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
  },
  summaryRow: { paddingVertical: Spacing.sm },
  summaryLabel: { color: Colors.textSecondary, fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 },
  summaryValue: { color: Colors.textPrimary, fontSize: 14, lineHeight: 21 },

  noteCard: { marginHorizontal: Spacing.md, backgroundColor: Colors.blackCard, borderRadius: Radii.md, borderWidth: 1, borderColor: Colors.blackBorder, padding: Spacing.md, marginBottom: Spacing.lg },
  noteText: { color: Colors.textSecondary, fontSize: 13, lineHeight: 19 },

  successScroll: { flexGrow: 1, paddingHorizontal: Spacing.lg, paddingTop: 80, alignItems: 'center' },
  successIcon: { width: 80, height: 80, borderRadius: 40, backgroundColor: Colors.goldDim + '33', justifyContent: 'center', alignItems: 'center', marginBottom: Spacing.lg, borderWidth: 1, borderColor: Colors.gold },
  successEmoji: { color: Colors.gold, fontSize: 36 },
  successTitle: { color: Colors.textPrimary, fontSize: 32, fontFamily: 'Georgia', marginBottom: Spacing.sm },
  successSub: { color: Colors.textSecondary, fontSize: 15, textAlign: 'center', lineHeight: 23, marginBottom: Spacing.xl },
  conciergeCard: { width: '100%', backgroundColor: Colors.blackCard, borderRadius: Radii.lg, borderWidth: 1, borderColor: Colors.gold + '55', padding: Spacing.lg, marginBottom: Spacing.lg },
  conciergeLabel: { color: Colors.gold, fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', marginBottom: Spacing.md },
  conciergeRow: { flexDirection: 'row', alignItems: 'center' },
  conciergeAvatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: Colors.goldDim, justifyContent: 'center', alignItems: 'center', marginRight: Spacing.md },
  conciergeAvatarText: { color: Colors.black, fontSize: 22, fontWeight: '700' },
  conciergeName: { color: Colors.textPrimary, fontSize: 16, fontFamily: 'Georgia', marginBottom: 2 },
  conciergeDesc: { color: Colors.textSecondary, fontSize: 12, marginBottom: 4 },
  conciergeContact: { color: Colors.gold, fontSize: 13 },
  refNote: { color: Colors.textMuted, fontSize: 12, marginTop: Spacing.md },
});

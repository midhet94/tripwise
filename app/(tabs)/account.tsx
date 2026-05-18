import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, Spacing, Radii } from '../../constants/theme';
import { Divider } from '../../components/ui/Divider';
import { PAST_ITINERARIES, ONGOING_ITINERARIES, FAMILY_MEMBERS } from '../../constants/data';

export default function AccountScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'ongoing' | 'past'>('ongoing');

  async function handleLogout() {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem('tw_token');
          router.replace('/(auth)/login');
        },
      },
    ]);
  }

  const itineraries = activeTab === 'ongoing' ? ONGOING_ITINERARIES : PAST_ITINERARIES;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>M</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Midhet Sulemani</Text>
            <Text style={styles.profileEmail}>midhetfatema94@gmail.com</Text>
            <View style={styles.memberBadge}>
              <Text style={styles.memberBadgeText}>✦  Prestige Member</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editBtnText}>Edit</Text>
          </TouchableOpacity>
        </View>

        <Divider />

        {/* Itineraries */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Journeys</Text>
          <View style={styles.tabRow}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'ongoing' && styles.tabActive]}
              onPress={() => setActiveTab('ongoing')}
            >
              <Text style={[styles.tabText, activeTab === 'ongoing' && styles.tabTextActive]}>Upcoming</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'past' && styles.tabActive]}
              onPress={() => setActiveTab('past')}
            >
              <Text style={[styles.tabText, activeTab === 'past' && styles.tabTextActive]}>Past</Text>
            </TouchableOpacity>
          </View>

          {itineraries.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>✈️</Text>
              <Text style={styles.emptyText}>No journeys here yet.</Text>
            </View>
          )}

          {itineraries.map((it) => (
            <View key={it.id} style={styles.itineraryCard}>
              <View style={styles.itLeft}>
                <Text style={styles.itEmoji}>{it.emoji}</Text>
                <View>
                  <Text style={styles.itDest}>{it.destination}</Text>
                  <Text style={styles.itHotel}>{it.hotel}</Text>
                  <Text style={styles.itDates}>{it.dates}</Text>
                </View>
              </View>
              <View style={[styles.itStatus, it.status === 'upcoming' && styles.itStatusUpcoming]}>
                <Text style={[styles.itStatusText, it.status === 'upcoming' && styles.itStatusTextUpcoming]}>
                  {it.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <Divider />

        {/* Family Members */}
        <View style={styles.section}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Family Members</Text>
            <TouchableOpacity>
              <Text style={styles.addLink}>+ Add</Text>
            </TouchableOpacity>
          </View>
          {FAMILY_MEMBERS.map((m) => (
            <View key={m.id} style={styles.familyCard}>
              <View style={styles.familyLeft}>
                <Text style={styles.familyEmoji}>{m.emoji}</Text>
                <View>
                  <Text style={styles.familyName}>{m.name}</Text>
                  <Text style={styles.familyMeta}>{m.relation}  ·  Age {m.age}</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Text style={styles.editSmall}>Edit</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <Divider />

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          {[
            { label: 'Edit Profile', icon: '👤' },
            { label: 'Notification Preferences', icon: '🔔' },
            { label: 'Manage Membership', icon: '👑' },
            { label: 'Restore Purchase', icon: '🔄' },
            { label: 'Privacy Policy', icon: '🔒' },
            { label: 'Help & Support', icon: '💬' },
          ].map((item) => (
            <TouchableOpacity key={item.label} style={styles.settingRow}>
              <Text style={styles.settingIcon}>{item.icon}</Text>
              <Text style={styles.settingLabel}>{item.label}</Text>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Divider />

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Tripwise v1.0.0  ·  Member since May 2026</Text>
        <View style={{ height: Spacing.xxl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.black },
  scroll: { flex: 1 },

  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.goldDim,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  avatarText: { color: Colors.black, fontSize: 28, fontWeight: '700' },
  profileInfo: { flex: 1 },
  profileName: { color: Colors.textPrimary, fontSize: 18, fontFamily: 'Georgia', marginBottom: 2 },
  profileEmail: { color: Colors.textSecondary, fontSize: 13, marginBottom: 6 },
  memberBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.goldDim + '33',
    borderRadius: Radii.full,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.goldDim,
  },
  memberBadgeText: { color: Colors.gold, fontSize: 11, letterSpacing: 1 },
  editBtn: {
    borderWidth: 1,
    borderColor: Colors.blackBorder,
    borderRadius: Radii.sm,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  editBtnText: { color: Colors.textSecondary, fontSize: 12 },

  section: { paddingHorizontal: Spacing.md, paddingTop: Spacing.md, paddingBottom: Spacing.sm },
  sectionTitle: { color: Colors.textPrimary, fontSize: 20, fontFamily: 'Georgia', marginBottom: Spacing.md },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.md },
  addLink: { color: Colors.gold, fontSize: 14 },

  tabRow: { flexDirection: 'row', marginBottom: Spacing.md, gap: 8 },
  tab: { paddingVertical: 8, paddingHorizontal: Spacing.lg, borderRadius: Radii.full, borderWidth: 1, borderColor: Colors.blackBorder },
  tabActive: { borderColor: Colors.gold, backgroundColor: Colors.goldDim + '22' },
  tabText: { color: Colors.textSecondary, fontSize: 13 },
  tabTextActive: { color: Colors.gold },

  emptyState: { alignItems: 'center', paddingVertical: Spacing.xl },
  emptyEmoji: { fontSize: 40, marginBottom: Spacing.sm },
  emptyText: { color: Colors.textMuted, fontSize: 14 },

  itineraryCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.blackCard,
    borderRadius: Radii.md,
    borderWidth: 1,
    borderColor: Colors.blackBorder,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  itLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  itEmoji: { fontSize: 30, marginRight: Spacing.md },
  itDest: { color: Colors.textPrimary, fontSize: 14, fontFamily: 'Georgia', marginBottom: 2 },
  itHotel: { color: Colors.textSecondary, fontSize: 12, marginBottom: 2 },
  itDates: { color: Colors.textMuted, fontSize: 11 },
  itStatus: { backgroundColor: Colors.blackSoft, borderRadius: Radii.full, paddingVertical: 4, paddingHorizontal: 10 },
  itStatusUpcoming: { backgroundColor: Colors.goldDim + '33', borderWidth: 1, borderColor: Colors.goldDim },
  itStatusText: { color: Colors.textMuted, fontSize: 11 },
  itStatusTextUpcoming: { color: Colors.gold },

  familyCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.blackCard,
    borderRadius: Radii.md,
    borderWidth: 1,
    borderColor: Colors.blackBorder,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  familyLeft: { flexDirection: 'row', alignItems: 'center' },
  familyEmoji: { fontSize: 28, marginRight: Spacing.md },
  familyName: { color: Colors.textPrimary, fontSize: 14, fontFamily: 'Georgia', marginBottom: 2 },
  familyMeta: { color: Colors.textSecondary, fontSize: 12 },
  editSmall: { color: Colors.textMuted, fontSize: 12 },

  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.blackBorder,
  },
  settingIcon: { fontSize: 18, marginRight: Spacing.md },
  settingLabel: { flex: 1, color: Colors.textPrimary, fontSize: 14 },
  settingArrow: { color: Colors.textMuted, fontSize: 18 },

  logoutBtn: { marginHorizontal: Spacing.md, paddingVertical: Spacing.md, alignItems: 'center', borderWidth: 1, borderColor: Colors.error + '55', borderRadius: Radii.sm, marginBottom: Spacing.lg },
  logoutText: { color: Colors.error, fontSize: 14, letterSpacing: 0.5 },
  version: { color: Colors.textMuted, fontSize: 11, textAlign: 'center', marginBottom: Spacing.sm },
});

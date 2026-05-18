import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Spacing, Radii } from '../../constants/theme';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { STAYS, EXPERIENCES, DEALS } from '../../constants/data';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.wordmark}>TRIPWISE</Text>
            <Text style={styles.greeting}>Good morning, Midhet</Text>
          </View>
          <TouchableOpacity style={styles.notifBtn}>
            <Text style={styles.notifIcon}>🔔</Text>
          </TouchableOpacity>
        </View>

        {/* Hero banner */}
        <View style={styles.heroBanner}>
          <Text style={styles.heroEyebrow}>✦  CONCIERGE PICK</Text>
          <Text style={styles.heroTitle}>Maldives{'\n'}Awaits</Text>
          <Text style={styles.heroSub}>Overwater villas from ₹1,80,000 / night</Text>
          <TouchableOpacity style={styles.heroBtn} onPress={() => router.push('/(tabs)/book')}>
            <Text style={styles.heroBtnText}>ENQUIRE NOW</Text>
          </TouchableOpacity>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>🌴  Limited availability</Text>
          </View>
        </View>

        {/* Curated Stays */}
        <SectionHeader title="Curated Stays" onSeeAll={() => {}} />
        <FlatList
          data={STAYS}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.hList}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.stayCard}>
              <View style={styles.stayImagePlaceholder}>
                <Text style={styles.stayEmoji}>{item.emoji}</Text>
                <View style={styles.stayTag}>
                  <Text style={styles.stayTagText}>{item.tag}</Text>
                </View>
              </View>
              <View style={styles.stayInfo}>
                <Text style={styles.stayName}>{item.name}</Text>
                <Text style={styles.stayLocation}>{item.location}</Text>
                <View style={styles.stayMeta}>
                  <Text style={styles.stayPrice}>{item.price} / night</Text>
                  <Text style={styles.stayRating}>★ {item.rating}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />

        {/* Experiences */}
        <SectionHeader title="Experiences" onSeeAll={() => {}} />
        <FlatList
          data={EXPERIENCES}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.hList}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.expCard}>
              <View style={styles.expImagePlaceholder}>
                <Text style={styles.expEmoji}>{item.emoji}</Text>
              </View>
              <View style={styles.expInfo}>
                <Text style={styles.expCategory}>{item.category}</Text>
                <Text style={styles.expTitle}>{item.title}</Text>
                <Text style={styles.expMeta}>{item.location}  ·  {item.duration}</Text>
                <Text style={styles.expPrice}>{item.price}</Text>
              </View>
            </TouchableOpacity>
          )}
        />

        {/* Deals */}
        <SectionHeader title="Member Deals" onSeeAll={() => {}} />
        <View style={styles.dealsList}>
          {DEALS.map((deal) => (
            <TouchableOpacity key={deal.id} style={styles.dealCard}>
              <View style={styles.dealLeft}>
                <Text style={styles.dealEmoji}>{deal.emoji}</Text>
                <View style={styles.dealText}>
                  <Text style={styles.dealTitle}>{deal.title}</Text>
                  <Text style={styles.dealDesc}>{deal.description}</Text>
                  <Text style={styles.dealExpiry}>Expires {deal.expires}</Text>
                </View>
              </View>
              <View style={styles.dealSaving}>
                <Text style={styles.dealSavingText}>{deal.saving}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: Spacing.xxl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.black },
  scroll: { flex: 1 },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg,
  },
  wordmark: { color: Colors.gold, fontSize: 16, letterSpacing: 5, fontFamily: 'Georgia' },
  greeting: { color: Colors.textSecondary, fontSize: 13, marginTop: 2 },
  notifBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  notifIcon: { fontSize: 20 },

  heroBanner: {
    marginHorizontal: Spacing.md,
    borderRadius: Radii.lg,
    backgroundColor: Colors.blackCard,
    borderWidth: 1,
    borderColor: Colors.blackBorder,
    padding: Spacing.xl,
    marginBottom: Spacing.xl,
    overflow: 'hidden',
  },
  heroEyebrow: { color: Colors.gold, fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', marginBottom: Spacing.sm },
  heroTitle: { color: Colors.textPrimary, fontSize: 40, fontFamily: 'Georgia', lineHeight: 46, marginBottom: Spacing.sm },
  heroSub: { color: Colors.textSecondary, fontSize: 13, marginBottom: Spacing.lg },
  heroBtn: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: Colors.gold,
    borderRadius: Radii.sm,
    paddingVertical: 10,
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  heroBtnText: { color: Colors.gold, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase' },
  heroBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.goldDim + '22',
    borderRadius: Radii.full,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  heroBadgeText: { color: Colors.goldLight, fontSize: 11 },

  hList: { paddingHorizontal: Spacing.md, paddingBottom: Spacing.lg },

  stayCard: {
    width: 220,
    backgroundColor: Colors.blackCard,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: Colors.blackBorder,
    marginRight: Spacing.md,
    overflow: 'hidden',
  },
  stayImagePlaceholder: {
    height: 130,
    backgroundColor: Colors.blackSoft,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stayEmoji: { fontSize: 48 },
  stayTag: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: Colors.gold + 'DD',
    borderRadius: Radii.full,
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  stayTagText: { color: Colors.black, fontSize: 10, fontWeight: '700', letterSpacing: 0.5 },
  stayInfo: { padding: Spacing.md },
  stayName: { color: Colors.textPrimary, fontSize: 15, fontFamily: 'Georgia', marginBottom: 2 },
  stayLocation: { color: Colors.textSecondary, fontSize: 12, marginBottom: Spacing.sm },
  stayMeta: { flexDirection: 'row', justifyContent: 'space-between' },
  stayPrice: { color: Colors.gold, fontSize: 13, fontWeight: '600' },
  stayRating: { color: Colors.textSecondary, fontSize: 12 },

  expCard: {
    width: 180,
    backgroundColor: Colors.blackCard,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: Colors.blackBorder,
    marginRight: Spacing.md,
    overflow: 'hidden',
  },
  expImagePlaceholder: {
    height: 110,
    backgroundColor: Colors.blackSoft,
    justifyContent: 'center',
    alignItems: 'center',
  },
  expEmoji: { fontSize: 44 },
  expInfo: { padding: Spacing.md },
  expCategory: { color: Colors.gold, fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 2 },
  expTitle: { color: Colors.textPrimary, fontSize: 13, fontFamily: 'Georgia', marginBottom: 4, lineHeight: 18 },
  expMeta: { color: Colors.textSecondary, fontSize: 11, marginBottom: 4 },
  expPrice: { color: Colors.gold, fontSize: 13, fontWeight: '600' },

  dealsList: { paddingHorizontal: Spacing.md, marginBottom: Spacing.md },
  dealCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.blackCard,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: Colors.blackBorder,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  dealLeft: { flexDirection: 'row', alignItems: 'flex-start', flex: 1 },
  dealEmoji: { fontSize: 28, marginRight: Spacing.md },
  dealText: { flex: 1 },
  dealTitle: { color: Colors.textPrimary, fontSize: 14, fontFamily: 'Georgia', marginBottom: 2 },
  dealDesc: { color: Colors.textSecondary, fontSize: 12, lineHeight: 17, marginBottom: 4 },
  dealExpiry: { color: Colors.textMuted, fontSize: 11 },
  dealSaving: {
    backgroundColor: Colors.success + '22',
    borderRadius: Radii.sm,
    padding: 6,
    marginLeft: Spacing.sm,
  },
  dealSavingText: { color: Colors.success, fontSize: 11, fontWeight: '600', textAlign: 'center' },
});

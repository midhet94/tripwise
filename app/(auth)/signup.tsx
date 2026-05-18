import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, Spacing, Radii } from '../../constants/theme';
import { GoldButton } from '../../components/ui/GoldButton';
import { LuxInput } from '../../components/ui/LuxInput';

export default function SignupScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPass, setShowPass] = useState(false);

  function validate() {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'Full name is required.';
    if (!email.trim() || !email.includes('@')) e.email = 'Enter a valid email.';
    if (password.length < 8) e.password = 'Password must be at least 8 characters.';
    if (!inviteCode.trim()) e.inviteCode = 'An invite code is required to join.';
    return e;
  }

  async function handleSignup() {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    await AsyncStorage.setItem('tw_token', 'mock_token_' + Date.now());
    await AsyncStorage.setItem('tw_user_name', name);
    setLoading(false);
    router.replace('/(onboarding)/step1');
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: Colors.black }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <TouchableOpacity onPress={() => router.back()} style={styles.back}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.wordmark}>TRIPWISE</Text>
        </View>

        <View style={styles.inviteBadge}>
          <Text style={styles.inviteBadgeText}>✦  By Invitation Only</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join the circle of discerning travellers</Text>

          <LuxInput
            label="Full Name"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            placeholder="Your name"
            error={errors.name}
          />
          <LuxInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="you@example.com"
            error={errors.email}
          />
          <LuxInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPass}
            placeholder="Min. 8 characters"
            error={errors.password}
            rightIcon={<Text style={styles.showHide}>{showPass ? 'Hide' : 'Show'}</Text>}
            onRightIconPress={() => setShowPass(!showPass)}
          />
          <LuxInput
            label="Invite Code"
            value={inviteCode}
            onChangeText={(t) => setInviteCode(t.toUpperCase())}
            autoCapitalize="characters"
            placeholder="TW-XXXXXX"
            error={errors.inviteCode}
          />

          <Text style={styles.inviteHint}>
            Your invite code was sent by your Tripwise concierge or a referring member.
          </Text>

          <GoldButton label="Create Account" onPress={handleSignup} loading={loading} style={styles.btn} />
        </View>

        <Text style={styles.footerNote}>By continuing, you agree to Tripwise's{'\n'}Terms of Service and Privacy Policy.</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: 60,
    paddingBottom: Spacing.xxl,
  },
  back: {
    marginBottom: Spacing.md,
  },
  backText: {
    color: Colors.gold,
    fontSize: 14,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  wordmark: {
    color: Colors.gold,
    fontSize: 24,
    letterSpacing: 8,
    fontFamily: 'Georgia',
  },
  inviteBadge: {
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: Colors.goldDim,
    borderRadius: Radii.full,
    paddingVertical: 6,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
  },
  inviteBadgeText: {
    color: Colors.goldDim,
    fontSize: 11,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  form: {
    backgroundColor: Colors.blackCard,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: Colors.blackBorder,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: 26,
    fontFamily: 'Georgia',
    marginBottom: 4,
  },
  subtitle: {
    color: Colors.textSecondary,
    fontSize: 14,
    marginBottom: Spacing.lg,
  },
  showHide: {
    color: Colors.gold,
    fontSize: 12,
  },
  inviteHint: {
    color: Colors.textMuted,
    fontSize: 12,
    lineHeight: 17,
    marginBottom: Spacing.md,
    marginTop: -Spacing.sm,
  },
  btn: {
    marginTop: Spacing.sm,
  },
  footerNote: {
    color: Colors.textMuted,
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 17,
  },
});

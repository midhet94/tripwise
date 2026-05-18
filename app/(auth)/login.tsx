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

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);

  async function handleLogin() {
    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }
    setError('');
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    await AsyncStorage.setItem('tw_token', 'mock_token_' + Date.now());
    setLoading(false);
    const onboarded = await AsyncStorage.getItem('tw_onboarded');
    if (onboarded === 'true') {
      router.replace('/(tabs)');
    } else {
      router.replace('/(onboarding)/step1');
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: Colors.black }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.wordmark}>TRIPWISE</Text>
          <Text style={styles.tagline}>Concierge travel, curated for you.</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Sign in to your account</Text>

          {error ? <Text style={styles.errorBanner}>{error}</Text> : null}

          <LuxInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            placeholder="you@example.com"
          />
          <LuxInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPass}
            placeholder="••••••••"
            rightIcon={
              <Text style={styles.showHide}>{showPass ? 'Hide' : 'Show'}</Text>
            }
            onRightIconPress={() => setShowPass(!showPass)}
          />

          <TouchableOpacity style={styles.forgotRow}>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>

          <GoldButton label="Sign In" onPress={handleLogin} loading={loading} style={styles.btn} />

          <View style={styles.dividerRow}>
            <View style={styles.divLine} />
            <Text style={styles.divText}>or</Text>
            <View style={styles.divLine} />
          </View>

          <GoldButton
            label="Create Account"
            variant="outline"
            onPress={() => router.push('/(auth)/signup')}
            style={styles.btn}
          />
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
    paddingTop: 80,
    paddingBottom: Spacing.xxl,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  wordmark: {
    color: Colors.gold,
    fontSize: 28,
    letterSpacing: 8,
    fontFamily: 'Georgia',
    marginBottom: Spacing.xs,
  },
  tagline: {
    color: Colors.textSecondary,
    fontSize: 13,
    letterSpacing: 0.5,
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
  errorBanner: {
    backgroundColor: Colors.error + '22',
    color: Colors.error,
    borderRadius: Radii.sm,
    padding: Spacing.sm,
    marginBottom: Spacing.md,
    fontSize: 13,
  },
  showHide: {
    color: Colors.gold,
    fontSize: 12,
    letterSpacing: 0.5,
  },
  forgotRow: {
    alignSelf: 'flex-end',
    marginBottom: Spacing.md,
    marginTop: -Spacing.sm,
  },
  forgotText: {
    color: Colors.gold,
    fontSize: 13,
  },
  btn: {
    marginTop: Spacing.sm,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.md,
  },
  divLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.blackBorder,
  },
  divText: {
    color: Colors.textMuted,
    marginHorizontal: Spacing.sm,
    fontSize: 12,
    letterSpacing: 1,
  },
  footerNote: {
    color: Colors.textMuted,
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 17,
  },
});

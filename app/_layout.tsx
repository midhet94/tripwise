import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useSegments } from 'expo-router';
import { Colors } from '../constants/theme';

export default function RootLayout() {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [onboarded, setOnboarded] = useState(false);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    async function bootstrap() {
      const token = await AsyncStorage.getItem('tw_token');
      const ob = await AsyncStorage.getItem('tw_onboarded');
      setAuthed(!!token);
      setOnboarded(ob === 'true');
      setReady(true);
    }
    bootstrap();
  }, []);

  useEffect(() => {
    if (!ready) return;
    const inAuth = segments[0] === '(auth)';
    const inOnboarding = segments[0] === '(onboarding)';

    if (!authed && !inAuth) {
      router.replace('/(auth)/login');
    } else if (authed && !onboarded && !inOnboarding) {
      router.replace('/(onboarding)/step1');
    } else if (authed && onboarded && (inAuth || inOnboarding)) {
      router.replace('/(tabs)');
    }
  }, [ready, authed, onboarded]);

  if (!ready) {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.black, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color={Colors.gold} />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: Colors.black } }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(onboarding)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );
}

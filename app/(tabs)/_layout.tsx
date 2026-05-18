import React from 'react';
import { Tabs } from 'expo-router';
import { Text, View, StyleSheet } from 'react-native';
import { Colors } from '../../constants/theme';

function TabIcon({ emoji, label, focused }: { emoji: string; label: string; focused: boolean }) {
  return (
    <View style={ti.wrapper}>
      <Text style={ti.emoji}>{emoji}</Text>
      <Text style={[ti.label, focused && ti.labelFocused]}>{label}</Text>
    </View>
  );
}

const ti = StyleSheet.create({
  wrapper: { alignItems: 'center', paddingTop: 6 },
  emoji: { fontSize: 20 },
  label: { fontSize: 10, color: Colors.textMuted, marginTop: 2, letterSpacing: 0.5 },
  labelFocused: { color: Colors.gold },
});

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.blackCard,
          borderTopColor: Colors.blackBorder,
          borderTopWidth: 1,
          height: 80,
          paddingBottom: 16,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="✦" label="Home" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="book"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="✈️" label="Book" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="plans"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="👑" label="Plans" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="◎" label="Account" focused={focused} />,
        }}
      />
    </Tabs>
  );
}

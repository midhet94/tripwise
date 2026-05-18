import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Spacing } from '../../constants/theme';

type Props = {
  title: string;
  onSeeAll?: () => void;
};

export function SectionHeader({ title, onSeeAll }: Props) {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      {onSeeAll && (
        <TouchableOpacity onPress={onSeeAll}>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: 20,
    fontFamily: 'Georgia',
    fontStyle: 'italic',
    letterSpacing: 0.3,
  },
  seeAll: {
    color: Colors.gold,
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});

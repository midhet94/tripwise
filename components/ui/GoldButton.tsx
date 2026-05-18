import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Colors, Radii, Spacing } from '../../constants/theme';

type Props = {
  label: string;
  onPress: () => void;
  loading?: boolean;
  variant?: 'solid' | 'outline' | 'ghost';
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
};

export function GoldButton({
  label,
  onPress,
  loading = false,
  variant = 'solid',
  style,
  textStyle,
  disabled = false,
}: Props) {
  return (
    <TouchableOpacity
      style={[
        styles.base,
        variant === 'solid' && styles.solid,
        variant === 'outline' && styles.outline,
        variant === 'ghost' && styles.ghost,
        (disabled || loading) && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.75}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'solid' ? Colors.black : Colors.gold} />
      ) : (
        <Text
          style={[
            styles.label,
            variant === 'outline' && styles.labelOutline,
            variant === 'ghost' && styles.labelGhost,
            textStyle,
          ]}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 52,
    borderRadius: Radii.sm,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  solid: {
    backgroundColor: Colors.gold,
  },
  outline: {
    borderWidth: 1,
    borderColor: Colors.gold,
    backgroundColor: 'transparent',
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.4,
  },
  label: {
    color: Colors.black,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  labelOutline: {
    color: Colors.gold,
  },
  labelGhost: {
    color: Colors.gold,
  },
});

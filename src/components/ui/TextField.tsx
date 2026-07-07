import React, { useState } from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useTheme } from '../../theme';
import { AppText } from './AppText';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

interface TextFieldProps extends TextInputProps {
  label: string;
  icon?: IconName;
  error?: string;
}

export function TextField({ label, icon, error, style, ...rest }: TextFieldProps) {
  const { theme } = useTheme();
  const [focused, setFocused] = useState(false);
  const borderColor = error
    ? theme.colors.danger
    : focused
    ? theme.colors.primary
    : theme.colors.border;

  return (
    <View style={styles.wrap}>
      <AppText variant="label" muted style={styles.label}>
        {label}
      </AppText>
      <View
        style={[
          styles.field,
          { backgroundColor: theme.colors.surface, borderColor, borderWidth: 1.5 },
        ]}>
        {icon ? (
          <Ionicons
            name={icon}
            size={18}
            color={focused ? theme.colors.primary : theme.colors.textFaint}
          />
        ) : null}
        <TextInput
          {...rest}
          style={[styles.input, { color: theme.colors.text }, style]}
          placeholderTextColor={theme.colors.textFaint}
          onFocus={e => {
            setFocused(true);
            rest.onFocus?.(e);
          }}
          onBlur={e => {
            setFocused(false);
            rest.onBlur?.(e);
          }}
          accessibilityLabel={label}
        />
      </View>
      {error ? (
        <AppText variant="caption" color={theme.colors.danger} style={styles.error}>
          {error}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 14 },
  label: { marginBottom: 6 },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 14,
    paddingHorizontal: 14,
    minHeight: 52,
  },
  input: { flex: 1, fontSize: 15, paddingVertical: 12 },
  error: { marginTop: 4 },
});

import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import { useTheme } from '../../theme';
import { TypographyVariant } from '../../theme/tokens';

interface AppTextProps extends TextProps {
  variant?: TypographyVariant;
  color?: string;
  muted?: boolean;
  center?: boolean;
  style?: TextStyle | TextStyle[];
}

export function AppText({
  variant = 'body',
  color,
  muted = false,
  center = false,
  style,
  children,
  ...rest
}: AppTextProps) {
  const { theme } = useTheme();
  const base = theme.typography[variant];
  return (
    <Text
      {...rest}
      style={[
        {
          fontSize: base.fontSize,
          lineHeight: base.lineHeight,
          fontWeight: base.fontWeight,
          letterSpacing: base.letterSpacing,
          color: color ?? (muted ? theme.colors.textMuted : theme.colors.text),
          textAlign: center ? 'center' : undefined,
        },
        style,
      ]}>
      {children}
    </Text>
  );
}

import { Feather } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { Pressable, Text } from 'react-native';

import { Colors } from '@/constants/Colors';
import { PROPERTY } from '@/data/property';

type Variant = 'primary' | 'subtle';

export function BookButton({
  label = 'Book Your Next Stay',
  variant = 'primary',
  className = '',
}: {
  label?: string;
  variant?: Variant;
  className?: string;
}) {
  const open = () =>
    WebBrowser.openBrowserAsync(PROPERTY.bookingUrl, {
      presentationStyle: WebBrowser.WebBrowserPresentationStyle.PAGE_SHEET,
      toolbarColor: Colors.sand[50],
      controlsColor: Colors.terracotta[500],
      dismissButtonStyle: 'close',
    });

  if (variant === 'subtle') {
    return (
      <Pressable
        onPress={open}
        className={`flex-row items-center justify-center rounded-2xl border border-sand-300 bg-white py-4 active:opacity-60 ${className}`}>
        <Feather name="calendar" size={14} color={Colors.terracotta[500]} />
        <Text
          className="ml-2 text-xs uppercase text-earth-700"
          style={{ fontFamily: 'Inter_600SemiBold', letterSpacing: 2 }}>
          {label}
        </Text>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={open}
      className={`flex-row items-center justify-center rounded-2xl bg-terracotta-500 py-4 active:opacity-80 ${className}`}>
      <Feather name="calendar" size={15} color={Colors.sand[50]} />
      <Text
        className="ml-2 text-sm uppercase text-sand-50"
        style={{ fontFamily: 'Inter_600SemiBold', letterSpacing: 2 }}>
        {label}
      </Text>
    </Pressable>
  );
}

import { Feather } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { useRef, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { Colors } from '@/constants/Colors';

function CopyRow({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = async () => {
    await Clipboard.setStringAsync(value);
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1600);
  };

  return (
    <Pressable
      onPress={copy}
      className="flex-row items-center justify-between rounded-xl bg-sand-100 px-4 py-3 active:opacity-70">
      <View className="flex-1">
        <Text
          className="text-[10px] uppercase text-earth-600"
          style={{ fontFamily: 'Inter_600SemiBold', letterSpacing: 1.5 }}>
          {label}
        </Text>
        <Text
          className="mt-0.5 text-base text-earth-700"
          style={{ fontFamily: 'Inter_500Medium' }}>
          {value}
        </Text>
      </View>
      <View className="ml-3 flex-row items-center gap-1.5 rounded-full bg-sand-50 px-3 py-1.5">
        <Feather
          name={copied ? 'check' : 'copy'}
          size={12}
          color={copied ? Colors.sage[600] : Colors.terracotta[500]}
        />
        <Text
          className="text-[10px] uppercase"
          style={{
            fontFamily: 'Inter_600SemiBold',
            letterSpacing: 1.2,
            color: copied ? Colors.sage[600] : Colors.terracotta[500],
          }}>
          {copied ? 'Copied' : 'Copy'}
        </Text>
      </View>
    </Pressable>
  );
}

export function WifiCard({
  network,
  password,
  note,
}: {
  network: string;
  password: string;
  note?: string;
}) {
  return (
    <View className="gap-2">
      <CopyRow label="Network" value={network} />
      <CopyRow label="Password" value={password} />
      {note && (
        <Text
          className="mt-1 text-xs leading-5 text-earth-600"
          style={{ fontFamily: 'Inter_400Regular' }}>
          {note}
        </Text>
      )}
    </View>
  );
}

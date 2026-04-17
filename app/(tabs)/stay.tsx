import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/constants/Colors';

export default function StayScreen() {
  const [code, setCode] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-sand-50" edges={['top']}>
      <View className="px-6 pt-6">
        <Text
          className="text-xs uppercase text-terracotta-500"
          style={{ fontFamily: 'Inter_600SemiBold', letterSpacing: 2 }}>
          Guests
        </Text>
        <Text
          className="mt-1 text-4xl text-ink"
          style={{ fontFamily: 'Marcellus_400Regular' }}>
          My Stay
        </Text>
      </View>

      <View className="flex-1 px-6 pt-10">
        <View className="h-16 w-16 items-center justify-center rounded-full bg-terracotta-500/10">
          <Feather name="key" size={26} color={Colors.terracotta[500]} />
        </View>

        <Text
          className="mt-6 text-2xl text-ink"
          style={{ fontFamily: 'Marcellus_400Regular' }}>
          Find your reservation
        </Text>
        <Text
          className="mt-2 text-base leading-6 text-earth-600"
          style={{ fontFamily: 'Inter_400Regular' }}>
          Enter the confirmation code from your booking email to access your
          yurt details, gate code, and Wi-Fi.
        </Text>

        <View className="mt-8">
          <Text
            className="text-xs uppercase text-earth-600"
            style={{ fontFamily: 'Inter_600SemiBold', letterSpacing: 1.5 }}>
            Confirmation Code
          </Text>
          <TextInput
            value={code}
            onChangeText={setCode}
            autoCapitalize="characters"
            placeholder="EY-XXXXXX"
            placeholderTextColor={Colors.sandstone[400]}
            className="mt-2 rounded-xl border border-sand-200 bg-white px-4 py-4 text-lg text-ink"
            style={{ fontFamily: 'Inter_500Medium', letterSpacing: 2 }}
          />
        </View>

        <Pressable
          className="mt-6 items-center rounded-xl bg-terracotta-500 py-4 active:opacity-80"
          onPress={() => {}}>
          <Text
            className="text-base uppercase text-sand-50"
            style={{ fontFamily: 'Inter_600SemiBold', letterSpacing: 2 }}>
            Look up stay
          </Text>
        </Pressable>

        <Text
          className="mt-6 text-center text-sm text-earth-600"
          style={{ fontFamily: 'Inter_400Regular' }}>
          Don't have a reservation yet?{' '}
          <Text style={{ fontFamily: 'Inter_600SemiBold', color: Colors.terracotta[500] }}>
            Book a yurt
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

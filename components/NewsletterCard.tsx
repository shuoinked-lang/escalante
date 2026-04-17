import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import { Colors } from '@/constants/Colors';

// Placeholder subscribe flow. Wire this up to a real list provider
// (Mailchimp / Klaviyo / ResNexus contacts) when backend is ready.
export function NewsletterCard() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const submit = () => {
    if (!/^\S+@\S+\.\S+$/.test(email)) return;
    setSubscribed(true);
  };

  if (subscribed) {
    return (
      <View className="mx-4 mt-4 overflow-hidden rounded-2xl bg-sage-400/20 p-5">
        <View className="flex-row items-center gap-2">
          <View className="h-8 w-8 items-center justify-center rounded-full bg-sage-500">
            <Feather name="check" size={16} color="white" />
          </View>
          <Text
            className="flex-1 text-lg text-sage-600"
            style={{ fontFamily: 'Marcellus_400Regular' }}>
            You're on the list.
          </Text>
        </View>
        <Text
          className="mt-2 text-sm leading-5 text-earth-600"
          style={{ fontFamily: 'Inter_400Regular' }}>
          We'll send seasonal openings, late-cancellation deals, and the
          occasional Grand Staircase photo to {email}. Unsubscribe anytime.
        </Text>
      </View>
    );
  }

  return (
    <View className="mx-4 mt-4 overflow-hidden rounded-2xl bg-sand-100 p-5">
      <View className="flex-row items-center gap-2">
        <Feather name="mail" size={14} color={Colors.terracotta[500]} />
        <Text
          className="text-[11px] uppercase text-terracotta-500"
          style={{ fontFamily: 'Inter_600SemiBold', letterSpacing: 2 }}>
          Stay in touch
        </Text>
      </View>
      <Text
        className="mt-1 text-xl text-earth-700"
        style={{ fontFamily: 'Marcellus_400Regular' }}>
        Seasonal openings, direct to you
      </Text>
      <Text
        className="mt-2 text-sm leading-5 text-earth-600"
        style={{ fontFamily: 'Inter_400Regular' }}>
        Use the same email you booked with to sign in on future trips — and
        we'll keep you posted on availability and quiet-season rates.
      </Text>

      <View className="mt-4">
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="you@email.com"
          placeholderTextColor={Colors.sandstone[400]}
          autoCapitalize="none"
          keyboardType="email-address"
          className="rounded-xl border border-sand-200 bg-white px-4 py-3 text-base text-earth-700"
          style={{ fontFamily: 'Inter_500Medium' }}
        />
        <Pressable
          onPress={submit}
          className="mt-3 items-center rounded-xl bg-terracotta-500 py-3 active:opacity-80">
          <Text
            className="text-xs uppercase text-sand-50"
            style={{ fontFamily: 'Inter_600SemiBold', letterSpacing: 2 }}>
            Subscribe
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

import { Feather } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/constants/Colors';
import { POLICIES, PROPERTY } from '@/data/property';

type Section = {
  icon: React.ComponentProps<typeof Feather>['name'];
  title: string;
  body: string;
};

const SECTIONS: Section[] = [
  { icon: 'coffee', ...POLICIES.breakfast },
  { icon: 'grid', ...POLICIES.grill },
  { icon: 'zap', ...POLICIES.firePit },
  { icon: 'moon', ...POLICIES.quietHours },
  { icon: 'heart', ...POLICIES.pets },
  { icon: 'wind', ...POLICIES.smoking },
  { icon: 'calendar', ...POLICIES.cancellation },
];

function SectionCard({ section }: { section: Section }) {
  return (
    <View className="mb-3 rounded-2xl border border-sand-200 bg-white p-5">
      <View className="flex-row items-center gap-3">
        <View className="h-10 w-10 items-center justify-center rounded-full bg-sage-400/25">
          <Feather name={section.icon} size={18} color={Colors.sage[600]} />
        </View>
        <Text
          className="flex-1 text-xl text-earth-700"
          style={{ fontFamily: 'Marcellus_400Regular' }}>
          {section.title}
        </Text>
      </View>
      <Text
        className="mt-3 text-sm leading-6 text-earth-600"
        style={{ fontFamily: 'Inter_400Regular' }}>
        {section.body}
      </Text>
    </View>
  );
}

function ContactRow({
  icon,
  label,
  value,
  onPress,
}: {
  icon: React.ComponentProps<typeof Feather>['name'];
  label: string;
  value: string;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      className="flex-row items-center gap-4 border-b border-sand-200 py-3 last:border-b-0 active:opacity-60">
      <Feather name={icon} size={18} color={Colors.terracotta[500]} />
      <View className="flex-1">
        <Text
          className="text-xs uppercase text-earth-600"
          style={{ fontFamily: 'Inter_600SemiBold', letterSpacing: 1.5 }}>
          {label}
        </Text>
        <Text
          className="mt-0.5 text-base text-earth-700"
          style={{ fontFamily: 'Inter_500Medium' }}>
          {value}
        </Text>
      </View>
      {onPress && <Feather name="chevron-right" size={18} color={Colors.sandstone[400]} />}
    </Pressable>
  );
}

export default function InfoScreen() {
  const addr = PROPERTY.address;
  return (
    <SafeAreaView className="flex-1 bg-sand-50" edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="px-6 pt-6">
          <Text
            className="text-xs uppercase text-terracotta-500"
            style={{ fontFamily: 'Inter_600SemiBold', letterSpacing: 2 }}>
            Resources
          </Text>
          <Text
            className="mt-1 text-4xl text-earth-700"
            style={{ fontFamily: 'Marcellus_400Regular' }}>
            Info & Policies
          </Text>
          <Text
            className="mt-3 text-base leading-6 text-earth-600"
            style={{ fontFamily: 'Inter_400Regular' }}>
            Everything you need to make the most of your stay in the Grand
            Staircase.
          </Text>
        </View>

        <View className="mt-6 px-6">
          {SECTIONS.map((s) => (
            <SectionCard key={s.title} section={s} />
          ))}
        </View>

        <View className="mx-6 mt-4 rounded-2xl bg-sand-100 p-5">
          <Text
            className="text-xs uppercase text-terracotta-500"
            style={{ fontFamily: 'Inter_600SemiBold', letterSpacing: 2 }}>
            Contact
          </Text>
          <Text
            className="mt-1 text-2xl text-earth-700"
            style={{ fontFamily: 'Marcellus_400Regular' }}>
            Reach the front desk
          </Text>

          <View className="mt-4">
            <ContactRow
              icon="phone"
              label="Call"
              value={`${PROPERTY.phone.primaryDisplay} (${PROPERTY.phone.primary})`}
              onPress={() => Linking.openURL(`tel:${PROPERTY.phone.primary}`)}
            />
            <ContactRow
              icon="phone-call"
              label="Alternate"
              value={PROPERTY.phone.secondary}
              onPress={() => Linking.openURL(`tel:${PROPERTY.phone.secondary}`)}
            />
            <ContactRow
              icon="message-square"
              label="Text"
              value={PROPERTY.phone.text}
              onPress={() => Linking.openURL(`sms:${PROPERTY.phone.text}`)}
            />
            <ContactRow
              icon="mail"
              label="Email"
              value={PROPERTY.email}
              onPress={() => Linking.openURL(`mailto:${PROPERTY.email}`)}
            />
            <ContactRow
              icon="map-pin"
              label="Address"
              value={`${addr.street}\n${addr.city}, ${addr.state} ${addr.zip}`}
              onPress={() =>
                Linking.openURL(
                  `https://maps.google.com/?q=${encodeURIComponent(
                    `${addr.street}, ${addr.city}, ${addr.state} ${addr.zip}`,
                  )}`,
                )
              }
            />
          </View>
        </View>

        <View className="mt-10 items-center px-6">
          <Text
            className="text-lg text-earth-600"
            style={{ fontFamily: 'Marcellus_400Regular' }}>
            {PROPERTY.name}
          </Text>
          <Text
            className="mt-1 text-xs uppercase text-sandstone-500"
            style={{ fontFamily: 'Inter_500Medium', letterSpacing: 2 }}>
            Escalante · Utah · Open Year Round
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

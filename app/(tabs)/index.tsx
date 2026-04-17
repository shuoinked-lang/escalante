import { Feather } from '@expo/vector-icons';
import { ImageBackground, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/constants/Colors';
import { PROPERTY } from '@/data/property';

type InfoRow = {
  icon: React.ComponentProps<typeof Feather>['name'];
  label: string;
  value: string;
  hint?: string;
};

const HERO_ROWS: InfoRow[] = [
  {
    icon: 'log-in',
    label: 'Check-in',
    value: PROPERTY.checkIn,
    hint: 'Your yurt is ready after this time',
  },
  {
    icon: 'log-out',
    label: 'Check-out',
    value: PROPERTY.checkOut,
  },
  {
    icon: 'moon',
    label: 'Quiet hours',
    value: `${PROPERTY.quietHours.start} – ${PROPERTY.quietHours.end}`,
    hint: 'Daily, out of respect for fellow guests',
  },
];

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-sand-50">
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <ImageBackground
          source={require('@/assets/images/yurt-sunset.png')}
          resizeMode="cover"
          className="h-96 w-full justify-end">
          <View className="h-full w-full bg-earth-700/30" />
          <SafeAreaView edges={['top']} className="absolute left-0 right-0 top-0">
            <Text
              className="mt-4 px-6 text-center text-xs uppercase text-sand-100"
              style={{ fontFamily: 'Inter_500Medium', letterSpacing: 3 }}>
              Escalante · Utah
            </Text>
          </SafeAreaView>
          <View className="px-6 pb-8">
            <Text
              className="text-5xl leading-tight text-sand-50"
              style={{ fontFamily: 'Marcellus_400Regular' }}>
              Welcome{'\n'}to your yurt.
            </Text>
          </View>
        </ImageBackground>

        <View className="px-6 pt-8">
          <Text
            className="text-xs uppercase text-terracotta-500"
            style={{ fontFamily: 'Inter_600SemiBold', letterSpacing: 2 }}>
            Your stay
          </Text>
          <Text
            className="mt-2 text-3xl text-earth-700"
            style={{ fontFamily: 'Marcellus_400Regular' }}>
            A luxurious retreat awaits
          </Text>
          <Text
            className="mt-3 text-base leading-6 text-earth-600"
            style={{ fontFamily: 'Inter_400Regular' }}>
            Slow mornings, red rock canyons, and skies full of stars. Here's
            everything you'll need for a seamless stay.
          </Text>
        </View>

        <View className="mx-6 mt-6 overflow-hidden rounded-2xl bg-sand-100">
          {HERO_ROWS.map((row, idx) => (
            <View
              key={row.label}
              className={`flex-row items-center gap-4 px-5 py-4 ${
                idx < HERO_ROWS.length - 1 ? 'border-b border-sand-200' : ''
              }`}>
              <View className="h-10 w-10 items-center justify-center rounded-full bg-sage-400/30">
                <Feather name={row.icon} size={18} color={Colors.sage[600]} />
              </View>
              <View className="flex-1">
                <Text
                  className="text-xs uppercase text-earth-600"
                  style={{ fontFamily: 'Inter_600SemiBold', letterSpacing: 1.5 }}>
                  {row.label}
                </Text>
                <Text
                  className="mt-0.5 text-xl text-earth-700"
                  style={{ fontFamily: 'Marcellus_400Regular' }}>
                  {row.value}
                </Text>
                {row.hint && (
                  <Text
                    className="mt-0.5 text-xs text-earth-600"
                    style={{ fontFamily: 'Inter_400Regular' }}>
                    {row.hint}
                  </Text>
                )}
              </View>
            </View>
          ))}
        </View>

        <View className="mx-6 mt-4 overflow-hidden rounded-2xl border border-sand-200 bg-white">
          <View className="flex-row items-center gap-4 px-5 py-4">
            <View className="h-10 w-10 items-center justify-center rounded-full bg-terracotta-500/10">
              <Feather name="wifi" size={18} color={Colors.terracotta[500]} />
            </View>
            <View className="flex-1">
              <Text
                className="text-xs uppercase text-earth-600"
                style={{ fontFamily: 'Inter_600SemiBold', letterSpacing: 1.5 }}>
                WiFi
              </Text>
              <Text
                className="mt-0.5 text-base text-earth-700"
                style={{ fontFamily: 'Inter_500Medium' }}>
                Network · {PROPERTY.wifi.network}
              </Text>
              <Text
                className="text-base text-earth-700"
                style={{ fontFamily: 'Inter_500Medium' }}>
                Password · {PROPERTY.wifi.password}
              </Text>
              <Text
                className="mt-1 text-xs leading-4 text-earth-600"
                style={{ fontFamily: 'Inter_400Regular' }}>
                {PROPERTY.wifi.note}
              </Text>
            </View>
          </View>
        </View>

        <View className="mx-6 mt-8 overflow-hidden rounded-2xl">
          <ImageBackground
            source={require('@/assets/images/canyon.jpeg')}
            resizeMode="cover"
            className="h-52 w-full justify-end">
            <View className="bg-earth-700/40 p-5">
              <Text
                className="text-2xl text-sand-50"
                style={{ fontFamily: 'Marcellus_400Regular' }}>
                Slot canyons & ancient stone
              </Text>
              <Text
                className="mt-1 text-sm text-sand-100"
                style={{ fontFamily: 'Inter_400Regular' }}>
                Minutes from Grand Staircase-Escalante
              </Text>
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
    </View>
  );
}

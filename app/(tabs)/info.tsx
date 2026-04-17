import { Feather } from '@expo/vector-icons';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/constants/Colors';

type Row = { icon: React.ComponentProps<typeof Feather>['name']; title: string; body: string };

const ROWS: Row[] = [
  { icon: 'compass', title: 'Plan your visit', body: 'Arrival, parking, and what to pack for the desert.' },
  { icon: 'help-circle', title: 'FAQs', body: 'Answers to common questions about yurts & amenities.' },
  { icon: 'phone', title: 'Contact', body: 'Reach the front desk, 8am–9pm MT.' },
  { icon: 'book-open', title: 'Policies', body: 'Cancellations, check-in/out, and house rules.' },
];

export default function InfoScreen() {
  return (
    <SafeAreaView className="flex-1 bg-sand-50" edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        <View className="px-6 pt-6">
          <Text
            className="text-xs uppercase text-terracotta-500"
            style={{ fontFamily: 'Inter_600SemiBold', letterSpacing: 2 }}>
            Resources
          </Text>
          <Text
            className="mt-1 text-4xl text-ink"
            style={{ fontFamily: 'Marcellus_400Regular' }}>
            Info
          </Text>
          <Text
            className="mt-3 text-base leading-6 text-earth-600"
            style={{ fontFamily: 'Inter_400Regular' }}>
            Everything you need to make the most of your stay in Escalante.
          </Text>
        </View>

        <View className="mt-8 px-6">
          {ROWS.map((row, idx) => (
            <View
              key={row.title}
              className={`flex-row items-center gap-4 py-5 ${
                idx < ROWS.length - 1 ? 'border-b border-sand-200' : ''
              }`}>
              <View className="h-12 w-12 items-center justify-center rounded-full bg-sage-400/20">
                <Feather name={row.icon} size={20} color={Colors.sage[600]} />
              </View>
              <View className="flex-1">
                <Text
                  className="text-lg text-ink"
                  style={{ fontFamily: 'Marcellus_400Regular' }}>
                  {row.title}
                </Text>
                <Text
                  className="mt-0.5 text-sm text-earth-600"
                  style={{ fontFamily: 'Inter_400Regular' }}>
                  {row.body}
                </Text>
              </View>
              <Feather name="chevron-right" size={20} color={Colors.sandstone[400]} />
            </View>
          ))}
        </View>

        <View className="mt-12 items-center px-6">
          <Text
            className="text-lg text-earth-600"
            style={{ fontFamily: 'Marcellus_400Regular' }}>
            Escalante Yurts
          </Text>
          <Text
            className="mt-1 text-xs uppercase text-sandstone-500"
            style={{ fontFamily: 'Inter_500Medium', letterSpacing: 2 }}>
            Escalante · Utah
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

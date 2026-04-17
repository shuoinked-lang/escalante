import { Feather } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/constants/Colors';

export default function MapScreen() {
  return (
    <SafeAreaView className="flex-1 bg-sand-50" edges={['top']}>
      <View className="px-6 pt-6">
        <Text
          className="text-xs uppercase text-terracotta-500"
          style={{ fontFamily: 'Inter_600SemiBold', letterSpacing: 2 }}>
          Property
        </Text>
        <Text
          className="mt-1 text-4xl text-ink"
          style={{ fontFamily: 'Marcellus_400Regular' }}>
          Property Map
        </Text>
      </View>

      <View className="flex-1 items-center justify-center px-10">
        <View className="h-20 w-20 items-center justify-center rounded-full bg-sage-400/20">
          <Feather name="map-pin" size={32} color={Colors.sage[600]} />
        </View>
        <Text
          className="mt-6 text-center text-2xl text-ink"
          style={{ fontFamily: 'Marcellus_400Regular' }}>
          Interactive map coming soon
        </Text>
        <Text
          className="mt-3 text-center text-base leading-6 text-earth-600"
          style={{ fontFamily: 'Inter_400Regular' }}>
          Find your yurt, trails, fire pits, and the best stargazing spots on
          the property — all in one place.
        </Text>
      </View>
    </SafeAreaView>
  );
}

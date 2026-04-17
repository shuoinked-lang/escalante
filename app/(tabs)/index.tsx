import { ImageBackground, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-sand-50">
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
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
              Luxury glamping,{'\n'}redefined.
            </Text>
          </View>
        </ImageBackground>

        <View className="px-6 pt-8">
          <Text
            className="text-xs uppercase text-terracotta-500"
            style={{ fontFamily: 'Inter_600SemiBold', letterSpacing: 2 }}>
            Welcome
          </Text>
          <Text
            className="mt-2 text-3xl text-ink"
            style={{ fontFamily: 'Marcellus_400Regular' }}>
            Your desert retreat awaits
          </Text>
          <Text
            className="mt-4 text-base leading-6 text-earth-600"
            style={{ fontFamily: 'Inter_400Regular' }}>
            Escape to Escalante Yurts — handcrafted accommodations near
            Grand Staircase, Bryce Canyon, and Capitol Reef. Slow mornings,
            red rock canyons, and skies full of stars.
          </Text>
        </View>

        <View className="mt-8 flex-row gap-3 px-6">
          <View className="flex-1 rounded-2xl bg-sage-400/20 p-5">
            <Text
              className="text-xs uppercase text-sage-600"
              style={{ fontFamily: 'Inter_600SemiBold', letterSpacing: 1.5 }}>
              Property
            </Text>
            <Text
              className="mt-2 text-xl text-ink"
              style={{ fontFamily: 'Marcellus_400Regular' }}>
              Explore the map
            </Text>
          </View>
          <View className="flex-1 rounded-2xl bg-terracotta-500/10 p-5">
            <Text
              className="text-xs uppercase text-terracotta-600"
              style={{ fontFamily: 'Inter_600SemiBold', letterSpacing: 1.5 }}>
              Guests
            </Text>
            <Text
              className="mt-2 text-xl text-ink"
              style={{ fontFamily: 'Marcellus_400Regular' }}>
              Check your stay
            </Text>
          </View>
        </View>

        <View className="mx-6 mt-8 overflow-hidden rounded-2xl">
          <ImageBackground
            source={require('@/assets/images/canyon.jpeg')}
            resizeMode="cover"
            className="h-56 w-full justify-end">
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

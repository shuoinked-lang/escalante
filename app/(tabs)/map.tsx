import { Feather } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/constants/Colors';
import {
  ACTIVITIES,
  Activity,
  ActivityCategory,
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  DIFFICULTY_LABELS,
  PROPERTY_COORDS,
} from '@/data/activities';

type CategoryStyle = {
  color: string;
  bg: string;
  icon: React.ComponentProps<typeof Feather>['name'];
};

const CATEGORY_STYLES: Record<ActivityCategory, CategoryStyle> = {
  hike: { color: Colors.sage[600], bg: Colors.sage[400], icon: 'trending-up' },
  'scenic-drive': {
    color: Colors.sandstone[600],
    bg: Colors.sandstone[400],
    icon: 'navigation',
  },
  'slot-canyon': {
    color: Colors.terracotta[600],
    bg: Colors.terracotta[500],
    icon: 'layers',
  },
  'national-park': {
    color: Colors.earth[700],
    bg: Colors.earth[500],
    icon: 'award',
  },
  'kid-friendly': {
    color: '#b86a3a',
    bg: '#d68a5c',
    icon: 'smile',
  },
};

const CARD_HEIGHT = Math.min(Dimensions.get('window').height * 0.55, 520);

function PinBadge({ category }: { category: ActivityCategory }) {
  const s = CATEGORY_STYLES[category];
  return (
    <View style={styles.pinWrap}>
      <View style={[styles.pinDot, { backgroundColor: s.bg }]}>
        <Feather name={s.icon} size={14} color="white" />
      </View>
      <View style={[styles.pinTail, { borderTopColor: s.bg }]} />
    </View>
  );
}

function PropertyPin() {
  return (
    <View style={styles.pinWrap}>
      <View style={[styles.pinDot, styles.propertyPin]}>
        <Feather name="home" size={14} color="white" />
      </View>
      <View style={[styles.pinTail, { borderTopColor: Colors.ink }]} />
    </View>
  );
}

function FilterChip({
  label,
  icon,
  active,
  onPress,
}: {
  label: string;
  icon: React.ComponentProps<typeof Feather>['name'];
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={`mr-2 flex-row items-center gap-1.5 rounded-full px-3.5 py-2 ${
        active ? 'bg-earth-700' : 'bg-sand-50/95'
      }`}
      style={styles.chipShadow}>
      <Feather
        name={icon}
        size={13}
        color={active ? Colors.sand[50] : Colors.earth[700]}
      />
      <Text
        style={{ fontFamily: 'Inter_500Medium', letterSpacing: 0.3 }}
        className={`text-xs ${active ? 'text-sand-50' : 'text-earth-700'}`}>
        {label}
      </Text>
    </Pressable>
  );
}

function DetailCard({
  activity,
  onClose,
}: {
  activity: Activity | null;
  onClose: () => void;
}) {
  const translateY = useSharedValue(CARD_HEIGHT + 40);

  useEffect(() => {
    translateY.value = activity
      ? withSpring(0, { damping: 20, stiffness: 180 })
      : withTiming(CARD_HEIGHT + 40, { duration: 220 });
  }, [activity, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  if (!activity) return null;
  const s = CATEGORY_STYLES[activity.primaryCategory];

  const openDirections = () => {
    const { latitude, longitude } = activity.coords;
    const label = encodeURIComponent(activity.name);
    const url = Platform.select({
      ios: `https://maps.apple.com/?daddr=${latitude},${longitude}&dirflg=d&q=${label}`,
      default: `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&destination_place_id=${label}`,
    });
    Linking.openURL(url);
  };

  return (
    <Animated.View
      style={[styles.card, { height: CARD_HEIGHT }, animatedStyle]}
      className="overflow-hidden rounded-t-3xl bg-sand-50">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 28 }}>
        <View className="items-center pt-3">
          <View className="h-1 w-12 rounded-full bg-sand-200" />
        </View>

        {activity.heroImage ? (
          <View className="mx-4 mt-4 overflow-hidden rounded-2xl">
            <Image
              source={activity.heroImage}
              style={{ width: '100%', height: 180 }}
              resizeMode="cover"
            />
          </View>
        ) : (
          <View
            className="mx-4 mt-4 items-center justify-center overflow-hidden rounded-2xl"
            style={{ height: 120, backgroundColor: s.bg }}>
            <Feather name={s.icon} size={32} color="white" />
            <Text
              className="mt-2 text-xs uppercase text-sand-50"
              style={{ fontFamily: 'Inter_600SemiBold', letterSpacing: 2 }}>
              {CATEGORY_LABELS[activity.primaryCategory]}
            </Text>
          </View>
        )}

        <View className="flex-row items-start justify-between px-5 pt-4">
          <View className="mr-3 flex-1">
            <View
              className="mb-2 flex-row self-start rounded-full px-2.5 py-1"
              style={{ backgroundColor: s.bg + '22' }}>
              <Feather name={s.icon} size={11} color={s.color} />
              <Text
                className="ml-1 text-[10px] uppercase"
                style={{
                  fontFamily: 'Inter_600SemiBold',
                  letterSpacing: 1.2,
                  color: s.color,
                }}>
                {CATEGORY_LABELS[activity.primaryCategory]}
              </Text>
            </View>
            <Text
              className="text-2xl text-earth-700"
              style={{ fontFamily: 'Marcellus_400Regular' }}>
              {activity.name}
            </Text>
          </View>
          <Pressable
            onPress={onClose}
            hitSlop={10}
            className="h-8 w-8 items-center justify-center rounded-full bg-sand-100 active:opacity-60">
            <Feather name="x" size={16} color={Colors.earth[700]} />
          </Pressable>
        </View>

        <View className="mx-5 mt-4 flex-row gap-3">
          <View className="flex-1 rounded-xl bg-sand-100 p-3">
            <Text
              className="text-[10px] uppercase text-earth-600"
              style={{ fontFamily: 'Inter_600SemiBold', letterSpacing: 1.2 }}>
              Distance
            </Text>
            <Text
              className="mt-0.5 text-sm text-earth-700"
              style={{ fontFamily: 'Inter_500Medium' }}>
              {activity.driveTime}
            </Text>
            {activity.distanceNote && (
              <Text
                className="mt-0.5 text-[10px] text-earth-600"
                style={{ fontFamily: 'Inter_400Regular' }}>
                {activity.distanceNote}
              </Text>
            )}
          </View>
          <View className="flex-1 rounded-xl bg-sand-100 p-3">
            <Text
              className="text-[10px] uppercase text-earth-600"
              style={{ fontFamily: 'Inter_600SemiBold', letterSpacing: 1.2 }}>
              Difficulty
            </Text>
            <Text
              className="mt-0.5 text-sm text-earth-700"
              style={{ fontFamily: 'Inter_500Medium' }}>
              {DIFFICULTY_LABELS[activity.difficulty]}
            </Text>
            {activity.difficultyNote && (
              <Text
                className="mt-0.5 text-[10px] text-earth-600"
                style={{ fontFamily: 'Inter_400Regular' }}>
                {activity.difficultyNote}
              </Text>
            )}
          </View>
        </View>

        <View className="mx-5 mt-3">
          <Text
            className="text-[10px] uppercase text-earth-600"
            style={{ fontFamily: 'Inter_600SemiBold', letterSpacing: 1.2 }}>
            Type
          </Text>
          <Text
            className="mt-0.5 text-sm text-earth-700"
            style={{ fontFamily: 'Inter_500Medium' }}>
            {activity.type}
          </Text>
        </View>

        <Text
          className="mx-5 mt-4 text-sm leading-6 text-earth-600"
          style={{ fontFamily: 'Inter_400Regular' }}>
          {activity.description}
        </Text>

        <Pressable
          onPress={openDirections}
          className="mx-5 mt-5 flex-row items-center justify-center rounded-xl bg-terracotta-500 py-4 active:opacity-80">
          <Feather name="navigation" size={16} color={Colors.sand[50]} />
          <Text
            className="ml-2 text-sm uppercase text-sand-50"
            style={{ fontFamily: 'Inter_600SemiBold', letterSpacing: 2 }}>
            Open in Maps
          </Text>
        </Pressable>
      </ScrollView>
    </Animated.View>
  );
}

export default function MapScreen() {
  const mapRef = useRef<MapView>(null);
  const [filters, setFilters] = useState<Set<ActivityCategory>>(new Set());
  const [selected, setSelected] = useState<Activity | null>(null);

  const visible = useMemo(() => {
    if (filters.size === 0) return ACTIVITIES;
    return ACTIVITIES.filter((a) =>
      a.categories.some((c) => filters.has(c)),
    );
  }, [filters]);

  const toggleFilter = (c: ActivityCategory) => {
    setFilters((prev) => {
      const next = new Set(prev);
      if (next.has(c)) next.delete(c);
      else next.add(c);
      return next;
    });
  };

  const selectActivity = (a: Activity) => {
    setSelected(a);
    mapRef.current?.animateToRegion(
      {
        ...a.coords,
        latitudeDelta: 0.25,
        longitudeDelta: 0.25,
      },
      400,
    );
  };

  return (
    <View className="flex-1 bg-sand-50">
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        initialRegion={{
          ...PROPERTY_COORDS,
          latitudeDelta: 1.4,
          longitudeDelta: 1.4,
        }}
        showsCompass={false}
        showsUserLocation
        onPress={() => setSelected(null)}>
        <Marker coordinate={PROPERTY_COORDS} title="Escalante Yurts" anchor={{ x: 0.5, y: 1 }}>
          <PropertyPin />
        </Marker>
        {visible.map((a) => (
          <Marker
            key={a.id}
            coordinate={a.coords}
            title={a.name}
            anchor={{ x: 0.5, y: 1 }}
            onPress={(e) => {
              e.stopPropagation();
              selectActivity(a);
            }}>
            <PinBadge category={a.primaryCategory} />
          </Marker>
        ))}
      </MapView>

      <SafeAreaView edges={['top']} pointerEvents="box-none" style={styles.topOverlay}>
        <View className="px-4 pt-2">
          <View className="flex-row items-center gap-2 rounded-2xl bg-sand-50/90 px-3 py-2" style={styles.headerShadow}>
            <Feather name="map" size={16} color={Colors.terracotta[500]} />
            <Text
              className="flex-1 text-base text-earth-700"
              style={{ fontFamily: 'Marcellus_400Regular' }}>
              Nearby Activities
            </Text>
            <Text
              className="text-[10px] uppercase text-earth-600"
              style={{ fontFamily: 'Inter_600SemiBold', letterSpacing: 1.5 }}>
              {visible.length} places
            </Text>
          </View>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 10 }}>
          {CATEGORY_ORDER.map((c) => (
            <FilterChip
              key={c}
              label={CATEGORY_LABELS[c]}
              icon={CATEGORY_STYLES[c].icon}
              active={filters.has(c)}
              onPress={() => toggleFilter(c)}
            />
          ))}
          {filters.size > 0 && (
            <FilterChip
              label="Clear"
              icon="x"
              active={false}
              onPress={() => setFilters(new Set())}
            />
          )}
        </ScrollView>
      </SafeAreaView>

      <DetailCard activity={selected} onClose={() => setSelected(null)} />
    </View>
  );
}

const styles = StyleSheet.create({
  topOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  pinWrap: {
    alignItems: 'center',
  },
  pinDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  pinTail: {
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 7,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    marginTop: -1,
  },
  propertyPin: {
    backgroundColor: Colors.ink,
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  headerShadow: {
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  chipShadow: {
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  card: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -4 },
    elevation: 20,
  },
});

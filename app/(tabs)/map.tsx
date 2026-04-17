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
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView, type WebViewMessageEvent } from 'react-native-webview';

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
  glyph: string;
};

const CATEGORY_STYLES: Record<ActivityCategory, CategoryStyle> = {
  hike: { color: Colors.sage[600], bg: Colors.sage[500], icon: 'trending-up', glyph: '▲' },
  'scenic-drive': {
    color: Colors.sandstone[600],
    bg: Colors.sandstone[500],
    icon: 'navigation',
    glyph: '◆',
  },
  'slot-canyon': {
    color: Colors.terracotta[600],
    bg: Colors.terracotta[500],
    icon: 'layers',
    glyph: '◇',
  },
  'national-park': {
    color: Colors.earth[700],
    bg: Colors.earth[500],
    icon: 'award',
    glyph: '★',
  },
  'kid-friendly': {
    color: '#b86a3a',
    bg: '#d68a5c',
    icon: 'smile',
    glyph: '♥',
  },
};

const CARD_HEIGHT = Math.min(Dimensions.get('window').height * 0.55, 520);

function buildMapHtml() {
  const markersPayload = ACTIVITIES.map((a) => ({
    id: a.id,
    lat: a.coords.latitude,
    lng: a.coords.longitude,
    name: a.name,
    color: CATEGORY_STYLES[a.primaryCategory].bg,
    glyph: CATEGORY_STYLES[a.primaryCategory].glyph,
    categories: a.categories,
  }));

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<style>
  html, body, #map { margin: 0; padding: 0; height: 100%; width: 100%; }
  body { background: #fbf5e9; font-family: -apple-system, BlinkMacSystemFont, sans-serif; }
  .pin-wrap { background: transparent !important; border: none !important; }
  .pin {
    width: 32px; height: 32px; border-radius: 16px;
    display: flex; align-items: center; justify-content: center;
    border: 2px solid white;
    box-shadow: 0 2px 5px rgba(0,0,0,0.3);
    color: white; font-size: 14px; font-weight: bold;
  }
  .pin-home {
    width: 38px; height: 38px; border-radius: 19px;
    background: ${Colors.ink};
    font-size: 18px;
  }
  .leaflet-control-attribution { font-size: 9px; opacity: 0.6; }
</style>
</head>
<body>
<div id="map"></div>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script>
  var PROPERTY = [${PROPERTY_COORDS.latitude}, ${PROPERTY_COORDS.longitude}];
  var markersData = ${JSON.stringify(markersPayload)};

  var map = L.map('map', {
    zoomControl: false,
    attributionControl: true,
  }).setView(PROPERTY, 9);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap',
  }).addTo(map);

  var homeIcon = L.divIcon({
    html: '<div class="pin pin-home">⌂</div>',
    className: 'pin-wrap',
    iconSize: [38, 38],
    iconAnchor: [19, 19],
  });
  L.marker(PROPERTY, { icon: homeIcon }).addTo(map);

  var markers = {};
  markersData.forEach(function(a) {
    var icon = L.divIcon({
      html: '<div class="pin" style="background:' + a.color + '">' + a.glyph + '</div>',
      className: 'pin-wrap',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });
    var m = L.marker([a.lat, a.lng], { icon: icon }).addTo(map);
    m.on('click', function() {
      window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'select', id: a.id }));
    });
    markers[a.id] = { marker: m, categories: a.categories };
  });

  map.on('click', function() {
    window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'deselect' }));
  });

  var routeLine = null;
  window.showRoute = function(lat, lng) {
    if (routeLine) { map.removeLayer(routeLine); }
    routeLine = L.polyline([PROPERTY, [lat, lng]], {
      color: '${Colors.terracotta[500]}',
      weight: 3, dashArray: '8,8', opacity: 0.9,
    }).addTo(map);
    map.fitBounds(routeLine.getBounds(), {
      paddingTopLeft: [60, 140],
      paddingBottomRight: [60, ${Math.round(CARD_HEIGHT) + 40}],
      animate: true,
    });
  };

  window.clearRoute = function() {
    if (routeLine) { map.removeLayer(routeLine); routeLine = null; }
  };

  window.recenter = function() {
    window.clearRoute();
    map.setView(PROPERTY, 9, { animate: true });
  };

  window.applyFilter = function(cats) {
    markersData.forEach(function(a) {
      var show = cats.length === 0 || a.categories.some(function(c) { return cats.indexOf(c) !== -1; });
      var entry = markers[a.id];
      if (show) { entry.marker.addTo(map); }
      else { map.removeLayer(entry.marker); }
    });
  };

  window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'ready' }));
</script>
</body>
</html>`;
}

const MAP_HTML = buildMapHtml();

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
  const webRef = useRef<WebView>(null);
  const [filters, setFilters] = useState<Set<ActivityCategory>>(new Set());
  const [selected, setSelected] = useState<Activity | null>(null);

  const visibleCount = useMemo(() => {
    if (filters.size === 0) return ACTIVITIES.length;
    return ACTIVITIES.filter((a) => a.categories.some((c) => filters.has(c))).length;
  }, [filters]);

  const toggleFilter = (c: ActivityCategory) => {
    setFilters((prev) => {
      const next = new Set(prev);
      if (next.has(c)) next.delete(c);
      else next.add(c);
      const arr = JSON.stringify([...next]);
      webRef.current?.injectJavaScript(`window.applyFilter(${arr}); true;`);
      return next;
    });
  };

  const clearFilters = () => {
    setFilters(new Set());
    webRef.current?.injectJavaScript(`window.applyFilter([]); true;`);
  };

  const selectActivity = (a: Activity) => {
    setSelected(a);
    webRef.current?.injectJavaScript(
      `window.showRoute(${a.coords.latitude}, ${a.coords.longitude}); true;`,
    );
  };

  const deselect = () => {
    setSelected(null);
    webRef.current?.injectJavaScript(`window.clearRoute(); true;`);
  };

  const recenter = () => {
    setSelected(null);
    webRef.current?.injectJavaScript(`window.recenter(); true;`);
  };

  const onMessage = (e: WebViewMessageEvent) => {
    try {
      const msg = JSON.parse(e.nativeEvent.data);
      if (msg.type === 'select') {
        const a = ACTIVITIES.find((x) => x.id === msg.id);
        if (a) selectActivity(a);
      } else if (msg.type === 'deselect') {
        if (selected) deselect();
      }
    } catch {
      /* ignore malformed messages */
    }
  };

  return (
    <View className="flex-1 bg-sand-50">
      <WebView
        ref={webRef}
        source={{ html: MAP_HTML }}
        style={StyleSheet.absoluteFill}
        onMessage={onMessage}
        originWhitelist={['*']}
        javaScriptEnabled
        domStorageEnabled
        scalesPageToFit={false}
        scrollEnabled={false}
        bounces={false}
        androidLayerType="hardware"
      />

      <SafeAreaView edges={['top']} pointerEvents="box-none" style={styles.topOverlay}>
        <View className="px-4 pt-2">
          <View
            className="flex-row items-center gap-2 rounded-2xl bg-sand-50/95 px-3 py-2"
            style={styles.headerShadow}>
            <Feather name="map" size={16} color={Colors.terracotta[500]} />
            <Text
              className="flex-1 text-base text-earth-700"
              style={{ fontFamily: 'Marcellus_400Regular' }}>
              Nearby Activities
            </Text>
            <Text
              className="text-[10px] uppercase text-earth-600"
              style={{ fontFamily: 'Inter_600SemiBold', letterSpacing: 1.5 }}>
              {visibleCount} places
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
              onPress={clearFilters}
            />
          )}
        </ScrollView>
      </SafeAreaView>

      <Pressable
        onPress={recenter}
        style={[styles.recenterBtn, { bottom: selected ? CARD_HEIGHT + 16 : 32 }]}
        className="h-12 w-12 items-center justify-center rounded-full bg-sand-50 active:opacity-70">
        <Feather name="home" size={18} color={Colors.terracotta[500]} />
      </Pressable>

      <DetailCard activity={selected} onClose={deselect} />
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
  recenterBtn: {
    position: 'absolute',
    right: 16,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 6,
  },
});

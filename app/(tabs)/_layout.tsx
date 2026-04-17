import React from 'react';
import { Feather } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

import { Colors } from '@/constants/Colors';

type FeatherName = React.ComponentProps<typeof Feather>['name'];

function TabIcon({ name, color }: { name: FeatherName; color: string }) {
  return <Feather size={22} name={name} color={color} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.terracotta[500],
        tabBarInactiveTintColor: Colors.earth[600],
        tabBarStyle: {
          backgroundColor: Colors.sand[50],
          borderTopColor: Colors.sand[200],
          borderTopWidth: 1,
          height: 84,
          paddingTop: 8,
          paddingBottom: 24,
        },
        tabBarLabelStyle: {
          fontFamily: 'Inter_500Medium',
          fontSize: 11,
          letterSpacing: 0.5,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Map',
          tabBarIcon: ({ color }) => <TabIcon name="map" color={color} />,
        }}
      />
      <Tabs.Screen
        name="stay"
        options={{
          title: 'My Stay',
          tabBarIcon: ({ color }) => <TabIcon name="key" color={color} />,
        }}
      />
      <Tabs.Screen
        name="info"
        options={{
          title: 'Info',
          tabBarIcon: ({ color }) => <TabIcon name="info" color={color} />,
        }}
      />
    </Tabs>
  );
}

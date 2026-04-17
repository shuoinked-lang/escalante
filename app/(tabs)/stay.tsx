import { Feather } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/constants/Colors';
import { PROPERTY } from '@/data/property';
import { DEMO_RESERVATION } from '@/data/reservation';
import { YURTS_BY_ID } from '@/data/yurts';

const CHECKOUT_ITEMS = [
  {
    title: 'Leave shoes outside the yurt',
    body: 'As you have all week — it keeps the linens and rugs pristine for the next guest.',
  },
  {
    title: 'Observe quiet hours if departing early',
    body: 'Quiet hours run 10 PM – 8 AM. If you\'re heading out before 8, please keep voices low and close doors gently.',
  },
  {
    title: 'Scrape down the grill',
    body: 'Run the burner on high for 5 minutes, scrape with the brush provided, then close the propane valve on the tank.',
  },
  {
    title: 'Toss perishables & close the windows',
    body: 'Leave the thermostat at 72°F — staff will reset it on turnover.',
  },
] as const;

function DoorCodeCard({ code, checkIn }: { code: string; checkIn: string }) {
  const digits = code.split('');
  return (
    <View className="mx-4 mt-5 overflow-hidden rounded-3xl bg-terracotta-500 p-6">
      <View className="flex-row items-center gap-2">
        <Feather name="lock" size={14} color={Colors.sand[50]} />
        <Text
          className="text-[11px] uppercase text-sand-100"
          style={{ fontFamily: 'Inter_600SemiBold', letterSpacing: 2 }}>
          Your Door Code
        </Text>
      </View>
      <Text
        className="mt-1 text-xl text-sand-50"
        style={{ fontFamily: 'Marcellus_400Regular' }}>
        Enter anytime after {checkIn}
      </Text>
      <View className="mt-5 flex-row justify-between">
        {digits.map((d, i) => (
          <View
            key={i}
            className="flex-1 items-center justify-center rounded-2xl bg-sand-50/15 py-4"
            style={{ marginHorizontal: i === 0 ? 0 : 4, marginRight: i === digits.length - 1 ? 0 : 4 }}>
            <Text
              className="text-5xl text-sand-50"
              style={{ fontFamily: 'Marcellus_400Regular' }}>
              {d}
            </Text>
          </View>
        ))}
      </View>
      <Text
        className="mt-5 text-xs leading-5 text-sand-100"
        style={{ fontFamily: 'Inter_400Regular' }}>
        Enter the code on the keypad, then press the checkmark. The code is
        active for the length of your stay and deactivates at checkout.
      </Text>
    </View>
  );
}

function KeyPickupCard({ checkIn }: { checkIn: string }) {
  return (
    <View className="mx-4 mt-5 overflow-hidden rounded-3xl bg-earth-700 p-6">
      <View className="flex-row items-center gap-2">
        <Feather name="key" size={14} color={Colors.sand[50]} />
        <Text
          className="text-[11px] uppercase text-sand-100"
          style={{ fontFamily: 'Inter_600SemiBold', letterSpacing: 2 }}>
          Key Pickup
        </Text>
      </View>
      <Text
        className="mt-1 text-2xl leading-7 text-sand-50"
        style={{ fontFamily: 'Marcellus_400Regular' }}>
        Stop by the front desk to grab your key.
      </Text>
      <View className="mt-5 rounded-2xl bg-sand-50/10 p-4">
        <Text
          className="text-[10px] uppercase text-sand-100"
          style={{ fontFamily: 'Inter_600SemiBold', letterSpacing: 1.5 }}>
          Front desk hours
        </Text>
        <Text
          className="mt-1 text-lg text-sand-50"
          style={{ fontFamily: 'Marcellus_400Regular' }}>
          8:00 AM – 7:00 PM
        </Text>
      </View>
      <Text
        className="mt-4 text-xs leading-5 text-sand-100"
        style={{ fontFamily: 'Inter_400Regular' }}>
        Arriving after 7:00 PM on {checkIn}? Call us at {PROPERTY.phone.primaryDisplay}
        {' '}and we'll arrange late check-in.
      </Text>
      <Pressable
        onPress={() => Linking.openURL(`tel:${PROPERTY.phone.primary}`)}
        className="mt-4 flex-row items-center justify-center rounded-xl bg-sand-50 py-3 active:opacity-80">
        <Feather name="phone" size={14} color={Colors.earth[700]} />
        <Text
          className="ml-2 text-xs uppercase text-earth-700"
          style={{ fontFamily: 'Inter_600SemiBold', letterSpacing: 2 }}>
          Call front desk
        </Text>
      </Pressable>
    </View>
  );
}

function InfoCard({
  icon,
  label,
  title,
  children,
}: {
  icon: React.ComponentProps<typeof Feather>['name'];
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View className="mx-4 mt-3 rounded-2xl border border-sand-200 bg-white p-5">
      <View className="flex-row items-center gap-2">
        <Feather name={icon} size={14} color={Colors.terracotta[500]} />
        <Text
          className="text-[11px] uppercase text-terracotta-500"
          style={{ fontFamily: 'Inter_600SemiBold', letterSpacing: 2 }}>
          {label}
        </Text>
      </View>
      <Text
        className="mt-1 text-xl text-earth-700"
        style={{ fontFamily: 'Marcellus_400Regular' }}>
        {title}
      </Text>
      <View className="mt-3">{children}</View>
    </View>
  );
}

function ChecklistRow({
  title,
  body,
  checked,
  onToggle,
}: {
  title: string;
  body: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <Pressable
      onPress={onToggle}
      className="flex-row items-start gap-3 py-3 active:opacity-60">
      <View
        className={`mt-0.5 h-6 w-6 items-center justify-center rounded-md border-2 ${
          checked ? 'border-sage-500 bg-sage-500' : 'border-sand-300 bg-white'
        }`}>
        {checked && <Feather name="check" size={14} color="white" />}
      </View>
      <View className="flex-1">
        <Text
          className={`text-sm ${checked ? 'text-earth-600 line-through' : 'text-earth-700'}`}
          style={{ fontFamily: 'Inter_500Medium' }}>
          {title}
        </Text>
        <Text
          className="mt-0.5 text-xs leading-5 text-earth-600"
          style={{ fontFamily: 'Inter_400Regular' }}>
          {body}
        </Text>
      </View>
    </Pressable>
  );
}

export default function StayScreen() {
  const res = DEMO_RESERVATION;
  const yurt = YURTS_BY_ID[res.yurtId];
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  const toggle = (i: number) =>
    setChecked((prev) => ({ ...prev, [i]: !prev[i] }));

  const reportIssue = () => {
    const subject = encodeURIComponent(
      `Yurt issue report — ${yurt.name} — ${res.confirmationCode}`,
    );
    const body = encodeURIComponent(
      `Reservation: ${res.confirmationCode}\nYurt: ${yurt.name}\nGuest: ${res.guestFirstName} ${res.guestLastName}\n\nIssue:\n`,
    );
    Linking.openURL(`mailto:${PROPERTY.email}?subject=${subject}&body=${body}`);
  };

  return (
    <View className="flex-1 bg-sand-50">
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <SafeAreaView edges={['top']}>
          <View className="px-5 pt-4">
            <View className="flex-row items-center justify-between">
              <Text
                className="text-[11px] uppercase text-terracotta-500"
                style={{ fontFamily: 'Inter_600SemiBold', letterSpacing: 2 }}>
                Your Stay
              </Text>
              <Text
                className="text-[11px] uppercase text-earth-600"
                style={{ fontFamily: 'Inter_500Medium', letterSpacing: 1.5 }}>
                {res.confirmationCode}
              </Text>
            </View>
            <Text
              className="mt-1 text-4xl text-earth-700"
              style={{ fontFamily: 'Marcellus_400Regular' }}>
              Welcome, {res.guestFirstName}.
            </Text>
            <Text
              className="mt-1 text-base text-earth-600"
              style={{ fontFamily: 'Inter_400Regular' }}>
              {yurt.name} Yurt · {res.nights} nights · {res.partySize} guests
            </Text>
          </View>

          <View className="mx-4 mt-5 flex-row items-stretch rounded-2xl bg-sand-100 p-4">
            <View className="flex-1">
              <Text
                className="text-[10px] uppercase text-earth-600"
                style={{ fontFamily: 'Inter_600SemiBold', letterSpacing: 1.5 }}>
                Check-in
              </Text>
              <Text
                className="mt-0.5 text-lg text-earth-700"
                style={{ fontFamily: 'Marcellus_400Regular' }}>
                {res.checkInDate}
              </Text>
              <Text
                className="text-xs text-earth-600"
                style={{ fontFamily: 'Inter_400Regular' }}>
                After {PROPERTY.checkIn}
              </Text>
            </View>
            <View className="mx-3 w-px bg-sand-200" />
            <View className="flex-1">
              <Text
                className="text-[10px] uppercase text-earth-600"
                style={{ fontFamily: 'Inter_600SemiBold', letterSpacing: 1.5 }}>
                Check-out
              </Text>
              <Text
                className="mt-0.5 text-lg text-earth-700"
                style={{ fontFamily: 'Marcellus_400Regular' }}>
                {res.checkOutDate}
              </Text>
              <Text
                className="text-xs text-earth-600"
                style={{ fontFamily: 'Inter_400Regular' }}>
                By {PROPERTY.checkOut}
              </Text>
            </View>
          </View>

          {yurt.hasKeypad ? (
            <DoorCodeCard code={res.doorCode} checkIn={res.checkInDate} />
          ) : (
            <KeyPickupCard checkIn={res.checkInDate} />
          )}

          <InfoCard icon="map-pin" label="Finding your yurt" title={`Walking directions to ${yurt.name}`}>
            <Text
              className="text-sm leading-6 text-earth-600"
              style={{ fontFamily: 'Inter_400Regular' }}>
              {yurt.walkingDirections}
            </Text>
          </InfoCard>

          <InfoCard icon="home" label="Your yurt" title={`${yurt.name} · ${yurt.sqft} sqft`}>
            <View className="gap-2">
              <View className="flex-row">
                <Text
                  className="w-20 text-[11px] uppercase text-earth-600"
                  style={{ fontFamily: 'Inter_600SemiBold', letterSpacing: 1.2 }}>
                  Sleeps
                </Text>
                <Text
                  className="flex-1 text-sm text-earth-700"
                  style={{ fontFamily: 'Inter_500Medium' }}>
                  Up to {yurt.maxGuests} · {yurt.beds}
                </Text>
              </View>
              <View className="flex-row">
                <Text
                  className="w-20 text-[11px] uppercase text-earth-600"
                  style={{ fontFamily: 'Inter_600SemiBold', letterSpacing: 1.2 }}>
                  Kitchen
                </Text>
                <Text
                  className="flex-1 text-sm text-earth-700"
                  style={{ fontFamily: 'Inter_500Medium' }}>
                  {yurt.kitchen === 'full'
                    ? 'Full kitchen · two-burner stove, dishwasher, fridge & freezer, coffee maker, microwave'
                    : 'Kitchenette · mini fridge, microwave, coffee maker (coffee provided)'}
                </Text>
              </View>
              <View className="flex-row">
                <Text
                  className="w-20 text-[11px] uppercase text-earth-600"
                  style={{ fontFamily: 'Inter_600SemiBold', letterSpacing: 1.2 }}>
                  Bathroom
                </Text>
                <Text
                  className="flex-1 text-sm text-earth-700"
                  style={{ fontFamily: 'Inter_500Medium' }}>
                  {yurt.bathroom}
                </Text>
              </View>
            </View>

            <View className="mt-4 flex-row flex-wrap gap-1.5">
              {yurt.amenities.map((a) => (
                <View
                  key={a}
                  className="rounded-full bg-sage-400/20 px-2.5 py-1">
                  <Text
                    className="text-[11px] text-sage-600"
                    style={{ fontFamily: 'Inter_500Medium' }}>
                    {a}
                  </Text>
                </View>
              ))}
            </View>
          </InfoCard>

          <InfoCard icon="wifi" label="WiFi" title="Stay connected">
            <View className="rounded-xl bg-sand-100 p-3">
              <View className="flex-row items-baseline justify-between">
                <Text
                  className="text-[10px] uppercase text-earth-600"
                  style={{ fontFamily: 'Inter_600SemiBold', letterSpacing: 1.5 }}>
                  Network
                </Text>
                <Text
                  className="text-base text-earth-700"
                  style={{ fontFamily: 'Inter_500Medium' }}>
                  {PROPERTY.wifi.network}
                </Text>
              </View>
              <View className="mt-1 flex-row items-baseline justify-between">
                <Text
                  className="text-[10px] uppercase text-earth-600"
                  style={{ fontFamily: 'Inter_600SemiBold', letterSpacing: 1.5 }}>
                  Password
                </Text>
                <Text
                  className="text-base text-earth-700"
                  style={{ fontFamily: 'Inter_500Medium' }}>
                  {PROPERTY.wifi.password}
                </Text>
              </View>
            </View>
            <Text
              className="mt-2 text-xs leading-5 text-earth-600"
              style={{ fontFamily: 'Inter_400Regular' }}>
              {PROPERTY.wifi.note}
            </Text>
          </InfoCard>

          <InfoCard icon="coffee" label="Breakfast" title="Delivered to your yurt">
            <Text
              className="text-sm leading-6 text-earth-600"
              style={{ fontFamily: 'Inter_400Regular' }}>
              Your breakfast arrives each afternoon for the following morning — eat
              on your own schedule. Expect a rotating mix of{' '}
              <Text style={{ fontFamily: 'Inter_500Medium', color: Colors.earth[700] }}>
                breakfast burritos, sandwiches, quiche, fresh pastries, seasonal
                fruit
              </Text>
              , plus a cold beverage and locally roasted coffee.
            </Text>
            <View className="mt-3 flex-row items-center gap-2 rounded-xl bg-sage-400/15 px-3 py-2.5">
              <Feather name="clock" size={13} color={Colors.sage[600]} />
              <Text
                className="flex-1 text-xs leading-5 text-sage-600"
                style={{ fontFamily: 'Inter_500Medium' }}>
                Today's delivery: placed in your yurt by 5:00 PM
              </Text>
            </View>
          </InfoCard>

          <InfoCard icon="check-circle" label="Before you go" title={`Checkout by ${PROPERTY.checkOut}`}>
            {CHECKOUT_ITEMS.map((item, i) => (
              <ChecklistRow
                key={item.title}
                title={item.title}
                body={item.body}
                checked={!!checked[i]}
                onToggle={() => toggle(i)}
              />
            ))}
          </InfoCard>

          <View className="mx-4 mt-5">
            <Pressable
              onPress={reportIssue}
              className="flex-row items-center justify-center rounded-2xl border border-sand-300 bg-white py-4 active:opacity-60">
              <Feather name="alert-circle" size={14} color={Colors.terracotta[500]} />
              <Text
                className="ml-2 text-xs uppercase text-earth-700"
                style={{ fontFamily: 'Inter_600SemiBold', letterSpacing: 2 }}>
                Report an issue
              </Text>
            </Pressable>
            <Text
              className="mt-2 text-center text-[10px] text-earth-600"
              style={{ fontFamily: 'Inter_400Regular' }}>
              Opens your mail app · sent to {PROPERTY.email}
            </Text>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}

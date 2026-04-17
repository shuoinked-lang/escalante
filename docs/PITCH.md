# Escalante Yurts — Guest Experience App

A mobile app prototype that complements the existing website and
booking system. The app is a **guest experience hub**, not a
replacement for ResNexus.

## What this solves

- **After-hours check-ins.** Guests arriving after 7 PM don't need
  to call the front desk — their door code is on the home screen.
- **Yurt-specific info at guests' fingertips.** Walking directions,
  amenities, WiFi credentials, and breakfast timing — specific to
  *their* yurt, without hunting through the welcome packet.
- **Activity discovery.** An interactive map of nearby hikes,
  scenic drives, slot canyons, and national parks with drive times
  and turn-by-turn directions — surfaces what guests otherwise ask
  the front desk about.
- **Repeat bookings.** A "Book Your Next Stay" button that opens
  the existing ResNexus page in an in-app browser, while they're
  still delighted.

## What the prototype demonstrates

1. **Home** — welcome, stay facts (check-in / check-out / quiet
   hours), WiFi with tap-to-copy, brand photography.
2. **Map** — 10 curated activities with category filters, hero
   photos, difficulty, drive times, and "Open in Maps" directions.
3. **My Stay** — the feature that sells the concept. Personalized
   greeting, prominent 4-digit door code, walking directions to
   the specific yurt, amenities, WiFi, breakfast reminder,
   tappable checkout checklist, one-tap issue reporting.
4. **Info** — policies (breakfast, fire pit, pets, quiet hours,
   smoking, cancellation), contact deep-links (call, text, email,
   Apple/Google Maps), newsletter signup.

## What the full version would add

- **Real reservation lookup.** Guest enters their email or
  confirmation code; app pulls the live reservation, yurt, and
  door code from ResNexus (or from a lightweight back-office
  system the property staff updates).
- **Account sign-in.** Same email they booked with, auto-enrolled
  in the newsletter / loyalty list.
- **Live map pins.** Native Apple Maps / Google Maps instead of
  the current Leaflet fallback — one config change after the app
  graduates from Expo Go.
- **Push notifications.** "Your breakfast has been delivered,"
  "Fire restrictions in effect today," "Tomorrow is your check-
  out day — here's the checklist."
- **Weather & fire-danger widget** on the home screen (relevant
  for a slot-canyon-heavy activity list).
- **Offline mode** for the map and yurt info — service is spotty
  outside Escalante.
- **Staff-facing mini-app** for housekeeping turnover, late
  check-in requests, and issue reports from the guest app.

## What we need from the property to ship for real

1. **Photography** — ~20 high-res photos of each yurt interior /
   deck / property landmarks (most of what the current site has
   is web-compressed).
2. **Real WiFi credentials** — network name + password (currently
   sample data).
3. **Walking directions** — one-sentence arrival notes per yurt
   (currently plausible but fabricated).
4. **ResNexus or back-office integration approach** — either API
   access to pull reservations, or a simple CSV/spreadsheet
   maintained by staff that the app reads.
5. **Brand approvals** — logo lockup, approved colors, approved
   tone of voice.
6. **Decision on Apple Developer account** ($99/year) — needed to
   ship via App Store or TestFlight for iPhone guests.

## Cost & effort to go from prototype → production

- **Development:** ~4-6 weeks at part-time pace to fold in real
  reservation data, push notifications, weather, and the staff
  back-office.
- **Ongoing hosting:** $0-40/mo (Expo / EAS free tier covers most
  needs at this scale; adds up if we push many updates).
- **Apple developer:** $99/year.
- **Google Play developer:** $25 one-time.
- **Map tiles:** free on OSM, or Google Maps at Google's $200/mo
  free credit (covers ~28,500 map loads/month — we'd likely never
  pay).

## The line that should land

> "Your door code is 4827. You can walk in anytime tonight."
>
> That's what every guest sees the morning of their stay — and
> that's the late-night phone call that doesn't happen.

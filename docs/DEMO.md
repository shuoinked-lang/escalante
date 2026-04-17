# Demo-Day Runbook

Everything you need to get the prototype onto your uncle's phone
and run a compelling 60-second walkthrough.

## Part 1 — Build & share an installable APK

One-time setup if you haven't used EAS yet:

```bash
npm install -g eas-cli
eas login
eas init              # links this repo to your Expo account
```

Then, the build itself:

```bash
eas build --profile preview --platform android
```

- Takes 10–20 minutes on EAS's servers (free tier is fine).
- When done, EAS prints a shareable install URL and a direct APK
  download link.
- Send your uncle the URL. He taps it, downloads the APK, and
  accepts "install from unknown sources" once. No Play Store, no
  account needed.

### If your uncle has an iPhone

The cheapest path is **Expo Go + published update**:

```bash
npm install -g eas-cli
eas login
eas update --branch preview --message "demo build"
```

- EAS prints a QR code.
- Your uncle installs **Expo Go** from the App Store.
- He scans the QR code inside Expo Go → the app runs.
- Limitation: he has to keep Expo Go installed and open the
  project from within it.

The "looks exactly like a real app" path is **TestFlight** — but
that requires a $99/year Apple Developer account. Skip for the
prototype; revisit when the decision's made to go production.

## Part 2 — 60-second screen-recording shot list

Record on the device (iPhone: Control Center → Screen Record;
Android: Quick Settings → Screen Record). Keep each beat tight.

| Time    | What to show                                    | What to say                                                              |
| ------- | ----------------------------------------------- | ------------------------------------------------------------------------ |
| 0:00–03 | Splash screen with the Escalante Yurts mark     | "Opens branded, feels like yours."                                       |
| 0:03–10 | Home tab — scroll past hero, stay facts, WiFi   | "Guest lands here. Check-in time, quiet hours, WiFi — all one screen."   |
| 0:10–15 | Tap the WiFi Copy button                        | "Tap to copy the password — no more reading it off a laminated card."    |
| 0:15–30 | Switch to Map tab. Tap a pin (Calf Creek Falls) | "Property's centered. Tap any pin — you get photo, drive time, directions, right here." |
| 0:30–35 | Tap "Open in Maps" → shows native Maps briefly  | "One tap to turn-by-turn."                                               |
| 0:35–50 | Switch to My Stay. Pause on the door code card  | "**This** is the one. 'Your door code is 4827. Walk in anytime tonight.' That's the late-night phone call that doesn't happen." |
| 0:50–58 | Scroll down — walking directions, checklist     | "Everything the welcome packet used to do — on their phone."             |
| 0:58–60 | Tap "Book Your Next Stay"                       | "And they can rebook before they check out."                             |

**Speaking tips:**

- The door code moment is the pitch. Everything before is setup,
  everything after is reinforcement. Slow down at 0:35–50.
- Don't apologize for anything. "Sample data" and "this is a
  prototype" are in the deck, not the demo.
- If the map takes a second to load tiles, narrate it —
  "OpenStreetMap here for the demo, we'd swap to Apple Maps for
  production."

## Part 3 — What to have open next to the video

When you send your uncle the APK + video, pair it with:

- The pitch doc (`docs/PITCH.md`). It's the "why" behind the "what."
- A short cover message with the three asks from the pitch:
  photography, WiFi credentials, and a decision on how to connect
  reservations.

## Part 4 — A checklist before you hit Record

- [ ] Restart Expo with `npx expo start -c` so the build is clean.
- [ ] Silence mode on, notifications off, Do Not Disturb on.
- [ ] Battery > 50%, brightness at 60–70% (too bright washes out
      the video).
- [ ] App fully loaded — no tiles mid-fetch — before you start.
- [ ] Shoot twice. First take is always stiff.

## Troubleshooting

- **"EAS build failed: bundleIdentifier not set"** — we set it
  (`com.escalanteyurts.app`) but double-check `app.json` if EAS
  complains.
- **"Install blocked: unknown developer" on Android** — have him
  long-press the APK and "install anyway," or enable "install
  unknown apps" for whichever app he's opening the link from
  (Chrome, Gmail, etc.).
- **APK size is big (~60 MB)** — that's expected for a React
  Native app. iPhone installs via TestFlight are smaller; this
  Android APK is not optimized yet.

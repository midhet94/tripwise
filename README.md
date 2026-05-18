# Tripwise

A luxury travel concierge app for discerning travellers. Tripwise curates ultra-premium stays, bespoke experiences, and exclusive member deals — tailored to you and your family.

Built with React Native + Expo, targeting iOS and Android.

---

## What it does

Tripwise acts as your personal travel concierge in your pocket. It surfaces hand-picked properties (think Oberoi Amarvilas, Aman New Delhi, Taj Lake Palace), one-of-a-kind experiences (private Taj Mahal sunrise, helicopter tiger safari), and time-limited member deals — all within a dark, gold-accented interface designed to feel as premium as the travel it sells.

**Key screens:**

- **Home** — Concierge hero pick, curated stays carousel, experiences carousel, member deals feed
- **Book** — Enquire about and book trips
- **Plans** — Upcoming and past itineraries
- **Account** — Profile and family member management

**Onboarding (4 steps)** collects your travel DNA:
1. Personal profile — marital status, birthday, anniversary, party size
2. Family members — names, relations, ages
3. Travel preferences — style, dietary needs, accessibility requirements
4. Dream destinations and travel purposes

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | [Expo](https://expo.dev) ~55 (SDK 55) |
| Navigation | Expo Router (file-based) |
| Language | TypeScript |
| Styling | React Native StyleSheet |
| Persistence | AsyncStorage |
| Animation | React Native Reanimated 4 |

---

## Getting started

**Prerequisites:** Node 18+, and either the Expo Go app on your device or a local iOS/Android simulator.

```bash
# Install dependencies
npm install

# Start the dev server
npm start

# Or target a specific platform
npm run ios
npm run android
npm run web
```

Scan the QR code with Expo Go (iOS/Android) or press `i` / `a` in the terminal to open a simulator.

---

## Project structure

```
app/
  (auth)/         Login and sign-up screens
  (onboarding)/   4-step preference collection flow
  (tabs)/         Main tab navigator (Home, Book, Plans, Account)
  _layout.tsx     Root layout and navigation shell

components/
  ui/             Reusable design-system primitives
                  (GoldButton, LuxInput, Chip, Divider, SectionHeader)

constants/
  theme.ts        Colours, fonts, spacing, radii tokens
  data.ts         Seed data — stays, experiences, deals, destinations
```

---

## Design language

Tripwise uses a bespoke dark luxury aesthetic:

- **Background** `#0A0A0A` near-black canvas
- **Accent** `#C9A84C` warm gold for highlights, CTAs, and prices
- **Typography** Georgia serif for editorial headings; system sans-serif for UI
- **Cards** Dark `#161616` with `#242424` borders — no harsh whites

---

## Roadmap

- [ ] Backend integration (stays, bookings, user accounts)
- [ ] Real imagery for stays and experiences
- [ ] Push notifications for deal expiry and trip reminders
- [ ] AI concierge chat for bespoke itinerary building
- [ ] Loyalty / membership tier system

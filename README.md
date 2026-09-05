# Lagoon

A local calendar for nights and mornings worth leaving the house for — concerts, live music, street festivals, raves, and farmers markets within **60 miles of Barefoot Bay, Florida (ZIP 32976)** — plus a separate **House / EDM** list of Orlando dance rooms, the one drive outside that ring.

The Space and Treasure Coasts are full of rooms and downtowns that don’t share a single listings page. You shouldn’t have to check The Moon Room, downtown Melbourne, Earl’s, Squid Lips, and a farmers-market Facebook post as five separate habits. Lagoon is that one page: what’s on, how far, and whether it’s tonight.

## Why it exists

Event discovery around 32976 is scattered. Ticket sites miss the free patio set. Downtown association calendars miss the Saturday rave. Market pages don’t mention the tribute show at Summer Crush. House in Orlando lives on a different set of sites entirely. The result is a lot of driving past something you would have gone to.

Lagoon’s job is narrow:

1. **One radius, one exception.** Home is Barefoot Bay. The main calendar is capped at 60 miles. **House / EDM** is Orlando only (~70 miles) — the drive for a real house room.
2. **The nights people actually go out for.** Paid concerts (Moon Room at Pineapples in EGAD), standing live-music rooms, street fairs, festivals, local EDM, weekend farmers markets, and Orlando house bills.
3. **Filters you can tap with a thumb.** Two tabs under the title (**60 miles** vs **House / EDM**), then date, category, and closest city. **Raves / EDM** on the local tab is the 60-mile electronic net. Saved listings stay on the device — no account.

It is not a ticket marketplace, a social network, or a live scrape of the internet. Listings are curated from venue calendars, downtown associations, and market schedules, then dated in Eastern Time. Always confirm with the venue before you drive.

## What “good” looks like

Three examples the app is built around:

- **Street festivals in downtown Melbourne** — Riverview Park markets, village art walks, the kind of Saturday you park once and stay.
- **Concerts at The Moon Room (EGAD)** — a real ticketed room at Pineapples, not a nameless “live music tonight” blurb.
- **House in Orlando** — The Vanguard, Celine, Wall Street Plaza, House of Blues, Mango’s, EDC at Tinker Field. Not mixed into the 60-mile list.

If those keep showing up on the right tab, the calendar is doing its job.

## Who it’s for

People who live or stay near Barefoot Bay, Micco, Sebastian, Palm Bay, Melbourne, EGAD, the beaches, Vero, and the rest of the 60-mile ring — and who will also drive to Orlando for a house night.

## How to use it

Two tabs under the Lagoon title:

| Tab | What it shows | Default date |
| --- | --- | --- |
| **60 miles** | Concerts, live rooms, street fairs, festivals, markets, and local EDM inside the ring | This weekend |
| **House / EDM** | Orlando only | All dates |

**Raves / EDM** (on **60 miles**) covers Sanbar Satellite Beach, Foo Bar Cocoa Beach, Sandbar Cocoa Beach, Debauchery in downtown Melbourne, and any other house or rave listing inside 60 miles. Orlando electronic does **not** appear here.

On **House / EDM**, style chips are House vs Raves / EDM (for example EDC). There is no city row — every listing is Orlando.

On either tab:

- **When** — today, weekend, this week, or all dates.
- **Category** chips combine; empty means all in that tab.
- **Closest city** (60 miles only) is sorted by miles from Barefoot Bay.
- Tap a listing for time, address, a short note, directions, and tickets or the venue page when there is one.
- **Save** bookmarks a show on this browser. Saved is a filter, not an account.

Featured at the top is the strongest pick in the current window — a Moon Room night or downtown festival on **60 miles**; an Orlando house bill or EDC week on **House / EDM**.

## What’s in the data

Dated shows plus recurring weekly rooms and markets (Earl’s Hideaway, Squid Lips EGAD, Sanbar Saturday EDM, Saturday markets, and so on). Recurring rows skip dates that already have a named bill so you don’t see “live music” and the actual concert on the same night.

**60 miles** cities include Sebastian, Palm Bay, Melbourne, Indialantic, Eau Gallie, Indian Harbour Beach, Vero Beach, Satellite Beach, Suntree, Viera, Cocoa Beach, Cocoa, Fort Pierce, Merritt Island, Cape Canaveral, Port St. Lucie, Jensen Beach, Titusville, and Stuart.

**House / EDM** venues: The Vanguard, Celine, Wall Street Plaza, House of Blues Orlando (Disney Springs), Mango’s Tropical Café (International Drive), Tinker Field (EDC Orlando). Distance from Barefoot Bay is shown as an Orlando drive.

## Run it locally

```bash
npm install
npm run dev
```

Open the URL printed in the terminal. `npm run typecheck` and `npm run build` are also available.

Stack: TanStack Start, React, Tailwind CSS. Saved listings use local storage. No sign-in.

## On iPhone and iPad

Built for the phone and the iPad preview: home-indicator and notch insets, 44px controls, no pinch-zoom on the search field, and a Home Screen icon via the share sheet (Add to Home Screen). Scroll stays on the page when you open a listing. Always confirm times with the venue before you drive.

## Honest limits

Listings are a curated catalog, not a live feed. Rooms change bills; markets skip holiday weekends; a street fair can move a block. Treat Lagoon as the newspaper of local nights, then confirm with the venue.

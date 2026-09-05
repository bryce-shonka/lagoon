# Lagoon

A local calendar for nights and mornings worth leaving the house for — concerts, live music, street festivals, raves, and farmers markets within **60 miles of Barefoot Bay, Florida (ZIP 32976)**.

The Space and Treasure Coasts are full of rooms and downtowns that don’t share a single listings page. You shouldn’t have to check The Moon Room, downtown Melbourne, Earl’s, Squid Lips, and a farmers-market Facebook post as five separate habits. Lagoon is that one page: what’s on, how far, and whether it’s tonight.

## Why it exists

Event discovery around 32976 is scattered. Ticket sites miss the free patio set. Downtown association calendars miss the Saturday rave. Market pages don’t mention the tribute show at Summer Crush. The result is a lot of driving past something you would have gone to.

Lagoon’s job is narrow:

1. **One radius.** Home is Barefoot Bay. Everything is measured in miles from there, capped at 60.
2. **The nights people actually go out for.** Paid concerts (Moon Room at Pineapples in EGAD), standing live-music rooms, street fairs, festivals, EDM/rave nights, weekend farmers markets, and — on the House / EDM tab — Orlando house rooms plus local raves.
3. **Filters you can tap with a thumb.** Two tabs (60 miles vs House / EDM), then category, closest city, today / weekend / this week / all dates. Saved listings stay on the device — no account.

It is not a ticket marketplace, a social network, or a live scrape of the internet. Listings are curated from venue calendars, downtown associations, and market schedules, then dated in Eastern Time. Always confirm with the venue before you drive.

## What “good” looks like

Two examples the app is built around:

- **Street festivals in downtown Melbourne** — Riverview Park markets, village art walks, the kind of Saturday you park once and stay.
- **Concerts at The Moon Room (EGAD)** — a real ticketed room at Pineapples, not a nameless “live music tonight” blurb.

If those two keep showing up correctly, the rest of the calendar is doing its job.

## Who it’s for

People who live or stay near Barefoot Bay, Micco, Sebastian, Palm Bay, Melbourne, EGAD, the beaches, Vero, and the rest of the 60-mile ring — and would rather scroll one list than six venue sites before dinner.

## How to use it

Two tabs:

- **60 miles** — the original Lagoon calendar: concerts, live rooms, street fairs, festivals, raves, and farmers markets inside the ring.
- **House / EDM** — house music in Orlando (The Vanguard, Celine, Wall Street Plaza, House of Blues, Mango’s) plus any EDM inside 60 miles (Sanbar, Foo Bar, Sandbar Cocoa Beach, Debauchery). Orlando is the one exception to the radius, because that’s the drive for a real house room.

On either tab:

- **When** defaults to this weekend. Today, this week, or the full calendar are one tap.
- **Category** (or House / Raves on the EDM tab) chips combine; empty means all in that tab.
- **Closest city** is sorted by miles from Barefoot Bay.
- Tap a listing for time, address, a short note, directions, and tickets or the venue page when there is one.
- **Save** bookmarks a show on this browser. Saved is a filter, not an account.

Featured at the top of the list is the strongest pick in the current window — a Moon Room night or downtown festival on Local; an Orlando house bill or EDC week on House / EDM.


## What’s in the data

Dated shows plus recurring weekly rooms and markets (Earl’s Hideaway, Squid Lips EGAD, Sanbar, Saturday markets, and so on). Recurring rows skip dates that already have a named bill so you don’t see “live music” and the actual concert on the same night.

Cities in range include Sebastian, Palm Bay, Melbourne, Indialantic, Eau Gallie, Indian Harbour Beach, Vero Beach, Satellite Beach, Suntree, Viera, Cocoa Beach, Cocoa, Fort Pierce, Merritt Island, Cape Canaveral, Port St. Lucie, Jensen Beach, Titusville, and Stuart. The House / EDM tab also lists Orlando (about 75 miles) for house rooms only.

## Run it locally

```bash
npm install
npm run dev
```

Open the URL printed in the terminal. `npm run typecheck` and `npm run build` are also available.

Stack: TanStack Start, React, Tailwind CSS. Saved listings use local storage. No sign-in.

## Honest limits

Listings are a curated catalog, not a live feed. Rooms change bills; markets skip holiday weekends; a street fair can move a block. Treat Lagoon as the newspaper of local nights, then confirm with the venue.

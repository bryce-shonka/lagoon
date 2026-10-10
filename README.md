# Lagoon

A local calendar for nights and mornings worth leaving the house for — concerts, live music, street festivals, raves, and farmers markets within **60 miles of Barefoot Bay, Florida (ZIP 32976)** — plus two drives outside that ring: **House / EDM** (Orlando) and **Miami** (Club Space and downtown house rooms).

The Space and Treasure Coasts are full of rooms and downtowns that don’t share a single listings page. You shouldn’t have to check The Moon Room, downtown Melbourne, Captain Hiram’s, Earl’s, Tiki Bar & Grill, and a farmers-market Facebook post as six separate habits. Lagoon is that one page: what’s on, how far, and whether it’s tonight.

## Why it exists

Event discovery around 32976 is scattered. Ticket sites miss the free patio set. Downtown association calendars miss the Saturday rave. Market pages don’t mention the tribute show at Summer Crush. House in Orlando and Miami lives on a different set of sites entirely. The result is a lot of driving past something you would have gone to.

Lagoon’s job is narrow:

1. **One radius, two exceptions.** Home is Barefoot Bay. The main calendar is capped at 60 miles. **House / EDM** is Orlando only (~70 miles). **Miami** is Club Space and the downtown rooms (~170 miles) — the trip for a real terrace night.
2. **The nights people actually go out for.** Paid concerts (Moon Room at Pineapples in EGAD), standing live-music rooms on the Sebastian river (Hiram’s, Tiki, Earl’s), street fairs, festivals, local EDM, weekend farmers markets, Orlando house bills, and Miami terrace nights.
3. **Filters you can tap with a thumb.** Three tabs under the title, then date, category, and closest city. **Raves / EDM** on the local tab is the 60-mile electronic net. Saved listings stay on the device — no account.

It is not a ticket marketplace, a social network, or a live scrape of the internet. Listings are curated from venue calendars, downtown associations, and market schedules, then dated in Eastern Time. Always confirm with the venue before you drive.

## What “good” looks like

Four examples the app is built around:

- **Street festivals in downtown Melbourne** — Riverview Park markets, village art walks, the kind of Saturday you park once and stay.
- **Concerts at The Moon Room (EGAD)** — a real ticketed room at Pineapples, not a nameless “live music tonight” blurb.
- **Sebastian river live** — Captain Hiram’s Sandbar, Tiki Bar & Grill, and Earl’s Hideaway on Indian River Drive.
- **House in Orlando and Miami** — The Vanguard / Celine in Orlando; Club Space terrace (and Floyd / The Ground) in Miami. Not mixed into the 60-mile list.

If those keep showing up on the right tab, the calendar is doing its job.

## Who it’s for

People who live or stay near Barefoot Bay, Micco, Sebastian, Palm Bay, Melbourne, EGAD, the beaches, Vero, and the rest of the 60-mile ring — and who will also drive to Orlando or fly/drive to Miami for a house night.

## How to use it

Three tabs under the Lagoon title:

| Tab | What it shows | Default date |
| --- | --- | --- |
| **60 miles** | Concerts, live rooms, street fairs, festivals, air shows, markets, and local EDM inside the ring | This weekend (Fri–Sun) |
| **House / EDM** | Orlando only | All dates |
| **Miami** | Club Space (Terrace + Ground), Floyd, and downtown Miami house/EDM | This weekend (Fri–Sun) |

**Raves / EDM** (on **60 miles**) covers Sanbar Satellite Beach, Foo Bar Cocoa Beach, Sandbar Cocoa Beach, Debauchery in downtown Melbourne, and any other house or rave listing inside 60 miles. Orlando and Miami electronic do **not** appear here.

On **House / EDM** and **Miami**, style chips are House vs Raves / EDM. There is no city row.

On any tab:

- **When** — today, weekend (Friday–Sunday), this week, or all dates.
- **Category** chips combine; empty means all in that tab.
- **Closest city** (60 miles only) is sorted by miles from Barefoot Bay. Sebastian includes Hiram’s, Tiki, Earl’s, and Squid Lips river.
- Tap a listing for time, address, age policy, a short note, directions, and tickets or the venue page when there is one.
- **Save** bookmarks a show on this browser. Saved is a filter, not an account. Phone and iPad do not share saves.

Featured at the top is the strongest pick in the current window — a Moon Room night or downtown festival on **60 miles**; an Orlando house bill on **House / EDM**; Club Space on **Miami**.

### Markers

- **Now** (pulsing dot) — the set is in progress, after start and before listed end. Space all-nighters can stay **Now** into the next afternoon. It is not “up next.”
- **18+** / **All ages** on the card — the room is not 21+. Club Space, Floyd, The Ground, and E11EVEN stay 21+ (shown when you open the listing). ZeyZey, Factory Town, The Vanguard, Celine, and EDC are 18+. Markets and street fairs are all ages.
- Distance — miles from Barefoot Bay, or “Orlando drive” / “Miami drive” on the exception tabs.

## What’s in the data

Dated shows plus recurring weekly rooms and markets. Recurring rows skip dates that already have a named bill so you don’t see “live music” and the actual concert on the same night.

**60 miles** cities include Sebastian, Palm Bay, Melbourne, Indialantic, Eau Gallie, Indian Harbour Beach, Vero Beach, Satellite Beach, Suntree, Viera, Cocoa Beach, Cocoa, Fort Pierce, Merritt Island, Cape Canaveral, Port St. Lucie, Jensen Beach, Titusville, and Stuart.

**Air shows** is a category on the 60-mile tab. Upcoming: Salute to America in Space at the Kennedy Space Center runway (Nov 7–8, Thunderbirds) and the Stuart Air Show at Witham Field (Nov 13–15). Shows outside 60 miles are not listed.

Sebastian river rooms: Captain Hiram’s Sandbar (1606 Indian River Dr), Tiki Bar & Grill (1130 Indian River Dr), Earl’s Hideaway (1405 Indian River Dr), Squid Lips Sebastian. Named bills from the venue calendars replace the generic “live music” row on those nights.

**House / EDM** venues: The Vanguard, Celine, Wall Street Plaza, House of Blues Orlando (Disney Springs), Mango’s Tropical Café (International Drive), Tinker Field (EDC Orlando).

**Miami** venues: Club Space (Terrace), The Ground at Club Space, Floyd, E11EVEN, ZeyZey, Jungle Island, Factory Town.

## How updates work

This GitHub repo is the code backup. It does **not** update the live app on your phone.

1. Ask for a change in the Grok conversation that built Lagoon.
2. Check the preview.
3. Click **Publish** (Publish changes) so the Home Screen / grok.me app picks it up.
4. Pull to refresh or close and reopen Lagoon on the iPhone and iPad.

Saves on a device stay on that device through a publish.

## On iPhone and iPad

Open the published Lagoon URL in **Safari**, then Share → **Add to Home Screen**. Notch and home-indicator spacing, 44px controls, no pinch-zoom on search. Scroll stays put when you open a listing.

## Run it locally

```bash
npm install
npm run dev
```

Open the URL printed in the terminal. `npm run typecheck` and `npm run build` are also available.

Stack: TanStack Start, React, Tailwind CSS. Saved listings use local storage. No sign-in.

## Honest limits

Listings are a curated catalog, not a live feed. Rooms change bills; markets skip holiday weekends; a street fair can move a block. Treat Lagoon as the newspaper of local nights, then confirm with the venue.

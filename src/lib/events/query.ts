import { HOME } from "@/lib/geo";
import { EVENTS } from "./catalog";
import type { Category, EventView, Feed, WhenFilter } from "./types";
import { EDM_CATEGORIES } from "./types";

const EASTERN = "America/New_York";

const ymdFmt = new Intl.DateTimeFormat("en-CA", {
  timeZone: EASTERN,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const weekdayFmt = new Intl.DateTimeFormat("en-US", {
  timeZone: EASTERN,
  weekday: "short",
});

const timeFmt = new Intl.DateTimeFormat("en-US", {
  timeZone: EASTERN,
  hour: "numeric",
  minute: "2-digit",
});

const dayLabelFmt = new Intl.DateTimeFormat("en-US", {
  timeZone: EASTERN,
  weekday: "long",
  month: "long",
  day: "numeric",
});

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
const dayLabelCache = new Map<string, string>();
const EDM_SET = new Set<string>(EDM_CATEGORIES);

export function easternYmd(d: Date): string {
  return ymdFmt.format(d);
}

export function easternWeekday(d: Date): number {
  const i = WEEKDAYS.indexOf(weekdayFmt.format(d) as (typeof WEEKDAYS)[number]);
  return i < 0 ? 0 : i;
}

export function parseYmd(ymd: string): { y: number; m: number; d: number } {
  const [y, m, d] = ymd.split("-").map(Number);
  return { y, m, d };
}

function addYmd(ymd: string, days: number): string {
  const { y, m, d } = parseYmd(ymd);
  const dt = new Date(Date.UTC(y, m - 1, d + days));
  return dt.toISOString().slice(0, 10);
}

export function weekendRange(now: Date): { start: string; end: string } {
  const today = easternYmd(now);
  const dow = easternWeekday(now);
  if (dow === 6) return { start: today, end: addYmd(today, 1) };
  if (dow === 0) return { start: today, end: today };
  const toSat = 6 - dow;
  return { start: addYmd(today, toSat), end: addYmd(today, toSat + 1) };
}

export function weekRange(now: Date): { start: string; end: string } {
  const today = easternYmd(now);
  return { start: today, end: addYmd(today, 6) };
}

export function eventYmd(event: EventView): string {
  return event.ymd;
}

export function isEdmEvent(e: EventView): boolean {
  return EDM_SET.has(e.category);
}

export function isLocalEvent(e: EventView): boolean {
  return e.distanceMiles <= HOME.radiusMiles + 0.5;
}

export type Filters = {
  feed: Feed;
  when: WhenFilter;
  categories: Category[];
  cities: string[];
  query: string;
  savedOnly: boolean;
  savedIds: string[];
};

export function filterEvents(now: Date, filters: Filters): EventView[] {
  const today = easternYmd(now);
  let start = today;
  let end = "9999-12-31";
  if (filters.when === "today") {
    end = today;
  } else if (filters.when === "weekend") {
    const r = weekendRange(now);
    start = r.start;
    end = r.end;
  } else if (filters.when === "week") {
    const r = weekRange(now);
    start = r.start;
    end = r.end;
  }

  const q = filters.query.trim().toLowerCase();
  const cats = filters.categories.length ? new Set(filters.categories) : null;
  const cities = filters.cities.length ? new Set(filters.cities) : null;
  const saved = filters.savedOnly ? new Set(filters.savedIds) : null;
  const edm = filters.feed === "edm";

  return EVENTS.filter((e) => {
    if (e.ymd < start || e.ymd > end) return false;
    if (edm) {
      if (!isEdmEvent(e)) return false;
    } else if (!isLocalEvent(e)) {
      return false;
    }
    if (cats && !cats.has(e.category)) return false;
    if (cities && !cities.has(e.venue.city)) return false;
    if (saved && !saved.has(e.id)) return false;
    if (q && !e.searchHay.includes(q)) return false;
    return true;
  });
}

export type DayGroup = {
  ymd: string;
  label: string;
  events: EventView[];
};

export function groupByDay(events: EventView[]): DayGroup[] {
  const map = new Map<string, EventView[]>();
  for (const e of events) {
    const list = map.get(e.ymd);
    if (list) list.push(e);
    else map.set(e.ymd, [e]);
  }
  return [...map.entries()].map(([ymd, list]) => ({
    ymd,
    label: formatDayLabel(ymd),
    events: list,
  }));
}

export function formatDayLabel(ymd: string): string {
  const hit = dayLabelCache.get(ymd);
  if (hit) return hit;
  const { y, m, d } = parseYmd(ymd);
  const label = dayLabelFmt.format(new Date(Date.UTC(y, m - 1, d, 16)));
  dayLabelCache.set(ymd, label);
  return label;
}

export function formatTime(ms: number): string {
  return timeFmt.format(new Date(ms));
}

export function formatTimeRange(event: EventView): string {
  const start = formatTime(event.startMs);
  if (!event.end) return start;
  return `${start} – ${formatTime(event.endMs)}`;
}

export type CityChip = {
  city: string;
  miles: number;
  count: number;
};

const cityChipCache = new Map<string, CityChip[]>();

export function cityChips(now: Date, feed: Feed): CityChip[] {
  const today = easternYmd(now);
  const key = `${today}|${feed}`;
  const hit = cityChipCache.get(key);
  if (hit) return hit;
  const map = new Map<string, CityChip>();
  for (const e of EVENTS) {
    if (e.ymd < today) continue;
    if (feed === "edm") {
      if (!isEdmEvent(e)) continue;
    } else if (!isLocalEvent(e)) {
      continue;
    }
    const existing = map.get(e.venue.city);
    if (existing) {
      existing.count += 1;
      existing.miles = Math.min(existing.miles, e.distanceMiles);
    } else {
      map.set(e.venue.city, {
        city: e.venue.city,
        miles: e.distanceMiles,
        count: 1,
      });
    }
  }
  const chips = [...map.values()].sort(
    (a, b) => a.miles - b.miles || a.city.localeCompare(b.city),
  );
  cityChipCache.set(key, chips);
  return chips;
}

export function statusFor(event: EventView, now: Date): "now" | "today" | "later" {
  const n = now.getTime();
  if (n >= event.startMs && n <= event.endMs) return "now";
  if (event.ymd === easternYmd(now)) return "today";
  return "later";
}

export function featuredEvent(events: EventView[], nowMs: number): EventView | undefined {
  let best: EventView | undefined;
  let bestEnded = 1;
  let bestRank = 99;
  let bestStart = Infinity;
  for (const e of events) {
    const ended = e.endMs < nowMs ? 1 : 0;
    const rank = rankEvent(e);
    if (
      ended < bestEnded ||
      (ended === bestEnded && rank < bestRank) ||
      (ended === bestEnded && rank === bestRank && e.startMs < bestStart)
    ) {
      best = e;
      bestEnded = ended;
      bestRank = rank;
      bestStart = e.startMs;
    }
  }
  return best;
}

function rankEvent(e: EventView): number {
  if (e.venueId === "tinker") return 0;
  if (e.category === "house" && e.venue.city === "Orlando" && e.price !== "Cover") return 1;
  if (e.venueId === "pineapples" && (e.category === "concert" || e.category === "festival")) return 2;
  if (e.venueId === "dtmb" && (e.category === "street" || e.category === "festival")) return 3;
  if (e.category === "concert" && e.price !== "Free") return 4;
  if (e.category === "house") return 5;
  if (e.category === "festival") return 6;
  if (e.category === "street") return 7;
  if (e.category === "rave") return 8;
  if (e.category === "concert") return 9;
  return 10;
}

export { HOME };

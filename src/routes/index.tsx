import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/app-header";
import { EventCard } from "@/components/event-card";
import { EventDetail } from "@/components/event-detail";
import { Featured } from "@/components/featured";
import { Filters } from "@/components/filters";
import { EVENTS_BY_ID } from "@/lib/events/catalog";
import {
  cityChips,
  featuredEvent,
  filterEvents,
  groupByDay,
} from "@/lib/events/query";
import { useAppStore } from "@/lib/store";

const EMPTY_IDS: string[] = [];

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [now, setNow] = useState(() => new Date());
  const when = useAppStore((s) => s.when);
  const categories = useAppStore((s) => s.categories);
  const cities = useAppStore((s) => s.cities);
  const query = useAppStore((s) => s.query);
  const savedOnly = useAppStore((s) => s.savedOnly);
  const savedIds = useAppStore((s) => (s.savedOnly ? s.savedIds : EMPTY_IDS));
  const selectedId = useAppStore((s) => s.selectedId);
  const setSelectedId = useAppStore((s) => s.setSelectedId);
  const clearFilters = useAppStore((s) => s.clearFilters);

  useEffect(() => {
    let id = 0;
    const tick = () => setNow(new Date());
    const start = () => {
      tick();
      window.clearInterval(id);
      id = window.setInterval(tick, 60_000);
    };
    const onVis = () => {
      if (document.visibilityState === "hidden") window.clearInterval(id);
      else start();
    };
    start();
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const events = useMemo(
    () =>
      filterEvents(now, {
        when,
        categories,
        cities,
        query,
        savedOnly,
        savedIds,
      }),
    [now, when, categories, cities, query, savedOnly, savedIds],
  );

  const featured = useMemo(
    () => featuredEvent(events, now.getTime()),
    [events, now],
  );
  const grouped = useMemo(() => groupByDay(events), [events]);
  const cityList = useMemo(() => cityChips(now), [now]);
  const selected = selectedId ? (EVENTS_BY_ID[selectedId] ?? null) : null;

  return (
    <main className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-10">
        <div className="rise-in">
          <AppHeader now={now} />
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:items-start">
          <aside className="min-w-0">
            <Filters cities={cityList} resultCount={events.length} />
          </aside>

          <section className="relative min-w-0">
            {featured ? (
              <div className="mb-10 rise-in">
                <Featured event={featured} now={now} onOpen={setSelectedId} />
              </div>
            ) : null}

            {events.length === 0 ? (
              <div className="rounded-xl border border-border bg-surface p-6">
                <h2 className="font-display text-2xl text-fg">Nothing in this window</h2>
                <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted">
                  No listings match the current filters. Reset, or try All dates for the full
                  60-mile calendar.
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-4 inline-flex h-11 items-center text-sm font-medium text-fg underline decoration-border underline-offset-4 hover:decoration-fg"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-10">
                {grouped.map((day) => (
                  <section key={day.ymd}>
                    <h2 className="-mx-1 bg-bg px-1 py-3 font-display text-2xl text-fg">
                      {day.label}
                    </h2>
                    <div>
                      {day.events.map((event) => (
                        <EventCard
                          key={event.id}
                          event={event}
                          now={now}
                          onOpen={setSelectedId}
                        />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}
          </section>
        </div>

        <footer className="mt-16 border-t border-border pt-6 text-xs leading-relaxed text-subtle">
          Listings are curated from local venue calendars, downtown associations, and market
          schedules within 60 miles of Barefoot Bay. Times Eastern. Always confirm with the
          venue before you drive.
        </footer>
      </div>

      <EventDetail event={selected} now={now} onClose={() => setSelectedId(null)} />
    </main>
  );
}

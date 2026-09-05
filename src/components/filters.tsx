import { useEffect, useState } from "react";
import { Bookmark, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CATEGORIES, CATEGORY_LABEL, WHEN_LABEL, type WhenFilter } from "@/lib/events/types";
import { formatMiles } from "@/lib/geo";
import type { CityChip } from "@/lib/events/query";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const WHEN: WhenFilter[] = ["today", "weekend", "week", "all"];

type Props = {
  cities: CityChip[];
  resultCount: number;
};

export function Filters({ cities, resultCount }: Props) {
  const when = useAppStore((s) => s.when);
  const setWhen = useAppStore((s) => s.setWhen);
  const categories = useAppStore((s) => s.categories);
  const toggleCategory = useAppStore((s) => s.toggleCategory);
  const selectedCities = useAppStore((s) => s.cities);
  const toggleCity = useAppStore((s) => s.toggleCity);
  const query = useAppStore((s) => s.query);
  const setQuery = useAppStore((s) => s.setQuery);
  const savedOnly = useAppStore((s) => s.savedOnly);
  const setSavedOnly = useAppStore((s) => s.setSavedOnly);
  const clearFilters = useAppStore((s) => s.clearFilters);
  const [draft, setDraft] = useState(query);

  useEffect(() => {
    setDraft(query);
  }, [query]);

  useEffect(() => {
    if (draft === query) return;
    const id = window.setTimeout(() => setQuery(draft), 160);
    return () => window.clearTimeout(id);
  }, [draft, query, setQuery]);

  const dirty =
    when !== "weekend" ||
    categories.length > 0 ||
    selectedCities.length > 0 ||
    draft.length > 0 ||
    savedOnly;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <label className="relative min-w-0 flex-1">
          <span className="sr-only">Search listings</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" />
          <Input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Search artists, venues, cities"
            className="pl-10"
          />
        </label>
        <Button
          variant={savedOnly ? "chipOn" : "outline"}
          size="icon"
          onClick={() => setSavedOnly(!savedOnly)}
          aria-pressed={savedOnly}
          aria-label="Saved listings"
        >
          <Bookmark className="size-4" />
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {WHEN.map((w) => (
          <Button
            key={w}
            variant={when === w ? "chipOn" : "chip"}
            size="pill"
            onClick={() => setWhen(w)}
            aria-pressed={when === w}
          >
            {WHEN_LABEL[w]}
          </Button>
        ))}
      </div>

      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-widest text-subtle">
          Category
        </p>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => {
            const on = categories.includes(c);
            return (
              <Button
                key={c}
                variant={on ? "chipOn" : "chip"}
                size="pill"
                onClick={() => toggleCategory(c)}
                aria-pressed={on}
              >
                {CATEGORY_LABEL[c]}
              </Button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-widest text-subtle">
          Closest city
        </p>
        <div className="-mx-4 overflow-x-auto overscroll-x-contain px-4 pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:overflow-visible lg:px-0">
          <div className="flex w-max gap-2 lg:w-auto lg:flex-wrap">
            {cities.map((c) => {
              const on = selectedCities.includes(c.city);
              return (
                <Button
                  key={c.city}
                  variant={on ? "chipOn" : "chip"}
                  size="pill"
                  className="shrink-0"
                  onClick={() => toggleCity(c.city)}
                  aria-pressed={on}
                >
                  <span>{c.city}</span>
                  <span className={cn("tabular-nums", on ? "text-accent-fg/70" : "text-subtle")}>
                    {formatMiles(c.miles)}
                  </span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 text-sm text-muted">
        <p>
          <span className="tabular-nums text-fg">{resultCount}</span>
          {resultCount === 1 ? " listing" : " listings"}
        </p>
        {dirty ? (
          <button
            type="button"
            onClick={() => {
              setDraft("");
              clearFilters();
            }}
            className="inline-flex h-11 items-center gap-1 text-muted hover:text-fg"
          >
            <X className="size-3.5" />
            Reset
          </button>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}

import { HOME } from "@/lib/geo";
import { FEED_LABEL, type Feed } from "@/lib/events/types";
import { formatDayLabel } from "@/lib/events/query";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";

type Props = {
  today: string;
  feed: Feed;
};

const FEEDS: Feed[] = ["local", "edm"];

export function AppHeader({ today, feed }: Props) {
  const setFeed = useAppStore((s) => s.setFeed);

  return (
    <header className="border-b border-border pb-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-widest text-subtle">
            {feed === "edm" ? "Orlando house rooms" : "Space & Treasure Coast"}
          </p>
          <h1 className="mt-1 font-display text-5xl italic leading-none text-fg md:text-6xl">
            Lagoon
          </h1>
          <div className="mt-4 flex flex-wrap gap-2">
            {FEEDS.map((f) => (
              <Button
                key={f}
                type="button"
                variant={feed === f ? "chipOn" : "chip"}
                size="pill"
                className="touch-manipulation"
                aria-pressed={feed === f}
                onClick={() => setFeed(f)}
              >
                {FEED_LABEL[f]}
              </Button>
            ))}
          </div>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
            {feed === "edm"
              ? "House and dance nights in Orlando — The Vanguard, Celine, Wall Street Plaza, House of Blues, Mango’s. The drive from Barefoot Bay."
              : `Concerts, live music, street festivals, raves, and farmers markets within ${HOME.radiusMiles} miles of ${HOME.name} (${HOME.zip}).`}
          </p>
        </div>
        <p className="text-sm text-subtle">
          <span className="block text-fg">{formatDayLabel(today)}</span>
          Times in Eastern · {HOME.zip}
        </p>
      </div>
    </header>
  );
}

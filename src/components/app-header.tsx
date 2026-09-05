import { HOME } from "@/lib/geo";

type Props = {
  now: Date;
};

export function AppHeader({ now }: Props) {
  const dateLabel = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(now);

  return (
    <header className="border-b border-border pb-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-subtle">
            Space & Treasure Coast
          </p>
          <h1 className="mt-1 font-display text-5xl italic leading-none text-fg md:text-6xl">
            Lagoon
          </h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
            Concerts, live music, street festivals, raves, and farmers markets within{" "}
            {HOME.radiusMiles} miles of {HOME.name} ({HOME.zip}).
          </p>
        </div>
        <p className="text-sm text-subtle">
          <span className="block text-fg">{dateLabel}</span>
          Times in Eastern · {HOME.zip}
        </p>
      </div>
    </header>
  );
}

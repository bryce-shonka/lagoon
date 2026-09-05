import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CATEGORY_LABEL_ONE } from "@/lib/events/types";
import { CATEGORY_ICON } from "@/lib/events/icons";
import { formatDayLabel, formatTimeRange, statusFor } from "@/lib/events/query";
import { formatMiles } from "@/lib/geo";
import type { EventView } from "@/lib/events/types";

type Props = {
  event: EventView;
  now: Date;
  onOpen: (id: string) => void;
};

export function Featured({ event, now, onOpen }: Props) {
  const Icon = CATEGORY_ICON[event.category];
  const live = statusFor(event, now) === "now";

  return (
    <article className="rounded-xl border border-border bg-surface p-4">
      <p className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-muted">
        <Icon className="size-3.5" aria-hidden />
        {live ? "Happening now" : "Up next"}
        <span className="text-subtle">·</span>
        {CATEGORY_LABEL_ONE[event.category]}
      </p>
      <h2 className="font-display text-3xl leading-tight break-words text-fg md:text-4xl">{event.title}</h2>
      {event.subtitle ? <p className="mt-1 text-base text-muted">{event.subtitle}</p> : null}
      <p className="mt-3 text-sm text-fg">
        {formatDayLabel(event.ymd)}
        <span className="text-muted"> · {formatTimeRange(event)}</span>
      </p>
      <p className="mt-1 text-sm text-muted">
        {event.venue.name}
        {event.venue.neighborhood ? ` · ${event.venue.neighborhood}` : ""}
        {` · ${event.venue.city} · ${formatMiles(event.distanceMiles)}`}
      </p>
      <p className="mt-4 max-w-prose text-sm leading-relaxed text-fg/85">{event.description}</p>
      <div className="mt-5">
        <Button variant="primary" onClick={() => onOpen(event.id)}>
          Open listing
          <ArrowUpRight className="size-4" />
        </Button>
      </div>
    </article>
  );
}

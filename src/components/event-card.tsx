import { memo } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { CATEGORY_LABEL_ONE } from "@/lib/events/types";
import { CATEGORY_ICON } from "@/lib/events/icons";
import { formatTime, statusFor } from "@/lib/events/query";
import { formatMiles } from "@/lib/geo";
import type { EventView } from "@/lib/events/types";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

type Props = {
  event: EventView;
  nowMs: number;
  today: string;
  onOpen: (id: string) => void;
};

export const EventCard = memo(function EventCard({ event, nowMs, today, onOpen }: Props) {
  const saved = useAppStore((s) => s.savedIds.includes(event.id));
  const toggleSaved = useAppStore((s) => s.toggleSaved);
  const status = statusFor(event, nowMs, today);
  const Icon = CATEGORY_ICON[event.category];

  return (
    <div className="group relative flex items-stretch gap-3 border-b border-border py-4 last:border-b-0 md:gap-5">
      <button
        type="button"
        onClick={() => onOpen(event.id)}
        className="flex min-w-0 flex-1 touch-manipulation items-start gap-3 text-left md:gap-5"
      >
        <div className="w-16 shrink-0 pt-0.5 md:w-20">
          <p className="text-sm tabular-nums text-fg">{formatTime(event.startMs)}</p>
          {status === "now" ? (
            <p className="mt-1 flex items-center gap-1.5 text-xs text-now">
              <span className="now-dot" aria-hidden />
              Now
            </p>
          ) : (
            <p className="mt-1 text-xs text-subtle">{event.price}</p>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="mb-1 flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-subtle">
            <Icon className="size-3.5" aria-hidden />
            {CATEGORY_LABEL_ONE[event.category]}
            {event.subtitle ? ` · ${event.subtitle}` : ""}
          </p>
          <h3 className="font-display text-xl leading-snug break-words text-fg group-hover:text-accent md:text-2xl">
            {event.title}
          </h3>
          <p className="mt-1 text-sm text-muted">
            {event.venue.name}
            {event.venue.neighborhood ? ` · ${event.venue.neighborhood}` : ""}
            {` · ${event.venue.city}`}
          </p>
          <p className="mt-0.5 text-xs tabular-nums text-subtle">
            {event.beyondRadius
              ? `${formatMiles(event.distanceMiles)} · Orlando drive`
              : `${formatMiles(event.distanceMiles)} from Barefoot Bay`}
          </p>
        </div>
      </button>
      <button
        type="button"
        onClick={() => toggleSaved(event.id)}
        aria-pressed={saved}
        aria-label={saved ? "Remove saved listing" : "Save listing"}
        className={cn(
          "flex size-11 shrink-0 touch-manipulation items-center justify-center rounded-md text-muted hover:bg-surface-2 hover:text-fg",
          saved && "text-fg",
        )}
      >
        {saved ? <BookmarkCheck className="size-4" /> : <Bookmark className="size-4" />}
      </button>
    </div>
  );
});

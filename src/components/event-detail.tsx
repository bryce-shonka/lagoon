import { useEffect, useRef } from "react";
import { Bookmark, BookmarkCheck, MapPin, Ticket, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CATEGORY_LABEL_ONE } from "@/lib/events/types";
import { formatDayLabel, formatTimeRange, statusFor } from "@/lib/events/query";
import { formatMiles, mapsUrl } from "@/lib/geo";
import type { EventView } from "@/lib/events/types";
import { useAppStore } from "@/lib/store";

type Props = {
  event: EventView | null;
  nowMs: number;
  today: string;
  onClose: () => void;
};

export function EventDetail({ event, nowMs, today, onClose }: Props) {
  const shown = event;
  const saved = useAppStore((s) => (shown ? s.savedIds.includes(shown.id) : false));
  const toggleSaved = useAppStore((s) => s.toggleSaved);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!event) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [event]);

  if (!shown) return null;

  return (
    <div className="fixed inset-0 z-50" role="presentation">
      <button
        type="button"
        aria-label="Close listing"
        className="absolute inset-0 bg-bg/70"
        onClick={() => onClose()}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="listing-title"
        className="sheet-in absolute inset-x-0 bottom-0 mx-auto flex max-h-[92dvh] w-full max-w-xl flex-col rounded-t-xl border border-border bg-surface pb-safe"
      >
        <div className="mx-auto mt-3 h-1 w-10 shrink-0 rounded-full bg-border" />
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-5 pb-8 pt-4">
          <div className="mb-4 flex items-start justify-between gap-3">
            <p className="text-xs font-medium uppercase tracking-widest text-muted">
              {CATEGORY_LABEL_ONE[shown.category]}
              {statusFor(shown, nowMs, today) === "now" ? " · Happening now" : ""}
            </p>
            <button
              type="button"
              onClick={() => onClose()}
              className="flex size-11 shrink-0 items-center justify-center rounded-md text-muted hover:bg-surface-2 hover:text-fg"
              aria-label="Close"
            >
              <X className="size-5" />
            </button>
          </div>
          <h2 id="listing-title" className="font-display text-3xl leading-tight text-fg">
            {shown.title}
          </h2>
          {shown.subtitle ? (
            <p className="mt-1 text-base text-muted">{shown.subtitle}</p>
          ) : null}
          <p className="mt-4 text-sm text-fg">
            {formatDayLabel(shown.ymd)}
            <span className="text-muted"> · {formatTimeRange(shown)}</span>
          </p>
          <p className="mt-1 text-sm text-muted">
            {shown.venue.name}
            {shown.venue.neighborhood ? ` · ${shown.venue.neighborhood}` : ""}
            {` · ${shown.venue.city}`}
            {shown.beyondRadius
              ? ` · ${formatMiles(shown.distanceMiles)} · Orlando drive`
              : ` · ${formatMiles(shown.distanceMiles)} from Barefoot Bay`}
          </p>
          <p className="mt-5 max-w-prose text-base leading-relaxed text-fg/90">
            {shown.description}
          </p>
          <p className="mt-4 text-sm text-muted">{shown.price}</p>
          <p className="mt-1 flex items-start gap-2 text-sm text-muted">
            <MapPin className="mt-0.5 size-4 shrink-0" />
            <span>{shown.venue.address}</span>
          </p>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <Button variant="primary" className="flex-1" asChild>
              <a
                href={mapsUrl(shown.venue.address, shown.venue.name)}
                target="_blank"
                rel="noreferrer"
              >
                <MapPin className="size-4" />
                Directions
              </a>
            </Button>
            {shown.ticketsUrl || shown.url ? (
              <Button variant="outline" className="flex-1" asChild>
                <a
                  href={shown.ticketsUrl ?? shown.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Ticket className="size-4" />
                  {shown.ticketsUrl ? "Tickets" : "Venue"}
                </a>
              </Button>
            ) : null}
            <Button
              variant={saved ? "chipOn" : "outline"}
              className="sm:flex-none"
              onClick={() => toggleSaved(shown.id)}
              aria-pressed={saved}
            >
              {saved ? <BookmarkCheck className="size-4" /> : <Bookmark className="size-4" />}
              {saved ? "Saved" : "Save"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

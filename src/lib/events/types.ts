export const CATEGORIES = [
  "concert",
  "live",
  "festival",
  "street",
  "rave",
  "market",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_LABEL: Record<Category, string> = {
  concert: "Concerts",
  live: "Live music",
  festival: "Festivals",
  street: "Street fairs",
  rave: "Raves",
  market: "Farmers markets",
};

export const CATEGORY_LABEL_ONE: Record<Category, string> = {
  concert: "Concert",
  live: "Live music",
  festival: "Festival",
  street: "Street fair",
  rave: "Rave",
  market: "Farmers market",
};

export type Venue = {
  id: string;
  name: string;
  city: string;
  address: string;
  lat: number;
  lng: number;
  url?: string;
  neighborhood?: string;
};

export type EventItem = {
  id: string;
  title: string;
  subtitle?: string;
  category: Category;
  start: string;
  end?: string;
  venueId: string;
  price: string;
  description: string;
  url?: string;
  ticketsUrl?: string;
  recurring?: boolean;
};

export type EventView = EventItem & {
  venue: Venue;
  distanceMiles: number;
  startMs: number;
  endMs: number;
  ymd: string;
  searchHay: string;
};

export type WhenFilter = "today" | "weekend" | "week" | "all";

export const WHEN_LABEL: Record<WhenFilter, string> = {
  today: "Today",
  weekend: "Weekend",
  week: "This week",
  all: "All dates",
};

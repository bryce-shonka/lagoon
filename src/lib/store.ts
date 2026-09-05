import { create } from "zustand";
import { createJSONStorage, persist, type StateStorage } from "zustand/middleware";
import type { Category, WhenFilter } from "@/lib/events/types";

function memoryStorage(): StateStorage {
  const map = new Map<string, string>();
  return {
    getItem: (k) => map.get(k) ?? null,
    setItem: (k, v) => {
      map.set(k, v);
    },
    removeItem: (k) => {
      map.delete(k);
    },
  };
}

function safeStorage(): StateStorage {
  try {
    const key = "lagoon-32976-probe";
    localStorage.setItem(key, "1");
    localStorage.removeItem(key);
  } catch {
    return memoryStorage();
  }
  return {
    getItem: (k) => {
      try {
        return localStorage.getItem(k);
      } catch {
        return null;
      }
    },
    setItem: (k, v) => {
      try {
        localStorage.setItem(k, v);
      } catch {
        /* private mode / quota */
      }
    },
    removeItem: (k) => {
      try {
        localStorage.removeItem(k);
      } catch {
        /* private mode / quota */
      }
    },
  };
}

type AppState = {
  when: WhenFilter;
  categories: Category[];
  cities: string[];
  query: string;
  savedOnly: boolean;
  savedIds: string[];
  selectedId: string | null;
  setWhen: (when: WhenFilter) => void;
  toggleCategory: (c: Category) => void;
  toggleCity: (city: string) => void;
  setQuery: (q: string) => void;
  setSavedOnly: (v: boolean) => void;
  toggleSaved: (id: string) => void;
  setSelectedId: (id: string | null) => void;
  clearFilters: () => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      when: "weekend",
      categories: [],
      cities: [],
      query: "",
      savedOnly: false,
      savedIds: [],
      selectedId: null,
      setWhen: (when) => set({ when }),
      toggleCategory: (c) => {
        const cur = get().categories;
        set({
          categories: cur.includes(c) ? cur.filter((x) => x !== c) : [...cur, c],
        });
      },
      toggleCity: (city) => {
        const cur = get().cities;
        set({
          cities: cur.includes(city) ? cur.filter((x) => x !== city) : [...cur, city],
        });
      },
      setQuery: (query) => set({ query }),
      setSavedOnly: (savedOnly) => set({ savedOnly }),
      toggleSaved: (id) => {
        const cur = get().savedIds;
        set({
          savedIds: cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id],
        });
      },
      setSelectedId: (selectedId) => set({ selectedId }),
      clearFilters: () =>
        set({
          when: "weekend",
          categories: [],
          cities: [],
          query: "",
          savedOnly: false,
        }),
    }),
    {
      name: "lagoon-32976",
      storage: createJSONStorage(safeStorage),
      partialize: (s) => ({ savedIds: s.savedIds }),
      merge: (persisted, current) => {
        const raw =
          persisted && typeof persisted === "object"
            ? (persisted as { savedIds?: unknown }).savedIds
            : null;
        const savedIds = Array.isArray(raw)
          ? raw.filter((id): id is string => typeof id === "string")
          : [];
        return { ...current, savedIds };
      },
    },
  ),
);

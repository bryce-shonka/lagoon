import type { LucideIcon } from "lucide-react";
import { AudioLines, Disc, Disc3, Flag, Landmark, Music, ShoppingBasket } from "lucide-react";
import type { Category } from "./types";

export const CATEGORY_ICON: Record<Category, LucideIcon> = {
  concert: AudioLines,
  live: Music,
  festival: Flag,
  street: Landmark,
  rave: Disc3,
  market: ShoppingBasket,
  house: Disc,
};

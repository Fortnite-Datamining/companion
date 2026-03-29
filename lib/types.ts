export interface ShopItem {
  id: string;
  name: string;
  description: string;
  type?: { displayValue: string; value: string };
  rarity?: { displayValue: string; value: string };
  series?: { value: string; image?: string };
  set?: { value: string; text?: string };
  images?: {
    icon?: string;
    featured?: string;
    smallIcon?: string;
  };
}

export interface ShopEntry {
  brItems?: ShopItem[];
  finalPrice: number;
  regularPrice: number;
  bundle?: { name: string };
  giftable: boolean;
}

export interface ShopData {
  data: {
    date: string;
    entries: ShopEntry[];
  };
}

export interface NewsMotd {
  id: string;
  title: string;
  body: string;
  image: string;
  tileImage?: string;
  sortingPriority: number;
  tabTitle?: string;
}

export interface NewsData {
  data: {
    br?: { motds?: NewsMotd[] };
    stw?: { motds?: NewsMotd[] };
  };
}

export interface PlayerStats {
  data: {
    account: { id: string; name: string };
    battlePass?: { level: number; progress: number };
    image?: string;
    stats: {
      all?: StatsGroup;
      keyboardMouse?: StatsGroup;
      gamepad?: StatsGroup;
      touch?: StatsGroup;
    };
  };
}

export interface StatsGroup {
  overall?: StatValues;
  solo?: StatValues;
  duo?: StatValues;
  squad?: StatValues;
}

export interface StatValues {
  score: number;
  wins: number;
  kills: number;
  deaths: number;
  matches: number;
  kd: number;
  winRate: number;
  minutesPlayed: number;
  top3?: number;
  top5?: number;
  top6?: number;
  top10?: number;
  top12?: number;
  top25?: number;
}

export interface MapData {
  data: {
    images: {
      blank: string;
      pois: string;
    };
    pois: { id: string; name: string; location: { x: number; y: number; z: number } }[];
  };
}

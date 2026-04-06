import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const HISTORY_FILE = path.join(DATA_DIR, 'shop-history.json');

interface ShopHistoryItem {
  name: string;
  icon: string;
  rarity: string;
  type: string;
  price: number;
  dates: string[];
}

interface ShopHistory {
  lastTracked: string;
  items: Record<string, ShopHistoryItem>;
}

async function loadHistory(): Promise<ShopHistory> {
  try {
    const raw = await fs.readFile(HISTORY_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return { lastTracked: '', items: {} };
  }
}

async function saveHistory(history: ShopHistory) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(HISTORY_FILE, JSON.stringify(history, null, 2));
}

export async function GET() {
  try {
    const res = await fetch('https://fortnite-api.com/v2/shop', {
      headers: { 'User-Agent': 'FortniteCompanion/1.0' },
      cache: 'no-store',
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch shop' }, { status: 500 });
    }

    const shop = await res.json();
    const today = new Date().toISOString().split('T')[0];
    const history = await loadHistory();

    if (history.lastTracked === today) {
      return NextResponse.json({ tracked: false, message: 'Already tracked today', history });
    }

    const entries = shop.data?.entries || [];
    for (const entry of entries) {
      const items = entry.brItems || [];

      for (const item of items) {
        if (!item.id || !item.name) continue;
        const existing = history.items[item.id];
        if (existing) {
          if (!existing.dates.includes(today)) {
            existing.dates.push(today);
          }
        } else {
          history.items[item.id] = {
            name: item.name,
            icon: item.images?.smallIcon || item.images?.icon || item.images?.featured || '',
            rarity: item.rarity?.value || 'common',
            type: item.type?.displayValue || '',
            price: entry.finalPrice || 0,
            dates: [today],
          };
        }
      }
    }

    history.lastTracked = today;
    await saveHistory(history);

    return NextResponse.json({ tracked: true, date: today, itemCount: Object.keys(history.items).length });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

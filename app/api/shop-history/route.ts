import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const HISTORY_FILE = path.join(process.cwd(), 'data', 'shop-history.json');

export async function GET() {
  try {
    const raw = await fs.readFile(HISTORY_FILE, 'utf-8');
    const history = JSON.parse(raw);
    const today = new Date();

    const allDates = new Set<string>();
    const items = Object.entries(history.items || {}).map(([id, item]: [string, any]) => {
      const dates: string[] = item.dates || [];
      dates.forEach((d: string) => allDates.add(d));
      const lastSeen = dates[dates.length - 1] || '';
      const daysSince = lastSeen
        ? Math.floor((today.getTime() - new Date(lastSeen + 'T00:00:00Z').getTime()) / 86400000)
        : 999;

      let avgReturn: number | null = null;
      if (dates.length >= 2) {
        const sortedDates = [...dates].sort();
        let totalGap = 0;
        for (let i = 1; i < sortedDates.length; i++) {
          const d1 = new Date(sortedDates[i - 1] + 'T00:00:00Z');
          const d2 = new Date(sortedDates[i] + 'T00:00:00Z');
          totalGap += Math.floor((d2.getTime() - d1.getTime()) / 86400000);
        }
        avgReturn = Math.round(totalGap / (sortedDates.length - 1));
      }

      return {
        id,
        name: item.name,
        icon: item.icon,
        rarity: item.rarity,
        type: item.type,
        price: item.price || 0,
        dates,
        lastSeen,
        daysSince,
        avgReturn,
        appearances: dates.length,
      };
    });

    return NextResponse.json({
      items,
      trackedDays: allDates.size,
      lastTracked: history.lastTracked,
    });
  } catch {
    return NextResponse.json({ items: [], trackedDays: 0, lastTracked: null });
  }
}

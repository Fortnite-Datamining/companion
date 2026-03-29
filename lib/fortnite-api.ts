import type { ShopData, NewsData, MapData } from './types';

const BASE = 'https://fortnite-api.com';

async function get<T>(path: string, revalidate = 300): Promise<T | null> {
  try {
    const res = await fetch(`${BASE}${path}`, {
      next: { revalidate },
      headers: { 'User-Agent': 'FortniteCompanion/1.0' },
    });
    if (!res.ok) return null;
    return res.json() as Promise<T>;
  } catch {
    return null;
  }
}

export async function getShop() {
  return get<ShopData>('/v2/shop');
}

export async function getNews() {
  return get<NewsData>('/v2/news');
}

export async function getMap() {
  return get<MapData>('/v1/map');
}

export async function getBuild() {
  return get<{ build: string; version: string | null }>(
    '/v2/aes',
    600
  ).then((d) => {
    if (!d) return null;
    const match = (d as unknown as { data: { build: string } }).data?.build?.match(
      /Release-([\d.]+)-CL-(\d+)/
    );
    return match
      ? { version: match[1], changelist: match[2] }
      : null;
  });
}

export async function getPlayerStats(name: string, platform: string = 'epic') {
  const key = process.env.FORTNITE_API_KEY;
  if (!key) return null;
  try {
    const res = await fetch(
      `${BASE}/v2/stats/br/v2?name=${encodeURIComponent(name)}&accountType=${platform}`,
      {
        headers: {
          Authorization: key,
          'User-Agent': 'FortniteCompanion/1.0',
        },
        cache: 'no-store',
      }
    );
    if (!res.ok) return { error: res.status === 404 ? 'Player not found' : res.status === 403 ? 'Stats are private' : 'Failed to fetch stats' };
    return res.json();
  } catch {
    return null;
  }
}

import Link from 'next/link';
import { getBuild } from '@/lib/fortnite-api';

const features = [
  { href: '/shop', title: 'Item Shop', desc: "Today's shop with prices, rarity, and images", icon: '🛒' },
  { href: '/news', title: 'News', desc: 'Latest in-game announcements from Epic', icon: '📰' },
  { href: '/stats', title: 'Player Stats', desc: 'Look up any player by Epic username', icon: '📊' },
  { href: '/map', title: 'Map', desc: 'Current Battle Royale map with POIs', icon: '🗺️' },
];

export default async function Home() {
  const build = await getBuild();

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3">Fortnite Companion</h1>
        {build && (
          <p className="mt-2 text-sm" style={{ color: 'var(--accent)' }}>
            Current version: v{build.version}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {features.map((f) => (
          <Link key={f.href} href={f.href} className="card p-6 block">
            <span className="text-3xl mb-3 block">{f.icon}</span>
            <h2 className="text-xl font-semibold mb-1">{f.title}</h2>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{f.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';

interface HistoryItem {
  id: string;
  name: string;
  icon: string;
  rarity: string;
  type: string;
  price: number;
  dates: string[];
  lastSeen: string;
  daysSince: number;
  avgReturn: number | null;
  appearances: number;
}

const rarityColors: Record<string, string> = {
  legendary: '#f0b132',
  epic: '#b94fe0',
  rare: '#3f9fe0',
  uncommon: '#60aa3a',
  common: '#8c8c8c',
  mythic: '#ffd700',
  marvel: '#ed1d24',
  dc: '#0078f0',
  icon: '#00cccc',
  gaming: '#7c5ff5',
};

type SortKey = 'lastSeen' | 'name' | 'appearances' | 'avgReturn';

export default function HistoryPage() {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [trackingStatus, setTrackingStatus] = useState('');
  const [sortBy, setSortBy] = useState<SortKey>('lastSeen');
  const [filter, setFilter] = useState('');
  const [trackedDays, setTrackedDays] = useState(0);

  useEffect(() => {
    async function load() {
      // First, trigger tracking for today
      try {
        const trackRes = await fetch('/api/track-shop');
        const trackData = await trackRes.json();
        if (trackData.tracked) {
          setTrackingStatus(`Tracked ${trackData.date} - ${trackData.itemCount} items in database`);
        } else if (trackData.history) {
          setTrackingStatus(`${Object.keys(trackData.history.items).length} items tracked`);
        }
      } catch {
        setTrackingStatus('Could not track today\'s shop');
      }

      // Then load the history
      try {
        const res = await fetch('/api/shop-history');
        const data = await res.json();
        setItems(data.items || []);
        setTrackedDays(data.trackedDays || 0);
      } catch {
        setItems([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const sorted = [...items]
    .filter((i) => !filter || i.name.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => {
      switch (sortBy) {
        case 'lastSeen': return a.daysSince - b.daysSince;
        case 'name': return a.name.localeCompare(b.name);
        case 'appearances': return b.appearances - a.appearances;
        case 'avgReturn': return (a.avgReturn ?? 999) - (b.avgReturn ?? 999);
        default: return 0;
      }
    });

  const inShopToday = sorted.filter((i) => i.daysSince === 0);
  const notInShop = sorted.filter((i) => i.daysSince > 0);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Shop History</h1>
        <p className="mt-1" style={{ color: 'var(--text-secondary)' }}>
          Track when items appear in the shop and predict when they return
        </p>
        {trackingStatus && (
          <p className="mt-2 text-xs px-3 py-1.5 rounded-lg inline-block" style={{ background: 'var(--bg-card)', color: 'var(--accent)' }}>
            {trackingStatus}
          </p>
        )}
        {trackedDays > 0 && (
          <p className="mt-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
            Tracking for {trackedDays} day{trackedDays !== 1 ? 's' : ''} — history gets more accurate over time
          </p>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter by name..."
          className="flex-1 px-4 py-2.5 rounded-lg border border-white/10 text-white placeholder:text-gray-500 outline-none focus:border-[var(--accent)]"
          style={{ background: 'var(--bg-card)' }}
        />
        <div className="flex gap-2">
          {([
            ['lastSeen', 'Recent'],
            ['name', 'Name'],
            ['appearances', 'Most Seen'],
            ['avgReturn', 'Fastest Return'],
          ] as [SortKey, string][]).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSortBy(key)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
              style={{
                background: sortBy === key ? 'var(--accent)' : 'var(--bg-card)',
                color: sortBy === key ? 'white' : 'var(--text-secondary)',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <p className="text-center py-12" style={{ color: 'var(--text-secondary)' }}>Loading history...</p>
      )}

      {!loading && items.length === 0 && (
        <div className="text-center py-12">
          <p style={{ color: 'var(--text-secondary)' }}>No history yet. The tracker just started recording today&apos;s shop.</p>
          <p className="text-xs mt-2" style={{ color: 'var(--text-secondary)' }}>Come back tomorrow to see "last seen" data building up!</p>
        </div>
      )}

      {!loading && items.length > 0 && (
        <>
          {/* In shop today */}
          {inShopToday.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400" />
                In Shop Today ({inShopToday.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {inShopToday.map((item) => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          )}

          {/* Previously seen */}
          {notInShop.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-3">Previously Seen ({notInShop.length})</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {notInShop.map((item) => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function ItemCard({ item }: { item: HistoryItem }) {
  const color = rarityColors[item.rarity] || '#8c8c8c';

  return (
    <div
      className="flex items-center gap-3 rounded-xl p-3 transition-colors"
      style={{ background: 'var(--bg-card)', borderLeft: `3px solid ${color}` }}
    >
      {item.icon ? (
        <img src={item.icon} alt={item.name} className="w-14 h-14 rounded-lg object-cover shrink-0" style={{ background: `${color}22` }} loading="lazy" />
      ) : (
        <div className="w-14 h-14 rounded-lg shrink-0" style={{ background: `${color}22` }} />
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold truncate">{item.name}</p>
        <p className="text-[10px] truncate" style={{ color }}>
          {item.rarity.charAt(0).toUpperCase() + item.rarity.slice(1)}
          {item.type ? ` \u00B7 ${item.type}` : ''}
          {item.price > 0 ? ` \u00B7 ${item.price.toLocaleString()} V-Bucks` : ''}
        </p>
        <div className="flex gap-3 mt-1">
          <span className="text-[10px]" style={{ color: item.daysSince === 0 ? '#4ade80' : 'var(--text-secondary)' }}>
            {item.daysSince === 0 ? 'In shop now' : `Last seen ${item.daysSince}d ago`}
          </span>
          <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>
            Seen {item.appearances}x
          </span>
          {item.avgReturn !== null && (
            <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>
              ~{item.avgReturn}d cycle
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

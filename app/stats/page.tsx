'use client';

import { useState } from 'react';
import type { PlayerStats, StatValues } from '@/lib/types';

function StatBlock({ label, stats }: { label: string; stats: StatValues | undefined }) {
  if (!stats) return null;
  return (
    <div className="card p-4">
      <h3 className="text-sm font-semibold mb-3 uppercase tracking-wide" style={{ color: 'var(--accent)' }}>
        {label}
      </h3>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <p className="text-2xl font-bold">{stats.wins.toLocaleString()}</p>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Wins</p>
        </div>
        <div>
          <p className="text-2xl font-bold">{stats.kills.toLocaleString()}</p>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Kills</p>
        </div>
        <div>
          <p className="text-2xl font-bold">{stats.matches.toLocaleString()}</p>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Matches</p>
        </div>
        <div>
          <p className="text-2xl font-bold">{stats.kd.toFixed(2)}</p>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>K/D</p>
        </div>
        <div>
          <p className="text-2xl font-bold">{stats.winRate.toFixed(1)}%</p>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Win Rate</p>
        </div>
        <div>
          <p className="text-2xl font-bold">{Math.floor(stats.minutesPlayed / 60).toLocaleString()}h</p>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Played</p>
        </div>
      </div>
    </div>
  );
}

export default function StatsPage() {
  const [name, setName] = useState('');
  const [platform, setPlatform] = useState('epic');
  const [data, setData] = useState<PlayerStats | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const search = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    setError('');
    setData(null);

    try {
      const res = await fetch(`/api/stats?name=${encodeURIComponent(name.trim())}&platform=${platform}`);
      const json = await res.json();

      if (!res.ok) {
        setError(json.error || 'Failed to fetch stats');
        return;
      }

      setData(json as PlayerStats);
    } catch {
      setError('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const stats = data?.data?.stats?.all;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Player Stats</h1>
        <p className="mt-1" style={{ color: 'var(--text-secondary)' }}>
          Look up any Fortnite player by their username
        </p>
      </div>

      <form onSubmit={search} className="flex gap-3 mb-8 max-w-xl">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Epic username..."
          className="flex-1 px-4 py-2.5 rounded-lg border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-sky-500"
          style={{ background: 'var(--bg-card)' }}
        />
        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="px-3 py-2.5 rounded-lg border border-white/10 text-white"
          style={{ background: 'var(--bg-card)' }}
        >
          <option value="epic">Epic</option>
          <option value="psn">PlayStation</option>
          <option value="xbl">Xbox</option>
        </select>
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2.5 rounded-lg font-medium text-white transition-colors disabled:opacity-50"
          style={{ background: 'var(--accent)' }}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && (
        <div className="card p-4 border-red-500/50 mb-6">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {data && (
        <div>
          <h2 className="text-2xl font-bold mb-1">{data.data.account.name}</h2>
          {data.data.battlePass && (
            <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
              Battle Pass Level {data.data.battlePass.level}
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StatBlock label="Overall" stats={stats?.overall} />
            <StatBlock label="Solo" stats={stats?.solo} />
            <StatBlock label="Duo" stats={stats?.duo} />
            <StatBlock label="Squad" stats={stats?.squad} />
          </div>
        </div>
      )}

      {!data && !error && !loading && (
        <p className="text-center py-12" style={{ color: 'var(--text-secondary)' }}>
          Search for a player to see their stats.
        </p>
      )}
    </div>
  );
}

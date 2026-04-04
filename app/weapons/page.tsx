'use client';

import { useState } from 'react';
import { WEAPONS, getUniqueWeapons, getWeaponDisplayName, compareWeapons, type Weapon, type ComparisonResult } from '@/lib/weapons';

const rarityColors: Record<string, string> = {
  common: '#8c8c8c',
  uncommon: '#60aa3a',
  rare: '#3f9fe0',
  epic: '#b94fe0',
  legendary: '#f0b132',
  mythic: '#ffd700',
  exotic: '#00cccc',
};

function StatBar({ label, valueA, valueB, higher }: { label: string; valueA: string; valueB: string; higher: 'a' | 'b' | 'tie' }) {
  return (
    <div className="grid grid-cols-3 items-center gap-2 py-1.5">
      <span className={`text-right text-sm font-mono ${higher === 'a' ? 'text-green-400 font-bold' : ''}`}>{valueA}</span>
      <span className="text-center text-xs" style={{ color: 'var(--text-secondary)' }}>{label}</span>
      <span className={`text-left text-sm font-mono ${higher === 'b' ? 'text-green-400 font-bold' : ''}`}>{valueB}</span>
    </div>
  );
}

function ResultRow({ result }: { result: ComparisonResult }) {
  const bg = result.winner === 'tie' ? 'rgba(255,255,255,0.05)' : result.winner === 'a' ? 'rgba(0,178,255,0.08)' : 'rgba(185,79,224,0.08)';
  const icon = result.winner === 'tie' ? '=' : result.winner === 'a' ? 'A' : 'B';
  const iconColor = result.winner === 'tie' ? 'var(--text-secondary)' : result.winner === 'a' ? 'var(--accent)' : '#b94fe0';

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg" style={{ background: bg }}>
      <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ background: iconColor, color: 'white' }}>
        {icon}
      </span>
      <div>
        <p className="text-sm font-semibold">{result.scenario}</p>
        <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{result.reason}</p>
      </div>
    </div>
  );
}

function higher(a: number, b: number): 'a' | 'b' | 'tie' {
  if (a === b) return 'tie';
  return a > b ? 'a' : 'b';
}

function lower(a: number, b: number): 'a' | 'b' | 'tie' {
  if (a === b) return 'tie';
  return a < b ? 'a' : 'b';
}

export default function WeaponsPage() {
  const [weaponA, setWeaponA] = useState('');
  const [weaponB, setWeaponB] = useState('');

  const allWeapons = getUniqueWeapons();
  const a = WEAPONS.find((w) => w.id === weaponA);
  const b = WEAPONS.find((w) => w.id === weaponB);

  const results = a && b ? compareWeapons(a, b) : null;
  const winsA = results?.filter((r) => r.winner === 'a').length ?? 0;
  const winsB = results?.filter((r) => r.winner === 'b').length ?? 0;

  const categories = ['assault', 'smg', 'shotgun', 'sniper', 'pistol', 'explosive'] as const;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Weapon Comparison</h1>
        <p className="mt-1" style={{ color: 'var(--text-secondary)' }}>
          Pick two weapons and see which wins in different scenarios
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide mb-2 block" style={{ color: 'var(--accent)' }}>Weapon A</label>
          <select
            value={weaponA}
            onChange={(e) => setWeaponA(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-white/10 text-white"
            style={{ background: 'var(--bg-card)' }}
          >
            <option value="">Select a weapon...</option>
            {categories.map((cat) => (
              <optgroup key={cat} label={cat.charAt(0).toUpperCase() + cat.slice(1) + 's'}>
                {allWeapons.filter((w) => WEAPONS.find((wp) => wp.id === w.id)?.category === cat).map((w) => (
                  <option key={w.id} value={w.id}>{w.label}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide mb-2 block" style={{ color: '#b94fe0' }}>Weapon B</label>
          <select
            value={weaponB}
            onChange={(e) => setWeaponB(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-white/10 text-white"
            style={{ background: 'var(--bg-card)' }}
          >
            <option value="">Select a weapon...</option>
            {categories.map((cat) => (
              <optgroup key={cat} label={cat.charAt(0).toUpperCase() + cat.slice(1) + 's'}>
                {allWeapons.filter((w) => WEAPONS.find((wp) => wp.id === w.id)?.category === cat).map((w) => (
                  <option key={w.id} value={w.id}>{w.label}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
      </div>

      {a && b && results && (
        <>
          {/* Verdict */}
          <div className="card p-5 mb-6 text-center">
            {winsA === winsB ? (
              <p className="text-xl font-bold">It's a draw!</p>
            ) : (
              <p className="text-xl font-bold">
                <span style={{ color: winsA > winsB ? 'var(--accent)' : '#b94fe0' }}>
                  {getWeaponDisplayName(winsA > winsB ? a : b)}
                </span>
                {' '}wins {Math.max(winsA, winsB)}-{Math.min(winsA, winsB)}
              </p>
            )}
          </div>

          {/* Stat Comparison */}
          <div className="card p-5 mb-6">
            <div className="grid grid-cols-3 mb-3">
              <p className="text-right text-sm font-semibold" style={{ color: 'var(--accent)' }}>{a.name}</p>
              <p className="text-center text-xs" style={{ color: 'var(--text-secondary)' }}>VS</p>
              <p className="text-left text-sm font-semibold" style={{ color: '#b94fe0' }}>{b.name}</p>
            </div>
            <div className="grid grid-cols-3 mb-2">
              <p className="text-right text-xs" style={{ color: rarityColors[a.rarity] }}>{a.rarity}</p>
              <p className="text-center text-xs"></p>
              <p className="text-left text-xs" style={{ color: rarityColors[b.rarity] }}>{b.rarity}</p>
            </div>
            <div className="border-t border-white/10 pt-3 space-y-0.5">
              <StatBar label="Damage" valueA={String(a.damage)} valueB={String(b.damage)} higher={higher(a.damage, b.damage)} />
              <StatBar label="Headshot" valueA={String(a.headshot)} valueB={String(b.headshot)} higher={higher(a.headshot, b.headshot)} />
              <StatBar label="DPS" valueA={String(a.dps)} valueB={String(b.dps)} higher={higher(a.dps, b.dps)} />
              <StatBar label="Fire Rate" valueA={a.fireRate.toFixed(1)} valueB={b.fireRate.toFixed(1)} higher={higher(a.fireRate, b.fireRate)} />
              <StatBar label="Mag Size" valueA={String(a.magSize)} valueB={String(b.magSize)} higher={higher(a.magSize, b.magSize)} />
              <StatBar label="Reload (s)" valueA={a.reloadTime.toFixed(1)} valueB={b.reloadTime.toFixed(1)} higher={lower(a.reloadTime, b.reloadTime)} />
              <StatBar label="Build DMG" valueA={String(a.buildDamage)} valueB={String(b.buildDamage)} higher={higher(a.buildDamage, b.buildDamage)} />
            </div>
          </div>

          {/* Scenario Breakdown */}
          <div className="card p-5">
            <h2 className="text-lg font-semibold mb-4">Scenario Breakdown</h2>
            <div className="space-y-2">
              {results.map((r) => (
                <ResultRow key={r.scenario} result={r} />
              ))}
            </div>
            {(a.notes || b.notes) && (
              <div className="mt-4 pt-3 border-t border-white/10">
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  {a.notes && <span>*{a.name}: {a.notes}. </span>}
                  {b.notes && <span>*{b.name}: {b.notes}.</span>}
                </p>
              </div>
            )}
          </div>
        </>
      )}

      {(!a || !b) && (
        <p className="text-center py-12" style={{ color: 'var(--text-secondary)' }}>
          Select two weapons above to compare them.
        </p>
      )}
    </div>
  );
}

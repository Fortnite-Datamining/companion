'use client';

import { useState } from 'react';
import { WEAPONS, getWeaponDisplayName, compareWeapons, type Weapon, type ComparisonResult } from '@/lib/weapons';

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

const categoryLabels: Record<string, string> = {
  assault: 'Assault Rifles',
  smg: 'SMGs',
  shotgun: 'Shotguns',
  dmr: 'DMRs',
  sniper: 'Snipers',
  pistol: 'Pistols',
  explosive: 'Explosives',
  melee: 'Melee / Special',
};

const categories = ['assault', 'smg', 'shotgun', 'dmr', 'sniper', 'pistol', 'explosive', 'melee'] as const;

export default function WeaponsPage() {
  const [weaponA, setWeaponA] = useState('');
  const [weaponB, setWeaponB] = useState('');

  const a = WEAPONS.find((w) => w.id === weaponA);
  const b = WEAPONS.find((w) => w.id === weaponB);

  const results = a && b ? compareWeapons(a, b) : null;
  const winsA = results?.filter((r) => r.winner === 'a').length ?? 0;
  const winsB = results?.filter((r) => r.winner === 'b').length ?? 0;

  function WeaponSelect({ value, onChange, label, color }: { value: string; onChange: (v: string) => void; label: string; color: string }) {
    return (
      <div>
        <label className="text-xs font-semibold uppercase tracking-wide mb-2 block" style={{ color }}>{label}</label>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg border border-white/10 text-white"
          style={{ background: 'var(--bg-card)' }}
        >
          <option value="">Select a weapon...</option>
          {categories.map((cat) => {
            const weaponsInCat = WEAPONS.filter((w) => w.category === cat);
            if (weaponsInCat.length === 0) return null;
            return (
              <optgroup key={cat} label={categoryLabels[cat]}>
                {weaponsInCat.map((w) => (
                  <option key={w.id} value={w.id}>{w.name}</option>
                ))}
              </optgroup>
            );
          })}
        </select>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Weapon Comparison</h1>
        <p className="mt-1" style={{ color: 'var(--text-secondary)' }}>
          Chapter 7 Season 2 — pick two weapons and see which wins
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <WeaponSelect value={weaponA} onChange={setWeaponA} label="Weapon A" color="var(--accent)" />
        <WeaponSelect value={weaponB} onChange={setWeaponB} label="Weapon B" color="#b94fe0" />
      </div>

      {a && b && results && (
        <>
          {/* Verdict */}
          <div className="card p-5 mb-6 text-center">
            {winsA === winsB ? (
              <p className="text-xl font-bold">It&apos;s a draw!</p>
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

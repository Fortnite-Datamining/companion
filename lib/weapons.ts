export interface Weapon {
  id: string;
  name: string;
  category: 'assault' | 'smg' | 'shotgun' | 'sniper' | 'pistol' | 'explosive' | 'dmr' | 'melee';
  damage: number;
  headshot: number;
  fireRate: number;
  magSize: number;
  reloadTime: number;
  buildDamage: number;
  range: 'close' | 'mid' | 'long';
  dps: number;
  notes?: string;
}

function dps(damage: number, fireRate: number) {
  return Math.round(damage * fireRate);
}

// Chapter 7 Season 3: Runners loot pool. Stats are community-sourced (Fandom
// wiki, fortnitetracker, gameriv) at the current hotfix and use the Epic tier
// unless noted; "approx." marks weapons whose exact values aren't published yet.
export const WEAPONS: Weapon[] = [
  // New this season
  { id: 'chaos_exploder_rifle', name: 'Chaos Exploder Rifle', category: 'explosive', damage: 38, headshot: 49, fireRate: 3.4, magSize: 25, reloadTime: 3.0, buildDamage: 70, range: 'mid', dps: dps(38, 3.4), notes: 'New - explosive rounds detonate on contact, auto-loads 2 rounds every 3s' },
  { id: 'surgical_burst_rifle', name: 'Surgical Burst Rifle', category: 'assault', damage: 26, headshot: 39, fireRate: 5.0, magSize: 24, reloadTime: 2.3, buildDamage: 27, range: 'mid', dps: dps(26, 5.0), notes: 'New - accurate 3-round-burst AR, low recoil, minimal falloff' },
  { id: 'flex_smg', name: 'Flex SMG', category: 'smg', damage: 17, headshot: 26, fireRate: 11.0, magSize: 40, reloadTime: 2.2, buildDamage: 17, range: 'close', dps: dps(17, 11.0), notes: 'New - dual fire mode: fast hipfire vs harder-hitting ADS' },
  { id: 'lancehead_pistol', name: 'Lancehead Pistol', category: 'pistol', damage: 32, headshot: 43, fireRate: 6.75, magSize: 21, reloadTime: 1.5, buildDamage: 32, range: 'close', dps: dps(32, 6.75), notes: "New (Legendary) - John Wick's sidearm, throws empty mag for +35 damage" },
  { id: 'extending_focus_shotgun', name: 'Extending Focus Shotgun', category: 'shotgun', damage: 80, headshot: 120, fireRate: 2.0, magSize: 3, reloadTime: 2.0, buildDamage: 80, range: 'mid', dps: dps(80, 2.0), notes: 'New - triple-barrel, spread tightens over a 3-round volley (stats approx.)' },

  // Season mythics (boss drops)
  { id: 'mythic_burst_rifle', name: "Voidblade's Burst Rifle", category: 'assault', damage: 30, headshot: 45, fireRate: 5.0, magSize: 24, reloadTime: 2.1, buildDamage: 30, range: 'mid', dps: dps(30, 5.0), notes: 'Mythic (Voidblade boss) - tuned Surgical Burst with ADS accuracy bonus (stats approx.)' },
  { id: 'mythic_reacher_extending_shotgun', name: 'Reacher Extending Shotgun', category: 'shotgun', damage: 101, headshot: 145, fireRate: 1.75, magSize: 3, reloadTime: 1.96, buildDamage: 101, range: 'close', dps: dps(101, 1.75), notes: 'Mythic (Skeletor boss) - combat-shotgun hybrid with unusually long reach' },

  // Returning weapons
  { id: 'stinger_smg', name: 'Stinger SMG', category: 'smg', damage: 21, headshot: 32, fireRate: 11.5, magSize: 33, reloadTime: 2.37, buildDamage: 21, range: 'close', dps: dps(21, 11.5), notes: 'Hitscan close-range SMG, light bullets' },
  { id: 'maven_auto_shotgun', name: 'Maven Auto Shotgun', category: 'shotgun', damage: 89, headshot: 156, fireRate: 3.0, magSize: 6, reloadTime: 4.99, buildDamage: 89, range: 'close', dps: dps(89, 3.0), notes: 'Full-auto shotgun, 10 pellets, per-shell reload' },
  { id: 'striker_pump_shotgun', name: 'Striker Pump Shotgun', category: 'shotgun', damage: 114, headshot: 211, fireRate: 0.67, magSize: 5, reloadTime: 4.66, buildDamage: 59, range: 'close', dps: dps(114, 0.67), notes: 'Classic pump, 12 pellets, highest per-shot burst' },
  { id: 'chaos_reloader_shotgun', name: 'Chaos Reloader Shotgun', category: 'shotgun', damage: 144, headshot: 173, fireRate: 0.85, magSize: 6, reloadTime: 1.8, buildDamage: 144, range: 'close', dps: dps(144, 0.85), notes: 'Tight spread, auto-reloads ~every 2s while stowed' },
  { id: 'hunting_rifle', name: 'Hunting Rifle', category: 'sniper', damage: 96, headshot: 240, fireRate: 0.8, magSize: 1, reloadTime: 1.71, buildDamage: 96, range: 'long', dps: dps(96, 0.8), notes: 'No-scope bolt-action, 2.5x headshot, no scope glare' },
  { id: 'business_turret', name: 'Business Turret', category: 'explosive', damage: 7, headshot: 7, fireRate: 8.5, magSize: 9999, reloadTime: 0, buildDamage: 7, range: 'mid', dps: dps(7, 8.5), notes: 'Deployable auto-turret, locks on, infinite ammo, ~60m range' },
  { id: 'ranger_pistol', name: 'Ranger Pistol', category: 'pistol', damage: 31, headshot: 62, fireRate: 6.1, magSize: 17, reloadTime: 1.45, buildDamage: 30, range: 'mid', dps: dps(31, 6.1), notes: 'Full-auto suppressed sidearm with built-in laser sight' },
];

export function getWeaponDisplayName(w: Weapon): string {
  return w.name;
}

export function getUniqueWeapons(): { id: string; label: string }[] {
  return WEAPONS.map((w) => ({
    id: w.id,
    label: w.name,
  }));
}

export interface ComparisonResult {
  scenario: string;
  winner: 'a' | 'b' | 'tie';
  reason: string;
}

export function compareWeapons(a: Weapon, b: Weapon): ComparisonResult[] {
  const results: ComparisonResult[] = [];

  if (a.dps !== b.dps) {
    results.push({
      scenario: 'Raw DPS',
      winner: a.dps > b.dps ? 'a' : 'b',
      reason: `${a.dps > b.dps ? a.name : b.name} deals ${Math.abs(a.dps - b.dps)} more damage per second (${Math.max(a.dps, b.dps)} vs ${Math.min(a.dps, b.dps)})`,
    });
  } else {
    results.push({ scenario: 'Raw DPS', winner: 'tie', reason: `Both deal ${a.dps} DPS` });
  }

  const closeA = a.range === 'close' ? 2 : a.range === 'mid' ? 1 : 0;
  const closeB = b.range === 'close' ? 2 : b.range === 'mid' ? 1 : 0;
  const closeDpsA = a.dps * (closeA === 2 ? 1.0 : closeA === 1 ? 0.7 : 0.3);
  const closeDpsB = b.dps * (closeB === 2 ? 1.0 : closeB === 1 ? 0.7 : 0.3);
  results.push({
    scenario: 'Close Range',
    winner: Math.abs(closeDpsA - closeDpsB) < 5 ? 'tie' : closeDpsA > closeDpsB ? 'a' : 'b',
    reason: closeDpsA > closeDpsB
      ? `${a.name} excels up close with ${a.category === 'shotgun' ? 'high burst damage' : a.category === 'melee' ? 'melee range advantage' : 'high fire rate'}`
      : closeDpsB > closeDpsA
        ? `${b.name} excels up close with ${b.category === 'shotgun' ? 'high burst damage' : b.category === 'melee' ? 'melee range advantage' : 'high fire rate'}`
        : 'Both perform similarly at close range',
  });

  const longA = a.range === 'long' ? 2 : a.range === 'mid' ? 1 : 0;
  const longB = b.range === 'long' ? 2 : b.range === 'mid' ? 1 : 0;
  const longDpsA = a.dps * (longA === 2 ? 1.0 : longA === 1 ? 0.6 : 0.2);
  const longDpsB = b.dps * (longB === 2 ? 1.0 : longB === 1 ? 0.6 : 0.2);
  results.push({
    scenario: 'Long Range',
    winner: Math.abs(longDpsA - longDpsB) < 5 ? 'tie' : longDpsA > longDpsB ? 'a' : 'b',
    reason: longDpsA > longDpsB
      ? `${a.name} is more effective at distance`
      : longDpsB > longDpsA
        ? `${b.name} is more effective at distance`
        : 'Both perform similarly at long range',
  });

  const buildScoreA = a.buildDamage * a.fireRate;
  const buildScoreB = b.buildDamage * b.fireRate;
  results.push({
    scenario: 'Breaking Builds',
    winner: Math.abs(buildScoreA - buildScoreB) < 10 ? 'tie' : buildScoreA > buildScoreB ? 'a' : 'b',
    reason: buildScoreA > buildScoreB
      ? `${a.name} tears through builds faster (${Math.round(buildScoreA)} vs ${Math.round(buildScoreB)} build DPS)`
      : buildScoreB > buildScoreA
        ? `${b.name} tears through builds faster (${Math.round(buildScoreB)} vs ${Math.round(buildScoreA)} build DPS)`
        : 'Both break builds at a similar rate',
  });

  const maxA = a.headshot;
  const maxB = b.headshot;
  results.push({
    scenario: 'One-Shot Potential',
    winner: maxA === maxB ? 'tie' : maxA > maxB ? 'a' : 'b',
    reason: maxA >= 200 && maxB < 200
      ? `${a.name} can one-shot with a headshot (${maxA} damage)`
      : maxB >= 200 && maxA < 200
        ? `${b.name} can one-shot with a headshot (${maxB} damage)`
        : maxA >= 200 && maxB >= 200
          ? `Both can one-shot - ${(maxA > maxB ? a : b).name} hits harder (${Math.max(maxA, maxB)} vs ${Math.min(maxA, maxB)})`
          : `Neither can one-shot - max headshot: ${Math.max(maxA, maxB)} vs ${Math.min(maxA, maxB)}`,
  });

  const sustainA = (a.magSize * a.damage) / (a.magSize / a.fireRate + a.reloadTime);
  const sustainB = (b.magSize * b.damage) / (b.magSize / b.fireRate + b.reloadTime);
  results.push({
    scenario: 'Sustained Fights',
    winner: Math.abs(sustainA - sustainB) < 5 ? 'tie' : sustainA > sustainB ? 'a' : 'b',
    reason: sustainA > sustainB
      ? `${a.name} maintains higher damage over time with ${a.magSize} round mag and ${a.reloadTime}s reload`
      : sustainB > sustainA
        ? `${b.name} maintains higher damage over time with ${b.magSize} round mag and ${b.reloadTime}s reload`
        : 'Both have similar sustained damage output',
  });

  return results;
}

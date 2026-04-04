export interface Weapon {
  id: string;
  name: string;
  category: 'assault' | 'smg' | 'shotgun' | 'sniper' | 'pistol' | 'explosive' | 'dmr' | 'melee';
  damage: number;
  headshot: number;
  fireRate: number; // rounds per second
  magSize: number;
  reloadTime: number; // seconds
  buildDamage: number;
  range: 'close' | 'mid' | 'long';
  dps: number;
  notes?: string;
}

function dps(damage: number, fireRate: number) {
  return Math.round(damage * fireRate);
}

export const WEAPONS: Weapon[] = [
  // Assault Rifles
  { id: 'combat_ar', name: 'Combat Assault Rifle', category: 'assault', damage: 21, headshot: 31, fireRate: 9.0, magSize: 35, reloadTime: 2.9, buildDamage: 21, range: 'mid', dps: dps(21, 9.0), notes: 'High fire rate, great for spraying' },
  { id: 'nemesis_ar', name: 'Nemesis AR', category: 'assault', damage: 33, headshot: 49, fireRate: 5.0, magSize: 28, reloadTime: 2.4, buildDamage: 33, range: 'mid', dps: dps(33, 5.0), notes: 'Balanced AR, solid at all ranges' },
  { id: 'squibblys_combat_ar', name: "Squibbly's Combat AR", category: 'assault', damage: 25, headshot: 37, fireRate: 9.0, magSize: 35, reloadTime: 2.6, buildDamage: 25, range: 'mid', dps: dps(25, 9.0), notes: 'Mythic — fire rate ramps up when held' },

  // SMGs
  { id: 'thunder_burst_smg', name: 'Thunder Burst SMG', category: 'smg', damage: 27, headshot: 51, fireRate: 4.25, magSize: 24, reloadTime: 2.2, buildDamage: 27, range: 'close', dps: dps(27, 4.25), notes: '3-round burst, 100% hip-fire accuracy with laser' },
  { id: 'twin_mag_smg', name: 'Twin Mag SMG', category: 'smg', damage: 18, headshot: 31, fireRate: 13.0, magSize: 25, reloadTime: 1.3, buildDamage: 18, range: 'close', dps: dps(18, 13.0), notes: 'Insane fire rate, built-in laser' },

  // Shotguns
  { id: 'iron_pump', name: 'Iron Pump Shotgun', category: 'shotgun', damage: 101, headshot: 165, fireRate: 0.8, magSize: 5, reloadTime: 5.1, buildDamage: 101, range: 'close', dps: dps(101, 0.8), notes: '10 pellets per shot, per-shell reload' },
  { id: 'twin_hammer', name: 'Twin Hammer Shotguns', category: 'shotgun', damage: 35, headshot: 61, fireRate: 3.0, magSize: 10, reloadTime: 4.5, buildDamage: 35, range: 'close', dps: dps(35, 3.0), notes: 'Alternating barrels, fastest shotgun' },
  { id: 'chaos_reloader', name: 'Chaos Reloader Shotgun', category: 'shotgun', damage: 160, headshot: 175, fireRate: 0.55, magSize: 1, reloadTime: 1.2, buildDamage: 160, range: 'close', dps: dps(160, 0.55), notes: 'Auto-reloads when stowed, tight spread' },
  { id: 'dark_voyager_obliterator', name: "Dark Voyager's Obliterator", category: 'shotgun', damage: 179, headshot: 175, fireRate: 0.55, magSize: 2, reloadTime: 1.2, buildDamage: 179, range: 'close', dps: dps(179, 0.55), notes: 'Mythic Chaos Reloader — 2 shots, auto-reloads when stowed' },

  // DMR / Marksman
  { id: 'vector7_dmr', name: 'Vector 7 DMR', category: 'dmr', damage: 68, headshot: 119, fireRate: 2.5, magSize: 5, reloadTime: 2.5, buildDamage: 68, range: 'long', dps: dps(68, 2.5), notes: 'Hitscan under 100m, bullet drop beyond' },
  { id: 'foundations_rift_rifle', name: "The Foundation's Rift Rifle", category: 'dmr', damage: 71, headshot: 124, fireRate: 2.5, magSize: 5, reloadTime: 2.5, buildDamage: 71, range: 'long', dps: dps(71, 2.5), notes: 'Exotic — charged shot spawns a teleport rift' },

  // Snipers
  { id: 'tracking_rifle', name: 'Lawful Heavy Impact Tracking Rifle', category: 'sniper', damage: 138, headshot: 345, fireRate: 0.64, magSize: 1, reloadTime: 2.7, buildDamage: 193, range: 'long', dps: dps(138, 0.64), notes: 'Exotic — marks enemies for 10s, 3x vehicle damage' },

  // Pistols
  { id: 'pistol', name: 'Pistol', category: 'pistol', damage: 26, headshot: 45, fireRate: 6.75, magSize: 16, reloadTime: 1.4, buildDamage: 26, range: 'mid', dps: dps(26, 6.75), notes: 'Classic sidearm, fast and reliable' },
  { id: 'mammoth_pistol', name: 'Lawful Explosive Mammoth Pistol', category: 'pistol', damage: 110, headshot: 148, fireRate: 1.0, magSize: 1, reloadTime: 1.71, buildDamage: 140, range: 'mid', dps: dps(110, 1.0), notes: 'Exotic — 55 bullet + 55 explosion damage' },

  // Explosives
  { id: 'bouncing_boomstick', name: 'Bouncing Boomstick', category: 'explosive', damage: 40, headshot: 40, fireRate: 1.0, magSize: 3, reloadTime: 0, buildDamage: 80, range: 'mid', dps: dps(40, 4.0), notes: 'Throwable — bounces and explodes 4 times (160 max)' },
  { id: 'shockwave_rl', name: 'Lawful Shockwave Rocket Launcher', category: 'explosive', damage: 30, headshot: 30, fireRate: 0.75, magSize: 1, reloadTime: 2.5, buildDamage: 100, range: 'mid', dps: dps(30, 0.75), notes: 'Exotic — launches players away, minimal damage' },
  { id: 'cluster_cannon', name: 'Seven Cluster Cannon', category: 'explosive', damage: 77, headshot: 77, fireRate: 1.0, magSize: 1, reloadTime: 3.0, buildDamage: 200, range: 'mid', dps: dps(77, 1.0), notes: 'Legendary — splits into 7 cluster explosives on impact' },

  // Melee / Special
  { id: 'power_gloves', name: 'Seven Power Gloves', category: 'melee', damage: 50, headshot: 50, fireRate: 1.5, magSize: 4, reloadTime: 11.0, buildDamage: 50, range: 'close', dps: dps(50, 1.5), notes: 'Punch 50, dash 40, uppercut 70 — great mobility' },
  { id: 'ice_king_gauntlets', name: "Ice King's Gauntlets", category: 'melee', damage: 50, headshot: 50, fireRate: 2.0, magSize: 10, reloadTime: 3.0, buildDamage: 50, range: 'close', dps: dps(50, 2.0), notes: 'Mythic — ice bomb 65 dmg, blizzard 5 dps area denial' },
  { id: 'harpoon_gun', name: 'Harpoon Gun', category: 'melee', damage: 75, headshot: 75, fireRate: 0.75, magSize: 20, reloadTime: 0, buildDamage: 150, range: 'mid', dps: dps(75, 0.75), notes: '20 charges, pulls enemies toward you, missed shots free' },
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

  // DPS comparison
  if (a.dps !== b.dps) {
    results.push({
      scenario: 'Raw DPS',
      winner: a.dps > b.dps ? 'a' : 'b',
      reason: `${a.dps > b.dps ? a.name : b.name} deals ${Math.abs(a.dps - b.dps)} more damage per second (${Math.max(a.dps, b.dps)} vs ${Math.min(a.dps, b.dps)})`,
    });
  } else {
    results.push({ scenario: 'Raw DPS', winner: 'tie', reason: `Both deal ${a.dps} DPS` });
  }

  // Close range
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

  // Long range
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

  // Building fights
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

  // One-shot potential
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
          ? `Both can one-shot — ${(maxA > maxB ? a : b).name} hits harder (${Math.max(maxA, maxB)} vs ${Math.min(maxA, maxB)})`
          : `Neither can one-shot — max headshot: ${Math.max(maxA, maxB)} vs ${Math.min(maxA, maxB)}`,
  });

  // Sustain (mag size * damage / reload)
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

export interface Weapon {
  id: string;
  name: string;
  category: 'assault' | 'smg' | 'shotgun' | 'sniper' | 'pistol' | 'explosive' | 'utility';
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic' | 'exotic';
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
  { id: 'ar_standard', name: 'Assault Rifle', category: 'assault', rarity: 'common', damage: 30, headshot: 60, fireRate: 5.5, magSize: 30, reloadTime: 2.3, buildDamage: 30, range: 'mid', dps: dps(30, 5.5) },
  { id: 'ar_standard_u', name: 'Assault Rifle', category: 'assault', rarity: 'uncommon', damage: 31, headshot: 62, fireRate: 5.5, magSize: 30, reloadTime: 2.2, buildDamage: 31, range: 'mid', dps: dps(31, 5.5) },
  { id: 'ar_standard_r', name: 'Assault Rifle', category: 'assault', rarity: 'rare', damage: 33, headshot: 66, fireRate: 5.5, magSize: 30, reloadTime: 2.1, buildDamage: 33, range: 'mid', dps: dps(33, 5.5) },
  { id: 'ar_standard_e', name: 'Assault Rifle', category: 'assault', rarity: 'epic', damage: 35, headshot: 70, fireRate: 5.5, magSize: 30, reloadTime: 2.0, buildDamage: 35, range: 'mid', dps: dps(35, 5.5) },
  { id: 'ar_standard_l', name: 'Assault Rifle', category: 'assault', rarity: 'legendary', damage: 36, headshot: 72, fireRate: 5.5, magSize: 30, reloadTime: 1.9, buildDamage: 36, range: 'mid', dps: dps(36, 5.5) },
  { id: 'ar_tactical', name: 'Tactical Assault Rifle', category: 'assault', rarity: 'rare', damage: 24, headshot: 36, fireRate: 8.0, magSize: 30, reloadTime: 2.1, buildDamage: 24, range: 'mid', dps: dps(24, 8.0) },
  { id: 'ar_tactical_e', name: 'Tactical Assault Rifle', category: 'assault', rarity: 'epic', damage: 25, headshot: 37, fireRate: 8.0, magSize: 30, reloadTime: 2.0, buildDamage: 25, range: 'mid', dps: dps(25, 8.0) },
  { id: 'ar_tactical_l', name: 'Tactical Assault Rifle', category: 'assault', rarity: 'legendary', damage: 27, headshot: 40, fireRate: 8.0, magSize: 30, reloadTime: 1.9, buildDamage: 27, range: 'mid', dps: dps(27, 8.0) },
  { id: 'ar_heavy', name: 'Heavy Assault Rifle', category: 'assault', rarity: 'rare', damage: 38, headshot: 57, fireRate: 3.75, magSize: 25, reloadTime: 2.5, buildDamage: 38, range: 'long', dps: dps(38, 3.75) },
  { id: 'ar_heavy_e', name: 'Heavy Assault Rifle', category: 'assault', rarity: 'epic', damage: 40, headshot: 60, fireRate: 3.75, magSize: 25, reloadTime: 2.4, buildDamage: 40, range: 'long', dps: dps(40, 3.75) },
  { id: 'ar_heavy_l', name: 'Heavy Assault Rifle', category: 'assault', rarity: 'legendary', damage: 42, headshot: 63, fireRate: 3.75, magSize: 25, reloadTime: 2.3, buildDamage: 42, range: 'long', dps: dps(42, 3.75) },

  // SMGs
  { id: 'smg_standard', name: 'SMG', category: 'smg', rarity: 'common', damage: 18, headshot: 27, fireRate: 12.0, magSize: 30, reloadTime: 2.2, buildDamage: 18, range: 'close', dps: dps(18, 12.0) },
  { id: 'smg_standard_u', name: 'SMG', category: 'smg', rarity: 'uncommon', damage: 19, headshot: 28, fireRate: 12.0, magSize: 30, reloadTime: 2.1, buildDamage: 19, range: 'close', dps: dps(19, 12.0) },
  { id: 'smg_standard_r', name: 'SMG', category: 'smg', rarity: 'rare', damage: 20, headshot: 30, fireRate: 12.0, magSize: 30, reloadTime: 2.0, buildDamage: 20, range: 'close', dps: dps(20, 12.0) },
  { id: 'smg_standard_e', name: 'SMG', category: 'smg', rarity: 'epic', damage: 21, headshot: 31, fireRate: 12.0, magSize: 30, reloadTime: 1.9, buildDamage: 21, range: 'close', dps: dps(21, 12.0) },
  { id: 'smg_standard_l', name: 'SMG', category: 'smg', rarity: 'legendary', damage: 22, headshot: 33, fireRate: 12.0, magSize: 30, reloadTime: 1.8, buildDamage: 22, range: 'close', dps: dps(22, 12.0) },
  { id: 'smg_suppressed', name: 'Suppressed SMG', category: 'smg', rarity: 'rare', damage: 20, headshot: 40, fireRate: 9.0, magSize: 30, reloadTime: 2.1, buildDamage: 20, range: 'close', dps: dps(20, 9.0) },
  { id: 'smg_suppressed_e', name: 'Suppressed SMG', category: 'smg', rarity: 'epic', damage: 21, headshot: 42, fireRate: 9.0, magSize: 30, reloadTime: 2.0, buildDamage: 21, range: 'close', dps: dps(21, 9.0) },
  { id: 'smg_suppressed_l', name: 'Suppressed SMG', category: 'smg', rarity: 'legendary', damage: 22, headshot: 44, fireRate: 9.0, magSize: 30, reloadTime: 1.9, buildDamage: 22, range: 'close', dps: dps(22, 9.0) },

  // Shotguns
  { id: 'sg_pump_u', name: 'Pump Shotgun', category: 'shotgun', rarity: 'uncommon', damage: 90, headshot: 180, fireRate: 0.7, magSize: 5, reloadTime: 4.6, buildDamage: 90, range: 'close', dps: dps(90, 0.7) },
  { id: 'sg_pump_r', name: 'Pump Shotgun', category: 'shotgun', rarity: 'rare', damage: 100, headshot: 200, fireRate: 0.7, magSize: 5, reloadTime: 4.2, buildDamage: 100, range: 'close', dps: dps(100, 0.7) },
  { id: 'sg_pump_e', name: 'Pump Shotgun', category: 'shotgun', rarity: 'epic', damage: 105, headshot: 210, fireRate: 0.7, magSize: 5, reloadTime: 3.8, buildDamage: 105, range: 'close', dps: dps(105, 0.7) },
  { id: 'sg_pump_l', name: 'Pump Shotgun', category: 'shotgun', rarity: 'legendary', damage: 110, headshot: 220, fireRate: 0.7, magSize: 5, reloadTime: 3.4, buildDamage: 110, range: 'close', dps: dps(110, 0.7) },
  { id: 'sg_tactical_u', name: 'Tactical Shotgun', category: 'shotgun', rarity: 'uncommon', damage: 72, headshot: 108, fireRate: 1.5, magSize: 8, reloadTime: 5.9, buildDamage: 72, range: 'close', dps: dps(72, 1.5) },
  { id: 'sg_tactical_r', name: 'Tactical Shotgun', category: 'shotgun', rarity: 'rare', damage: 76, headshot: 114, fireRate: 1.5, magSize: 8, reloadTime: 5.5, buildDamage: 76, range: 'close', dps: dps(76, 1.5) },
  { id: 'sg_tactical_e', name: 'Tactical Shotgun', category: 'shotgun', rarity: 'epic', damage: 80, headshot: 120, fireRate: 1.5, magSize: 8, reloadTime: 5.1, buildDamage: 80, range: 'close', dps: dps(80, 1.5) },
  { id: 'sg_tactical_l', name: 'Tactical Shotgun', category: 'shotgun', rarity: 'legendary', damage: 84, headshot: 126, fireRate: 1.5, magSize: 8, reloadTime: 4.7, buildDamage: 84, range: 'close', dps: dps(84, 1.5) },
  { id: 'sg_auto_r', name: 'Auto Shotgun', category: 'shotgun', rarity: 'rare', damage: 84, headshot: 118, fireRate: 1.5, magSize: 8, reloadTime: 5.5, buildDamage: 84, range: 'close', dps: dps(84, 1.5) },
  { id: 'sg_auto_e', name: 'Auto Shotgun', category: 'shotgun', rarity: 'epic', damage: 88, headshot: 123, fireRate: 1.5, magSize: 8, reloadTime: 5.1, buildDamage: 88, range: 'close', dps: dps(88, 1.5) },
  { id: 'sg_auto_l', name: 'Auto Shotgun', category: 'shotgun', rarity: 'legendary', damage: 92, headshot: 129, fireRate: 1.5, magSize: 8, reloadTime: 4.7, buildDamage: 92, range: 'close', dps: dps(92, 1.5) },

  // Snipers
  { id: 'sniper_bolt_r', name: 'Bolt-Action Sniper', category: 'sniper', rarity: 'rare', damage: 105, headshot: 262, fireRate: 0.33, magSize: 1, reloadTime: 3.0, buildDamage: 150, range: 'long', dps: dps(105, 0.33) },
  { id: 'sniper_bolt_e', name: 'Bolt-Action Sniper', category: 'sniper', rarity: 'epic', damage: 110, headshot: 275, fireRate: 0.33, magSize: 1, reloadTime: 2.8, buildDamage: 150, range: 'long', dps: dps(110, 0.33) },
  { id: 'sniper_bolt_l', name: 'Bolt-Action Sniper', category: 'sniper', rarity: 'legendary', damage: 116, headshot: 290, fireRate: 0.33, magSize: 1, reloadTime: 2.6, buildDamage: 150, range: 'long', dps: dps(116, 0.33) },
  { id: 'sniper_semi_u', name: 'Semi-Auto Sniper', category: 'sniper', rarity: 'uncommon', damage: 75, headshot: 150, fireRate: 1.7, magSize: 10, reloadTime: 2.5, buildDamage: 75, range: 'long', dps: dps(75, 1.7) },
  { id: 'sniper_semi_r', name: 'Semi-Auto Sniper', category: 'sniper', rarity: 'rare', damage: 78, headshot: 156, fireRate: 1.7, magSize: 10, reloadTime: 2.3, buildDamage: 78, range: 'long', dps: dps(78, 1.7) },
  { id: 'sniper_semi_e', name: 'Semi-Auto Sniper', category: 'sniper', rarity: 'epic', damage: 81, headshot: 162, fireRate: 1.7, magSize: 10, reloadTime: 2.1, buildDamage: 81, range: 'long', dps: dps(81, 1.7) },
  { id: 'sniper_heavy_e', name: 'Heavy Sniper', category: 'sniper', rarity: 'epic', damage: 132, headshot: 330, fireRate: 0.25, magSize: 1, reloadTime: 4.0, buildDamage: 660, range: 'long', dps: dps(132, 0.25), notes: 'Destroys any build in one shot' },
  { id: 'sniper_heavy_l', name: 'Heavy Sniper', category: 'sniper', rarity: 'legendary', damage: 138, headshot: 345, fireRate: 0.25, magSize: 1, reloadTime: 3.7, buildDamage: 660, range: 'long', dps: dps(138, 0.25), notes: 'Destroys any build in one shot' },

  // Pistols
  { id: 'pistol_standard_u', name: 'Pistol', category: 'pistol', rarity: 'uncommon', damage: 26, headshot: 52, fireRate: 6.75, magSize: 16, reloadTime: 1.5, buildDamage: 26, range: 'mid', dps: dps(26, 6.75) },
  { id: 'pistol_standard_r', name: 'Pistol', category: 'pistol', rarity: 'rare', damage: 28, headshot: 56, fireRate: 6.75, magSize: 16, reloadTime: 1.4, buildDamage: 28, range: 'mid', dps: dps(28, 6.75) },
  { id: 'pistol_revolver_u', name: 'Revolver', category: 'pistol', rarity: 'uncommon', damage: 54, headshot: 108, fireRate: 1.5, magSize: 6, reloadTime: 2.3, buildDamage: 54, range: 'mid', dps: dps(54, 1.5) },
  { id: 'pistol_revolver_r', name: 'Revolver', category: 'pistol', rarity: 'rare', damage: 57, headshot: 114, fireRate: 1.5, magSize: 6, reloadTime: 2.2, buildDamage: 57, range: 'mid', dps: dps(57, 1.5) },
  { id: 'pistol_revolver_e', name: 'Revolver', category: 'pistol', rarity: 'epic', damage: 60, headshot: 120, fireRate: 1.5, magSize: 6, reloadTime: 2.1, buildDamage: 60, range: 'mid', dps: dps(60, 1.5) },

  // Explosives
  { id: 'rpg_r', name: 'Rocket Launcher', category: 'explosive', rarity: 'rare', damage: 100, headshot: 100, fireRate: 0.75, magSize: 1, reloadTime: 2.8, buildDamage: 375, range: 'mid', dps: dps(100, 0.75), notes: 'Splash damage in 3 tile radius' },
  { id: 'rpg_e', name: 'Rocket Launcher', category: 'explosive', rarity: 'epic', damage: 110, headshot: 110, fireRate: 0.75, magSize: 1, reloadTime: 2.5, buildDamage: 410, range: 'mid', dps: dps(110, 0.75), notes: 'Splash damage in 3 tile radius' },
  { id: 'rpg_l', name: 'Rocket Launcher', category: 'explosive', rarity: 'legendary', damage: 120, headshot: 120, fireRate: 0.75, magSize: 1, reloadTime: 2.2, buildDamage: 450, range: 'mid', dps: dps(120, 0.75), notes: 'Splash damage in 3 tile radius' },
  { id: 'grenade_launcher_r', name: 'Grenade Launcher', category: 'explosive', rarity: 'rare', damage: 100, headshot: 100, fireRate: 1.0, magSize: 6, reloadTime: 3.5, buildDamage: 375, range: 'mid', dps: dps(100, 1.0), notes: 'Bouncing projectile' },
  { id: 'grenade_launcher_e', name: 'Grenade Launcher', category: 'explosive', rarity: 'epic', damage: 105, headshot: 105, fireRate: 1.0, magSize: 6, reloadTime: 3.2, buildDamage: 393, range: 'mid', dps: dps(105, 1.0), notes: 'Bouncing projectile' },
  { id: 'grenade_launcher_l', name: 'Grenade Launcher', category: 'explosive', rarity: 'legendary', damage: 110, headshot: 110, fireRate: 1.0, magSize: 6, reloadTime: 2.9, buildDamage: 412, range: 'mid', dps: dps(110, 1.0), notes: 'Bouncing projectile' },
];

export function getWeaponDisplayName(w: Weapon): string {
  return `${w.name} (${w.rarity.charAt(0).toUpperCase() + w.rarity.slice(1)})`;
}

export function getUniqueWeapons(): { id: string; label: string }[] {
  return WEAPONS.map((w) => ({
    id: w.id,
    label: getWeaponDisplayName(w),
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
      reason: `${a.dps > b.dps ? getWeaponDisplayName(a) : getWeaponDisplayName(b)} deals ${Math.abs(a.dps - b.dps)} more damage per second (${Math.max(a.dps, b.dps)} vs ${Math.min(a.dps, b.dps)})`,
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
      ? `${getWeaponDisplayName(a)} excels up close with ${a.category === 'shotgun' ? 'high burst damage' : 'high fire rate'}`
      : closeDpsB > closeDpsA
        ? `${getWeaponDisplayName(b)} excels up close with ${b.category === 'shotgun' ? 'high burst damage' : 'high fire rate'}`
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
      ? `${getWeaponDisplayName(a)} is more effective at distance`
      : longDpsB > longDpsA
        ? `${getWeaponDisplayName(b)} is more effective at distance`
        : 'Both perform similarly at long range',
  });

  // Building fights
  const buildScoreA = a.buildDamage * a.fireRate;
  const buildScoreB = b.buildDamage * b.fireRate;
  results.push({
    scenario: 'Breaking Builds',
    winner: Math.abs(buildScoreA - buildScoreB) < 10 ? 'tie' : buildScoreA > buildScoreB ? 'a' : 'b',
    reason: buildScoreA > buildScoreB
      ? `${getWeaponDisplayName(a)} tears through builds faster (${Math.round(buildScoreA)} vs ${Math.round(buildScoreB)} build DPS)`
      : buildScoreB > buildScoreA
        ? `${getWeaponDisplayName(b)} tears through builds faster (${Math.round(buildScoreB)} vs ${Math.round(buildScoreA)} build DPS)`
        : 'Both break builds at a similar rate',
  });

  // One-shot potential
  const maxA = a.headshot;
  const maxB = b.headshot;
  results.push({
    scenario: 'One-Shot Potential',
    winner: maxA === maxB ? 'tie' : maxA > maxB ? 'a' : 'b',
    reason: maxA >= 200 && maxB < 200
      ? `${getWeaponDisplayName(a)} can one-shot with a headshot (${maxA} damage)`
      : maxB >= 200 && maxA < 200
        ? `${getWeaponDisplayName(b)} can one-shot with a headshot (${maxB} damage)`
        : maxA >= 200 && maxB >= 200
          ? `Both can one-shot — ${getWeaponDisplayName(maxA > maxB ? a : b)} hits harder (${Math.max(maxA, maxB)} vs ${Math.min(maxA, maxB)})`
          : `Neither can one-shot — max headshot: ${Math.max(maxA, maxB)} vs ${Math.min(maxA, maxB)}`,
  });

  // Sustain (mag size * damage / reload)
  const sustainA = (a.magSize * a.damage) / (a.magSize / a.fireRate + a.reloadTime);
  const sustainB = (b.magSize * b.damage) / (b.magSize / b.fireRate + b.reloadTime);
  results.push({
    scenario: 'Sustained Fights',
    winner: Math.abs(sustainA - sustainB) < 5 ? 'tie' : sustainA > sustainB ? 'a' : 'b',
    reason: sustainA > sustainB
      ? `${getWeaponDisplayName(a)} maintains higher damage over time with ${a.magSize} round mag and ${a.reloadTime}s reload`
      : sustainB > sustainA
        ? `${getWeaponDisplayName(b)} maintains higher damage over time with ${b.magSize} round mag and ${b.reloadTime}s reload`
        : 'Both have similar sustained damage output',
  });

  return results;
}

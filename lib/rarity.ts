export function rarityClass(rarity?: string): string {
  const r = (rarity ?? '').toLowerCase();
  if (r.includes('legendary')) return 'rarity-legendary';
  if (r.includes('epic')) return 'rarity-epic';
  if (r.includes('rare')) return 'rarity-rare';
  if (r.includes('uncommon')) return 'rarity-uncommon';
  if (r.includes('common')) return 'rarity-common';
  if (r.includes('mythic')) return 'rarity-mythic';
  if (r.includes('marvel')) return 'rarity-marvel';
  if (r.includes('dc')) return 'rarity-dc';
  if (r.includes('icon')) return 'rarity-icon';
  if (r.includes('gaming')) return 'rarity-gaming';
  if (r.includes('star wars')) return 'rarity-star';
  return '';
}

export function rarityBg(rarity?: string): string {
  const r = (rarity ?? '').toLowerCase();
  if (r.includes('legendary')) return 'rgba(240, 177, 50, 0.15)';
  if (r.includes('epic')) return 'rgba(185, 79, 224, 0.15)';
  if (r.includes('rare')) return 'rgba(63, 159, 224, 0.15)';
  if (r.includes('uncommon')) return 'rgba(96, 170, 58, 0.15)';
  if (r.includes('mythic')) return 'rgba(255, 215, 0, 0.15)';
  if (r.includes('marvel')) return 'rgba(237, 29, 36, 0.15)';
  if (r.includes('dc')) return 'rgba(0, 120, 240, 0.15)';
  if (r.includes('icon')) return 'rgba(0, 204, 204, 0.15)';
  if (r.includes('gaming')) return 'rgba(124, 95, 245, 0.15)';
  if (r.includes('star wars')) return 'rgba(255, 232, 31, 0.15)';
  return 'rgba(140, 140, 140, 0.1)';
}

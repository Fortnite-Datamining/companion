import { getShop } from '@/lib/fortnite-api';
import { rarityClass, rarityBg } from '@/lib/rarity';
import type { ShopEntry } from '@/lib/types';

function formatPrice(price: number) {
  return price.toLocaleString();
}

function ShopCard({ entry }: { entry: ShopEntry }) {
  const item = entry.brItems?.[0];
  if (!item) return null;

  const name = entry.bundle?.name ?? item.name;
  const rarity = item.rarity?.displayValue ?? '';
  const type = item.type?.displayValue ?? '';
  const image = item.images?.featured ?? item.images?.icon;
  const onSale = entry.regularPrice > entry.finalPrice;

  return (
    <div
      className={`card overflow-hidden border-l-4 ${rarityClass(rarity)}`}
      style={{ background: rarityBg(rarity) }}
    >
      {image && (
        <div className="aspect-square relative overflow-hidden bg-black/20">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-3">
        <h3 className="font-semibold text-sm truncate">{name}</h3>
        <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
          {rarity} {type}
        </p>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-sm font-bold" style={{ color: 'var(--accent)' }}>
            {formatPrice(entry.finalPrice)} V-Bucks
          </span>
          {onSale && (
            <span className="text-xs line-through" style={{ color: 'var(--text-secondary)' }}>
              {formatPrice(entry.regularPrice)}
            </span>
          )}
        </div>
        {entry.giftable && (
          <span className="text-xs mt-1 inline-block opacity-60">Giftable</span>
        )}
      </div>
    </div>
  );
}

export default async function ShopPage() {
  const shop = await getShop();

  if (!shop?.data?.entries) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold mb-2">Item Shop</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Failed to load shop data. Try again later.</p>
      </div>
    );
  }

  const date = new Date(shop.data.date);
  const dateStr = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  const seen = new Set<string>();
  const entries = shop.data.entries.filter((e) => {
    const item = e.brItems?.[0];
    if (!item) return false;
    const name = e.bundle?.name ?? item.name;
    if (seen.has(name)) return false;
    seen.add(name);
    return true;
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Item Shop</h1>
        <p className="mt-1" style={{ color: 'var(--text-secondary)' }}>
          {dateStr} &middot; {entries.length} items
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {entries.map((entry, i) => (
          <ShopCard key={entry.brItems?.[0]?.id ?? i} entry={entry} />
        ))}
      </div>
    </div>
  );
}

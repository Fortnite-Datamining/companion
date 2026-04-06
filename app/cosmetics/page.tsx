'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface Cosmetic {
  id: string;
  name: string;
  description: string;
  type?: { displayValue: string; value: string };
  rarity?: { displayValue: string; value: string };
  series?: { value: string };
  set?: { value: string; text?: string };
  introduction?: { chapter: string; season: string; text: string };
  images?: { icon?: string; featured?: string; smallIcon?: string };
  showcaseVideo?: string;
  variants?: { channel: string; type: string; options: { tag: string; name: string; image: string }[] }[];
  added?: string;
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
  star: '#ffe81f',
  'shadow series': '#6b3fa0',
  'slurp series': '#01d7e0',
  'lava series': '#ef5a0a',
  'frozen series': '#94d0f0',
  'dark series': '#b14aff',
};

const typeFilters = ['All', 'Outfit', 'Pickaxe', 'Glider', 'Emote', 'Wrap', 'Back Bling', 'Loading Screen', 'Contrail', 'Spray', 'Music'];

export default function CosmeticsPage() {
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [results, setResults] = useState<Cosmetic[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Cosmetic | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout>(null);

  const search = useCallback(async (q: string, type: string) => {
    if (q.length < 2) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setHasSearched(true);

    try {
      let url = `https://fortnite-api.com/v2/cosmetics/br/search/all?language=en&matchMethod=contains&name=${encodeURIComponent(q)}`;
      if (type !== 'All') {
        url += `&type=${encodeURIComponent(type.toLowerCase())}`;
      }

      const res = await fetch(url);
      if (!res.ok) {
        setResults([]);
        return;
      }
      const json = await res.json();
      setResults((json.data || []).slice(0, 60));
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(query, typeFilter), 400);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [query, typeFilter, search]);

  const getRarityColor = (cosmetic: Cosmetic) => {
    if (cosmetic.series?.value) return rarityColors[cosmetic.series.value.toLowerCase()] || rarityColors[cosmetic.rarity?.value || 'common'];
    return rarityColors[cosmetic.rarity?.value || 'common'] || '#8c8c8c';
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Cosmetics Browser</h1>
        <p className="mt-1" style={{ color: 'var(--text-secondary)' }}>
          Search and browse all Fortnite cosmetics
        </p>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search cosmetics..."
          className="flex-1 px-4 py-2.5 rounded-lg border border-white/10 text-white placeholder:text-gray-500 outline-none focus:border-[var(--accent)]"
          style={{ background: 'var(--bg-card)' }}
        />
        <div className="flex gap-2 flex-wrap">
          {typeFilters.map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
              style={{
                background: typeFilter === t ? 'var(--accent)' : 'var(--bg-card)',
                color: typeFilter === t ? 'white' : 'var(--text-secondary)',
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center py-8" style={{ color: 'var(--text-secondary)' }}>Searching...</p>
      )}

      {/* Results Grid */}
      {!loading && results.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {results.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelected(item)}
              className="rounded-xl overflow-hidden text-left transition-transform hover:scale-[1.03] focus:outline-none"
              style={{
                background: 'var(--bg-card)',
                borderBottom: `3px solid ${getRarityColor(item)}`,
              }}
            >
              <div className="aspect-square relative" style={{ background: `linear-gradient(135deg, ${getRarityColor(item)}22, ${getRarityColor(item)}08)` }}>
                {(item.images?.featured || item.images?.icon) && (
                  <img
                    src={item.images.featured || item.images.icon}
                    alt={item.name}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                )}
              </div>
              <div className="p-2">
                <p className="text-xs font-semibold truncate">{item.name}</p>
                <p className="text-[10px] truncate" style={{ color: getRarityColor(item) }}>
                  {item.series?.value || item.rarity?.displayValue || 'Common'}
                  {item.type?.displayValue ? ` \u00B7 ${item.type.displayValue}` : ''}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No results */}
      {!loading && hasSearched && results.length === 0 && (
        <p className="text-center py-12" style={{ color: 'var(--text-secondary)' }}>No cosmetics found.</p>
      )}

      {/* Empty state */}
      {!hasSearched && !loading && (
        <p className="text-center py-12" style={{ color: 'var(--text-secondary)' }}>
          Type at least 2 characters to search.
        </p>
      )}

      {/* Detail Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.8)' }}
          onClick={() => setSelected(null)}
        >
          <div
            className="rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            style={{ background: 'var(--bg-secondary)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header image */}
            <div
              className="relative aspect-[4/3] rounded-t-2xl overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${getRarityColor(selected)}33, ${getRarityColor(selected)}11)` }}
            >
              {(selected.images?.featured || selected.images?.icon) && (
                <img
                  src={selected.images.featured || selected.images.icon}
                  alt={selected.name}
                  className="w-full h-full object-contain"
                />
              )}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                style={{ background: 'rgba(0,0,0,0.5)' }}
              >
                X
              </button>
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-bold mb-1">{selected.name}</h2>
              <p className="text-sm mb-3" style={{ color: getRarityColor(selected) }}>
                {selected.series?.value || selected.rarity?.displayValue || 'Common'}
                {selected.type?.displayValue ? ` \u00B7 ${selected.type.displayValue}` : ''}
              </p>
              {selected.description && (
                <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>{selected.description}</p>
              )}

              {/* Meta info */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {selected.set && (
                  <div className="rounded-lg p-3" style={{ background: 'var(--bg-card)' }}>
                    <p className="text-[10px] uppercase tracking-wide mb-1" style={{ color: 'var(--text-secondary)' }}>Set</p>
                    <p className="text-sm font-medium">{selected.set.value}</p>
                  </div>
                )}
                {selected.introduction && (
                  <div className="rounded-lg p-3" style={{ background: 'var(--bg-card)' }}>
                    <p className="text-[10px] uppercase tracking-wide mb-1" style={{ color: 'var(--text-secondary)' }}>Introduced</p>
                    <p className="text-sm font-medium">Ch.{selected.introduction.chapter} S{selected.introduction.season}</p>
                  </div>
                )}
                {selected.added && (
                  <div className="rounded-lg p-3" style={{ background: 'var(--bg-card)' }}>
                    <p className="text-[10px] uppercase tracking-wide mb-1" style={{ color: 'var(--text-secondary)' }}>Added</p>
                    <p className="text-sm font-medium">{new Date(selected.added).toLocaleDateString()}</p>
                  </div>
                )}
              </div>

              {/* Variants */}
              {selected.variants && selected.variants.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-semibold mb-2">Styles</p>
                  <div className="flex flex-wrap gap-2">
                    {selected.variants.flatMap((v) => v.options).slice(0, 20).map((opt) => (
                      <div key={opt.tag} className="flex flex-col items-center gap-1">
                        {opt.image ? (
                          <img src={opt.image} alt={opt.name} className="w-12 h-12 rounded-lg object-cover" style={{ background: 'var(--bg-card)' }} loading="lazy" />
                        ) : (
                          <div className="w-12 h-12 rounded-lg" style={{ background: 'var(--bg-card)' }} />
                        )}
                        <p className="text-[9px] text-center max-w-[52px] truncate" style={{ color: 'var(--text-secondary)' }}>{opt.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Showcase Video */}
              {selected.showcaseVideo && (
                <div className="mb-2">
                  <p className="text-sm font-semibold mb-2">Showcase</p>
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <iframe
                      src={`https://www.youtube.com/embed/${selected.showcaseVideo}`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

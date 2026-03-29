import { getMap, getBuild } from '@/lib/fortnite-api';

export default async function MapPage() {
  const [map, build] = await Promise.all([getMap(), getBuild()]);

  const pois = map?.data?.pois?.filter((p) => p.name) ?? [];
  const mapImage = map?.data?.images?.pois ?? map?.data?.images?.blank;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Battle Royale Map</h1>
        <p className="mt-1" style={{ color: 'var(--text-secondary)' }}>
          Current map and points of interest
          {build && <span> &middot; v{build.version}</span>}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {mapImage ? (
            <div className="card overflow-hidden">
              <img src={mapImage} alt="Fortnite BR Map" className="w-full" />
            </div>
          ) : (
            <div className="card p-12 text-center">
              <p style={{ color: 'var(--text-secondary)' }}>Map image unavailable</p>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Points of Interest</h2>
          {pois.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)' }}>No POI data available.</p>
          ) : (
            <div className="space-y-2">
              {pois.map((poi) => (
                <div key={poi.id} className="card px-4 py-2.5">
                  <p className="text-sm font-medium">{poi.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { getNews } from '@/lib/fortnite-api';

export default async function NewsPage() {
  const news = await getNews();
  const brMotds = news?.data?.br?.motds ?? [];
  const stwMotds = news?.data?.stw?.motds ?? [];

  const sorted = [...brMotds].sort((a, b) => b.sortingPriority - a.sortingPriority);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Fortnite News</h1>
        <p className="mt-1" style={{ color: 'var(--text-secondary)' }}>
          Latest announcements from Epic Games
        </p>
      </div>

      {sorted.length === 0 ? (
        <p style={{ color: 'var(--text-secondary)' }}>No news available right now.</p>
      ) : (
        <div className="space-y-6">
          {sorted.map((motd) => (
            <div key={motd.id} className="card overflow-hidden">
              {motd.image && (
                <img
                  src={motd.image}
                  alt={motd.title}
                  className="w-full h-64 object-cover"
                />
              )}
              <div className="p-5">
                <h2 className="text-xl font-bold">{motd.title}</h2>
                <p className="mt-2 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {motd.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {stwMotds.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mt-12 mb-6">Save the World</h2>
          <div className="space-y-6">
            {stwMotds.map((motd) => (
              <div key={motd.id} className="card overflow-hidden">
                {motd.image && (
                  <img src={motd.image} alt={motd.title} className="w-full h-48 object-cover" />
                )}
                <div className="p-5">
                  <h3 className="text-lg font-bold">{motd.title}</h3>
                  <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>{motd.body}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Item Shop' },
  { href: '/cosmetics', label: 'Cosmetics' },
  { href: '/history', label: 'Shop History' },
  { href: '/news', label: 'News' },
  { href: '/stats', label: 'Stats' },
  { href: '/map', label: 'Map' },
  { href: '/weapons', label: 'Weapons' },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-1 overflow-x-auto">
        <Link href="/" className="font-bold text-lg mr-6" style={{ color: 'var(--accent)' }}>
          FN Companion
        </Link>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              pathname === link.href
                ? 'text-white'
                : 'hover:text-white'
            }`}
            style={pathname === link.href ? { background: 'var(--accent)' } : { color: 'var(--text-secondary)' }}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

import { NextRequest, NextResponse } from 'next/server';
import { getPlayerStats } from '@/lib/fortnite-api';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const name = searchParams.get('name');
  const platform = searchParams.get('platform') ?? 'epic';

  if (!name) {
    return NextResponse.json({ error: 'Missing name parameter' }, { status: 400 });
  }

  const result = await getPlayerStats(name, platform);

  if (!result) {
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }

  if ('error' in result) {
    return NextResponse.json(result, { status: 404 });
  }

  return NextResponse.json(result);
}

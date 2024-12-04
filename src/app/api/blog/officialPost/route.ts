import { createClient } from '@/supabase/server';
import { getPaginationParams } from '@/utils/pagination';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = createClient();
  const { searchParams } = new URL(request.url);

  const category = searchParams.get('category');
  const { page, limit, from, to } = getPaginationParams(searchParams);

  const { data, count, error } = await supabase
    .from('official')
    .select('*', { count: 'exact' })
    .eq('category', category)
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    return NextResponse.json({ error: error.message });
  }

  return NextResponse.json({
    data: data ?? [],
    page,
    count,
    limit,
  });
}

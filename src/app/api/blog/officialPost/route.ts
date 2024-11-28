import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = createClient();
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') ?? '1');
  const category = searchParams.get('category');

  const pagePost = 10;
  const from = (page - 1) * pagePost;
  const to = from + pagePost - 1;
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
    page: count ?? 0,
  });
}

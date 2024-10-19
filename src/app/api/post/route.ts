import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = createClient();
  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get('user_id');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');

  const from = (page - 1) * limit;
  const to = from + limit - 1;
  const { data, error, count } = await supabase
    .from('post')
    .select('*')
    .eq('user_id', user_id)
    .order('created_at', { ascending: false })
    .range(from, to);

  if (data) {
    return NextResponse.json({ data, total: count, page, limit });
  }
  if (error) {
    return NextResponse.json({ message: error.message });
  }
}

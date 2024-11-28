import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = createClient();
  const { searchParams } = new URL(request.url);

  const blog_id = searchParams.get('blog_id');
  const page = parseInt(searchParams.get('page') ?? '1');
  const limit = parseInt(searchParams.get('limit') ?? '10');
  const year = searchParams.get('year');
  const month = searchParams.get('month');

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  try {
    let query = supabase.from('post').select('*', { count: 'exact' });

    // 블로그 ID 필터링
    query = query.eq('blog_id', blog_id);

    // 년도와 월이 모두 있는 경우에만 날짜 필터링
    if (year && month) {
      const startOfMonth = `${year}-${month.padStart(2, '0')}-01`;
      const endOfMonth = new Date(Number(year), Number(month), 0)
        .toISOString()
        .split('T')[0];
      query = query
        .gte('created_at', startOfMonth)
        .lte('created_at', endOfMonth);
    }

    // 정렬과 페이지네이션 적용
    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) throw error;

    return NextResponse.json({
      data,
      total: count,
      page,
      limit,
    });
  } catch (error) {
    return console.error('Error occurred:', error);
  }
}

import { createClient } from '@/supabase/server';
import { blogParams } from '@/types/userBlog';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: blogParams) {
  const supabase = createClient();
  const post_id = params.id;

  const { data, error } = await supabase
    .from('official')
    .select('*')
    .eq('id', post_id)
    .single();

  if (error) {
    return NextResponse.json({ error: '오류가 발생했습니다' });
  }

  if (data) {
    return NextResponse.json(data);
  }
}

import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createClient();
  const id = params.id;

  const { data: postDetail, error: postDetailError } = await supabase
    .from('post')
    .select('*')
    .eq('id', id)
    .single();

  if (postDetail) {
    return NextResponse.json(postDetail);
  }

  if (postDetailError) {
    return NextResponse.json({ error: '상세 글을 불러올 수 없습니다' });
  }
}

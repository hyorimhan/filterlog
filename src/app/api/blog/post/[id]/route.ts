import { createClient } from '@/supabase/server';
import { blogParams } from '@/types/userBlog';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: blogParams) {
  const supabase = createClient();
  const post_id = params.id;

  const { data: postDetail, error: postDetailError } = await supabase
    .from('post')
    .select('*')
    .eq('id', post_id)
    .single();

  if (postDetail) {
    return NextResponse.json(postDetail);
  }

  if (postDetailError) {
    return NextResponse.json({ error: '상세 글을 불러올 수 없습니다' });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createClient();

  const id = params.id;
  console.log(id, 'params.id');
  const { error } = await supabase.from('post').delete().eq('id', id);

  if (error) {
    return NextResponse.json({ error: '글을 삭제할 수 없습니다' });
  }
  return NextResponse.json({ message: '글이 삭제되었습니다' });
}

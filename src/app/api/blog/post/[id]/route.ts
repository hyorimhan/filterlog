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

export async function PATCH(request: NextRequest) {
  const supabase = createClient();
  const response = await request.json();
  const { title, content, post_id, img_url } = response;

  const { data, error } = await supabase
    .from('post')
    .update({ title, content, img_url })
    .eq('id', post_id)
    .select();

  try {
    if (data) {
      return NextResponse.json({ message: '업데이트 되었습니다' });
    }
    if (error) {
      return NextResponse.json({ error: '업데이트에 실패했습니다' });
    }
  } catch (error) {
    throw new Error();
  }
}

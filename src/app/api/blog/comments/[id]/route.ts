import { createClient } from '@/supabase/server';
import { blogParams } from '@/types/userBlog';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = createClient();
  const response = await request.json();
  const post_id = response;
  const { data: commentData, error } = await supabase
    .from('comments')
    .select('*')
    .eq('post_id', post_id);

  if (error) {
    return NextResponse.json({ message: '댓글을 불러오지 못했습니다' });
  }
  return NextResponse.json(commentData);
}

export async function POST(request: NextRequest, { params }: blogParams) {
  const supabase = createClient();
  const post_id = params.id;
  const response = await request.json();
  const { user_id, content, nickname } = response;

  const { data: addComment, error } = await supabase
    .from('comments')
    .insert([{ post_id, user_id, content, nickname }])
    .select();

  if (error) {
    return NextResponse.json({ message: '댓글 등록에 실패했습니다' });
  }
  return NextResponse.json({ message: '댓글이 등록되었습니다', addComment });
}

export async function DELETE(request: NextRequest, { params }: blogParams) {
  const supabase = createClient();

  const id = params.id;

  const { data, error } = await supabase.from('comments').delete().eq('id', id);

  if (error) {
    return NextResponse.json({ message: '댓글을 삭제하지 못했습니다' });
  }
  return NextResponse.json(data);
}

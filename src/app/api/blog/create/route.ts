import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const supabase = createClient();
  const response = await request.json();

  const { blog_name, description, user_id, nickname } = response;

  if (!blog_name || !description) {
    return NextResponse.json({ error: '제목, 내용을 모두 입력해주세요' });
  }
  if (!nickname) {
    return NextResponse.json({ error: '닉네임 빠짐' });
  }

  try {
    const { data: existing } = await supabase
      .from('blog')
      .select('*')
      .eq('user_id', user_id)
      .single();

    if (existing) {
      return NextResponse.json({ error: '이미 블로그가 존재합니다' });
    }

    const { data, error } = await supabase
      .from('blog')
      .insert([{ blog_name, description, nickname, user_id }])
      .select()
      .single();

    if (error) {
      console.error(error);
      return NextResponse.json({
        message: '블로그 생성 중에 오류가 발생했습니다',
      });
    }

    // const blogData = data as blogType[];
    // const blogID = blogData[0].id;

    return NextResponse.json({
      message: '블로그가 생성되었습니다',
      data,
      id: data.id,
    });
  } catch (error) {
    return NextResponse.json({ error: '서버 오류가 발생했습니다' });
  }
}

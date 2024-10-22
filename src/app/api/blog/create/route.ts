import { createClient } from '@/supabase/server';
import { blogType } from '@/types/userBlog';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const supabase = createClient();
  const response = await request.json();
  const { blog_name, description, user_id, nickname } = response;

  if (!blog_name || !description) {
    return NextResponse.json({ error: '제목, 내용을 모두 입력해주세요' });
  }

  try {
    const { data, error } = await supabase
      .from('blog')
      .insert([{ blog_name, description, nickname, user_id }])
      .select();

    if (error) {
      throw error;
    }
    if (!data) {
      return NextResponse.json({ message: '데이터가 없습니다' });
    }

    const blogData = data as blogType[];
    const blogID = blogData[0].id;

    return NextResponse.json({
      message: '블로그가 생성되었습니다',
      data,
      id: blogID,
    });
  } catch (error) {
    return NextResponse.json({ error: '오류가 발생했습니다' });
  }
}

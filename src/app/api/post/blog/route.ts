import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const supabase = createClient();
  const response = await request.json();
  const { blog_name, description } = response;

  if (!blog_name || !description) {
    return NextResponse.json({ error: '제목, 내용을 모두 입력해주세요' });
  }

  // const user = await userInfo();

  try {
    // const { data: existingBlog, error: existingError } = await supabase
    //   .from('blog')
    //   .select('*')
    //   .eq('user_id', user?.id)
    //   .single();

    // if (existingBlog) {
    //   return NextResponse.json({
    //     error: '블로그는 인당 1개만 생성 가능합니다',
    //   });
    // }

    // if (existingError) {
    //   return NextResponse.json({ error: '오류가 발생했습니다' });
    // }

    const { data, error } = await supabase
      .from('blog')
      .insert([{ blog_name, description }]);

    if (error) {
      throw error;
    }
    return NextResponse.json({ message: '블로그가 생성되었습니다', data });
  } catch (error) {
    return NextResponse.json({ error: '오류가 발생했습니다' });
  }
}

import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const supabase = createClient();
  const response = await request.json();
  const { title, content, nickname, blog_name, blog_id } = response;

  try {
    const { data, error } = await supabase
      .from('post')
      .insert([
        { title: title, content: content, nickname, blog_name, blog_id },
      ]);

    if (error) {
      return NextResponse.json({ error: '글 작성에 실패했습니다' });
    }

    if (data) {
      return NextResponse.json({ message: '글이 작성되었습니다' });
    } else {
      return NextResponse.json({ error: '데이터가 없습니다' });
    }
  } catch (error) {
    throw new Error('오류가 발생했습니다');
  }
}

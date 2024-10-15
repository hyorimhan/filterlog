import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = createClient();
  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get('user_id');
  const blog_id = searchParams.get('blog_id');

  const { data, error } = await supabase
    .from('emotion')
    .select('*')
    .eq('blog_id', blog_id)
    .eq('user_id', user_id);

  if (error) {
    return NextResponse.json({ error: error.message });
  }

  if (data) {
    return NextResponse.json(data[0]);
  }
  return NextResponse.json(null);
}

export async function POST(request: NextRequest) {
  const supabase = createClient();
  try {
    const response = await request.json();
    const { user_id, blog_id, emotion } = response;
    const today = new Date().toISOString().split('T')[0];

    const { data: existingEmotion, error: existingError } = await supabase
      .from('emotion')
      .select('*')
      .eq('user_id', user_id)
      .eq('blog_id', blog_id)
      .gte('created_at', `${today}T00:00:00.000Z`)
      .lte('created_at', `${today}T23:59:59.999Z`);

    if (existingEmotion) {
      return NextResponse.json({
        message: '오늘의 감정이 이미 등록되었습니다',
        emotionData: existingEmotion[0],
      });
    }
    if (existingError) {
      return NextResponse.json({ message: '오류가 발생했습니다' });
    }

    const { data: newEmotion, error } = await supabase
      .from('emotion')
      .insert([{ user_id, blog_id, emotion }])
      .select();

    if (error) {
      return NextResponse.json({ message: '등록에 실패했습니다' });
    }

    return NextResponse.json({
      message: '오늘의 기분이 등록되었습니다',
      emotionData: newEmotion[0],
    });
  } catch (error) {
    return NextResponse.json({ message: '오류가 발생했습니다' });
  }
}

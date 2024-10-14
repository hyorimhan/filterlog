import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

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
      .filter("DATE_TRUNC('day', created_at)", '=', today);

    if (existingEmotion) {
      return NextResponse.json({
        message: '오늘의 감정이 이미 등록되었습니다',
      });
    }

    const { data: emotionData, error } = await supabase
      .from('emotion')
      .insert([{ user_id, blog_id, emotion }]);

    if (error) {
      return NextResponse.json({ message: '등록에 실패했습니다' });
    }

    return NextResponse.json({
      message: '오늘의 기분이 등록되었습니다',
      emotionData,
    });
  } catch (error) {
    return NextResponse.json({ message: '오류가 발생했습니다' });
  }
}

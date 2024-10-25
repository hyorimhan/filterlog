import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = createClient();
  const { searchParams } = new URL(request.url);
  const ownerId = searchParams.get('ownerId');
  const blog_id = searchParams.get('blog_id');
  const date =
    searchParams.get('date') || new Date().toISOString().split('T')[0];
  const action = searchParams.get('action');
  if (action === 'getTotalEmotions') {
    const { data, error: totalError } = await supabase
      .from('emotion')
      .select('*', { count: 'exact' })
      .eq('user_id', ownerId);

    if (totalError) {
      return NextResponse.json({ error: totalError.message });
    }

    const emotionCounts = data.reduce((acc, item) => {
      acc[item.emotion] = (acc[item.emotion] || 0) + 1;
      return acc;
    }, {});

    return NextResponse.json({ emotionCounts });
  }

  // 오늘 감정 조회
  const { data, error } = await supabase
    .from('emotion')
    .select('*')
    .eq('blog_id', blog_id)
    .eq('user_id', ownerId)
    .eq('date', date);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (data.length === 0) {
    return NextResponse.json(null);
  }

  return NextResponse.json(data[0]);
}

export async function POST(request: NextRequest) {
  const supabase = createClient();
  try {
    const response = await request.json();
    const { user_id, blog_id, emotion } = response;

    // 감정이 이미 등록되어 있는지
    const date = new Date().toISOString().split('T')[0];
    const { data: existingEmotion, error: existingError } = await supabase
      .from('emotion')
      .select('*')
      .eq('user_id', user_id)
      .eq('blog_id', blog_id)
      .eq('date', date);

    if (existingEmotion && existingEmotion.length > 0) {
      return NextResponse.json({
        message: '오늘의 감정이 이미 등록되었습니다',
        emotionData: existingEmotion[0],
      });
    }
    if (existingError) {
      return NextResponse.json({ message: existingError?.message });
    }

    // 감정 등록
    const { data: newEmotion, error: EmotionError } = await supabase
      .from('emotion')
      .insert([{ user_id, blog_id, emotion, date }])
      .select();

    if (EmotionError) {
      return NextResponse.json({ message: EmotionError.message });
    }

    return NextResponse.json({
      message: '오늘의 기분이 등록되었습니다',
      emotionData: newEmotion[0],
    });
  } catch (error) {
    return NextResponse.json(
      { message: '서버 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}

import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const supabase = createClient();
  const response = await request.json();
  const { title, description, owner_id, category, img_url } = response;

  const { data, error } = await supabase
    .from('official')
    .insert([{ title, description, owner_id, category, img_url }])
    .select();

  if (error) {
    return NextResponse.json({ error: '오류가 발생했습니다' });
  }

  return NextResponse.json({ message: '글이 작성되었습니다', data });
}

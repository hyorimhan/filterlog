import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest) {
  const supabase = createClient();
  const response = await request.json();
  const { nickname, blog_name, description } = response;

  const { data, error } = await supabase
    .from('users')
    .update({ nickname, blog_name, description })
    .eq('nickname', nickname)
    .select();

  try {
    if (data) {
      return NextResponse.json({ message: '유저 정보가 업데이트 되었습니다' });
    }
    if (error) {
      return NextResponse.json({ error: '유저 정보 업데이트에 실패했습니다' });
    }
  } catch (error) {
    throw new Error();
  }
}

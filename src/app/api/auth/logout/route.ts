import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

export async function DELETE() {
  const supabase = createClient();
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return NextResponse.json({ message: '로그아웃에 실패했습니다' });
    } else {
      return NextResponse.json({ message: '로그아웃 되었습니다' });
    }
  } catch (error) {
    return NextResponse.json({ message: '오류가 발생했습니다' });
  }
}

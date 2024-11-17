import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const supabase = createClient();
  try {
    const { email, password } = await request.json();
    const { data: user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      return NextResponse.json({
        message: '이메일이나 비밀번호를 다시 확인해주세요',
      });
    }
    if (user) {
      return NextResponse.json({ message: '로그인 되었습니다', user });
    }
    console.log('user', user);
  } catch (error) {
    return NextResponse.json({
      message: '네트워크 오류로 로그인에 실패했습니다',
    });
  }
}

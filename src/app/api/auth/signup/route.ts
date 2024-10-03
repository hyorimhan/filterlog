import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const supabase = createClient();

  try {
    const { email, password, nickname } = await request.json();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: nickname } },
    });

    // const { error: nickError } = await supabase.from('user').insert('nickname');
    if (error) {
      if (error.message.includes('already registered')) {
        return NextResponse.json({ message: '이미 가입된 이메일입니다' });
      }
      console.log(error.message);
      return NextResponse.json({ message: '회원가입에 실패했습니다' });
    }
    // if (nickError) {
    //   return NextResponse.json({ message: nickError.message });
    // }
    return NextResponse.json({ message: '회원가입에 성공했습니다' });
  } catch (error) {
    return NextResponse.json({ message: '네트워크 오류가 발생했습니다' });
  }
}

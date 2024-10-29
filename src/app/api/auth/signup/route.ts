import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const supabase = createClient();

  try {
    const { email, password, nickname } = await request.json();
    const { data: user, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: nickname } },
    });

    const { error: userError } = await supabase
      .from('users')
      .insert([{ email: user.user?.email, nickname }]);

    if (userError) {
      return NextResponse.json({ message: userError.message });
    }
    if (error) {
      if (error.message.includes('already registered')) {
        return NextResponse.json({ message: '이미 가입된 이메일입니다' });
      }
      console.log(error.message);
      return NextResponse.json({ message: '회원가입에 실패했습니다' });
    }

    return NextResponse.json({ message: '회원가입에 성공했습니다' });
  } catch (error) {
    return NextResponse.json({ message: '네트워크 오류가 발생했습니다' });
  }
}

export async function PATCH(request: NextRequest) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('users')
    .update({ nickname: 'nickname' })
    .eq('nickname', 'nickname')
    .select();

  try {
    if (data) {
      return NextResponse.json({ message: '닉네임이 업데이트 되었습니다' });
    }
    if (error) {
      return NextResponse.json({ error: '업데이트에 실패했습니다' });
    }
  } catch (error) {
    throw new Error();
  }
}

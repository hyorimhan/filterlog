import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

// export async function PATCH(request: NextRequest) {
//   const supabase = createClient();

//   try {
//     const response = await request.json();
//     const { nickname, blog_name, description, user_id } = response;

//     const { data, error } = await supabase
//       .from('blog')
//       .update({ nickname, blog_name, description })
//       .eq('user_id', user_id)
//       .select();
//     if (data) {
//       return NextResponse.json({ message: '유저 정보가 업데이트 되었습니다' });
//     }
//     if (error) {
//       return NextResponse.json({ error: '유저 정보 업데이트에 실패했습니다' });
//     }
//   } catch (error) {
//     throw new Error();
//   }
// }
export async function PATCH(request: NextRequest) {
  const supabase = createClient();

  try {
    const response = await request.json();
    const { nickname, blog_name, description, user_id } = response;

    // 받은 데이터 확인
    console.log('받은 데이터:', { nickname, blog_name, description, user_id });

    const { data, error } = await supabase
      .from('blog')
      .update({ nickname, blog_name, description })
      .eq('user_id', user_id)
      .select();

    // 업데이트 결과 확인
    console.log('업데이트 결과:', { data, error });

    if (data) {
      return NextResponse.json({ message: '유저 정보가 업데이트 되었습니다' });
    }
    if (error) {
      return NextResponse.json({ error: '유저 정보 업데이트에 실패했습니다' });
    }
  } catch (error) {
    console.error('에러 발생:', error);
    throw new Error();
  }
}

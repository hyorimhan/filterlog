import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest) {
  const supabase = createClient();

  try {
    const response = await request.json();
    const { nickname, blog_name, description, user_id } = response;

    const { error: nicknameError } = await supabase
      .from('users')
      .update({ nickname })
      .eq('id', user_id);
    if (nicknameError) {
      return NextResponse.json({ error: '닉네임 업데이트에 실패했습니다' });
    }

    const { data: existingNickname } = await supabase
      .from('users')
      .select()
      .eq('nickname', nickname)
      .neq('id', user_id)
      .single();

    if (existingNickname) {
      return NextResponse.json({ message: '이미 사용중인 닉네임입니다' });
    }
    const { data, error } = await supabase
      .from('blog')
      .update({ nickname, blog_name, description })
      .eq('user_id', user_id)
      .select();

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

export async function POST(request: NextRequest) {
  const supabase = createClient();
  try {
    const formData = await request.formData();
    const imgFile = formData.get('image') as Blob;
    const userId = formData.get('userId') as string;

    if (!imgFile || !userId) {
      return NextResponse.json('이미지 파일과 사용자 id가 없습니다');
    }

    const filePath = `profiles/${userId}/${Date.now()}`;
    const { data, error } = await supabase.storage
      .from('profile_img')
      .upload(filePath, imgFile);

    if (error) {
      throw error;
    }

    const { data: publicUrl } = supabase.storage
      .from('profile_img')
      .getPublicUrl(data.path);

    const { error: updateError } = await supabase
      .from('users')
      .update({ profile_img: publicUrl.publicUrl })
      .eq('id', userId);

    if (updateError) {
      console.log('업데이트 오류:', updateError);
      throw new Error('user 업데이트 실패');
    }
    return NextResponse.json({ profileImg: data.path });
  } catch (error) {
    console.log(error);
    return NextResponse.json('이미지 업로드에 실패했습니다');
  }
}

import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  return handleProfileImg(request, 'POST');
}

export async function PATCH(request: NextRequest) {
  return handleProfileImg(request, 'PATCH');
}

async function handleProfileImg(
  request: NextRequest,
  method: 'POST' | 'PATCH'
) {
  const supabase = createClient();
  try {
    const formData = await request.formData();
    const imgFile = formData.get('image') as Blob;
    const userId = formData.get('userId') as string;
    console.log('요청 받음:', { method, userId });
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
      .from('blog')
      .update({ profile_img: publicUrl.publicUrl })
      .eq('user_id', userId);

    if (updateError) {
      console.log('업데이트 오류:', updateError);
      throw new Error('user 업데이트 실패');
    }
    return NextResponse.json({
      profileImg: data.path,
      message:
        method === 'PATCH'
          ? '프로필  이미지가 업데이트 되었습니다 '
          : '프로필 이미지가 업로드 되었습니다',
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      method === 'PATCH'
        ? '이미지 업데이트에 실패했습니다'
        : '이미지 업로드에 실패했습니다'
    );
  }
}

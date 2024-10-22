import { createClient } from '@/supabase/server';
import { randomUUID } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const supabase = createClient();

  // 요청의 콘텐츠 타입 확인
  if (!request.headers.get('content-type')?.includes('multipart/form-data')) {
    return NextResponse.json({ error: 'unsupported media Type' });
  }

  // 폼 데이터 파싱
  const formData = await request.formData();
  const file = formData.get('image') as File;

  // 파일 존재 여부
  if (!file) {
    return NextResponse.json({ error: ' 파일이 업로드되지 않았습니다' });
  }

  // 허용되는 파일 타입과 확장자 정의
  // const allowedTypes = [
  //   'image/jpeg',
  //   'image/png',
  //   'image/gif',
  //   'image/webp',
  //   'image/jpg',
  // ];
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

  // 파일 확장자 추출 및 검증
  const mimeType = file.type;
  const fileExtension = allowedExtensions.find((ext) =>
    mimeType.includes(ext.replace('.', ''))
  );
  if (!fileExtension) {
    return NextResponse.json({ error: '허용되지 않은 파일 확장자입니다' });
  }

  // 파일 크기 제한
  const MAX_FILE_SIZE = 10 * 1024 * 1024;
  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({
      error: '파일 크기는 10MB를 초과할 수 없습니다',
    });
  }

  //고유 파일명
  const fileName = `${randomUUID()}${fileExtension}`;
  try {
    // 파일을 버퍼로 변환
    const buffer = Buffer.from(await file.arrayBuffer());

    // 스토리지에 이미지 업로드
    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(fileName, buffer, { contentType: file.type, upsert: false });

    if (uploadError) {
      throw uploadError;
    }

    // 업로드된 이미지 url 생성
    const { data: urlData } = supabase.storage
      .from('images')
      .getPublicUrl(fileName);

    //성공 응답 반환
    return NextResponse.json({ url: urlData.publicUrl, success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: '파일 업로드 중 오류가 발생했습니다',
      success: false,
    });
  }
}

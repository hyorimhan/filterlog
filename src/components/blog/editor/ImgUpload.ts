'use client';
import axios from 'axios';
import toast from 'react-hot-toast';

const base64ToBlob = (base64Data: string) => {
  const byteString = atob(base64Data.split(',')[1]);
  const mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];

  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], { type: mimeString });
};

// base64 이미지 찾아 처리
export default async function handleImageUpload(
  rawContent: string,
  existingUrl: string[] = []
) {
  let processedContent = rawContent;
  const imageUrls = [...existingUrl];

  const dataURITags = rawContent.match(/data:(?!image\/)[^;]+;base64,[^"]+/g);
  if (dataURITags) {
    toast.error('이미지 외의 파일 형식은 업로드할 수 없습니다.');
    return { processedContent: rawContent };
  }
  const imageTag = rawContent.match(/<img[^>]+src="([^">]+)"/g);
  if (imageTag) {
    for (const imgTag of imageTag) {
      const base64Src = imgTag.match(/src="([^"]+)"/)?.[1];

      if (base64Src && base64Src.startsWith('data:image/')) {
        try {
          const mimeType = base64Src.split(':')[1]?.split(';')[0];

          const allowedTypes = [
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/webp',
            'image/jpg',
          ];
          if (!allowedTypes.includes(mimeType)) {
            toast.error(
              '이미지 파일만 업로드 가능합니다. (jpg, png, gif, webp)'
            );
            throw new Error('Invalid image type');
          }

          const formData = new FormData();
          formData.append('image', base64ToBlob(base64Src));

          const response = await axios.post('/api/blog/post/img', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });

          if (response.data.url) {
            imageUrls.push(response.data.url);
            processedContent = processedContent.replace(imgTag, '');
          }
        } catch (error) {
          console.error('이미지 업로드 실패:', error);
          toast.error('이미지 업로드에 실패했습니다.');
          throw error;
        }
      }
    }
  }
  return { processedContent, imageUrls };
}

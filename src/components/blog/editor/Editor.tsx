'use client';

import DOMPurify from 'dompurify';

import { blogPost, existingBlog } from '@/service/blog';
import useUserInfo from '@/zustand/useUserInfo';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';

import dynamic from 'next/dynamic';
import { FormEvent, useState } from 'react';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>에디터 로딩 중...</p>,
});

function Editor() {
  const nickname = useUserInfo((state) => state.nickname);
  const user = useUserInfo((state) => state.user);
  const router = useRouter();
  // const [preview, setPreview] = useState<string | null>(null);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const { data: blog } = useQuery({
    queryKey: ['blog'],
    queryFn: () => existingBlog(user),
  });

  // const formats = [
  //   'header',
  //   'bold',
  //   'italic',
  //   'underline',
  //   'strike',
  //   'blockquote',
  //   'list',
  //   'bullet',
  //   'indent',
  //   'link',
  //   'image',
  //   'color',
  //   'background',
  //   'align',
  //   'video',
  // ];

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['image', 'video'],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
      ],
    },
  };

  // 폼 제출
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await editorForm();
  };

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
  const handleImageUpload = async (rawContent: string) => {
    let processedContent = rawContent;

    const dataURITags = rawContent.match(/data:(?!image\/)[^;]+;base64,[^"]+/g);
    if (dataURITags) {
      alert('이미지 외의 파일 형식은 업로드할 수 없습니다.');
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
              alert('이미지 파일만 업로드 가능합니다. (jpg, png, gif, webp)');
              throw new Error('Invalid image type');
            }

            const formData = new FormData();
            formData.append('image', base64ToBlob(base64Src));

            const response = await axios.post('/api/blog/post/img', formData, {
              headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.data.url) {
              processedContent = processedContent.replace(
                imgTag,
                response.data.url
              );
            }
          } catch (error) {
            console.error('이미지 업로드 실패:', error);
            alert('이미지 업로드에 실패했습니다.');
            throw error;
          }
        }
      }
    }
    return { processedContent };
  };

  // 에디터 내용 클린징
  const editorForm = async () => {
    const cleanContent = DOMPurify.sanitize(content);
    const { processedContent } = await handleImageUpload(cleanContent);
    const blog_name = blog?.blog_name;
    const blog_id = blog?.id;

    if (!nickname || !blog_name || !blog_id) {
      return null;
    }

    if (!title || content.length === 0) {
      alert('제목, 내용을 입력해주세요');
      return;
    }
    const response = await blogPost({
      content: processedContent,
      title,
      nickname,
      blog_name,
      blog_id,
    });

    if (response) {
      alert('글이 등록되었습니다');
      router.replace(`/blog/${blog.id}`);
    } else {
      alert('글 등록에 실패했습니다');
    }
  };

  const onChangeEditor = (value: string) => {
    setContent(value === '<p><br></p>' ? '' : value);
  };

  return (
    <>
      <form onSubmit={handleSubmit} id="editorForm">
        <div className="flex justify-center">
          <input
            type="text"
            id="title"
            className="w-full text-center text-lg "
            style={{ paddingTop: 20, paddingBottom: 20 }}
            placeholder="제목을 입력해주세요"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            autoFocus
          />
        </div>

        <ReactQuill
          value={content}
          theme="snow"
          modules={modules}
          // formats={formats}
          className="h-96"
          onChange={onChangeEditor}
        />
      </form>
      <div className="flex justify-center mt-12">
        <button type="submit" form="editorForm" className="py-3 px-4 rounded">
          작성
        </button>
      </div>
    </>
  );
}

export default Editor;

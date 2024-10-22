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

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'color',
    'background',
    'align',
    'video',
  ];

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],

        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image', 'video'],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
      ],
    },
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await editorForm();
  };

  const editorForm = async () => {
    // content를 클린징합니다.
    const cleanContent = DOMPurify.sanitize(content);

    // 이미지 업로드 처리
    const { processedContent } = await handleImageUpload(cleanContent);

    // 제출할 내용을 준비합니다.
    const blog_name = blog?.blog_name;
    const blog_id = blog?.id;

    if (!nickname || !blog_name || !blog_id) {
      return null;
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

  const handleImageUpload = async (rawContent: string) => {
    let processedContent = rawContent;

    // content에서 base64 이미지를 찾습니다.
    const imageTags = rawContent.match(/<img[^>]+src="data:image\/[^">]+"/g);

    if (imageTags) {
      if (imageTags.length > 5) {
        alert('이미지는 다섯 장만 업로드할 수 있습니다.');
        throw new Error('Too many images');
      }

      for (const imgTag of imageTags) {
        const base64Src = imgTag.match(/src="([^"]+)"/)?.[1];
        if (base64Src) {
          try {
            const formData = new FormData();
            formData.append('image', base64ToBlob(base64Src));

            const response = await axios.post('/api/blog/post/img', formData, {
              headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.data.url) {
              const imgUrl = response.data.url;
              // base64 이미지를 업로드된 이미지 URL로 대체합니다.
              processedContent = processedContent.replace(imgTag, imgUrl);
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
          formats={formats}
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

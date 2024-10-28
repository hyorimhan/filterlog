'use client';

import useUserInfo from '@/zustand/useUserInfo';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import 'react-quill/dist/quill.snow.css';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { editorProps } from '@/types/userBlog';
import useBlogInfo from '@/zustand/useBlogInfo';
import handleSubmit from './SubmitForm';
import { existingBlog } from '@/service/blog';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>에디터 로딩 중...</p>,
});

function Editor({
  isUpdate,
  defaultTitle,
  defaultContent,
  defaultImg = [],
  post_id,
  cancelBtn,
}: editorProps) {
  const { nickname, user } = useUserInfo();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState<string>(defaultTitle);
  const [content, setContent] = useState<string>(defaultContent);
  const [disabled, setDisabled] = useState<boolean>(false);
  const ownerId = useBlogInfo((state) => state.ownerId);

  const owner = user?.id === ownerId;

  useEffect(() => {
    let initialContent = defaultContent || '';

    const imgHtml = defaultImg
      .map((img) => {
        const cleanUrl = img.replace(/[\[\]"]/g, '');
        return `<Image src="${cleanUrl}" alt="blog_img" width={300} height={300}/>`;
      })
      .join('');

    initialContent += imgHtml;
    setContent(initialContent);
  }, [defaultContent, defaultImg]);

  const { data: blog } = useQuery({
    queryKey: ['blog'],
    queryFn: () => existingBlog(user),
  });

  if (!owner) {
    router.replace('/IE');
    alert('계정주가 아닙니다');
    return;
  }

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

  const onChangeEditor = (value: string) => {
    setContent(value.trim() === '<p><br></p>' ? '' : value);
  };

  if (!blog?.blog_name || !blog?.id) {
    return <div>블로그 정보를 불러오는 중...</div>;
  }
  const user_id = user.id;
  return (
    <>
      <form
        onSubmit={(e) =>
          handleSubmit(
            e,
            nickname!,
            isUpdate,
            post_id,
            user_id,
            title,
            content,
            router,
            queryClient,
            {
              blog_name: blog.blog_name!,
              id: blog.id,
            },
            setDisabled
          )
        }
        id="editorForm"
      >
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
          className="h-3/5"
          onChange={onChangeEditor}
        />
      </form>
      <div className="flex justify-center mt-12">
        <button
          type="submit"
          form="editorForm"
          disabled={disabled}
          className="py-3 px-4 rounded"
        >
          {isUpdate ? '수정' : '작성'}
        </button>
        {isUpdate && cancelBtn && <button onClick={cancelBtn}>취소</button>}
      </div>
    </>
  );
}

export default Editor;

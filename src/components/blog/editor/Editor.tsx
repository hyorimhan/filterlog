'use client';

import useUserInfo from '@/zustand/useUserInfo';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import 'react-quill/dist/quill.snow.css';

import dynamic from 'next/dynamic';
import { ChangeEvent, useEffect, useState } from 'react';
import { editorProps } from '@/types/userBlog';
import useBlogInfo from '@/zustand/useBlogInfo';
import handleSubmit from './SubmitForm';
import toast from 'react-hot-toast';
import { UseBlogQuery } from '@/hooks/user/UseProfileQuery';

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
  targetTable = 'blogPosts',
}: editorProps & { targetTable: 'blogPosts' | 'official' }) {
  const { nickname, user } = useUserInfo();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState<string>(defaultTitle);
  const [content, setContent] = useState<string>(defaultContent);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [category, setCategory] = useState<string>('');
  const ownerId = useBlogInfo((state) => state.ownerId);

  const owner = user?.id === ownerId;
  const passOwnerCheck = targetTable === 'blogPosts';

  useEffect(() => {
    let initialContent = defaultContent || '';

    if (defaultImg && defaultImg.length > 0 && defaultImg[0]) {
      try {
        const urls = JSON.parse(defaultImg[0]); // JSON 문자열을 파싱
        const imgHtml = urls
          .map((img: string) => {
            return `<img src="${img}" alt="blog_img" width="300" height="300" />`;
          })
          .join('');

        initialContent += imgHtml;
      } catch (error) {
        console.error('이미지 파싱 오류:', error);
      }
    }

    setContent(initialContent);
  }, [defaultContent, defaultImg]);

  const { existingData } = UseBlogQuery({ user_id: user?.id ?? '' });

  // const { data: blog } = useQuery({
  //   queryKey: ['blog'],
  //   queryFn: () => existingBlog(user?.id as string),
  //   enabled: passOwnerCheck,
  // });

  if (!owner && passOwnerCheck) {
    router.replace('/IE');
    toast.error('계정주가 아닙니다');
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

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  if (passOwnerCheck && !existingData?.blog_name && existingData?.id) {
    return <div>블로그 정보를 불러오는 중...</div>;
  }

  if (!user?.id) {
    return '유저 아이디가 없습니다';
  }

  const user_id = user.id;
  return (
    <>
      <form
        onSubmit={(e) => {
          handleSubmit(
            e,
            targetTable,
            nickname!,
            isUpdate,
            post_id,
            user_id,
            title,
            content,
            router,
            queryClient,
            {
              blog_name: existingData?.blog_name as string,
              id: existingData?.id as string,
            },
            setDisabled,
            category,
            defaultImg
          );
        }}
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
        {targetTable !== 'blogPosts' && (
          <div>
            <select value={category} onChange={handleCategoryChange} required>
              <option value="">카테고리 선택</option>
              <option value="notice">공지사항</option>
              <option value="event">이벤트</option>
              <option value="magazine">매거진</option>
            </select>
          </div>
        )}

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
          {disabled
            ? isUpdate
              ? '수정 중...'
              : '등록 중...'
            : isUpdate
            ? '수정'
            : '작성'}
        </button>
        {isUpdate && cancelBtn && <button onClick={cancelBtn}>취소</button>}
      </div>
    </>
  );
}

export default Editor;

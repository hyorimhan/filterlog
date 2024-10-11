'use client';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import DOMPurify from 'dompurify';
import { postFormType } from '@/types/userBlog';
import { blogPost, existingBlog } from '@/service/blog';
import useUserInfo from '@/zustand/useUserInfo';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
function Editor() {
  const nickname = useUserInfo((state) => state.nickname);
  const user = useUserInfo((state) => state.user);
  const router = useRouter();

  const { data: blog } = useQuery({
    queryKey: ['blog'],
    queryFn: () => existingBlog(user),
  });
  const { register, handleSubmit, trigger, setValue } = useForm<postFormType>({
    mode: 'onChange',
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

  const onChangeEditor = (value: string) => {
    setValue('content', value === '<p><br></p>' ? '' : value);
    trigger('content');
  };

  const editorForm = async (data: postFormType) => {
    const cleanContent = DOMPurify.sanitize(data.content);
    const content = cleanContent.replace(/<[^>]+>/g, '');
    const title = data.title;
    const blog_name = blog?.blog_name;
    const blog_id = blog?.id;

    if (!nickname || !blog_name || !blog_id) {
      return null;
    }
    const response = await blogPost({
      content,
      title,
      nickname,
      blog_name,
      blog_id,
    });

    if (response) {
      alert('글이 등록되었습니다');
      router.replace(`/Blog/${blog.id}`);
    } else {
      alert('글 등록에 실패했습니다');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(editorForm)}>
        <div className="flex justify-center">
          <input
            type="text"
            id="title"
            className="w-full text-center text-lg "
            style={{ paddingTop: 20, paddingBottom: 20 }}
            placeholder="제목을 입력해주세요"
            {...register('title', { required: true })}
            autoFocus
          />
        </div>
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          style={{ height: '550px' }}
          onChange={onChangeEditor}
        />
      </form>
      <div className="flex justify-center mt-12 relative z-20">
        <button
          type="submit"
          className="py-2 px-4 rounded"
          onClick={handleSubmit(editorForm)}
        >
          작성
        </button>
      </div>
    </>
  );
}
export default Editor;

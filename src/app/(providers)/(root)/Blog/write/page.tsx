'use client';
import dynamic from 'next/dynamic';
// import useUserInfo from '@/zustand/useUserInfo';
// import { useSearchParams } from 'next/navigation';

const Editor = dynamic(() => import('@/components/blog/editor/Editor'), {
  ssr: false,
});
const WritePage = () => {
  // const user = useUserInfo((state) => state.user);
  // const searchParams = useSearchParams();
  // const ownerId = searchParams.get('ownerId');

  // const owner = user?.id === ownerId;

  return (
    <Editor
      isUpdate={false}
      defaultTitle="" // 새로운 글이므로 빈 문자열을 기본 제목으로 설정
      defaultContent="" // 새로운 글이므로 빈 문자열을 기본 내용으로 설정
      post_id={''} // post_id는 새 글인 경우 필요하지 않으므로 빈 문자열
      cancelBtn={() => {}}
    />
  );
};
export default WritePage;

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
      defaultTitle=""
      defaultContent=""
      defaultImg={[]}
      post_id={''}
      cancelBtn={() => {}}
    />
  );
};
export default WritePage;

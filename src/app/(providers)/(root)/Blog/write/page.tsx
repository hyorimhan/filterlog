'use client';
import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('@/components/blog/editor/Editor'), {
  ssr: false,
});
const WritePage = () => {
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

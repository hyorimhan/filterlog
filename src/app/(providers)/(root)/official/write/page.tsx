'use client';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const Editor = dynamic(() => import('@/components/blog/editor/Editor'), {
  ssr: false,
  loading: () => <p>에디터 로딩중...</p>,
});

function OfficialPostWrite() {
  return (
    <Editor
      targetTable="official"
      isUpdate={false}
      defaultTitle=""
      defaultContent=""
      defaultImg={[]}
      post_id={''}
      cancelBtn={() => {}}
    />
  );
}

export default OfficialPostWrite;

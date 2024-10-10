'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
function Editor() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

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

  return (
    <>
      <div className="flex justify-center">
        <input
          type="text"
          id="title"
          className="w-full text-center text-lg "
          style={{ paddingTop: 20, paddingBottom: 20 }}
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
      </div>
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        style={{ height: '800px' }}
        value={content}
        onChange={setContent}
      />
      <button>작성</button>
    </>
  );
}
export default Editor;

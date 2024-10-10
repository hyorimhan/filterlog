'use client';
import dynamic from 'next/dynamic';
import React from 'react';

const Editor = dynamic(() => import('@/components/blog/editor/Editor'), {
  ssr: false,
});
const WritePage = () => {
  return <Editor />;
};
export default WritePage;

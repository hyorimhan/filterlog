'use client';

import useBlogInfo from '@/zustand/useBlogInfo';
import React from 'react';

function BlogHeader() {
  const blogInfo = useBlogInfo((state) => state.blogInfo);
  return (
    <>
      <div className="h-12 text-sm border-2 font-medium border-y-custom-green-700 mb-1 flex justify-center items-center">
        <span> {blogInfo?.description}</span>
      </div>
    </>
  );
}

export default BlogHeader;

'use client';
import PostList from '@/components/official/PostList';
import React, { Suspense } from 'react';

const OfficialPage = () => {
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <PostList />
    </Suspense>
  );
};

export default OfficialPage;

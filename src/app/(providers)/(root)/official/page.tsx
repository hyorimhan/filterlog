'use client';
import Loading from '@/components/common/Loading';
import PostList from '@/components/official/PostList';
import React, { Suspense } from 'react';

const OfficialPage = () => {
  return (
    <Suspense
      fallback={
        <div>
          {' '}
          <Loading />
        </div>
      }
    >
      <PostList />
    </Suspense>
  );
};

export default OfficialPage;

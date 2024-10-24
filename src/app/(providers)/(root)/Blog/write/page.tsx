'use client';
import dynamic from 'next/dynamic';
import React from 'react';
import useUserInfo from '@/zustand/useUserInfo';
import { useSearchParams } from 'next/navigation';

const Editor = dynamic(() => import('@/components/blog/editor/Editor'), {
  ssr: false,
});
const WritePage = () => {
  const user = useUserInfo((state) => state.user);
  const searchParams = useSearchParams();
  const ownerId = searchParams.get('ownerId');
  console.log('Current user ID:', user?.id);
  console.log('Owner ID from query:', ownerId);
  const owner = user?.id === ownerId;
  return <Editor owner={owner} />;
};
export default WritePage;

'use client';
import { getBlogId } from '@/service/blog';
import useBlogInfo from '@/zustand/useBlogInfo';
import useUserInfo from '@/zustand/useUserInfo';
import { PropsWithChildren, useEffect } from 'react';

function BlogProvider({ children }: PropsWithChildren) {
  const user = useUserInfo((state) => state.user);
  const { saveOwnerId, saveBlogInfo } = useBlogInfo();
  useEffect(() => {
    const blog = async () => {
      const response = await getBlogId(user?.id ?? '');
      saveBlogInfo(response);
      saveOwnerId(response?.user_id ?? '');
    };
    blog();
  }, [saveBlogInfo, user?.id, saveOwnerId]);
  return <div>{children}</div>;
}

export default BlogProvider;

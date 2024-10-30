'use client';
import { getBlogId } from '@/service/blog';
import useBlogInfo from '@/zustand/useBlogInfo';
import { usePathname } from 'next/navigation';
import { PropsWithChildren, useEffect } from 'react';

function BlogProvider({ children }: PropsWithChildren) {
  const { saveOwnerId, saveBlogInfo } = useBlogInfo();
  const pathname = usePathname();
  const blog_id = pathname.split('/').pop();

  useEffect(() => {
    const blog = async () => {
      const response = await getBlogId(blog_id!);
      saveBlogInfo(response);
      saveOwnerId(response?.user_id ?? '');
    };
    blog();
  }, [saveBlogInfo, blog_id, saveOwnerId]);
  return <div>{children}</div>;
}

export default BlogProvider;

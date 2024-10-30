'use client';
import useBlogInfo from '@/zustand/useBlogInfo';
import { existingBlog } from '../../../../service/blog';
import Create from '@/components/blog/Create';
import useUserInfo from '@/zustand/useUserInfo';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const BlogPage = () => {
  const user = useUserInfo((state) => state.user);
  const { blogInfo } = useBlogInfo();
  const router = useRouter();

  const { data: existingData, isLoading } = useQuery({
    queryKey: ['existingData', user?.id],
    queryFn: () => existingBlog(user),
  });

  useEffect(() => {
    if (!user) {
      console.log('로그인 필요');
      router.replace('/IE');
      return;
    }

    if (existingData) {
      router.replace(`/blog/${existingData.id}`);
    }
  }, [user, existingData, router]);

  if (isLoading) {
    return '로딩중';
  }

  return <div>{!blogInfo && <Create />}</div>;
};

export default BlogPage;

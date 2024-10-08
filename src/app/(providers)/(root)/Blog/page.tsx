'use client';
import Header from '@/components/common/Header';
import { existingBlog } from '../../../../service/blog';
import Create from '@/components/blog/Create';
import useUserInfo from '@/zustand/useUserInfo';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const BlogPage = () => {
  const user = useUserInfo((state) => state.user);
  const router = useRouter();

  const { data: existingData, isLoading } = useQuery({
    queryKey: ['existingData', user?.id],
    queryFn: () => existingBlog(user),
  });

  if (existingData) {
    router.replace(`/Blog/${existingData.id}`);
  }

  if (!user) {
    console.log('로그인 필요');
    router.replace('/IE');
  }

  if (isLoading) {
    ('로딩중');
  }
  return (
    <div>
      <Header />
      <Create />
    </div>
  );
};

export default BlogPage;

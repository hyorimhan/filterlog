// 'use client';
import Create from '@/components/blog/create/Create';
// import { existingBlog } from '../../../../service/blog';
// import useUserInfo from '@/zustand/useUserInfo';
// import { useQuery } from '@tanstack/react-query';
// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';
// import Loading from '@/components/common/Loading';

const BlogPage = () => {
  // const { user } = useUserInfo();
  // const router = useRouter();
  // const user_id = user?.id;
  // const { data: existingData, isLoading } = useQuery({
  //   queryKey: ['existingData', user?.id],
  //   queryFn: () => existingBlog(user_id!),
  //   enabled: !!user_id,
  // });
  // console.log(existingData);

  // useEffect(() => {
  //   if (!user) {
  //     router.replace('/IE');
  //     return;
  //   }

  //   if (existingData) {
  //     router.replace(`/blog/${existingData.id}`);
  //   }
  // }, [user, existingData, router]);

  // if (isLoading) {
  //   return <Loading />;
  // }

  return <Create />;
};

export default BlogPage;

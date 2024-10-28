'use client';
import useBlogInfo from '@/zustand/useBlogInfo';

const MyPage = () => {
  const blogInfo = useBlogInfo((state) => state.blogInfo);
  console.log(blogInfo);
  return <div>page</div>;
};

export default MyPage;

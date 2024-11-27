'use client';

import useBlogInfo from '@/zustand/useBlogInfo';

import Link from 'next/link';
import useUserInfo from '@/zustand/useUserInfo';
import { postBlogInfo } from '@/service/blog';
import { useQuery } from '@tanstack/react-query';

import { usePathname } from 'next/navigation';
import Loading from '../Loading';
import Logout from '@/components/auth/Logout';

function BlogHeader() {
  const { user } = useUserInfo();
  const blogInfo = useBlogInfo((state) => state.blogInfo);
  const pathname = usePathname();
  const postId = pathname.split('/').pop();

  const { data: postBlogData, isLoading } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => postBlogInfo(postId as string),
    enabled: !!postId,
    staleTime: 0,
    gcTime: 0,
  });

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <div className=" h-8 space-x-3 p-1 flex justify-end items-center bg-custom-green-400 ">
        <Link href={'/IE'}>
          <div className=" bg-custom-green-300 hover:brightness-105 shadow-md rounded-md p-1 text-black">
            홈
          </div>
        </Link>
        <Link href={'blog/myPage'}>
          <div className=" bg-custom-green-300 hover:brightness-105 shadow-md rounded-md p-1 text-black">
            마이페이지
          </div>
        </Link>

        <Link href={'/blog'}>
          <div className="bg-custom-green-300 hover:brightness-105 shadow-md rounded-md p-1 text-black">
            마이블로그
          </div>
        </Link>
        <div>
          {user ? (
            <Logout />
          ) : (
            <Link
              href={'/IE'}
              className="bg-custom-green-300 hover:brightness-105 shadow-md rounded-md p-1 text-black"
            >
              로그인
            </Link>
          )}
        </div>
      </div>
      <Link
        href={`/blog/${
          postBlogData?.blog_id ? postBlogData.blog_id : blogInfo?.id
        }`}
        className="h-[150px] w-[1280px] focus:outline-none text-black mx-auto flex  justify-center items-center border-b-0 border-t-0 bg-custom-green-300 border-2 border-y-custom-green-700"
      >
        <span className="text-lg ">
          {postBlogData?.blog_name
            ? postBlogData?.blog_name
            : blogInfo?.blog_name}
        </span>
      </Link>
      <div className="h-12 text-sm border-2 font-medium border-y-custom-green-700 mb-1 flex justify-start pl-2 items-center">
        <span>
          {' '}
          {postBlogData?.blog?.description
            ? postBlogData?.blog?.description
            : blogInfo?.description}
        </span>
      </div>
    </>
  );
}

export default BlogHeader;

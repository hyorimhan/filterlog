'use client';

import useBlogInfo from '@/zustand/useBlogInfo';
import Logout from '../auth/Logout';
import Link from 'next/link';
import useUserInfo from '@/zustand/useUserInfo';

function BlogHeader() {
  const { user } = useUserInfo();
  const blogInfo = useBlogInfo((state) => state.blogInfo);

  return (
    <>
      <div className=" h-8 space-x-3 p-1 flex justify-end items-center bg-custom-green-400 ">
        <Link href={'/IE'}>
          <div className=" bg-custom-green-300 hover:brightness-105 shadow-md rounded-md p-1 text-black">
            홈
          </div>
        </Link>
        <Link href={'/myPage'}>
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
      <div className="h-[150px] w-[1280px] mx-auto flex  justify-center items-center border-b-0 border-t-0 bg-custom-green-300 border-2 border-y-custom-green-700">
        <span className="text-lg ">{blogInfo?.blog_name}</span>
      </div>
      <div className="h-12 text-sm border-2 font-medium border-y-custom-green-700 mb-1 flex justify-start pl-2 items-center">
        <span> {blogInfo?.description}</span>
      </div>
    </>
  );
}

export default BlogHeader;

'use client';
import Loading from '@/components/common/Loading';
import { allUsers } from '@/service/blog';
import useSearch from '@/zustand/useSearch';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function ThreeBlogger() {
  const { currentPage } = useSearch();
  const { data: allUserData, isLoading } = useQuery({
    queryKey: ['allUserData'],
    queryFn: () => allUsers(currentPage),
  });
  const threeUsers = allUserData?.data.slice(0, 3);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="font-galmuri text-sm text-center pt-2 ">
      <div className="border-dashed border-b-2 pb-1  border-custom-green-400 mx-3 ">
        <span className="mx-auto text-center">다른 블로그 구경하기</span>
      </div>
      {threeUsers?.slice(0, 3).map((user) => (
        <Link
          href={`/blog/${user.id}`}
          key={user.id}
          className="border-2 my-[6px] text-black focus:outline-none flex items-center mx-2 border-custom-green-300"
        >
          <span className="border-2 m-1 border-custom-green-400 rounded-full">
            <Image
              src={user.profile_img || '/profile/profile.svg'}
              alt="profileImg"
              width={50}
              height={50}
              className="w-[50px] h-[50px] rounded-full"
            />
          </span>
          <span className="flex flex-col items-start text-xs">
            {/* <span className=""> {user.nickname}</span> */}
            <span className="ml-auto mr-2 ">{user.blog_name}</span>
          </span>
        </Link>
      ))}
      <Link
        href="/blogger"
        className="cursor-pointer text-xs focus:outline-none text-black flex justify-center "
      >
        more+
      </Link>
    </div>
  );
}

export default ThreeBlogger;

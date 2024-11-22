'use client';
import { showOfficialPostInfo } from '@/service/post';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react';
import Loading from '../common/Loading';

function Notice() {
  const category = 'notice';
  const { data: showOfficialPost, isLoading } = useQuery({
    queryKey: ['showOfficialPost', category],
    queryFn: () => showOfficialPostInfo(category),
  });
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <div className=" mt-2 text-sm border-dashed border-b-2 pb-1 border-custom-green-400 mx-3 ">
        공지
      </div>
      <div className="my-2 border-2 p-1 border-custom-green-300 mx-2 ">
        {' '}
        {showOfficialPost?.slice(0, 5).map((post) => (
          <Link
            href={`official/${post.id}`}
            key={post.id}
            className=" text-black focus:outline-none my-2"
          >
            {post.title}
          </Link>
        ))}
      </div>
    </>
  );
}

export default Notice;

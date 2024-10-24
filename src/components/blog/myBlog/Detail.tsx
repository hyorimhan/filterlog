'use client';
import User from '@/components/auth/User';
import { myPostDetail } from '@/service/blog';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import BlogHeader from './BlogHeader';

function Detail({ id }: { id: string }) {
  const { data: deatilPost, isLoading } = useQuery({
    queryKey: ['postDetail', id],
    queryFn: () => myPostDetail(id),
  });

  if (isLoading) {
    return '로딩중';
  }
  console.log(deatilPost);
  return (
    <>
      <BlogHeader description={deatilPost.blog_name} />
      <div className="grid grid-cols-[1fr_5fr] gap-1 mr-1">
        <div className="w-full">
          <User />
        </div>
        <div>
          <div className="w-full h-full  min-h-[500px] items-start flex-col justify-center border-2 mt-1 border-custom-green-400">
            <div className="flex justify-end mr-5 mt-3">
              <span className="mr-2">Date: </span>
              {deatilPost.created_at.slice(0, 10)}
            </div>

            <div className="w-[500px] mx-auto   flex justify-center text-lg mt-5 border-b-2 border-b-custom-green-400">
              {deatilPost.title}
            </div>
            <div className="flex justify-center my-10">
              {deatilPost.content}
            </div>
          </div>
          <div className="flex justify-center gap-10 mt-5">
            <div className=" text-sm  bg-custom-green-300 p-2 rounded-lg">
              수정
            </div>
            <div className="text-sm bg-custom-green-300 p-2 rounded-lg ">
              삭제
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Detail;

'use client';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useBlogInfo from '@/zustand/useBlogInfo';
import useUserInfo from '@/zustand/useUserInfo';
import Confirm from '@/utils/Confirm';
import { useRouter } from 'next/navigation';
import Editor from '../editor/Editor';
import Image from 'next/image';
import { deletePost, myPostDetail } from '@/service/post';
import Loading from '@/components/common/Loading';
import toast from 'react-hot-toast';

function Detail({ post_id }: { post_id: string }) {
  const ownerId = useBlogInfo((state) => state.ownerId);
  const router = useRouter();
  const user = useUserInfo((state) => state.user);
  const [update, setUpdate] = useState<boolean>(false);
  const { data: deatilPost, isLoading } = useQuery({
    queryKey: ['postDetail', post_id],
    queryFn: () => myPostDetail(post_id),
  });

  if (isLoading) {
    return <Loading />;
  }

  const isOwner = user?.id === ownerId;

  return (
    <>
      <div className="mx-10">
        <div>
          <div className="w-full h-full  min-h-[500px] items-start flex-col justify-center border-2 mt-1 border-custom-green-400">
            <div className="flex justify-end mr-5 mt-3">
              <span className="mr-2">Date: </span>
              {deatilPost.created_at.slice(0, 10)}
            </div>
            {update ? (
              <Editor
                isUpdate={true}
                defaultTitle={deatilPost.title}
                defaultContent={deatilPost.content}
                targetTable="blogPosts"
                defaultImg={
                  Array.isArray(deatilPost.img_url)
                    ? deatilPost.img_url
                    : [deatilPost.img_url]
                }
                post_id={post_id}
                cancelBtn={() => setUpdate(false)}
              />
            ) : (
              <>
                <div className="w-[500px] mx-auto   flex justify-center text-lg mt-5 border-b-2 border-b-custom-green-400">
                  {deatilPost.title}
                </div>
                <div className="flex flex-col items-center justify-center my-10">
                  <div className="flex flex-col items-center justify-center">
                    {/* {JSON.parse(deatilPost.img_url).map(
                      (img: string, index: number) =>
                        img && (
                          <Image
                            key={index}
                            src={img}
                            alt={`Post img ${index + 1}`}
                            width={300}
                            height={300}
                          />
                        )
                    )} */}
                    {deatilPost.img_url &&
                      (typeof deatilPost.img_url === 'string'
                        ? JSON.parse(deatilPost.img_url)
                        : deatilPost.img_url
                      )?.map(
                        (img: string, index: number) =>
                          img && (
                            <Image
                              key={index}
                              src={img}
                              alt={`Post img ${index + 1}`}
                              width={400}
                              height={400}
                            />
                          )
                      )}
                  </div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: deatilPost.content

                        .replace(/<p>>&gt;<\/p>/g, '')
                        .replace(/&gt;/g, ''),
                    }}
                  />
                </div>
              </>
            )}
          </div>
          {isOwner && !update && (
            <div className="flex justify-center gap-10 mt-5">
              <div
                className=" text-sm  bg-custom-green-300 p-2 rounded-lg cursor-pointer"
                onClick={() => setUpdate(true)}
              >
                수정
              </div>
              <div
                className="text-sm bg-custom-green-300 p-2 rounded-lg cursor-pointer "
                onClick={() => {
                  Confirm({
                    title: '삭제',
                    message: '정말 글을 삭제하시겠습니까?',
                    onClick: async () => {
                      try {
                        await deletePost(post_id);
                        toast.success('글이 삭제되었습니다.');
                        router.replace(`/blog/${deatilPost.blog_id}`);
                      } catch (error) {
                        toast.error('글을 삭제하는 중 오류가 발생했습니다.');
                      }
                    },
                  });
                }}
              >
                삭제
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Detail;

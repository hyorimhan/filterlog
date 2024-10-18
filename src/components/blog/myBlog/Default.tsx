'use client';
import User from '@/components/auth/User';
import { myPostList } from '@/service/blog';
import { postListType } from '@/types/userBlog';
import useUserInfo from '@/zustand/useUserInfo';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import PostList from './PostList';
import Emotion from './Emotion';
import TotalEmotion from './TotalEmotion';

function Default({
  blog_id,
  isOwner,
  owner,
  ownerId,
}: {
  blog_id: string;
  isOwner: boolean;
  owner: string;
  ownerId: string;
}) {
  const user = useUserInfo((state) => state.user);

  const { data: postList, isLoading } = useQuery<postListType[] | null>({
    queryKey: ['postList'],
    queryFn: () => myPostList(blog_id),
    enabled: !!blog_id,
  });
  // const { data: emotionData, isLoading: Loading } = useQuery({
  //   queryKey: ['emotionData', user_id],
  //   queryFn: () => existingMyEmotion({ user_id: user_id as string, blog_id }),
  //   enabled: !!user_id,
  // });
  if (isLoading) {
    return '로딩중';
  }

  return (
    <>
      <div className="grid grid-cols-[1fr_5fr]">
        <div className="h-[300px] border-2 border-y-custom-green-700 border-r-custom-green-700">
          {isOwner ? <User email={user?.email} /> : owner}
        </div>

        <div className=" grid grid-cols-2 h-[300px] gap-2 mx-1">
          <Emotion blog_id={blog_id} isOwner={isOwner} ownerId={ownerId} />
          <TotalEmotion user_id={ownerId} />
        </div>
      </div>

      <div className="grid grid-cols-[1fr_5fr] mt-1">
        <div className=" h-[300px]"></div>
        <div className="mx-1  ">
          <div>
            {!postList && (
              <Link href={'/Blog/write'}>
                글이 아직 없어요! 첫 글을 써보세요
              </Link>
            )}
            <div>{postList && <PostList postList={postList} />}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Default;

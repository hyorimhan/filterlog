'use client';
import User from '@/components/auth/User';
import { myPostList } from '@/service/blog';
import { postListType } from '@/types/userBlog';
import useUserInfo from '@/zustand/useUserInfo';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import PostList from './PostList';
import Emotion from './Emotion';

function Default({ blog_id }: { blog_id: string }) {
  const user = useUserInfo((state) => state.user);
  const { data: postList, isLoading } = useQuery<postListType[] | null>({
    queryKey: ['postList'],
    queryFn: () => myPostList(blog_id),
  });
  if (isLoading) {
    return '로딩중';
  }

  return (
    <>
      <div className="flex ">
        <div className="w-[250px] h-[290px] border-2 border-y-custom-green-700 border-r-custom-green-700">
          <User email={user?.email} />
        </div>
        <div className=" w-full mx-3  ">
          <Emotion />
        </div>
      </div>
      <div className="mx-3 mt-1">
        <div>
          {!postList && (
            <Link href={'/Blog/write'}>글이 아직 없어요! 첫 글을 써보세요</Link>
          )}
          <div>{postList && <PostList postList={postList} />}</div>
        </div>
      </div>
    </>
  );
}

export default Default;

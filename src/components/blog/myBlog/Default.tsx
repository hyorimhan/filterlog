'use client';
import User from '@/components/auth/User';
import { existingMyEmotion, myPostList } from '@/service/blog';
import { postListType, userEmotionType } from '@/types/userBlog';
import useUserInfo from '@/zustand/useUserInfo';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import PostList from './PostList';
import Emotion from './Emotion';
import TodaySentence from './TodaySentence';

function Default({ blog_id }: { blog_id: string }) {
  const user = useUserInfo((state) => state.user);
  const user_id = user?.id;
  if (!user_id) {
    return alert('로그인 정보가 없습니다');
  }
  const { data: postList, isLoading } = useQuery<postListType[] | null>({
    queryKey: ['postList'],
    queryFn: () => myPostList(blog_id),
  });
  const { data: emotionData, isLoading: Loading } = useQuery({
    queryKey: ['emotionData', user_id],
    queryFn: () => existingMyEmotion({ user_id, blog_id }),
  });
  if (isLoading || Loading) {
    return '로딩중';
  }

  return (
    <>
      <div className="flex ">
        <div className="w-[350px] h-[300px] border-2 border-y-custom-green-700 border-r-custom-green-700">
          <User email={user?.email} />
        </div>
        <div className=" w-full mx-3  ">
          {emotionData && <Emotion blog_id={blog_id} />}
        </div>
        <div className="w-[200px]">
          <TodaySentence />
        </div>
      </div>
      <div className="flex">
        <div className="w-[500px] h-[300px]">
          <TodaySentence />
        </div>
        <div className="mx-3 mt-1 ">
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

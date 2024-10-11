'use client';
import User from '@/components/auth/User';
import { myPostList } from '@/service/blog';
import { postListType } from '@/types/userBlog';
import useUserInfo from '@/zustand/useUserInfo';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

function Default({ blog_id }: { blog_id: string }) {
  const user = useUserInfo((state) => state.user);
  const { data: postList, isLoading } = useQuery<postListType[] | null>({
    queryKey: ['postList'],
    queryFn: () => myPostList(blog_id),
  });
  if (isLoading) {
    return '로딩중';
  }
  console.log(postList);
  console.log(blog_id);
  return (
    <div className="flex ">
      <div>
        <div className="w-[200px] h-[290px] border-2 border-y-custom-green-700 border-r-custom-green-700">
          <User email={user?.email} />
        </div>
        <div className="w-[275px] h-[290px]"></div>
      </div>
      <div className="font-galmuri">오늘 기분은 어떠세요?</div>
      <div>
        {!postList && (
          <Link href={'/Blog/write'}>글이 아직 없어요! 첫 글을 써보세요</Link>
        )}
        <div>
          {postList?.map((post) => (
            <div key={post.id}>{post.title}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Default;

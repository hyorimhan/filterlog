import { postListType } from '@/types/userBlog';
import Link from 'next/link';

function PostList({ postList }: { postList: postListType[] }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {postList.map((post) => (
        <div
          key={post.id}
          className="border-2 h-[290px] border-custom-green-400 rounded-lg shadow"
        >
          <Link href={`/Blog/post/${post.id}`}>
            <div className="text-right mt-2 mr-3 text-black">
              <span className="text-sm  border-b-2 text-custom-green-700 border-b-custom-green-300">
                Date:
              </span>{' '}
              {post.created_at.slice(0, 10)}
            </div>
            <div className="truncate mt-10 text-black">
              <span className="text-sm  text-custom-green-700 ml-3 border-b-2 border-b-custom-green-300">
                Title:
              </span>{' '}
              {post.title}
            </div>
            <div className=" text-sm mx-5 tracking-widest mt-20 text-black line-clamp-5  ">
              {post.content}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
export default PostList;

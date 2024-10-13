import { postListType } from '@/types/userBlog';

function PostList({ postList }: { postList: postListType[] }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {postList.map((post) => (
        <div
          key={post.id}
          className="border-2 h-[290px] border-custom-green-400 rounded-lg shadow"
        >
          <div className="text-right mt-2 mr-3">
            <span className="text-sm  border-b-2 text-custom-green-700 border-b-custom-green-300">
              Date:
            </span>{' '}
            {post.created_at.slice(0, 10)}
          </div>
          <div className="truncate mt-10">
            <span className="text-sm  text-custom-green-700 ml-3 border-b-2 border-b-custom-green-300">
              Title:
            </span>{' '}
            {post.title}
          </div>
          <div className=" mx-5 pb-2 mt-20 truncate border-b-2 border-b-custom-green-300">
            {post.content}
          </div>
        </div>
      ))}
    </div>
  );
}
export default PostList;

import Comment from '@/components/blog/comment/Comment';
import Detail from '@/components/blog/post/Detail';
import { blogParams } from '@/types/userBlog';

const PostDetailPage = ({ params }: blogParams) => {
  return (
    <div>
      <Detail post_id={params.id} />
      <div className="grid grid-cols-[1fr_5fr] gap-1 mr-1">
        <div></div>
        <Comment params={params} />
      </div>
    </div>
  );
};

export default PostDetailPage;

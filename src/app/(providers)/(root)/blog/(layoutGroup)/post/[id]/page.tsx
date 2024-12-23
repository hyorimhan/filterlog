import Comment from '@/components/blog/comment/Comment';
import Detail from '@/components/blog/post/Detail';
import { blogParams } from '@/types/userBlog';

const PostDetailPage = ({ params }: blogParams) => {
  return (
    <>
      <Detail post_id={params.id} />
      <div className="mx-10 ">
        <Comment params={params} />
      </div>
    </>
  );
};

export default PostDetailPage;

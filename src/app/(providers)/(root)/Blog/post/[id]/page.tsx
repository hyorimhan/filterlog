import Detail from '@/components/blog/myBlog/Detail';
import { blogParams } from '@/types/userBlog';

const PostDetailPage = ({ params }: blogParams) => {
  return (
    <div>
      <Detail post_id={params.id} />
    </div>
  );
};

export default PostDetailPage;

import { blogParams } from '@/types/userBlog';

const PostDetailPage = ({ params }: blogParams) => {
  return <div>{params.id}</div>;
};

export default PostDetailPage;

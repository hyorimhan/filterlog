import Default from '@/components/blog/Default';
import { blogParams } from '@/types/userBlog';

const BlogDetailPage = ({ params }: blogParams) => {
  return <>{<Default params={params} />}</>;
};

export default BlogDetailPage;
